import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './app/root';
import { LearningProvider } from './state/LearningContext';
import './styles/globals.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HashRouter>
        <LearningProvider>
          <App />
        </LearningProvider>
      </HashRouter>
    </React.StrictMode>
  );
}