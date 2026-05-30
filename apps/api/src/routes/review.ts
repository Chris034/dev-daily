import { Hono } from 'hono';
import { z } from 'zod';
import { aiService } from '../services/ai.service';
import { authMiddleware } from '../middleware/auth';

const app = new Hono();

const reviewSchema = z.object({
  code: z.string(),
  lessonId: z.string(),
});

app.post('/review', authMiddleware, async (c) => {
  const result = reviewSchema.safeParse(await c.req.json());

  if (!result.success) {
    return c.json({ error: result.error.errors }, 400);
  }

  const { code, lessonId } = result.data;

  try {
    const reviewResult = await aiService.reviewCode(code, lessonId);
    return c.json(reviewResult);
  } catch (error) {
    return c.json({ error: 'Failed to review code' }, 500);
  }
});

export default app;