
import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Globe2,
  Award,
  CheckCircle2,
  MapPin,
  Info,
  Users,
  Linkedin,
  ArrowUpRight,
  Target,
  HandCoins,
  Layers3,
  Sparkles,
} from "lucide-react";

import { COMPANY, LEADERSHIP_TEAM } from "../data/companyData";
import { HERO_IMAGES, ABOUT_IMAGES } from "../data/imageAssets";

/* ─── Shared Theme ────────────────────────────── */

const THEME = {
  accent: "text-pink-600 dark:text-pink-400",
  gradient:
    "bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent",
};

/* ─── Shared Section Heading ──────────────────── */

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-7 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400 sm:text-xs">
          {eyebrow}
        </p>
      )}

      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">
          {description}
        </p>
      )}
    </div>
  );
}

/* ─── Founders Data ───────────────────────────── */

const FOUNDERS = [
  {
    name: "Ankit Kathuria",
    role: "Co-Founder & Director, IT Operations",
    image: "/images/ankit-kathuria.jpg",
    linkedin: "https://in.linkedin.com/in/ankit-kathuria-08108a1a9",
    description:
      "Leads IT operations and technology strategy, supporting the systems and infrastructure behind research delivery and business growth.",
    expertise: ["Technology Strategy", "IT Operations"],
    number: "01",
    details: [
      { title: "Experience", description: "10+ years in Technology Leadership & IT Operations", icon: "focus" },
      { title: "Education", description: "MBA (International Business) & BTech (Computer Science)", icon: "leadership" },
      { title: "Expertise", description: "Technology infrastructure and operations", icon: "expertise" },
      { title: "Vision", description: "Scalable technology for sustainable growth", icon: "vision" },
    ],
  },
  {
    name: "Avick Mitra",
    role: "Co-Founder & Director, Sales",
    image: "/images/avik.png",
    linkedin: "https://www.linkedin.com/in/avick-mitra-073b5774/",
    description:
      "Avick Mitra is Co-Founder and Director of Sales at Elicit Research & Insights Inc. His professional background includes sales leadership, customer service, and operations, with experience at Elicit Research, FIS, and IBM Global Process Services.",
    expertise: ["Sales Leadership", "Client Relationships", "Customer Service", "Operations"],
    number: "02",
    details: [
      {
        title: "Experience",
        description: "10+ years in Sales & Operations",
        icon: "focus",
      },
      {
        title: "Vision",
        description: "Sales leadership and client relationships",
        icon: "leadership",
      },
      {
        title: "Education",
        description: "Bachelors of Computer Applications",
        icon: "expertise",
      },
      {
        title: "Core Skills",
        description: "Sales and client management",
        icon: "vision",
      },
    ],
  },

  {
    name: "Vikram Srivastava",
    role: "Co-Founder & CEO, Elicit Research & Insights Inc.",
    image: "/images/vikram%20srivastav.png",
    linkedin: "https://www.linkedin.com/in/vikrumsrivastava/",
    description:
      "Business leader with experience across strategy, operations, and commercial growth, leading an international team across the UK, US, and India.",
    expertise: ["Strategy", "Leadership", "Strategic Planning", "Market Research"],
    number: "03",
    details: [
      { title: "Experience", description: "11+ years in Strategy, Leadership & Market Research", icon: "focus" },
      { title: "Education", description: "MBA (Leadership & Strategy) – ISB; Exchange – NUS", icon: "leadership" },
      { title: "Global Operations", description: "Supporting teams across the UK, US, and India", icon: "expertise" },
      { title: "Core Skills", description: "Strategic planning and market research", icon: "vision" },
    ],
  },
];

/* ─── Founder Card — profile layout inspired by the reference ─── */

