import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./styles/global.css";

// ── START: BOXICONS POSITION OVERRIDE ────────────────
const bxOverride = document.createElement('style');
bxOverride.innerHTML = `
  /* Force all Boxicons <i> tags back into normal flow */
  i.bx, i[class*="bx-"] {
    position: static !important;
  }
`;
document.head.appendChild(bxOverride);
// ── END: BOXICONS POSITION OVERRIDE ──────────────────

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
