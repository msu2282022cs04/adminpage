import React, { useState, useEffect } from 'react';
import { useAdminProfile } from '../../context/AdminProfileContext';
import { useI18n } from '../../context/I18nContext';
import { useToast } from '../../context/ToastContext';

export default function AdminProfileModal() {
  const {
    profile,
    updateProfile,
    activeModal,
    openModal,
    closeModal,
    formatDobDisplay,
    formatPhoneDisplay,
  } = useAdminProfile();
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  // Edit form state
  const [formData, setFormData] = useState({ ...profile });
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);

  // Password form state
  const [pwdData, setPwdData] = useState({ current: '', newPwd: '', confirmPwd: '' });

  useEffect(() => {
    if (activeModal === 'editProfileModal') {
      setFormData({ ...profile });
      setAvatarPreview(profile.avatar);
    }
  }, [activeModal, profile]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast(lang === 'ta' ? 'படத்தின் அளவு 2MB-க்கு மிகாமல் இருக்க வேண்டும்' : 'Image size exceeds 2MB limit', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      setAvatarPreview(evt.target.result);
      setFormData((prev) => ({ ...prev, avatar: evt.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (phoneClean.length !== 10) {
      showToast(t('msg_phone_invalid', 'Phone number must be 10 digits'), 'error');
      return;
    }

    updateProfile(formData);
    closeModal();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (pwdData.newPwd.length < 6) {
      showToast(lang === 'ta' ? 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்களாக இருக்க வேண்டும்' : 'Password must be at least 6 characters', 'error');
      return;
    }
    if (pwdData.newPwd !== pwdData.confirmPwd) {
      showToast(lang === 'ta' ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match', 'error');
      return;
    }
    showToast(t('toast_pwd_changed', 'Password changed successfully!'), 'success');
    setPwdData({ current: '', newPwd: '', confirmPwd: '' });
    closeModal();
  };

  const handleConfirmLogout = () => {
    showToast(t('toast_logged_out', 'Successfully logged out.'), 'info');
    closeModal();
  };

  if (!activeModal) return null;

  return (
    <>
      {/* 1. View Profile Modal */}
      {activeModal === 'profileModal' && (
        <div className="modal-overlay active" id="profileModal" onClick={closeModal}>
          <div
            className="modal-dialog admin-profile-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="admin-profile-header">
              <div className="admin-profile-header-left">
                <div className="admin-profile-header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="admin-profile-title">{t('modal_profile_title', 'நிர்வாகி சுயவிவரம்')}</h3>
              </div>
              <button className="admin-profile-close-btn" onClick={closeModal} aria-label="Close">
                &times;
              </button>
            </div>

            {/* Modal Body: 2 Columns */}
            <div className="modal-body admin-profile-body">
              <div className="admin-profile-layout">
                {/* Left Column */}
                <div className="admin-avatar-card-col">
                  <div className="admin-avatar-card">
                    <div className="admin-avatar-large-wrap">
                      <img
                        src={profile.avatar}
                        alt="Admin Avatar"
                        className="admin-avatar-large"
                        onError={(e) => { e.currentTarget.src = 'assets/images/robot-avatar.jpg'; }}
                      />
                      <span className="admin-status-indicator-badge">
                        <span className="indicator-pulse"></span>
                      </span>
                    </div>
                    <h4 className="admin-card-name">{profile.name}</h4>
                    <span className="admin-card-badge">{t('profile_role_badge', profile.role)}</span>
                    <p className="admin-card-email">{profile.email}</p>
                  </div>

                  <div className="admin-quick-specs">
                    <div className="admin-spec-row">
                      <div className="admin-spec-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="7" r="4"></circle>
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        </svg>
                      </div>
                      <div className="admin-spec-text">
                        <span className="admin-spec-label">{t('profile_admin_id', 'Admin ID')}</span>
                        <span className="admin-spec-val">{profile.adminId}</span>
                      </div>
                    </div>

                    <div className="admin-spec-row">
                      <div className="admin-spec-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </div>
                      <div className="admin-spec-text">
                        <span className="admin-spec-label">{t('label_role', 'Role')}</span>
                        <span className="admin-spec-val">{t('profile_role_badge', profile.role)}</span>
                      </div>
                    </div>

                    <div className="admin-spec-row">
                      <div className="admin-spec-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <div className="admin-spec-text">
                        <span className="admin-spec-label">{t('profile_last_login', 'Last Login')}</span>
                        <span className="admin-spec-val">{profile.lastLogin}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="admin-details-col">
                  {/* Section 1 */}
                  <div className="admin-info-section">
                    <div className="admin-section-header">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>{t('profile_personal_info', 'Personal Information')}</span>
                    </div>

                    <div className="admin-info-rows">
                      <div className="admin-info-row">
                        <span className="admin-row-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          <span>{t('label_fullname', 'Full Name')}</span>
                        </span>
                        <span className="admin-row-val">{profile.name}</span>
                      </div>

                      <div className="admin-info-row">
                        <span className="admin-row-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                          <span>{t('profile_username', 'Username')}</span>
                        </span>
                        <span className="admin-row-val">{profile.username}</span>
                      </div>

                      <div className="admin-info-row">
                        <span className="admin-row-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                          <span>{t('label_email', 'Email Address')}</span>
                        </span>
                        <span className="admin-row-val">{profile.email}</span>
                      </div>

                      <div className="admin-info-row">
                        <span className="admin-row-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                          <span>{t('profile_phone', 'Phone Number')}</span>
                        </span>
                        <span className="admin-row-val">{formatPhoneDisplay(profile.phone)}</span>
                      </div>

                      <div className="admin-info-row">
                        <span className="admin-row-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          <span>{t('profile_dob', 'Date of Birth')}</span>
                        </span>
                        <span className="admin-row-val">{formatDobDisplay(profile.dob)}</span>
                      </div>

                      <div className="admin-info-row">
                        <span className="admin-row-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                          <span>{t('profile_gender', 'Gender')}</span>
                        </span>
                        <span className="admin-row-val">
                          {profile.gender === 'Male' ? t('gender_male', 'Male') : (profile.gender === 'Female' ? t('gender_female', 'Female') : t('gender_other', 'Other'))}
                        </span>
                      </div>

                      <div className="admin-info-row">
                        <span className="admin-row-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          <span>{t('label_bio', 'Biography')}</span>
                        </span>
                        <span className="admin-row-val">{profile.bio}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="admin-info-section">
                    <div className="admin-section-header">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      <span>{t('profile_account_details', 'Account Details')}</span>
                    </div>

                    <div className="admin-info-rows">
                      <div className="admin-info-row">
                        <span className="admin-row-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          <span>{t('profile_created', 'Account Created')}</span>
                        </span>
                        <span className="admin-row-val">{profile.created}</span>
                      </div>

                      <div className="admin-info-row">
                        <span className="admin-row-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                          <span>{t('profile_status', 'Account Status')}</span>
                        </span>
                        <span className="admin-row-val">
                          <span className="admin-status-pill">
                            <span className="admin-status-dot"></span>
                            <span>{t('profile_status_active', 'Active')}</span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="admin-profile-footer">
              <button
                type="button"
                className="btn-profile-edit"
                onClick={() => openModal('editProfileModal')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span>{t('btn_edit_profile', 'Edit Profile')}</span>
              </button>
              <button
                type="button"
                className="btn-profile-pwd"
                onClick={() => openModal('changePasswordModal')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>{t('btn_change_pwd', 'Change Password')}</span>
              </button>
              <button
                type="button"
                className="btn-profile-logout"
                onClick={() => openModal('logoutModal')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>{t('btn_logout', 'Logout')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Edit Profile Modal */}
      {activeModal === 'editProfileModal' && (
        <div className="modal-overlay active" id="editProfileModal" onClick={closeModal}>
          <div
            className="modal-dialog admin-edit-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-profile-header">
              <div className="admin-profile-header-left">
                <div className="admin-profile-header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
                <h3 className="admin-profile-title">{t('modal_edit_profile_title', 'Edit Admin Profile')}</h3>
              </div>
              <button className="admin-profile-close-btn" onClick={closeModal} aria-label="Close">
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="modal-body admin-edit-body">
                {/* Photo Upload */}
                <div className="edit-photo-box">
                  <div className="edit-photo-preview-wrap">
                    <img
                      src={avatarPreview}
                      alt="Admin Preview"
                      className="edit-photo-preview"
                      onError={(e) => { e.currentTarget.src = 'assets/images/robot-avatar.jpg'; }}
                    />
                    <div className="edit-photo-meta">
                      <span className="edit-photo-title">{t('label_photo', 'Profile Photo')}</span>
                      <span className="edit-photo-hint">{t('label_photo_hint', 'JPG, PNG or SVG format (Max 2MB)')}</span>
                    </div>
                  </div>
                  <label className="btn-upload-photo" htmlFor="editAvatarFile">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span>{t('btn_change_photo', 'Change Photo')}</span>
                    <input
                      type="file"
                      id="editAvatarFile"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>

                {/* Form Fields */}
                <div className="edit-form-grid">
                  <div className="form-group-custom">
                    <label className="form-label-custom" htmlFor="editFullName">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      <span>{t('label_fullname', 'Full Name')}</span>
                    </label>
                    <input
                      type="text"
                      className="form-input-custom"
                      id="editFullName"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group-custom">
                    <label className="form-label-custom" htmlFor="editUsername">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                      <span>{t('profile_username', 'Username')}</span>
                    </label>
                    <input
                      type="text"
                      className="form-input-custom"
                      id="editUsername"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>

                  <div className="form-group-custom">
                    <label className="form-label-custom" htmlFor="editEmail">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      <span>{t('label_email', 'Email Address')}</span>
                    </label>
                    <input
                      type="email"
                      className="form-input-custom"
                      id="editEmail"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group-custom">
                    <label className="form-label-custom" htmlFor="editPhone">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      <span>{t('profile_phone', 'Phone Number')}</span>
                    </label>
                    <input
                      type="tel"
                      className="form-input-custom"
                      id="editPhone"
                      required
                      maxLength="10"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group-custom">
                    <label className="form-label-custom" htmlFor="editDob">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      <span>{t('profile_dob', 'Date of Birth')}</span>
                    </label>
                    <input
                      type="date"
                      className="form-input-custom"
                      id="editDob"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    />
                  </div>

                  <div className="form-group-custom">
                    <label className="form-label-custom" htmlFor="editGender">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                      <span>{t('profile_gender', 'Gender')}</span>
                    </label>
                    <select
                      className="form-select-custom"
                      id="editGender"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="Male">{t('gender_male', 'Male')}</option>
                      <option value="Female">{t('gender_female', 'Female')}</option>
                      <option value="Prefer not to say">{t('gender_other', 'Prefer not to say')}</option>
                    </select>
                  </div>

                  <div className="form-group-custom">
                    <label className="form-label-custom" htmlFor="editAdminId">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      <span>{t('label_admin_id', 'Admin ID')}</span>
                      <span className="form-readonly-tag">{t('readonly_tag', 'System Managed')}</span>
                    </label>
                    <input type="text" className="form-input-custom" id="editAdminId" value={formData.adminId} readOnly />
                  </div>

                  <div className="form-group-custom">
                    <label className="form-label-custom" htmlFor="editRole">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>{t('label_role', 'Role')}</span>
                      <span className="form-readonly-tag">{t('readonly_tag', 'System Managed')}</span>
                    </label>
                    <input type="text" className="form-input-custom" id="editRole" value={formData.role} readOnly />
                  </div>

                  <div className="form-group-custom edit-form-full">
                    <label className="form-label-custom" htmlFor="editBio">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      <span>{t('label_bio', 'Biography')}</span>
                    </label>
                    <textarea
                      className="form-textarea-custom"
                      rows="2"
                      id="editBio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="admin-profile-footer">
                <button type="submit" className="btn-profile-edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>{t('btn_save', 'Save Changes')}</span>
                </button>
                <button type="button" className="btn-profile-logout" onClick={closeModal}>
                  {t('btn_cancel', 'Cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Change Password Modal */}
      {activeModal === 'changePasswordModal' && (
        <div className="modal-overlay active" id="changePasswordModal" onClick={closeModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t('modal_change_pwd_title', 'கடவுச்சொல் மாற்று')}</h3>
              <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleChangePassword}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">{t('label_current_pwd', 'தற்போதைய கடவுச்சொல்')}</label>
                  <input
                    type="password"
                    className="form-input"
                    required
                    value={pwdData.current}
                    onChange={(e) => setPwdData({ ...pwdData, current: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('label_new_pwd', 'புதிய கடவுச்சொல்')}</label>
                  <input
                    type="password"
                    className="form-input"
                    required
                    minLength="6"
                    value={pwdData.newPwd}
                    onChange={(e) => setPwdData({ ...pwdData, newPwd: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('label_confirm_pwd', 'புதிய கடவுச்சொல்லை உறுதி செய்')}</label>
                  <input
                    type="password"
                    className="form-input"
                    required
                    minLength="6"
                    value={pwdData.confirmPwd}
                    onChange={(e) => setPwdData({ ...pwdData, confirmPwd: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn-primary">{t('btn_save', 'சேமிக்கவும்')}</button>
                <button type="button" className="btn-secondary" onClick={closeModal}>{t('btn_cancel', 'ரத்து செய்')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Logout Confirm Modal */}
      {activeModal === 'logoutModal' && (
        <div className="modal-overlay active" id="logoutModal" onClick={closeModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t('modal_logout_title', 'வெளியேற உறுதிப்படுத்தவும்')}</h3>
              <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '14px', color: '#475569' }}>
                {t('modal_logout_desc', 'நிர்வாக அமர்விலிருந்து வெளியேற விரும்புகிறீர்களா?')}
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-danger" onClick={handleConfirmLogout}>
                {t('btn_logout', 'வெளியேறு')}
              </button>
              <button type="button" className="btn-secondary" onClick={closeModal}>
                {t('btn_cancel', 'ரத்து செய்')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