function FounderCard({ founder }) {
  const detailIcons = {
    focus: Target,
    leadership: Users,
    expertise: Award,
    vision: Globe2,
  };

  return (
    <article className="group relative isolate overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_42px_rgba(15,23,42,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(18,107,137,0.13)] dark:border-white/10 dark:bg-slate-900">
      <div className="h-1 w-full bg-gradient-to-r from-[#ec4899] via-[#f472b6] to-[#126b89]" />

      <div className="grid grid-cols-1 gap-0 md:grid-cols-[0.78fr_1.22fr] lg:grid-cols-[0.82fr_1.18fr]">
        {/* Layered portrait area */}
        <div className="relative min-h-[320px] overflow-hidden bg-[#eaf3f6] p-7 sm:min-h-[380px] md:min-h-[430px] md:p-8 lg:min-h-[455px] dark:bg-slate-800">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-br from-[#dceef2] via-[#eaf3f6] to-[#cce5eb] dark:from-slate-700 dark:via-slate-800 dark:to-slate-900" />
          {/* Half-square pink accent frame on Top & Right side */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12%] right-[5%] top-[5%] bottom-[8%] rounded-tr-2xl"
            style={{
              borderTop: '4px solid #ec4899',
              borderRight: '4px solid #ec4899',
              borderBottom: 'none',
              borderLeft: 'none',
            }}
          />
          <div aria-hidden="true" className="absolute bottom-[5%] left-[5%] h-[82%] w-[77%] bg-[#d7e9ee] dark:bg-slate-700" />

          <div className="absolute inset-x-8 bottom-8 top-8 aspect-[3/4] md:aspect-auto overflow-hidden bg-[#e7efff] shadow-[0_14px_35px_rgba(15,23,42,0.12)] dark:bg-slate-700">
            {founder.image ? (
              <img
                src={founder.image}
                alt={`${founder.name}, ${founder.role}`}
                className="h-full w-full object-cover object-top brightness-[0.97] contrast-[1.04] saturate-[0.84] transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#eaf3fd] via-[#f8fbff] to-[#d8eaf0] dark:from-slate-800 dark:via-slate-700 dark:to-slate-900">
                <div aria-hidden="true" className="absolute -left-10 -top-10 h-40 w-40 rounded-full border border-[#126b89]/25" />
                <div aria-hidden="true" className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full border border-[#ec4899]/30" />
                <div aria-hidden="true" className="absolute bottom-10 left-8 h-24 w-24 rounded-full bg-[#ec4899]/15 blur-2xl" />
                <Users size={66} strokeWidth={1.1} className="relative text-pink-600/60 dark:text-pink-300/60" />
                <span className="absolute bottom-5 rounded-full border border-[#126b89]/20 bg-white/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-pink-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-sky-200">
                  Profile photo coming soon
                </span>
              </div>
            )}
          </div>

          <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
            <span className="text-lg font-semibold leading-none text-pink-600 dark:text-pink-300">{founder.number}</span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-600" />
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-200">Co-Founder</span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between gap-3">
            {null}
            {null}
          </div>
        </div>

        {/* Profile information */}
        <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-9 xl:p-10">

          <h3 className="text-2xl font-bold leading-tight tracking-tight text-pink-600 sm:text-3xl lg:text-[2rem] dark:text-pink-300">{founder.name}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">{founder.role}</p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7 dark:text-slate-300">{founder.description}</p>

          {/* Four information cards, matching the reference layout */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {founder.details.map((detail, index) => {
              const Icon = detailIcons[detail.icon] || Info;
              const warm = index === 1 || index === 2;
              return (
                <div
                  key={detail.title}
                  className={`flex min-h-[96px] items-start gap-3 rounded-xl border p-3.5 transition-all duration-300 hover:-translate-y-0.5 sm:p-4 ${warm
                      ? "border-pink-200 bg-pink-50 hover:border-[#ec4899]/60 dark:border-pink-300/20 dark:bg-pink-400/[0.06]"
                      : "border-pink-200 bg-pink-50 hover:border-pink-500/50 dark:border-pink-300/20 dark:bg-pink-400/[0.06]"} ${detail.title === "Experience" || detail.title === "Education" ? "" : "hidden md:flex"}`}
                >
                  <Icon size={21} strokeWidth={1.9} className={`mt-0.5 shrink-0 ${warm ? "text-[#ec4899]" : "text-pink-600 dark:text-pink-300"}`} />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{detail.title}</h4>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-[13px] dark:text-slate-300">{detail.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 hidden md:block">
            <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Areas of Expertise</p>
            <div className="flex flex-wrap gap-2">
              {founder.expertise.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition-colors duration-300 group-hover:border-pink-200 group-hover:bg-pink-50 sm:text-xs dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:group-hover:border-pink-400/30 dark:group-hover:bg-pink-400/[0.06]">
                  {skill}
                </span>
              ))}
            </div>
          </div>


        </div>
      </div>
    </article>
  );
}

/* ─── About Page ──────────────────────────────── */

export default function AboutPage() {
  const leadershipTeam = Array.isArray(LEADERSHIP_TEAM)
    ? LEADERSHIP_TEAM
    : [];

  const headquarters =
    COMPANY.headquarters &&
      typeof COMPANY.headquarters === "object" &&
      !Array.isArray(COMPANY.headquarters)
      ? Object.entries(COMPANY.headquarters)
      : [];

  return (
    <main className="relative isolate w-full min-w-0 overflow-x-clip bg-slate-50 pt-16 text-slate-800 sm:pt-24 dark:bg-slate-950 dark:text-slate-100">
      {/* Ambient Background Glows */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[35rem] z-0 h-96 w-96 rounded-full bg-pink-300/30 blur-[110px] dark:bg-pink-500/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[75rem] z-0 h-96 w-96 rounded-full bg-purple-300/30 blur-[120px] dark:bg-purple-500/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-40 z-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[110px] dark:bg-indigo-500/10"
      />

      {/* HERO SECTION */}

      <section
        className="relative isolate flex min-h-[100vh] min-h-[100svh] w-full flex-col justify-start overflow-hidden border-b border-slate-200/80 dark:border-white/5"
        style={{
          paddingTop: "clamp(3rem, 4vh, 4rem)",
          paddingBottom: "clamp(2rem, 4vh, 3rem)",
        }}
      >
        {/* Background glows and gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-0">
          <div className="absolute left-1/2 top-0 h-[420px] w-[min(1200px,120vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-500/20 via-purple-500/15 to-transparent blur-3xl sm:h-[600px]" />

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl sm:right-1/4" />

          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl sm:left-1/4" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(236,72,153,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Hero content grid */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-5 sm:px-8 sm:py-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-4">

          {/* LEFT COLUMN */}
          <div className="flex min-w-0 flex-col items-center text-center order-1 md:order-2 lg:order-1 lg:items-start lg:text-left">

            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex items-center gap-3 text-sm sm:mb-6"
            >
              <Link
                to="/"
                className="text-slate-700 transition-colors hover:text-pink-600 dark:text-slate-300 dark:hover:text-pink-300"
              >
                Home
              </Link>

              <span className="text-pink-500">/</span>

              <span className="rounded-full border border-pink-200 bg-white/80 px-4 py-2 font-semibold text-pink-700 shadow-sm backdrop-blur-md dark:border-pink-800/50 dark:bg-pink-950/60 dark:text-pink-300">
                About Us
              </span>
            </nav>

            {/* Eyebrow badge */}
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-pink-200 bg-white/60 px-3 py-2.5 shadow-sm backdrop-blur-md sm:mb-6 sm:px-4 sm:py-3 dark:border-pink-400/20 dark:bg-white/5">
              <Sparkles size={13} className="text-pink-600 dark:text-pink-300" />
              <span className="text-[9px] font-bold uppercase leading-relaxed tracking-[0.12em] text-slate-700 sm:text-xs sm:tracking-[0.18em] dark:text-slate-200">
                Research. Intelligence. Impact.
              </span>
            </div>

            {/* Main heading — dark navy + pink-purple gradient */}
            <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Data Precision Meets
              <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                Global Intelligence.
              </span>
            </h1>

            {/* Description — readable slate body text */}
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg dark:text-slate-300">
              Elicit Research &amp; Insights Inc. — delivering precision research,
              data intelligence, and strategic insights across global markets.
            </p>

            {/* CTA buttons */}
            <div className="hidden md:flex mt-6 w-full flex-col items-stretch justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#founders"
                className="group/button inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/25 sm:px-6 sm:py-4"
              >
                Meet Our Founders
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
              </a>

              <a
                href="#our-philosophy"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/75 px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:bg-white sm:px-6 sm:py-4 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-pink-500" />
                Discover Our Approach
                <ArrowUpRight className="h-5 w-5 text-purple-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN — HERO IMAGE */}
          <div className="relative order-2 md:order-1 lg:order-2 mx-auto w-full max-w-xl lg:max-w-none">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-pink-500/25 via-purple-500/20 to-rose-500/20 blur-2xl opacity-0"
              aria-hidden="true"
            />

            <div className="relative h-[260px] overflow-hidden rounded-3xl border border-white/60 bg-slate-200 shadow-2xl shadow-purple-900/15 sm:h-[360px] lg:h-[430px] dark:border-white/10">
              <img
                src="/images/Home/media-generation-elicit-trust-other-image-white-0-ee14d1b0-a60a-4dd2-975d-ce17461a7287.webp"
                alt={HERO_IMAGES.corporateGlass.alt}
                className="h-full w-full object-cover object-center"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="order-3 mt-6 flex w-full flex-col items-stretch justify-center gap-3 md:hidden sm:mt-7">
            <a
              href="#founders"
              className="group/button inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/25 sm:px-6 sm:py-4"
            >
              Meet Our Founders
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
            </a>

            <a
              href="#our-philosophy"
              className="group inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/75 px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:bg-white sm:px-6 sm:py-4 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-pink-500" />
              Discover Our Approach
              <ArrowUpRight className="h-5 w-5 text-purple-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}

      <section
        id="our-philosophy"
        className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-white via-pink-50/70 to-purple-50/60 py-8 sm:py-10 lg:py-8 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950"
      >
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="relative lg:pr-4">
              <div className="img-zoom-container relative overflow-hidden rounded-2xl border border-white/80 shadow-xl shadow-purple-900/10 dark:border-white/10 dark:shadow-black/20">
                <img
                  src={ABOUT_IMAGES.philosophyTeam.url}
                  alt={ABOUT_IMAGES.philosophyTeam.alt}
                  className="h-[250px] w-full object-cover object-center sm:h-[320px] lg:h-[350px]"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              </div>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-xs dark:text-pink-400">
                Our Research Philosophy
              </p>

              <h2 className="text-xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl dark:text-white">
                Methodology Built on
                <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                  Integrity & Insight.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-xs leading-5 text-slate-600 sm:leading-6 dark:text-slate-400">
                We believe research is only as valuable as the trust behind it.
                Our methodology prioritizes verified participants, transparent
                economics, and adaptable frameworks that meet each client's
                unique objectives.
              </p>

              <p className="mt-3 max-w-xl text-xs leading-5 text-slate-600 sm:leading-6 dark:text-slate-400">
                From recruitment to delivery, every step is designed to reduce
                bias, protect data quality, and deliver insights that stand up
                to scrutiny.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    Icon: ShieldCheck,
                    title: "Double Opt-In Verification",
                    desc: "Respondents are verified through layered confirmation to ensure genuine, high-quality participation.",
                    tone: "pink",
                  },
                  {
                    Icon: HandCoins,
                    title: "Fair Incentive Economics",
                    desc: "Compensation is structured to motivate engagement without compromising data integrity.",
                    tone: "purple",
                  },
                ].map(({ Icon, title, desc, tone }) => (
                  <div
                    key={title}
                    className="group flex items-start gap-3 rounded-xl border border-white/90 bg-white/75 p-3 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-lg sm:p-4 dark:border-white/[0.08] dark:bg-white/[0.03]"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        tone === "pink"
                          ? "bg-pink-50 text-pink-700 dark:bg-pink-400/10 dark:text-pink-400"
                          : tone === "purple"
                            ? "bg-purple-50 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-400"
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    <div>
                      <h3 className="text-[11px] font-semibold text-slate-900 sm:text-xs dark:text-white">
                        {title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNANCE */}

      <section className="relative overflow-hidden border-y border-slate-200/80 bg-slate-100/70 py-12 dark:border-white/[0.06] dark:bg-slate-900/50 sm:py-16 lg:py-12">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-purple-300/20 blur-[100px] dark:bg-purple-500/10" />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 sm:text-xs dark:text-emerald-400">
                Built on Accountability
              </p>

              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
                Trust Is Our
                <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                  Operating Standard.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:leading-7 dark:text-slate-400">
                Responsible research requires transparent processes,
                thoughtful data handling, and a consistent focus on quality.
                Our approach is designed to support accountable research
                practices and help clients make informed decisions with
                confidence.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    Icon: ShieldCheck,
                    title: "ESOMAR Corporate Alignment",
                    desc: "A commitment to responsible research principles and relevant professional industry guidance.",
                    tone: "pink",
                  },
                  {
                    Icon: Award,
                    title: "ISO 20252 Alignment",
                    desc: "Quality-focused research processes informed by recognised market, opinion, and social research standards.",
                    tone: "purple",
                  },
                  {
                    Icon: Globe2,
                    title: "GDPR & CCPA Privacy Safeguards",
                    desc: "Privacy-conscious data handling that takes applicable data protection requirements into account.",
                    tone: "emerald",
                  },
                ].map(({ Icon, title, desc, tone }) => (
                  <div
                    key={title}
                    className="group flex items-center gap-3 rounded-xl border border-white/90 bg-white/75 p-3 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-lg sm:p-4 dark:border-white/[0.08] dark:bg-white/[0.03]"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone === "pink"
                          ? "bg-pink-50 text-pink-700 dark:bg-pink-400/10 dark:text-pink-400"
                          : tone === "purple"
                            ? "bg-purple-50 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400"
                            : "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400"
                        }`}
                    >
                      <Icon size={19} />
                    </div>

                    <div>
                      <h3 className="text-[11px] font-semibold text-slate-900 sm:text-xs dark:text-white">
                        {title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                        {desc}
                      </p>
                    </div>

                    <ArrowUpRight
                      className="ml-auto hidden shrink-0 text-slate-400 transition group-hover:text-pink-500 sm:block"
                      size={16}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-4">
              <div className="img-zoom-container relative overflow-hidden rounded-2xl border border-white/80 shadow-xl shadow-purple-900/10 dark:border-white/10 dark:shadow-black/20">
                <img
                  src="/images/Home/media-generation-elicit-trust-handshake-white-b-0-eb25bc70-266d-4394-a7cd-f03e30f79e36.webp"
                  alt="Handshake symbolizing trust and partnership in research"
                  className="w-full h-[280px] object-cover sm:h-[320px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {null}

      {/* FOUNDERS */}

      <section
        id="founders"
        className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-12 sm:py-16 lg:py-12 dark:bg-slate-950"
      >
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-pink-300/20 blur-[100px] dark:bg-pink-500/10" />

        <div className="section-container relative z-10">
          <div className="mb-9 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ec4899] sm:text-xs dark:text-pink-300">
                The People Behind Our Vision
              </p>

              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
                Meet Our
                <span className="text-pink-600 dark:text-pink-300">
                  {" "}Co-Founders.
                </span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 sm:leading-7 dark:text-slate-400">
                Meet the leaders helping shape our technology, sales
                strategy, and long-term commitment to research excellence.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border border-white/80 bg-white/70 px-3 py-2.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-50 text-pink-600 dark:bg-pink-400/10 dark:text-pink-300">
                <Users size={19} />
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-900 sm:text-xs dark:text-white">
                  Founders & Leadership
                </p>

                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs dark:text-slate-400">
                  Technology · Partnerships · Strategy
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            {FOUNDERS.map((founder) => (
              <FounderCard key={founder.name} founder={founder} />
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}

      <section
        id="leadership"
        className="relative scroll-mt-20 overflow-hidden border-t border-slate-200/80 bg-slate-100/70 py-12 dark:border-white/[0.06] dark:bg-slate-900/50 sm:py-16"
        aria-label="Leadership and governance"
      >
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-pink-300/15 blur-[100px] dark:bg-purple-500/10" />

        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Corporate Governance"
            title="Leadership & Institutional Oversight"
            description="Our executive steering groups, methodology directors, and engineering leadership guide research fidelity across our international operations."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {leadershipTeam.map((group, idx) => (
              <article
                key={group.name || idx}
                className="card-base card-hover hover-lift group flex flex-col overflow-hidden rounded-2xl"
              >
                {group.image ? (
                  <div className="img-zoom-container relative h-44 sm:h-48">
                    <img
                      src={group.image.url}
                      alt={group.image.alt}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-pink-600/90 text-white shadow-sm">
                      <Users size={16} />
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="rounded-md border border-white/20 bg-black/60 px-2.5 py-1 text-[12px] font-semibold text-pink-200 backdrop-blur">
                        {group.role}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 dark:from-slate-800 dark:via-purple-950/40 dark:to-slate-950">
                    <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-pink-300/30 blur-3xl" />

                    <Users
                      size={30}
                      className="relative text-pink-600 dark:text-pink-400"
                    />
                  </div>
                )}

                <div className="flex flex-grow flex-col p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
                    {group.name}
                  </h3>

                  <p className="flex-grow text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {group.note}
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-white/[0.06] dark:text-slate-400">
                    <Info
                      size={14}
                      className="shrink-0 text-pink-600 dark:text-pink-400"
                    />
                    Leadership & Operational Oversight
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur-md dark:border-white/[0.07] dark:bg-white/[0.02]">
            <Info
              size={16}
              className="mt-0.5 shrink-0 text-pink-600 dark:text-pink-400"
            />

            <p className="text-xs leading-6 text-slate-600 sm:text-sm dark:text-slate-400">
              For executive biographies, keynote speaking inquiries, or
              press credential verification, please contact our team at{" "}
              <a
                href={`mailto:${COMPANY.emails.general}`}
                className="font-semibold text-pink-700 hover:underline dark:text-pink-400"
              >
                {COMPANY.emails.general}
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* GLOBAL OPERATIONS */}

      <section className="relative overflow-hidden border-t border-white/80 bg-gradient-to-br from-slate-50 via-pink-50/70 to-purple-50/70 py-12 dark:border-white/[0.06] dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 sm:py-16 lg:py-12">
        <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-pink-300/20 blur-[100px] dark:bg-pink-500/10" />

        <div className="section-container relative z-10">
          <div className="mb-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="img-zoom-container relative overflow-hidden rounded-2xl border border-white/80 shadow-xl shadow-purple-900/10 dark:border-white/10 dark:shadow-black/20">
              <img
                src={HERO_IMAGES.globalNetwork.url}
                alt={HERO_IMAGES.globalNetwork.alt}
                className="h-[260px] w-full object-cover object-center sm:h-[340px] lg:h-[380px]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-pink-600/90 via-purple-600/90 to-rose-600/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  <Globe2 size={15} />
                  45+ Countries Active
                </span>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="International Footprint"
                title="Global Operations & Feasibility Hubs"
                description="Our strategic presence across four continents supports feasibility response, native-language survey execution, and direct panel engagement in major global markets."
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/90 bg-white/70 p-3.5 shadow-sm backdrop-blur-md sm:p-4 dark:border-white/10 dark:bg-white/[0.03]">
                  <Globe2
                    size={19}
                    className="mb-2.5 text-pink-600 dark:text-pink-400"
                  />

                  <p className="text-xs font-semibold text-slate-900 sm:text-sm dark:text-white">
                    Global Reach
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs dark:text-slate-400">
                    International market coverage
                  </p>
                </div>

                <div className="rounded-xl border border-white/90 bg-white/70 p-3.5 shadow-sm backdrop-blur-md sm:p-4 dark:border-white/10 dark:bg-white/[0.03]">
                  <Target
                    size={19}
                    className="mb-2.5 text-purple-600 dark:text-purple-400"
                  />

                  <p className="text-xs font-semibold text-slate-900 sm:text-sm dark:text-white">
                    Local Expertise
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs dark:text-slate-400">
                    Market-specific execution
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Cards */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {headquarters.map(([key, hub]) => (
              <article
                key={key}
                className="card-base card-hover hover-lift group flex flex-col overflow-hidden rounded-xl"
              >
                {hub.image && (
                  <div className="img-zoom-container relative h-36 overflow-hidden">
                    <img
                      src={hub.image.url}
                      alt={hub.image.alt}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white">
                      <MapPin
                        size={14}
                        className="shrink-0 text-pink-300"
                      />
                      {hub.city}
                    </div>
                  </div>
                )}

                <div className="flex flex-grow flex-col p-4">
                  <h3 className="mb-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-pink-700 sm:text-base dark:text-white dark:group-hover:text-pink-400">
                    {hub.city} Office
                  </h3>

                  <p className="text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
                    {hub.address}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400 sm:text-xs dark:text-slate-500">
                    {hub.region}
                  </p>

                  <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] font-medium text-emerald-600 dark:border-white/[0.06] dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-status-pulse rounded-full bg-emerald-500" />
                    Hub Active
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

