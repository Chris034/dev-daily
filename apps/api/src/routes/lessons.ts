import { Hono } from 'hono';
import { z } from 'zod';
import { aiService } from '../services/ai.service';
import { cacheService } from '../services/cache.service';
import { progressService } from '../services/progress.service';
import { auth } from '../middleware/auth';

const app = new Hono();

// Schema for lesson generation request
const lessonRequestSchema = z.object({
  topic: z.string(),
  type: z.string(),
  difficulty: z.enum(['1', '2', '3']).optional(),
});

// Route for generating lessons
app.post('/lessons/generate', auth, async (c) => {
  const result = lessonRequestSchema.safeParse(await c.req.json());

  if (!result.success) {
    return c.json({ error: 'Invalid request data' }, 400);
  }

  const { topic, type, difficulty } = result.data;
  const userId = c.req.user.id; // Assuming user ID is available after auth middleware

  // Check cache first
  const cacheKey = `${userId}:${topic}:${type}:${new Date().toISOString().split('T')[0]}`;
  const cachedLesson = await cacheService.get(cacheKey);

  if (cachedLesson) {
    return c.json(cachedLesson);
  }

  // Generate new lesson using AI service
  const lesson = await aiService.generateLesson(topic, type, difficulty);

  // Save lesson to cache and database
  await cacheService.set(cacheKey, lesson, 86400); // Cache for 24 hours
  await progressService.saveLesson(userId, lesson);

  return c.json(lesson);
});

export default app;