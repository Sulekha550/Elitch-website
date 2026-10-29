import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Building2,
  Sparkles,
  Phone,
  Mail,
  Send,
  Share2,
  Maximize2
} from 'lucide-react';
import api from '../admin/services/api';

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inquiry form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchDossier = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/projects/${slug}`);
        if (isMounted && res.success && res.project) {
          setProject(res.project);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load project details.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDossier();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone || !inquiryEmail || !inquiryMessage) return;

    setIsSubmittingInquiry(true);
    try {
      const res = await api.post('/leads/submit', {
        name: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        message: inquiryMessage,
        inquiryCategory: 'Site Visit Booking',
        sourceProject: project?._id
      });
      if (res.success) {
        setInquirySuccess(true);
        setInquiryName('');
        setInquiryEmail('');
        setInquiryPhone('');
        setInquiryMessage('');
      }
    } catch (err) {
      alert(err.message || 'Failed to submit inquiry.');
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C0D0C] text-[#F2EEE7] pt-32 pb-20 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#C7A15C]/20 border-t-[#C7A15C] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0C0D0C] text-[#F2EEE7] pt-32 pb-20 text-center">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#171916] border border-white/[0.08]">
          <h2 className="text-xl font-bold mb-2">Architectural Dossier Unavailable</h2>
          <p className="text-xs text-[#A4A49B] mb-6">The requested project could not be found.</p>
          <Link
            to="/portfolio"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#C7A15C] text-[#0C0D0C]"
          >
            ← Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0D0C] text-[#F2EEE7] pt-16 sm:pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back navigation */}
        <Link
          to="/portfolio"
          className="inline-flex items-center text-xs text-[#A4A49B] hover:text-[#C7A15C] transition-colors space-x-1"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Landmark Portfolio</span>
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl aspect-[16/9] sm:aspect-[21/9]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0C] via-[#0C0D0C]/40 to-transparent flex flex-col justify-end p-6 sm:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C7A15C] text-[#0C0D0C]">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 text-white border border-white/20">
                {project.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2EEE7] font-display">
              {project.title}
            </h1>
            <div className="flex items-center text-xs sm:text-sm text-[#C7A15C] mt-2 space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{project.location}</span>
              <span>•</span>
              <span className="text-[#F2EEE7] font-mono">{project.priceRange}</span>
            </div>
          </div>
        </div>

        {/* Spatial Specifications Grid */}
        {project.statistics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-6 rounded-3xl bg-[#171916] border border-white/[0.08]">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B7068]">
                Bedrooms
              </span>
              <div className="text-sm font-bold text-[#F2EEE7]">
                {project.statistics.bedrooms || 'Bespoke'}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B7068]">
                Bathrooms
              </span>
              <div className="text-sm font-bold text-[#F2EEE7]">
                {project.statistics.bathrooms || 'En-suite'}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B7068]">
                Built Area
              </span>
              <div className="text-sm font-bold text-[#F2EEE7]">
                {project.statistics.areaSqFt || 'Generous'}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B7068]">
                Elevation
              </span>
              <div className="text-sm font-bold text-[#F2EEE7]">
                {project.statistics.floors || 'High-Rise'}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B7068]">
                Units
              </span>
              <div className="text-sm font-bold text-[#F2EEE7]">
                {project.statistics.totalUnits || 'Limited Edition'}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B7068]">
                Handover
              </span>
              <div className="text-sm font-bold text-[#DFBE7B] font-mono">
                {project.statistics.possessionDate || 'Scheduled'}
              </div>
            </div>
          </div>
        )}

        {/* Two-Column Details (Narrative vs Inquiry Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Architectural Narrative & Amenities */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div className="p-8 rounded-3xl bg-[#171916] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-[#F2EEE7] uppercase tracking-wider font-display border-b border-white/[0.06] pb-3">
                Architectural Narrative
              </h3>
              <p className="text-sm text-[#A4A49B] leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Amenities */}
            {project.amenities && project.amenities.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#171916] border border-white/[0.08] space-y-4">
                <h3 className="text-base font-bold text-[#F2EEE7] uppercase tracking-wider font-display border-b border-white/[0.06] pb-3">
                  Signature Curated Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C7A15C] flex-shrink-0" />
                      <span className="text-xs text-[#F2EEE7] font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Lightbox */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#171916] border border-white/[0.08] space-y-4">
                <h3 className="text-base font-bold text-[#F2EEE7] uppercase tracking-wider font-display border-b border-white/[0.06] pb-3">
                  Elevation & Interior Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#101211] border border-white/[0.08]"
                    >
                      <img
                        src={typeof img === 'string' ? img : img.url}
                        alt={img.caption || `Gallery ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {img.caption && (
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-[11px] text-[#F2EEE7]">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Private Walkthrough Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-6 rounded-3xl bg-[#171916] border border-[#C7A15C]/30 shadow-2xl space-y-5">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C7A15C] block">
                  Private Consultation
                </span>
                <h3 className="text-lg font-bold text-[#F2EEE7] font-display mt-0.5">
                  Request Physical Walkthrough
                </h3>
                <p className="text-xs text-[#A4A49B] mt-1">
                  Connect with our senior acquisitions director for confidential prospectus and site visit.
                </p>
              </div>

              {inquirySuccess ? (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
                  <p className="font-semibold">Consultation Request Logged</p>
                  <p className="text-[11px] text-emerald-300/80">
                    Our architectural advisory team will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#A4A49B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Vikramaditya Birla"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#101211] border border-white/[0.08] text-xs text-[#F2EEE7] focus:outline-none focus:border-[#C7A15C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#A4A49B] mb-1">
                      Direct Telephone *
                    </label>
                    <input
                      type="tel"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+91 98200 00000"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#101211] border border-white/[0.08] text-xs text-[#F2EEE7] focus:outline-none focus:border-[#C7A15C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#A4A49B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="name@organization.com"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#101211] border border-white/[0.08] text-xs text-[#F2EEE7] focus:outline-none focus:border-[#C7A15C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#A4A49B] mb-1">
                      Specific Requirements / Questions *
                    </label>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Specify preferred floor elevation, bedroom counts, or investment timelines..."
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#101211] border border-white/[0.08] text-xs text-[#F2EEE7] focus:outline-none focus:border-[#C7A15C]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#C7A15C] text-[#0C0D0C] hover:bg-[#DFBE7B] transition-all flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    {isSubmittingInquiry ? (
                      <span>Scheduling...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Confidential Scoping</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="pt-3 border-t border-white/[0.06] text-center">
                <span className="text-[10px] text-[#6B7068]">
                  Direct Desk: +91 (022) 8800-VARDHA • WhatsApp Supported
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

