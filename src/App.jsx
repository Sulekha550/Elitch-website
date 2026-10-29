import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { ToastProvider } from './admin/context/ToastContext';

// Layout & Common
import ScrollToTop from './components/common/ScrollToTop';
import Colorful3DBackground from './components/common/Colorful3DBackground';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Existing Pages (Preserved 100%)
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PanelPage from './pages/PanelPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Real Estate Showcase Pages

import ProjectDetailsPage from './pages/ProjectDetailsPage';
import FloorPlansPage from './pages/FloorPlansPage';
import GalleryPage from './pages/GalleryPage';

// Admin Architecture
import ProtectedRoute from './admin/components/auth/ProtectedRoute';
import AdminLayout from './admin/components/layout/AdminLayout';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import DashboardOverviewPage from './admin/pages/DashboardOverviewPage';
import ProjectsListPage from './admin/pages/ProjectsListPage';
import ProjectEditorPage from './admin/pages/ProjectEditorPage';
import LeadsManagementPage from './admin/pages/LeadsManagementPage';
import ContactMessagesPage from './admin/pages/ContactMessagesPage';
import EmailNotificationsPage from './admin/pages/EmailNotificationsPage';
import GalleryManagementPage from './admin/pages/GalleryManagementPage';
import WebsiteContentPage from './admin/pages/WebsiteContentPage';
import AdminSettingsPage from './admin/pages/AdminSettingsPage';

// Public Layout Wrapper: preserves website design without leaking into Admin
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-pink-100 selection:text-pink-900 transition-colors duration-300 relative">
      <ScrollToTop />
      <Colorful3DBackground />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AdminAuthProvider>
          <ToastProvider>
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/panel" element={<PanelPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* Vardha Real Estate Public Showcase Routes */}

                <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
                <Route path="/floor-plans" element={<FloorPlansPage />} />
                <Route path="/gallery" element={<GalleryPage />} />

                {/* Public 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Dedicated Admin Login Route (No Public Header/Footer) */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin Command Center Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/leads" replace />} />
                <Route path="leads" element={<LeadsManagementPage />} />
              </Route>
            </Routes>
          </ToastProvider>
        </AdminAuthProvider>
      </ThemeProvider>
    </Router>
  );
}

