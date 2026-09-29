import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function AiToolsPage() {
  const { t } = useI18n();
  const { showToast } = useToast();

  // Summary Metrics State
  const [summary, setSummary] = useState({
    total: 100,
    used: 34,
    remaining: 66,
    users: 128
  });

  // 6 Free Limits State
  const [toolLimits, setToolLimits] = useState({
    chat: { nameKey: 'tool_chat_title', icon: '💬', color: 'blue', daily: 20, monthly: 600, cost: 1, used: 4, enabled: true, unit: 'messages' },
    image: { nameKey: 'tool_image_title', icon: '🎨', color: 'green', daily: 5, monthly: 150, cost: 2, used: 2, enabled: true, unit: 'images' },
    video: { nameKey: 'tool_video_title', icon: '🎬', color: 'purple', daily: 2, monthly: 60, cost: 5, used: 1, enabled: true, unit: 'videos' },
    audio: { nameKey: 'tool_audio_title', icon: '🎙️', color: 'cyan', daily: 10, monthly: 300, cost: 1, used: 3, enabled: true, unit: 'minutes' },
    code: { nameKey: 'tool_code_title', icon: '💻', color: 'orange', daily: 10, monthly: 300, cost: 2, used: 5, enabled: true, unit: 'requests' },
    content: { nameKey: 'tool_content_title', icon: '📝', color: 'pink', daily: 15, monthly: 450, cost: 1, used: 6, enabled: true, unit: 'requests' }
  });

  // Credit Settings Form State
  const [settings, setSettings] = useState({
    dailyCredits: 100,
    monthlyCredits: 3000,
    enableCredits: true,
    rollover: false
  });

  // Manage Limit Modal State
  const [selectedToolId, setSelectedToolId] = useState(null);
  const [manageForm, setManageForm] = useState({ daily: 20, monthly: 600, cost: 1, enabled: true });

  const openManageModal = (toolId) => {
    setSelectedToolId(toolId);
    const tool = toolLimits[toolId];
    if (tool) {
      setManageForm({
        daily: tool.daily,
        monthly: tool.monthly,
        cost: tool.cost,
        enabled: tool.enabled
      });
    }
  };

  const closeManageModal = () => setSelectedToolId(null);

  const handleSaveLimitChanges = (e) => {
    e.preventDefault();
    if (!selectedToolId) return;

    setToolLimits((prev) => ({
      ...prev,
      [selectedToolId]: {
        ...prev[selectedToolId],
        daily: Number(manageForm.daily),
        monthly: Number(manageForm.monthly),
        cost: Number(manageForm.cost),
        enabled: manageForm.enabled
      }
    }));

    showToast(t('toast_limit_updated', 'இலவச வரம்பு வெற்றிகரமாக புதுப்பிக்கப்பட்டது!'), 'success');
    closeManageModal();
  };

  const handleSaveCreditSettings = (e) => {
    e.preventDefault();
    showToast(t('toast_settings_saved', 'கிரெடிட் அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன!'), 'success');
  };

  const handleResetCredits = () => {
    setSummary((prev) => ({ ...prev, used: 0, remaining: prev.total }));
    setToolLimits((prev) => {
      const reset = { ...prev };
      Object.keys(reset).forEach((k) => {
        reset[k] = { ...reset[k], used: 0 };
      });
      return reset;
    });
    showToast(t('toast_credits_reset', 'இன்றைய கிரெடிட் பயன்பாடு மீட்டமைக்கப்பட்டது!'), 'info');
  };

  const getUnitString = (tool) => {
    if (tool.unit === 'messages') return `${tool.daily} ${t('limit_unit_messages_day', 'messages/day')}`;
    if (tool.unit === 'images') return `${tool.daily} ${t('limit_unit_images_day', 'images/day')}`;
    if (tool.unit === 'videos') return `${tool.daily} ${t('limit_unit_videos_day', 'videos/day')}`;
    if (tool.unit === 'minutes') return `${tool.daily} ${t('limit_unit_minutes_day', 'minutes/day')}`;
    return `${tool.daily} ${t('limit_unit_requests_day', 'requests/day')}`;
  };

  return (
    <>
      {/* 1. HERO BANNER */}
      <section className="page-hero-banner">
        <div className="page-title-group">
          <h1 className="page-main-heading" id="pageHeading">{t('page_limits_title', 'இலவச வரம்புகள் & கிரெடிட்கள்')}</h1>
          <p className="page-subheading" id="pageSubheading">{t('page_limits_subtitle', 'பயனர்களுக்கான இலவச பயன்பாட்டு வரம்புகள் மற்றும் கிரெடிட்களை நிர்வகிக்கவும்.')}</p>
        </div>
      </section>

      {/* 2. SUMMARY CARDS (4 Cards) */}
      <div className="credit-summary-grid">
        <div className="credit-summary-card">
          <div className="credit-summary-icon-box blue"><span>💎</span></div>
          <div className="credit-summary-info">
            <span className="credit-summary-val" id="sumTotalCredits">{summary.total}</span>
            <span className="credit-summary-lbl">{t('summary_total_free_credits', 'மொத்த இலவச கிரெடிட்கள்')}</span>
            <span className="credit-summary-sub">{t('summary_desc_total', 'பயனருக்கான தினசரி ஒதுக்கீடு')}</span>
          </div>
        </div>

        <div className="credit-summary-card">
          <div className="credit-summary-icon-box orange"><span>⚡</span></div>
          <div className="credit-summary-info">
            <span className="credit-summary-val" id="sumCreditsUsed">{summary.used}</span>
            <span className="credit-summary-lbl">{t('summary_credits_used_today', 'இன்று பயன்படுத்தப்பட்ட கிரெடிட்கள்')}</span>
            <span className="credit-summary-sub">{t('summary_desc_used', 'இன்றைய மொத்த ஒதுக்கீட்டில் 34%')}</span>
          </div>
        </div>

        <div className="credit-summary-card">
          <div className="credit-summary-icon-box green"><span>🛡️</span></div>
          <div className="credit-summary-info">
            <span className="credit-summary-val" id="sumCreditsRemaining">{summary.remaining}</span>
            <span className="credit-summary-lbl">{t('summary_credits_remaining', 'மீதமுள்ள கிரெடிட்கள்')}</span>
            <span className="credit-summary-sub">{t('summary_desc_remaining', 'அனைத்து பயனர்களுக்கும் உள்ளது')}</span>
          </div>
        </div>

        <div className="credit-summary-card">
          <div className="credit-summary-icon-box purple"><span>👥</span></div>
          <div className="credit-summary-info">
            <span className="credit-summary-val" id="sumActiveUsers">{summary.users}</span>
            <span className="credit-summary-lbl">{t('summary_users_free_credits', 'இலவச கிரெடிட் பயன்படுத்தும் பயனர்கள்')}</span>
            <span className="credit-summary-sub">{t('summary_desc_users', '+12 புதிய பயனர்கள் இன்று')}</span>
          </div>
        </div>
      </div>

      {/* 3. FREE LIMIT DETAILS (6 Detailed Cards) */}
      <section className="page-card" style={{ marginBottom: '24px' }}>
        <div className="card-header-bar">
          <div className="card-title-text">
            <span>📊</span> <span>{t('section_free_limits_title', 'கருவிகள் வாரியான இலவச வரம்புகள்')}</span>
          </div>
        </div>

        <div className="free-limits-grid" id="freeLimitsCardsContainer">
          {Object.entries(toolLimits).map(([key, tool]) => {
            const pct = Math.min(100, Math.round((tool.used / (tool.daily || 1)) * 100));
            const remaining = Math.max(0, tool.daily - tool.used);
            const isAvail = tool.enabled;

            return (
              <div className="limit-card" id={`limitCard-${key}`} key={key}>
                <div className="limit-card-header">
                  <div className="limit-card-title-group">
                    <div className={`limit-tool-icon ${tool.color}`}>{tool.icon}</div>
                    <span className="limit-tool-name">{t(tool.nameKey, key)}</span>
                  </div>
                  <span className={`limit-status-pill ${isAvail ? 'available' : 'disabled'}`} id={`statusPill-${key}`}>
                    <span className="limit-status-dot"></span>
                    <span className="status-text">{isAvail ? t('status_available', 'கிடைக்கக்கூடியது') : t('status_disabled', 'முடக்கப்பட்டது')}</span>
                  </span>
                </div>

                <div className="limit-progress-section">
                  <div className="limit-progress-bar">
                    <div
                      className={`limit-progress-fill ${tool.color === 'green' ? 'green-fill' : ''}`}
                      id={`progressFill-${key}`}
                      style={{
                        width: `${pct}%`,
                        background: tool.color === 'purple' ? 'linear-gradient(90deg, #a855f7, #7c3aed)' :
                                    tool.color === 'cyan' ? 'linear-gradient(90deg, #06b6d4, #0284c7)' :
                                    tool.color === 'orange' ? 'linear-gradient(90deg, #f97316, #ea580c)' :
                                    tool.color === 'pink' ? 'linear-gradient(90deg, #ec4899, #be185d)' : undefined
                      }}
                    ></div>
                  </div>
                  <div className="limit-progress-labels">
                    <span><span>{t('card_credits_used', 'பயன்படுத்தப்பட்ட கிரெடிட்கள்')}</span>: <strong id={`progressUsedTxt-${key}`}>{tool.used}</strong></span>
                    <span id={`progressPct-${key}`}>{pct}%</span>
                  </div>
                </div>

                <div className="limit-metrics-grid">
                  <div className="limit-metric-box">
                    <span className="limit-metric-label">{t('card_free_limit', 'இலவச வரம்பு')}</span>
                    <span className="limit-metric-val" id={`limitVal-${key}`}>{getUnitString(tool)}</span>
                  </div>
                  <div className="limit-metric-box">
                    <span className="limit-metric-label">{t('card_credits_used', 'பயன்படுத்தியவை')}</span>
                    <span className="limit-metric-val" id={`usedVal-${key}`}>{tool.used} / {tool.daily}</span>
                  </div>
                  <div className="limit-metric-box">
                    <span className="limit-metric-label">{t('card_remaining_credits', 'மீதமுள்ளவை')}</span>
                    <span className="limit-metric-val" id={`remainVal-${key}`} style={{ color: '#16a34a' }}>{remaining}</span>
                  </div>
                </div>

                <button type="button" className="btn-manage-limit" onClick={() => openManageModal(key)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  <span>{t('btn_manage_limit', 'வரம்பை நிர்வகி')}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CREDIT SETTINGS SECTION */}
      <section className="page-card" style={{ marginBottom: '24px' }}>
        <div className="card-header-bar">
          <div className="card-title-text">
            <span>⚙️</span> <span>{t('section_credit_settings_title', 'கிரெடிட் அமைப்புகள்')}</span>
          </div>
        </div>

        <form id="creditSettingsForm" onSubmit={handleSaveCreditSettings}>
          <div className="credit-settings-grid">
            <div className="credit-setting-item">
              <label htmlFor="settingDailyCredits">{t('label_daily_free_credits', 'தினசரி இலவச கிரெடிட்கள்')}</label>
              <input
                type="number"
                id="settingDailyCredits"
                className="credit-setting-input"
                min="1"
                max="1000"
                value={settings.dailyCredits}
                onChange={(e) => setSettings({ ...settings, dailyCredits: Number(e.target.value) })}
                required
              />
            </div>

            <div className="credit-setting-item">
              <label htmlFor="settingMonthlyCredits">{t('label_monthly_free_credits', 'மாதாந்திர இலவச கிரெடிட்கள்')}</label>
              <input
                type="number"
                id="settingMonthlyCredits"
                className="credit-setting-input"
                min="1"
                max="30000"
                value={settings.monthlyCredits}
                onChange={(e) => setSettings({ ...settings, monthlyCredits: Number(e.target.value) })}
                required
              />
            </div>

            <div className="credit-toggle-row">
              <div className="credit-toggle-info">
                <span className="credit-toggle-title">{t('label_enable_free_credits_toggle', 'இலவச கிரெடிட்களை இயக்கு')}</span>
                <span className="credit-toggle-desc">{t('desc_enable_free_credits', 'அனைத்து பதிவுசெய்த பயனர்களுக்கும் தினசரி இலவச கிரெடிட்டுகளை வழங்கவும்')}</span>
              </div>
              <label className="switch-label">
                <input
                  type="checkbox"
                  id="settingEnableCreditsToggle"
                  checked={settings.enableCredits}
                  onChange={(e) => setSettings({ ...settings, enableCredits: e.target.checked })}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            <div className="credit-toggle-row">
              <div className="credit-toggle-info">
                <span className="credit-toggle-title">{t('label_rollover_toggle', 'கிரெடிட் ரோல்ஓவர் அனுமதி')}</span>
                <span className="credit-toggle-desc">{t('desc_rollover', 'பயன்படுத்தப்படாத இலவச கிரெடிட்களை அடுத்த நாளுக்கு எடுத்துச் செல்ல அனுமதிக்கவும்')}</span>
              </div>
              <label className="switch-label">
                <input
                  type="checkbox"
                  id="settingRolloverToggle"
                  checked={settings.rollover}
                  onChange={(e) => setSettings({ ...settings, rollover: e.target.checked })}
                />
                <span className="switch-slider"></span>
              </label>
            </div>
          </div>

          <div className="credit-settings-actions">
            <button type="button" className="btn-secondary-custom" id="btnResetCredits" onClick={handleResetCredits}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 0 0 3.2 7.2L2.5 8M2 12.5a10 10 0 0 0 18.8 4.3l.7-.8"/></svg>
              <span>{t('btn_reset_credits', 'கிரெடிட்களை மீட்டமை')}</span>
            </button>
            <button type="submit" className="btn-primary-custom" id="btnSaveCreditSettings">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>{t('btn_save_settings', 'அமைப்புகளைச் சேமி')}</span>
            </button>
          </div>
        </form>
      </section>



      {/* MANAGE LIMIT MODAL */}
      {selectedToolId && (
        <div className="modal-overlay active" id="manageLimitModal" onClick={closeManageModal}>
          <div className="modal-dialog" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title" id="manageModalTitle">{t('modal_manage_limit_title', 'இலவச வரம்பை மாற்று')}</h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{t('modal_manage_limit_subtitle', 'தேர்ந்தெடுக்கப்பட்ட AI கருவிக்கான பயன்பாட்டு ஒதுக்கீட்டை மாற்றியமைக்கவும்')}</p>
              </div>
              <button type="button" className="modal-close-btn" onClick={closeManageModal}>&times;</button>
            </div>
            <form id="manageLimitForm" onSubmit={handleSaveLimitChanges}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">{t('label_tool_name', 'AI கருவி பெயர்')}</label>
                  <input
                    type="text"
                    className="form-input"
                    readOnly
                    style={{ background: '#f8fafc', fontWeight: 600 }}
                    value={t(toolLimits[selectedToolId]?.nameKey, selectedToolId)}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">{t('label_daily_limit', 'தினசரி இலவச வரம்பு')}</label>
                    <input
                      type="number"
                      className="form-input"
                      min="0"
                      max="10000"
                      required
                      value={manageForm.daily}
                      onChange={(e) => setManageForm({ ...manageForm, daily: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('label_monthly_limit', 'மாதாந்திர இலவச வரம்பு')}</label>
                    <input
                      type="number"
                      className="form-input"
                      min="0"
                      max="300000"
                      required
                      value={manageForm.monthly}
                      onChange={(e) => setManageForm({ ...manageForm, monthly: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('label_credit_cost', 'கிரெடிட் கட்டணம் (ஒரு பயன்பாட்டிற்கு)')}</label>
                  <input
                    type="number"
                    className="form-input"
                    min="0"
                    max="100"
                    required
                    value={manageForm.cost}
                    onChange={(e) => setManageForm({ ...manageForm, cost: e.target.value })}
                  />
                </div>
                <div className="credit-toggle-row" style={{ marginTop: '4px' }}>
                  <div className="credit-toggle-info">
                    <span className="credit-toggle-title">{t('label_enable_free_limit', 'இலவச வரம்பை இயக்கு')}</span>
                    <span className="credit-toggle-desc">{t('hint_enable_limit', 'இயக்கப்பட்டால், பயனர்கள் தினசரி இலவச ஒதுக்கீட்டை அணுகலாம்')}</span>
                  </div>
                  <label className="switch-label">
                    <input
                      type="checkbox"
                      checked={manageForm.enabled}
                      onChange={(e) => setManageForm({ ...manageForm, enabled: e.target.checked })}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-profile-logout" onClick={closeManageModal}>
                  {t('btn_cancel', 'ரத்துசெய்')}
                </button>
                <button type="submit" className="btn-primary-custom">
                  {t('btn_save_changes', 'மாற்றங்களைச் சேமி')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
