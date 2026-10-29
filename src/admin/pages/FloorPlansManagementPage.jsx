import React, { useState, useEffect, useCallback } from 'react';
import {
  Compass,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  FileText,
  Layers,
  X,
  Maximize2
} from 'lucide-react';
import api from '../services/api';
import ImageUploader from '../components/ui/ImageUploader';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { useToast } from '../context/ToastContext';

export default function FloorPlansManagementPage() {
  const { showToast } = useToast();

  const [floorPlans, setFloorPlans] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    type: '3 BHK Luxury Residence',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    areaSqFt: 3200,
    carpetAreaSqFt: 2750,
    priceRange: 'Price on Request',
    imageUrl: '',
    projectName: '',
    features: ['High-Speed Private Elevator', 'Wraparound Sunset Balcony'],
    displayOrder: 0,
    isPublished: true
  });

  const [featureInput, setFeatureInput] = useState('');

  // Delete State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const planTypes = [
    'All',
    '2 BHK Executive',
    '3 BHK Luxury Residence',
    '4 BHK Presidential Suite',
    'Duplex Penthouse',
    'Signature Sky Villa',
    'Corporate Office Floor'
  ];

  const fetchFloorPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {};
      if (selectedType !== 'All') params.type = selectedType;
      if (search) params.search = search;

      const res = await api.get('/floor-plans', params);
      if (res.success) {
        setFloorPlans(res.floorPlans || []);
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Error', message: 'Failed to fetch floor plans.' });
    } finally {
      setIsLoading(false);
    }
  }, [selectedType, search, showToast]);

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
    fetchFloorPlans();
  }, [fetchFloorPlans]);

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setForm({
      title: '',
      type: '3 BHK Luxury Residence',
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      areaSqFt: 3200,
      carpetAreaSqFt: 2750,
      priceRange: 'Price on Request',
      imageUrl: '',
      projectName: '',
      features: ['High-Speed Private Elevator', 'Wraparound Sunset Balcony'],
      displayOrder: floorPlans.length + 1,
      isPublished: true
    });
    setFeatureInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setForm({
      title: plan.title || '',
      type: plan.type || '3 BHK Luxury Residence',
      bedrooms: plan.bedrooms || 3,
      bathrooms: plan.bathrooms || 3,
      balconies: plan.balconies || 1,
      areaSqFt: plan.areaSqFt || 2500,
      carpetAreaSqFt: plan.carpetAreaSqFt || 2100,
      priceRange: plan.priceRange || 'Price on Request',
      imageUrl: plan.imageUrl || '',
      projectName: plan.projectName || '',
      features: plan.features || [],
      displayOrder: plan.displayOrder || 0,
      isPublished: plan.isPublished !== undefined ? plan.isPublished : true
    });
    setFeatureInput('');
    setIsModalOpen(true);
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (!featureInput.trim()) return;
    if (!form.features.includes(featureInput.trim())) {
      setForm((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
    }
    setFeatureInput('');
  };

  const handleRemoveFeature = (f) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((item) => item !== f)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl || !form.areaSqFt) {
      showToast({ type: 'error', title: 'Missing Information', message: 'Title, area, and blueprint image are required.' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingPlan) {
        const res = await api.put(`/floor-plans/${editingPlan._id}`, form);
        if (res.success) {
          showToast({ type: 'success', title: 'Layout Updated', message: `"${form.title}" updated.` });
          setIsModalOpen(false);
          fetchFloorPlans();
        }
      } else {
        const res = await api.post('/floor-plans', form);
        if (res.success) {
          showToast({ type: 'success', title: 'Layout Published', message: `"${form.title}" published.` });
          setIsModalOpen(false);
          fetchFloorPlans();
        }
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Failed', message: err.message || 'Operation failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!planToDelete) return;
    setIsDeleting(true);
    try {
      const res = await api.delete(`/floor-plans/${planToDelete._id}`);
      if (res.success) {
        showToast({ type: 'success', title: 'Deleted', message: 'Floor plan removed.' });
        setDeleteModalOpen(false);
        setPlanToDelete(null);
        fetchFloorPlans();
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Error', message: 'Could not delete floor plan.' });
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
            Floor Plans & Blueprint Specifications ({floorPlans.length})
          </h2>
          <p className="text-xs text-[#786D88] mt-1">
            Configure architectural layouts, square footage, bedroom suites, and blueprint renders.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] text-white shadow-md shadow-[#6D28D9]/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add Floor Plan</span>
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
            placeholder="Search plan title, project, dimensions..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] placeholder-[#9B91A8] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
          >
            {planTypes.map((t) => (
              <option key={t} value={t}>
                Type: {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Floor Plans Grid */}
      {isLoading ? (
        <LoadingSkeleton type="cards" />
      ) : floorPlans.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="No architectural floor plans found"
          description="Create your first blueprint layout with bedroom counts and dimensions."
          actionLabel="Create First Layout"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {floorPlans.map((plan) => (
            <div
              key={plan._id}
              className="rounded-3xl bg-white border border-[#EDE5F5] overflow-hidden hover:border-[#B8A1F5] hover:shadow-[0_10px_25px_rgba(120,81,216,0.08)] transition-all flex flex-col justify-between shadow-xs group"
            >
              {/* Blueprint Preview Header */}
              <div className="relative aspect-[16/10] bg-[#FAF8FC] overflow-hidden border-b border-[#EDE5F5]">
                <img
                  src={plan.imageUrl}
                  alt={plan.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-[#6D28D9] border border-[#DDD6FE] shadow-xs backdrop-blur-xs font-mono">
                    {plan.areaSqFt} SQ.FT.
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE7F3] text-[#DB2777] border border-[#FCE7F3]">
                    {plan.bedrooms} Bed • {plan.bathrooms} Bath
                  </span>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#6D28D9]">
                    {plan.type}
                  </span>
                  <h3 className="text-sm font-bold text-[#241B35] tracking-tight mt-0.5 mb-1 font-display">
                    {plan.title}
                  </h3>
                  {plan.projectName && (
                    <span className="text-xs text-[#786D88] block mb-3 font-medium">
                      Commission: {plan.projectName}
                    </span>
                  )}

                  {/* Feature Highlights */}
                  {plan.features && plan.features.length > 0 && (
                    <div className="space-y-1.5 my-3 pt-3 border-t border-[#EDE5F5]">
                      {plan.features.slice(0, 3).map((f, idx) => (
                        <div key={idx} className="flex items-center text-[11px] text-[#786D88]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] mr-2 flex-shrink-0"></span>
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Valuation & Actions */}
                <div className="pt-3 border-t border-[#EDE5F5] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#241B35]">
                    {plan.priceRange || 'Price on Request'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(plan)}
                      className="p-1.5 rounded-lg text-[#786D88] hover:text-[#6D28D9] hover:bg-[#F3E8FF] transition-colors"
                      title="Edit specifications"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setPlanToDelete(plan);
                        setDeleteModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-[#9B91A8] hover:text-[#E11D48] hover:bg-[#FFF1F2] transition-colors"
                      title="Delete blueprint"
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

      {/* Add / Edit Floor Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241B35]/30 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl p-6 sm:p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-[0_20px_50px_rgba(48,35,71,0.15)] space-y-4 max-h-[90vh] overflow-y-auto vardha-admin-scrollbar">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-[#9B91A8] hover:text-[#241B35] hover:bg-[#F3EEFF]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#241B35] font-display">
              {editingPlan ? 'Edit Floor Plan Blueprint' : 'Add Architectural Layout Blueprint'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                  Floor Plan Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. The Sovereign Presidential Sky Residence"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Layout Type *
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                  >
                    {planTypes.filter((t) => t !== 'All').map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Associate Project
                  </label>
                  <select
                    value={form.projectName}
                    onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                  >
                    <option value="">None / Standalone Layout</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.bedrooms}
                    onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.bathrooms}
                    onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Balconies
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.balconies}
                    onChange={(e) => setForm({ ...form, balconies: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Super Built-up Area *
                  </label>
                  <input
                    type="number"
                    value={form.areaSqFt}
                    onChange={(e) => setForm({ ...form, areaSqFt: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Carpet Area (Sq.Ft.)
                  </label>
                  <input
                    type="number"
                    value={form.carpetAreaSqFt}
                    onChange={(e) => setForm({ ...form, carpetAreaSqFt: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                    Valuation / Price Indication
                  </label>
                  <input
                    type="text"
                    value={form.priceRange}
                    onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                    placeholder="e.g. ₹18.5 Cr"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35]"
                  />
                </div>
              </div>

              <ImageUploader
                label="Blueprint / Floor Plan Illustration *"
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                helperText="Upload 2D CAD architectural render or vector floor plan."
              />

              {/* Features List */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1.5">
                  Layout Specific Features
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.features.map((f, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#F3E8FF] text-[#4C1D95] border border-[#DDD6FE]"
                    >
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(f)}
                        className="ml-1 text-[#6D28D9] hover:text-[#E11D48]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Walk-in Italian Closet, Vastu Compliant"
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center space-x-2 text-xs text-[#241B35] font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="rounded border-[#EDE5F5] text-[#6D28D9] focus:ring-[#6D28D9]"
                  />
                  <span>Publish in Public Blueprints Showcase</span>
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
                  {isSubmitting ? 'Saving...' : editingPlan ? 'Update Blueprint' : 'Publish Blueprint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Floor Plan Blueprint"
        message={`Are you sure you want to remove "${planToDelete?.title}" from the architectural database?`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setPlanToDelete(null);
        }}
      />
    </div>
  );
}

