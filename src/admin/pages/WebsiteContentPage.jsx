import React, { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  CheckCircle,
  Sparkles,
  Phone,
  Building,
  Info,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { useToast } from '../context/ToastContext';

export default function WebsiteContentPage() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Content Store
  const [heroContent, setHeroContent] = useState({
    headline: 'Authentic Data. Credible Insights. Successful Strategies.',
    tagline: 'ELICIT RESEARCH & INSIGHTS INC.',
    heroStat1: { value: '60+', label: 'Global Clients' },
    heroStat2: { value: '5M+', label: 'Verified Panelists' },
    heroStat3: { value: '45+', label: 'Countries Covered' },
    ctaText: "Let's Discuss Your Project",
    ctaLink: '/contact'
  });

  const [aboutContent, setAboutContent] = useState({
    vision: 'To empower enterprise brands with precision market intelligence that drives compounding growth through authentic data and credible insights.',
    founderName: 'Elicit Research Leadership Team',
    establishedYear: '2015',
    totalProjectsCompleted: '500+',
    awardsCount: 'ESOMAR 28 Compliant & ISO 20252 Certified'
  });

  const [contactContent, setContactContent] = useState({
    corporateOffice: 'Elicit Research & Insights Inc., Corporate Office, New Delhi, India',
    directPhone: '+91 11 0000-0000',
    mobilePhone: '+91 98000 00000',
    inquiryEmail: 'RFQ@elicitresearch.com',
    pressEmail: 'info@elicitresearch.com',
    whatsAppNumber: '+919800000000',
    officeHours: 'Monday - Saturday: 09:00 AM - 06:30 PM'
  });

  useEffect(() => {
    let isMounted = true;
    const fetchContents = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/content');
        if (isMounted && res.success && res.contents) {
          if (res.contents.hero?.data) setHeroContent(res.contents.hero.data);
          if (res.contents.about?.data) setAboutContent(res.contents.about.data);
          if (res.contents.contact?.data) setContactContent(res.contents.contact.data);
        }
      } catch (err) {
        // Fallback to initial defaults
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchContents();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveHero = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.put('/content/hero', {
        title: heroContent.headline,
        subtitle: heroContent.tagline,
        data: heroContent
      });
      if (res.success) {
        showToast({ type: 'success', title: 'Content Synchronized', message: 'Hero banner content committed.' });
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Save Failed', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.put('/content/about', {
        title: 'About Elicit Research & Insights Inc.',
        subtitle: aboutContent.founderName,
        data: aboutContent
      });
      if (res.success) {
        showToast({ type: 'success', title: 'Content Synchronized', message: 'About institutional profile committed.' });
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Save Failed', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.put('/content/contact', {
        title: 'Corporate Headquarters & WhatsApp',
        subtitle: contactContent.directPhone,
        data: contactContent
      });
      if (res.success) {
        showToast({ type: 'success', title: 'Content Synchronized', message: 'Official contact numbers and WhatsApp committed.' });
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Save Failed', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton type="form" />;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#241B35] font-display tracking-tight">
          Website Content Management (CMS)
        </h2>
        <p className="text-xs text-[#786D88] mt-1">
          Directly modify real estate headlines, institutional achievements, and WhatsApp routing without editing code.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EDE5F5] space-x-2">
        <button
          onClick={() => setActiveTab('hero')}
          className={`py-3 px-4 text-xs font-bold tracking-wide uppercase transition-colors relative ${
            activeTab === 'hero' ? 'text-[#6D28D9]' : 'text-[#786D88] hover:text-[#241B35]'
          }`}
        >
          <span>Home Hero & Banner</span>
          {activeTab === 'hero' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#6D28D9] rounded-t-full"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`py-3 px-4 text-xs font-bold tracking-wide uppercase transition-colors relative ${
            activeTab === 'about' ? 'text-[#6D28D9]' : 'text-[#786D88] hover:text-[#241B35]'
          }`}
        >
          <span>About Institution</span>
          {activeTab === 'about' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#6D28D9] rounded-t-full"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`py-3 px-4 text-xs font-bold tracking-wide uppercase transition-colors relative ${
            activeTab === 'contact' ? 'text-[#6D28D9]' : 'text-[#786D88] hover:text-[#241B35]'
          }`}
        >
          <span>Headquarters & WhatsApp</span>
          {activeTab === 'contact' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#6D28D9] rounded-t-full"></span>
          )}
        </button>
      </div>

      {/* Tab 1: Hero Banner */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
            <div>
              <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display">
                Hero Banner Headlines & Metrics
              </h3>
              <p className="text-xs text-[#786D88]">Displays at the top of the architectural portal.</p>
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] text-white shadow-md shadow-[#6D28D9]/20 transition-all hover:-translate-y-0.5"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Top Sub-Tagline
            </label>
            <input
              type="text"
              value={heroContent.tagline}
              onChange={(e) => setHeroContent({ ...heroContent, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs font-mono font-bold text-[#6D28D9] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Main Hero Headline
            </label>
            <input
              type="text"
              value={heroContent.headline}
              onChange={(e) => setHeroContent({ ...heroContent, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-sm font-bold text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#EDE5F5]">
            <div>
              <label className="block text-[11px] font-semibold text-[#786D88] mb-1">
                Metric 1 (Value / Label)
              </label>
              <input
                type="text"
                value={heroContent.heroStat1?.value}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    heroStat1: { ...heroContent.heroStat1, value: e.target.value }
                  })
                }
                className="w-full px-3 py-2 mb-1.5 rounded-xl bg-white border border-[#EDE5F5] text-xs font-bold text-[#241B35] focus:border-[#6D28D9]"
              />
              <input
                type="text"
                value={heroContent.heroStat1?.label}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    heroStat1: { ...heroContent.heroStat1, label: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-[11px] text-[#786D88] focus:border-[#6D28D9]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#786D88] mb-1">
                Metric 2 (Value / Label)
              </label>
              <input
                type="text"
                value={heroContent.heroStat2?.value}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    heroStat2: { ...heroContent.heroStat2, value: e.target.value }
                  })
                }
                className="w-full px-3 py-2 mb-1.5 rounded-xl bg-white border border-[#EDE5F5] text-xs font-bold text-[#241B35] focus:border-[#6D28D9]"
              />
              <input
                type="text"
                value={heroContent.heroStat2?.label}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    heroStat2: { ...heroContent.heroStat2, label: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-[11px] text-[#786D88] focus:border-[#6D28D9]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#786D88] mb-1">
                Metric 3 (Value / Label)
              </label>
              <input
                type="text"
                value={heroContent.heroStat3?.value}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    heroStat3: { ...heroContent.heroStat3, value: e.target.value }
                  })
                }
                className="w-full px-3 py-2 mb-1.5 rounded-xl bg-white border border-[#EDE5F5] text-xs font-bold text-[#241B35] focus:border-[#6D28D9]"
              />
              <input
                type="text"
                value={heroContent.heroStat3?.label}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    heroStat3: { ...heroContent.heroStat3, label: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE5F5] text-[11px] text-[#786D88] focus:border-[#6D28D9]"
              />
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: About Section */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
            <div>
              <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display">
                Institutional Credibility & Heritage
              </h3>
              <p className="text-xs text-[#786D88]">Company history and executive statements.</p>
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] text-white shadow-md shadow-[#6D28D9]/20 transition-all hover:-translate-y-0.5"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Architectural Vision Statement
            </label>
            <textarea
              rows={4}
              value={aboutContent.vision}
              onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:outline-none focus:border-[#6D28D9] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#786D88] mb-1">
                Year Established
              </label>
              <input
                type="text"
                value={aboutContent.establishedYear}
                onChange={(e) => setAboutContent({ ...aboutContent, establishedYear: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#786D88] mb-1">
                Completed Deliveries Metric
              </label>
              <input
                type="text"
                value={aboutContent.totalProjectsCompleted}
                onChange={(e) => setAboutContent({ ...aboutContent, totalProjectsCompleted: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
              />
            </div>
          </div>
        </form>
      )}

      {/* Tab 3: Contact & WhatsApp */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveContact} className="p-7 rounded-3xl bg-white border border-[#EDE5F5] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F5]">
            <div>
              <h3 className="text-sm font-bold text-[#241B35] uppercase tracking-wider font-display">
                Headquarters & Communication Desk
              </h3>
              <p className="text-xs text-[#786D88]">Routing destinations for prospect inquiries.</p>
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#4C1D95] hover:to-[#5533A8] text-white shadow-md shadow-[#6D28D9]/20 transition-all hover:-translate-y-0.5"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
              Corporate Headquarters Address
            </label>
            <input
              type="text"
              value={contactContent.corporateOffice}
              onChange={(e) => setContactContent({ ...contactContent, corporateOffice: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                Direct Landline Telephone
              </label>
              <input
                type="text"
                value={contactContent.directPhone}
                onChange={(e) => setContactContent({ ...contactContent, directPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs font-mono font-medium text-[#241B35] focus:border-[#6D28D9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                Official WhatsApp Desk (With Country Code) *
              </label>
              <input
                type="text"
                value={contactContent.whatsAppNumber}
                onChange={(e) => setContactContent({ ...contactContent, whatsAppNumber: e.target.value })}
                placeholder="+919820091827"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs font-mono font-bold text-[#059669] focus:border-[#6D28D9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                Inquiry & Acquisitions Email
              </label>
              <input
                type="email"
                value={contactContent.inquiryEmail}
                onChange={(e) => setContactContent({ ...contactContent, inquiryEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241B35] mb-1">
                Public Operating Hours
              </label>
              <input
                type="text"
                value={contactContent.officeHours}
                onChange={(e) => setContactContent({ ...contactContent, officeHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE5F5] text-xs text-[#241B35] focus:border-[#6D28D9]"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
