import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const verifyAdmin = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No authorization token provided.'
      });
    }

    const secret = process.env.JWT_SECRET || 'vardha_luxury_architectural_jwt_secret_2026';
    const decoded = jwt.verify(token, secret);

    let admin = null;
    if (Admin.db && Admin.db.readyState === 1) {
      admin = await Admin.findById(decoded.id).select('-password');
    } else {
      const { inMemoryData } = await import('../config/inMemoryStore.js');
      admin = inMemoryData.admins.find((a) => a._id.toString() === decoded.id || a.email === decoded.email);
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found or has been revoked.'
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Admin account is currently disabled. Contact system owner.'
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please sign in again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token.'
    });
  }
};

export const requireSuperAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === 'superadmin') {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Permission denied. Requires Superadmin privileges.'
  });
};
