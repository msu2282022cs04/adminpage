import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { useAdminProfile } from '../../context/AdminProfileContext';

export default function Sidebar({ isOpen, onCloseSidebar }) {
  const { t, logoSrc, logoAlt } = useI18n();
  const { profile, openModal } = useAdminProfile();
  const location = useLocation();

  const isHomeActive = location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '/dashboard';

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
      {/* Logo Header */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo-link" id="logoLink" onClick={onCloseSidebar}>
          <img src={logoSrc} alt={logoAlt} className="sidebar-brand-logo" id="sidebarBrandLogo" />
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {/* 1. Home / Dashboard */}
        <div className={`nav-item ${isHomeActive ? 'active' : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="navHome"
            onClick={onCloseSidebar}
          >
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="nav-text">{t('nav_home', 'Home')}</span>
          </NavLink>
          <div className="submenu-flyout">
            <ul className="submenu-list">
              <li>
                <Link to="/" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_home_overview', 'Dashboard Overview')}</span>
                </Link>
              </li>
              <li>
                <Link to="/reports" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_home_analytics', 'Usage Analytics')}</span>
                </Link>
              </li>
              <li>
                <Link to="/ai-tools" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_home_quick', 'Quick Links')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. User Management */}
        <div className={`nav-item ${location.pathname.startsWith('/users') ? 'active' : ''}`}>
          <NavLink
            to="/users"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="navUsers"
            onClick={onCloseSidebar}
          >
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="nav-text">{t('nav_users', 'User Management')}</span>
          </NavLink>
          <div className="submenu-flyout">
            <ul className="submenu-list">
              <li>
                <Link to="/users" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_users_list', 'User List')}</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_users_add', 'Add New User')}</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_users_subadmins', 'Sub Admins')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. AI Tools */}
        <div className={`nav-item ${location.pathname.startsWith('/ai-tools') ? 'active' : ''}`}>
          <NavLink
            to="/ai-tools"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="navAiTools"
            onClick={onCloseSidebar}
          >
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            <span className="nav-text">{t('nav_ai_tools', 'AI Tools')}</span>
          </NavLink>
          <div className="submenu-flyout">
            <ul className="submenu-list">
              <li>
                <Link to="/ai-chat" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_ai_chat', 'AI Agent')}</span>
                </Link>
              </li>
              <li>
                <Link to="/image-tools" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_ai_image', 'Image Generation')}</span>
                </Link>
              </li>
              <li>
                <Link to="/video-tools" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_ai_video', 'Video Tools')}</span>
                </Link>
              </li>
              <li>
                <Link to="/code-tools" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_ai_code', 'General Search')}</span>
                </Link>
              </li>
              <li>
                <Link to="/audio-tools" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_ai_audio', 'Audio Tools')}</span>
                </Link>
              </li>
              <li>
                <Link to="/content-tools" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_ai_content', 'Research')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. AI Usage */}
        <div className={`nav-item ${location.pathname.startsWith('/ai-usage') ? 'active' : ''}`}>
          <NavLink
            to="/ai-usage"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="navAiUsage"
            onClick={onCloseSidebar}
          >
            <svg className="nav-icon" viewBox="0 0 24 24">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <span className="nav-text">{t('nav_ai_usage', 'AI Usage')}</span>
          </NavLink>
          <div className="submenu-flyout">
            <ul className="submenu-list">
              <li>
                <Link to="/ai-usage" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_ai_usage_stats', 'Usage Analytics')}</span>
                </Link>
              </li>
              <li>
                <Link to="/ai-usage" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_ai_usage_tools', 'Tools Breakdown')}</span>
                </Link>
              </li>
              <li>
                <Link to="/ai-usage" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_ai_usage_activity', 'Recent Activity')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Credits & Subscription (NEW) */}
        <div className={`nav-item ${location.pathname.startsWith('/credits-subscription') ? 'active' : ''}`}>
          <NavLink
            to="/credits-subscription"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="navCreditsSub"
            onClick={onCloseSidebar}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span className="nav-text">{t('nav_credits_sub', 'Credits & Subscription')}</span>
          </NavLink>
          <div className="submenu-flyout">
            <ul className="submenu-list">
              <li>
                <Link to="/credits-subscription" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_credits_overview', 'Credit Usage')}</span>
                </Link>
              </li>
              <li>
                <Link to="/credits-subscription" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_sub_plans', 'Subscription Management')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 6. Settings */}
        <div className={`nav-item ${location.pathname.startsWith('/settings') ? 'active' : ''}`}>
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="navSettings"
            onClick={onCloseSidebar}
          >
            <svg className="nav-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span className="nav-text">{t('nav_settings', 'Settings')}</span>
          </NavLink>
        </div>

        {/* 7. Language Settings */}
        <div className={`nav-item ${location.pathname.startsWith('/language') ? 'active' : ''}`}>
          <NavLink
            to="/language"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="navLanguage"
            onClick={onCloseSidebar}
          >
            <svg className="nav-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className="nav-text">{t('nav_language', 'Language Settings')}</span>
          </NavLink>
        </div>

        {/* 8. Reports */}
        <div className={`nav-item ${location.pathname.startsWith('/reports') ? 'active' : ''}`}>
          <NavLink
            to="/reports"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="navReports"
            onClick={onCloseSidebar}
          >
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span className="nav-text">{t('nav_reports', 'Analytics & Reports')}</span>
          </NavLink>
        </div>

        {/* 9. Feedback */}
        <div className={`nav-item ${location.pathname.startsWith('/feedback') ? 'active' : ''}`}>
          <NavLink
            to="/feedback"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="navFeedback"
            onClick={onCloseSidebar}
          >
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="nav-text">{t('nav_feedback', 'User Feedback')}</span>
          </NavLink>
          <div className="submenu-flyout">
            <ul className="submenu-list">
              <li>
                <Link to="/feedback" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_feedback_recent', 'Recent Feedback')}</span>
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_feedback_ratings', 'Ratings & Reviews')}</span>
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="submenu-link" onClick={onCloseSidebar}>
                  <span className="sub-dot"></span>
                  <span>{t('sub_feedback_support', 'Support Requests')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {/* Admin Profile Card */}
        <div className="sidebar-admin-card" onClick={() => openModal('profileModal')}>
          <div className="sidebar-avatar-wrapper">
            <img
              src={profile.avatar}
              alt="Admin Avatar"
              className="sidebar-avatar"
              onError={(e) => { e.currentTarget.src = 'assets/images/robot-avatar.jpg'; }}
            />
            <span className="online-indicator"></span>
          </div>
          <div className="sidebar-admin-info">
            <span className="sidebar-admin-name admin-display-name">{profile.name}</span>
            <span className="sidebar-admin-role">{t('admin_title', 'Super Administrator')}</span>
          </div>
        </div>

        {/* Tamil Quote */}
        <div className="sidebar-quote-container">
          <span className="sidebar-quote-icon">🍃</span>
          <span className="sidebar-quote-text">{t('sidebar_quote', '"The Best AI World in Tamil..."')}</span>
        </div>
      </div>
    </aside>
  );
}
