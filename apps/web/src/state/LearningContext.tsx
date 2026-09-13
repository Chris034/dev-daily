import React, { createContext, useContext, useMemo, useState } from 'react';
import type { LearningState, Preferences, Topic } from '../types';

const STORAGE_KEY = 'dev-daily-state-v1';
const defaultState: LearningState = {
  completions: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  preferences: {
    name: 'Developer',
    dailyGoal: 1,
    difficulty: 'adaptive',
    focusTopics: ['JavaScript', 'TypeScript', 'React'],
  },
};

const dateKey = (date: Date) => date.toISOString().slice(0, 10);

const readState = (): LearningState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const saved = JSON.parse(raw) as Partial<LearningState>;
    return {
      ...defaultState,
      ...saved,
      preferences: { ...defaultState.preferences, ...saved.preferences },
      completions: Array.isArray(saved.completions) ? saved.completions : [],
    };
  } catch {
    return defaultState;
  }
};

type LearningContextValue = {
  state: LearningState;
  completeLesson: (lessonId: string, topic: Topic, correct: boolean) => void;
  updatePreferences: (preferences: Preferences) => void;
  resetProgress: () => void;
  completedToday: number;
};

const LearningContext = createContext<LearningContextValue | null>(null);

export const LearningProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<LearningState>(readState);
  const persist = (next: LearningState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  };

  const completeLesson = (lessonId: string, topic: Topic, correct: boolean) => {
    setState((current) => {
      if (current.completions.some((item) => item.lessonId === lessonId)) return current;
      const today = dateKey(new Date());
      const yesterday = dateKey(new Date(Date.now() - 86_400_000));
      const currentStreak = current.lastActivityDate === today
        ? current.currentStreak
        : current.lastActivityDate === yesterday
          ? current.currentStreak + 1
          : 1;
      return persist({
        ...current,
        completions: [...current.completions, { lessonId, topic, correct, completedAt: new Date().toISOString() }],
        currentStreak,
        longestStreak: Math.max(current.longestStreak, currentStreak),
        lastActivityDate: today,
      });
    });
  };

  const updatePreferences = (preferences: Preferences) => {
    setState((current) => persist({ ...current, preferences }));
  };

  const resetProgress = () => setState((current) => persist({ ...defaultState, preferences: current.preferences }));
  const completedToday = state.completions.filter((item) => item.completedAt.slice(0, 10) === dateKey(new Date())).length;
  const value = useMemo(
    () => ({ state, completeLesson, updatePreferences, resetProgress, completedToday }),
    [state, completedToday],
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) throw new Error('useLearning must be used inside LearningProvider');
  return context;
};
