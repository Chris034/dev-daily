import React from 'react';

const TopBar: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-surface-1 border-b border-border">
      <h1 className="text-xl font-bold text-text-primary">Dev Daily</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/dashboard" className="text-text-primary hover:text-accent">Dashboard</a>
          </li>
          <li>
            <a href="/settings" className="text-text-primary hover:text-accent">Settings</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TopBar;