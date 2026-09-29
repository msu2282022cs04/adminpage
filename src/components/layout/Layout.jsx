import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AdminProfileModal from '../modals/AdminProfileModal';
import ToastContainer from '../common/ToastContainer';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Mobile Overlay Backdrop */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        id="sidebarOverlay"
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onCloseSidebar={() => setSidebarOpen(false)} />

      {/* Main Content Wrapper */}
      <main className="main-wrapper">
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <Outlet />
      </main>

      {/* Global Modals & Notifications */}
      <AdminProfileModal />
      <ToastContainer />
    </div>
  );
}
