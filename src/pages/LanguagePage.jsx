import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function LanguagePage() {
  const { t, lang, setLanguage } = useI18n();
  const { showToast } = useToast();

  const [selectedFont, setSelectedFont] = useState('Noto Sans Tamil');

  const [terms, setTerms] = useState([
    { id: 1, en: 'Dashboard', ta: 'முகப்பு', category: 'Navigation' },
    { id: 2, en: 'User Management', ta: 'பயனர் மேலாண்மை', category: 'Accounts' },
    { id: 3, en: 'Sub Admin', ta: 'துணை நிர்வாகி', category: 'Permissions' },
    { id: 4, en: 'Artificial Intelligence', ta: 'செயற்கை நுண்ணறிவு', category: 'Core AI' },
    { id: 5, en: 'Image Generation', ta: 'பட உருவாக்கம்', category: 'AI Studio' },
    { id: 6, en: 'Credits & Subscription', ta: 'கிரெடிட்ஸ் & சந்தா', category: 'Billing' },
    { id: 7, en: 'Settings', ta: 'அமைப்புகள்', category: 'System' },
    { id: 8, en: 'Analytics & Reports', ta: 'தகவல் அறிக்கைகள்', category: 'Analytics' }
  ]);

  const [search, setSearch] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editTerm, setEditTerm] = useState(null);
  const [newTerm, setNewTerm] = useState({ en: '', ta: '', category: 'General' });

  const filteredTerms = terms.filter((item) => {
    const q = search.toLowerCase();
    return item.en.toLowerCase().includes(q) || item.ta.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  const handleAddTerm = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      en: newTerm.en.trim(),
      ta: newTerm.ta.trim(),
      category: newTerm.category
    };
    setTerms([...terms, created]);
    setNewTerm({ en: '', ta: '', category: 'General' });
    setAddModalOpen(false);
    showToast(lang === 'ta' ? 'புதிய கலைச்சொல் சேர்க்கப்பட்டது!' : 'Glossary term added successfully!', 'success');
  };

  const handleUpdateTerm = (e) => {
    e.preventDefault();
    if (!editTerm) return;
    setTerms(terms.map(t => t.id === editTerm.id ? editTerm : t));
    setEditTerm(null);
    showToast(lang === 'ta' ? 'சொல் விவரம் புதுப்பிக்கப்பட்டது!' : 'Glossary term updated!', 'success');
  };

  const handleDeleteTerm = (id) => {
    setTerms(terms.filter(t => t.id !== id));
    showToast(lang === 'ta' ? 'சொல் நீக்கப்பட்டது!' : 'Term deleted!', 'info');
  };

  return (
    <>
      {/* Page Hero Banner */}
      <section className="page-hero-banner" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)' }}>
        <div className="page-title-group">
          <h1 className="page-main-heading">{t('page_lang_title', 'Language & Typography Settings')}</h1>
          <p className="page-subheading">{t('page_lang_subtitle', 'Configure platform language preference, Tamil fonts, and glossary translation terms.')}</p>
        </div>
        <button className="page-hero-action-btn" onClick={() => setAddModalOpen(true)}>
          <span>+</span> <span>{t('btn_add_term', 'Add New Term')}</span>
        </button>
      </section>

      {/* 2-Column Responsive Layout */}
      <div className="dashboard-grid">
        {/* LEFT COLUMN: Application Language & Terminology Table */}
        <div className="main-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 1. APPLICATION LANGUAGE SELECTOR */}
          <section className="page-card">
            <div className="card-header-bar">
              <span className="card-title-text">
                <span>🌐</span> <span>{t('sec_app_language', 'Application Language')}</span>
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                {lang === 'ta' ? 'செயலில் உள்ள மொழி: தமிழ்' : 'Active Language: English'}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              {lang === 'ta'
                ? 'தளத்தின் அனைத்து மெனுக்கள், தலைப்புகள், அட்டவணைகள் மற்றும் செய்திகளுக்கான முதன்மை மொழியைத் தேர்ந்தெடுக்கவும்:'
                : 'Select the primary global display language for all menus, navigation, forms, tables, and dialogs:'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* English Card */}
              <div
                onClick={() => setLanguage('en')}
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: lang === 'en' ? '#eff6ff' : '#f8fafc',
                  border: `2px solid ${lang === 'en' ? '#2563eb' : '#e2e8f0'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: lang === 'en' ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>🇬🇧</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: lang === 'en' ? '#1d4ed8' : '#1e293b' }}>
                      English
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>Full English Dashboard UI</div>
                  </div>
                </div>
                {lang === 'en' && <span style={{ color: '#2563eb', fontSize: '18px', fontWeight: 'bold' }}>✓</span>}
              </div>

              {/* Tamil Card */}
              <div
                onClick={() => setLanguage('ta')}
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: lang === 'ta' ? '#eff6ff' : '#f8fafc',
                  border: `2px solid ${lang === 'ta' ? '#2563eb' : '#e2e8f0'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: lang === 'ta' ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>🍃</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: lang === 'ta' ? '#1d4ed8' : '#1e293b' }}>
                      தமிழ் (Tamil)
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>முழுமையான தமிழ் இடைமுகம்</div>
                  </div>
                </div>
                {lang === 'ta' && <span style={{ color: '#2563eb', fontSize: '18px', fontWeight: 'bold' }}>✓</span>}
              </div>
            </div>
          </section>

          {/* 2. TRANSLATION / TERMINOLOGY GLOSSARY */}
          <section className="page-card">
            <div className="card-header-bar">
              <span className="card-title-text">
                <span>📖</span> <span>{t('sec_terminology', 'Terminology & Translation Glossary')}</span> ({terms.length})
              </span>
              <input
                type="text"
                className="form-input"
                style={{ width: '220px', padding: '6px 12px', fontSize: '12px' }}
                placeholder={lang === 'ta' ? 'சொல்லைத் தேடுக...' : 'Search glossary term...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="data-table-wrapper">
              <table className="thamili-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('th_en_term', 'English Term')}</th>
                    <th>{t('th_ta_term', 'Tamil Translation')}</th>
                    <th>{t('th_category', 'Category')}</th>
                    <th>{t('th_actions', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTerms.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      <td><strong>{item.en}</strong></td>
                      <td><span style={{ color: '#1e40af', fontWeight: '600' }}>{item.ta}</span></td>
                      <td>
                        <span style={{ padding: '3px 8px', background: '#f1f5f9', borderRadius: '4px', fontSize: '11.5px', color: '#475569' }}>
                          {item.category}
                        </span>
                      </td>
                      <td>
                        <div className="action-btn-group" style={{ display: 'flex', gap: '6px' }}>
                          <button className="action-icon-btn" title="Edit" onClick={() => setEditTerm({ ...item })}>
                            ✏️
                          </button>
                          <button className="action-icon-btn delete" title="Delete" onClick={() => handleDeleteTerm(item.id)}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredTerms.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                        {lang === 'ta' ? 'சொற்கள் எதுவும் கிடைக்கவில்லை.' : 'No glossary terms found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: TAMIL TYPOGRAPHY */}
        <div className="side-column">
          <section className="page-card">
            <div className="card-header-bar">
              <span className="card-title-text">
                <span>🔤</span> <span>{t('sec_tamil_font', 'Primary Tamil Typography Font')}</span>
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'ta' ? 'எழுத்துரு தேர்வு' : 'Select Tamil Font Family'}</label>
              <select
                className="form-select"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
              >
                <option value="Noto Sans Tamil">Noto Sans Tamil (Google Fonts)</option>
                <option value="Mukta Malar">Mukta Malar (Google Fonts)</option>
                <option value="Pavanam">Pavanam (Modern UI)</option>
                <option value="Catamaran">Catamaran (Display)</option>
                <option value="System Default">System Default UI</option>
              </select>
            </div>

            {/* Live Typography Preview */}
            <div style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <span style={{ fontSize: '11.5px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                {lang === 'ta' ? 'எழுத்துரு மாதிரி:' : 'Typography Sample:'}
              </span>
              <p style={{ marginTop: '8px', fontSize: '15px', fontWeight: '700', color: '#0f172a', lineHeight: '1.5' }}>
                "தமிழி AI — உங்கள் தாய்மொழியில் நவீன செயற்கை நுண்ணறிவு உலகம்."
              </p>
              <p style={{ fontSize: '12.5px', color: '#475569' }}>
                The quick brown fox jumps over the lazy dog. 1234567890
              </p>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
              onClick={() => showToast(lang === 'ta' ? 'எழுத்துரு விருப்பம் வெற்றிகரமாக சேமிக்கப்பட்டது!' : 'Font preference saved successfully!', 'success')}
            >
              💾 {t('btn_save', 'Save Changes')}
            </button>
          </section>
        </div>
      </div>

      {/* Add Term Modal */}
      {addModalOpen && (
        <div className="modal-overlay active" onClick={() => setAddModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">📖 {t('modal_add_term_title', 'Add New Glossary Term')}</h3>
              <button className="modal-close-btn" onClick={() => setAddModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddTerm}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">{t('th_en_term', 'English Term')}</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Natural Language Processing"
                    value={newTerm.en}
                    onChange={(e) => setNewTerm({ ...newTerm, en: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('th_ta_term', 'Tamil Translation')}</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="எ.கா: இயற்கை மொழி செயலாக்கம்"
                    value={newTerm.ta}
                    onChange={(e) => setNewTerm({ ...newTerm, ta: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('th_category', 'Category')}</label>
                  <select
                    className="form-select"
                    value={newTerm.category}
                    onChange={(e) => setNewTerm({ ...newTerm, category: e.target.value })}
                  >
                    <option value="General">General</option>
                    <option value="Navigation">Navigation</option>
                    <option value="Core AI">Core AI</option>
                    <option value="Accounts">Accounts & Permissions</option>
                    <option value="Billing">Billing & Subscription</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn-primary">{t('btn_save', 'Save Changes')}</button>
                <button type="button" className="btn-secondary" onClick={() => setAddModalOpen(false)}>
                  {t('btn_cancel', 'Cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Term Modal */}
      {editTerm && (
        <div className="modal-overlay active" onClick={() => setEditTerm(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">✏️ {lang === 'ta' ? 'சொல் திருத்து' : 'Edit Glossary Term'}</h3>
              <button className="modal-close-btn" onClick={() => setEditTerm(null)}>&times;</button>
            </div>
            <form onSubmit={handleUpdateTerm}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">{t('th_en_term', 'English Term')}</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={editTerm.en}
                    onChange={(e) => setEditTerm({ ...editTerm, en: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('th_ta_term', 'Tamil Translation')}</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={editTerm.ta}
                    onChange={(e) => setEditTerm({ ...editTerm, ta: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('th_category', 'Category')}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editTerm.category}
                    onChange={(e) => setEditTerm({ ...editTerm, category: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn-primary">{t('btn_save', 'Save Changes')}</button>
                <button type="button" className="btn-secondary" onClick={() => setEditTerm(null)}>
                  {t('btn_cancel', 'Cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
