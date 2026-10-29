import React, { useState } from 'react';
import { METHODOLOGY_STEPS } from '../../data/companyData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Binary, 
  BarChart3, 
  Workflow, 
  Zap, 
  Check, 
  Clock, 
  ChevronRight,
  Sliders,
  BadgeCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../common/ScrollReveal';

// Enhanced step details with rigorous operational metadata
const STEP_ENRICHMENTS = [
  {
    icon: Sliders,
    phase: "Phase 1: Architecture",
    timeframe: "Day 0 – 1",
    metricLabel: "Statistical Power",
    metricValue: "99.4%",
    qualityGate: "PhD Methodologist Feasibility Sign-off",
    specifications: [
      "Rigorous hypothesis formulation & statistical power calculation (p < 0.05)",
      "Target demographic & firmographic incidence rate (IR) modeling",
      "Stratified quota cell architecture & cross-market margin of error modeling",
      "Cross-device questionnaire flow UX & cognitive friction elimination"
    ]
  },
  {
    icon: Binary,
    phase: "Phase 2: Survey Engineering",
    timeframe: "Day 1 – 2",
    metricLabel: "Platform Conformance",
    metricValue: "100%",
    qualityGate: "Full Simulation Matrix Passed",
    specifications: [
      "Multi-platform scripting across Confirmit, Decipher, and Qualtrics",
      "Dynamic conjoint, MaxDiff, and multimedia piping algorithms",
      "Algorithmic honeypot questions, red herrings, and trap logic injection",
      "40+ dialect localization with cultural context sensitivity audits"
    ]
  },
  {
    icon: Workflow,
    phase: "Phase 3: Sample Routing",
    timeframe: "Day 2 – 4",
    metricLabel: "Global Panel Reach",
    metricValue: "5M+ Verified",
    qualityGate: "Double Opt-In Identity Verified",
    specifications: [
      "Dynamic sample balancing across 5M+ verified B2B and B2C panelists",
      "Real-time quota capping to prevent cell over-representation",
      "Multi-layer GeoIP geolocation, proxy, and VPN anomaly interception",
      "Continuous incidence tracking with automated incentive routing"
    ]
  },
  {
    icon: Filter,
    phase: "Phase 4: Algorithmic Scrubbing",
    timeframe: "Continuous Fieldwork",
    metricLabel: "Bot Tolerance",
    metricValue: "0.00%",
    qualityGate: "ESOMAR 28 / ISO 20252 Audited",
    specifications: [
      "Speeding detection via standard-deviation keystroke latency profiling",
      "Automated straight-liner and repetitive pattern elimination",
      "NLP semantic parsing on open-ended text to purge synthetic AI outputs",
      "Device digital fingerprinting to prevent repeat cross-panel respondents"
    ]
  },
  {
    icon: BarChart3,
    phase: "Phase 5: Executive Telemetry",
    timeframe: "Day 5+",
    metricLabel: "Delivery Speed",
    metricValue: "< 24 Hours",
    qualityGate: "Board-Ready Executive Sign-off",
    specifications: [
      "Cleaned data exports delivered in SPSS (.sav), CSV, and formatted Excel",
      "Automated statistical significance testing (z-tests, t-tests, ANOVA)",
      "Interactive executive dashboards in Tableau, PowerBI, or web telemetry",
      "Actionable strategic debrief with high-confidence decision roadmaps"
    ]
  }
];

