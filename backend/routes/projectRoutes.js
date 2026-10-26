import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import AuditLog from '../models/AuditLog.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Helper to sanitize slug
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// GET /api/projects (Public & Admin list with filters & pagination)
router.get('/', async (req, res) => {
  try {
    const { category, status, search, year, sort = '-createdAt', page = 1, limit = 20 } = req.query;

    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (year) {
      query.year = Number(year);
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    let projects, total;

    if (mongoose.connection.readyState === 1) {
      [projects, total] = await Promise.all([
        Project.find(query).sort(sort).skip(skip).limit(limitNum),
        Project.countDocuments(query)
      ]);
    } else {
      const { inMemoryData } = await import('../config/inMemoryStore.js');
      let list = [...inMemoryData.projects];
      if (category && category !== 'All') list = list.filter((p) => p.category === category);
      if (status && status !== 'All') list = list.filter((p) => p.status === status);
      if (search) {
        const s = search.toLowerCase();
        list = list.filter((p) => p.title.toLowerCase().includes(s) || p.location.toLowerCase().includes(s));
      }
      total = list.length;
      projects = list.slice(skip, skip + limitNum);
    }

    return res.status(200).json({
      success: true,
      count: projects.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      projects
    });
  } catch (error) {
    console.error('[Get Projects Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving projects'
    });
  }
});

// GET /api/projects/:slugOrId (Public & Admin detail view)
router.get('/:slugOrId', async (req, res) => {
  try {
    const { slugOrId } = req.params;
    let project = null;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(slugOrId)) {
        project = await Project.findById(slugOrId);
      }
      if (!project) {
        project = await Project.findOne({ slug: slugOrId.toLowerCase() });
      }
    } else {
      const { inMemoryData } = await import('../config/inMemoryStore.js');
      project = inMemoryData.projects.find(
        (p) => p._id.toString() === slugOrId || p.slug === slugOrId.toLowerCase()
      );
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    return res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving project details'
    });
  }
});

// POST /api/projects (Protected: Create new project)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Request body must be a valid JSON object.'
      });
    }

    const {
      title,
      slug,
      category,
      status,
      location,
      year,
      shortDescription,
      description,
      coverImage,
      gallery,
      amenities,
      statistics,
      tags,
      priceRange,
      featured,
      displayOrder
    } = req.body;

    if (!title || !description || !coverImage || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, coverImage, and location.'
      });
    }

    let finalSlug = slug ? generateSlug(slug) : generateSlug(title);

    // Check slug collision
    const existing = await Project.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const project = await Project.create({
      title: title.trim(),
      slug: finalSlug,
      category: category || 'Luxury Residential',
      status: status || 'Ongoing',
      location: location.trim(),
      year: Number(year) || new Date().getFullYear(),
      shortDescription: shortDescription ? shortDescription.trim() : '',
      description: description.trim(),
      coverImage: coverImage.trim(),
      gallery: Array.isArray(gallery) ? gallery : [],
      amenities: Array.isArray(amenities) ? amenities : [],
      statistics: statistics || {},
      tags: Array.isArray(tags) ? tags : [],
      priceRange: priceRange || 'Price on Request',
      featured: Boolean(featured),
      displayOrder: Number(displayOrder) || 0
    });

    await AuditLog.create({
      action: 'PROJECT_CREATED',
      entityType: 'PROJECT',
      entityId: project._id.toString(),
      adminEmail: req.admin.email,
      details: `Created project: "${project.title}" (${project.category}, ${project.status})`
    });

    return res.status(201).json({
      success: true,
      message: 'Architectural project created successfully.',
      project
    });
  } catch (error) {
    console.error('[Project Create Error]:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A project with this slug already exists. Please choose a unique title or slug.'
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ') || 'Validation error.'
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create project.'
    });
  }
});

// PUT /api/projects/:id (Protected: Update existing project)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format.'
      });
    }

    let project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    const updateData = { ...req.body };

    // If slug is changed, ensure uniqueness
    if (updateData.slug && updateData.slug !== project.slug) {
      updateData.slug = generateSlug(updateData.slug);
      const duplicate = await Project.findOne({ slug: updateData.slug, _id: { $ne: id } });
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: 'The specified URL slug is already in use by another project.'
        });
      }
    }

    project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    await AuditLog.create({
      action: 'PROJECT_UPDATED',
      entityType: 'PROJECT',
      entityId: project._id.toString(),
      adminEmail: req.admin.email,
      details: `Updated project: "${project.title}"`
    });

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      project
    });
  } catch (error) {
    console.error('[Project Update Error]:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate key error: slug must be unique.'
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ') || 'Validation error.'
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update project.'
    });
  }
});

// DELETE /api/projects/:id (Protected: Delete project)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format.'
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    const projectTitle = project.title;
    await Project.findByIdAndDelete(id);

    await AuditLog.create({
      action: 'PROJECT_DELETED',
      entityType: 'PROJECT',
      entityId: id,
      adminEmail: req.admin.email,
      details: `Deleted project: "${projectTitle}"`
    });

    return res.status(200).json({
      success: true,
      message: `Project "${projectTitle}" deleted successfully.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete project.'
    });
  }
});

export default router;
