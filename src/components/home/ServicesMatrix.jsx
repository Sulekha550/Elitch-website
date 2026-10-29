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

  const filteredServices = (activeFilter === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(s.category.toLowerCase())))
    .slice()
    .sort((a, b) => (a.id === 'performance-tracking' ? 1 : b.id === 'performance-tracking' ? -1 : 0));

  return (
    <div className="w-full">
      {/* Section Header with image accent */}
      <ScrollReveal animation="fade-up" duration={600}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="max-w-2xl">
              {null}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter Pills */}
      <ScrollReveal animation="fade-up" delay={150} duration={600}>
        <div className="flex items-center gap-2 mb-8 sm:mb-12 border-b border-slate-200/80 dark:border-white/10 pb-4 sm:pb-6 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`shrink-0 sm:shrink px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 transform active:scale-95 whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20 scale-105'
                  : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Uniform 3-Column Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <ScrollReveal
            key={service.id}
            animation="fade-up"
            delay={(index % 3) * 120}
            duration={600}
            className={`flex ${index === 0 ? 'lg:col-span-2' : ''}`}
          >
            <Card3D maxTilt={6} elevation={12} scale={1.015} className="h-full w-full">
              <div className="rounded-3xl relative flex flex-col h-full border border-slate-200/90 dark:border-white/10 bg-white dark:bg-slate-900/90 shadow-sm transition-all duration-300 hover:border-pink-500/40 hover:shadow-xl group overflow-hidden">

                {/* Card image header — 16:9 aspect ratio */}
                <div className="relative w-full overflow-hidden h-72" style={{ flexShrink: 0 }}>
                  {service.image?.url ? (
                    <>
                      <img
                        src={service.image.url}
                        alt={service.image.alt || service.title}
                        className={`w-full h-full object-cover object-center transition-transform duration-700 ${service.id === 'qualitative-research' ? 'scale-[1.20] sm:scale-[1.22] group-hover:scale-[1.28]' : 'group-hover:scale-105'}`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/60 dark:to-rose-950/60 flex items-center justify-center">
                      <div className="text-pink-300 dark:text-pink-700 opacity-40">
                        <Layers className="w-16 h-16" />
                      </div>
                    </div>
                  )}

                  {/* Practice number overlay — top left */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border border-white/30 bg-black/40 text-white backdrop-blur-sm shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      Practice #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Badge overlay — top right */}
                  <div className="absolute top-3 right-3">
                    <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gradient-to-r from-pink-600/90 to-rose-600/90 text-white backdrop-blur-sm border border-white/20 shadow-sm">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Card body — grows to fill available space */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">

                  {/* Icon + Category row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-pink-50 dark:bg-pink-950/60 border border-pink-200/80 dark:border-pink-800/50 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:scale-110 group-hover:border-pink-400/50 group-hover:bg-pink-100/50 dark:group-hover:bg-pink-900/40 transition-all duration-300 shrink-0">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600 border border-slate-200/80 dark:bg-white/5 dark:text-slate-400 dark:border-white/5 group-hover:border-pink-400/30 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors truncate max-w-[140px] text-right">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Capabilities list — always 2 items for visual consistency */}
                  <ul className="space-y-2 mb-4 flex-1">
                    {service.capabilities.slice(0, 2).map((cap, i) => (
                      <li key={i} className="flex items-start gap-[6px] md:gap-[8px] text-[11px] md:text-[12px] leading-[1.35] text-slate-700 dark:text-slate-300">
                        <Check className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
                        <span className="whitespace-nowrap">{cap}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer — always pinned at bottom via mt-auto */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between mt-auto">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-500">
                      Practice ID: #{String(index + 1).padStart(2, '0')}
                    </span>
                    <Link
                      to={`/services#${service.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-600 dark:text-pink-400 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors"
                    >
                      <span>Full Blueprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom CTA for Services */}
      <ScrollReveal animation="fade-up" delay={200} duration={600} className="mt-10 sm:mt-14 text-center sm:text-left">
        <Link
          to="/services"
          className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg shadow-pink-600/20 hover:shadow-xl transition-all font-display active:scale-95 overflow-hidden w-full sm:w-auto text-center"
        >
          <span className="relative z-10">Explore All 10 Practice Blueprints &amp; Deliverables</span>
          <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300 shrink-0" />
        </Link>
      </ScrollReveal>
    </div>
  );
}

