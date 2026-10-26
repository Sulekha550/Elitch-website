
import React, { useEffect, useState } from 'react';
import { COMPANY } from '../data/companyData';
import './CareersPage.css';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Send,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/common/ScrollReveal';
import Card3D from '../components/common/Card3D';
import { CAREERS_IMAGES } from '../data/imageAssets';

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    coverLetter: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  // Sync this page with the existing global light/dark theme.
  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      setIsDark(root.classList.contains('dark'));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Close the modal with Escape and prevent background scrolling.
  useEffect(() => {
    if (!selectedJob) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedJob(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedJob]);

  const pageOpenings = [
    {
      id: 'operations-trainee',
      title: 'Management Trainee for Operations Team',
      department: 'Operations',
      location: 'Contact us for details',
      type: 'Full-time',
      experience: 'As per role requirements',
      desc: 'Support day-to-day operations, coordinate activities, and help the team deliver reliable research and client services.',
    },
    {
      id: 'client-servicing-associate',
      title: 'Client Servicing Associates for Client Servicing Team',
      department: 'Client Servicing',
      location: 'Contact us for details',
      type: 'Full-time',
      experience: 'As per role requirements',
      desc: 'Work with clients and internal teams to coordinate project requirements, communication, and service delivery.',
    },
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setSubmitted(false);
    setAppForm({
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      coverLetter: '',
    });
  };

  const handleSubmitApp = (event) => {
    event.preventDefault();

    // This currently displays local success feedback only.
    // Connect an API if applications need to be saved or emailed.
    setSubmitted(true);
  };

  const closeApplication = () => {
    setSelectedJob(null);
  };

  const pageTheme = isDark
    ? 'careers-page careers-theme-dark'
    : 'careers-page careers-theme-light';

  return (
    <main
      className={`${pageTheme} relative isolate min-h-screen overflow-x-clip pt-24`}
      data-theme={isDark ? 'dark' : 'light'}
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-96 z-0 h-96 w-96 rounded-full bg-pink-300/30 blur-[120px] dark:bg-pink-500/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[1000px] z-0 h-96 w-96 rounded-full bg-purple-300/30 blur-[120px] dark:bg-purple-500/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-40 z-0 h-96 w-96 rounded-full bg-pink-300/20 blur-[120px] dark:bg-pink-500/10"
      />

      {/* Hero */}
      <section className="relative z-10 overflow-hidden border-b border-white/80 px-3 pb-3 dark:border-white/10 sm:px-5">
        <div className="img-zoom-container group relative mx-auto h-[calc(100svh-6rem)] min-h-[600px] w-full max-w-[1600px] overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 shadow-xl shadow-purple-900/5 dark:border-white/10 dark:from-pink-900/40 dark:via-purple-900/40 dark:to-rose-900/40 sm:min-h-[600px]">
          <img
            src={CAREERS_IMAGES.hero.url}
            alt={CAREERS_IMAGES.hero.alt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-10 z-[1] h-80 w-80 rounded-full bg-pink-400/20 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/4 z-[1] h-96 w-96 rounded-full bg-purple-400/20 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-1/3 z-[1] h-80 w-80 rounded-full bg-rose-400/20 blur-[110px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          <div className="relative z-10 flex h-full min-h-[600px] items-center sm:min-h-[600px]">
            <div className="section-container w-full">
              <div className="max-w-3xl space-y-6 pt-10">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-2 text-sm font-medium text-slate-300"
                >
                  <Link
                    to="/"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    Home
                  </Link>

                  <span className="text-slate-500" aria-hidden="true">
                    /
                  </span>

                  <span className="rounded-full border border-pink-300/30 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-rose-400/20 px-3 py-1 text-xs font-semibold text-pink-100 backdrop-blur-md">
                    Careers
                  </span>
                </nav>

                <h1 className="heading-hero">
                  <span
                    className="block text-white"
                    style={{ textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
                  >
                    Careers
                  </span>
                  <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 bg-clip-text text-transparent">
                    Grow With Elicit.
                  </span>
                </h1>

                <p className="body-lg max-w-2xl text-slate-200">
                  Discover opportunities to grow your career with Elicit
                  Research &amp; Insights Inc. Join a team that values
                  collaboration, learning, and meaningful work.
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  {[
                    { label: 'Career Growth', icon: '🌱' },
                    { label: 'Team Collaboration', icon: '🤝' },
                    { label: 'New Opportunities', icon: '✨' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:border-pink-300/50 hover:bg-white/15"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-white via-pink-50/70 to-purple-50/60 py-14 transition-colors duration-300 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-xl text-center sm:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-pink-700 shadow-sm backdrop-blur-md dark:border-pink-400/20 dark:bg-pink-400/[0.06] dark:text-pink-400">
              <Sparkles size={13} />
              Life at Elicit
            </span>

            <h2 className="mt-4 text-2xl font-display font-bold text-slate-900 dark:text-white sm:text-3xl">
              Life at Elicit Research &amp; Insights Inc.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Learning & Development */}
            <div className="group overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br from-white via-pink-50/70 to-white shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_22px_55px_rgba(236,72,153,0.12)] dark:border-white/10 dark:from-slate-900 dark:via-pink-950/10 dark:to-slate-900 dark:hover:border-pink-400/30">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={CAREERS_IMAGES.dataScience.url}
                  alt={CAREERS_IMAGES.dataScience.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-display font-bold text-slate-900 dark:text-white">
                  Learning &amp; Development
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Build your skills, learn from your teammates, and explore
                  opportunities to grow professionally while contributing to
                  meaningful research and insights.
                </p>
              </div>
            </div>

            {/* Collaborative Teamwork */}
            <div className="group overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br from-white via-purple-50/70 to-white shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_22px_55px_rgba(168,85,247,0.12)] dark:border-white/10 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 dark:hover:border-purple-400/30">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={CAREERS_IMAGES.impact.url}
                  alt={CAREERS_IMAGES.impact.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-display font-bold text-slate-900 dark:text-white">
                  Collaborative Teamwork
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Work together across teams, share ideas, and help deliver
                  thoughtful solutions that support our clients and their
                  business decisions.
                </p>
              </div>
            </div>

            {/* Opportunities to Grow */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_22px_55px_rgba(244,63,94,0.12)] dark:border-white/10 dark:bg-slate-900/90 dark:hover:border-pink-400/30">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={CAREERS_IMAGES.flexibility.url}
                  alt={CAREERS_IMAGES.flexibility.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-display font-bold text-slate-900 dark:text-white">
                  Opportunities to Grow
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Explore new responsibilities, develop your strengths, and
                  take the next step in your career with Elicit Research &amp;
                  Insights Inc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="relative z-10 overflow-hidden border-t border-slate-200/80 bg-slate-100/70 py-14 transition-colors duration-300 dark:border-white/[0.06] dark:bg-slate-900/50 sm:py-20">
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-purple-300/20 blur-[100px] dark:bg-purple-500/10" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-pink-300/15 blur-[100px] dark:bg-rose-500/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-700 shadow-sm backdrop-blur-md dark:border-purple-400/20 dark:bg-purple-400/[0.06] dark:text-purple-400">
              <Briefcase size={13} />
              Current Openings
            </span>

            <h2 className="mt-4 text-2xl font-display font-bold text-slate-900 dark:text-white sm:text-3xl">
              Current Opportunities
            </h2>
          </div>

          <div className="space-y-4">
            {pageOpenings.map((job, idx) => (
              <ScrollReveal
                key={job.id}
                animation="fade-up"
                delay={idx * 100}
                duration={600}
              >
                <Card3D maxTilt={4} elevation={8} scale={1.01}>
                  <article className="group flex flex-col justify-between gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-pink-200 hover:shadow-[0_20px_55px_rgba(244,63,94,0.12)] dark:border-white/10 dark:bg-slate-900/90 dark:hover:border-pink-400/30 sm:p-8 md:flex-row md:items-center">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-[11px] font-semibold text-pink-800 dark:border-pink-400/20 dark:bg-pink-400/[0.08] dark:text-pink-300">
                          {job.department}
                        </span>

                        <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                          <MapPin className="h-3 w-3 text-purple-500" />
                          {job.location}
                        </span>

                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          • {job.type} ({job.experience})
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-slate-900 transition-colors group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300 sm:text-xl">
                        {job.title}
                      </h3>

                      <p className="max-w-2xl text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {job.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApply(job)}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-purple-600/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-600/25 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900"
                    >
                      <span>Apply Now</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </article>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>

          {/* General Application */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 text-xs text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-400 sm:mt-12 sm:flex-row">
            <div>
              <strong className="mb-1 block text-sm text-slate-900 dark:text-white">
                Unlimited opportunities to grow
              </strong>
              We are growing every day and look for great talents to join our
              journey.
            </div>

            <a
              href={`mailto:${COMPANY.emails.careers}?subject=General%20Career%20Application%20-%20Elicit%20Research`}
              className="shrink-0 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 px-5 py-3 font-semibold text-white shadow-md shadow-purple-600/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Apply Now &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeApplication();
            }
          }}
        >
          <div className="relative my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200/80 bg-white p-6 text-slate-800 shadow-2xl dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 sm:p-8">
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500" />

            <button
              type="button"
              onClick={closeApplication}
              aria-label="Close application form"
              className="absolute right-5 top-5 rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition-all hover:border-pink-200 hover:bg-pink-50 hover:text-pink-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:border-pink-400/30 dark:hover:bg-pink-400/10 dark:hover:text-pink-300"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="space-y-4 py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 shadow-sm dark:border-emerald-400/20 dark:from-emerald-400/10 dark:to-teal-400/10 dark:text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                  Application Received
                </h3>

                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Thank you,{' '}
                  <strong className="text-slate-900 dark:text-white">
                    {appForm.name}
                  </strong>
                  . Your application details have been recorded for{' '}
                  <strong className="text-purple-700 dark:text-purple-300">
                    {selectedJob.title}
                  </strong>
                  .
                </p>

                <button
                  type="button"
                  onClick={closeApplication}
                  className="rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-purple-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApp} className="space-y-4">
                <div className="mb-5 pr-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-[10px] font-semibold uppercase text-pink-700 dark:border-pink-400/20 dark:bg-pink-400/[0.08] dark:text-pink-300">
                    <Sparkles size={12} />
                    Applying For
                  </span>

                  <h3 className="mt-3 text-lg font-display font-bold text-slate-900 dark:text-white">
                    {selectedJob.title}
                  </h3>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    required
                    value={appForm.name}
                    onChange={(event) =>
                      setAppForm({ ...appForm, name: event.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-pink-300 focus:ring-4 focus:ring-pink-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-pink-400/50 dark:focus:ring-pink-400/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={appForm.email}
                    onChange={(event) =>
                      setAppForm({ ...appForm, email: event.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-purple-400/50 dark:focus:ring-purple-400/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    LinkedIn / Portfolio URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={appForm.portfolio}
                    onChange={(event) =>
                      setAppForm({ ...appForm, portfolio: event.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-purple-400/50 dark:focus:ring-purple-400/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Note to Hiring Lead
                  </label>
                  <textarea
                    rows={3}
                    value={appForm.coverLetter}
                    onChange={(event) =>
                      setAppForm({
                        ...appForm,
                        coverLetter: event.target.value,
                      })
                    }
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-purple-400/50 dark:focus:ring-purple-400/10"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-purple-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-600/25 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
