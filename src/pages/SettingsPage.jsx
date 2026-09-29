import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function SettingsPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  // 1. General Settings State
  const [siteName, setSiteName] = useState(lang === 'ta' ? 'தமிழி AI மையம்' : 'THAMILI AI Hub');
  const [adminEmail, setAdminEmail] = useState('admin@thamili.ai');
  const [defaultLang, setDefaultLang] = useState('ta');
  const [timeZone, setTimeZone] = useState('Asia/Kolkata');

  // 2. AI Configuration State
  const [aiModel, setAiModel] = useState('gemini-1.5-flash');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState('4096');
  const [defaultPromptBehavior, setDefaultPromptBehavior] = useState('balanced');

  // 3. Security Settings State
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('60');
  const [ipRestricted, setIpRestricted] = useState(false);

  // 4. API Management State
  const [apiKey, setApiKey] = useState('thamili_sk_live_938472918402acde99128');
  const [showApiKey, setShowApiKey] = useState(false);

  // 5. System & Backup State
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // 6. Notifications State
  const [notifSystem, setNotifSystem] = useState(true);
  const [notifUsers, setNotifUsers] = useState(true);
  const [notifAiUsage, setNotifAiUsage] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast(lang === 'ta' ? 'அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன!' : 'Settings updated and saved successfully!', 'success');
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    showToast(lang === 'ta' ? 'API சாவி நகலெடுக்கப்பட்டது!' : 'API Key copied to clipboard!', 'info');
  };

  const handleClearCache = () => {
    showToast(lang === 'ta' ? 'கணினி நினைவகம் (Cache) அழிக்கப்பட்டது!' : 'System cache cleared successfully!', 'success');
  };

  return (
    <>
      {/* Page Hero Banner */}
      <section className="page-hero-banner" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)' }}>
        <div className="page-title-group">
          <h1 className="page-main-heading">{t('settings_title', 'System & AI Settings')}</h1>
          <p className="page-subheading">{t('settings_subtitle', 'Configure administration parameters, AI model engines, security, and API integrations.')}</p>
        </div>
        <button className="page-hero-action-btn" onClick={handleSaveSettings}>
          <span>💾</span> <span>{t('btn_save_settings', 'Save Changes')}</span>
        </button>
      </section>

      <form onSubmit={handleSaveSettings}>
        <div className="dashboard-grid">
          {/* LEFT / MAIN COLUMN */}
          <div className="main-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 1. GENERAL SETTINGS */}
            <section className="page-card">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <span>⚙️</span> <span>{t('sec_general', 'General Settings')}</span>
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">{t('lbl_site_name', 'Site Name')}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('lbl_admin_email', 'Admin Email')}</label>
                  <input
                    type="email"
                    className="form-input"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('lbl_default_lang', 'Default Language')}</label>
                  <select
                    className="form-select"
                    value={defaultLang}
                    onChange={(e) => setDefaultLang(e.target.value)}
                  >
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="en">English (ஆங்கிலம்)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('lbl_timezone', 'Time Zone')}</label>
                  <select
                    className="form-select"
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                    <option value="Asia/Colombo">Asia/Colombo (+5:30)</option>
                    <option value="Asia/Singapore">Asia/Singapore (SGT +8:00)</option>
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 2. AI CONFIGURATION */}
            <section className="page-card">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <span>🤖</span> <span>{t('sec_ai_config', 'AI Configuration')}</span>
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">{t('lbl_ai_model', 'Primary AI Model')}</label>
                  <select
                    className="form-select"
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                  >
                    <option value="gemini-1.5-flash">Google Gemini 1.5 Flash (Ultra Fast & Tamil Fluent)</option>
                    <option value="gpt-4o-mini">OpenAI GPT-4o Mini (High Intelligence)</option>
                    <option value="llama-3.1-8b">Groq Llama 3.1 8B Instant (Low Latency)</option>
                    <option value="thamili-native-engine">THAMILI Native Offline Neural Engine</option>
                  </select>
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label className="form-label" style={{ margin: 0 }}>
                      {t('lbl_temperature', 'Response Creativity (Temperature)')}: <strong>{temperature}</strong>
                    </label>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{t('lbl_temp_desc', '0.0 Precise — 1.0 Creative')}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">{lang === 'ta' ? 'அதிகபட்ச டோக்கன்கள்' : 'Max Output Tokens'}</label>
                    <select
                      className="form-select"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                    >
                      <option value="2048">2,048 Tokens</option>
                      <option value="4096">4,096 Tokens</option>
                      <option value="8192">8,192 Tokens</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{lang === 'ta' ? 'இயல்புநிலை AI நடத்தை' : 'AI Behavior Mode'}</label>
                    <select
                      className="form-select"
                      value={defaultPromptBehavior}
                      onChange={(e) => setDefaultPromptBehavior(e.target.value)}
                    >
                      <option value="balanced">{lang === 'ta' ? 'சமச்சீர் (Balanced)' : 'Balanced'}</option>
                      <option value="precise">{lang === 'ta' ? 'துல்லியமான (Strict & Concise)' : 'Strict & Concise'}</option>
                      <option value="creative">{lang === 'ta' ? 'படைப்பாற்றல் (Creative & Detailed)' : 'Creative & Detailed'}</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. SECURITY SETTINGS */}
            <section className="page-card">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <span>🛡️</span> <span>{t('sec_security', 'Security & Access')}</span>
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{t('lbl_2fa', 'Two-Factor Authentication (2FA)')}</strong>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{t('lbl_2fa_desc', 'Enhanced login security for administrator accounts')}</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={twoFactor}
                      onChange={(e) => setTwoFactor(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{t('lbl_session_timeout', 'Auto Session Timeout')}</strong>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{lang === 'ta' ? 'செயலற்ற நேரத்திற்குப் பின் தானாக வெளியேறும்' : 'Automatically log out inactive sessions'}</div>
                  </div>
                  <select
                    className="form-select"
                    style={{ width: '160px' }}
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  >
                    <option value="15">15 {lang === 'ta' ? 'நிமிடங்கள்' : 'Minutes'}</option>
                    <option value="30">30 {lang === 'ta' ? 'நிமிடங்கள்' : 'Minutes'}</option>
                    <option value="60">60 {lang === 'ta' ? 'நிமிடங்கள் (1 மணி)' : 'Minutes'}</option>
                    <option value="240">4 {lang === 'ta' ? 'மணிநேரம்' : 'Hours'}</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{lang === 'ta' ? 'IP அணுகல் கட்டுப்பாடு' : 'IP Address Restriction'}</strong>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட ஐபிக்களுக்கு மட்டும் அனுமதி' : 'Restrict administrative access to whitelisted IP addresses'}</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={ipRestricted}
                      onChange={(e) => setIpRestricted(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT / SIDE COLUMN */}
          <div className="side-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 4. API MANAGEMENT */}
            <section className="page-card">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <span>🔑</span> <span>{t('sec_api', 'API Management')}</span>
                </span>
                <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700', background: '#f0fdf4', padding: '3px 8px', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
                  ● ONLINE
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label className="form-label" style={{ margin: 0 }}>{t('lbl_api_key', 'Active API Key')}</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    className="form-input"
                    value={apiKey}
                    readOnly
                    style={{ fontFamily: 'monospace', fontSize: '12px', background: '#f8fafc' }}
                  />
                  <button
                    type="button"
                    className="ai-action-btn-pill"
                    onClick={() => setShowApiKey(!showApiKey)}
                    title={showApiKey ? 'Hide Key' : 'Show Key'}
                  >
                    {showApiKey ? '🙈' : '👁️'}
                  </button>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleCopyKey}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  📋 {lang === 'ta' ? 'API சாவியை நகலெடு' : 'Copy API Key'}
                </button>
              </div>
            </section>

            {/* 5. SYSTEM & BACKUP */}
            <section className="page-card">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <span>💾</span> <span>{t('sec_system', 'System & Backup')}</span>
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '13px' }}>{t('lbl_auto_backup', 'Automated Database Backup')}</strong>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>{t('lbl_auto_backup_desc', 'Daily scheduled cloud backups')}</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={autoBackup}
                      onChange={(e) => setAutoBackup(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                  <div>
                    <strong style={{ fontSize: '13px' }}>{t('lbl_maintenance', 'Maintenance Mode')}</strong>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>{t('lbl_maintenance_desc', 'Displays temporary notice to users')}</div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div style={{ paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                  <button
                    type="button"
                    className="ai-action-btn-pill"
                    onClick={handleClearCache}
                    style={{ width: '100%', justifyContent: 'center', background: '#f8fafc', color: '#475569' }}
                  >
                    🧹 {lang === 'ta' ? 'நினைவகம் அழி (Clear Cache)' : 'Clear System Cache'}
                  </button>
                </div>
              </div>
            </section>

            {/* 6. NOTIFICATIONS */}
            <section className="page-card">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <span>🔔</span> <span>{t('sec_notifications', 'Notifications')}</span>
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                  <span>{t('lbl_notif_system', 'System Update Notifications')}</span>
                  <input
                    type="checkbox"
                    checked={notifSystem}
                    onChange={(e) => setNotifSystem(e.target.checked)}
                  />
                </label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                  <span>{t('lbl_notif_users', 'New User Registration Alerts')}</span>
                  <input
                    type="checkbox"
                    checked={notifUsers}
                    onChange={(e) => setNotifUsers(e.target.checked)}
                  />
                </label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                  <span>{t('lbl_notif_ai', 'AI Usage Limit Alerts')}</span>
                  <input
                    type="checkbox"
                    checked={notifAiUsage}
                    onChange={(e) => setNotifAiUsage(e.target.checked)}
                  />
                </label>
              </div>
            </section>
          </div>
        </div>

        {/* Floating Save Actions Bar */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button type="submit" className="btn-primary" style={{ padding: '12px 28px', fontSize: '14px', fontWeight: '700' }}>
            💾 {t('btn_save_settings', 'Save Changes')}
          </button>
        </div>
      </form>
    </>
  );
}
