
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

import RfqForm from '../components/contact/RfqForm';
import { COMPANY } from '../data/companyData';
import { HERO_IMAGES } from '../data/imageAssets';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'rfq';

  return (
    <main className="relative w-full min-w-0 overflow-x-clip bg-slate-50 pt-24 text-slate-800 dark:bg-slate-950 dark:text-slate-100">

      {/* HERO — HOME PAGE LIGHT GRADIENT THEME */}
      <section className="relative w-full overflow-hidden border-b border-slate-200/70 dark:border-white/[0.06]">
        <div className="img-zoom-container relative min-h-[560px] w-full overflow-hidden">

          <img
            src={HERO_IMAGES.executiveConsulting.url}
            alt={HERO_IMAGES.executiveConsulting.alt}
            className="absolute inset-0 h-full min-h-[560px] w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />

          {/* Soft light overlay */}
          <div className="absolute inset-0 bg-white/65 dark:bg-slate-950/75" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-pink-50/75 to-rose-50/70 dark:from-slate-950/90 dark:via-purple-950/40 dark:to-slate-950/90" />

          {/* Pink, purple and rose ambient glows */}
          <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-pink-400/25 blur-3xl" />
          <div className="pointer-events-none absolute left-1/3 top-10 h-96 w-96 rounded-full bg-purple-400/25 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-rose-400/20 blur-3xl" />

          {/* Hero content */}
          <div className="relative z-10 flex min-h-[560px] items-center py-16">
            <div className="section-container w-full">
              <div className="max-w-3xl space-y-6">

                {/* Breadcrumb */}
                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center gap-2 text-sm font-semibold"
                >
                  <Link
                    to="/"
                    className="text-slate-700 transition-colors hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 dark:text-slate-300 dark:hover:text-pink-400"
                  >
                    Home
                  </Link>

                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>

                  <span className="rounded-lg border border-pink-300/60 bg-pink-100/80 px-2.5 py-1 text-xs font-semibold text-pink-800 dark:border-pink-400/30 dark:bg-pink-500/10 dark:text-pink-300">
                    Contact &amp; RFQ
                  </span>
                </nav>

                {/* Main heading */}
                <h1 className="!text-4xl font-display font-extrabold leading-tight tracking-tight !text-slate-950 sm:!text-5xl lg:!text-6xl dark:!text-white">
                  <span className="block !text-slate-950 dark:!text-white">
                    Initiate Project Bidding
                  </span>

                  <span className="mt-1 block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                    Or Direct Inquiries.
                  </span>
                </h1>

                {/* Description */}
                <p className="max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
                  Connect directly with our sampling directors, survey engineers,
                  and bidding strategists. We operate 24/5 across New York,
                  London, Singapore, and Bengaluru.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-3 pt-1">
                  {[
                    { label: 'RFQ & Pricing', icon: '📋' },
                    { label: '2hr Response SLA', icon: '⚡' },
                    { label: 'Global Operations', icon: '🌐' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all hover:border-pink-300 hover:bg-pink-50"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Proposal CTA */}
                <div className="flex flex-wrap gap-4 pt-1">
                  <a
                    href={`mailto:${COMPANY.emails.rfq}`}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-pink-500 hover:to-rose-500 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                  >
                    Request a Proposal
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION + RFQ FORM */}
      <section className="relative overflow-hidden bg-slate-50 py-12 dark:bg-slate-950 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-pink-500/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-500/[0.07] blur-3xl" />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">

            {/* LEFT: CONTACT INFORMATION */}
            <div className="space-y-5 lg:col-span-5">

              {/* Primary Bidding Desk */}
              <article className="rounded-2xl border border-pink-200/70 bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6 shadow-sm transition-all duration-300 hover:border-pink-300 hover:shadow-lg hover:shadow-pink-500/[0.06] dark:border-pink-400/20 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 sm:p-8">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow !text-pink-700 dark:!text-pink-300">
                    Primary Bidding Desk
                  </p>

                  <span className="rounded-full border border-pink-300/60 bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-800 dark:border-pink-400/25 dark:bg-pink-500/10 dark:text-pink-300">
                    2hr Response SLA
                  </span>
                </div>

                <h2 className="heading-card mb-2 !text-slate-900 dark:!text-white">
                  Request for Proposal &amp; Pricing
                </h2>

                <p className="body-sm mb-5 !text-slate-600 dark:!text-slate-300">
                  For fast feasibility calculations, incidence modeling,
                  and formal RFQ proposals:
                </p>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-white/[0.08] dark:bg-slate-950/80">
                  <div className="flex min-w-0 items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-pink-600 dark:text-pink-400" />

                    <div className="min-w-0">
                      <span className="mb-0.5 block font-mono text-xs uppercase text-slate-500 dark:text-slate-400">
                        Sales / RFQ
                      </span>

                      <a
                        href={`mailto:${COMPANY.emails.rfq}`}
                        className="body-sm break-all font-mono font-bold !text-slate-900 transition-colors hover:!text-pink-700 dark:!text-white dark:hover:!text-pink-400"
                      >
                        {COMPANY.emails.rfq}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`mailto:${COMPANY.emails.rfq}`}
                    aria-label="Send email to sales desk"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-pink-200 bg-pink-50 text-pink-700 transition-all hover:border-pink-300 hover:bg-pink-100 dark:border-pink-400/20 dark:bg-pink-500/10 dark:text-pink-300 dark:hover:bg-pink-500/20"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>

              {/* Corporate Headquarters */}
              <article className="card-base rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/[0.05] dark:border-white/[0.08] dark:bg-slate-900/80 dark:hover:border-purple-400/30 sm:p-8">
                <p className="eyebrow mb-4 !text-purple-700 dark:!text-purple-300">
                  Corporate Headquarters
                </p>

                <h2 className="heading-card mb-2 !text-slate-900 dark:!text-white">
                  General Information &amp; Partnerships
                </h2>

                <p className="body-sm mb-5 !text-slate-600 dark:!text-slate-300">
                  For press inquiries, academic partnerships, vendor solutions,
                  and panelist support:
                </p>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
                  <div className="flex min-w-0 items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400" />

                    <div className="min-w-0">
                      <span className="mb-0.5 block font-mono text-xs uppercase text-slate-500 dark:text-slate-400">
                        General Inquiries
                      </span>

                      <a
                        href={`mailto:${COMPANY.emails.general}`}
                        className="body-sm break-all font-mono font-bold !text-slate-900 transition-colors hover:!text-purple-700 dark:!text-white dark:hover:!text-purple-400"
                      >
                        {COMPANY.emails.general}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`mailto:${COMPANY.emails.general}`}
                    aria-label="Send general inquiry email"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-purple-200 bg-white text-purple-700 transition-colors hover:bg-purple-50 dark:border-purple-400/20 dark:bg-white/[0.04] dark:text-purple-300 dark:hover:bg-purple-500/10"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>

              {/* Turnaround Commitments */}
              <aside className="space-y-3 rounded-xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50/80 to-white p-5 dark:border-indigo-400/20 dark:from-indigo-950/30 dark:to-slate-900">
                <div className="flex items-center gap-2 text-sm font-semibold text-pink-700 dark:text-pink-300">
                  <Clock className="h-4 w-4 shrink-0" />
                  Turnaround Commitments
                </div>

                <p className="body-sm !text-slate-600 dark:!text-slate-300">
                  Standard consumer sample feasibility quotes are finalized
                  and delivered within 2 business hours. Complex custom
                  qualitative recruits or multi-country B2B quotas are returned
                  within 6 business hours.
                </p>
              </aside>
            </div>

            {/* RIGHT: RFQ FORM */}
            <div className="min-w-0 lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-1 shadow-xl shadow-slate-900/[0.04] dark:border-white/[0.08] dark:bg-slate-900/80 dark:shadow-black/20">
                <RfqForm initialType={initialType} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GLOBAL LOCATIONS */}
      <section className="section-muted relative overflow-hidden border-t border-slate-200/70 bg-slate-100 py-12 dark:border-white/[0.06] dark:bg-slate-900 sm:py-16">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-pink-500/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-indigo-500/[0.07] blur-3xl" />

        <div className="section-container relative z-10">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <p className="eyebrow mb-3 flex justify-center !text-pink-700 dark:!text-pink-300">
              Global Presence
            </p>

            <h2 className="heading-section !text-slate-900 dark:!text-white">
              International Operating Centers
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(COMPANY.headquarters).map(([key, hub]) => (
              <article
                key={key}
                className="card-base group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/[0.06] dark:border-white/[0.08] dark:bg-slate-800/60 dark:hover:border-pink-400/30"
              >
                {hub.image && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={hub.image.url}
                      alt={hub.image.alt}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-pink-300" />
                      {hub.city}
                    </div>
                  </div>
                )}

                <div className="flex flex-grow flex-col p-5">
                  <h3 className="heading-card mb-1 !text-pink-700 dark:!text-pink-300">
                    {hub.city}
                  </h3>

                  <p className="body-sm mb-0.5 font-medium !text-slate-800 dark:!text-slate-200">
                    {hub.address}
                  </p>

                  <p className="text-xs !text-slate-500 dark:!text-slate-400">
                    {hub.region}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
