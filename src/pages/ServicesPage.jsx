
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SERVICES } from '../data/companyData';
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
  CheckCircle2,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import { HERO_IMAGES } from '../data/imageAssets';

export default function ServicesPage() {
  const location = useLocation();

  const [selectedServiceId, setSelectedServiceId] = useState(
    SERVICES[0]?.id ?? ''
  );

  useEffect(() => {
    if (!location.hash) return undefined;

    let frameId;

    try {
      const id = decodeURIComponent(location.hash.slice(1));
      const service = SERVICES.find((item) => item.id === id);

      if (!service) return undefined;

      setSelectedServiceId(service.id);

      frameId = window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    } catch (error) {
      console.error('Unable to navigate to service:', error);
    }

    return () => {
      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [location.hash]);

  const getIcon = (iconName) => {
    const iconClass = 'h-5 w-5';

    switch (iconName) {
      case 'Code2':
        return <Code2 className={iconClass} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'PieChart':
        return <PieChart className={iconClass} />;
      case 'GitFork':
        return <GitFork className={iconClass} />;
      case 'MessageSquare':
        return <MessageSquare className={iconClass} />;
      case 'Globe':
        return <Globe className={iconClass} />;
      case 'Briefcase':
        return <Briefcase className={iconClass} />;
      case 'Rocket':
        return <Rocket className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <main className="relative min-h-screen w-full min-w-0 overflow-x-clip bg-slate-50 pt-24 text-slate-800 dark:bg-slate-950 dark:text-slate-100">

      {/* HERO SECTION — Full viewport height */}
      <section className="relative w-full h-[calc(100svh-6rem)] min-h-[600px] overflow-hidden border-b border-slate-200/80 dark:border-white/5">

        {/* Full-size hero background */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">

          <img
            src={HERO_IMAGES?.intelligenceBanner?.url}
            alt={
              HERO_IMAGES?.intelligenceBanner?.alt ||
              'Research and insights services'
            }
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />

          {/* Readability overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/65 via-white/25 to-transparent dark:from-slate-950/75 dark:via-slate-950/35 dark:to-slate-950/10"
            aria-hidden="true"
          />

          {/* Ambient gradients */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
        </div>

        {/* Vertically centered hero content */}
        <div className="relative z-10 flex h-full w-full items-center">

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="max-w-3xl space-y-6 sm:space-y-7">

              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-sm font-semibold"
              >
                <Link
                  to="/"
                  className="text-slate-700 transition-colors hover:text-pink-600 dark:text-slate-300 dark:hover:text-pink-300"
                >
                  Home
                </Link>

                <span className="text-slate-400" aria-hidden="true">
                  /
                </span>

                <span className="rounded-lg border border-pink-200 bg-white/85 px-2.5 py-1 text-xs font-semibold text-pink-700 shadow-sm backdrop-blur-md dark:border-pink-800/50 dark:bg-pink-950/60 dark:text-pink-300">
                  Services
                </span>
              </nav>

              {/* Main heading */}
              <h1 className="text-3xl font-display font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl dark:text-white">
                Precision Methodologies.
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                  Empirical Outcomes.
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
                From advanced quantitative survey programming and real-time
                fraud mitigation to deep ethnographic qualitative immersions
                and market expansion modeling.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">

                <Link
                  to="/contact?type=rfq"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-pink-700 hover:to-rose-700 hover:shadow-xl active:scale-95"
                >
                  Request Custom Scoping (RFQ)
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </Link>

                <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80 dark:text-white">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  10 core research practices available
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES CATALOG */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24 dark:bg-slate-950">

        {/* Background glows */}
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* Practice navigation */}
          <div className="mb-14 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-slate-900/90">

            <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between dark:border-white/10">

              <div>
                <span className="mb-2 inline-block rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-pink-600 dark:border-pink-800/50 dark:bg-pink-950/60 dark:text-pink-400">
                  10 Core Practices
                </span>

                <h2 className="text-xl font-display font-bold text-slate-900 sm:text-2xl dark:text-white">
                  Comprehensive Research Practices
                </h2>
              </div>

              <Link
                to="/contact?type=rfq"
                className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
              >
                <span>Need Custom Feasibility? Direct Bidding Desk</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Quick jump links */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
              {SERVICES.map((service, index) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  onClick={() => setSelectedServiceId(service.id)}
                  aria-current={
                    selectedServiceId === service.id ? 'location' : undefined
                  }
                  className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    selectedServiceId === service.id
                      ? 'border-pink-600 bg-pink-600 text-white shadow-md shadow-pink-600/20'
                      : 'border-slate-200/80 bg-slate-50 text-slate-700 hover:border-pink-300 hover:text-pink-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-pink-300'
                  }`}
                >
                  <span className="truncate">
                    {index + 1}. {service.title}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] opacity-75">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Service cards */}
          <div className="w-full space-y-10 sm:space-y-12">
            {SERVICES.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="w-full scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-pink-500/30 hover:shadow-xl sm:p-8 lg:p-10 dark:border-white/10 dark:bg-slate-900/90"
              >
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">

                  {/* Service image */}
                  <div
                    className={`w-full lg:col-span-5 ${
                      index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {service.image?.url ? (
                      <div className="relative">
                        <div aria-hidden="true" className="absolute -right-2 -top-2 h-full w-full border-4 border-pink-500 rounded-2xl" />
                        <div className="group relative h-[260px] w-full overflow-hidden rounded-2xl border border-slate-200/80 shadow-md sm:h-[340px] lg:h-[420px] dark:border-white/10">
                        <img
                          src={service.image.url}
                          alt={service.image.alt || service.title}
                          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                        <div className="absolute left-4 top-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-white/90 px-3 py-1 text-xs font-mono font-semibold text-slate-900 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-slate-900/90 dark:text-white">
                            <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                            Practice #{String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 text-xs text-white">
                          <span className="mr-2 truncate font-semibold text-white/90">
                            {service.category}
                          </span>

                          <span className="shrink-0 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[11px] text-pink-200 backdrop-blur-sm">
                            Verified Methodology
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                      <div className="flex h-[260px] w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-100 text-pink-600 sm:h-[340px] lg:h-[420px] dark:border-white/10 dark:bg-slate-800 dark:text-pink-400">
                        {getIcon(service.icon)}
                      </div>
                    )}
                  </div>

                  {/* Service details */}
                  <div
                    className={`flex flex-col justify-center space-y-6 lg:col-span-7 ${
                      index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >

                    <div>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-pink-200 bg-pink-50 text-pink-600 shadow-sm dark:border-pink-800/50 dark:bg-pink-950/60 dark:text-pink-400">
                            {getIcon(service.icon)}
                          </div>

                          <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                            Practice #{String(index + 1).padStart(2, '0')} · {service.category}
                          </span>
                        </div>

                        <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700 dark:border-pink-800/50 dark:bg-pink-950/60 dark:text-pink-300">
                          {service.badge}
                        </span>
                      </div>

                      <h2 className="text-2xl font-display font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                        {service.title}
                      </h2>
                    </div>

                    {/* Overview */}
                    <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4 sm:p-5 dark:border-white/[0.06] dark:bg-white/[0.02]">
                      <p className="mb-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Service Overview
                      </p>

                      <p className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                        {service.fullDesc}
                      </p>
                    </div>

                    {/* Capabilities */}
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                        <Layers className="h-4 w-4 shrink-0" />
                        Core Technical Capabilities
                      </h3>

                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                        {(service.capabilities || []).slice(0, 3).map((capability, capIdx) => (
                          <div
                            key={`${service.id}-${capIdx}`}
                            className="flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white p-4 text-sm text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-slate-300"
                            style={{
                              borderTop: `3px solid ${['#ec4899','#8b5cf6','#22d3ee'][capIdx % 3]}`
                            }}
                          >
                            <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: ['#ec4899','#8b5cf6','#22d3ee'][capIdx % 3] }} />
                            <span>{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables and CTA */}
                    <div className="flex flex-col justify-between gap-4 border-t border-slate-200/80 pt-4 sm:flex-row sm:items-center dark:border-white/10">
                      <div className="min-w-0">
                        <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Standard Deliverables
                        </span>

                        <span className="mt-0.5 block text-xs font-semibold text-slate-800 sm:text-sm dark:text-slate-200">
                          {service.deliverables}
                        </span>
                      </div>

                      <Link
                        to={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-pink-600/20 transition-all duration-300 hover:shadow-xl active:scale-95 sm:text-sm"
                      >
                        <span>Inquire for {service.title}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </div>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
