import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Server,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Code2,
  KeyRound
} from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export default function EmailNotificationsPage() {
  const { showToast } = useToast();
  const [configStatus, setConfigStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Test email state
  const [testEmail, setTestEmail] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);

  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/notifications/status');
      if (res.success) {
        setConfigStatus(res);
        setTestEmail(res.adminRecipient || '');
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Query Failed',
        message: err.message || 'Failed to retrieve notification status.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSendTestNotification = async (e) => {
    e.preventDefault();
    if (!testEmail) return;

    setIsSendingTest(true);
    try {
      // Simulate/trigger test inquiry to verify pipeline
      const res = await api.post('/leads/submit', {
        name: 'Elicit System Diagnostic',
        email: testEmail,
        phone: '+91 99999 00000',
        inquiryCategory: 'General Inquiry',
        message: 'This is an automated test inquiry dispatched from the Elicit Research Admin Console to verify transactional email alerts and database integration.'
      });

      if (res.success) {
        showToast({
          type: 'success',
          title: 'Notification Dispatched',
          message: configStatus?.configured
            ? 'Test inquiry created and routed to Resend transactional service.'
            : 'Test inquiry saved to MongoDB. Note: Set RESEND_API_KEY in backend/.env for inbox delivery.'
        });
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Dispatch Failed',
        message: err.message || 'Failed to dispatch test notification.'
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F3E8FF] border border-[#DDD6FE] text-xs font-bold text-[#6D28D9] uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>Transactional Routing</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#241B35] font-display">
            Email Notifications & Resend Configuration
          </h1>
          <p className="text-xs sm:text-sm text-[#786D88] mt-1">
            Configure automated transactional email dispatch when customers submit inquiry dossiers or RFQ requests.
          </p>
        </div>

        <button
          onClick={fetchStatus}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[#EDE5F5] bg-[#FAF8FC] hover:bg-[#F3E8FF] text-xs font-semibold text-[#6D28D9] transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Check Status</span>
        </button>
      </div>

      {/* Status Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  configStatus?.configured
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-[#FCE7F3] text-[#EC4899]'
                }`}
              >
                {configStatus?.configured ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#241B35]">Resend API Service</h3>
                <span className="text-xs text-[#786D88] font-mono">
                  {configStatus?.provider || 'Checking...'}
                </span>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                configStatus?.configured
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-[#FCE7F3] text-[#EC4899]'
              }`}
            >
              {configStatus?.configured ? 'Active' : 'Unconfigured'}
            </span>
          </div>

          <p className="text-xs text-[#786D88] leading-relaxed">
            {configStatus?.configured
              ? 'Resend API is connected. Whenever a lead or contact inquiry is submitted, an immediate HTML notification is sent to the administrator address.'
              : 'Resend API key is currently unset in the server environment. Inquiries will continue to be safely stored in MongoDB without server errors or downtime.'}
          </p>

          <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#EDE5F5] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#786D88]">Admin Recipient:</span>
              <span className="font-semibold text-[#241B35] font-mono">
                {configStatus?.adminRecipient || 'admin@vardhabuilders.com'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#786D88]">Failover Safety:</span>
              <span className="font-semibold text-emerald-600">
                Safe Fallback (No 500 crashes)
              </span>
            </div>
          </div>
        </div>

        {/* Dispatch Test Form */}
        <div className="p-6 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#6D28D9] flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#241B35]">Trigger Test Notification</h3>
              <span className="text-xs text-[#786D88]">Verify inquiry pipeline and email dispatch</span>
            </div>
          </div>

          <form onSubmit={handleSendTestNotification} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#241B35] mb-1">
                Recipient Email
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="admin@vardhabuilders.com"
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#EDE5F5] bg-[#FAF8FC] text-[#241B35] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingTest}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white text-xs font-semibold hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSendingTest ? 'Dispatching Test...' : 'Send Test Inquiry'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Configuration Guide */}
      <div className="p-6 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
          <KeyRound className="w-4 h-4 text-[#EC4899]" />
          <span>Setting Up Resend API Keys (Production Step)</span>
        </div>

        <div className="space-y-3 text-xs text-[#786D88] leading-relaxed">
          <p>
            To enable direct transactional inbox delivery through Resend:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 font-medium text-[#241B35]">
            <li>
              Sign up or log in at{' '}
              <a
                href="https://resend.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#6D28D9] hover:underline font-bold inline-flex items-center gap-1"
              >
                resend.com <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>Generate an API Key with "Sending access".</li>
            <li>
              Open <code className="px-1.5 py-0.5 rounded bg-[#F3E8FF] text-[#6D28D9] font-mono">backend/.env</code> and set:
              <pre className="p-3 my-2 rounded-xl bg-[#241B35] text-purple-200 font-mono text-[11px] overflow-x-auto">
                RESEND_API_KEY=re_123456789_abcdef
              </pre>
            </li>
            <li>Restart backend server. The notification engine will automatically detect and route emails.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

