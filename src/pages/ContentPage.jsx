import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function ContentPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  const [articles, setArticles] = useState([
    { id: 1, titleKey: 'art_1_title', title: 'தமிழ் மொழியில் AI முன்னேற்றங்கள்', catKey: 'art_1_cat', category: 'கட்டுரை', date: '19 Sep 2026', statusKey: 'art_1_status', status: 'வெளியானது', isPublished: true },
    { id: 2, titleKey: 'art_2_title', title: 'இயற்கை மொழி செயலாக்கம் (NLP) வழிகாட்டி', catKey: 'art_2_cat', category: 'ஆவணம்', date: '18 Sep 2026', statusKey: 'art_2_status', status: 'வெளியானது', isPublished: true },
    { id: 3, titleKey: 'art_3_title', title: 'தமிழி AI மாதிரி குறிப்புகள்', catKey: 'art_3_cat', category: 'தொழில்நுட்பம்', date: '14 Sep 2026', statusKey: 'art_3_status', status: 'வரைவு', isPublished: false }
  ]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState('கட்டுரை');

  const handleAddArticle = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      titleKey: '',
      title: newTitle,
      catKey: '',
      category: newCat,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      statusKey: 'art_1_status',
      status: 'வெளியானது',
      isPublished: true
    };
    setArticles([item, ...articles]);
    setNewTitle('');
    setAddModalOpen(false);
    showToast(lang === 'ta' ? 'புதிய உள்ளடக்கம் வெற்றிகரமாக சேர்க்கப்பட்டது!' : 'Content added successfully!', 'success');
  };

  return (
    <>
      {/* Page Banner */}
      <section className="page-hero-banner">
        <div className="page-title-group">
          <h1 className="page-main-heading">{t('page_content_title', 'உள்ளடக்க மேலாண்மை')}</h1>
          <p className="page-subheading">{t('page_content_subtitle', 'தளத்தின் கட்டுரைகள், ஆவணங்கள் மற்றும் ஊடகக் கோப்புகள்')}</p>
        </div>
        <button className="page-hero-action-btn" onClick={() => setAddModalOpen(true)}>
          <span>+</span> <span>{t('btn_add_content', 'புதிய உள்ளடக்கம்')}</span>
        </button>
      </section>

      {/* 2-Column Content Grid */}
      <div className="dashboard-grid">
        <div className="main-column">
          <section className="page-card">
            <div className="card-header-bar">
              <div className="card-title-text">
                <span>📄</span> <span>{t('sub_content_articles', 'கட்டுரைகள் & ஆவணங்கள்')}</span> ({articles.length})
              </div>
            </div>

            <div className="data-table-wrapper">
              <table className="thamili-table">
                <thead>
                  <tr>
                    <th>{t('th_title', 'தலைப்பு')}</th>
                    <th>{t('th_category', 'பிரிவு')}</th>
                    <th>{t('th_date', 'தேதி')}</th>
                    <th>{t('th_status', 'நிலை')}</th>
                    <th>{t('th_action', 'செயல்')}</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((art) => (
                    <tr key={art.id}>
                      <td><strong>{art.titleKey ? t(art.titleKey, art.title) : art.title}</strong></td>
                      <td><span>{art.catKey ? t(art.catKey, art.category) : art.category}</span></td>
                      <td>{art.date}</td>
                      <td>
                        <span className={`status-pill ${art.isPublished ? 'active' : 'inactive'}`}>
                          <span className="status-dot"></span>
                          <span>{t(art.statusKey, art.status)}</span>
                        </span>
                      </td>
                      <td>
                        <button
                          className="action-icon-btn"
                          title="View"
                          onClick={() => showToast(lang === 'ta' ? 'உள்ளடக்கம் திறக்கப்பட்டது' : 'Content viewed', 'info')}
                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Side Column: Media files */}
        <div className="side-column">
          <section className="page-card">
            <div className="card-header-bar">
              <div className="card-title-text">
                <span>📁</span> <span>{t('sub_content_media', 'ஊடகக் கோப்புகள்')}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
                <span>🌄 hero-banner.jpg</span>
                <strong>1.2 MB</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
                <span>🤖 robot-mascot.png</span>
                <strong>840 KB</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
                <span>🏛️ gopuram-watermark.svg</span>
                <strong>45 KB</strong>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Add Content Modal */}
      {addModalOpen && (
        <div className="modal-overlay active" onClick={() => setAddModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t('btn_add_content', 'புதிய உள்ளடக்கம்')}</h3>
              <button className="modal-close-btn" onClick={() => setAddModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddArticle}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">{t('th_title', 'தலைப்பு')}</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="Enter title..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('th_category', 'பிரிவு')}</label>
                  <select
                    className="form-select"
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                  >
                    <option value="கட்டுரை">{t('art_1_cat', 'கட்டுரை')}</option>
                    <option value="ஆவணம்">{t('art_2_cat', 'ஆவணம்')}</option>
                    <option value="தொழில்நுட்பம்">{t('art_3_cat', 'தொழில்நுட்பம்')}</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn-primary">{t('btn_save', 'சேமிக்கவும்')}</button>
                <button type="button" className="btn-secondary" onClick={() => setAddModalOpen(false)}>
                  {t('btn_cancel', 'ரத்து செய்')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
