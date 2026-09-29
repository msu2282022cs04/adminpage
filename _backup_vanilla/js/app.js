/**
 * THAMILI Admin Dashboard - Global App Engine & Interactivity
 */

// Toast notification manager
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-pill ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      ${type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ')}
    </div>
    <span class="toast-msg">${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Admin Profile State & Management
const DEFAULT_ADMIN_PROFILE = {
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

function getAdminProfile() {
  try {
    const raw = localStorage.getItem('thamili_admin_profile');
    if (raw) {
      return { ...DEFAULT_ADMIN_PROFILE, ...JSON.parse(raw) };
    }
  } catch (e) {}
  return { ...DEFAULT_ADMIN_PROFILE };
}

function formatDobDisplay(dobString) {
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

function formatPhoneDisplay(phone) {
  if (!phone) return "+91 98765 43210";
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return phone.startsWith('+') ? phone : `+91 ${phone}`;
}

function applyAdminProfileToDOM(profile) {
  if (!profile) profile = getAdminProfile();
  document.querySelectorAll('.admin-display-name').forEach(el => el.textContent = profile.name);
  document.querySelectorAll('#profileDisplayEmail').forEach(el => el.textContent = profile.email);
  
  const usernameEl = document.getElementById('profileUsernameVal');
  if (usernameEl) usernameEl.textContent = profile.username;

  const phoneEl = document.getElementById('profilePhoneVal');
  if (phoneEl) phoneEl.textContent = formatPhoneDisplay(profile.phone);

  const dobEl = document.getElementById('profileDobVal');
  if (dobEl) dobEl.textContent = formatDobDisplay(profile.dob);

  const genderEl = document.getElementById('profileGenderVal');
  if (genderEl) {
    if (profile.gender === 'Male') {
      genderEl.setAttribute('data-i18n', 'profile_gender_male');
    } else if (profile.gender === 'Female') {
      genderEl.setAttribute('data-i18n', 'profile_gender_female');
    } else {
      genderEl.setAttribute('data-i18n', 'profile_gender_other');
    }
    if (window.i18n) {
      const key = genderEl.getAttribute('data-i18n');
      genderEl.textContent = window.i18n.get(key) || profile.gender;
    } else {
      genderEl.textContent = profile.gender;
    }
  }

  const bioEl = document.getElementById('profileBioVal');
  if (bioEl) bioEl.textContent = profile.bio || '';

  const adminIdEl = document.getElementById('profileAdminId');
  if (adminIdEl) adminIdEl.textContent = profile.adminId;

  const roleEl = document.getElementById('profileRole');
  if (roleEl) roleEl.textContent = profile.role;

  const createdEl = document.getElementById('profileCreatedVal');
  if (createdEl) createdEl.textContent = profile.created;

  const lastLoginEl = document.getElementById('profileLastLogin');
  if (lastLoginEl) lastLoginEl.textContent = profile.lastLogin;

  if (profile.avatar) {
    document.querySelectorAll('.admin-summary-avatar, .admin-header-avatar, .sidebar-admin-avatar, #editAvatarPreview').forEach(img => {
      img.src = profile.avatar;
    });
  }
}

function populateEditProfileForm() {
  const profile = getAdminProfile();
  const editFullName = document.getElementById('editFullName');
  if (editFullName) editFullName.value = profile.name;
  const editUsername = document.getElementById('editUsername');
  if (editUsername) editUsername.value = profile.username;
  const editEmail = document.getElementById('editEmail');
  if (editEmail) editEmail.value = profile.email;
  const editPhone = document.getElementById('editPhone');
  if (editPhone) editPhone.value = profile.phone.replace(/[^0-9]/g, '').slice(-10);
  const editDob = document.getElementById('editDob');
  if (editDob) editDob.value = profile.dob;
  const editGender = document.getElementById('editGender');
  if (editGender) editGender.value = profile.gender;
  const editAdminId = document.getElementById('editAdminId');
  if (editAdminId) editAdminId.value = profile.adminId;
  const editRole = document.getElementById('editRole');
  if (editRole) editRole.value = profile.role;
  const editBio = document.getElementById('editBio');
  if (editBio) editBio.value = profile.bio;
  const editCreated = document.getElementById('editCreated');
  if (editCreated) editCreated.value = profile.created;
  const editLastLogin = document.getElementById('editLastLogin');
  if (editLastLogin) editLastLogin.value = profile.lastLogin;
  const editAvatarPreview = document.getElementById('editAvatarPreview');
  if (editAvatarPreview) editAvatarPreview.src = profile.avatar;
  window.tempSelectedAvatar = null;
}

function saveAdminProfile(profile) {
  try {
    localStorage.setItem('thamili_admin_profile', JSON.stringify(profile));
  } catch (e) {}
  applyAdminProfileToDOM(profile);
}

// Modal helper functions
function openModal(modalId) {
  if (modalId === 'editProfileModal') {
    populateEditProfileForm();
  }
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved profile across DOM on load
  applyAdminProfileToDOM();

  // Avatar file input change listener
  const avatarFileInput = document.getElementById('editAvatarFile');
  if (avatarFileInput) {
    avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          const sizeErr = window.i18n && window.i18n.currentLang === 'ta'
            ? 'படத்தின் அளவு 2MB க்குள் இருக்க வேண்டும்'
            : 'Image size must be under 2MB';
          showToast(sizeErr, 'error');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          const previewImg = document.getElementById('editAvatarPreview');
          if (previewImg) previewImg.src = dataUrl;
          window.tempSelectedAvatar = dataUrl;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Mobile sidebar toggle
  const mobileMenuBtn = document.getElementById('mobileMenuToggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Admin Profile Dropdown
  const profileDropdownBtn = document.getElementById('profileDropdownBtn');
  const profileDropdownMenu = document.getElementById('profileDropdownMenu');

  if (profileDropdownBtn && profileDropdownMenu) {
    profileDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = profileDropdownMenu.classList.contains('hidden');
      document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
      if (isHidden) {
        profileDropdownMenu.classList.remove('hidden');
      }
    });
  }

  // Close modals on backdrop click or close button
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.classList.remove('modal-open');
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });

  // Admin Menu Actions
  const btnViewProfile = document.getElementById('menuViewProfile');
  if (btnViewProfile) {
    btnViewProfile.addEventListener('click', (e) => {
      e.preventDefault();
      if (profileDropdownMenu) profileDropdownMenu.classList.add('hidden');
      openModal('profileModal');
    });
  }

  const btnEditProfile = document.getElementById('menuEditProfile');
  if (btnEditProfile) {
    btnEditProfile.addEventListener('click', (e) => {
      e.preventDefault();
      if (profileDropdownMenu) profileDropdownMenu.classList.add('hidden');
      openModal('editProfileModal');
    });
  }

  const btnChangePassword = document.getElementById('menuChangePassword');
  if (btnChangePassword) {
    btnChangePassword.addEventListener('click', (e) => {
      e.preventDefault();
      if (profileDropdownMenu) profileDropdownMenu.classList.add('hidden');
      openModal('changePasswordModal');
    });
  }

  const btnLogout = document.getElementById('menuLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      if (profileDropdownMenu) profileDropdownMenu.classList.add('hidden');
      openModal('logoutModal');
    });
  }

  // Profile Edit Form Submit
  const editProfileForm = document.getElementById('editProfileForm');
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = getAdminProfile();
      const name = document.getElementById('editFullName')?.value.trim() || current.name;
      const username = document.getElementById('editUsername')?.value.trim() || current.username;
      const email = document.getElementById('editEmail')?.value.trim() || current.email;
      const phoneRaw = document.getElementById('editPhone')?.value.trim() || '';
      const phoneClean = phoneRaw.replace(/[^0-9]/g, '');
      const dob = document.getElementById('editDob')?.value || current.dob;
      const gender = document.getElementById('editGender')?.value || current.gender;
      const bio = document.getElementById('editBio')?.value.trim() || current.bio;
      const avatar = window.tempSelectedAvatar || current.avatar;

      // Validate exactly 10 digits for phone number
      if (phoneClean.length !== 10) {
        const errMsg = window.i18n ? window.i18n.get('msg_phone_invalid') : 'Phone number must be exactly 10 digits (e.g. 9876543210)';
        showToast(errMsg, 'error');
        return;
      }

      const updated = {
        ...current,
        name,
        username,
        email,
        phone: phoneClean,
        dob,
        gender,
        bio,
        avatar
      };

      saveAdminProfile(updated);
      window.tempSelectedAvatar = null;
      closeModal('editProfileModal');
      const msg = window.i18n ? window.i18n.get('msg_profile_saved') : 'Profile changes saved successfully!';
      showToast(msg, 'success');
    });
  }

  // Change Password Form Submit
  const changePasswordForm = document.getElementById('changePasswordForm');
  if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentPwd = document.getElementById('currentPwd').value;
      const newPwd = document.getElementById('newPwd').value;
      const confirmPwd = document.getElementById('confirmPwd').value;

      if (!currentPwd || !newPwd || !confirmPwd) {
        showToast(window.i18n && window.i18n.currentLang === 'ta' ? 'அனைத்து கடவுச்சொல் புலங்களையும் நிரப்பவும்' : 'Please fill all password fields', 'error');
        return;
      }

      if (newPwd !== confirmPwd) {
        showToast(window.i18n && window.i18n.currentLang === 'ta' ? 'புதிய கடவுச்சொற்கள் பொருந்தவில்லை!' : 'New passwords do not match!', 'error');
        return;
      }

      changePasswordForm.reset();
      closeModal('changePasswordModal');
      const msg = window.i18n ? window.i18n.get('toast_pwd_changed') : 'Password changed successfully!';
      showToast(msg, 'success');
    });
  }

  // Logout Confirm Action
  const btnConfirmLogout = document.getElementById('btnConfirmLogout');
  if (btnConfirmLogout) {
    btnConfirmLogout.addEventListener('click', () => {
      closeModal('logoutModal');
      const msg = window.i18n ? window.i18n.get('toast_logged_out') : 'Logged out successfully.';
      showToast(msg, 'info');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }

  // Search Live Popup
  const searchInput = document.getElementById('globalSearchInput');
  const searchResults = document.getElementById('searchResultsDropdown');
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length > 0) {
        searchResults.classList.remove('hidden');
        renderSearchResults(q, searchResults);
      } else {
        searchResults.classList.add('hidden');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
      }
    });
  }

  // Global Quick Activities click
  document.querySelectorAll('.activity-row').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('.act-title')?.textContent || '';
      const desc = item.querySelector('.act-desc')?.textContent || '';
      const time = item.querySelector('.act-time')?.textContent || '';
      
      const modalActTitle = document.getElementById('modalActTitle');
      const modalActDesc = document.getElementById('modalActDesc');
      const modalActTime = document.getElementById('modalActTime');

      if (modalActTitle) modalActTitle.textContent = title;
      if (modalActDesc) modalActDesc.textContent = desc;
      if (modalActTime) modalActTime.textContent = time;

      openModal('activityDetailModal');
    });
  });
});

