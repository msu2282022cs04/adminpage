import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function CreditsSubscriptionPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('credits'); // 'credits' | 'subscriptions'

  // Credits Data State
  const [creditMetrics] = useState({
    totalAllocated: '10,000',
    usedToday: '1,420',
    remaining: '8,580',
    activeUsers: '248'
  });

  const [recentCreditActivity] = useState([
    { id: 1, user: 'சரவணன் முத்துக்குமார்', userEn: 'Saravanan Muthukumar', email: 'saravanan123@example.com', tool: 'AI முகவர் (AI Agent)', toolEn: 'AI Agent', credits: '1 Token', time: 'Today, 09:42 AM', status: 'Success' },
    { id: 2, user: 'பிரியா சுந்தர்ராஜ்', userEn: 'Priya Sundarraj', email: 'priya.sundar@example.com', tool: 'பட உருவாக்கம் (Image Generation)', toolEn: 'Image Generation', credits: '2 Tokens', time: 'Today, 08:58 AM', status: 'Success' },
    { id: 3, user: 'கார்த்திக் பாலமுருகன்', userEn: 'Karthik Balamurugan', email: 'karthik.b@example.com', tool: 'பொதுத் தேடல் (General Search)', toolEn: 'General Search', credits: '2 Tokens', time: 'Today, 08:21 AM', status: 'Success' },
    { id: 4, user: 'அனிதா இராமலிங்கம்', userEn: 'Anitha Ramalingam', email: 'anitha.ram@example.com', tool: 'காணொளிக் கருவிகள் (Video Tools)', toolEn: 'Video Tools', credits: '5 Tokens', time: 'Yesterday, 05:40 PM', status: 'Success' },
    { id: 5, user: 'தினேஷ் குமார்', userEn: 'Dinesh Kumar', email: 'dinesh.k@example.com', tool: 'ஒலிக் கருவிகள் (Audio Tools)', toolEn: 'Audio Tools', credits: '1 Token', time: 'Yesterday, 03:15 PM', status: 'Success' },
    { id: 6, user: 'கவிதா செல்வம்', userEn: 'Kavitha Selvam', email: 'kavitha.s@example.com', tool: 'ஆராய்ச்சி (Research)', toolEn: 'Research', credits: '1 Token', time: 'Yesterday, 01:20 PM', status: 'Success' }
  ]);

  // Subscriptions Data State
  const [subMetrics] = useState({
    totalSubscribers: '1,248',
    activeSubs: '1,180',
    expiredSubs: '68',
    proPlans: '840'
  });

  const [subscriptionsList, setSubscriptionsList] = useState([
    { id: 1, user: 'சரவணன் முத்துக்குமார்', userEn: 'Saravanan Muthukumar', email: 'saravanan123@example.com', plan: 'Pro Monthly', startDate: '01 Sep 2026', expiryDate: '01 Oct 2026', status: 'active' },
    { id: 2, user: 'பிரியா சுந்தர்ராஜ்', userEn: 'Priya Sundarraj', email: 'priya.sundar@example.com', plan: 'Enterprise Annual', startDate: '15 Jan 2026', expiryDate: '15 Jan 2027', status: 'active' },
    { id: 3, user: 'கார்த்திக் பாலமுருகன்', userEn: 'Karthik Balamurugan', email: 'karthik.b@example.com', plan: 'Free Starter', startDate: '15 Sep 2026', expiryDate: '15 Oct 2026', status: 'active' },
    { id: 4, user: 'அனிதா இராமலிங்கம்', userEn: 'Anitha Ramalingam', email: 'anitha.ram@example.com', plan: 'Pro Monthly', startDate: '10 Aug 2026', expiryDate: '10 Sep 2026', status: 'expired' },
    { id: 5, user: 'தினேஷ் குமார்', userEn: 'Dinesh Kumar', email: 'dinesh.k@example.com', plan: 'Free Starter', startDate: '01 Aug 2026', expiryDate: '01 Sep 2026', status: 'expired' }
  ]);

  const [selectedSub, setSelectedSub] = useState(null);

  const handleRenewSub = (id) => {
    setSubscriptionsList(subscriptionsList.map(s => {
      if (s.id === id) {
        showToast(lang === 'ta' ? 'சந்தா வெற்றிகரமாக புதுப்பிக்கப்பட்டது!' : 'Subscription renewed successfully!', 'success');
        return { ...s, status: 'active', expiryDate: '01 Nov 2026' };
      }
      return s;
    }));
  };

  return (
    <>
      {/* Page Hero Banner */}
      <section className="page-hero-banner" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)' }}>
        <div className="page-title-group">
          <h1 className="page-main-heading">{t('page_credits_sub_title', 'Credits & Subscription Management')}</h1>
          <p className="page-subheading">{t('page_credits_sub_subtitle', 'Manage AI token credits, daily allocations, and subscription plans.')}</p>
        </div>
      </section>

      {/* Mode Navigation Tabs */}
      <div style={{ marginBottom: '20px' }}>
        <div className="ai-mode-selector" style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '6px' }}>
          <button
            className={`ai-mode-pill ${activeTab === 'credits' ? 'active' : ''}`}
            onClick={() => setActiveTab('credits')}
          >
            🪙 {t('tab_credits', 'Credits')}
          </button>
          <button
            className={`ai-mode-pill ${activeTab === 'subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscriptions')}
          >
            💳 {t('tab_subscriptions', 'Subscriptions')}
          </button>
        </div>
      </div>

      {/* TAB 1: CREDITS MANAGEMENT */}
      {activeTab === 'credits' && (
        <>
          {/* Summary Metric Cards */}
          <div className="credit-summary-grid">
            <div className="credit-summary-card">
              <div className="credit-summary-icon-box blue">🪙</div>
              <div className="credit-summary-info">
                <span className="credit-summary-val">{creditMetrics.totalAllocated}</span>
                <span className="credit-summary-lbl">{t('metric_total_credits', 'Total Credits Allocated')}</span>
                <span className="credit-summary-sub">{lang === 'ta' ? 'அனைத்து பயனர்களுக்கும்' : 'Across all users'}</span>
              </div>
            </div>

            <div className="credit-summary-card">
              <div className="credit-summary-icon-box orange">⚡</div>
              <div className="credit-summary-info">
                <span className="credit-summary-val">{creditMetrics.usedToday}</span>
                <span className="credit-summary-lbl">{t('metric_credits_used_today', 'Credits Used Today')}</span>
                <span className="credit-summary-sub">{lang === 'ta' ? '14.2% ஒதுக்கீட்டில்' : '14.2% of daily cap'}</span>
              </div>
            </div>

            <div className="credit-summary-card">
              <div className="credit-summary-icon-box green">✅</div>
              <div className="credit-summary-info">
                <span className="credit-summary-val">{creditMetrics.remaining}</span>
                <span className="credit-summary-lbl">{t('metric_credits_remaining', 'Credits Available')}</span>
                <span className="credit-summary-sub">{lang === 'ta' ? '85.8% தயாராக உள்ளது' : '85.8% balance available'}</span>
              </div>
            </div>

            <div className="credit-summary-card">
              <div className="credit-summary-icon-box purple">👥</div>
              <div className="credit-summary-info">
                <span className="credit-summary-val">{creditMetrics.activeUsers}</span>
                <span className="credit-summary-lbl">{lang === 'ta' ? 'செயலில் உள்ள நுகர்வோர்' : 'Active Consumers'}</span>
                <span className="credit-summary-sub">{lang === 'ta' ? '+18 இன்று புதியவர்கள்' : '+18 new users today'}</span>
              </div>
            </div>
          </div>

          {/* Recent Credit Activity Table */}
          <section className="page-card">
            <div className="card-header-bar">
              <span className="card-title-text">
                <span>🕒</span>
                <span>{t('recent_credit_activity', 'Recent Credit Activity')}</span>
              </span>
            </div>

            <div className="data-table-wrapper">
              <table className="thamili-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('th_user', 'User')}</th>
                    <th>{t('th_tool', 'AI Tool')}</th>
                    <th>{t('th_credits_used', 'Credits Used')}</th>
                    <th>{t('th_date_time', 'Date & Time')}</th>
                    <th>{t('th_status', 'Status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCreditActivity.map((act, idx) => (
                    <tr key={act.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="user-avatar-cell">
                          <img src="assets/images/robot-avatar.jpg" className="user-thumb" alt="User" />
                          <div className="user-meta-info">
                            <span className="user-name">{lang === 'ta' ? act.user : act.userEn}</span>
                            <span className="user-email">{act.email}</span>
                          </div>
                        </div>
                      </td>
                      <td><strong>{lang === 'ta' ? act.tool : act.toolEn}</strong></td>
                      <td>
                        <span style={{ color: '#2563eb', fontWeight: '700' }}>{act.credits}</span>
                      </td>
                      <td>{act.time}</td>
                      <td>
                        <span className="status-pill active">
                          <span className="status-dot"></span>
                          <span>{act.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* TAB 2: SUBSCRIPTIONS MANAGEMENT */}
      {activeTab === 'subscriptions' && (
        <>
          {/* Subscriptions Metric Cards */}
          <div className="credit-summary-grid">
            <div className="credit-summary-card">
              <div className="credit-summary-icon-box blue">👥</div>
              <div className="credit-summary-info">
                <span className="credit-summary-val">{subMetrics.totalSubscribers}</span>
                <span className="credit-summary-lbl">{t('metric_total_subscribers', 'Total Subscribers')}</span>
                <span className="credit-summary-sub">{lang === 'ta' ? 'பதிவு செய்த உறுப்பினர்கள்' : 'Registered members'}</span>
              </div>
            </div>

            <div className="credit-summary-card">
              <div className="credit-summary-icon-box green">🌟</div>
              <div className="credit-summary-info">
                <span className="credit-summary-val">{subMetrics.activeSubs}</span>
                <span className="credit-summary-lbl">{t('metric_active_subs', 'Active Subscriptions')}</span>
                <span className="credit-summary-sub">{lang === 'ta' ? '94.5% தக்கவைப்பு விகிதம்' : '94.5% active rate'}</span>
              </div>
            </div>

            <div className="credit-summary-card">
              <div className="credit-summary-icon-box orange">⏰</div>
              <div className="credit-summary-info">
                <span className="credit-summary-val">{subMetrics.expiredSubs}</span>
                <span className="credit-summary-lbl">{t('metric_expired_subs', 'Expired Subscriptions')}</span>
                <span className="credit-summary-sub">{lang === 'ta' ? 'புதுப்பித்தல் தேவை' : 'Pending renewal'}</span>
              </div>
            </div>

            <div className="credit-summary-card">
              <div className="credit-summary-icon-box purple">💎</div>
              <div className="credit-summary-info">
                <span className="credit-summary-val">{subMetrics.proPlans}</span>
                <span className="credit-summary-lbl">{lang === 'ta' ? 'Pro / Enterprise பயனர்கள்' : 'Pro / Enterprise Users'}</span>
                <span className="credit-summary-sub">{lang === 'ta' ? 'முழுமையான அணுகல்' : 'Full access unlocked'}</span>
              </div>
            </div>
          </div>

          {/* Subscriptions Management Table */}
          <section className="page-card">
            <div className="card-header-bar">
              <span className="card-title-text">
                <span>💳</span>
                <span>{t('subscriptions_table_title', 'User Subscription List')}</span>
              </span>
            </div>

            <div className="data-table-wrapper">
              <table className="thamili-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('th_user', 'User')}</th>
                    <th>{t('th_plan', 'Subscription Plan')}</th>
                    <th>{t('th_start_date', 'Start Date')}</th>
                    <th>{t('th_expiry_date', 'Expiry Date')}</th>
                    <th>{t('th_status', 'Status')}</th>
                    <th>{t('th_actions', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionsList.map((sub, idx) => (
                    <tr key={sub.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="user-avatar-cell">
                          <img src="assets/images/robot-avatar.jpg" className="user-thumb" alt="User" />
                          <div className="user-meta-info">
                            <span className="user-name">{lang === 'ta' ? sub.user : sub.userEn}</span>
                            <span className="user-email">{sub.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '700',
                            background: sub.plan.includes('Enterprise') ? '#faf5ff' : sub.plan.includes('Pro') ? '#eff6ff' : '#f8fafc',
                            color: sub.plan.includes('Enterprise') ? '#7c3aed' : sub.plan.includes('Pro') ? '#1d4ed8' : '#475569',
                            border: `1px solid ${sub.plan.includes('Enterprise') ? '#d8b4fe' : sub.plan.includes('Pro') ? '#93c5fd' : '#e2e8f0'}`
                          }}
                        >
                          {sub.plan}
                        </span>
                      </td>
                      <td>{sub.startDate}</td>
                      <td>{sub.expiryDate}</td>
                      <td>
                        <span className={`status-pill ${sub.status === 'active' ? 'active' : 'inactive'}`}>
                          <span className="status-dot"></span>
                          <span>{sub.status === 'active' ? t('status_active', 'Active') : t('status_expired', 'Expired')}</span>
                        </span>
                      </td>
                      <td>
                        <div className="action-btn-group" style={{ display: 'flex', gap: '6px' }}>
                          <button
                            className="ai-action-btn-pill"
                            onClick={() => setSelectedSub(sub)}
                            style={{ padding: '4px 10px', fontSize: '11.5px' }}
                          >
                            👁️ {t('btn_view_sub', 'View')}
                          </button>
                          {sub.status === 'expired' && (
                            <button
                              className="ai-action-btn-pill"
                              onClick={() => handleRenewSub(sub.id)}
                              style={{ padding: '4px 10px', fontSize: '11.5px', background: '#f0fdf4', color: '#16a34a', borderColor: '#bbf7d0' }}
                            >
                              🔄 {lang === 'ta' ? 'புதுப்பி' : 'Renew'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* Subscription View Modal */}
      {selectedSub && (
        <div className="modal-overlay active" onClick={() => setSelectedSub(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">💳 {lang === 'ta' ? 'சந்தா விவரங்கள்' : 'Subscription Details'}</h3>
              <button className="modal-close-btn" onClick={() => setSelectedSub(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', padding: '14px', background: '#f8fafc', borderRadius: '10px' }}>
                <img src="assets/images/robot-avatar.jpg" style={{ width: '48px', height: '48px', borderRadius: '50%' }} alt="User" />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{lang === 'ta' ? selectedSub.user : selectedSub.userEn}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{selectedSub.email}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                <div><strong>{t('th_plan', 'Plan')}:</strong> {selectedSub.plan}</div>
                <div><strong>{t('th_status', 'Status')}:</strong> {selectedSub.status === 'active' ? t('status_active', 'Active') : t('status_expired', 'Expired')}</div>
                <div><strong>{t('th_start_date', 'Start Date')}:</strong> {selectedSub.startDate}</div>
                <div><strong>{t('th_expiry_date', 'Expiry Date')}:</strong> {selectedSub.expiryDate}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setSelectedSub(null)}>
                {t('btn_close', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
