import { Hono } from 'hono';
import { auth } from '../middleware/auth';
import { migrateGuestData } from '../services/auth.service';

const app = new Hono();

// Middleware to validate authentication
app.use('*', auth);

// Route to handle user migration from guest to authenticated
app.post('/auth/migrate', async (c) => {
  const { guestId } = c.req.body;

  if (!guestId) {
    return c.json({ error: 'Guest ID is required' }, 400);
  }

  try {
    const result = await migrateGuestData(guestId, c.req.user.id);
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'Migration failed' }, 500);
  }
});

export default app;