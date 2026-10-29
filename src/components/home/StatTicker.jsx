import React from 'react';
import { COMPANY } from '../../data/companyData';
import { Users, FileCheck, Award, Globe } from 'lucide-react';
import AnimatedCounter from '../common/AnimatedCounter';
import ScrollReveal from '../common/ScrollReveal';

export default function StatTicker() {
  const getIcon = (id) => {
    switch(id) {
      case 'panel-members': return <Users className="w-5 h-5 text-accent-cyan" />;
      case 'surveys-done': return <FileCheck className="w-5 h-5 text-emerald-400" />;
      case 'rewarded-so-far': return <Award className="w-5 h-5 text-accent-violet" />;
      case 'countries-covered': return <Globe className="w-5 h-5 text-amber-400" />;
      default: return <Users className="w-5 h-5 text-accent-cyan" />;
    }
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-12 bg-slate-50/60 dark:bg-brand-900/40 border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-800 dark:text-accent-cyan font-semibold px-3 py-1 rounded-full bg-cyan-50 dark:bg-accent-cyan/10 border border-cyan-200 dark:border-accent-cyan/20">
              Empirical Proof of Scale
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-3">
              Verified Global Research Footprint
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              Backed by double opt-in respondents, rigorous field audits, and high respondent retention worldwide.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY.stats.map((stat, idx) => (
            <ScrollReveal 
              key={stat.id} 
              animation="fade-up" 
              delay={idx * 120}
              duration={600}
            >
              <div className="glass-card rounded-2xl p-6 relative overflow-hidden h-full flex flex-col justify-between border border-slate-200/90 dark:border-white/10 shadow-sm bg-white/80 dark:bg-white/[0.02]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      {getIcon(stat.id)}
                    </div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                      Verified Data
                    </span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                    <AnimatedCounter value={stat.value} duration={1800} />
                  </div>

                  <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    {stat.label}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stat.sublabel}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-accent-cyan/60"></span>
                  <span className="text-[10px] font-mono text-slate-500">Global Metric</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

