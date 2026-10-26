import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Lead from '../models/Lead.js';
import ContactInquiry from '../models/ContactInquiry.js';
import AuditLog from '../models/AuditLog.js';
import GalleryItem from '../models/GalleryItem.js';
import FloorPlan from '../models/FloorPlan.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/dashboard/stats
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    let totalProjects = 0, upcomingProjects = 0, ongoingProjects = 0, completedProjects = 0;
    let totalLeads = 0, newLeads = 0, followUpLeads = 0;
    let totalContactSubmissions = 0, newContactSubmissions = 0;
    let totalGalleryItems = 0, totalFloorPlans = 0;
    let recentProjects = [], recentLeads = [], recentContactSubmissions = [], recentActivities = [];

    if (mongoose.connection.readyState === 1) {
      [
        totalProjects,
        upcomingProjects,
        ongoingProjects,
        completedProjects,
        totalLeads,
        newLeads,
        followUpLeads,
        totalContactSubmissions,
        newContactSubmissions,
        totalGalleryItems,
        totalFloorPlans,
        recentProjects,
        recentLeads,
        recentContactSubmissions,
        recentActivities
      ] = await Promise.all([
        Project.countDocuments().catch(() => 0),
        Project.countDocuments({ status: 'Upcoming' }).catch(() => 0),
        Project.countDocuments({ status: 'Ongoing' }).catch(() => 0),
        Project.countDocuments({ status: 'Completed' }).catch(() => 0),
        Lead.countDocuments().catch(() => 0),
        Lead.countDocuments({ status: 'New' }).catch(() => 0),
        Lead.countDocuments({ status: 'Follow-up' }).catch(() => 0),
        ContactInquiry.countDocuments().catch(() => 0),
        ContactInquiry.countDocuments({ status: 'new' }).catch(() => 0),
        GalleryItem.countDocuments().catch(() => 0),
        FloorPlan.countDocuments().catch(() => 0),
        Project.find().sort({ createdAt: -1 }).limit(5).select('title slug category status coverImage location year priceRange').catch(() => []),
        Lead.find().sort({ createdAt: -1 }).limit(6).select('name email phone inquiryCategory status priority submissionDate').catch(() => []),
        ContactInquiry.find().sort({ createdAt: -1 }).limit(6).select('name email phone inquiry message status createdAt').catch(() => []),
        AuditLog.find().sort({ createdAt: -1 }).limit(8).catch(() => [])
      ]);
    } else {
      const { inMemoryData } = await import('../config/inMemoryStore.js');
      totalProjects = inMemoryData.projects.length;
      upcomingProjects = inMemoryData.projects.filter((p) => p.status === 'Upcoming').length;
      ongoingProjects = inMemoryData.projects.filter((p) => p.status === 'Ongoing').length;
      completedProjects = inMemoryData.projects.filter((p) => p.status === 'Completed').length;
      totalLeads = inMemoryData.leads.length;
      newLeads = inMemoryData.leads.filter((l) => l.status === 'New').length;
      followUpLeads = inMemoryData.leads.filter((l) => l.status === 'Follow-up').length;
      totalGalleryItems = inMemoryData.gallery.length;
      totalFloorPlans = inMemoryData.floorPlans.length;
      recentProjects = inMemoryData.projects.slice(0, 5);
      recentLeads = inMemoryData.leads.slice(0, 6);
      recentActivities = inMemoryData.auditLogs.slice(0, 8);
    }

    // Monthly leads aggregation for trend chart (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    let monthlyLeads = [];
    if (mongoose.connection.readyState === 1) {
      try {
        monthlyLeads = await Lead.aggregate([
          {
            $match: {
              createdAt: { $gte: sixMonthsAgo }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' }
              },
              count: { $sum: 1 }
            }
          },
          {
            $sort: { '_id.year': 1, '_id.month': 1 }
          }
        ]);
      } catch (aggErr) {
        console.warn('[Aggregation Error]:', aggErr.message);
      }
    }

    // Format monthly data for frontend chart
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trendData = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const mYear = d.getFullYear();
      const mMonth = d.getMonth() + 1;
      const found = monthlyLeads.find((item) => item._id && item._id.year === mYear && item._id.month === mMonth);
      trendData.push({
        label: `${monthNames[mMonth - 1]} ${mYear.toString().slice(-2)}`,
        inquiries: found ? found.count : 0
      });
    }

    return res.status(200).json({
      success: true,
      stats: {
        projects: {
          total: totalProjects,
          upcoming: upcomingProjects,
          ongoing: ongoingProjects,
          completed: completedProjects,
          active: ongoingProjects + upcomingProjects
        },
        leads: {
          total: totalLeads,
          new: newLeads,
          followUp: followUpLeads,
          closed: Math.max(0, totalLeads - (newLeads + followUpLeads))
        },
        contactSubmissions: {
          total: totalContactSubmissions,
          new: newContactSubmissions,
          pending: newContactSubmissions
        },
        assets: {
          galleryCount: totalGalleryItems,
          floorPlanCount: totalFloorPlans
        },
        statusDistribution: [
          { status: 'Ongoing', count: ongoingProjects, color: '#6D28D9' },
          { status: 'Completed', count: completedProjects, color: '#10B981' },
          { status: 'Upcoming', count: upcomingProjects, color: '#EC4899' }
        ],
        trendData,
        recentProjects,
        recentLeads,
        recentContactSubmissions,
        recentActivities
      }
    });
  } catch (error) {
    console.error('[Dashboard Stats Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to compute dashboard metrics from database.'
    });
  }
});

export default router;
