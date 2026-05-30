import create from 'zustand';

type StreakState = {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date | null;
  totalCompleted: number;
  setCurrentStreak: (streak: number) => void;
  setLongestStreak: (streak: number) => void;
  setLastActivityDate: (date: Date) => void;
  incrementTotalCompleted: () => void;
};

const useStreakStore = create<StreakState>((set) => ({
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  totalCompleted: 0,
  setCurrentStreak: (streak) => set({ currentStreak: streak }),
  setLongestStreak: (streak) => set({ longestStreak: streak }),
  setLastActivityDate: (date) => set({ lastActivityDate: date }),
  incrementTotalCompleted: () => set((state) => ({ totalCompleted: state.totalCompleted + 1 })),
}));

export default useStreakStore;