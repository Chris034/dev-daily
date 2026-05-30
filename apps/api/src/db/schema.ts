import { pgTable, serial, varchar, jsonb, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerkId').notNull(),
  email: varchar('email').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  topic: varchar('topic').notNull(),
  type: varchar('type').notNull(),
  content: jsonb('content').notNull(),
  difficulty: integer('difficulty').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('userId').nullable(),
  guestId: varchar('guestId').nullable(),
  lessonId: integer('lessonId').notNull(),
  parentLessonId: integer('parentLessonId').nullable(),
  topic: varchar('topic').notNull(),
  type: varchar('type').notNull(),
  difficulty: integer('difficulty').notNull(),
  difficultySource: varchar('difficultySource').notNull(),
  status: varchar('status').notNull(),
  userAnswer: jsonb('userAnswer').nullable(),
  feedback: jsonb('feedback').nullable(),
  completedAt: timestamp('completedAt').nullable(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const streaks = pgTable('streaks', {
  userId: integer('userId').nullable(),
  guestId: varchar('guestId').nullable(),
  currentStreak: integer('currentStreak').notNull(),
  longestStreak: integer('longestStreak').notNull(),
  lastActivityDate: timestamp('lastActivityDate').nullable(),
  totalCompleted: integer('totalCompleted').notNull(),
});

export const skillProfiles = pgTable('skillProfiles', {
  userId: integer('userId').nullable(),
  guestId: varchar('guestId').nullable(),
  topic: varchar('topic').notNull(),
  level: integer('level').notNull(),
  completedCount: integer('completedCount').notNull(),
  correctCount: integer('correctCount').notNull(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});