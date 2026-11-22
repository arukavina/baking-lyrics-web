import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router'
import Routes from './routes'
import './styles/index.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes />
  </Router>
);
