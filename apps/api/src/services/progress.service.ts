import { db } from '../db';
import { z } from 'zod';

const ProgressSchema = z.object({
  userId: z.string().nullable(),
  guestId: z.string().nullable(),
  lessonId: z.string(),
  topic: z.string(),
  type: z.string(),
  difficulty: z.enum(['1', '2', '3']),
  status: z.enum(['started', 'completed', 'skipped']),
  userAnswer: z.string().nullable(),
  feedback: z.string().nullable(),
  completedAt: z.date().nullable(),
  createdAt: z.date(),
});

export const ProgressService = {
  async getProgress(userId: string | null, guestId: string | null) {
    const progress = await db.sessions.findMany({
      where: {
        OR: [
          { userId },
          { guestId },
        ],
      },
    });
    return progress;
  },

  async createProgress(data: z.infer<typeof ProgressSchema>) {
    const validatedData = ProgressSchema.parse(data);
    const progress = await db.sessions.create({
      data: validatedData,
    });
    return progress;
  },

  async updateProgress(id: string, data: Partial<z.infer<typeof ProgressSchema>>) {
    const validatedData = ProgressSchema.partial().parse(data);
    const progress = await db.sessions.update({
      where: { id },
      data: validatedData,
    });
    return progress;
  },
};