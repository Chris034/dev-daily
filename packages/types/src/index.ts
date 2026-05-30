export type User = {
  id: string;
  clerkId: string;
  email: string;
  createdAt: Date;
};

export type Lesson = {
  id: string;
  topic: string;
  type: string;
  content: Record<string, any>;
  difficulty: 1 | 2 | 3;
  createdAt: Date;
};

export type Session = {
  id: string;
  userId?: string | null;
  guestId?: string | null;
  lessonId: string;
  parentLessonId?: string | null;
  topic: string;
  type: string;
  difficulty: 1 | 2 | 3;
  difficultySource: 'auto' | 'manual';
  status: 'started' | 'completed' | 'skipped';
  userAnswer?: string | null;
  feedback?: string | null;
  completedAt?: Date | null;
  createdAt: Date;
};

export type Streak = {
  userId?: string | null;
  guestId?: string | null;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  totalCompleted: number;
};

export type SkillProfile = {
  userId?: string | null;
  topic: string;
  level: 1 | 2 | 3;
  completedCount: number;
  correctCount: number;
  updatedAt: Date;
};