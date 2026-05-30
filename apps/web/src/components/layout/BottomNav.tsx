import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-1 p-4 flex justify-around">
      <Link to="/dashboard" className="text-text-primary hover:text-accent">
        Dashboard
      </Link>
      <Link to="/lesson" className="text-text-primary hover:text-accent">
        Lessons
      </Link>
      <Link to="/settings" className="text-text-primary hover:text-accent">
        Settings
      </Link>
    </nav>
  );
};

export default BottomNav;