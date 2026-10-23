import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Search,
  BarChart3,
  Target,
  Globe2,
  Lightbulb,
  ShieldCheck,
  Database,
  Users,
  Compass,
  Workflow,
  ClipboardCheck,
  MessageSquare,
  Zap,
  Activity,
  Check,
  Clock,
  Layers,
  FileCheck,
  Award,
  ChevronRight,
  Building2,
  MapPin,
  Play,
  X,
  Rocket,
  Cpu,
  Globe
} from 'lucide-react';


import GlobalReachVisual from '../components/home/GlobalReachVisual';
import ServicesMatrix from '../components/home/ServicesMatrix';
import MethodologyFlow from '../components/home/MethodologyFlow';
import Hero3DScene from '../components/home/Hero3DScene';
import RfqForm from '../components/contact/RfqForm';
import ScrollReveal from '../components/common/ScrollReveal';
import { COMPANY } from '../data/companyData';
import { HUB_CITY_IMAGES } from '../data/imageAssets';

// Curated high-resolution Unsplash assets for full-length showcase
const growthImage =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=85';

export default function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <main className="overflow-hidden bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-screen pt-16">
      
      {/* =========================================================================
          HERO SECTION — "WE Provide Authentic Data, Credible Insights, & Successful Strategies"
          + Full-Length Expansive Growth Showcase
         ========================================================================= */}
      <section className="hero-section relative w-full h-[calc(100svh-6rem)] min-h-[600px] flex items-start overflow-hidden border-b border-white/5 box-border pt-0 sm:pt-2 lg:pt-4">
        
        {/* Subtle background ambient glowing gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-pink-500/20 via-indigo-500/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute -top-32 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Ambient 3D Interactive Canvas Scene */}
        <Hero3DScene className="opacity-60" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Top Hero Editorial Content — two-column on lg+, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 mb-10 sm:mb-12">

            {/* ── LEFT: Heading / Description / CTAs / Trust Bar ── */}
            <div className="flex flex-col space-y-5 text-center lg:text-left min-w-0">

              {/* Live Research Telemetry Pill */}
              <ScrollReveal animation="fade-up" duration={600}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold bg-white/[0.06] border border-white/10 shadow-sm backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-slate-700 dark:text-slate-200 font-mono tracking-wide uppercase text-[11px]">
                    Global Market Research &amp; Intelligence Solutions · 45+ Countries
                  </span>
                </div>
              </ScrollReveal>

              {/* Exact Headline from Reference: "WE Provide Authentic Data, Credible Insights, & Successful Strategies" */}
              <ScrollReveal animation="fade-up" delay={100} duration={650}>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-display font-extrabold tracking-tight text-white leading-[1.2]">
                  <span className="inline-block bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3 py-0.5 rounded-lg shadow-sm mr-2.5 text-xl sm:text-2xl lg:text-3xl align-middle">
                    WE
                  </span>
                  <span>Provide Authentic Data,</span>{' '}
                  <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent block sm:inline">
                    Credible Insights, &amp; Successful Strategies
                  </span>
                </h1>
              </ScrollReveal>

              {/* Subheadline */}
              <ScrollReveal animation="fade-up" delay={200} duration={650}>
                <p className="max-w-2xl lg:max-w-none text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Elicit Research &amp; Insights Inc. empowers enterprise brands with precision B2B and B2C sampling, advanced survey programming, and empirical intelligence that drives compounding growth.
                </p>
              </ScrollReveal>

              {/* Primary CTAs */}
              <ScrollReveal animation="fade-up" delay={300} duration={650}>
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <a
                    href="#rfq-section"
                    className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg shadow-pink-600/20 hover:shadow-xl transition-all duration-300 transform active:scale-95"
                  >
                    <span>Let's Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <a
                    href="#services-section"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 shadow-sm"
                  >
                    <span>Explore Our Services</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </a>
                </div>
              </ScrollReveal>

              {/* Verified Trust Standards Bar */}
              <ScrollReveal animation="fade-up" delay={380} duration={650}>
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-7 gap-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ESOMAR 28 Compliant
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Triple-Layer Fraud Scrubbing
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    &lt; 2-Hour Bidding Response
                  </span>
                </div>
              </ScrollReveal>

            </div>
            {/* ── END LEFT ── */}

            {/* ── RIGHT: Hero Image (light & colorful) ── */}
            <ScrollReveal animation="fade-up" delay={200} duration={900}>
              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[580px] lg:max-w-none">
                  <div aria-hidden="true" className="absolute -right-3 -top-3 h-full w-full border-4 border-pink-500 rounded-3xl" />
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-pink-200/40 dark:ring-pink-500/20"
                    style={{ boxShadow: '0 20px 60px rgba(236,72,153,0.18), 0 8px 24px rgba(99,102,241,0.15)', background: 'linear-gradient(135deg, #E91E63 0%, #8b5cf6 100%)' }}
                  >
                    <img
                      src="/images/growth-graph-hero.jpg"
                      alt="Business growth graph"
                      className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                      loading="eager"
                      fetchPriority="high"
                      style={{ maxHeight: '420px', display: 'block', filter: 'brightness(1.3) contrast(1.1)' }}
                    />
                    <div className="absolute inset-0 pointer-events-none mix-blend-screen"
                      style={{ background: 'linear-gradient(135deg, rgba(233,30,99,0.7), rgba(139,92,246,0.6))' }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
            {/* ── END RIGHT ── */}



          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "Insights. Innovation. Impact" & The 3 Stat Blocks (Page 1)
         ========================================================================= */}
      <section className="relative py-24 sm:py-28 bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-white/5">
        {/* Ambient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Authentic Copy from Page 1 of Reference */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal animation="fade-up" duration={650}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Insights.{' '}
                  <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                    Innovation.
                  </span>{' '}
                  Impact
                </h2>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={120} duration={650}>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                  Elicit Research &amp; Insights Inc. helps you to make the right decisions and stay ahead of competition with technological, statistical and comprehensive market research. We connect you with the right audience; our solution helps you discover opportunities and accelerate your growth.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={240} duration={650}>
                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="group inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-white/5 hover:bg-pink-950/50 border border-white/10 shadow-sm transition-all duration-300 active:scale-95"
                  >
                    <span className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-pink-600/30 group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </span>
                    <span>Watch Video</span>
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: 3 Offset Colorful Stat Blocks from Page 1 (60+ Clients, 30+ Countries, 130+ Experts) */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal animation="fade-up" delay={200} duration={700}>
                <div className="grid grid-cols-2 gap-4 relative">
                  
                  {/* Card 1: 60+ Clients (Teal Card) */}
                  <div className="col-span-2 sm:col-span-1 sm:translate-y-6 p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-teal-500/20 transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[150px]">
                    <div className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                      60+
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-bold block">Clients</span>
                      <span className="text-xs text-teal-100 opacity-90">Global Enterprise Leaders</span>
                    </div>
                  </div>

                  {/* Card 2: 30+ Countries (Blue Card) */}
                  <div className="col-span-2 sm:col-span-1 p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[150px]">
                    <div className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                      30+
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-bold block">Countries</span>
                      <span className="text-xs text-blue-100 opacity-90">Audited Cross-Border Markets</span>
                    </div>
                  </div>

                  {/* Card 3: 130+ Experts (Pink/Magenta Card) */}
                  <div className="col-span-2 sm:col-span-1 sm:col-start-2 p-6 rounded-3xl bg-gradient-to-br from-pink-600 to-rose-600 text-white shadow-xl shadow-pink-500/20 transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[150px]">
                    <div className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                      130+
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-bold block">Experts</span>
                      <span className="text-xs text-pink-100 opacity-90">PhD Methodologists &amp; Analysts</span>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          STAT TICKER — Verified Scale (5M+ Members, 10K+ Survey Done, $30M+ Incentives, 45+ Reach)
         ========================================================================= */}


      {/* =========================================================================
          SECTION 3: "Explore Our Services" (10 Core Capabilities Grid)
         ========================================================================= */}
      <section id="services-section" className="py-24 sm:py-28 bg-slate-50 dark:bg-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <ScrollReveal animation="fade-up" duration={600}>
              <div className="max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-semibold px-3 py-1 rounded-full bg-pink-950/60 border border-pink-800/50 inline-block mb-3">
                  Comprehensive Portfolio
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                  Explore Our Services
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-base font-semibold mt-2">
                  Our feature-rich services are meant for your success.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  With a reliable and efficient team, we garner technology and innovation for extending the best solutions to you.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150} duration={600}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/5 border border-white/10 shadow-sm hover:bg-white/10 transition-colors"
              >
                <span>View Full Service Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>

          <ServicesMatrix />
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: "We Translate Your Vision Into Action" (3 Feature Columns from Page 2)
         ========================================================================= */}
      <section className="py-24 sm:py-28 bg-slate-100 dark:bg-slate-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal animation="fade-up" duration={650}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-semibold px-3 py-1 rounded-full bg-pink-950/60 border border-pink-800/50 inline-block mb-3">
                Execution Framework
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
                We Translate Your Vision Into Action
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mt-3">
                Harnessing advanced statistical sampling and automated technology to convert corporate vision into market reality.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Accurate Audience Measurement",
                desc: "Helping you connect with people who matter; assisting your idea to become socially and financially hit.",
                image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
                color: "from-pink-500/20 to-rose-500/20 text-pink-600 dark:text-pink-400"
              },
              {
                icon: Cpu,
                title: "Automated Tools",
                desc: "Forget manual for it's the power of our techno-research that provides you with data that matters!",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
                color: "from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400"
              },
              {
                icon: Globe,
                title: "Accelerate Global Reach",
                desc: "Let's go beyond the local borders and take your idea to the global domain.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
                color: "from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400"
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal 
                  key={pillar.title}
                  animation="fade-up"
                  delay={idx * 150}
                  duration={650}
                >
                  <div className="group rounded-3xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-pink-500/40 transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                      <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/10 backdrop-blur-md shadow-md border border-white/15">
                        <Icon className="w-5 h-5 text-pink-400" />
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          {pillar.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          {pillar.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono font-semibold text-pink-500 dark:text-pink-400">
                        <span>● Strategic Execution</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          GLOBAL REACH VISUAL — Dynamic Regional Sampling Feasibility
         ========================================================================= */}
      {/* <GlobalReachVisual /> */}

      {/* =========================================================================
          METHODOLOGY FLOW — 5-Stage Scientific Research Architecture
         ========================================================================= */}
      {/* <MethodologyFlow /> */}

      {/* =========================================================================
          SECTION 6: DUAL SPLIT BANNER (Exact Replica from Page 2 of Reference)
         ========================================================================= */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 border border-slate-200 dark:border-white/10">
              
              {/* Left Side: Vibrant Magenta Quote Banner */}
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <span className="text-4xl lg:text-5xl font-serif text-white/40 block mb-2 leading-none">“</span>
                  <blockquote className="text-lg sm:text-xl lg:text-2xl font-display font-bold leading-snug tracking-tight text-white">
                    Our market research experts develop ground-breaking analyses and assist you in fueling your business across international boundaries
                  </blockquote>
                </div>

                <div className="pt-8 mt-6 border-t border-white/20 flex items-center justify-between">
                  <div className="text-xs font-mono tracking-widest uppercase text-pink-100 font-semibold">
                    Elicit Research &amp; Insights Inc.
                  </div>
                  <Award className="w-5 h-5 text-white/80" />
                </div>
              </div>

              {/* Right Side: Midnight Charcoal / Slate Skyrocket CTA */}
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 bg-slate-100 dark:bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-pink-400 shadow-md">
                    <Rocket className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                    Skyrocket Your Business To The Next Level!
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    Partner with Elicit Research for guaranteed data authenticity, rapid bidding turnaround, and empirical clarity.
                  </p>
                </div>

                <div className="pt-8 mt-6">
                  <a
                    href="#rfq-section"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg shadow-pink-600/30 transition-all duration-300 transform active:scale-95"
                  >
                    <span>Select our Clientship</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          GLOBAL OPERATING HUBS SHOWCASE WITH CITY UNSPLASH ASSETS
         ========================================================================= */}
      <section className="py-20 sm:py-24 bg-slate-100 dark:bg-slate-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-semibold px-3 py-1 rounded-full bg-pink-950/60 border border-pink-800/50 inline-block mb-3">
              Worldwide Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Global Operating Hubs
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              Strategic presences across the Americas, EMEA, and Asia-Pacific ensuring continuous 24/7 project coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                city: "New York",
                region: "North American Headquarters",
                address: COMPANY.headquarters.us.address,
                image: HUB_CITY_IMAGES.us.url
              },
              {
                city: "London",
                region: "EMEA Headquarters",
                address: COMPANY.headquarters.uk.address,
                image: HUB_CITY_IMAGES.uk.url
              },
              {
                city: "Singapore",
                region: "Asia-Pacific Headquarters",
                address: COMPANY.headquarters.asia.address,
                image: HUB_CITY_IMAGES.asia.url
              },
              {
                city: "Bengaluru",
                region: "Global Engineering & Sampling Center",
                address: COMPANY.headquarters.india.address,
                image: HUB_CITY_IMAGES.india.url
              }
            ].map((hub, idx) => (
              <ScrollReveal 
                key={hub.city}
                animation="fade-up"
                delay={idx * 100}
                duration={600}
              >
                <div className="group rounded-3xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-lg hover:border-pink-500/30 transition-all duration-300">
                  <div className="relative h-44 w-full overflow-hidden">
                    <img 
                      src={hub.image} 
                      alt={`${hub.city} office`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-base font-bold flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-pink-400" />
                        {hub.city}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-mono font-semibold text-pink-600 dark:text-pink-400 block mb-1">
                      {hub.region}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {hub.address}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE RFQ & BIDDING DESK SECTION
         ========================================================================= */}
      <section 
        id="rfq-section" 
        className="relative py-24 sm:py-28 bg-slate-50 dark:bg-slate-950 text-white overflow-hidden border-t border-white/5"
      >
        {/* Legacy #contact anchor support */}
        <div id="contact" className="absolute -top-20 opacity-0 pointer-events-none" />

        {/* Ambient lighting */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Bidding Desk SLA & Direct Contacts */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal animation="fade-up" duration={600}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-950/80 text-pink-300 border border-pink-800/60">
                  <Clock className="w-3.5 h-3.5" />
                  {/* <span>2-Hour Bidding SLA</span> */}
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100} duration={650}>
                {/* <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
                  Commission Your Research Study.
                </h2> */}
              </ScrollReveal>

              {/* <ScrollReveal animation="fade-up" delay={200} duration={650}>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  Submit your sample specs, target incidence rate, and questionnaire length. Our bidding architects evaluate feasibility and provide comprehensive rate cards within two business hours.
                </p>
              </ScrollReveal> */}

              <ScrollReveal animation="fade-up" delay={300} duration={650}>
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-pink-400 flex-shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono uppercase">Direct RFQ Desk</span>
                      <a href={`mailto:${COMPANY.emails.rfq}`} className="text-white hover:text-pink-300 font-medium">
                        {COMPANY.emails.rfq}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-pink-400 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono uppercase">Direct Hotline</span>
                      <a href={`tel:${COMPANY.phone}`} className="text-white hover:text-pink-300 font-medium">
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-pink-400 flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono uppercase">Global Privacy</span>
                      <span className="text-white font-medium">
                        Mutual NDAs executed promptly upon request
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={400} duration={650}>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="font-semibold text-white">Global Operating Hubs:</div>
                  <div className="text-slate-500 dark:text-slate-400">
                    New York · London · Singapore · Bengaluru
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Embedded RfqForm */}
            <div className="lg:col-span-7">
              <ScrollReveal animation="fade-up" delay={200} duration={700}>
                <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="mb-6 pb-4 border-b border-white/10">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      Request for Quotation (RFQ)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Fill out your study parameters below for an immediate feasibility check.
                    </p>
                  </div>
                  <RfqForm initialType="rfq" />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE VIDEO MODAL (TRIGGERED BY "WATCH VIDEO")
         ========================================================================= */}
      {videoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-100 dark:bg-slate-900 rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Elicit Research Platform Overview
                </span>
              </div>
              <button 
                onClick={() => setVideoOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embedded Presentation / Demo Screen */}
            <div className="relative aspect-video w-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-white mb-6 shadow-xl shadow-pink-600/30">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <h4 className="text-2xl font-display font-bold text-white max-w-md">
                Empirical Market Intelligence in Action
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mt-2">
                Discover how Elicit Research connects enterprise decision-makers with over 5,000,000 verified panelists across 45+ international markets with zero synthetic fraud.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-pink-300 border border-white/10">
                  Quantitative Programming
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                  Qualitative IDIs
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/10">
                  Global Feasibility
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
