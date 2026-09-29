import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { useAdminProfile } from '../../context/AdminProfileContext';

export default function Header({ onToggleSidebar }) {
  const { lang, setLanguage, t, timeState } = useI18n();
  const { profile, openModal } = useAdminProfile();
  const navigate = useNavigate();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const langRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const searchItems = [
    { title: t('nav_home', 'Home'), path: '/' },
    { title: t('nav_users', 'User Management'), path: '/users' },
    { title: t('nav_ai_tools', 'AI Tools'), path: '/ai-tools' },
    { title: t('nav_ai_usage', 'AI Usage'), path: '/ai-usage' },
    { title: t('nav_credits_sub', 'Credits & Subscription'), path: '/credits-subscription' },
    { title: t('nav_settings', 'Settings'), path: '/settings' },
    { title: t('nav_language', 'Language Settings'), path: '/language' },
    { title: t('nav_reports', 'Analytics & Reports'), path: '/reports' },
    { title: t('nav_feedback', 'User Feedback'), path: '/feedback' },
  ];

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 0) {
      const filtered = searchItems.filter((item) =>
        item.title.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(filtered);
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  };

  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <header className="top-header">
      {/* Mobile Toggle Button */}
      <button
        className="mobile-menu-btn"
        id="mobileMenuToggle"
        aria-label="Toggle Navigation"
        onClick={onToggleSidebar}
      >
        <svg viewBox="0 0 24 24">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Search Input with Live Dropdown */}
      <div className="header-search-wrapper" ref={searchRef}>
        <div className="search-input-group">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            id="globalSearchInput"
            placeholder={t('search_placeholder', 'Search...')}
            autoComplete="off"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (searchQuery.trim().length > 0) setSearchOpen(true);
            }}
          />
        </div>
        {searchOpen && searchResults.length > 0 && (
          <div className="search-dropdown-menu" id="searchDropdown">
            {searchResults.map((item, idx) => (
              <div
                key={idx}
                className="search-dropdown-item"
                onClick={() => handleSearchResultClick(item.path)}
              >
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Action Icons & Controls */}
      <div className="header-actions-group">
        {/* 1. Bilingual Language Switcher */}
        <div className="dropdown-container" ref={langRef}>
          <button
            className="header-pill-btn lang-pill"
            id="langToggleBtn"
            aria-label="Language Selector"
            onClick={() => setLangMenuOpen((prev) => !prev)}
          >
            <svg className="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span id="currentLangLabel">{lang === 'ta' ? 'தமிழ்' : 'English'}</span>
            <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div className={`dropdown-menu ${langMenuOpen ? '' : 'hidden'}`} id="langDropdownMenu" style={{ minWidth: '130px' }}>
            <a
              href="#"
              className={`dropdown-item lang-opt ${lang === 'ta' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setLanguage('ta');
                setLangMenuOpen(false);
              }}
            >
              <span>தமிழ்</span>
            </a>
            <a
              href="#"
              className={`dropdown-item lang-opt ${lang === 'en' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setLanguage('en');
                setLangMenuOpen(false);
              }}
            >
              <span>English</span>
            </a>
          </div>
        </div>

        {/* 2. Date & Time Widget */}
        <div className="header-datetime-widget">
          <svg className="datetime-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <div className="datetime-text">
            <span className="header-date" id="headerDate">{timeState.dateStr}</span>
            <span className="header-time" id="headerTime">{timeState.timeStr}</span>
          </div>
        </div>

        {/* 3. Compact Admin Profile Popover Widget */}
        <div className="dropdown-container" ref={profileRef}>
          <button
            className="header-pill-btn admin-profile-pill"
            id="profileDropdownBtn"
            aria-label="Admin Menu"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
          >
            <img
              src={profile.avatar}
              alt="Admin"
              className="admin-header-avatar"
              onError={(e) => { e.currentTarget.src = 'assets/images/robot-avatar.jpg'; }}
            />
            <span className="admin-display-name">{profile.name}</span>
            <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {/* Compact Popover Dropdown */}
          <div
            className={`dropdown-menu ${profileMenuOpen ? '' : 'hidden'}`}
            id="profileDropdownMenu"
            style={{
              minWidth: '250px',
              padding: '0',
              borderRadius: '12px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)',
              overflow: 'hidden'
            }}
          >
            {/* Popover Header with Compact 44px Avatar */}
            <div style={{ padding: '14px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb', display: 'block' }}
                  onError={(e) => { e.currentTarget.src = 'assets/images/robot-avatar.jpg'; }}
                />
                <span style={{ position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', background: '#10b981', border: '2px solid #fff', borderRadius: '50%' }}></span>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {profile.name}
                </div>
                <div style={{ fontSize: '11.5px', color: '#2563eb', fontWeight: '600' }}>
                  {t('admin_title', 'Super Administrator')}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {profile.email}
                </div>
              </div>
            </div>

            {/* Menu Options */}
            <div style={{ padding: '6px' }}>
              <a
                href="#"
                className="dropdown-item"
                id="menuViewProfile"
                onClick={(e) => {
                  e.preventDefault();
                  setProfileMenuOpen(false);
                  openModal('profileModal');
                }}
              >
                <svg className="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>{t('menu_my_profile', 'My Profile')}</span>
              </a>

              <a
                href="#"
                className="dropdown-item"
                id="menuAccountSettings"
                onClick={(e) => {
                  e.preventDefault();
                  setProfileMenuOpen(false);
                  navigate('/settings');
                }}
              >
                <svg className="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <span>{t('menu_account_settings', 'Account Settings')}</span>
              </a>

              <a
                href="#"
                className="dropdown-item"
                id="menuChangePassword"
                onClick={(e) => {
                  e.preventDefault();
                  setProfileMenuOpen(false);
                  openModal('changePasswordModal');
                }}
              >
                <svg className="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>{t('menu_change_password', 'Change Password')}</span>
              </a>

              <div className="dropdown-divider"></div>

              <a
                href="#"
                className="dropdown-item danger"
                id="menuLogout"
                onClick={(e) => {
                  e.preventDefault();
                  setProfileMenuOpen(false);
                  openModal('logoutModal');
                }}
              >
                <svg className="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span>{t('menu_logout', 'Logout')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
