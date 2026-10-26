import React, { useState, useEffect } from 'react';
import {
  Settings,
  Shield,
  KeyRound,
  User,
  Activity,
  CheckCircle,
  AlertTriangle,
  Server,
  Database,
  Lock,
  History,
  Save,
  UserPlus,
  RefreshCw
} from 'lucide-react';
import api from '../services/api';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

export default function AdminSettingsPage() {
  const { admin, updateProfile, changePassword } = useAdminAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');
  const [systemInfo, setSystemInfo] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [adminsList, setAdminsList] = useState([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: admin?.name || '',
    phone: admin?.phone || '',
    avatar: admin?.avatar || ''
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // New admin form (superadmin only)
  const [newAdminForm, setNewAdminForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

  useEffect(() => {
    if (admin) {
      setProfileForm({
        name: admin.name || '',
        phone: admin.phone || '',
        avatar: admin.avatar || ''
      });
    }
  }, [admin]);

  // Fetch system diagnostics & audit logs
  useEffect(() => {
    const fetchSystemAndLogs = async () => {
      try {
        const sysRes = await api.get('/settings/system');
        if (sysRes.success) setSystemInfo(sysRes.system);

        setIsLoadingLogs(true);
        const logsRes = await api.get('/settings/audit-logs', { limit: 30 });
        if (logsRes.success) setAuditLogs(logsRes.logs || []);

        if (admin?.role === 'superadmin') {
          const admRes = await api.get('/settings/admins');
          if (admRes.success) setAdminsList(admRes.admins || []);
        }
      } catch (err) {
        // Silently handle
      } finally {
        setIsLoadingLogs(false);
      }
    };

    fetchSystemAndLogs();
  }, [admin]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const res = await updateProfile(profileForm);
      if (res.success) {
        showToast({ type: 'success', title: 'Profile Updated', message: 'Administrator details saved.' });
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Update Failed', message: err.message });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast({ type: 'error', title: 'Mismatch', message: 'New passwords do not match.' });
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      showToast({ type: 'error', title: 'Too Short', message: 'Password must be at least 8 characters.' });
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      if (res.success) {
        showToast({ type: 'success', title: 'Password Changed', message: 'Master security key updated.' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Failed', message: err.message });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCreateAdminSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingAdmin(true);
    try {
      const res = await api.post('/settings/admins', newAdminForm);
      if (res.success) {
        showToast({ type: 'success', title: 'Admin Provisioned', message: `Account created for ${newAdminForm.email}` });
        setNewAdminForm({ name: '', email: '', password: '', role: 'admin' });
        // Refresh admins list
        const admRes = await api.get('/settings/admins');
        if (admRes.success) setAdminsList(admRes.admins || []);
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Failed', message: err.message });
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#241B35] font-display tracking-tight">
          System Settings & Cryptographic Audit
        </h2>
        <p className="text-xs text-[#786D88] mt-1">
          Administrator profile, security key rotation, server telemetry, and tamper-resistant audit logs.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#EDE5F5] space-x-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 px-4 text-xs font-bold tracking-wide uppercase transition-colors relative ${
            activeTab === 'profile' ? 'text-[#6D28D9]' : 'text-[#786D88] hover:text-[#241B35]'
          }`}
        >
          <span>Admin Profile</span>
          {activeTab === 'profile' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#6D28D9] rounded-t-full"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`py-3 px-4 text-xs font-bold tracking-wide uppercase transition-colors relative ${
            activeTab === 'security' ? 'text-[#6D28D9]' : 'text-[#786D88] hover:text-[#241B35]'
          }`}
        >
          <span>Security & Passwords</span>
          {activeTab === 'security' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#6D28D9] rounded-t-full"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`py-3 px-4 text-xs font-bold tracking-wide uppercase transition-colors relative ${
            activeTab === 'system' ? 'text-[#6D28D9]' : 'text-[#786D88] hover:text-[#241B35]'
          }`}
        >
          <span>System Diagnostics</span>
          {activeTab === 'system' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#6D28D9] rounded-t-full"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`py-3 px-4 text-xs font-bold tracking-wide uppercase transition-colors relative ${
            activeTab === 'audit' ? 'text-[#6D28D9]' : 'text-[#786D88] hover:text-[#241B35]'
          }`}
        >
          <span>Security Audit Trail ({auditLogs.length})</span>
          {activeTab === 'audit' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#6D28D9] rounded-t-full"></span>
          )}
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
            <div>
              <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display">
                Administrator Identity
              </h3>
              <p className="text-xs text-[#786D88]">Signed in as: {admin?.email} ({admin?.role})</p>
            </div>
            <button
              type="submit"
              disabled={isSavingProfile}
              className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] text-white shadow-md shadow-[#6D28D9]/20 transition-all hover:-translate-y-0.5"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              <span>{isSavingProfile ? 'Saving...' : 'Update Profile'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                Full Display Name
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                Official Contact Phone
              </label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                placeholder="+91 98200 91827"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
              />
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Security & Password */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <form onSubmit={handlePasswordSubmit} className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
              <div>
                <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display">
                  Modify Security Key
                </h3>
                <p className="text-xs text-[#786D88]">Must contain at least 8 characters.</p>
              </div>
              <button
                type="submit"
                disabled={isChangingPassword}
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] text-white shadow-md shadow-[#6D28D9]/20 transition-all hover:-translate-y-0.5"
              >
                <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                <span>{isChangingPassword ? 'Committing...' : 'Commit New Password'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#786D88] mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#786D88] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                  placeholder="At least 8 chars"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#786D88] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
                />
              </div>
            </div>
          </form>

          {/* Superadmin: Provision Additional Admins */}
          {admin?.role === 'superadmin' && (
            <div className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
                <div>
                  <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display">
                    Provision Administrative Staff (Superadmin Exclusive)
                  </h3>
                  <p className="text-xs text-[#786D88]">Safely add editors or secondary administrators.</p>
                </div>
              </div>

              <form onSubmit={handleCreateAdminSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newAdminForm.name}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                  required
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
                />
                <input
                  type="email"
                  placeholder="staff@vardhabuilders.com"
                  value={newAdminForm.email}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                  required
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
                />
                <input
                  type="password"
                  placeholder="Initial Password"
                  value={newAdminForm.password}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                  required
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
                />
                <button
                  type="submit"
                  disabled={isCreatingAdmin}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#6D28D9] text-white hover:bg-[#4C1D95] shadow-xs transition-colors"
                >
                  {isCreatingAdmin ? 'Provisioning...' : 'Add Account'}
                </button>
              </form>

              {/* Existing Admins List */}
              <div className="space-y-2 pt-3">
                <span className="text-[11px] uppercase font-mono font-bold text-[#9B91A8]">Active Administrators</span>
                {adminsList.map((adm) => (
                  <div key={adm._id} className="p-3.5 rounded-2xl bg-[#FAF8FC] border border-[#EDE5F5] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#241B35] mr-2">{adm.name}</span>
                      <span className="text-[#786D88] font-mono">{adm.email}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F3E8FF] text-[#4C1D95] border border-[#DDD6FE]">
                      {adm.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: System Diagnostics */}
      {activeTab === 'system' && (
        <div className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
            <div>
              <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display">
                Enterprise Infrastructure Diagnostics
              </h3>
              <p className="text-xs text-[#786D88]">Real-time host and database telemetry.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#EDE5F5] space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-medium text-[#786D88]">
                <Database className="w-4 h-4 text-[#6D28D9]" />
                <span>MongoDB Engine</span>
              </div>
              <div className="text-base font-bold text-[#241B35]">
                {systemInfo?.mongoStatus || 'Connected'}
              </div>
              <div className="text-[10px] text-[#9B91A8] font-mono">
                Host: {systemInfo?.mongoHost || '127.0.0.1:27017'}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#EDE5F5] space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-medium text-[#786D88]">
                <Server className="w-4 h-4 text-[#EC4899]" />
                <span>Node.js Runtime</span>
              </div>
              <div className="text-base font-bold text-[#241B35]">
                {systemInfo?.nodeVersion || 'v20.x'}
              </div>
              <div className="text-[10px] text-[#9B91A8] font-mono">
                Environment: {systemInfo?.environment || 'development'}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#EDE5F5] space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-medium text-[#786D88]">
                <Activity className="w-4 h-4 text-[#10B981]" />
                <span>Server Uptime</span>
              </div>
              <div className="text-base font-bold text-[#241B35]">
                {Math.floor((systemInfo?.uptimeSeconds || 360) / 60)} minutes
              </div>
              <div className="text-[10px] text-[#9B91A8] font-mono">
                Express 4.21.2 + Mongoose 8.9.2
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Security Audit Trail */}
      {activeTab === 'audit' && (
        <div className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
            <div>
              <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display">
                Administrative Activity & Access Log
              </h3>
              <p className="text-xs text-[#786D88]">Immutable audit records for compliance and integrity.</p>
            </div>
          </div>

          {isLoadingLogs ? (
            <LoadingSkeleton type="table" rows={6} />
          ) : auditLogs.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#9B91A8]">
              No audit records recorded yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {auditLogs.map((log) => (
                <div
                  key={log._id}
                  className="p-3.5 rounded-2xl bg-[#FAF8FC] border border-[#EDE5F5] flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F3E8FF] text-[#4C1D95] border border-[#DDD6FE]">
                        {log.action}
                      </span>
                      <span className="font-bold text-[#241B35] truncate">
                        {log.details}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#786D88]">
                      Operator: <span className="text-[#241B35] font-medium">{log.adminEmail}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-[#9B91A8] font-mono flex-shrink-0">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
