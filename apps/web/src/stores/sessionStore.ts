import create from 'zustand';

type SessionState = {
  userId: string | null;
  guestId: string | null;
  streak: number;
  progress: number;
  setUserId: (id: string) => void;
  setGuestId: (id: string) => void;
  updateStreak: (increment: number) => void;
  updateProgress: (increment: number) => void;
};

const useSessionStore = create<SessionState>((set) => ({
  userId: null,
  guestId: null,
  streak: 0,
  progress: 0,
  setUserId: (id) => set({ userId: id }),
  setGuestId: (id) => set({ guestId: id }),
  updateStreak: (increment) => set((state) => ({ streak: state.streak + increment })),
  updateProgress: (increment) => set((state) => ({ progress: state.progress + increment })),
}));

export default useSessionStore;