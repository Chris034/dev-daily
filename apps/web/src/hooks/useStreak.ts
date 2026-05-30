import { useEffect } from 'react';
import { useStore } from '../stores/streakStore';

const useStreak = () => {
  const { streak, incrementStreak, resetStreak } = useStore();

  useEffect(() => {
    // Logic to handle streak persistence can be added here
    const lastActivityDate = localStorage.getItem('lastActivityDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastActivityDate !== today) {
      resetStreak();
      localStorage.setItem('lastActivityDate', today);
    }
  }, [resetStreak]);

  return {
    streak,
    incrementStreak,
  };
};

export default useStreak;