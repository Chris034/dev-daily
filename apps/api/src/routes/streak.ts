import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { getStreak } from '../services/progress.service';

const app = new Hono();

app.use('*', authMiddleware);

app.get('/streak', async (c) => {
  const userId = c.req.user.id; // Assuming user ID is available in the request after auth
  const streakData = await getStreak(userId);
  
  if (!streakData) {
    return c.notFound('Streak not found');
  }

  return c.json(streakData);
});

export default app;