import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  User,
  AlertCircle,
  Eye,
  RefreshCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import api from '../services/api';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { useToast } from '../context/ToastContext';

export default function ContactMessagesPage() {
  const { showToast } = useToast();

  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Selected Inquiry Drawer / Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInquiries = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        sort: '-createdAt'
      };
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'All') params.status = statusFilter;

      const res = await api.get('/contact/submissions', params);
      if (res.success) {
        setInquiries(res.inquiries || []);
        setTotalCount(res.total || 0);
        setTotalPages(res.totalPages || 1);

        if (selectedInquiry) {
          const fresh = (res.inquiries || []).find((i) => i._id === selectedInquiry._id);
          if (fresh) setSelectedInquiry(fresh);
        }
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Query Error',
        message: err.message || 'Failed to fetch contact inquiries.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, showToast, selectedInquiry]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      setIsUpdatingStatus(true);
      const res = await api.patch(`/contact/submissions/${inquiryId}/status`, { status: newStatus });
      if (res.success) {
        showToast({
          type: 'success',
          title: 'Status Updated',
          message: `Inquiry status updated to ${newStatus}.`
        });
        setInquiries((prev) =>
          prev.map((i) => (i._id === inquiryId ? { ...i, status: newStatus } : i))
        );
        if (selectedInquiry && selectedInquiry._id === inquiryId) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Update Error',
        message: err.message || 'Failed to update status.'
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = (inquiry) => {
    setInquiryToDelete(inquiry);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!inquiryToDelete) return;
    setIsDeleting(true);
    try {
      const res = await api.delete(`/contact/submissions/${inquiryToDelete._id}`);
      if (res.success) {
        showToast({
          type: 'success',
          title: 'Inquiry Removed',
          message: 'Contact inquiry deleted successfully.'
        });
        setDeleteModalOpen(false);
        setInquiryToDelete(null);
        if (selectedInquiry?._id === inquiryToDelete._id) setSelectedInquiry(null);
        fetchInquiries();
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Delete Failed',
        message: err.message || 'Failed to delete inquiry.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const newCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F3E8FF] border border-[#DDD6FE] text-xs font-bold text-[#6D28D9] uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>MongoDB Inquiries</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#241B35] font-display">
            Contact Submissions & Messages
          </h1>
          <p className="text-xs sm:text-sm text-[#786D88] mt-1">
            Real customer contact messages and enterprise RFQ inquiries stored in the MongoDB database.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchInquiries()}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[#EDE5F5] bg-[#FAF8FC] hover:bg-[#F3E8FF] text-xs font-semibold text-[#6D28D9] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#786D88]">
              Total Messages
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F3E8FF] text-[#6D28D9] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#241B35] mt-2 font-display">{totalCount}</div>
          <div className="text-[11px] text-[#786D88] mt-1">Direct inquiries in database</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#786D88]">
              New / Unread
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FCE7F3] text-[#EC4899] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#EC4899] mt-2 font-display">{newCount}</div>
          <div className="text-[11px] text-[#786D88] mt-1">Awaiting client response</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#786D88]">
              System Status
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-bold text-emerald-700 mt-2 font-display flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>MongoDB Active</span>
          </div>
          <div className="text-[11px] text-[#786D88] mt-1">Live synchronized storage</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786D88]" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or message..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#EDE5F5] bg-[#FAF8FC] text-[#241B35] placeholder-[#786D88] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['All', 'new', 'in_progress', 'responded', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize transition-all ${
                statusFilter === status
                  ? 'bg-[#6D28D9] text-white shadow-xs'
                  : 'bg-[#FAF8FC] text-[#786D88] hover:bg-[#F3E8FF] hover:text-[#6D28D9] border border-[#EDE5F5]'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table / List Container */}
      <div className="bg-white rounded-2xl border border-[#EDE5F5] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <LoadingSkeleton type="table" rows={6} />
          </div>
        ) : inquiries.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No contact submissions found"
            description={
              searchTerm || statusFilter !== 'All'
                ? 'Try adjusting your search criteria or resetting filters.'
                : 'Customer inquiries submitted via the website contact form will appear here.'
            }
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setCurrentPage(1);
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EDE5F5] bg-[#FAF8FC] text-[11px] font-bold uppercase tracking-wider text-[#786D88]">
                  <th className="py-3.5 px-4 sm:px-6">Customer & Contact</th>
                  <th className="py-3.5 px-4">Inquiry Scope</th>
                  <th className="py-3.5 px-4">Message Snippet</th>
                  <th className="py-3.5 px-4">Received Date</th>
                  <th className="py-3.5 px-4">Processing Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE5F5] text-xs">
                {inquiries.map((inq) => {
                  const isNew = inq.status === 'new';

                  return (
                    <tr
                      key={inq._id}
                      className={`hover:bg-[#FAF8FC] transition-colors ${
                        isNew ? 'bg-[#FCE7F3]/15' : ''
                      }`}
                    >
                      {/* Name & Contact */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#EC4899] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                            {inq.name ? inq.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-[#241B35] flex items-center gap-2">
                              <span>{inq.name}</span>
                              {isNew && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#EC4899] text-white">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#786D88] flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[#6D28D9]" />
                                {inq.email}
                              </span>
                              {inq.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-[#EC4899]" />
                                  {inq.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Inquiry Type */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F3E8FF] text-[#6D28D9] font-medium text-[11px]">
                          <Tag className="w-3 h-3 text-[#6D28D9]" />
                          {inq.inquiry || 'General Inquiry'}
                        </span>
                      </td>

                      {/* Message Snippet */}
                      <td className="py-4 px-4 max-w-xs">
                        <p className="text-[#241B35] truncate text-xs" title={inq.message}>
                          {inq.message || '—'}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-[#786D88] text-[11px] font-mono whitespace-nowrap">
                        {inq.createdAt
                          ? new Date(inq.createdAt).toLocaleDateString([], {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : '—'}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <select
                          value={inq.status || 'new'}
                          onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                          className="text-xs rounded-lg border border-[#EDE5F5] bg-white px-2.5 py-1 font-semibold text-[#241B35] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20"
                        >
                          <option value="new">New (Unread)</option>
                          <option value="in_progress">In Progress</option>
                          <option value="responded">Responded</option>
                          <option value="closed">Closed / Archived</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-1">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1.5 rounded-lg text-[#6D28D9] hover:bg-[#F3E8FF] transition-colors"
                          title="Inspect Inquiry"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {!isLoading && totalPages > 1 && (
          <div className="p-4 border-t border-[#EDE5F5] flex items-center justify-between bg-[#FAF8FC] text-xs">
            <span className="text-[#786D88]">
              Showing page <strong className="text-[#241B35]">{currentPage}</strong> of{' '}
              <strong className="text-[#241B35]">{totalPages}</strong> ({totalCount} total)
            </span>
            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-[#EDE5F5] bg-white text-[#241B35] hover:bg-[#F3E8FF] disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-[#EDE5F5] bg-white text-[#241B35] hover:bg-[#F3E8FF] disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241B35]/40 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-[#EDE5F5] shadow-2xl p-6 sm:p-8 space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE5F5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EC4899]">
                  Inquiry Dossier
                </span>
                <h3 className="text-lg font-bold text-[#241B35] font-display mt-0.5">
                  {selectedInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-xl text-[#786D88] hover:bg-[#F3E8FF] hover:text-[#6D28D9]"
              >
                ✕
              </button>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF8FC] border border-[#EDE5F5] text-xs">
              <div>
                <span className="text-[#786D88] text-[11px]">Email Address</span>
                <div className="font-semibold text-[#241B35] select-all">{selectedInquiry.email}</div>
              </div>
              <div>
                <span className="text-[#786D88] text-[11px]">Phone Number</span>
                <div className="font-semibold text-[#241B35] select-all">{selectedInquiry.phone || 'Not provided'}</div>
              </div>
              <div>
                <span className="text-[#786D88] text-[11px]">Inquiry Type</span>
                <div className="font-semibold text-[#6D28D9]">{selectedInquiry.inquiry || 'General'}</div>
              </div>
              <div>
                <span className="text-[#786D88] text-[11px]">Submitted On</span>
                <div className="font-semibold text-[#241B35]">
                  {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString() : '—'}
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#786D88] mb-2">
                Inquiry Message
              </label>
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#EDE5F5] text-xs text-[#241B35] leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Change */}
            <div className="flex items-center justify-between pt-4 border-t border-[#EDE5F5]">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#786D88]">Update Status:</span>
                <select
                  value={selectedInquiry.status || 'new'}
                  onChange={(e) => handleStatusChange(selectedInquiry._id, e.target.value)}
                  className="text-xs rounded-xl border border-[#EDE5F5] bg-white px-3 py-1.5 font-semibold text-[#241B35]"
                >
                  <option value="new">New (Unread)</option>
                  <option value="in_progress">In Progress</option>
                  <option value="responded">Responded</option>
                  <option value="closed">Closed / Archived</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-semibold hover:bg-[#4C1D95] transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Customer Inquiry"
        message={`Are you sure you want to permanently delete the inquiry from "${inquiryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Yes, Delete Record"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
