import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav className="bg-surface-1 p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="text-text-primary hover:text-accent">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/lesson" className="text-text-primary hover:text-accent">
            Lessons
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-text-primary hover:text-accent">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;