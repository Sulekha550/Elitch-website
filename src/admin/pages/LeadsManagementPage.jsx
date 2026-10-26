import React, { useState, useEffect, useCallback } from 'react';
import {
  Inbox,
  Phone,
  Mail,
  MessageSquare,
  Search,
  Filter,
  Trash2,
  Calendar,
  CheckCircle,
  Clock,
  Send,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Eye,
  UserCheck
} from 'lucide-react';
import api from '../services/api';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { useToast } from '../context/ToastContext';

export default function LeadsManagementPage() {
  const { showToast } = useToast();

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Selected Lead Drawer
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLeads = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        sort: '-createdAt'
      };
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (priorityFilter !== 'All') params.priority = priorityFilter;

      const res = await api.get('/leads', params);
      if (res.success) {
        setLeads(res.leads || []);
        setTotalCount(res.total || 0);
        setTotalPages(res.totalPages || 1);

        // Keep selectedLead in sync if open
        if (selectedLead) {
          const fresh = res.leads.find((l) => l._id === selectedLead._id);
          if (fresh) setSelectedLead(fresh);
        }
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Query Error',
        message: err.message || 'Failed to retrieve inquiries.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, priorityFilter, showToast, selectedLead]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await api.patch(`/leads/${leadId}/status`, { status: newStatus });
      if (res.success) {
        showToast({
          type: 'success',
          title: 'Status Updated',
          message: `Inquiry status changed to ${newStatus}.`
        });
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Update Failed',
        message: err.message || 'Failed to update lead status.'
      });
    }
  };

  const handlePriorityChange = async (leadId, newPriority) => {
    try {
      const res = await api.patch(`/leads/${leadId}/status`, { priority: newPriority });
      if (res.success) {
        showToast({
          type: 'success',
          title: 'Priority Updated',
          message: `Inquiry priority set to ${newPriority}.`
        });
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId ? { ...l, priority: newPriority } : l))
        );
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead((prev) => ({ ...prev, priority: newPriority }));
        }
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Error', message: 'Failed to update priority.' });
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedLead) return;

    setIsSubmittingNote(true);
    try {
      const res = await api.post(`/leads/${selectedLead._id}/notes`, { note: newNote });
      if (res.success && res.internalNotes) {
        setSelectedLead((prev) => ({
          ...prev,
          internalNotes: res.internalNotes
        }));
        setNewNote('');
        showToast({ type: 'success', title: 'Note Logged', message: 'Internal comment added to client file.' });
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Failed', message: 'Could not add note.' });
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    try {
      const res = await api.delete(`/leads/${leadToDelete._id}`);
      if (res.success) {
        showToast({ type: 'success', title: 'Inquiry Removed', message: 'Lead record has been removed.' });
        setDeleteModalOpen(false);
        setLeadToDelete(null);
        if (selectedLead && selectedLead._id === leadToDelete._id) {
          setSelectedLead(null);
        }
        fetchLeads();
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Delete Failed', message: err.message });
    } finally {
      setIsDeleting(false);
    }
  };

  const cleanPhoneForWhatsApp = (phone) => {
    return phone.replace(/[^0-9]/g, '');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#241B35] font-display tracking-tight">
            Client Inquiries & CRM Pipeline ({totalCount})
          </h2>
          <p className="text-xs text-[#786D88] mt-1">
            Track luxury residential leads, commercial inquiries, private walkthroughs, and notes.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EDE5F5] shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Keyword Search */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#9B91A8]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by client name, email, phone, message..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] placeholder-[#9B91A8] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            >
              <option value="All">Status: All Inquiries</option>
              <option value="New">Status: New Only</option>
              <option value="Contacted">Status: Contacted</option>
              <option value="Qualified">Status: Qualified</option>
              <option value="Follow-up">Status: Follow-up</option>
              <option value="Closed">Status: Closed / Acquired</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            >
              <option value="All">Priority: All</option>
              <option value="High">Priority: High</option>
              <option value="Medium">Priority: Medium</option>
              <option value="Low">Priority: Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Table + Side Drawer) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table / List View */}
        <div className={`${selectedLead ? 'hidden' : 'lg:col-span-3'} space-y-4`}>
          {isLoading ? (
            <LoadingSkeleton type="table" rows={6} />
          ) : leads.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No inquiries match your criteria"
              description="New inquiries submitted via the public contact form will appear here in real-time."
            />
          ) : (
            <div className="rounded-3xl bg-white border border-[#EDE5F5] overflow-hidden shadow-xs">
              <div className="overflow-x-auto vardha-admin-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8FC] border-b border-[#EDE5F5] text-[#786D88] uppercase font-mono tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Prospect Details</th>
                      <th className="py-3.5 px-4 font-semibold">Inquiry Type</th>
                      <th className="py-3.5 px-4 font-semibold">Date</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE5F5]">
                    {leads.map((lead) => {
                      const isSelected = selectedLead?._id === lead._id;
                      return (
                        <tr
                          key={lead._id}
                          onClick={() => setSelectedLead(lead)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#F3E8FF]/70 border-l-4 border-l-[#6D28D9]'
                              : 'hover:bg-[#FAF8FC]'
                          }`}
                        >
                          {/* Prospect Name & Phone */}
                          <td className="py-3 px-4">
                            <div>
                              <span className="font-bold text-[#241B35] block">
                                {lead.name}
                              </span>
                              <span className="text-[11px] text-[#786D88] font-mono">
                                {lead.phone}
                              </span>
                              <span className="text-[11px] text-[#786D88] block">
                                {lead.email}
                              </span>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-4 text-[#786D88] font-medium">
                            {lead.inquiryCategory}
                          </td>

                          {/* Date */}
                          <td className="py-3 px-4 text-[#9B91A8] font-mono">
                            {new Date(lead.submissionDate).toLocaleDateString()}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end space-x-1.5">
                              {/* View Details Trigger */}
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="p-1.5 rounded-lg text-[#6D28D9] bg-[#F3E8FF] hover:bg-[#E0D4FC] border border-[#DDD6FE] transition-colors"
                                title="View Full Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>}
                              <a
                                href={`https://wa.me/${cleanPhoneForWhatsApp(lead.phone)}?text=Dear%20${encodeURIComponent(lead.name)},%20this%20is%20Elicit%20Research%20%26%20Insights%20Inc.%20following%20up%20on%20your%20inquiry.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-[#059669] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>

                              {/* Direct Call Trigger */}
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-1.5 rounded-lg text-[#6D28D9] bg-[#F3E8FF] hover:bg-[#E0D4FC] border border-[#DDD6FE] transition-colors"
                                title="Call Client"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>

                              {/* Direct Email Trigger */}
                              <a
                                href={`mailto:${lead.email}?subject=Elicit%20Research%20-%20Inquiry%20Follow-up`}
                                className="p-1.5 rounded-lg text-[#DB2777] bg-[#FCE7F3] hover:bg-[#FCE7F3] border border-[#FCE7F3] transition-colors"
                                title="Send Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>

                              {/* Delete */}
                              <button
                                onClick={() => {
                                  setLeadToDelete(lead);
                                  setDeleteModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg text-[#9B91A8] hover:text-[#E11D48] hover:bg-[#FFF1F2] transition-colors"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-[#EDE5F5] bg-[#FAF8FC] flex items-center justify-between text-xs text-[#786D88]">
                  <span>
                    Page <strong className="text-[#241B35]">{currentPage}</strong> of{' '}
                    <strong className="text-[#241B35]">{totalPages}</strong>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-lg border border-[#EDE5F5] bg-white text-[#241B35] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3EEFF]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-lg border border-[#EDE5F5] bg-white text-[#241B35] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3EEFF]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
           )}
         </div>
          )}
        </div>

        {/* Lead Dossier Side Panel */}
        {selectedLead && (
          <div className="lg:col-span-3 p-6 rounded-3xl bg-white border border-[#EDE5F5] shadow-[0_15px_35px_rgba(120,81,216,0.08)] flex flex-col justify-between space-y-6 animate-fade-in relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-[#9B91A8] hover:text-[#241B35] hover:bg-[#F3EEFF] transition-colors"
              title="Close dossier"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              {/* Header */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <StatusBadge status={selectedLead.status} />
                  <StatusBadge status={selectedLead.priority} />
                </div>
                 <h3 className="text-lg font-bold text-[#241B35] font-display">
                   {selectedLead.name}
                 </h3>
                 <span className="text-xs text-[#6D28D9] font-semibold">
                   {selectedLead.inquiryCategory}
                 </span>
              </div>

               {/* Direct Action Buttons */}
               <div className="grid grid-cols-3 gap-2 pt-1">
                 <div className="flex flex-col gap-1">
                   <a
                     href={`https://wa.me/${cleanPhoneForWhatsApp(selectedLead.phone)}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-center py-2 px-2 rounded-xl bg-[#ECFDF5] text-[#065F46] hover:bg-[#D1FAE5] border border-[#A7F3D0] text-xs font-semibold transition-colors"
                   >
                     <MessageSquare className="w-3.5 h-3.5 mr-1" />
                     WhatsApp
                   </a>
                   <div className="text-[10px] text-center font-mono text-[#786D88] bg-[#FAF8FC] border border-[#EDE5F5] rounded-lg py-1 px-1 truncate">
                     {selectedLead.phone}
                   </div>
                 </div>
                 <div className="flex flex-col gap-1">
                   <a
                     href={`tel:${selectedLead.phone}`}
                     className="flex items-center justify-center py-2 px-2 rounded-xl bg-[#F3E8FF] text-[#6D28D9] hover:bg-[#E0D4FC] border border-[#DDD6FE] text-xs font-semibold transition-colors"
                   >
                     <Phone className="w-3.5 h-3.5 mr-1" />
                     Call
                   </a>
                   <div className="text-[10px] text-center font-mono text-[#786D88] bg-[#FAF8FC] border border-[#EDE5F5] rounded-lg py-1 px-1 truncate">
                     {selectedLead.phone}
                   </div>
                 </div>
                 <div className="flex flex-col gap-1">
                   <a
                     href={`mailto:${selectedLead.email}`}
                     className="flex items-center justify-center py-2 px-2 rounded-xl bg-[#FCE7F3] text-[#DB2777] hover:bg-[#FCE7F3] border border-[#FCE7F3] text-xs font-semibold transition-colors"
                   >
                     <Mail className="w-3.5 h-3.5 mr-1" />
                     Email
                   </a>
                   <div className="text-[10px] text-center font-mono text-[#786D88] bg-[#FAF8FC] border border-[#EDE5F5] rounded-lg py-1 px-1 truncate">
                     {selectedLead.email}
                   </div>
                 </div>
               </div>

              {/* Message Box */}
              <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#EDE5F5] text-xs space-y-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#6D28D9]">
                  Prospect Message
                </span>
                <p className="text-[#241B35] leading-relaxed italic">
                  "{selectedLead.message}"
                </p>
                <div className="text-[10px] text-[#9B91A8] pt-1.5 border-t border-[#EDE5F5]">
                  Received: {new Date(selectedLead.submissionDate).toLocaleString()}
                </div>
              </div>

              {/* Internal Notes Thread */}
              <div>
                <span className="text-xs font-bold text-[#241B35] uppercase tracking-wider font-display mb-2 block">
                  Internal Notes & CRM Audit ({selectedLead.internalNotes?.length || 0})
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto vardha-admin-scrollbar pr-1">
                  {selectedLead.internalNotes?.length > 0 ? (
                    selectedLead.internalNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#FAF8FC] border border-[#EDE5F5] text-xs space-y-1"
                      >
                        <p className="text-[#241B35]">{note.note}</p>
                        <div className="flex items-center justify-between text-[10px] text-[#9B91A8] font-mono">
                          <span>{note.author}</span>
                          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-[11px] text-[#9B91A8] italic py-2">
                      No internal notes logged yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Note Submission Input */}
            <form onSubmit={handleAddNote} className="pt-2 border-t border-[#EDE5F5]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Append internal client note..."
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] placeholder-[#9B91A8] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15"
                />
                <button
                  type="submit"
                  disabled={isSubmittingNote || !newNote.trim()}
                  className="absolute right-2 p-1.5 rounded-lg bg-[#6D28D9] text-white hover:bg-[#4C1D95] disabled:opacity-40 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Inquiry Record"
        message={`Are you sure you want to permanently delete the inquiry from ${leadToDelete?.name}?`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => {
          setDeleteModalOpen(false);
          setLeadToDelete(null);
        }}
      />
    </div>
  );
}
