import express from 'express';
import WebsiteContent from '../models/WebsiteContent.js';
import AuditLog from '../models/AuditLog.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/content (Public: get all sections)
router.get('/', async (req, res) => {
  try {
    const contents = await WebsiteContent.find();
    const formatted = {};
    contents.forEach((item) => {
      formatted[item.key] = item;
    });
    return res.status(200).json({
      success: true,
      contents: formatted
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve website content.'
    });
  }
});

// GET /api/content/:key (Public: get specific section)
router.get('/:key', async (req, res) => {
  try {
    const content = await WebsiteContent.findOne({ key: req.params.key });
    if (!content) {
      return res.status(200).json({
        success: true,
        content: null
      });
    }
    return res.status(200).json({
      success: true,
      content
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve section content.'
    });
  }
});

// PUT /api/content/:key (Protected: update section content)
router.put('/:key', verifyAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const { title, subtitle, data } = req.body;

    const content = await WebsiteContent.findOneAndUpdate(
      { key },
      {
        key,
        title: title || '',
        subtitle: subtitle || '',
        data: data || {},
        lastUpdatedBy: req.admin.email
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await AuditLog.create({
      action: 'CONTENT_UPDATED',
      entityType: 'CONTENT',
      entityId: content._id.toString(),
      adminEmail: req.admin.email,
      details: `Updated website content for section: "${key}"`
    });

    return res.status(200).json({
      success: true,
      message: `Content for "${key}" updated successfully.`,
      content
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update website content.'
    });
  }
});

export default router;
