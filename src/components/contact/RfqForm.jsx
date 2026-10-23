import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  FileCheck, 
  Building2, 
  Users, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { COMPANY, SERVICES } from '../../data/companyData';

export default function RfqForm({ initialType = 'rfq' }) {
  const [inquiryType, setInquiryType] = useState(initialType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    targetAudience: 'B2B Enterprise Decision Makers',
    sampleSize: '1000',
    selectedServices: ['Survey Programming'],
    timeline: 'Immediate (Within 2 weeks)',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rfqReferenceId, setRfqReferenceId] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid corporate email address';
    }
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.message.trim()) errs.message = 'Please provide a brief outline of your research scope';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Generate unique reference tracking ID
    const refId = `ER-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqReferenceId(refId);

    // Simulate fast enterprise submission feedback
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleServiceToggle = (serviceTitle) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(serviceTitle);
      return {
        ...prev,
        selectedServices: exists 
          ? prev.selectedServices.filter(s => s !== serviceTitle)
          : [...prev.selectedServices, serviceTitle]
      };
    }); 
  };

  // Direct mailto link generator for native desktop client fallback
  const directMailto = `mailto:${inquiryType === 'rfq' ? COMPANY.emails.rfq : COMPANY.emails.general}?subject=${encodeURIComponent(
    `[${inquiryType.toUpperCase()}] Project Scope Inquiry - ${formData.company || 'Enterprise Client'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nTarget Audience: ${formData.targetAudience}\nSample Size: n=${formData.sampleSize}\nTimeline: ${formData.timeline}\nSelected Services: ${formData.selectedServices.join(', ')}\n\nProject Scope:\n${formData.message}`
  )}`;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-2xl relative overflow-hidden bg-white/90 dark:bg-brand-900/60 backdrop-blur-xl">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 dark:bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

      {submitted ? (
        <div className="text-center py-12 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 dark:bg-emerald-500/20 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-pink-600 dark:text-pink-400 uppercase tracking-wider font-semibold">
              Inquiry Dispatched to Bidding Desk
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
              Project Specification Received
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. Your project parameter dossier has been assigned reference ID <span className="font-mono text-pink-600 dark:text-pink-400 font-bold">{rfqReferenceId}</span>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 dark:bg-white/[0.03] dark:border-white/5 max-w-md mx-auto text-left text-xs space-y-2 font-mono">
            <div className="text-slate-500 dark:text-slate-400">Assigned Routing: <span className="text-slate-900 dark:text-white font-semibold">{inquiryType === 'rfq' ? COMPANY.emails.rfq : COMPANY.emails.general}</span></div>
            <div className="text-slate-500 dark:text-slate-400">Target Audience: <span className="text-slate-900 dark:text-white font-semibold">{formData.targetAudience}</span></div>
            <div className="text-slate-500 dark:text-slate-400">Sample Target: <span className="text-pink-600 dark:text-pink-400 font-bold">n={formData.sampleSize}</span></div>
            <div className="text-slate-500 dark:text-slate-400">SLA Response: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Within 2 Business Hours</span></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href={directMailto}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Open Direct Mail Copy in Client
            </a>
            <button
              onClick={() => { setSubmitted(false); }}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Submit Another Scope
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-pink-600 dark:text-pink-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Empirical Project Feasibility
              </span>
              <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-1">
                {inquiryType === 'rfq' ? 'Request for Quote (RFQ)' : 'General Corporate Inquiry'}
              </h3>
            </div>

            {/* Type selector toggle */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setInquiryType('rfq')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  inquiryType === 'rfq' 
                    ? 'bg-pink-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Project RFQ
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('general')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  inquiryType === 'general' 
                    ? 'bg-pink-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                General Inquiry
              </button>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Dr. Jordan Hayes"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-slate-50/80 dark:bg-brand-900/90 border rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white dark:focus:bg-brand-900 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 ${
                  errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                }`}
              />
              {errors.name && <span className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 block">{errors.name}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Work Email *
              </label>
              <input
                type="email"
                placeholder="jordan.hayes@enterprise.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full bg-slate-50/80 dark:bg-brand-900/90 border rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white dark:focus:bg-brand-900 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 ${
                  errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                }`}
              />
              {errors.email && <span className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 block">{errors.email}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Company / Institution *
              </label>
              <input
                type="text"
                placeholder="Acme Global Health / TechCorp"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full bg-slate-50/80 dark:bg-brand-900/90 border rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white dark:focus:bg-brand-900 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 ${
                  errors.company ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                }`}
              />
              {errors.company && <span className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 block">{errors.company}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Audience Demographics
              </label>
              <select
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full bg-slate-50/80 dark:bg-brand-900/90 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:bg-white dark:focus:bg-brand-900 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
              >
                <option value="B2B Enterprise Decision Makers" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">B2B Enterprise Decision Makers (C-Suite / IT / Ops)</option>
                <option value="General Consumer (B2C Nat Rep)" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">General Consumer (B2C Nat Rep)</option>
                <option value="Healthcare & Medical KOLs" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">Healthcare Professionals &amp; Medical KOLs</option>
                <option value="Fintech & High Net Worth" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">Fintech, Investors &amp; High Net Worth</option>
                <option value="Custom Mixed Cohort" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">Custom Stratified Mixed Cohort</option>
              </select>
            </div>
          </div>

          {/* Sample Size and Timeline */}
          {inquiryType === 'rfq' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Target Sample Size (n)</span>
                  <span className="font-mono text-cyan-700 dark:text-accent-cyan font-bold">n={formData.sampleSize}</span>
                </label>
                <select
                  value={formData.sampleSize}
                  onChange={(e) => setFormData({ ...formData, sampleSize: e.target.value })}
                  className="w-full bg-white dark:bg-brand-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option value="300" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">n = 300 (Pilot / Quick Test)</option>
                  <option value="500" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">n = 500 (Regional Study)</option>
                  <option value="1000" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">n = 1,000 (Standard Nat Rep)</option>
                  <option value="2500" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">n = 2,500 (Multi-Cell Longitudinal)</option>
                  <option value="5000+" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">n = 5,000+ (High-Scale Global)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Desired Fieldwork Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full bg-white dark:bg-brand-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option value="Rapid Pulse (24-48 hours)" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">Rapid Pulse (24-48 hours)</option>
                  <option value="Immediate (Within 2 weeks)" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">Immediate (Within 2 weeks)</option>
                  <option value="Standard (2-4 weeks)" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">Standard (2-4 weeks)</option>
                  <option value="Future Quarterly Planning" className="bg-white text-slate-900 dark:bg-brand-900 dark:text-white">Future Quarterly Planning</option>
                </select>
              </div>
            </div>
          )}

          {/* Scope Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Project Scope, Incidence Rate (IR), and Methodology Details *
            </label>
            <textarea
              rows="4"
              placeholder="Outline target quotas, country coverage (e.g. US, UK, Germany), estimated length of interview (LOI), and any specialized screening criteria..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full bg-slate-50/80 dark:bg-brand-900/90 border rounded-xl p-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white dark:focus:bg-brand-900 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 ${
                errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
              }`}
            ></textarea>
            {errors.message && <span className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 block">{errors.message}</span>}
          </div>

          {/* Submission and Direct Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 dark:border-white/10">
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span>Target Desk: <strong className="text-slate-900 dark:text-white font-mono">{inquiryType === 'rfq' ? COMPANY.emails.rfq : COMPANY.emails.general}</strong></span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                disabled={submitting}
                className="group relative w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-md hover:shadow-lg shadow-pink-600/20 transition-all flex items-center justify-center gap-2 font-display disabled:opacity-50 overflow-hidden active:scale-95"
              >
                <span className="relative z-10">{submitting ? 'Transmitting Scope...' : 'Transmit Project RFQ'}</span>
                <Send className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 duration-300" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
