import express from 'express';
import mongoose from 'mongoose';
import Lead from '../models/Lead.js';
import AuditLog from '../models/AuditLog.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Helper to send transactional email via Resend if key exists
async function notifyAdminViaEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[Email Notice] RESEND_API_KEY is not set. Skipped automated email dispatch.');
    return;
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Vardha Builders <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL || 'admin@vardhabuilders.com'],
        subject: `[New Inquiry] ${lead.name} - ${lead.inquiryCategory}`,
        html: `
          <h2>New Customer Inquiry Received</h2>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Phone:</strong> ${lead.phone}</p>
          <p><strong>Category:</strong> ${lead.inquiryCategory}</p>
          <p><strong>Preferred Contact:</strong> ${lead.preferredContactMethod}</p>
          <p><strong>Message:</strong></p>
          <blockquote>${lead.message}</blockquote>
          <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
        `
      })
    });
    const result = await response.json();
    console.log('[Resend Email Result]:', result);
  } catch (err) {
    console.warn('[Resend Email Warning]:', err.message);
  }
}

// POST /api/leads/submit (Public: website inquiry form submission)
router.post('/submit', async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Request body must be a valid JSON object.'
      });
    }

    const { name, email, phone, inquiryCategory, message, preferredContactMethod, sourceProject } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone number, and message are required.'
      });
    }

    // Verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Verify database connection state
    if (mongoose.connection.readyState !== 1) {
      console.warn('[Lead Submit Warning] Database not in connected state (readyState=' + mongoose.connection.readyState + ')');
    }

    let cleanSourceProject = null;
    if (sourceProject && mongoose.Types.ObjectId.isValid(sourceProject)) {
      cleanSourceProject = sourceProject;
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      inquiryCategory: inquiryCategory || 'Residential Investment',
      message: message.trim(),
      preferredContactMethod: preferredContactMethod || 'WhatsApp',
      sourceProject: cleanSourceProject,
      status: 'New',
      submissionDate: new Date()
    });

    // Fire email notification asynchronously in background
    notifyAdminViaEmail(lead).catch((e) => console.warn('[Async Email]:', e.message));

    return res.status(201).json({
      success: true,
      message: 'Thank you for contacting Vardha Builders. Our senior architectural advisor will get in touch shortly.',
      leadId: lead._id
    });
  } catch (error) {
    console.error('[Lead Submission Error]:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ') || 'Validation error.'
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid format for field "${error.path}".`
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit inquiry.'
    });
  }
});

// GET /api/leads (Protected: list leads with filters, search, pagination)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const { status, priority, category, search, page = 1, limit = 20, sort = '-createdAt' } = req.query;

    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (category && category !== 'All') {
      query.inquiryCategory = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(query).populate('sourceProject', 'title slug').sort(sort).skip(skip).limit(limitNum),
      Lead.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      count: leads.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      leads
    });
  } catch (error) {
    console.error('[Get Leads Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve inquiries.'
    });
  }
});

// GET /api/leads/:id (Protected: single lead details)
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID.'
      });
    }

    const lead = await Lead.findById(id).populate('sourceProject', 'title slug category location coverImage');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead inquiry not found.'
      });
    }

    return res.status(200).json({
      success: true,
      lead
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching lead details.'
    });
  }
});

// PATCH /api/leads/:id/status (Protected: update follow-up status)
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID.'
      });
    }

    const { status, priority, followUpDate } = req.body;

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead inquiry not found.'
      });
    }

    const oldStatus = lead.status;
    if (status) lead.status = status;
    if (priority) lead.priority = priority;
    if (followUpDate !== undefined) lead.followUpDate = followUpDate;

    await lead.save();

    try {
      await AuditLog.create({
        action: 'LEAD_STATUS_UPDATED',
        entityType: 'LEAD',
        entityId: lead._id.toString(),
        adminEmail: req.admin.email,
        details: `Updated status for ${lead.name} from "${oldStatus}" to "${lead.status}"`
      });
    } catch (auditErr) {
      console.warn('[AuditLog] Failed to log status update:', auditErr.message);
    }

    return res.status(200).json({
      success: true,
      message: `Lead status updated to ${lead.status}`,
      lead
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update lead status.'
    });
  }
});

// POST /api/leads/:id/notes (Protected: add internal CRM note)
router.post('/:id/notes', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID.'
      });
    }

    const { note } = req.body;
    if (!note || !note.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required.'
      });
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.'
      });
    }

    lead.internalNotes.push({
      note: note.trim(),
      author: req.admin.name || req.admin.email,
      createdAt: new Date()
    });

    await lead.save();

    return res.status(201).json({
      success: true,
      message: 'Note added successfully.',
      internalNotes: lead.internalNotes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to add note.'
    });
  }
});

// DELETE /api/leads/:id (Protected: delete inquiry)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID.'
      });
    }

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.'
      });
    }

    try {
      await AuditLog.create({
        action: 'LEAD_DELETED',
        entityType: 'LEAD',
        entityId: id,
        adminEmail: req.admin.email,
        details: `Deleted lead inquiry from ${lead.name} (${lead.email})`
      });
    } catch (auditErr) {
      console.warn('[AuditLog] Failed to log lead deletion:', auditErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete lead.'
    });
  }
});

export default router;