export default function MethodologyFlow() {
  const [activeStep, setActiveStep] = useState(0);

  // Combine company data steps with operational metadata
  const steps = METHODOLOGY_STEPS.map((step, idx) => ({
    ...step,
    ...STEP_ENRICHMENTS[idx]
  }));

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section id="methodology-section" className="relative py-28 bg-slate-900 border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-cyan-400/10 via-indigo-400/10 to-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-accent-violet/10 text-indigo-700 dark:text-accent-violet border border-indigo-200 dark:border-accent-violet/20 mb-4 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-accent-violet" />
              <span>ISO 20252 &amp; ESOMAR Audited Framework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Engineered for Mathematical Certainty &amp; Statistical Power
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Every research engagement follows our audited five-stage empirical pipeline. From architectural scoping to triple-layer scrubbing, we eliminate noise so your leadership acts on indisputable data.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Step Navigator Bar */}
        <ScrollReveal animation="fade-up" delay={150} duration={700}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-2 rounded-2xl bg-slate-100/80 dark:bg-brand-900/40 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative text-left p-3.5 rounded-xl transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? 'bg-white dark:bg-white/10 shadow-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white'
                      : 'hover:bg-white/50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded-md ${
                      isActive 
                        ? 'bg-cyan-100 dark:bg-accent-cyan/20 text-cyan-800 dark:text-accent-cyan' 
                        : 'bg-slate-200/60 dark:bg-white/5 text-slate-500'
                    }`}>
                      {step.step}
                    </span>
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-600 dark:text-accent-cyan' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                    }`} />
                  </div>
                  <div className="text-xs font-semibold truncate">
                    {step.name}
                  </div>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Stage Deep-Dive Inspector Card */}
        <ScrollReveal animation="fade-up" delay={250} duration={700}>
          <div className="relative rounded-3xl bg-slate-800/60 border border-white/10 shadow-xl overflow-hidden p-8 sm:p-10 mb-14">
            {/* Top row: Stage Tag & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 dark:from-accent-cyan/20 dark:to-accent-violet/20 flex items-center justify-center border border-cyan-200 dark:border-accent-cyan/30">
                  <CurrentIcon className="w-6 h-6 text-cyan-700 dark:text-accent-cyan" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-accent-cyan">
                      Stage {current.step} — {current.phase}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" /> {current.timeframe}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">
                    {current.name}
                  </h3>
                </div>
              </div>

              {/* Quality Gate Badge */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <BadgeCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>{current.qualityGate}</span>
              </div>
            </div>

            {/* Content Body: Narrative + Technical Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
              {/* Left Column: Narrative description & metric */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                    Operational Blueprint
                  </h4>
                  <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
                    {current.desc}
                  </p>
                </div>

                {/* Key Telemetry Metric Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                      Target Benchmark
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {current.metricLabel}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-cyan-700 dark:text-accent-cyan">
                    {current.metricValue}
                  </div>
                </div>

                {/* Stage switcher buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
                  >
                    &larr; Previous Stage
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 transition-colors flex items-center gap-1.5"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Key Verification Checks & Controls */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                  Audited Verification Checks ({current.specifications.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {current.specifications.map((spec, sIdx) => (
                    <div 
                      key={sIdx}
                      className="p-4 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex items-start gap-3 hover:border-cyan-300 dark:hover:border-accent-cyan/40 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-accent-cyan/20 text-cyan-800 dark:text-accent-cyan flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pipeline Guarantee Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-teal-500/5 border border-cyan-200/60 dark:border-accent-cyan/20 flex items-center justify-between flex-wrap gap-3 mt-4">
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>Every step generates tamper-proof audit trails for board compliance.</span>
                  </div>
                  <a
                    href="#rfq-section"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:text-cyan-800 dark:text-accent-cyan dark:hover:underline"
                  >
                    <span>Request Study Scoping</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5-Step Pipeline Horizontal Ribbon / Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((st, i) => (
            <div 
              key={st.step}
              onClick={() => setActiveStep(i)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${
                activeStep === i 
                  ? 'bg-slate-700 border-pink-500 shadow-md scale-[1.02]' 
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-400">
                  {st.step}
                </span>
                <span className="text-[10px] font-mono text-cyan-700 dark:text-accent-cyan font-semibold">
                  {st.phase.split(':')[0]}
                </span>
              </div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                {st.name}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

