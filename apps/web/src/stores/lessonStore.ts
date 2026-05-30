import create from 'zustand';

type LessonState = {
  lessons: Array<{
    id: string;
    topic: string;
    type: string;
    content: any; // Adjust type as needed
    difficulty: number;
  }>;
  addLesson: (lesson: { id: string; topic: string; type: string; content: any; difficulty: number }) => void;
  clearLessons: () => void;
};

const useLessonStore = create<LessonState>((set) => ({
  lessons: [],
  addLesson: (lesson) => set((state) => ({ lessons: [...state.lessons, lesson] })),
  clearLessons: () => set({ lessons: [] }),
}));

export default useLessonStore;