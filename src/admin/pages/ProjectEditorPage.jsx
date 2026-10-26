import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  Eye,
  Sliders,
  Layers,
  Sparkles
} from 'lucide-react';
import api from '../services/api';
import ImageUploader from '../components/ui/ImageUploader';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { useToast } from '../context/ToastContext';

export default function ProjectEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Form Fields State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Luxury Residential',
    status: 'Ongoing',
    location: '',
    year: new Date().getFullYear(),
    priceRange: 'Price on Request',
    shortDescription: '',
    description: '',
    coverImage: '',
    featured: false,
    displayOrder: 0,
    statistics: {
      bedrooms: '3 & 4 BHK',
      bathrooms: '4',
      areaSqFt: '3,200 - 5,500 sq.ft.',
      totalUnits: '48 Suites',
      floors: 'G + 28 Floors',
      possessionDate: 'Dec 2026'
    },
    amenities: [
      'Private Helipad Access',
      'Infinity Temperature-Controlled Pool',
      '24/7 Diplomatic-Grade Concierge'
    ],
    gallery: [],
    tags: ['Luxury', 'Sea Facing']
  });

  const [amenityInput, setAmenityInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  // Fetch existing project if in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    let isMounted = true;
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/projects/${id}`);
        if (isMounted && res.success && res.project) {
          const p = res.project;
          setFormData({
            title: p.title || '',
            slug: p.slug || '',
            category: p.category || 'Luxury Residential',
            status: p.status || 'Ongoing',
            location: p.location || '',
            year: p.year || new Date().getFullYear(),
            priceRange: p.priceRange || 'Price on Request',
            shortDescription: p.shortDescription || '',
            description: p.description || '',
            coverImage: p.coverImage || '',
            featured: Boolean(p.featured),
            displayOrder: p.displayOrder || 0,
            statistics: {
              bedrooms: p.statistics?.bedrooms || '3 & 4 BHK',
              bathrooms: p.statistics?.bathrooms || '4',
              areaSqFt: p.statistics?.areaSqFt || '3,200 sq.ft.',
              totalUnits: p.statistics?.totalUnits || '48 Units',
              floors: p.statistics?.floors || 'G + 28 Floors',
              possessionDate: p.statistics?.possessionDate || 'Dec 2026'
            },
            amenities: p.amenities || [],
            gallery: p.gallery || [],
            tags: p.tags || []
          });
        }
      } catch (err) {
        showToast({
          type: 'error',
          title: 'Load Error',
          message: err.message || 'Could not fetch project details.'
        });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProject();
    return () => {
      isMounted = false;
    };
  }, [id, isEditMode, showToast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStatChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        [name]: value
      }
    }));
  };

  const handleAddAmenity = (e) => {
    e.preventDefault();
    if (!amenityInput.trim()) return;
    if (!formData.amenities.includes(amenityInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()]
      }));
    }
    setAmenityInput('');
  };

  const handleRemoveAmenity = (item) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== item)
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!tagInput.trim()) return;
    if (!formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.location || !formData.coverImage || !formData.description) {
      setError('Please provide Title, Location, Cover Image, and Description.');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditMode) {
        const res = await api.put(`/projects/${id}`, formData);
        if (res.success) {
          showToast({
            type: 'success',
            title: 'Project Saved',
            message: `"${res.project.title}" has been updated.`
          });
          navigate('/admin/projects');
        }
      } else {
        const res = await api.post('/projects', formData);
        if (res.success) {
          showToast({
            type: 'success',
            title: 'Commission Created',
            message: `"${res.project.title}" is now published.`
          });
          navigate('/admin/projects');
        }
      }
    } catch (err) {
      setError(err.data?.message || err.message || 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-[#EDE5F5] rounded animate-pulse"></div>
        <LoadingSkeleton type="form" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EDE5F5]">
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/projects"
            className="p-2.5 rounded-xl bg-white text-[#786D88] hover:text-[#6D28D9] hover:bg-[#F3E8FF] border border-[#EDE5F5] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#241B35] font-display tracking-tight">
              {isEditMode ? `Edit: ${formData.title}` : 'Commission New Architectural Project'}
            </h2>
            <p className="text-xs text-[#786D88] mt-0.5">
              Configure spatial parameters, valuation, luxury amenities, and imagery.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/projects"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#786D88] hover:text-[#241B35] hover:bg-[#F3EEFF] border border-[#EDE5F5] transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EC4899] to-[#DB2777] hover:from-[#DB2777] hover:to-[#BE185D] text-white shadow-md shadow-[#EC4899]/30 transition-all hover:-translate-y-0.5"
          >
            {isSaving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                <span>Saving Commission...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1.5" />
                <span>{isEditMode ? 'Save Modifications' : 'Publish Commission'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] text-[#9F1239] text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-[#E11D48] flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Section 1: Core Commission Identifiers */}
      <div className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display border-b border-[#EDE5F5] pb-3 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#6D28D9]"></span>
          <span>1. Architectural Identity & Classification</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Vardha Sovereign Sky Suites"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1.5">
              URL Slug (Leave blank to auto-generate)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="vardha-sovereign-sky-suites"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs font-mono text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            >
              <option value="Luxury Residential">Luxury Residential</option>
              <option value="Ultra-Luxury Villa">Ultra-Luxury Villa</option>
              <option value="Commercial Complex">Commercial Complex</option>
              <option value="Penthouse Collection">Penthouse Collection</option>
              <option value="Integrated Township">Integrated Township</option>
              <option value="High-Rise Tower">High-Rise Tower</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1.5">
              Construction Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            >
              <option value="Ongoing">Ongoing (Under Construction)</option>
              <option value="Upcoming">Upcoming (Architectural Groundbreaking)</option>
              <option value="Completed">Completed (Ready for Possession)</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1.5">
              Prime Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Worli Sea Face, Mumbai"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1.5">
              Valuation / Price Range
            </label>
            <input
              type="text"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              placeholder="e.g. ₹14.50 Cr - ₹28.00 Cr"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs font-mono font-semibold text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            />
          </div>
        </div>

        {/* Featured Checkbox & Display Order */}
        <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-[#EDE5F5]/60">
          <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-[#241B35] font-medium">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="rounded border-[#EDE5F5] text-[#6D28D9] focus:ring-[#6D28D9]"
            />
            <span>Feature prominently on Home Showcase Carousel</span>
          </label>

          <div className="flex items-center space-x-2 text-xs text-[#786D88]">
            <span>Display Sequence:</span>
            <input
              type="number"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleChange}
              className="w-16 px-2.5 py-1 rounded-lg bg-white border border-[#EDE5F5] text-xs text-[#241B35] font-mono text-center focus:border-[#6D28D9]"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Narrative & Editorial Descriptions */}
      <div className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display border-b border-[#EDE5F5] pb-3 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#EC4899]"></span>
          <span>2. Architectural Narrative & Copy</span>
        </h3>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1.5">
            Brief Architectural Summary (Lead sentence)
          </label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Monolithic towers offering 360-degree Arabian Sea panoramas with private elevator lobbies."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1.5">
            Comprehensive Architectural Dossier *
          </label>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Detail the structural engineering, facade engineering, imported materials, acoustic dampening, and landscaping philosophy..."
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 leading-relaxed transition-all"
          />
        </div>
      </div>

      {/* Section 3: Visual Assets (Cover + Gallery) */}
      <div className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display border-b border-[#EDE5F5] pb-3 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#6D28D9]"></span>
          <span>3. Imagery & Visual Assets</span>
        </h3>

        <ImageUploader
          label="Hero Elevation Cover Image *"
          value={formData.coverImage}
          onChange={(url) => setFormData((prev) => ({ ...prev, coverImage: url }))}
          helperText="Upload architectural elevation or paste high-res CDN render URL."
        />

        <div className="pt-4 border-t border-[#EDE5F5]">
          <ImageUploader
            label="Project Gallery Photos & Elevations"
            value={formData.gallery}
            multiple={true}
            onChange={(items) => setFormData((prev) => ({ ...prev, gallery: items }))}
            helperText="Add multiple high-resolution photos for the interactive project gallery."
          />
        </div>
      </div>

      {/* Section 4: Specifications & Spatial Stats */}
      <div className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display border-b border-[#EDE5F5] pb-3 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#B8A1F5]"></span>
          <span>4. Spatial Statistics & Engineering Metrics</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Configuration / Bedrooms
            </label>
            <input
              type="text"
              name="bedrooms"
              value={formData.statistics.bedrooms}
              onChange={handleStatChange}
              placeholder="e.g. 3 & 4 BHK"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Bathrooms
            </label>
            <input
              type="text"
              name="bathrooms"
              value={formData.statistics.bathrooms}
              onChange={handleStatChange}
              placeholder="e.g. 4 - 5"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Built-Up Area (Sq.Ft.)
            </label>
            <input
              type="text"
              name="areaSqFt"
              value={formData.statistics.areaSqFt}
              onChange={handleStatChange}
              placeholder="e.g. 3,800 - 6,200 sq.ft."
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Total Units
            </label>
            <input
              type="text"
              name="totalUnits"
              value={formData.statistics.totalUnits}
              onChange={handleStatChange}
              placeholder="e.g. 64 Residences"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Structure Height / Floors
            </label>
            <input
              type="text"
              name="floors"
              value={formData.statistics.floors}
              onChange={handleStatChange}
              placeholder="e.g. G + 38 Floors"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Target Handover
            </label>
            <input
              type="text"
              name="possessionDate"
              value={formData.statistics.possessionDate}
              onChange={handleStatChange}
              placeholder="e.g. Q4 2026"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>
        </div>
      </div>

      {/* Section 5: Signature Amenities & Metadata Tags */}
      <div className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display border-b border-[#EDE5F5] pb-3 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#EC4899]"></span>
          <span>5. Luxury Amenities & Search Metadata</span>
        </h3>

        {/* Amenities Manager */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-2">
            Curated Signature Amenities
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.amenities.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F3E8FF] text-[#4C1D95] border border-[#DDD6FE]"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAmenity(item)}
                  className="ml-2 text-[#6D28D9] hover:text-[#E11D48] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2 max-w-md">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              placeholder="Add amenity (e.g. Sommelier Cellar, Rooftop Observatory)"
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
            />
            <button
              type="button"
              onClick={handleAddAmenity}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-colors shadow-xs"
            >
              Add
            </button>
          </div>
        </div>

        {/* Tags Manager */}
        <div className="pt-4 border-t border-[#EDE5F5]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-2">
            Catalog & Search Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-[#FCE7F3] text-[#DB2777] border border-[#FCE7F3]"
              >
                <span>#{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1.5 text-[#DB2777] hover:text-[#E11D48] transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2 max-w-xs">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Tag (e.g. Waterfront, Worli)"
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#EC4899] text-white hover:bg-[#DB2777] transition-colors shadow-xs"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-white/95 border border-[#EDE5F5] shadow-[0_15px_35px_rgba(120,81,216,0.12)] backdrop-blur-md flex items-center justify-between">
        <span className="text-xs text-[#786D88]">
          {isEditMode ? 'Ready to commit changes to database.' : 'Verify all parameters before publishing.'}
        </span>
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/projects"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#786D88] hover:text-[#241B35] hover:bg-[#F3EEFF] transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] text-white shadow-md shadow-[#6D28D9]/25 transition-all hover:-translate-y-0.5"
          >
            {isSaving ? 'Saving...' : isEditMode ? 'Save Modifications' : 'Publish Commission'}
          </button>
        </div>
      </div>
    </form>
  );
}
