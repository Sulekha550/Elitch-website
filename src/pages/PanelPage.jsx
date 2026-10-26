
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Download,
  Globe2,
  Users,
  ClipboardCheck,
  Gift,
  MessageCircle,
} from "lucide-react";

const regions = [
  { label: "North America", x: 115, y: 92, color: "#ec4899" },
  { label: "Europe", x: 300, y: 88, color: "#a855f7" },
  { label: "Asia Pacific", x: 438, y: 108, color: "#06b6d4" },
  { label: "South America", x: 190, y: 210, color: "#d946ef" },
  { label: "Australia", x: 478, y: 220, color: "#c084fc" },
];

const stats = [
  {
    value: "10K+",
    label: "Surveys Done",
    Icon: ClipboardCheck,
    style: "from-purple-500 to-violet-500",
  },
  {
    value: "30M+",
    label: "Rewarded So Far",
    Icon: Gift,
    style: "from-pink-500 via-rose-500 to-pink-600",
  },
];

const panelFeatures = [
  "Global audiences",
  "B2B & B2C samples",
  "Quality-focused research",
];

const trustPoints = [
  "ESOMAR 28 Compliant",
  "Triple-Layer Fraud Scrubbing",
  "< 2-Hour Bidding Response",
];

export default function PanelPage() {
  return (
    <main className="relative w-full min-w-0 overflow-x-clip bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">

      {/* HERO SECTION — FULL VIEWPORT HEIGHT */}
      <section
        className="relative isolate flex min-h-[100vh] min-h-[100svh] w-full flex-col justify-center overflow-hidden border-b border-white/10"
        style={{
          paddingTop: "clamp(8rem, 14vh, 10rem)",
          paddingBottom: "clamp(2rem, 4vh, 3rem)",
        }}
      >
        {/* Background glows and grid */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[420px] w-[min(1200px,120vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-500/20 via-indigo-500/15 to-transparent blur-3xl sm:h-[600px]" />

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:right-1/4" />

          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl sm:left-1/4" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Hero content grid */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-5 sm:px-8 sm:py-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-4">

          {/* LEFT COLUMN */}
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">

            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex items-center gap-3 text-sm sm:mb-6"
            >
              <Link
                to="/"
                className="text-slate-600 transition-colors hover:text-pink-600 dark:text-slate-300 dark:hover:text-pink-300"
              >
                Home
              </Link>

              <span className="text-pink-500">/</span>

              <span className="rounded-full border border-pink-200 bg-white/80 px-4 py-2 font-semibold text-pink-700 shadow-sm backdrop-blur-md dark:border-pink-800/50 dark:bg-pink-950/60 dark:text-pink-300">
                Panel
              </span>
            </nav>

            {/* Eyebrow */}
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-pink-200 bg-white/60 px-3 py-2.5 shadow-sm backdrop-blur-md sm:mb-6 sm:px-4 sm:py-3 dark:border-pink-400/20 dark:bg-white/5">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500" />

              <span className="text-[9px] font-bold uppercase leading-relaxed tracking-[0.12em] text-slate-700 sm:text-xs sm:tracking-[0.18em] dark:text-slate-200">
                Global Market Research &amp; Intelligence Solutions · 45+ Countries
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              A Global Community.
              <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                Real Human Insights.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg dark:text-slate-300">
              Discover our global panel community connecting diverse audiences
              with research that helps businesses understand people and make
              informed decisions.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <Link
                to="/contact"
                className="group/button inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/25 sm:px-6 sm:py-4"
              >
                Connect With Our Team
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
              </Link>

              <a
                href="#panel-overview"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/75 px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:bg-white sm:px-6 sm:py-4 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Explore Our Panel
                <ArrowUpRight className="h-5 w-5 text-purple-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            {/* Trust points */}
            <div className="mt-6 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-2.5 text-[11px] font-medium text-slate-600 sm:mt-7 sm:gap-x-6 sm:gap-y-3 sm:text-sm lg:justify-start dark:text-slate-300">
              {trustPoints.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — HERO IMAGE */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-pink-500/25 via-purple-500/20 to-cyan-400/20 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative h-[260px] overflow-hidden rounded-3xl border border-white/60 bg-slate-200 shadow-2xl shadow-purple-900/15 sm:h-[360px] lg:h-[430px] dark:border-white/10">
              <img
                src="/images/Home/images5.webp"
                alt="A diverse research team collaborating around a table"
                className="h-full w-full object-cover object-center"
                loading="eager"
                fetchPriority="high"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/50 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:left-6 sm:top-6">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Global research network
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-slate-950/55 p-4 text-white shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-200">
                  One community · many perspectives
                </p>

                <p className="mt-2 text-lg font-extrabold sm:text-2xl">
                  Real people. Reliable insights.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {["B2B audiences", "B2C panels", "45+ countries"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/90 sm:text-xs"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS PREVIEW — SEPARATE FROM HERO */}
      <section className="relative bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 dark:bg-slate-950">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white/75 text-left shadow-xl shadow-purple-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-white/70 px-4 py-3 sm:px-6 sm:py-4 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-rose-400 sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400 sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 sm:h-3 sm:w-3" />

              <span className="ml-1 hidden truncate font-mono text-xs text-slate-500 sm:ml-2 sm:block dark:text-slate-400">
                elicit-growth-telemetry.app — live analytics engine
              </span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-[9px] font-bold uppercase tracking-wider text-emerald-700 sm:px-3 sm:text-[10px] dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Live Feed Active
            </span>
          </div>

          <div className="grid gap-3 bg-slate-50 p-3 sm:grid-cols-2 sm:gap-4 sm:p-5 md:p-6 dark:bg-white/[0.02]">
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:gap-4 sm:p-5 dark:border-white/10 dark:bg-slate-800/80">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 sm:h-12 sm:w-12 dark:bg-emerald-400/10 dark:text-emerald-300">
                <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 sm:text-[10px] dark:text-emerald-300">
                  Validated Increment
                </p>

                <p className="mt-1 text-lg font-extrabold leading-tight text-slate-900 sm:text-2xl dark:text-white">
                  +184% Growth Surge
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:gap-4 sm:p-5 dark:border-white/10 dark:bg-slate-800/80">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-600 sm:h-12 sm:w-12 dark:bg-pink-400/10 dark:text-pink-300">
                <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-widest text-pink-600 sm:text-[10px] dark:text-pink-300">
                  Confidence Index
                </p>

                <p className="mt-1 text-lg font-extrabold leading-tight text-slate-900 sm:text-2xl dark:text-white">
                  99.98% Clean Data
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PANEL OVERVIEW */}
      <section
        id="panel-overview"
        className="relative scroll-mt-24 border-y border-slate-200/80 bg-white py-14 sm:py-20 lg:py-24 dark:border-white/5 dark:bg-slate-900"
      >
        <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full border-[24px] border-pink-100/70 dark:border-pink-400/10" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400">
              A Trusted Global Community
            </span>

            <h2 className="mt-4 max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
              Know Our Superior
              <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                Elicit Panel
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Our globally acknowledged panel helps deliver solution-based
              research, contributed by business professionals as well as
              consumers. With a commitment to unbiased research, we incorporate
              questions every year that include demographic data, diverse
              market characteristics, media outreach, and personal preferences.
              This helps businesses gain a better understanding of diverse
              customer segments.
            </p>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-600/20 transition hover:-translate-y-0.5 hover:from-pink-700 hover:to-rose-700 hover:shadow-xl active:scale-95"
            >
              Connect With Our Team
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 p-4 text-white shadow-xl shadow-pink-500/15 transition duration-300 hover:-translate-y-1 sm:min-h-[320px] sm:p-7">
              <Users className="h-7 w-7 text-white/90 sm:h-8 sm:w-8" />

              <div>
                <p className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                  5M+
                </p>
                <p className="mt-2 text-xs font-medium text-white/90 sm:text-sm">
                  Panel Members
                </p>
              </div>

              <div className="h-1 w-12 rounded-full bg-white/70" />
            </div>

            <div className="grid gap-3 sm:gap-5">
              {stats.map(({ value, label, Icon, style }) => (
                <div
                  key={label}
                  className={`flex min-h-[120px] flex-col justify-between rounded-3xl bg-gradient-to-br ${style} p-4 text-white shadow-xl transition duration-300 hover:-translate-y-1 sm:min-h-[150px] sm:p-6`}
                >
                  <Icon className="h-6 w-6 text-white/90 sm:h-7 sm:w-7" />

                  <div>
                    <p className="text-xl font-extrabold sm:text-3xl">
                      {value}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-white/90 sm:text-xs">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="border-b border-slate-200/80 bg-slate-50 py-14 sm:py-20 lg:py-24 dark:border-white/5 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400">
              Worldwide Research Network
            </span>

            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
              Global Reach.
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                Trustworthy Data.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Our dynamic sampling platform connects directly with audiences
              representing the populations we study, supporting online and
              offline B2B and B2C samples. Our global reach helps businesses
              access diverse opinions and perspectives. We focus on trustworthy
              data, accurate analysis, and insights that support informed
              business decisions and a better customer experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {panelFeatures.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-pink-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Global Map */}
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur-md sm:min-h-[390px] sm:p-8 dark:border-white/10 dark:bg-slate-900/70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.12),transparent_65%)]" />

            <Globe2
              className="absolute h-56 w-56 text-slate-200/80 sm:h-80 sm:w-80 dark:text-white/5"
              strokeWidth={0.7}
            />

            <svg
              viewBox="0 0 600 320"
              role="img"
              aria-label="Illustration of our global research reach"
              className="relative z-10 mb-10 w-full max-w-xl sm:mb-12"
            >
              <defs>
                <linearGradient
                  id="panelMapFill"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f9a8d4" stopOpacity=".7" />
                  <stop offset="50%" stopColor="#c4b5fd" stopOpacity=".65" />
                  <stop offset="100%" stopColor="#67e8f9" stopOpacity=".6" />
                </linearGradient>
              </defs>

              <g
                fill="url(#panelMapFill)"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeOpacity=".75"
              >
                <path d="M55 80 L85 55 L130 48 L160 65 L190 62 L210 85 L190 110 L165 115 L150 145 L125 151 L112 180 L92 163 L83 130 L61 119 Z" />
                <path d="M170 174 L198 182 L218 214 L207 247 L194 286 L177 260 L170 224 L154 198 Z" />
                <path d="M260 70 L287 58 L318 68 L335 86 L365 83 L382 98 L370 116 L342 120 L326 143 L306 137 L292 111 L268 105 Z" />
                <path d="M305 145 L340 136 L370 153 L385 185 L367 218 L348 243 L326 225 L319 193 L300 171 Z" />
                <path d="M380 82 L424 62 L477 70 L518 96 L504 120 L465 130 L444 151 L414 138 L398 114 Z" />
                <path d="M453 205 L485 198 L512 215 L505 238 L480 250 L457 232 Z" />
              </g>

              {regions.map(({ label, x, y, color }) => (
                <g key={label}>
                  <path
                    d={`M ${x} ${y} L ${x} ${y + 35}`}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <circle cx={x} cy={y} r="12" fill={color} />
                  <circle cx={x} cy={y} r="5" fill="white" />
                </g>
              ))}
            </svg>

            <div className="absolute bottom-3 left-2 right-2 z-20 flex flex-wrap justify-center gap-1.5 sm:bottom-5 sm:left-3 sm:right-3 sm:gap-2">
              {regions.map(({ label, color }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2 py-2 text-[9px] font-semibold text-slate-600 shadow-sm sm:px-3 sm:text-[10px] dark:border-white/10 dark:bg-slate-950/90 dark:text-slate-300"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PANEL BOOK + PLATFORM CTA */}
      <section className="grid grid-cols-1 md:grid-cols-2">

        {/* Panel Book */}
        <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 p-6 text-white sm:p-10 lg:min-h-[370px] lg:p-14">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border-[25px] border-white/10" />
          <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <Download className="relative h-9 w-9" />

          <div className="relative mt-8 sm:mt-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">
              Explore Our Community
            </span>

            <h2 className="mt-3 max-w-md text-2xl font-extrabold leading-tight sm:text-3xl">
              Download Our Panel Book
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/90">
              Learn more about our panel, audience reach, and research
              capabilities.
            </p>

            <a
              href="/files/elicit-panel-book.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white px-5 py-3.5 text-sm font-bold text-pink-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-pink-50"
            >
              Download Panel Book
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Community CTA */}
        <div className="relative flex min-h-[340px] flex-col justify-center overflow-hidden bg-slate-900 p-6 text-white sm:p-10 lg:min-h-[370px] lg:p-14 dark:bg-black">
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="absolute -right-10 top-0 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <MessageCircle className="h-6 w-6 text-pink-300" />
            </div>

            <h2 className="max-w-xl text-2xl font-extrabold leading-tight sm:text-3xl">
              Your opinions shape the world around us.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Your voice has value. Join a research community where opinions
              help influence products, services, and businesses.
            </p>

            <a
              href="https://elicitresearch.com"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:from-pink-700 hover:to-rose-700 hover:shadow-pink-500/25 active:scale-95"
            >
              Visit Our Panel Platform
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
