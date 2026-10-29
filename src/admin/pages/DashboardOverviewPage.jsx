import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Clock,
  CheckCircle,
  Inbox,
  AlertCircle,
  TrendingUp,
  FolderPlus,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  RefreshCw,
  Mail,
  Compass,
  Image as ImageIcon
} from 'lucide-react';
import api from '../services/api';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

export default function DashboardOverviewPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get('/admin/dashboard/stats');
      if (res.success && res.stats) {
        setStats(res.stats);
      } else {
        throw new Error(res.message || 'Failed to load statistics.');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard metrics.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <LoadingSkeleton type="cards" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LoadingSkeleton type="table" rows={4} />
          </div>
          <div>
            <LoadingSkeleton type="table" rows={4} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-3">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="w-6 h-6 text-rose-600" />
          <h3 className="text-base font-bold text-rose-900">Database Metric Connection Error</h3>
        </div>
        <p className="text-xs text-rose-800">{error}</p>
        <p className="text-xs text-[#786D88]">
          Please verify that the Express backend is running on port 5000 and MongoDB Atlas connection is healthy.
        </p>
        <button
          onClick={fetchDashboard}
          className="px-4 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-semibold hover:bg-[#4C1D95] transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const projects = stats?.projects || { total: 0, ongoing: 0, upcoming: 0, completed: 0, active: 0 };
  const leads = stats?.leads || { total: 0, new: 0, followUp: 0, closed: 0 };
  const contactSubmissions = stats?.contactSubmissions || { total: 0, new: 0, pending: 0 };
  const trendData = stats?.trendData || [];
  const maxTrend = Math.max(...trendData.map((t) => t.inquiries), 4);

  // Active projects count = ongoing + upcoming
  const activeProjectsCount = projects.active !== undefined ? projects.active : (projects.ongoing + projects.upcoming);
  // Pending inquiries count = new leads + new contact submissions
  const pendingInquiriesCount = (leads.new || 0) + (contactSubmissions.new || 0);

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FDF2F8] via-white to-[#FCE7F3]/70 border border-[#FCE7F3] shadow-[0_4px_25px_rgba(236,72,153,0.06)]">
        {/* Subtle decorative pink ambient glows */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#EC4899]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#F43F5E]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#FCE7F3] text-xs font-bold text-[#EC4899] uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>Elicit Research Command Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#241B35] font-display">
            Architectural Operations & Client Telemetry
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#786D88] leading-relaxed">
            Real-time overview of active research projects, client inquiry pipeline, panel metrics, and operational performance.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#DB2777] hover:from-[#DB2777] hover:to-[#BE185D] text-white text-xs font-bold shadow-md shadow-[#EC4899]/30 hover:shadow-lg transition-all"
          >
            <FolderPlus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
          <Link
            to="/admin/contact-messages"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[#FCE7F3] bg-white hover:bg-[#FDF2F8] text-xs font-bold text-[#EC4899] transition-all shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-[#EC4899]" />
            <span>Messages ({contactSubmissions.total || 0})</span>
          </Link>
          <button
            onClick={fetchDashboard}
            className="p-2.5 rounded-xl border border-[#FCE7F3] bg-white hover:bg-[#FDF2F8] text-[#786D88] hover:text-[#EC4899] transition-all shadow-xs"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Required Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Total Projects */}
        <StatCard
          title="Total Projects"
          value={projects.total}
          sublabel="All residential & villa portfolios"
          icon={Building2}
          accentColor="pink"
          onClick={() => navigate('/admin/projects')}
        />

        {/* 2. Active Projects */}
        <StatCard
          title="Active Projects"
          value={activeProjectsCount}
          sublabel={`${projects.ongoing} ongoing, ${projects.upcoming} upcoming`}
          icon={Layers}
          accentColor="pink"
          trend="+12%"
          trendPositive={true}
          onClick={() => navigate('/admin/projects?status=Ongoing')}
        />

        {/* 3. Completed Projects */}
        <StatCard
          title="Completed Projects"
          value={projects.completed}
          sublabel="Delivered luxury landmarks"
          icon={CheckCircle}
          accentColor="pink"
          trend="100% on-time"
          trendPositive={true}
          onClick={() => navigate('/admin/projects?status=Completed')}
        />

        {/* 4. New Leads */}
        <StatCard
          title="New Leads"
          value={leads.new}
          sublabel={`${leads.total} total leads in database`}
          icon={Inbox}
          accentColor="pink"
          trend="+8 this week"
          trendPositive={true}
          onClick={() => navigate('/admin/leads?status=New')}
        />

        {/* 5. Pending Inquiries */}
        <StatCard
          title="Pending Inquiries"
          value={pendingInquiriesCount}
          sublabel={`${contactSubmissions.total} total customer inquiries`}
          icon={MessageSquare}
          accentColor="pink"
          onClick={() => navigate('/admin/contact-messages?status=new')}
        />
      </div>

      {/* Secondary Metrics / Quick Assets Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => navigate('/admin/gallery')}
          className="p-4 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs hover:border-[#DDD6FE] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#6D28D9] flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#786D88] font-medium">Gallery Assets</span>
              <div className="text-base font-bold text-[#241B35] font-display">
                {stats?.assets?.galleryCount || 0} Images
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#786D88] group-hover:text-[#6D28D9] group-hover:translate-x-0.5 transition-all" />
        </div>

        <div
          onClick={() => navigate('/admin/floor-plans')}
          className="p-4 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs hover:border-[#DDD6FE] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#6D28D9] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#786D88] font-medium">Floor Plans</span>
              <div className="text-base font-bold text-[#241B35] font-display">
                {stats?.assets?.floorPlanCount || 0} Blueprints
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#786D88] group-hover:text-[#6D28D9] group-hover:translate-x-0.5 transition-all" />
        </div>

        <div
          onClick={() => navigate('/admin/notifications')}
          className="p-4 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs hover:border-[#FBCFE8] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCE7F3] text-[#EC4899] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#786D88] font-medium">Transactional Routing</span>
              <div className="text-base font-bold text-[#241B35] font-display">
                Resend Pipeline
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#786D88] group-hover:text-[#EC4899] group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>

      {/* Main Grid: Recent Projects + Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Landmark Projects Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-[#EDE5F5] shadow-[0_2px_15px_rgba(109,40,217,0.03)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-[#6D28D9]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#241B35]">
                Landmark Architectural Projects
              </h3>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-[#6D28D9] hover:text-[#4C1D95] flex items-center space-x-1"
            >
              <span>View All ({projects.total})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentProjects && stats.recentProjects.length > 0 ? (
              stats.recentProjects.map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/admin/projects/${p._id}/edit`)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8FC] hover:bg-[#F3E8FF]/60 border border-[#EDE5F5] cursor-pointer transition-all group"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EDE5F5] flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#241B35] truncate group-hover:text-[#6D28D9] transition-colors">
                        {p.title}
                      </h4>
                      <div className="text-[11px] text-[#786D88] flex items-center space-x-2 mt-0.5 truncate">
                        <span>{p.location}</span>
                        <span>•</span>
                        <span className="font-semibold text-[#6D28D9]">{p.priceRange || 'Price on Request'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0 ml-2">
                    <StatusBadge status={p.status} />
                    <ChevronRight className="w-4 h-4 text-[#786D88] group-hover:text-[#6D28D9] transition-colors" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-xs text-[#786D88]">
                No projects found in database. Click "New Project" to create one.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Monthly Inquiries Trend + Quick Submissions */}
        <div className="p-6 rounded-3xl bg-white border border-[#EDE5F5] shadow-[0_2px_15px_rgba(109,40,217,0.03)] space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5] mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-[#EC4899]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#241B35]">
                  6-Month Inquiries Trend
                </h3>
              </div>
            </div>

            {/* Custom Bar Graph */}
            <div className="space-y-3 pt-2">
              {trendData.map((t, idx) => {
                const pct = Math.max(8, Math.round((t.inquiries / maxTrend) * 100));
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#786D88]">
                      <span>{t.label}</span>
                      <span className="font-mono font-bold text-[#241B35]">{t.inquiries} inquiries</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#FAF8FC] border border-[#EDE5F5] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick status summary */}
          <div className="p-4 rounded-2xl bg-[#F3E8FF]/60 border border-[#DDD6FE] space-y-2 text-xs">
            <span className="font-bold text-[#6D28D9] uppercase tracking-wider text-[10px] block">
              Inquiry Processing Health
            </span>
            <div className="flex justify-between text-[#786D88]">
              <span>CRM Leads Closed:</span>
              <strong className="text-[#241B35]">{leads.closed}</strong>
            </div>
            <div className="flex justify-between text-[#786D88]">
              <span>Follow-ups Pending:</span>
              <strong className="text-[#EC4899]">{leads.followUp}</strong>
            </div>
            <div className="flex justify-between text-[#786D88]">
              <span>Direct Inquiries:</span>
              <strong className="text-[#6D28D9]">{contactSubmissions.total}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Inquiries & Submissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent CRM Leads */}
        <div className="p-6 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
            <div className="flex items-center space-x-2">
              <Inbox className="w-4 h-4 text-[#6D28D9]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#241B35]">
                Recent High-Priority Leads
              </h3>
            </div>
            <Link
              to="/admin/leads"
              className="text-xs font-semibold text-[#6D28D9] hover:underline"
            >
              All Leads →
            </Link>
          </div>

          <div className="space-y-2.5">
            {stats?.recentLeads && stats.recentLeads.length > 0 ? (
              stats.recentLeads.slice(0, 4).map((l) => (
                <div
                  key={l._id}
                  onClick={() => navigate('/admin/leads')}
                  className="p-3 rounded-xl bg-[#FAF8FC] hover:bg-[#F3E8FF]/50 border border-[#EDE5F5] cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#241B35]">{l.name}</div>
                    <div className="text-[11px] text-[#786D88]">
                      {l.inquiryCategory} • {l.phone}
                    </div>
                  </div>
                  <StatusBadge status={l.status} />
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-[#786D88]">No leads recorded yet.</div>
            )}
          </div>
        </div>

        {/* Recent Contact Messages */}
        <div className="p-6 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-[#EC4899]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#241B35]">
                Recent Contact Submissions
              </h3>
            </div>
            <Link
              to="/admin/contact-messages"
              className="text-xs font-semibold text-[#EC4899] hover:underline"
            >
              All Messages →
            </Link>
          </div>

          <div className="space-y-2.5">
            {stats?.recentContactSubmissions && stats.recentContactSubmissions.length > 0 ? (
              stats.recentContactSubmissions.slice(0, 4).map((c) => (
                <div
                  key={c._id}
                  onClick={() => navigate('/admin/contact-messages')}
                  className="p-3 rounded-xl bg-[#FAF8FC] hover:bg-[#FCE7F3]/40 border border-[#EDE5F5] cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold text-[#241B35] truncate">{c.name}</div>
                    <div className="text-[11px] text-[#786D88] truncate">
                      {c.inquiry || 'Inquiry'} • {c.email}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold capitalize bg-[#F3E8FF] text-[#6D28D9] border border-[#DDD6FE]">
                    {c.status || 'new'}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-[#786D88]">No contact messages recorded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

