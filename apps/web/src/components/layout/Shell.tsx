import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLearning } from '../../state/LearningContext';

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useLearning();
  const navigation = (
    <>
      <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`} end>
        <span className="nav-icon">01</span> Overview
      </NavLink>
      <NavLink to="/lesson" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
        <span className="nav-icon">02</span> Learn
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
        <span className="nav-icon">03</span> Settings
      </NavLink>
    </>
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">&lt;/&gt;</span>
          <span>Dev Daily</span>
        </NavLink>
        <nav className="desktop-nav" aria-label="Primary">{navigation}</nav>
        <div className="sidebar-card">
          <span className="sidebar-card-label">Current streak</span>
          <strong>{state.currentStreak} day{state.currentStreak === 1 ? '' : 's'}</strong>
          <span>Keep the momentum going.</span>
        </div>
      </aside>
      <div className="content-shell">
        <header className="topbar">
          <NavLink to="/" className="mobile-brand"><span className="brand-mark">&lt;/&gt;</span> Dev Daily</NavLink>
          <div className="profile-chip" aria-label={`Signed in as ${state.preferences.name}`}>
            <span>{state.preferences.name.slice(0, 1).toUpperCase()}</span>
            <div><strong>{state.preferences.name}</strong><small>Learning locally</small></div>
          </div>
        </header>
        <main className="main-content">{children}</main>
        <nav className="mobile-nav" aria-label="Primary">{navigation}</nav>
      </div>
    </div>
  );
};

export default Shell;
