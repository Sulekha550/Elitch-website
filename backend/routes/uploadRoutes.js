import express from 'express';
import { upload } from '../middleware/upload.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/upload/image (Protected: upload single image)
router.post('/image', verifyAdmin, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file was provided for upload.'
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully.',
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'File upload failed.'
    });
  }
});

// POST /api/upload/multiple (Protected: upload multiple images)
router.post('/multiple', verifyAdmin, upload.array('files', 12), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files were provided.'
      });
    }

    const files = req.files.map((f) => ({
      url: `/uploads/${f.filename}`,
      filename: f.filename,
      size: f.size,
      mimetype: f.mimetype
    }));

    return res.status(200).json({
      success: true,
      message: `${files.length} files uploaded successfully.`,
      files
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Multiple file upload failed.'
    });
  }
});

export default router;