// Live Search Renderer
function renderSearchResults(query, container) {
  const isTamil = (window.i18n && window.i18n.currentLang === 'ta') || !window.i18n;
  
  const searchItems = [
    { title: isTamil ? "AI உரையாடல்" : "AI Chat Tool", url: "ai-tools.html#chat", category: isTamil ? "AI கருவிகள்" : "AI Tools" },
    { title: isTamil ? "பட உருவாக்கம்" : "Image Generation", url: "ai-tools.html#image", category: isTamil ? "AI கருவிகள்" : "AI Tools" },
    { title: isTamil ? "காணொளிக் கருவிகள்" : "Video Tools", url: "ai-tools.html#video", category: isTamil ? "AI கருவிகள்" : "AI Tools" },
    { title: isTamil ? "நிரலாக்கக் கருவிகள்" : "Code Tools", url: "ai-tools.html#code", category: isTamil ? "AI கருவிகள்" : "AI Tools" },
    { title: isTamil ? "பயனர் பட்டியல்" : "User List", url: "users.html", category: isTamil ? "பயனர்கள்" : "Users" },
    { title: isTamil ? "புதிய பயனர் சேர்" : "Add New User", url: "users.html#add", category: isTamil ? "பயனர்கள்" : "Users" },
    { title: isTamil ? "மொழி அமைப்புகள்" : "Language Settings", url: "language.html", category: isTamil ? "அமைப்புகள்" : "Settings" },
    { title: isTamil ? "தகவல் அறிக்கைகள்" : "Analytics & Reports", url: "reports.html", category: isTamil ? "அறிக்கைகள்" : "Reports" },
    { title: isTamil ? "பயனர் கருத்துக்கள்" : "User Feedback", url: "feedback.html", category: isTamil ? "கருத்துக்கள்" : "Feedback" }
  ];

  const filtered = searchItems.filter(item => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="search-empty">
        ${isTamil ? 'முடிவுகள் எதுவும் கிடைக்கவில்லை' : 'No results found'}
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <a href="${item.url}" class="search-result-item">
      <div class="search-res-info">
        <span class="search-res-title">${item.title}</span>
        <span class="search-res-cat">${item.category}</span>
      </div>
      <span class="search-res-arrow">→</span>
    </a>
  `).join('');
}
