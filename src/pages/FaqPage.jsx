import React, { useState } from 'react';
import { FAQ_DATA, COMPANY } from '../data/companyData';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Mail,
  ArrowUpRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/common/ScrollReveal';
import { HERO_IMAGES, ABOUT_IMAGES } from '../data/imageAssets';

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState('0-0');

  const toggleAccordion = (id) => {
    setExpandedIndex(expandedIndex === id ? null : id);
  };

  return (
    <div className="relative pt-24">
      {/* Background glow */}
      <div className="absolute top-0 right-1/3 w-[750px] h-[450px] bg-pink-300/15 dark:bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with Knowledge Base banner */}
      <section className="relative pt-0 pb-0 border-b border-slate-200/80 dark:border-white/5 overflow-hidden">
        <div className="relative w-full h-[380px] sm:h-[440px] overflow-hidden group">
          <img
            src={HERO_IMAGES.globalNetwork.url}
            alt={HERO_IMAGES.globalNetwork.alt}
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/65 to-slate-900/25 dark:from-slate-950/95 dark:via-slate-950/75 dark:to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent dark:from-slate-950/80" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-3xl space-y-6 pt-6">
                <div className="flex items-center gap-2 text-xs font-mono text-pink-300 dark:text-pink-400">
                  <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
                  <span className="text-slate-500">/</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white">
                    Knowledge Base
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Frequently Asked <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-rose-300">
                    Questions.
                  </span>
                </h1>

                <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                  Everything you need to know about our 5M+ panel recruitment, anti-fraud scrubbing, turnaround SLAs, and survey engineering workflows.
                </p>

                {/* Search Input */}
                <div className="relative max-w-lg">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search panel capabilities, turnaround times, compliance..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20 shadow-md transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {FAQ_DATA.map((cat, catIdx) => {
            const filteredQuestions = cat.questions.filter(
              q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredQuestions.length === 0) return null;

            return (
              <ScrollReveal key={cat.category} animation="fade-up" duration={600} className="space-y-4">
                <h2 className="text-lg font-display font-bold text-pink-700 dark:text-pink-400 tracking-wide uppercase text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  {cat.category}
                </h2>

                <div className="space-y-3">
                  {filteredQuestions.map((item, qIdx) => {
                    const uniqueId = `${catIdx}-${qIdx}`;
                    const isExpanded = expandedIndex === uniqueId;

                    return (
                      <div
                        key={qIdx}
                        className="glass-card rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden bg-white/90 dark:bg-white/[0.02] transition-colors"
                      >
                        <button
                          onClick={() => toggleAccordion(uniqueId)}
                          className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                        >
                          <span className="font-display font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                            {item.q}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent animate-in fade-in duration-200">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            );
          })}

          {/* Unanswered Questions Callout with Advisor Avatar */}
          <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-white/10 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 bg-white dark:bg-slate-900/90">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-pink-400/40 shadow-sm">
                <img
                  src={ABOUT_IMAGES.leadershipGovernance.url}
                  alt={ABOUT_IMAGES.leadershipGovernance.alt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">
                  Have a specialized research question?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Our survey architects and bidding specialists are available directly at <span className="text-pink-700 dark:text-pink-400 font-mono font-semibold">{COMPANY.emails.rfq}</span>.
                </p>
              </div>
            </div>

            <Link
              to="/contact?type=general"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs shadow-md transition-all shrink-0 inline-flex items-center gap-1.5 active:scale-95"
            >
              <span>Contact Bidding Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
