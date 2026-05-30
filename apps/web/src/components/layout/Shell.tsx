import React from 'react';
import { NavLink } from 'react-router-dom';

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="shell-root">
      <header className="shell-header">
        <div>
          <p className="shell-kicker">Adventure Daily</p>
          <h1 className="shell-title">Quest Journal</h1>
        </div>
      </header>

      <main className="shell-main">{children}</main>

      <nav className="shell-nav" aria-label="Primary">
        <NavLink to="/" className={({ isActive }) => `shell-nav-link ${isActive ? 'is-active' : ''}`} end>
          Dashboard
        </NavLink>
        <NavLink to="/lesson" className={({ isActive }) => `shell-nav-link ${isActive ? 'is-active' : ''}`}>
          Explore
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `shell-nav-link ${isActive ? 'is-active' : ''}`}>
          Settings
        </NavLink>
      </nav>
      <div className="shell-nav-spacer" aria-hidden="true" />
      <div className="shell-desktop-nav">
        <NavLink to="/" className={({ isActive }) => `shell-nav-link ${isActive ? 'is-active' : ''}`} end>
          Dashboard
        </NavLink>
        <NavLink to="/lesson" className={({ isActive }) => `shell-nav-link ${isActive ? 'is-active' : ''}`}>
          Explore
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `shell-nav-link ${isActive ? 'is-active' : ''}`}>
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Shell;