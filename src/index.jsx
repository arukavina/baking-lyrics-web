import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router'
import Routes from './routes'
import './index.css';
import './reset.css';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes />
  </Router>
);
