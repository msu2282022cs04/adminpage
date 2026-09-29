import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useI18n } from './I18nContext';

const AdminProfileContext = createContext();

export const DEFAULT_ADMIN_PROFILE = {
  name: "Arun Kumar",
  username: "arun@admin",
  email: "arun@example.com",
  phone: "9876543210",
  dob: "1995-04-15",
  gender: "Male",
  adminId: "ADM001",
  role: "Administrator",
  bio: "Lead administrator managing the THAMILI Tamil AI Platform ecosystem.",
  status: "Active",
  created: "01 Jan 2025, 09:12 AM",
  lastLogin: "22 Sep 2025, 10:24 AM",
  avatar: "assets/images/admin-avatar.svg"
};

export function formatDobDisplay(dobString) {
  if (!dobString) return "15 Apr 1995";
  if (dobString.includes('-')) {
    const parts = dobString.split('-');
    if (parts.length === 3) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const mIdx = parseInt(parts[1], 10) - 1;
      if (mIdx >= 0 && mIdx < 12) {
        return `${parseInt(parts[2], 10)} ${months[mIdx]} ${parts[0]}`;
      }
    }
  }
  return dobString;
}

export function formatPhoneDisplay(phone) {
  if (!phone) return "+91 98765 43210";
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return phone.startsWith('+') ? phone : `+91 ${phone}`;
}

export function AdminProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('thamili_admin_profile');
      if (raw) return { ...DEFAULT_ADMIN_PROFILE, ...JSON.parse(raw) };
    } catch (e) {}
    return { ...DEFAULT_ADMIN_PROFILE };
  });

  const [activeModal, setActiveModal] = useState(null); // 'profileModal', 'editProfileModal', 'changePwdModal', 'logoutModal', or null
  const { showToast } = useToast();
  const { t } = useI18n();

  const updateProfile = (updates) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    try {
      localStorage.setItem('thamili_admin_profile', JSON.stringify(updated));
    } catch (e) {}
    showToast(t('msg_profile_saved', 'சுயவிவர மாற்றங்கள் வெற்றிகரமாக சேமிக்கப்பட்டன!'), 'success');
  };

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <AdminProfileContext.Provider
      value={{
        profile,
        updateProfile,
        activeModal,
        openModal,
        closeModal,
        formatDobDisplay,
        formatPhoneDisplay,
      }}
    >
      {children}
    </AdminProfileContext.Provider>
  );
}

export function useAdminProfile() {
  const context = useContext(AdminProfileContext);
  if (!context) {
    throw new Error('useAdminProfile must be used within an AdminProfileProvider');
  }
  return context;
}
