import express from 'express';
import mongoose from 'mongoose';
import AuditLog from '../models/AuditLog.js';
import Admin from '../models/Admin.js';
import { verifyAdmin, requireSuperAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/settings/audit-logs (Protected: list activity logs)
router.get('/audit-logs', verifyAdmin, async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [logs, total] = await Promise.all([
      AuditLog.find().sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      AuditLog.countDocuments()
    ]);

    return res.status(200).json({
      success: true,
      logs,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve audit logs.'
    });
  }
});

// GET /api/settings/system (Protected: system diagnostics)
router.get('/system', verifyAdmin, async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];

    return res.status(200).json({
      success: true,
      system: {
        serverTime: new Date().toISOString(),
        nodeVersion: process.version,
        platform: process.platform,
        uptimeSeconds: Math.floor(process.uptime()),
        mongoStatus: states[dbState] || 'Unknown',
        mongoHost: mongoose.connection.host || '127.0.0.1',
        environment: process.env.NODE_ENV || 'development'
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve system status.'
    });
  }
});

// GET /api/settings/admins (Protected: list all admins)
router.get('/admins', verifyAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      admins
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch admin accounts.'
    });
  }
});

// POST /api/settings/admins (Protected: add secondary administrator)
router.post('/admins', verifyAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An administrator account with this email already exists.'
      });
    }

    const newAdmin = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'admin',
      phone: phone || ''
    });

    await AuditLog.create({
      action: 'ADMIN_ACCOUNT_CREATED',
      entityType: 'SETTINGS',
      entityId: newAdmin._id.toString(),
      adminEmail: req.admin.email,
      details: `Created new admin user: ${newAdmin.name} (${newAdmin.email}) with role "${newAdmin.role}"`
    });

    return res.status(201).json({
      success: true,
      message: 'Administrator account created successfully.',
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create administrator.'
    });
  }
});

export default router;
