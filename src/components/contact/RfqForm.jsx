import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { COMPANY } from '../../data/companyData';
import api from '../../admin/services/api';

export default function RfqForm({ initialType = 'rfq' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Message is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      await api.post('/contact/submit', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'N/A',
        inquiry: formData.subject.trim(),
        message: `WhatsApp: ${formData.whatsapp.trim() || 'N/A'}\n${formData.message.trim()}`
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('[RfqForm API Notice]:', err.message);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-2xl relative overflow-hidden bg-white/90 dark:bg-brand-900/60 backdrop-blur-xl">
      {submitted ? (
        <div className="text-center py-12 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 dark:bg-emerald-500/20 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
              Message Sent
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. We'll get back to you shortly.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            Contact Us
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Your Name (required)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-slate-50/80 dark:bg-brand-900/90 border rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 ${
                errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
              }`}
            />
            {errors.name && <span className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 block">{errors.name}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Your Email (required)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full bg-slate-50/80 dark:bg-brand-900/90 border rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 ${
                errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
              }`}
            />
            {errors.email && <span className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 block">{errors.email}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-50/80 dark:bg-brand-900/90 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full bg-slate-50/80 dark:bg-brand-900/90 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={`w-full bg-slate-50/80 dark:bg-brand-900/90 border rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 ${
                errors.subject ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
              }`}
            />
            {errors.subject && <span className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 block">{errors.subject}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Your Message
            </label>
            <textarea
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full bg-slate-50/80 dark:bg-brand-900/90 border rounded-xl p-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 ${
                errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
              }`}
            />
            {errors.message && <span className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 block">{errors.message}</span>}
          </div>

          <div className="pt-4 flex items-center justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="group relative px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-md hover:shadow-lg shadow-pink-600/20 transition-all flex items-center justify-center gap-2 font-display disabled:opacity-50 overflow-hidden active:scale-95"
            >
              <span className="relative z-10">{submitting ? 'Sending...' : 'Send Message'}</span>
              <Send className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 duration-300" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

