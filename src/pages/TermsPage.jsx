import React from 'react';
import { FileCheck, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/companyData';

import { HERO_IMAGES } from '../data/imageAssets';

export default function TermsPage() {
  return (
    <div className="relative pt-16">
      {/* Full-Width Hero Image Cover */}
      <section className="relative border-b border-slate-200/80 dark:border-white/10">
        <div className="relative w-full h-[360px] sm:h-[420px] overflow-hidden group">
          <img
            src={HERO_IMAGES.telemetryBackdrop.url}
            alt={HERO_IMAGES.telemetryBackdrop.alt}
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
                  Terms &amp; Conditions of Service
                </h1>
                <p className="text-xs font-mono text-slate-300">
                  Master Service &amp; Panel Platform Terms | Effective October 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Body */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-8">
          
          <div className="space-y-3">
            <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">1. Agreement to Terms</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              By accessing the websites, panel sampling APIs, and digital intelligence portals owned and operated by {COMPANY.name}, you agree to be bound by these Terms and Conditions. If you are entering into these terms on behalf of a corporate enterprise, you represent that you possess lawful authority to bind said entity.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">2. Enterprise Research Services &amp; Deliverables</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              All quantitative sampling, custom survey programming, qualitative recruitment, and strategic analytics rendered by Elicit Research are governed by customized Statements of Work (SOWs) executed through our RFQ bidding desk (<span className="text-pink-700 dark:text-pink-400 font-mono font-semibold">{COMPANY.emails.rfq}</span>).
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">3. Panelist Conduct &amp; Incentive Integrity</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Respondents participating in our global research panels agree to provide genuine, truthful, and non-automated responses. The deployment of automated bot scripts, synthetic generative AI answers, multiple duplicate accounts, or proxy IP circumvention constitutes fraud and will result in immediate termination of panel membership and forfeiture of pending incentive balances.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">4. Intellectual Property &amp; Data Ownership</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Upon full settlement of agreed project fees, clients retain exclusive ownership of final cleaned research datasets, customized presentation decks, and bespoke research conclusions. Elicit Research retains all proprietary rights to its underlying survey scripting frameworks, honeypot anti-fraud algorithms, and panelist sampling infrastructure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">5. Governing Law &amp; Jurisdiction</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              These terms are governed by and construed under the laws of the State of New York, USA, without regard to its conflict of law principles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300">
            Direct Legal Correspondence: <a href={`mailto:${COMPANY.emails.general}`} className="text-pink-700 dark:text-pink-400 underline font-semibold">{COMPANY.emails.general}</a>
          </div>

        </div>
      </section>
    </div>
  );
}

