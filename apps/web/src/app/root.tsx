import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/page';
import Lesson from './lesson/page';
import Settings from './settings/page';
import Shell from '../components/layout/Shell';

const App = () => {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Shell>
  );
};

export { App };