import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import all existing CSS stylesheets directly
import '../css/style.css';
import '../css/sidebar.css';
import '../css/components.css';
import '../css/pages.css';
import '../css/responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
