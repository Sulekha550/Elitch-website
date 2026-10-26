import express from 'express';
import mongoose from 'mongoose';
import ContactInquiry from '../models/ContactInquiry.js';
import AuditLog from '../models/AuditLog.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact/submit (Public: website contact form submission)
router.post('/submit', async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Request body must be a valid JSON object.'
      });
    }

    const { name, email, phone, inquiry, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const newInquiry = await ContactInquiry.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: (phone || '').trim(),
      inquiry: inquiry || 'General Inquiry',
      message: message.trim(),
      status: 'new'
    });

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you shortly.',
      inquiryId: newInquiry._id
    });
  } catch (error) {
    console.error('[Contact Submit Error]:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit contact message.'
    });
  }
});

// GET /api/contact/submissions (Protected: view all contact inquiries from MongoDB)
router.get('/submissions', verifyAdmin, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20, sort = '-createdAt' } = req.query;

    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { inquiry: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [inquiries, total] = await Promise.all([
      ContactInquiry.find(query).sort(sort).skip(skip).limit(limitNum),
      ContactInquiry.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      inquiries
    });
  } catch (error) {
    console.error('[Get Contact Submissions Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve contact inquiries.'
    });
  }
});

// PATCH /api/contact/submissions/:id/status (Protected: update inquiry status or notes)
router.patch('/submissions/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact inquiry ID.'
      });
    }

    const { status, notes } = req.body;

    const inquiry = await ContactInquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Contact inquiry not found.'
      });
    }

    const oldStatus = inquiry.status;
    if (status) inquiry.status = status;
    if (notes !== undefined) inquiry.notes = notes;

    await inquiry.save();

    try {
      await AuditLog.create({
        action: 'CONTACT_INQUIRY_STATUS_UPDATED',
        entityType: 'CONTACT_INQUIRY',
        entityId: inquiry._id.toString(),
        adminEmail: req.admin.email,
        details: `Updated contact inquiry from ${inquiry.name} (${inquiry.email}) to status "${inquiry.status}"`
      });
    } catch (auditErr) {
      console.warn('[AuditLog] Failed to log status update:', auditErr.message);
    }

    return res.status(200).json({
      success: true,
      message: `Inquiry status updated to ${inquiry.status}`,
      inquiry
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update contact inquiry status.'
    });
  }
});

// DELETE /api/contact/submissions/:id (Protected: delete inquiry)
router.delete('/submissions/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact inquiry ID.'
      });
    }

    const item = await ContactInquiry.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Contact inquiry not found.'
      });
    }

    try {
      await AuditLog.create({
        action: 'CONTACT_INQUIRY_DELETED',
        entityType: 'CONTACT_INQUIRY',
        entityId: id,
        adminEmail: req.admin.email,
        details: `Deleted contact inquiry from ${item.name} (${item.email})`
      });
    } catch (auditErr) {
      console.warn('[AuditLog] Failed to log inquiry deletion:', auditErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Contact inquiry deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete contact inquiry.'
    });
  }
});

export default router;
