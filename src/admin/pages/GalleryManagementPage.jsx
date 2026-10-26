import React, { useState, useEffect, useCallback } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Search,
  Filter,
  CheckCircle,
  Eye,
  EyeOff,
  Layers,
  UploadCloud,
  X
} from 'lucide-react';
import api from '../services/api';
import ImageUploader from '../components/ui/ImageUploader';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { useToast } from '../context/ToastContext';

export default function GalleryManagementPage() {
  const { showToast } = useToast();

  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Create / Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    category: 'Exterior Architecture',
    imageUrl: '',
    description: '',
    projectName: '',
    displayOrder: 0,
    isPublished: true
  });

  // Delete State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = [
    'All',
    'Exterior Architecture',
    'Interior Living',
    'Landscape & Grounds',
    'Masterplan',
    'Penthouses & Terraces',
    'Construction Progress'
  ];

  const fetchGallery = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (search) params.search = search;

      const res = await api.get('/gallery', params);
      if (res.success) {
        setItems(res.items || []);
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Error', message: 'Failed to fetch gallery items.' });
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, search, showToast]);

  // Fetch project list for association
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects', { limit: 100 });
        if (res.success) setProjects(res.projects || []);
      } catch (err) {}
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setForm({
      title: '',
      category: 'Exterior Architecture',
      imageUrl: '',
      description: '',
      projectName: '',
      displayOrder: items.length + 1,
      isPublished: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || '',
      category: item.category || 'Exterior Architecture',
      imageUrl: item.imageUrl || '',
      description: item.description || '',
      projectName: item.projectName || '',
      displayOrder: item.displayOrder || 0,
      isPublished: item.isPublished !== undefined ? item.isPublished : true
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) {
      showToast({ type: 'error', title: 'Missing Fields', message: 'Title and image URL are required.' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        const res = await api.put(`/gallery/${editingItem._id}`, form);
        if (res.success) {
          showToast({ type: 'success', title: 'Asset Updated', message: `"${form.title}" updated.` });
          setIsModalOpen(false);
          fetchGallery();
        }
      } else {
        const res = await api.post('/gallery', form);
        if (res.success) {
          showToast({ type: 'success', title: 'Asset Published', message: `"${form.title}" added to gallery.` });
          setIsModalOpen(false);
          fetchGallery();
        }
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Failed', message: err.message || 'Operation failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const res = await api.delete(`/gallery/${itemToDelete._id}`);
      if (res.success) {
        showToast({ type: 'success', title: 'Deleted', message: 'Asset removed from library.' });
        setDeleteModalOpen(false);
        setItemToDelete(null);
        fetchGallery();
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Error', message: 'Could not delete asset.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#241B35] font-display tracking-tight">
            Visual Asset Gallery ({items.length})
          </h2>
          <p className="text-xs text-[#786D88] mt-1">
            Curate architectural photography, elevations, interior salons, and construction updates.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] text-white shadow-md shadow-[#6D28D9]/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[#9B91A8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gallery titles, descriptions..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] placeholder-[#9B91A8] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <LoadingSkeleton type="cards" />
      ) : items.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No gallery items found"
          description="Upload architectural photos or select a different category."
          actionLabel="Upload First Asset"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="group rounded-3xl bg-white border border-[#EDE5F5] overflow-hidden hover:border-[#B8A1F5] hover:shadow-[0_10px_25px_rgba(120,81,216,0.08)] transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="relative aspect-video sm:aspect-square overflow-hidden bg-[#FAF8FC]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#6D28D9] border border-[#DDD6FE] shadow-xs backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
                {!item.isPublished && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3]">
                      Hidden
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#241B35] truncate mb-1">
                    {item.title}
                  </h4>
                  {item.projectName && (
                    <span className="text-[10px] text-[#6D28D9] font-semibold block truncate mb-1">
                      {item.projectName}
                    </span>
                  )}
                  {item.description && (
                    <p className="text-[11px] text-[#786D88] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#EDE5F5]">
                  <span className="text-[10px] text-[#9B91A8] font-mono">
                    Seq: {item.displayOrder}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-[#786D88] hover:text-[#6D28D9] hover:bg-[#F3E8FF] transition-colors"
                      title="Edit details"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setItemToDelete(item);
                        setDeleteModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-[#9B91A8] hover:text-[#E11D48] hover:bg-[#FFF1F2] transition-colors"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload / Edit Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241B35]/30 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-[0_20px_50px_rgba(48,35,71,0.15)] space-y-4 max-h-[90vh] overflow-y-auto vardha-admin-scrollbar">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-[#9B91A8] hover:text-[#241B35] hover:bg-[#F3EEFF]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#241B35] font-display">
              {editingItem ? 'Edit Gallery Asset' : 'Upload & Publish Asset'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Master Penthouse Sunset Terrace"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Associate with Project
                  </label>
                  <select
                    value={form.projectName}
                    onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                  >
                    <option value="">None / Standalone Asset</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ImageUploader
                label="Photograph File / Render URL *"
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                  Architectural Description / Caption
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe material finishes, lighting conditions, or viewing direction..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center space-x-2 text-xs text-[#241B35] font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="rounded border-[#EDE5F5] text-[#6D28D9] focus:ring-[#6D28D9]"
                  />
                  <span>Published on Public Gallery Page</span>
                </label>

                <div className="flex items-center space-x-2 text-xs text-[#786D88]">
                  <span>Order:</span>
                  <input
                    type="number"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                    className="w-16 px-2.5 py-1 rounded-lg bg-white border border-[#EDE5F5] text-xs text-[#241B35] font-mono text-center focus:border-[#6D28D9]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#EDE5F5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#786D88] hover:text-[#241B35] hover:bg-[#F3EEFF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] text-white shadow-md shadow-[#6D28D9]/20 transition-all hover:-translate-y-0.5"
                >
                  {isSubmitting ? 'Saving...' : editingItem ? 'Update Asset' : 'Publish Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Visual Asset"
        message={`Are you sure you want to remove "${itemToDelete?.title}" from the architectural gallery?`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
      />
    </div>
  );
}
