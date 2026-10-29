import React, { useState } from 'react';
import { PANEL_REGIONS } from '../../data/companyData';
import { Globe, Users, ShieldAlert, CheckCircle, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../common/ScrollReveal';
import Card3D from '../common/Card3D';
import { HERO_IMAGES } from '../../data/imageAssets';

export default function GlobalReachVisual() {
  const [selectedRegion, setSelectedRegion] = useState(0);
  const current = PANEL_REGIONS[selectedRegion];

  return (
    <section className="relative py-28 bg-slate-950 overflow-hidden">
      {/* Background radial ambient lights with parallax feel */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-pink-500/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal animation="fade-up" duration={600}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                <Globe className="w-3.5 h-3.5 animate-spin-slow" />
                Global Reach. Trustworthy Data.
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100} duration={650}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                A Dynamic Sampling Platform Built for Scale.
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200} duration={650}>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our dynamic sampling platform is directly linked to the audience representing the actual population delivering online and offline B2B and B2C samples. The platform helps businesses to access diverse and comprehensive opinions of global audiences.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300} duration={650}>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                While it accelerates the overall data research process, the final report inculcates trustworthy, accurate, and extremely precise analytics. This global outreach can guide and help businesses make the right decisions and elevate customer experience across emerging and mature markets.
              </p>
            </ScrollReveal>

            {/* Region Selector Pills */}
            <ScrollReveal animation="fade-up" delay={400} duration={650}>
              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                  Select Regional Cluster:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PANEL_REGIONS.map((region, index) => (
                    <button
                      key={region.region}
                      onClick={() => setSelectedRegion(index)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 transform active:scale-95 ${
                        selectedRegion === index
                          ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25 scale-105 dark:bg-accent-cyan dark:text-brand-950'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 shadow-sm dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:border-white/5'
                      }`}
                    >
                      {region.region} ({region.members})
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/panel"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-accent-cyan hover:text-slate-950 dark:hover:text-white group transition-colors"
                >
                  <span>Explore Full Panel Specifications &amp; Demographics</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Region Dossier & Visual Graphic */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-left" duration={800}>
              <Card3D maxTilt={5} elevation={14} scale={1.01}>
                <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden group">
                  
                  {/* World Map with actual image */}
                  <div className="relative h-64 sm:h-76 w-full rounded-2xl overflow-hidden mb-6 group-hover:border-cyan-400/40 transition-colors duration-500 shadow-inner border border-slate-200 dark:border-white/10">
                    {/* Background image - world data network */}
                    <img
                      src={HERO_IMAGES.globalNetwork.url}
                      alt={HERO_IMAGES.globalNetwork.alt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Subtle overlay for readability of pins */}
                    <div className="absolute inset-0 bg-slate-900/20 dark:bg-brand-950/10" />

                    {/* Animated Coordinates Nodes */}
                    {PANEL_REGIONS.map((region, i) => (
                      <div
                        key={region.region}
                        className={`absolute transition-all duration-500 cursor-pointer ${
                          selectedRegion === i ? 'scale-125 z-20' : 'opacity-75 scale-90 hover:opacity-100 hover:scale-110'
                        }`}
                        style={{ left: region.pinCoord.x, top: region.pinCoord.y }}
                        onClick={() => setSelectedRegion(i)}
                      >
                        <div className="relative flex items-center justify-center">
                          <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full ${
                            selectedRegion === i ? 'bg-cyan-500 dark:bg-accent-cyan opacity-40' : 'bg-slate-400 opacity-20'
                          }`}></span>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-brand-950 transition-all duration-300 ${
                            selectedRegion === i ? 'bg-cyan-600 dark:bg-accent-cyan text-white dark:text-brand-950 font-bold text-[11px] shadow-md' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white text-[10px]'
                          }`}>
                            {i + 1}
                          </div>
                          {selectedRegion === i && (
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-md bg-white dark:bg-brand-950/95 border border-slate-200 dark:border-accent-cyan/40 text-[11px] font-mono font-semibold text-cyan-800 dark:text-accent-cyan shadow-lg animate-in fade-in zoom-in-95 duration-200">
                              {region.region}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detail Card for Selected Region */}
                  <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/80 dark:border-white/10 mb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-cyan-700 dark:text-accent-cyan tracking-wider flex items-center gap-1.5 font-semibold">
                          <Sparkles className="w-3 h-3" />
                          Active Regional Cluster #{selectedRegion + 1}
                        </span>
                        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">{current.region}</h3>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-2xl font-display font-black text-cyan-700 dark:text-accent-cyan tracking-tight">{current.members}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Verified Active Panelists</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Key Geographies:</span>
                        <p className="text-slate-800 dark:text-slate-200 font-semibold">{current.countries}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Target Segments:</span>
                        <p className="text-slate-800 dark:text-slate-200 font-semibold">{current.focus}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs">
                      <span className="text-teal-700 dark:text-emerald-400 flex items-center gap-1.5 font-mono font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {current.coverage}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">Online &amp; Offline Methodology</span>
                    </div>
                  </div>
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

