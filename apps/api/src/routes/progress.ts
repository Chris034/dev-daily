import { Hono } from 'hono';
import { auth } from '../middleware/auth';
import { getProgress, updateProgress } from '../services/progress.service';

const app = new Hono();

// Middleware for authentication
app.use('*', auth);

// Route to get user progress
app.get('/progress', async (c) => {
  const userId = c.req.user.id; // Assuming user ID is available in the request
  const progress = await getProgress(userId);
  return c.json(progress);
});

// Route to update user progress
app.post('/progress', async (c) => {
  const userId = c.req.user.id; // Assuming user ID is available in the request
  const { lessonId, status } = await c.req.json();
  const updatedProgress = await updateProgress(userId, lessonId, status);
  return c.json(updatedProgress);
});

export default app;