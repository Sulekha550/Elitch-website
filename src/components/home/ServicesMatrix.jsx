import React, { useState } from 'react';
import { SERVICES } from '../../data/companyData';
import { 
  Code2, 
  TrendingUp, 
  Compass, 
  Users, 
  PieChart, 
  GitFork, 
  MessageSquare, 
  Globe, 
  Briefcase, 
  Rocket,
  ArrowUpRight,
  Check,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card3D from '../common/Card3D';
import ScrollReveal from '../common/ScrollReveal';
import { HERO_IMAGES } from '../../data/imageAssets';

export default function ServicesMatrix() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Quantitative Technology', 'Methodology Architecture', 'Human Centered Insights', 'Targeting & Positioning', 'Enterprise Research'];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'PieChart': return <PieChart className="w-5 h-5" />;
      case 'GitFork': return <GitFork className="w-5 h-5" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const filteredServices = activeFilter === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(s.category.toLowerCase()));

  return (
    <div className="w-full">
      {/* Section Header with image accent */}
      <ScrollReveal animation="fade-up" duration={600}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800/50 mb-3">
                <Layers className="w-3.5 h-3.5" />
                Comprehensive Research Spectrum
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                10 Specialized Practices. One Unified Intelligence Engine.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md">
                From precision survey engineering and algorithmic fraud screening to executive B2B strategy and qualitative ethnography.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-none group img-zoom-container">
              <img
                src={HERO_IMAGES.telemetryBackdrop.url}
                alt={HERO_IMAGES.telemetryBackdrop.alt}
                className="w-full h-44 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/20 to-transparent dark:from-brand-950/70" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  10 Core Practices
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter Pills */}
      <ScrollReveal animation="fade-up" delay={150} duration={600}>
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200/80 dark:border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 transform active:scale-95 ${
                activeFilter === cat
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20 scale-105'
                  : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Asymmetrical Editorial Service Grid with 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => {
          const isFeatured = index === 0;

          return (
            <ScrollReveal
              key={service.id}
              animation="fade-up"
              delay={(index % 3) * 120}
              duration={600}
              className={isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <Card3D maxTilt={6} elevation={12} scale={1.015} className="h-full">
                <div
                  className={`rounded-3xl p-7 relative flex flex-col justify-between group h-full border border-slate-200/90 dark:border-white/10 bg-white dark:bg-slate-900/90 transition-all duration-300 hover:border-pink-500/40 hover:shadow-xl ${
                    isFeatured ? 'shadow-md border-pink-300/80 dark:border-pink-500/30' : 'shadow-sm'
                  }`}
                >
                  <div>
                    {/* Service Photographic Header */}
                    {service.image && (
                      <div className={`relative ${isFeatured ? 'h-40 sm:h-48' : 'h-32'} rounded-2xl overflow-hidden mb-5 group/img`}>
                        <img
                          src={service.image.url}
                          alt={service.image.alt}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/90">
                          <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/20">
                            Practice #{String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-pink-300 font-semibold">
                            {service.badge}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-pink-50 dark:bg-pink-950/60 border border-pink-200/80 dark:border-pink-800/50 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:scale-110 group-hover:border-pink-400/50 group-hover:bg-pink-100/50 dark:group-hover:bg-pink-900/40 transition-all duration-300">
                        {getIcon(service.icon)}
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600 border border-slate-200/80 dark:bg-white/5 dark:text-slate-400 dark:border-white/5 group-hover:border-pink-400/30 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors mb-2.5">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    {/* Capabilities Preview */}
                    <ul className="space-y-2 mb-6">
                      {service.capabilities.slice(0, isFeatured ? 4 : 2).map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      Practice ID: #{String(index + 1).padStart(2, '0')}
                    </span>
                    <Link
                      to={`/services#${service.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 dark:text-pink-400 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors"
                    >
                      <span>Full Blueprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                    </Link>
                  </div>
                </div>
              </Card3D>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Bottom CTA for Services */}
      <ScrollReveal animation="fade-up" delay={200} duration={600} className="mt-14 text-center">
        <Link
          to="/services"
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg shadow-pink-600/20 hover:shadow-xl transition-all font-display active:scale-95 overflow-hidden"
        >
          <span className="relative z-10">Explore All 10 Practice Blueprints &amp; Deliverables</span>
          <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
        </Link>
      </ScrollReveal>
    </div>
  );
}
