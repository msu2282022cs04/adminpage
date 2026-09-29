import React from 'react';
import { useToast } from '../../context/ToastContext';

export default function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div id="toastContainer" className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-pill ${toast.type} ${toast.isVisible ? 'show' : ''}`}
        >
          <div className="toast-icon">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
          </div>
          <span className="toast-msg">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
