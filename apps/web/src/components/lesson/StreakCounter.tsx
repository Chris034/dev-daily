import React from 'react';
import { useStreak } from '../../hooks/useStreak';

const StreakCounter: React.FC = () => {
  const { currentStreak, longestStreak } = useStreak();

  return (
    <div className="flex items-center space-x-4">
      <div className="text-lg font-semibold">
        Current Streak: <span className="text-accent">{currentStreak}</span>
      </div>
      <div className="text-lg font-semibold">
        Longest Streak: <span className="text-accent">{longestStreak}</span>
      </div>
    </div>
  );
};

export default StreakCounter;