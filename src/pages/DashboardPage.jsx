import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import UsageChart from '../components/common/UsageChart';

export default function DashboardPage() {
  const { t } = useI18n();

  return (
    <div className="dashboard-grid">
      {/* CENTER / MAIN COLUMN */}
      <div className="main-column">
        {/* 1. HERO BANNER */}
        <section className="hero-banner">
          <div className="hero-content">
            <span className="hero-badge-tag">{t('hero_badge', 'நிர்வாகி செயல்பாட்டு பலகை')}</span>
            <h1 className="hero-title">{t('hero_title', 'தமிழி AI ஹப்')}</h1>
            <p className="hero-description">{t('hero_desc', 'தமிழ் மொழியில், உலகளாவிய தொழில்நுட்பம் உங்கள் கையில்...')}</p>
            <Link to="/ai-tools" className="hero-action-btn">
              <span>{t('hero_btn', 'AI கருவிகளுக்கு செல்ல')}</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
          <div className="hero-art-wrapper">
            <img src="assets/images/hero-robot-banner.jpg" alt="THAMILI AI Robot" className="hero-banner-img" />
            <div className="hero-slogan-float">{t('hero_slogan', 'உங்கள் மொழி எங்கள் தொழில்நுட்பம்')}</div>
          </div>
        </section>

        {/* 2. QUICK ACCESS SECTION */}
        <section className="quick-access-section">
          <div className="section-header-row">
            <h2 className="section-title">
              <svg className="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span>{t('quick_access_title', 'விரைவான அணுகல்')}</span>
            </h2>
            <Link to="/ai-tools" className="section-link">
              <span>{t('quick_access_sublink', 'AI கருவிகளை நேரடியாக பயன்படுத்துங்கள்')}</span>
              <span>→</span>
            </Link>
          </div>

          {/* 6 Quick Access Cards Grid */}
          <div className="quick-cards-grid">
            {/* Card 1: AI Agent */}
            <Link to="/ai-chat" className="quick-card blue">
              <div className="quick-card-icon-box">
                <svg viewBox="0 0 24 24" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3 className="quick-card-title">{t('card_chat_title', 'AI முகவர்')}</h3>
              <p className="quick-card-desc">{t('card_chat_desc', 'ChatGPT, Gemini, Claude & பல AI உடன் தமிழ் மொழியில்')}</p>
              <div className="quick-card-arrow-circle">→</div>
            </Link>

            {/* Card 2: Video Tools */}
            <Link to="/video-tools" className="quick-card purple">
              <div className="quick-card-icon-box">
                <svg viewBox="0 0 24 24" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              </div>
              <h3 className="quick-card-title">{t('card_video_title', 'வீடியோ கருவிகள்')}</h3>
              <p className="quick-card-desc">{t('card_video_desc', 'வீடியோ உருவாக்க, எடிட் செய்ய மற்றும் மாற்றங்கள்')}</p>
              <div className="quick-card-arrow-circle">→</div>
            </Link>

            {/* Card 3: Image Generation */}
            <Link to="/image-tools" className="quick-card green">
              <div className="quick-card-icon-box">
                <svg viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <h3 className="quick-card-title">{t('card_image_title', 'பட உருவாக்கம்')}</h3>
              <p className="quick-card-desc">{t('card_image_desc', 'உங்கள் கற்பனையை படமாக மாற்றங்கள்')}</p>
              <div className="quick-card-arrow-circle">→</div>
            </Link>

            {/* Card 4: General Search */}
            <Link to="/code-tools" className="quick-card orange">
              <div className="quick-card-icon-box">
                <svg viewBox="0 0 24 24" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <h3 className="quick-card-title">{t('card_code_title', 'பொதுத் தேடல்')}</h3>
              <p className="quick-card-desc">{t('card_code_desc', 'Code எழுத, திருத்த, இயக்க உதவிகள்')}</p>
              <div className="quick-card-arrow-circle">→</div>
            </Link>

            {/* Card 5: Audio Tools */}
            <Link to="/audio-tools" className="quick-card cyan">
              <div className="quick-card-icon-box">
                <svg viewBox="0 0 24 24" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
              </div>
              <h3 className="quick-card-title">{t('card_audio_title', 'ஆடியோ கருவிகள்')}</h3>
              <p className="quick-card-desc">{t('card_audio_desc', 'குரல் மாற்றம், உரை உருவாக்க, மொழிபெயர்ப்பு')}</p>
              <div className="quick-card-arrow-circle">→</div>
            </Link>

            {/* Card 6: Research */}
            <Link to="/content-tools" className="quick-card pink">
              <div className="quick-card-icon-box">
                <svg viewBox="0 0 24 24" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </div>
              <h3 className="quick-card-title">{t('card_content_title', 'ஆராய்ச்சி')}</h3>
              <p className="quick-card-desc">{t('card_content_desc', 'ஆவணங்கள், கட்டுரை, சுருக்கம், மொழிபெயர்ப்பு')}</p>
              <div className="quick-card-arrow-circle">→</div>
            </Link>
          </div>
        </section>

        {/* 3. PLATFORM USAGE CHART */}
        <UsageChart />

        {/* 4. BOTTOM 3 FEATURE BADGES */}
        <section className="bottom-badges-row">
          <div className="feature-badge-card blue">
            <div className="badge-icon-box">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="badge-info">
              <span className="badge-title">{t('badge_security_title', 'பாதுகாப்பான தளம்')}</span>
              <span className="badge-desc">{t('badge_security_desc', 'உங்கள் தரவு எங்கள் பொறுப்பு')}</span>
            </div>
          </div>

          <div className="feature-badge-card green">
            <div className="badge-icon-box">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div className="badge-info">
              <span className="badge-title">{t('badge_speed_title', 'வேகமான செயல்பாடு')}</span>
              <span className="badge-desc">{t('badge_speed_desc', 'நவீன தொழில்நுட்பம்')}</span>
            </div>
          </div>

          <div className="feature-badge-card purple">
            <div className="badge-icon-box">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <div className="badge-info">
              <span className="badge-title">{t('badge_purpose_title', 'தமிழுக்காக')}</span>
              <span className="badge-desc">{t('badge_purpose_desc', 'உலகளாவிய அணுகல்')}</span>
            </div>
          </div>
        </section>
      </div>

      {/* RIGHT SIDEBAR COLUMN */}
      <div className="side-column">
        {/* 1. KEY STATISTICS CARD */}
        <section className="stats-card-container">
          <h2 className="stats-header-title">
            <svg className="stat-h-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            <span>{t('stats_title', 'முக்கிய எண்ணிக்கைகள்')}</span>
          </h2>

          {/* Stat 1: Registered Users */}
          <div className="stat-item-row">
            <div className="stat-left-group">
              <div className="stat-icon-wrapper purple">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="stat-meta">
                <span className="stat-label">{t('stat_registered_users', 'பதிவு செய்த பயனர்கள்')}</span>
                <span className="stat-value">{t('stat_registered_count', '1,248')}</span>
              </div>
            </div>
            <span className="stat-trend-badge">{t('stat_registered_trend', '+ 12%')}</span>
          </div>

          {/* Stat 2: Site Visitors */}
          <div className="stat-item-row">
            <div className="stat-left-group">
              <div className="stat-icon-wrapper green">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <div className="stat-meta">
                <span className="stat-label">{t('stat_site_visitors', 'தளம் திறந்தவர்கள்')}</span>
                <span className="stat-value">{t('stat_visitors_count', '8,932')}</span>
              </div>
            </div>
            <span className="stat-trend-badge">{t('stat_visitors_trend', '+ 18%')}</span>
          </div>

          {/* Stat 3: Active Users */}
          <div className="stat-item-row">
            <div className="stat-left-group">
              <div className="stat-icon-wrapper blue">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
              </div>
              <div className="stat-meta">
                <span className="stat-label">{t('stat_active_users', 'இணைந்த பயனர்கள்')}</span>
                <span className="stat-value">{t('stat_active_count', '236')}</span>
              </div>
            </div>
            <span className="stat-trend-badge">{t('stat_active_trend', '+ 6%')}</span>
          </div>
        </section>

        {/* 2. RECENT ACTIVITIES CARD */}
        <section className="activities-card">
          <div className="activities-header">
            <h2 className="act-title-text">
              <svg className="act-h-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{t('activity_title', 'சமீபத்திய செயல்பாடுகள்')}</span>
            </h2>
            <Link to="/reports" className="act-view-all-link">
              <span>{t('activity_view_all', 'அனைத்தும்')}</span> &gt;
            </Link>
          </div>

          <div className="activities-list">
            <div className="activity-row">
              <div className="act-left">
                <div className="act-icon-circle green">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div className="act-info">
                  <span className="act-title">{t('act_1_title', 'புதிய பயனர் பதிவு செய்தார்')}</span>
                  <span className="act-desc">{t('act_1_desc', 'saravanan123@example.com')}</span>
                </div>
              </div>
              <div className="act-right">
                <span className="act-time">{t('act_1_time', '09:42 AM')}</span>
                <span className="act-chevron">&gt;</span>
              </div>
            </div>

            <div className="activity-row">
              <div className="act-left">
                <div className="act-icon-circle purple">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                </div>
                <div className="act-info">
                  <span className="act-title">{t('act_2_title', 'AI கருவி பயன்படுத்தப்பட்டது')}</span>
                  <span className="act-desc">{t('act_2_desc', 'தமிழ் உரை உருவாக்கம்')}</span>
                </div>
              </div>
              <div className="act-right">
                <span className="act-time">{t('act_2_time', '08:58 AM')}</span>
                <span className="act-chevron">&gt;</span>
              </div>
            </div>

            <div className="activity-row">
              <div className="act-left">
                <div className="act-icon-circle blue">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
                <div className="act-info">
                  <span className="act-title">{t('act_3_title', 'புதிய உள்ளடக்கம் சேர்க்கப்பட்டது')}</span>
                  <span className="act-desc">{t('act_3_desc', 'வீடியோ கருவிகள்')}</span>
                </div>
              </div>
              <div className="act-right">
                <span className="act-time">{t('act_3_time', '08:21 AM')}</span>
                <span className="act-chevron">&gt;</span>
              </div>
            </div>

            <div className="activity-row">
              <div className="act-left">
                <div className="act-icon-circle teal">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line></svg>
                </div>
                <div className="act-info">
                  <span className="act-title">{t('act_4_title', 'தளம் திறந்தது')}</span>
                  <span className="act-desc">{t('act_4_desc', 'பயனர் முகப்பு - தமிழ்')}</span>
                </div>
              </div>
              <div className="act-right">
                <span className="act-time">{t('act_4_time', '07:45 AM')}</span>
                <span className="act-chevron">&gt;</span>
              </div>
            </div>

            <div className="activity-row">
              <div className="act-left">
                <div className="act-icon-circle orange">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </div>
                <div className="act-info">
                  <span className="act-title">{t('act_5_title', 'அமைப்பு மாற்றம்')}</span>
                  <span className="act-desc">{t('act_5_desc', 'மொழி அமைப்பு - தமிழ்')}</span>
                </div>
              </div>
              <div className="act-right">
                <span className="act-time">{t('act_5_time', '07:30 AM')}</span>
                <span className="act-chevron">&gt;</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BOTTOM PROMO CARD */}
        <section className="promo-card">
          <div className="promo-top-content">
            <h3 className="promo-title-text">{t('promo_title', 'தமிழ் பேசும் AI உலகம்...')}</h3>
            <p className="promo-desc-text">{t('promo_desc', 'நாம் சேர்ந்து உருவாக்குவோம் ஒரு சிறந்த எதிர்காலத்தை!')}</p>
            <Link to="/ai-tools" className="promo-btn">
              <span>{t('promo_btn', 'AI கருவிகளுக்கு செல்ல')}</span>
              <span>→</span>
            </Link>
          </div>
          <div className="promo-robot-img-box">
            <img src="assets/images/robot-promo.jpg" alt="Promo Robot" className="promo-robot-img" />
          </div>
        </section>
      </div>
    </div>
  );
}
