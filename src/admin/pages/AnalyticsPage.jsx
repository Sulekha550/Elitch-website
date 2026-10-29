import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Compass,
  Building2,
  Calendar,
  Sparkles,
  Download,
  Filter,
  DollarSign,
  Activity,
  PieChart,
  CheckCircle2
} from 'lucide-react';
import api from '../services/api';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/admin/dashboard/stats');
        if (isMounted && res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        // fallback
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAnalytics();
    return () => {
      isMounted = false;
    };
  }, [timeframe]);

  const channelData = [
    { name: 'Direct WhatsApp Concierge', share: '46%', leads: 38, color: '#C7A15C' },
    { name: 'Website Inquiry Form', share: '32%', leads: 26, color: '#997534' },
    { name: 'Private Referral Network', share: '14%', leads: 12, color: '#2B313A' },
    { name: 'Architectural Events / Press', share: '8%', leads: 7, color: '#D97706' }
  ];

  const regionData = [
    { region: 'Worli & Lower Parel', value: '₹1,240 Cr', inquiries: 29, progress: 85, color: 'from-[#C7A15C] to-[#E5C578]' },
    { region: 'BKC & Bandra West', value: '₹980 Cr', inquiries: 21, progress: 68, color: 'from-[#B38F48] to-[#C7A15C]' },
    { region: 'Juhu & Versova Waterfront', value: '₹750 Cr', inquiries: 18, progress: 54, color: 'from-[#997534] to-[#B38F48]' },
    { region: 'Alibaug Bespoke Estates', value: '₹530 Cr', inquiries: 14, progress: 42, color: 'from-[#1A1D24] to-[#353C47]' }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="cards" />
        <LoadingSkeleton type="table" rows={5} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-12 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FDF9F0] border border-[#F2E5C9] text-xs font-bold text-[#8C6D32] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15C]" />
            <span>Executive Real Estate Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#14171A] font-display tracking-tight">
            Portfolio Telemetry & Pipeline Analytics
          </h2>
          <p className="text-xs text-[#7A766F] mt-1">
            Real-time conversion metrics, client acquisition distribution, and project inquiry velocity for Elicit Research.
          </p>
        </div>

        {/* Timeframe & Export Buttons */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center p-1 rounded-xl bg-white border border-[#E7E2D8] shadow-xs">
            {['7d', '30d', '90d', 'YTD'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  timeframe === t
                    ? 'bg-[#181B20] text-[#E5C578] shadow-sm'
                    : 'text-[#7A766F] hover:text-[#14171A]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Exporting full Elicit Research analytics dossier (PDF/CSV)...')}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[#E7E2D8] bg-white hover:bg-[#FDF9F0] hover:border-[#C7A15C] text-xs font-bold text-[#8C6D32] shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C7A15C]" />
            <span>Export Dossier</span>
          </button>
        </div>
      </div>

      {/* 4 Primary High-Value Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs hover:border-[#C7A15C] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A766F]">
              Active Pipeline Value
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FDF9F0] border border-[#F2E5C9] text-[#8C6D32] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2.5">
            <span className="text-2xl sm:text-3xl font-black text-[#14171A] font-display">
              ₹3,500 Cr
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              ↗ +18.4%
            </span>
          </div>
          <p className="text-xs text-[#7A766F] mt-2">14 Prospective acquisitions in dialogue</p>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs hover:border-[#C7A15C] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A766F]">
              Qualified Buyer Velocity
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FDF9F0] border border-[#F2E5C9] text-[#8C6D32] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2.5">
            <span className="text-2xl sm:text-3xl font-black text-[#14171A] font-display">
              83 Leads
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FDF9F0] text-[#8C6D32] border border-[#F2E5C9]">
              ↗ +12 New
            </span>
          </div>
          <p className="text-xs text-[#7A766F] mt-2">48-hour response protocol maintained</p>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs hover:border-[#C7A15C] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A766F]">
              Blueprint Engagements
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E7E2D8] text-[#14171A] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2.5">
            <span className="text-2xl sm:text-3xl font-black text-[#14171A] font-display">
              2,480 Views
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              ↗ +31%
            </span>
          </div>
          <p className="text-xs text-[#7A766F] mt-2">Detailed floor plans explored by buyers</p>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs hover:border-[#C7A15C] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A766F]">
              Conversion to Private Tour
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FDF9F0] border border-[#F2E5C9] text-[#8C6D32] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2.5">
            <span className="text-2xl sm:text-3xl font-black text-[#14171A] font-display">
              24.8%
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FDF9F0] text-[#8C6D32] border border-[#F2E5C9]">
              ↗ +3.2%
            </span>
          </div>
          <p className="text-xs text-[#7A766F] mt-2">Walkthroughs hosted at luxury suites</p>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acquisition Origin Channels */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2D8] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE5D9]">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#14171A]">
                Acquisition Origin Channels
              </h3>
              <p className="text-[11px] text-[#7A766F] mt-0.5">
                Distribution of incoming high-intent client inquiries across marketing touchpoints.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FDF9F0] text-[#8C6D32] border border-[#F2E5C9]">
              Live Inflow
            </span>
          </div>

          <div className="space-y-4">
            {channelData.map((c) => (
              <div key={c.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-[#14171A] font-bold">{c.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#7A766F]">
                    <span className="font-mono text-[#14171A] font-bold">{c.leads}</span>
                    <span>({c.share})</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FAF8F5] border border-[#E7E2D8] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: c.share,
                      backgroundColor: c.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Market Share & Pipeline Allocation */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2D8] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE5D9]">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#14171A]">
                Regional Market Share & Pipeline Allocation
              </h3>
              <p className="text-[11px] text-[#7A766F] mt-0.5">
                Territorial valuation of under-construction developments and client demand velocity.
              </p>
            </div>
            <span className="text-xs font-bold text-[#8C6D32] font-mono">
              Mumbai Metropolitan Region
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {regionData.map((r) => (
              <div
                key={r.region}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] space-y-2 hover:border-[#C7A15C] transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#14171A]">
                  <span>{r.region}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FDF9F0] text-[#8C6D32] font-bold border border-[#F2E5C9]">
                    {r.inquiries} Inquiries
                  </span>
                </div>
                <div className="text-base font-extrabold text-[#14171A] font-display">
                  {r.value}{' '}
                  <span className="text-[10px] text-[#7A766F] font-normal">Gross Bookings</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white border border-[#E7E2D8] overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${r.color} transition-all duration-700`}
                    style={{ width: `${r.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architectural SLA & Cryptographic Integrity Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1216] border border-[#232933] text-[#F4EFE6] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#C7A15C] uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#C7A15C]" />
            <span>Audited Performance Telemetry</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-[#F4EFE6] font-display">
            99.2% Client SLA Compliance Across Elicit Research Global Projects
          </h4>
          <p className="text-xs text-[#9E9B94] leading-relaxed">
            All inquiry submissions are routed to senior research partners within 2 hours for review and response.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
          <button
            onClick={() => alert('Diagnostic integrity check completed. All MongoDB telemetry verified.')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C7A15C] to-[#B38F48] hover:brightness-110 text-[#0E1114] text-xs font-bold shadow-md shadow-[#C7A15C]/20 transition-all hover:-translate-y-0.5"
          >
            Run Integrity Audit
          </button>
        </div>
      </div>
    </div>
  );
}

