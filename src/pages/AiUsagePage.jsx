import React from 'react';
import { useI18n } from '../context/I18nContext';
import UsageChart from '../components/common/UsageChart';

export default function AiUsagePage() {
  const { t } = useI18n();

  return (
    <>
      {/* Page Banner */}
      <section className="page-hero-banner" id="stats">
        <div className="page-title-group">
          <h1 className="page-main-heading">{t('page_ai_usage_title', 'AI பயன்பாடு & செயல்பாடுகள்')}</h1>
          <p className="page-subheading">{t('page_ai_usage_subtitle', 'தளத்தின் AI பயன்பாட்டு பகுப்பாய்வு மற்றும் நிகழ்நேர புள்ளிவிவரங்கள்')}</p>
        </div>
      </section>

      {/* 5 Summary KPI Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="stat-item-row" style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="stat-meta">
            <span className="stat-label">{t('stat_total_requests', 'மொத்த AI கோரிக்கைகள்')}</span>
            <span className="stat-value">{t('stat_total_requests_val', '1,48,920')}</span>
          </div>
          <span className="stat-trend-badge">{t('stat_total_requests_trend', '+ 24%')}</span>
        </div>

        <div className="stat-item-row" style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="stat-meta">
            <span className="stat-label">{t('stat_active_ai_users', 'செயலில் உள்ள பயனர்கள்')}</span>
            <span className="stat-value">{t('stat_active_ai_users_val', '842')}</span>
          </div>
          <span className="stat-trend-badge">{t('stat_active_ai_users_trend', '+ 15%')}</span>
        </div>

        <div className="stat-item-row" style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="stat-meta">
            <span className="stat-label">{t('stat_most_used_tool', 'அதிகம் பயன்படுத்தப்பட்ட AI கருவி')}</span>
            <span className="stat-value" style={{ fontSize: '15px', color: '#1e3a8a' }}>{t('stat_most_used_tool_val', 'AI முகவர்')}</span>
          </div>
          <span className="stat-trend-badge" style={{ background: '#e0f2fe', color: '#0284c7' }}>★ Top</span>
        </div>

        <div className="stat-item-row" style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="stat-meta">
            <span className="stat-label">{t('stat_today_usage', 'இன்றைய AI பயன்பாடு')}</span>
            <span className="stat-value">{t('stat_today_usage_val', '14,250')}</span>
          </div>
          <span className="stat-trend-badge">{t('stat_today_usage_trend', '+ 8%')}</span>
        </div>

        <div className="stat-item-row" style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="stat-meta">
            <span className="stat-label">{t('stat_weekly_usage', 'வாராந்திர AI பயன்பாடு')}</span>
            <span className="stat-value">{t('stat_weekly_usage_val', '98,400')}</span>
          </div>
          <span className="stat-trend-badge">{t('stat_weekly_usage_trend', '+ 19%')}</span>
        </div>
      </section>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Main Column: Usage Chart & Tool Breakdown */}
        <div className="main-column">
          {/* 7-Day Usage Chart */}
          <UsageChart />

          {/* AI Tools Breakdown Table */}
          <section className="page-card" id="tools">
            <div className="card-header-bar">
              <div className="card-title-text">
                <span>📊</span> <span>{t('ai_tool_breakdown_title', 'AI கருவிகள் பயன்பாட்டு புள்ளிவிவரங்கள்')}</span>
              </div>
            </div>
            <div className="data-table-wrapper">
              <table className="thamili-table">
                <thead>
                  <tr>
                    <th>{t('th_tool_name', 'AI கருவியின் பெயர்')}</th>
                    <th>{t('th_usage_count', 'பயன்பாடு எண்ணிக்கை')}</th>
                    <th>{t('th_share', 'பங்கு சதவீதம்')}</th>
                    <th>{t('th_performance', 'செயல்திறன்')}</th>
                    <th>{t('th_status', 'நிலை')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>💬 <span>{t('tool_chat', 'AI முகவர்')}</span></strong></td>
                    <td>68,400</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '46%', height: '100%', background: '#2563eb' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>46%</span>
                      </div>
                    </td>
                    <td>⚡ 120 ms</td>
                    <td><span className="status-pill active"><span className="status-dot"></span> <span>{t('status_active', 'செயலில் உள்ளது')}</span></span></td>
                  </tr>
                  <tr>
                    <td><strong>🖼️ <span>{t('tool_image', 'பட உருவாக்கம்')}</span></strong></td>
                    <td>34,120</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '23%', height: '100%', background: '#0284c7' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>23%</span>
                      </div>
                    </td>
                    <td>⚡ 1.8 s</td>
                    <td><span className="status-pill active"><span className="status-dot"></span> <span>{t('status_active', 'செயலில் உள்ளது')}</span></span></td>
                  </tr>
                  <tr>
                    <td><strong>🎬 <span>{t('tool_video', 'வீடியோ கருவிகள்')}</span></strong></td>
                    <td>18,900</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '13%', height: '100%', background: '#8b5cf6' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>13%</span>
                      </div>
                    </td>
                    <td>⚡ 3.2 s</td>
                    <td><span className="status-pill active"><span className="status-dot"></span> <span>{t('status_active', 'செயலில் உள்ளது')}</span></span></td>
                  </tr>
                  <tr>
                    <td><strong>💻 <span>{t('tool_code', 'பொதுத் தேடல்')}</span></strong></td>
                    <td>15,200</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '10%', height: '100%', background: '#10b981' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>10%</span>
                      </div>
                    </td>
                    <td>⚡ 240 ms</td>
                    <td><span className="status-pill active"><span className="status-dot"></span> <span>{t('status_active', 'செயலில் உள்ளது')}</span></span></td>
                  </tr>
                  <tr>
                    <td><strong>🎙️ <span>{t('tool_audio', 'ஆடியோ கருவிகள்')}</span></strong></td>
                    <td>12,300</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '8%', height: '100%', background: '#f59e0b' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>8%</span>
                      </div>
                    </td>
                    <td>⚡ 450 ms</td>
                    <td><span className="status-pill active"><span className="status-dot"></span> <span>{t('status_active', 'செயலில் உள்ளது')}</span></span></td>
                  </tr>
                  <tr>
                    <td><strong>📝 <span>{t('tool_content', 'ஆராய்ச்சி')}</span></strong></td>
                    <td>9,800</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '7%', height: '100%', background: '#ec4899' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>7%</span>
                      </div>
                    </td>
                    <td>⚡ 180 ms</td>
                    <td><span className="status-pill active"><span className="status-dot"></span> <span>{t('status_active', 'செயலில் உள்ளது')}</span></span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Side Column: Recent Activity */}
        <div className="side-column">
          <section className="page-card" id="activity">
            <div className="card-header-bar">
              <div className="card-title-text">
                <span>⚡</span> <span>{t('ai_recent_activity_title', 'சமீபத்திய AI செயல்பாடுகள்')}</span>
              </div>
            </div>
            <div className="activity-timeline-list" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="activity-row" style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>💬</span>
                <div style={{ flex: 1 }}>
                  <strong className="act-title" style={{ fontSize: '13px', color: '#1e293b', display: 'block' }}>{t('act_ai_chat_user', 'பயனர் AI முகவரைப் பயன்படுத்தினார்')}</strong>
                  <span className="act-desc" style={{ fontSize: '12px', color: '#64748b' }}>saravanan@example.com</span>
                </div>
                <span className="act-time" style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{t('time_just_now', 'சற்று முன்')}</span>
              </div>

              <div className="activity-row" style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>🖼️</span>
                <div style={{ flex: 1 }}>
                  <strong className="act-title" style={{ fontSize: '13px', color: '#1e293b', display: 'block' }}>{t('act_ai_image_user', 'பயனர் ஒரு புதிய படத்தை உருவாக்கினார்')}</strong>
                  <span className="act-desc" style={{ fontSize: '12px', color: '#64748b' }}>priya.s@example.com</span>
                </div>
                <span className="act-time" style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{t('time_2m_ago', '2 நிமிடங்களுக்கு முன்')}</span>
              </div>

              <div className="activity-row" style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>🎬</span>
                <div style={{ flex: 1 }}>
                  <strong className="act-title" style={{ fontSize: '13px', color: '#1e293b', display: 'block' }}>{t('act_ai_video_user', 'பயனர் வீடியோ கருவியைப் பயன்படுத்தினார்')}</strong>
                  <span className="act-desc" style={{ fontSize: '12px', color: '#64748b' }}>karthik.b@example.com</span>
                </div>
                <span className="act-time" style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{t('time_5m_ago', '5 நிமிடங்களுக்கு முன்')}</span>
              </div>

              <div className="activity-row" style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>💻</span>
                <div style={{ flex: 1 }}>
                  <strong className="act-title" style={{ fontSize: '13px', color: '#1e293b', display: 'block' }}>{t('act_ai_code_user', 'பயனர் பொதுத் தேடலைப் பயன்படுத்தினார்')}</strong>
                  <span className="act-desc" style={{ fontSize: '12px', color: '#64748b' }}>developer@thamili.ai</span>
                </div>
                <span className="act-time" style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{t('time_12m_ago', '12 நிமிடங்களுக்கு முன்')}</span>
              </div>

              <div className="activity-row" style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>🎙️</span>
                <div style={{ flex: 1 }}>
                  <strong className="act-title" style={{ fontSize: '13px', color: '#1e293b', display: 'block' }}>{t('act_ai_audio_user', 'பயனர் ஆடியோ கருவியைப் பயன்படுத்தினார்')}</strong>
                  <span className="act-desc" style={{ fontSize: '12px', color: '#64748b' }}>anitha.r@example.com</span>
                </div>
                <span className="act-time" style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{t('time_25m_ago', '25 நிமிடங்களுக்கு முன்')}</span>
              </div>

              <div className="activity-row" style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>📝</span>
                <div style={{ flex: 1 }}>
                  <strong className="act-title" style={{ fontSize: '13px', color: '#1e293b', display: 'block' }}>{t('act_ai_content_user', 'பயனர் ஆராய்ச்சியைப் பயன்படுத்தினார்')}</strong>
                  <span className="act-desc" style={{ fontSize: '12px', color: '#64748b' }}>researcher@thamili.ai</span>
                </div>
                <span className="act-time" style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{t('time_35m_ago', '35 நிமிடங்களுக்கு முன்')}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
