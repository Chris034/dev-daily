export type Topic = 'JavaScript' | 'TypeScript' | 'React' | 'Node.js' | 'CSS' | 'System Design' | 'AI';
export type Difficulty = 1 | 2 | 3;

export type QuizOption = {
  id: string;
  label: string;
};

export type Lesson = {
  id: string;
  topic: Topic;
  title: string;
  summary: string;
  duration: number;
  difficulty: Difficulty;
  concept: string;
  explanation: string[];
  code: string;
  language: string;
  challenge: string;
  question: string;
  options: QuizOption[];
  answer: string;
  takeaway: string;
};

export type Completion = {
  lessonId: string;
  topic: Topic;
  correct: boolean;
  completedAt: string;
};

export type Preferences = {
  name: string;
  dailyGoal: number;
  difficulty: 'adaptive' | Difficulty;
  focusTopics: Topic[];
};

export type LearningState = {
  completions: Completion[];
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  preferences: Preferences;
};
