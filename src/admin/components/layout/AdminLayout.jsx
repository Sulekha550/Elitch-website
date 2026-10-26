import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  FolderPlus,
  Inbox,
  MessageSquare,
  Image as ImageIcon,
  Compass,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Bell,
  Clock,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Search,
  Mail
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import api from '../../services/api';

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newLeadsCount, setNewLeadsCount] = useState(0);
  const [newContactCount, setNewContactCount] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [globalSearch, setGlobalSearch] = useState('');

  // Fetch quick metrics for sidebar badges and notification alerts
  useEffect(() => {
    let isMounted = true;
    const fetchBadgeData = async () => {
      try {
        const res = await api.get('/admin/dashboard/stats');
        if (isMounted && res.success && res.stats) {
          setNewLeadsCount(res.stats.leads?.new || 0);
          setNewContactCount(res.stats.contactSubmissions?.new || 0);

          const alerts = [];
          if (res.stats.recentLeads) {
            alerts.push(
              ...res.stats.recentLeads.slice(0, 3).map((l) => ({
                id: l._id,
                title: `CRM Lead: ${l.name}`,
                desc: `${l.inquiryCategory} • ${l.phone}`,
                time: new Date(l.submissionDate || l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                link: '/admin/leads'
              }))
            );
          }
          if (res.stats.recentContactSubmissions) {
            alerts.push(
              ...res.stats.recentContactSubmissions.slice(0, 3).map((c) => ({
                id: c._id,
                title: `Contact Message: ${c.name}`,
                desc: `${c.inquiry || 'Inquiry'} • ${c.email}`,
                time: new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                link: '/admin/contact-messages'
              }))
            );
          }
          setNotifications(alerts);
        }
      } catch (err) {
        // Silently handle in background
      }
    };

    fetchBadgeData();
    const interval = setInterval(fetchBadgeData, 45000); // refresh periodically
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Real-time clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  const navItems = [
    {
      name: 'Leads & Inquiries',
      path: '/admin/leads',
      icon: Inbox,
      badge: newLeadsCount > 0 ? newLeadsCount : null
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleGlobalSearchSubmit = (e) => {
    e.preventDefault();
    if (!globalSearch.trim()) return;
    navigate(`/admin/projects?search=${encodeURIComponent(globalSearch.trim())}`);
  };

  const getPageTitle = () => {
    const p = location.pathname;
    if (p === '/admin') return 'Dashboard Overview';
    if (p === '/admin/projects') return 'Research Projects';
    if (p === '/admin/projects/new') return 'New Research Project';
    if (p.includes('/edit')) return 'Edit Research Project';
    if (p === '/admin/leads') return 'Leads & CRM Inquiries';
    if (p === '/admin/contact-messages') return 'Contact Messages';
    if (p === '/admin/notifications') return 'Email Notifications & Resend';
    if (p === '/admin/gallery') return 'Visual Gallery Assets';
    if (p === '/admin/floor-plans') return 'Floor Plans & Blueprints';
    if (p === '/admin/content') return 'Website Content Management';
    if (p === '/admin/analytics') return 'Research Analytics Dashboard';
    if (p === '/admin/settings') return 'Settings & Security Audit';
    return 'Admin Console';
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#241B35] flex overflow-x-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-[#1D0835]/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar - Royal Purple Gradient with Vibrant Pink Highlights */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-gradient-to-b from-[#21093A] via-[#1A072E] to-[#120321] border-r border-[#3D1463] shadow-[4px_0_24px_rgba(33,9,58,0.35)] transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Brand Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-[#3D1463] bg-[#17052A]">
          <NavLink to="/admin" className="flex items-center space-x-3 group">
            {/* Vardha Monogram with Vibrant Pink & Purple Gradient */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4899] via-[#D946EF] to-[#8B5CF6] border border-pink-400/40 flex items-center justify-center shadow-md shadow-[#EC4899]/30 group-hover:scale-105 transition-transform">
              <span className="font-sans font-black text-sm text-white tracking-wider drop-shadow-xs">
                ER
              </span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider uppercase text-white font-display">
                  Elicit Research
                </span>
                <span className="text-[9px] tracking-widest uppercase font-bold text-[#F472B6] font-mono">
                  & Insights Inc.
                </span>
              </div>
            )}
          </NavLink>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-xl text-[#C4B5FD] hover:text-[#F472B6] hover:bg-white/[0.08]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-5 space-y-1 overflow-y-auto vardha-admin-scrollbar">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#A78BFA]/80">
              Research Platform Management
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative flex items-center px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#A855F7]/25 to-[#EC4899]/20 text-white font-bold border border-[#EC4899]/40 shadow-xs'
                    : 'text-[#C4B5FD] hover:text-white hover:bg-white/[0.06]'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-gradient-to-b from-[#EC4899] to-[#A855F7]"></span>
                )}
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isActive ? 'text-[#F472B6]' : 'text-[#A78BFA] group-hover:text-[#F472B6]'
                  } ${!isCollapsed ? 'mr-3' : 'mx-auto'}`}
                />

                {!isCollapsed && (
                  <span className="flex-1 truncate tracking-wide">{item.name}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white shadow-xs">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#3D1463] space-y-1.5 bg-[#140324]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3.5 py-2 rounded-xl text-xs font-semibold text-[#C4B5FD] hover:text-[#F472B6] hover:bg-white/[0.06] transition-all group"
          >
            <ExternalLink className="w-4 h-4 mr-3 flex-shrink-0 text-[#A78BFA] group-hover:text-[#F472B6] transition-colors" />
            {!isCollapsed && <span>View Public Portal</span>}
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3.5 py-2 rounded-xl text-xs font-bold text-rose-300 hover:text-rose-200 hover:bg-rose-500/15 transition-all"
          >
            <LogOut className="w-4 h-4 mr-3 flex-shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Navigation Bar - Clean Purple & Pink Accented Header */}
        <header className="h-20 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-[#EDE5F5] shadow-[0_2px_12px_rgba(109,40,217,0.03)]">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#786D88] hover:text-[#241B35] hover:bg-[#F3EEFF] transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 rounded-xl text-[#786D88] hover:text-[#241B35] hover:bg-[#F3EEFF] transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title */}
            <div>
              <div className="flex items-center space-x-1.5 text-xs text-[#786D88]">
                <span>Admin Console</span>
                <ChevronRight className="w-3 h-3 text-[#EC4899]" />
                <span className="text-[#6D28D9] font-semibold">{getPageTitle()}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-[#241B35] tracking-tight font-display mt-0.5">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Center Global Search (desktop) */}
          <form
            onSubmit={handleGlobalSearchSubmit}
            className="hidden xl:flex items-center relative w-80"
          >
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B91A8]" />
            <input
              type="text"
              placeholder="Search projects by keyword..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#EDE5F5] bg-[#FAF8FD] text-[#241B35] placeholder-[#9B91A8] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/15 focus:border-[#6D28D9] transition-all"
            />
          </form>

          {/* Right Header Utilities */}
          <div className="flex items-center space-x-3 sm:space-x-4">


            {/* Notification Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-[#786D88] hover:text-[#241B35] hover:bg-[#F3EEFF] transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {(newLeadsCount > 0 || newContactCount > 0) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 p-4 rounded-2xl bg-white border border-[#EDE5F5] shadow-[0_20px_45px_rgba(109,40,217,0.12)] z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5] mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#241B35]">
                      Inquiry Alerts
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDF2F8] text-[#DB2777] font-bold border border-[#FBCFE8]">
                      {newLeadsCount + newContactCount} New
                    </span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto vardha-admin-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setShowNotifications(false);
                            navigate(n.link || '/admin/leads');
                          }}
                          className="p-2.5 rounded-xl bg-[#FAF8FD] hover:bg-[#F3EEFF] border border-[#EDE5F5] cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[#241B35] truncate">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-[#9B91A8] font-mono">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#786D88] truncate">{n.desc}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-xs text-[#9B91A8]">
                        No pending unread alerts.
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#EDE5F5] flex justify-between text-xs">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/admin/leads');
                      }}
                      className="font-bold text-[#6D28D9] hover:text-[#EC4899] hover:underline"
                    >
                      CRM Leads →
                    </button>
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/admin/contact-messages');
                      }}
                      className="font-bold text-[#6D28D9] hover:text-[#EC4899] hover:underline"
                    >
                      Contact Messages →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Chip with Pink & Purple Medallion */}
            <div className="flex items-center space-x-3 pl-3 border-l border-[#EDE5F5]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EC4899] via-[#D946EF] to-[#8B5CF6] text-white font-serif font-black text-xs flex items-center justify-center shadow-md shadow-[#EC4899]/25 border border-pink-300/40">
                {admin?.name ? admin.name.charAt(0).toUpperCase() : 'E'}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#241B35] leading-none">
                  {admin?.name || 'Elicit Admin'}
                </span>
                <span className="text-[10px] text-[#EC4899] font-bold uppercase tracking-wider mt-1">
                  {admin?.role || 'Superadmin'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Main View Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
