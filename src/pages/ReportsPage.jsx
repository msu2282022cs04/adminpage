import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';
import UsageChart from '../components/common/UsageChart';

export default function ReportsPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [reportType, setReportType] = useState('usage');

  const handleExport = (format) => {
    const filename = `thamili_${reportType}_report_${new Date().toISOString().split('T')[0]}.${format}`;
    
    let content = '';
    if (format === 'json') {
      content = JSON.stringify({
        generatedAt: new Date().toISOString(),
        reportType,
        totalRequests: 148920,
        activeUsers: 842,
        successRate: '99.94%',
        avgLatencyMs: 120
      }, null, 2);
    } else if (format === 'csv') {
      content = `Report,Type,Date,Metric,Value\nTHAMILI AI,${reportType},${new Date().toISOString()},Requests,148920\nTHAMILI AI,${reportType},${new Date().toISOString()},ActiveUsers,842\nTHAMILI AI,${reportType},${new Date().toISOString()},SuccessRate,99.94%\n`;
    } else {
      content = `THAMILI AI PLATFORM REPORT\nGenerated: ${new Date().toLocaleString()}\nType: ${reportType}\nRequests: 148,920\nSuccess Rate: 99.94%`;
    }

    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportModalOpen(false);
    showToast(lang === 'ta' ? `அறிக்கை (${format.toUpperCase()}) வெற்றிகரமாக பதிவிறக்கப்பட்டது!` : `Report exported (${format.toUpperCase()})!`, 'success');
  };

  return (
    <>
      {/* Page Banner */}
      <section className="page-hero-banner">
        <div className="page-title-group">
          <h1 className="page-main-heading">{t('page_reports_title', 'தகவல் & பயன்பாட்டு அறிக்கைகள்')}</h1>
          <p className="page-subheading">{t('page_reports_subtitle', 'தளத்தின் செயல்திறன் மற்றும் பயனர்கள் புள்ளிவிவர அறிக்கைகள்')}</p>
        </div>
        <button className="page-hero-action-btn" onClick={() => setExportModalOpen(true)}>
          <span>📥</span> <span>{t('sub_reports_export', 'பதிவிறக்கம்')}</span>
        </button>
      </section>

      {/* 2-Column Grid */}
      <div className="dashboard-grid">
        <div className="main-column">
          <UsageChart />
        </div>

        {/* Side Column: Performance stats */}
        <div className="side-column">
          <section className="stats-card-container">
            <h2 className="stats-header-title">
              <span>{t('sub_reports_perf', 'செயல்திறன் சுருக்கம்')}</span>
            </h2>

            <div className="stat-item-row">
              <div className="stat-meta">
                <span className="stat-label">{t('stat_response_time', 'AI பதிலளிப்பு நேரம்')}</span>
                <span className="stat-value">120 ms</span>
              </div>
              <span className="stat-trend-badge">{t('stat_response_val', '⚡ விரைவானது')}</span>
            </div>

            <div className="stat-item-row">
              <div className="stat-meta">
                <span className="stat-label">{t('stat_success_rate', 'வெற்றி விகிதம்')}</span>
                <span className="stat-value">99.94%</span>
              </div>
              <span className="stat-trend-badge">↑ 0.2%</span>
            </div>

            <div className="stat-item-row">
              <div className="stat-meta">
                <span className="stat-label">{t('stat_tamil_processing', 'தமிழ் உரை செயலாக்கம்')}</span>
                <span className="stat-value">{t('stat_tamil_processing_val', '4.8M / நாள்')}</span>
              </div>
              <span className="stat-trend-badge">↑ 14%</span>
            </div>
          </section>
        </div>
      </div>

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="modal-overlay active" onClick={() => setExportModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t('sub_reports_export', 'அறிக்கை பதிவிறக்கம்')}</h3>
              <button className="modal-close-btn" onClick={() => setExportModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">{t('label_report_type', 'அறிக்கை வகை')}</label>
                <select
                  className="form-select"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="usage">{t('sub_reports_ai', 'AI பயன்பாட்டு அறிக்கை')}</option>
                  <option value="users">{t('sub_reports_users', 'பயனர் புள்ளிவிவரங்கள்')}</option>
                  <option value="perf">{t('sub_reports_perf', 'செயல்திறன் சுருக்கம்')}</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => handleExport('csv')}
                >
                  📄 CSV Export
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ flex: 1, background: '#8b5cf6' }}
                  onClick={() => handleExport('json')}
                >
                  ⚡ JSON Export
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ flex: 1, background: '#0284c7' }}
                  onClick={() => handleExport('txt')}
                >
                  📑 PDF / Text
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setExportModalOpen(false)}>
                {t('btn_cancel', 'ரத்து செய்')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
