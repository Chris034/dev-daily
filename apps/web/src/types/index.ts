export type Topic = 'JavaScript' | 'TypeScript' | 'React' | 'Node.js' | 'CSS' | 'HTML';

export interface Lesson {
  id: string;
  topic: Topic;
  type: 'lesson' | 'challenge' | 'quiz';
  content: any; // JSON structure for lesson content
  difficulty: 1 | 2 | 3;
  createdAt: Date;
}

export interface Session {
  id: string;
  userId: string | null; // null for guest users
  guestId: string | null; // null for authenticated users
  lessonId: string;
  parentLessonId?: string; // optional for "go deeper" functionality
  topic: Topic;
  type: 'lesson' | 'challenge' | 'quiz';
  difficulty: 1 | 2 | 3;
  difficultySource: 'auto' | 'manual';
  status: 'started' | 'completed' | 'skipped';
  userAnswer?: string; // optional for user responses
  feedback?: string; // optional for feedback
  completedAt?: Date; // optional for completion timestamp
  createdAt: Date;
}

export interface SkillProfile {
  userId: string | null; // or guestId
  topic: Topic;
  level: 1 | 2 | 3;
  completedCount: number;
  correctCount: number;
  updatedAt: Date;
}

export interface Streak {
  userId: string | null; // nullable for guest users
  guestId: string | null; // nullable for authenticated users
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  totalCompleted: number;
}