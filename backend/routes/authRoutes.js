import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import AuditLog from '../models/AuditLog.js';
import { verifyAdmin, requireSuperAdmin } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (admin) => {
  const secret = process.env.JWT_SECRET || 'vardha_luxury_architectural_jwt_secret_2026';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    },
    secret,
    { expiresIn }
  );
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both administrator email and password.'
      });
    }

    let admin = null;
    let isMatch = false;

    if (Admin.db && Admin.db.readyState === 1) {
      admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');
      if (admin) {
        isMatch = await admin.comparePassword(password);
      }
    } else {
      const { inMemoryData } = await import('../config/inMemoryStore.js');
      const found = inMemoryData.admins.find((a) => a.email.toLowerCase() === email.toLowerCase().trim());
      if (found) {
        admin = found;
        const bcrypt = (await import('bcryptjs')).default;
        isMatch = await bcrypt.compare(password, found.password);
      }
    }

    if (!admin || !isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials.'
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This administrator account is inactive. Please contact your organization owner.'
      });
    }

    admin.lastLogin = new Date();
    if (admin.save) await admin.save();

    const token = generateToken(admin);

    // Set secure cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Record audit log
    try {
      await AuditLog.create({
        action: 'ADMIN_LOGIN',
        entityType: 'AUTH',
        entityId: admin._id.toString(),
        adminEmail: admin.email,
        details: `Successful administrator sign-in for ${admin.name} (${admin.role})`,
        ipAddress: req.ip || req.connection.remoteAddress || ''
      });
    } catch (auditErr) {
      console.error('[AuditLog] Failed to log sign-in:', auditErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Authentication successful. Welcome to Vardha Builders Admin Command Center.',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
        phone: admin.phone,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('[Auth Error] /api/auth/login:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal authentication server error.'
    });
  }
});

// GET /api/auth/me
router.get('/me', verifyAdmin, async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('admin_token');
  return res.status(200).json({
    success: true,
    message: 'Signed out successfully.'
  });
});

// PUT /api/auth/profile
router.put('/profile', verifyAdmin, async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (name) admin.name = name.trim();
    if (phone !== undefined) admin.phone = phone.trim();
    if (avatar !== undefined) admin.avatar = avatar;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
        phone: admin.phone
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update profile.'
    });
  }
});

// PUT /api/auth/password
router.put('/password', verifyAdmin, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.'
      });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password provided is incorrect.'
      });
    }

    admin.password = newPassword;
    await admin.save();

    await AuditLog.create({
      action: 'PASSWORD_CHANGED',
      entityType: 'AUTH',
      entityId: admin._id.toString(),
      adminEmail: admin.email,
      details: 'Administrator successfully modified security password.'
    });

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update password.'
    });
  }
});

export default router;
