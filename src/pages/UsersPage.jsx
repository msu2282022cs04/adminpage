import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function UsersPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'சரவணன் முத்துக்குமார்',
      nameEn: 'Saravanan Muthukumar',
      email: 'saravanan123@example.com',
      accountType: 'sub_admin', // 'sub_admin' | 'user'
      permissions: { aiTools: true, userMgmt: true, reports: true, settings: false },
      joined: '19 Sep 2026',
      status: 'active'
    },
    {
      id: 2,
      name: 'பிரியா சுந்தர்ராஜ்',
      nameEn: 'Priya Sundarraj',
      email: 'priya.sundar@example.com',
      accountType: 'sub_admin',
      permissions: { aiTools: true, userMgmt: false, reports: true, settings: false },
      joined: '18 Sep 2026',
      status: 'active'
    },
    {
      id: 3,
      name: 'கார்த்திக் பாலமுருகன்',
      nameEn: 'Karthik Balamurugan',
      email: 'karthik.b@example.com',
      accountType: 'user',
      permissions: {},
      joined: '15 Sep 2026',
      status: 'active'
    },
    {
      id: 4,
      name: 'அனிதா இராமலிங்கம்',
      nameEn: 'Anitha Ramalingam',
      email: 'anitha.ram@example.com',
      accountType: 'user',
      permissions: {},
      joined: '12 Sep 2026',
      status: 'inactive'
    }
  ]);

  const [filterType, setFilterType] = useState('all'); // 'all' | 'sub_admin' | 'user' | 'active' | 'inactive'
  const [search, setSearch] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [permissionsModalUser, setPermissionsModalUser] = useState(null);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    accountType: 'user',
    permissions: { aiTools: true, userMgmt: false, reports: false, settings: false }
  });

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.nameEn.toLowerCase().includes(q);
    if (!matchSearch) return false;

    if (filterType === 'sub_admin') return u.accountType === 'sub_admin';
    if (filterType === 'user') return u.accountType === 'user';
    if (filterType === 'active') return u.status === 'active';
    if (filterType === 'inactive') return u.status === 'inactive';
    return true;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      name: newUser.name,
      nameEn: newUser.name,
      email: newUser.email,
      accountType: newUser.accountType,
      permissions: newUser.accountType === 'sub_admin' ? { ...newUser.permissions } : {},
      joined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'active'
    };
    setUsers([created, ...users]);
    setNewUser({
      name: '',
      email: '',
      accountType: 'user',
      permissions: { aiTools: true, userMgmt: false, reports: false, settings: false }
    });
    setAddModalOpen(false);
    showToast(
      created.accountType === 'sub_admin'
        ? (lang === 'ta' ? 'புதிய Sub Admin வெற்றிகரமாக சேர்க்கப்பட்டார்!' : 'Sub Admin created successfully!')
        : (lang === 'ta' ? 'புதிய பயனர் சேர்க்கப்பட்டார்!' : 'User created successfully!'),
      'success'
    );
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!editUser) return;
    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
    showToast(lang === 'ta' ? 'கணக்கு விவரங்கள் புதுப்பிக்கப்பட்டன!' : 'Account details updated successfully!', 'success');
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'active' ? 'inactive' : 'active';
        showToast(
          nextStatus === 'active'
            ? (lang === 'ta' ? 'கணக்கு செயல்படுத்தப்பட்டது!' : 'Account activated!')
            : (lang === 'ta' ? 'கணக்கு முடக்கப்பட்டது!' : 'Account deactivated!'),
          nextStatus === 'active' ? 'success' : 'info'
        );
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleSavePermissions = (e) => {
    e.preventDefault();
    if (!permissionsModalUser) return;
    setUsers(users.map(u => u.id === permissionsModalUser.id ? permissionsModalUser : u));
    setPermissionsModalUser(null);
    showToast(lang === 'ta' ? 'Sub Admin அனுமதிகள் வெற்றிகரமாக சேமிக்கப்பட்டன!' : 'Sub Admin permissions saved!', 'success');
  };

  const handleDeleteUser = (id) => {
    if (window.confirm(lang === 'ta' ? 'இந்தக் கணக்கை நீக்க விரும்புகிறீர்களா?' : 'Delete this account?')) {
      setUsers(users.filter((u) => u.id !== id));
      showToast(lang === 'ta' ? 'கணக்கு நீக்கப்பட்டது!' : 'Account deleted successfully!', 'info');
    }
  };

  return (
    <>
      {/* Page Banner */}
      <section className="page-hero-banner">
        <div className="page-title-group">
          <h1 className="page-main-heading">{t('page_users_title', 'User & Sub Admin Management')}</h1>
          <p className="page-subheading">{t('page_users_subtitle', 'Manage normal user accounts and Sub Admin administrative privileges.')}</p>
        </div>
        <button className="page-hero-action-btn" onClick={() => setAddModalOpen(true)}>
          <span>+</span> <span>{t('sub_users_add', 'Add New User')}</span>
        </button>
      </section>

      {/* Users Table Card */}
      <section className="page-card">
        {/* Header & Filter Controls */}
        <div className="card-header-bar" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div className="ai-mode-selector" style={{ margin: 0, padding: '3px' }}>
            <button
              className={`ai-mode-pill ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              {t('filter_all_accounts', 'All Accounts')} ({users.length})
            </button>
            <button
              className={`ai-mode-pill ${filterType === 'sub_admin' ? 'active' : ''}`}
              onClick={() => setFilterType('sub_admin')}
            >
              🛡️ {t('filter_sub_admins', 'Sub Admins')} ({users.filter(u => u.accountType === 'sub_admin').length})
            </button>
            <button
              className={`ai-mode-pill ${filterType === 'user' ? 'active' : ''}`}
              onClick={() => setFilterType('user')}
            >
              👤 {t('filter_normal_users', 'Users')} ({users.filter(u => u.accountType === 'user').length})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              id="userSearchInput"
              className="form-input"
              style={{ width: '260px', padding: '7px 12px', fontSize: '12.5px' }}
              placeholder={t('placeholder_search_user', 'Search user name or email...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="data-table-wrapper">
          <table className="thamili-table" id="usersTable">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('th_user', 'User')}</th>
                <th>{t('th_account_type', 'Account Type / Sub Admin')}</th>
                <th>{t('th_joined_date', 'Joined Date')}</th>
                <th>{t('th_status', 'Status')}</th>
                <th>{t('th_actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="user-avatar-cell">
                      <img
                        src="assets/images/robot-avatar.jpg"
                        className="user-thumb"
                        alt="User Avatar"
                        style={{ border: user.accountType === 'sub_admin' ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}
                      />
                      <div className="user-meta-info">
                        <span className="user-name">
                          {lang === 'ta' ? user.name : user.nameEn}
                        </span>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Account Type / Sub Admin Badge */}
                  <td>
                    {user.accountType === 'sub_admin' ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#eff6ff',
                          color: '#1d4ed8',
                          border: '1px solid #bfdbfe',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}
                      >
                        <span>🛡️</span>
                        <span>{t('account_sub_admin', 'Sub Admin')}</span>
                      </span>
                    ) : (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#f8fafc',
                          color: '#475569',
                          border: '1px solid #e2e8f0',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        <span>👤</span>
                        <span>{t('account_user', 'User')}</span>
                      </span>
                    )}
                  </td>

                  <td>{user.joined}</td>

                  {/* Status Pill */}
                  <td>
                    <span className={`status-pill ${user.status}`}>
                      <span className="status-dot"></span>
                      <span>{user.status === 'active' ? t('status_active', 'Active') : t('status_inactive', 'Inactive')}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="action-btn-group" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {/* Sub Admin specific: Manage Permissions Button */}
                      {user.accountType === 'sub_admin' && (
                        <button
                          className="ai-action-btn-pill"
                          style={{ padding: '4px 8px', fontSize: '11px', background: '#eff6ff', color: '#2563eb', borderColor: '#bfdbfe' }}
                          title={t('btn_manage_permissions', 'Manage Permissions')}
                          onClick={() => setPermissionsModalUser({ ...user, permissions: { ...user.permissions } })}
                        >
                          🔑 {t('btn_manage_permissions', 'Permissions')}
                        </button>
                      )}

                      {/* Activate / Deactivate Toggle */}
                      <button
                        className="ai-action-btn-pill"
                        style={{
                          padding: '4px 8px',
                          fontSize: '11px',
                          background: user.status === 'active' ? '#fff1f2' : '#f0fdf4',
                          color: user.status === 'active' ? '#e11d48' : '#16a34a',
                          borderColor: user.status === 'active' ? '#fecdd3' : '#bbf7d0'
                        }}
                        title={user.status === 'active' ? t('btn_deactivate', 'Deactivate') : t('btn_activate', 'Activate')}
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === 'active' ? `⛔ ${t('btn_deactivate', 'Deactivate')}` : `✅ ${t('btn_activate', 'Activate')}`}
                      </button>

                      {/* Edit Button */}
                      <button className="action-icon-btn" title="Edit" onClick={() => setEditUser({ ...user })}>
                        ✏️
                      </button>

                      {/* Delete Button */}
                      <button className="action-icon-btn delete" title="Delete" onClick={() => handleDeleteUser(user.id)}>
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '28px', color: '#64748b' }}>
                    {lang === 'ta' ? 'பயனர்கள் எவரும் காணப்படவில்லை' : 'No accounts found matching your search.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add User Modal */}
      {addModalOpen && (
        <div className="modal-overlay active" id="addUserModal" onClick={() => setAddModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t('sub_users_add', 'Add New User')}</h3>
              <button className="modal-close-btn" onClick={() => setAddModalOpen(false)}>&times;</button>
            </div>
            <form id="addUserForm" onSubmit={handleAddUser}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">{t('label_fullname', 'Full Name')}</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="E.g., Anbarasan"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('label_email', 'Email Address')}</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    placeholder="user@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('th_account_type', 'Account Type / Sub Admin')}</label>
                  <select
                    className="form-select"
                    value={newUser.accountType}
                    onChange={(e) => setNewUser({ ...newUser, accountType: e.target.value })}
                  >
                    <option value="user">👤 {t('account_user', 'User')}</option>
                    <option value="sub_admin">🛡️ {t('account_sub_admin', 'Sub Admin')}</option>
                  </select>
                </div>

                {newUser.accountType === 'sub_admin' && (
                  <div style={{ padding: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', marginTop: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#1e3a8a', display: 'block', marginBottom: '8px' }}>
                      🔑 {t('modal_permissions_title', 'Sub Admin Permissions')}
                    </span>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155', marginBottom: '6px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={newUser.permissions.aiTools}
                        onChange={(e) => setNewUser({ ...newUser, permissions: { ...newUser.permissions, aiTools: e.target.checked } })}
                      />
                      <span>{t('perm_ai_tools', 'Manage AI Tools & Limits')}</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155', marginBottom: '6px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={newUser.permissions.userMgmt}
                        onChange={(e) => setNewUser({ ...newUser, permissions: { ...newUser.permissions, userMgmt: e.target.checked } })}
                      />
                      <span>{t('perm_user_mgmt', 'User Management Privileges')}</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={newUser.permissions.reports}
                        onChange={(e) => setNewUser({ ...newUser, permissions: { ...newUser.permissions, reports: e.target.checked } })}
                      />
                      <span>{t('perm_reports', 'Access Reports & Analytics')}</span>
                    </label>
                  </div>
                )}
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

      {/* Edit User Modal */}
      {editUser && (
        <div className="modal-overlay active" onClick={() => setEditUser(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t('modal_edit_profile_title', 'Edit Account Details')}</h3>
              <button className="modal-close-btn" onClick={() => setEditUser(null)}>&times;</button>
            </div>
            <form onSubmit={handleUpdateUser}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">{t('label_fullname', 'Full Name')}</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value, nameEn: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('label_email', 'Email Address')}</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('th_account_type', 'Account Type / Sub Admin')}</label>
                  <select
                    className="form-select"
                    value={editUser.accountType}
                    onChange={(e) => setEditUser({ ...editUser, accountType: e.target.value })}
                  >
                    <option value="user">👤 {t('account_user', 'User')}</option>
                    <option value="sub_admin">🛡️ {t('account_sub_admin', 'Sub Admin')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('th_status', 'Status')}</label>
                  <select
                    className="form-select"
                    value={editUser.status}
                    onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                  >
                    <option value="active">{t('status_active', 'Active')}</option>
                    <option value="inactive">{t('status_inactive', 'Inactive')}</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn-primary">{t('btn_save', 'Save Changes')}</button>
                <button type="button" className="btn-secondary" onClick={() => setEditUser(null)}>
                  {t('btn_cancel', 'Cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sub Admin Permissions Modal */}
      {permissionsModalUser && (
        <div className="modal-overlay active" onClick={() => setPermissionsModalUser(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                🔑 {t('modal_permissions_title', 'Sub Admin Permissions')}: {permissionsModalUser.name}
              </h3>
              <button className="modal-close-btn" onClick={() => setPermissionsModalUser(null)}>&times;</button>
            </div>
            <form onSubmit={handleSavePermissions}>
              <div className="modal-body">
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                  {lang === 'ta'
                    ? 'இந்த Sub Admin பயனருக்கான அணுகல் அனுமதிகளை தேர்வு செய்க:'
                    : 'Configure access permissions for this Sub Admin account:'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                      {t('perm_ai_tools', 'Manage AI Tools & Limits')}
                    </span>
                    <input
                      type="checkbox"
                      checked={!!permissionsModalUser.permissions?.aiTools}
                      onChange={(e) => setPermissionsModalUser({
                        ...permissionsModalUser,
                        permissions: { ...permissionsModalUser.permissions, aiTools: e.target.checked }
                      })}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                      {t('perm_user_mgmt', 'User Management Privileges')}
                    </span>
                    <input
                      type="checkbox"
                      checked={!!permissionsModalUser.permissions?.userMgmt}
                      onChange={(e) => setPermissionsModalUser({
                        ...permissionsModalUser,
                        permissions: { ...permissionsModalUser.permissions, userMgmt: e.target.checked }
                      })}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                      {t('perm_reports', 'Access Reports & Analytics')}
                    </span>
                    <input
                      type="checkbox"
                      checked={!!permissionsModalUser.permissions?.reports}
                      onChange={(e) => setPermissionsModalUser({
                        ...permissionsModalUser,
                        permissions: { ...permissionsModalUser.permissions, reports: e.target.checked }
                      })}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                      {t('perm_settings', 'Manage System Settings')}
                    </span>
                    <input
                      type="checkbox"
                      checked={!!permissionsModalUser.permissions?.settings}
                      onChange={(e) => setPermissionsModalUser({
                        ...permissionsModalUser,
                        permissions: { ...permissionsModalUser.permissions, settings: e.target.checked }
                      })}
                    />
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn-primary">{t('btn_save', 'Save Changes')}</button>
                <button type="button" className="btn-secondary" onClick={() => setPermissionsModalUser(null)}>
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
