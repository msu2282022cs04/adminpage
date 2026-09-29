import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './context/I18nContext';
import { ToastProvider } from './context/ToastContext';
import { AdminProfileProvider } from './context/AdminProfileContext';

import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import AiToolsPage from './pages/AiToolsPage';
import AiUsagePage from './pages/AiUsagePage';
import UsersPage from './pages/UsersPage';
import ContentPage from './pages/ContentPage';
import LanguagePage from './pages/LanguagePage';
import ReportsPage from './pages/ReportsPage';
import FeedbackPage from './pages/FeedbackPage';
import SettingsPage from './pages/SettingsPage';
import CreditsSubscriptionPage from './pages/CreditsSubscriptionPage';

// 6 Dedicated Quick Access Tool Pages
import AiChatPage from './pages/AiChatPage';
import VideoToolsPage from './pages/VideoToolsPage';
import ImageToolsPage from './pages/ImageToolsPage';
import CodeToolsPage from './pages/CodeToolsPage';
import AudioToolsPage from './pages/AudioToolsPage';
import ContentToolsPage from './pages/ContentToolsPage';

export default function App() {
  return (
    <ToastProvider>
      <I18nProvider>
        <AdminProfileProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="index.html" element={<DashboardPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                
                {/* 6 Dedicated Quick Access Tool Routes */}
                <Route path="ai-chat" element={<AiChatPage />} />
                <Route path="ai-chat.html" element={<AiChatPage />} />
                <Route path="video-tools" element={<VideoToolsPage />} />
                <Route path="video-tools.html" element={<VideoToolsPage />} />
                <Route path="image-tools" element={<ImageToolsPage />} />
                <Route path="image-tools.html" element={<ImageToolsPage />} />
                <Route path="code-tools" element={<CodeToolsPage />} />
                <Route path="code-tools.html" element={<CodeToolsPage />} />
                <Route path="audio-tools" element={<AudioToolsPage />} />
                <Route path="audio-tools.html" element={<AudioToolsPage />} />
                <Route path="content-tools" element={<ContentToolsPage />} />
                <Route path="content-tools.html" element={<ContentToolsPage />} />

                {/* Other Admin Routes */}
                <Route path="ai-tools" element={<AiToolsPage />} />
                <Route path="ai-tools.html" element={<AiToolsPage />} />
                <Route path="ai-usage" element={<AiUsagePage />} />
                <Route path="ai-usage.html" element={<AiUsagePage />} />
                <Route path="credits-subscription" element={<CreditsSubscriptionPage />} />
                <Route path="credits-subscription.html" element={<CreditsSubscriptionPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="users.html" element={<UsersPage />} />
                <Route path="content" element={<ContentPage />} />
                <Route path="content.html" element={<ContentPage />} />
                <Route path="language" element={<LanguagePage />} />
                <Route path="language.html" element={<LanguagePage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="reports.html" element={<ReportsPage />} />
                <Route path="feedback" element={<FeedbackPage />} />
                <Route path="feedback.html" element={<FeedbackPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="settings.html" element={<SettingsPage />} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Router>
        </AdminProfileProvider>
      </I18nProvider>
    </ToastProvider>
  );
}
