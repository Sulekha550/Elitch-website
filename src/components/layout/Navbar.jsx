import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Layers,
  Mail,
} from 'lucide-react';
import { COMPANY, SERVICES } from '../../data/companyData';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';

function ElicitLogoMark({ className = "h-11 w-11" }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
        <circle cx="32" cy="32" r="27" fill="#28234F" />
        <path
          d="M12.5 23.5A22.5 22.5 0 0 1 48 12"
          stroke="#E83E8C"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M49.5 15.5A22.5 22.5 0 0 1 53 39"
          stroke="#F49A45"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M50 46A22.5 22.5 0 0 1 16 51"
          stroke="#D93687"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <text
          x="32"
          y="39"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="22"
          fontWeight="800"
          letterSpacing="-2"
          fill="#FFFFFF"
        >
          ER
        </text>
        <circle cx="12" cy="37" r="3" fill="#F49A45" />
      </svg>
    </span>
  );
}

function ElicitWordmark({ compact = false }) {
  return (
    <span className="flex min-w-0 flex-col">
      <span className={`whitespace-nowrap font-display font-extrabold leading-none tracking-[0.035em] text-slate-900 dark:text-white ${compact ? "text-sm" : "text-[15px] sm:text-base"}`}>
        ELICIT
        <span className="ml-1 font-medium tracking-[0.12em] text-slate-600 dark:text-slate-300">
          RESEARCH
        </span>
      </span>
      <span className={`mt-1 uppercase font-medium tracking-[0.2em] text-slate-500 dark:text-slate-400 ${compact ? "text-[8px]" : "text-[9px]"}`}>
        &amp; Insights Inc.
      </span>
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen]                 = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const { isDark } = useTheme();

  /* ── Scroll-state ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close on route change ── */
  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  /* ── Body-scroll lock for mobile drawer ── */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home',     path: '/' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Panel',    path: '/panel',    badge: '5M+ Network' },
    { name: 'About Us', path: '/about' },
    { name: 'Careers',  path: '/careers',  hiring: true },
    { name: 'Contact',  path: '/contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  /* ── Header classes ── */
  const headerClass = [
    'fixed top-0 left-0 right-0 z-50',
    scrolled
      ? 'bg-white/98 dark:bg-brand-950/98 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/[0.07] shadow-sm py-3'
      : 'bg-white/90 dark:bg-brand-950/85 backdrop-blur-md py-4',
  ].join(' ');

  return (
    <header className={headerClass} style={{ transition: 'padding 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease' }}>

      {/* ── Info bar (desktop only) ── */}
      <div className="hidden lg:block border-b border-slate-100 dark:border-white/[0.05] pb-2 mb-2.5">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-status-pulse" />
              Global Sampling Engine — 45+ Countries
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>ISO 20252 &amp; ESOMAR Aligned</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${COMPANY.emails.rfq}`}
              className="flex items-center gap-1.5 font-mono hover:text-cyan-600 dark:hover:text-cyan-400"
              style={{ transition: 'color 0.15s ease' }}
            >
              <Mail className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              RFQ: {COMPANY.emails.rfq}
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-mono">{COMPANY.emails.general}</span>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* Brand logo — circular ER emblem and ELICIT wordmark */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Elicit Research & Insights Inc. — Home"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
        >
          <ElicitLogoMark className="h-10 w-10 sm:h-11 sm:w-11" />
          <ElicitWordmark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link-underline flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                        isActive
                          ? 'nav-link-active text-pink-600 dark:text-pink-400 bg-pink-50/80 dark:bg-white/[0.05] font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                      }`
                    }
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 ${servicesDropdown ? 'text-pink-600 dark:text-pink-400 rotate-180' : 'text-slate-400'}`}
                      style={{ transition: 'transform 0.2s ease' }}
                    />
                  </NavLink>

                  {/* Dropdown */}
                  {servicesDropdown && (
                    <div className="absolute top-full left-0 mt-1.5 w-[520px] max-w-[90vw] rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl p-4 grid grid-cols-2 gap-1.5"
                      style={{ animation: 'fadeIn 0.15s ease forwards' }}
                    >
                      <div className="col-span-2 flex items-center justify-between pb-3 mb-1 border-b border-slate-100 dark:border-white/[0.06]">
                        <span className="text-xs font-semibold tracking-wider text-pink-600 dark:text-pink-400 uppercase">
                          Core Practice Areas
                        </span>
                        <Link
                          to="/services"
                          className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                          style={{ transition: 'color 0.15s ease' }}
                        >
                          All services <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {SERVICES.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services#${service.id}`}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.05] group/item"
                          style={{ transition: 'background-color 0.15s ease' }}
                        >
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-50 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-800/30 text-pink-600 dark:text-pink-400">
                            <Layers className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover/item:text-pink-600 dark:group-hover/item:text-pink-400" style={{ transition: 'color 0.15s ease' }}>
                              {service.title}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {service.shortDesc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link-underline relative flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'nav-link-active text-pink-600 dark:text-pink-400 bg-pink-50/80 dark:bg-white/[0.05] font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                  }`
                }
              >
                <span>{link.name}</span>

                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 border border-pink-200 dark:border-pink-800/50">
                    {link.badge}
                  </span>
                )}

                {link.hiring && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-status-pulse" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />

          <Link
            to="/contact?type=rfq"
            className="btn-primary text-sm px-4 py-2.5"
          >
            Request RFQ
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            style={{ transition: 'background-color 0.15s ease' }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeMenu}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[3px] lg:hidden"
          />

          {/* Drawer */}
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed top-0 right-0 z-[70] h-[100dvh] w-[82%] max-w-sm overflow-y-auto overscroll-contain rounded-l-3xl border-l border-slate-200 dark:border-white/10 bg-white dark:bg-brand-900 px-5 pt-5 pb-8 shadow-2xl lg:hidden"
            style={{ animation: 'fadeIn 0.2s ease forwards' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between gap-3 pb-5 mb-4 border-b border-slate-100 dark:border-white/[0.07]">
              <Link
                to="/"
                onClick={closeMenu}
                aria-label="Elicit Research & Insights Inc. — Home"
                className="flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
              >
                <ElicitLogoMark className="h-10 w-10" />
                <ElicitWordmark compact />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation"
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation links" className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                      isActive
                        ? 'bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-200 dark:border-pink-800/50 font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.05]'
                    }`
                  }
                  style={{ transition: 'background-color 0.15s ease' }}
                >
                  <span>{link.name}</span>
                  <div className="flex items-center gap-2">
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 border border-pink-200 dark:border-pink-800/50">
                        {link.badge}
                      </span>
                    )}
                    {link.hiring && (
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                    {link.hasDropdown && (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </NavLink>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.07] flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] px-3.5 py-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Appearance</span>
                <ThemeToggle showLabel={true} />
              </div>

              <Link
                to="/contact?type=rfq"
                onClick={closeMenu}
                className="btn-primary w-full text-center justify-center py-3"
              >
                Submit Project RFQ
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <p className="text-center text-xs text-slate-400 dark:text-slate-500 break-all">
                <a href={`mailto:${COMPANY.emails.rfq}`} className="text-pink-600 dark:text-pink-400 font-mono hover:underline">
                  {COMPANY.emails.rfq}
                </a>
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
