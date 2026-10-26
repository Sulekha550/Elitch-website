import express from 'express';
import FloorPlan from '../models/FloorPlan.js';
import AuditLog from '../models/AuditLog.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/floor-plans (Public & Admin list)
router.get('/', async (req, res) => {
  try {
    const { type, bedrooms, projectId, isPublished, search, page = 1, limit = 50 } = req.query;

    const query = {};

    if (type && type !== 'All') {
      query.type = type;
    }

    if (bedrooms && bedrooms !== 'All') {
      query.bedrooms = Number(bedrooms);
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
        { projectName: { $regex: search, $options: 'i' } },
        { features: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [floorPlans, total] = await Promise.all([
      FloorPlan.find(query).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(limitNum),
      FloorPlan.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      count: floorPlans.length,
      total,
      floorPlans
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve floor plans.'
    });
  }
});

// POST /api/floor-plans (Protected: create floor plan)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const {
      title,
      type,
      bedrooms,
      bathrooms,
      balconies,
      areaSqFt,
      carpetAreaSqFt,
      priceRange,
      imageUrl,
      pdfUrl,
      projectId,
      projectName,
      features,
      displayOrder,
      isPublished
    } = req.body;

    if (!title || !bedrooms || !bathrooms || !areaSqFt || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title, bedrooms, bathrooms, area, and blueprint image are required.'
      });
    }

    const plan = await FloorPlan.create({
      title: title.trim(),
      type: type || '3 BHK Luxury Residence',
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      balconies: Number(balconies) || 2,
      areaSqFt: Number(areaSqFt),
      carpetAreaSqFt: carpetAreaSqFt ? Number(carpetAreaSqFt) : null,
      priceRange: priceRange || 'Price on Request',
      imageUrl,
      pdfUrl: pdfUrl || '',
      projectId: projectId || null,
      projectName: projectName || '',
      features: Array.isArray(features) ? features : [],
      displayOrder: Number(displayOrder) || 0,
      isPublished: isPublished !== undefined ? isPublished : true
    });

    await AuditLog.create({
      action: 'FLOOR_PLAN_CREATED',
      entityType: 'FLOORPLAN',
      entityId: plan._id.toString(),
      adminEmail: req.admin.email,
      details: `Created floor plan layout: "${plan.title}" (${plan.type}, ${plan.areaSqFt} sq.ft.)`
    });

    return res.status(201).json({
      success: true,
      message: 'Floor plan created successfully.',
      plan
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create floor plan.'
    });
  }
});

// PUT /api/floor-plans/:id (Protected: update floor plan)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const plan = await FloorPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Floor plan not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Floor plan updated successfully.',
      plan
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update floor plan.'
    });
  }
});

// DELETE /api/floor-plans/:id (Protected: delete floor plan)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const plan = await FloorPlan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Floor plan not found.'
      });
    }

    await AuditLog.create({
      action: 'FLOOR_PLAN_DELETED',
      entityType: 'FLOORPLAN',
      entityId: req.params.id,
      adminEmail: req.admin.email,
      details: `Deleted floor plan: "${plan.title}"`
    });

    return res.status(200).json({
      success: true,
      message: 'Floor plan deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete floor plan.'
    });
  }
});

export default router;
