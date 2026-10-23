import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/companyData';

import { HERO_IMAGES } from '../data/imageAssets';

export default function PrivacyPolicyPage() {
  return (
    <div className="relative pt-24">
      {/* Full-Width Hero Image Cover */}
      <section className="relative border-b border-slate-200/80 dark:border-white/10">
        <div className="relative w-full h-[360px] sm:h-[420px] overflow-hidden group">
          <img
            src={HERO_IMAGES.corporateGlass.url}
            alt={HERO_IMAGES.corporateGlass.alt}
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            loading="eager"
          />
          {/* Multi-stop gradient overlay for crisp readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/40 dark:from-slate-950/95 dark:via-slate-950/85 dark:to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-6 w-full">
              <div className="space-y-4 pt-8">
                <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-pink-300 hover:text-white transition-colors font-semibold">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </Link>
                <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                  Global Privacy Policy &amp; Data Governance
                </h1>
                <p className="text-xs font-mono text-slate-300">
                  Last Updated &amp; Certified: October 2026 | Compliant with EU GDPR, UK DPA, and California CCPA/CPRA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Text */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-8">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-900/90 dark:border-white/10 shadow-sm">
            <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              1. Institutional Commitment to Respondent Privacy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {COMPANY.name} operates as an ethical data intelligence institution. We hold respondent privacy, data pseudonymization, and consumer trust as paramount pillars. We adhere stringently to the ICC/ESOMAR International Code on Market, Opinion, and Social Research and Data Analytics.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">2. Scope of Collected Information</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              We collect information under two distinct operational paradigms:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li><strong className="text-slate-900 dark:text-white">Enterprise Client Inquiries (B2B):</strong> Organization name, professional email, phone number, and project scoping parameters submitted via our RFQ bidding portals.</li>
              <li><strong className="text-slate-900 dark:text-white">Panelist Research Data (B2B &amp; B2C):</strong> Voluntary responses to demographic, psychographic, and industry-specific survey instruments, aggregated exclusively for statistical research modeling.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">3. Data Pseudonymization &amp; Anonymization</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Survey responses delivered to clients are stripped of Personally Identifiable Information (PII) unless explicit, recorded, informed consent has been obtained for specific qualitative research (e.g. video interviews). Raw survey data feeds utilize randomized cryptographic identifiers (UIDs).
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">4. Your Global Rights (GDPR / CCPA)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Regardless of your geographic location, you retain the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <li>Request access to the personal records associated with your panel account.</li>
              <li>Request instantaneous permanent deletion ("Right to be Forgotten").</li>
              <li>Opt-out of any prospective survey invitations or email notifications.</li>
              <li>Request data portability in standard JSON/CSV schema.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">5. Data Protection Officer (DPO) Contact</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For any privacy inquiries or to exercise your statutory rights, please contact our Data Governance Officer at:
            </p>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300">
              Email: <a href={`mailto:${COMPANY.emails.general}`} className="text-pink-700 dark:text-pink-400 underline font-semibold">{COMPANY.emails.general}</a><br />
              Subject Header: ATTN: Data Privacy &amp; Governance Desk
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
