import express from 'express';
import GalleryItem from '../models/GalleryItem.js';
import AuditLog from '../models/AuditLog.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/gallery (Public & Admin list)
router.get('/', async (req, res) => {
  try {
    const { category, projectId, isPublished, search, page = 1, limit = 50 } = req.query;

    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (projectId) {
      query.projectId = projectId;
    }

    if (isPublished !== undefined) {
      query.isPublished = isPublished === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      GalleryItem.find(query).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(limitNum),
      GalleryItem.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      count: items.length,
      total,
      items
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch gallery items.'
    });
  }
});

// POST /api/gallery (Protected: add gallery image)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, description, category, imageUrl, thumbnailUrl, projectId, projectName, displayOrder, isPublished, tags } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title and image URL are required.'
      });
    }

    const item = await GalleryItem.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      category: category || 'Exterior Architecture',
      imageUrl,
      thumbnailUrl: thumbnailUrl || imageUrl,
      projectId: projectId || null,
      projectName: projectName || '',
      displayOrder: Number(displayOrder) || 0,
      isPublished: isPublished !== undefined ? isPublished : true,
      tags: Array.isArray(tags) ? tags : []
    });

    await AuditLog.create({
      action: 'GALLERY_ITEM_ADDED',
      entityType: 'GALLERY',
      entityId: item._id.toString(),
      adminEmail: req.admin.email,
      details: `Added gallery asset: "${item.title}" (${item.category})`
    });

    return res.status(201).json({
      success: true,
      message: 'Gallery item published successfully.',
      item
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to add gallery item.'
    });
  }
});

// PUT /api/gallery/:id (Protected: update gallery image)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully.',
      item
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update gallery item.'
    });
  }
});

// DELETE /api/gallery/:id (Protected: delete gallery image)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.'
      });
    }

    await AuditLog.create({
      action: 'GALLERY_ITEM_DELETED',
      entityType: 'GALLERY',
      entityId: req.params.id,
      adminEmail: req.admin.email,
      details: `Deleted gallery asset: "${item.title}"`
    });

    return res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete gallery item.'
    });
  }
});

export default router;
