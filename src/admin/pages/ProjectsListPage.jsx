import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  FolderPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';
import api from '../services/api';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { useToast } from '../context/ToastContext';

export default function ProjectsListPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('-createdAt');

  // Deletion modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        sort: sortBy
      };
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedStatus !== 'All') params.status = selectedStatus;

      const res = await api.get('/projects', params);
      if (res.success) {
        setProjects(res.projects || []);
        setTotalCount(res.total || 0);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Query Error',
        message: err.message || 'Failed to retrieve projects list.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory, selectedStatus, sortBy, showToast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDeletePrompt = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      const res = await api.delete(`/projects/${projectToDelete._id}`);
      if (res.success) {
        showToast({
          type: 'success',
          title: 'Project Removed',
          message: `"${projectToDelete.title}" has been deleted from the catalog.`
        });
        setDeleteModalOpen(false);
        setProjectToDelete(null);
        fetchProjects();
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Delete Failed',
        message: err.message || 'Error occurred while removing project.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const categories = [
    'All',
    'Luxury Residential',
    'Ultra-Luxury Highrise',
    'Bespoke Villa',
    'Commercial Landmark',
    'Penthouse Collection',
    'Eco-Sustainable Estate'
  ];

  const statuses = ['All', 'Ongoing', 'Upcoming', 'Completed'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#241B35] font-display tracking-tight">
            Architectural Projects ({totalCount})
          </h2>
          <p className="text-xs text-[#786D88] mt-1">
            Manage residential portfolios, high-rises, villas, and commercial commissions.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchProjects()}
            className="p-2.5 rounded-xl bg-white text-[#786D88] hover:text-[#EC4899] border border-[#FCE7F3] hover:border-[#FBCFE8] shadow-xs transition-colors"
            title="Refresh database records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EC4899] to-[#DB2777] hover:from-[#DB2777] hover:to-[#BE185D] text-white shadow-md shadow-[#EC4899]/25 transition-all hover:-translate-y-0.5"
          >
            <FolderPlus className="w-4 h-4 mr-1.5" />
            <span>New Commission</span>
          </Link>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#9B91A8]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search title, location, tags..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] placeholder-[#9B91A8] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  Status: {s}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="-year">Year (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Data Table */}
      {isLoading ? (
        <LoadingSkeleton type="table" rows={6} />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No architectural projects found"
          description="Try modifying your search or filter parameters, or create a new commission."
          actionLabel="Add First Project"
          onAction={() => navigate('/admin/projects/new')}
        />
      ) : (
        <div className="rounded-3xl bg-white border border-[#EDE5F5] overflow-hidden shadow-xs">
          <div className="overflow-x-auto vardha-admin-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8FC] border-b border-[#EDE5F5] text-[#786D88] uppercase font-mono tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Commission / Title</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Location</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Valuation</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE5F5]">
                {projects.map((project) => (
                  <tr
                    key={project._id}
                    className="hover:bg-[#FAF8FC] transition-colors group"
                  >
                    {/* Thumbnail + Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3.5">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-12 h-12 rounded-xl object-cover border border-[#EDE5F5] flex-shrink-0"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80';
                          }}
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/admin/projects/${project._id}/edit`}
                            className="font-bold text-[#241B35] group-hover:text-[#6D28D9] transition-colors truncate block max-w-xs sm:max-w-sm"
                          >
                            {project.title}
                          </Link>
                          <span className="text-[10px] text-[#9B91A8] font-mono block mt-0.5">
                            /{project.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-[#786D88] font-medium">
                      {project.category}
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4 text-[#786D88] truncate max-w-[160px]">
                      {project.location}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <StatusBadge status={project.status} />
                    </td>

                    {/* Valuation / Price Range */}
                    <td className="py-3 px-4 font-mono font-semibold text-[#241B35]">
                      {project.priceRange || 'N/A'}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link
                          to={`/projects/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-[#9B91A8] hover:text-[#6D28D9] hover:bg-[#F3E8FF] transition-colors"
                          title="Preview public architectural dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/projects/${project._id}/edit`}
                          className="p-1.5 rounded-lg text-[#9B91A8] hover:text-[#6D28D9] hover:bg-[#F3E8FF] transition-colors"
                          title="Edit project"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeletePrompt(project)}
                          className="p-1.5 rounded-lg text-[#9B91A8] hover:text-[#E11D48] hover:bg-[#FFF1F2] transition-colors"
                          title="Delete commission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-[#EDE5F5] bg-[#FAF8FC] flex items-center justify-between">
              <span className="text-xs text-[#786D88]">
                Showing page <strong className="text-[#241B35]">{currentPage}</strong> of{' '}
                <strong className="text-[#241B35]">{totalPages}</strong> ({totalCount} items)
              </span>

              <div className="flex items-center space-x-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="p-1.5 rounded-lg bg-white border border-[#EDE5F5] text-[#786D88] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3EEFF] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-[#EC4899] to-[#DB2777] text-white shadow-xs'
                          : 'bg-white border border-[#FCE7F3] text-[#786D88] hover:bg-[#FDF2F8] hover:text-[#EC4899]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="p-1.5 rounded-lg bg-white border border-[#EDE5F5] text-[#786D88] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3EEFF] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Remove Architectural Commission"
        message={`Are you sure you want to permanently delete "${projectToDelete?.title}"? This will also remove associated public project pages and specifications.`}
        confirmLabel="Confirm Deletion"
        confirmVariant="danger"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}

