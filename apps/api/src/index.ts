import { Hono } from 'hono';
import { authMiddleware } from './middleware/auth';
import { rateLimitMiddleware } from './middleware/ratelimit';
import lessons from './routes/lessons';
import progress from './routes/progress';
import streak from './routes/streak';
import review from './routes/review';
import auth from './routes/auth';

const app = new Hono();

// Middleware
app.use('*', authMiddleware);
app.use('*', rateLimitMiddleware);

// Routes
app.route('/lessons', lessons);
app.route('/progress', progress);
app.route('/streak', streak);
app.route('/review', review);
app.route('/auth', auth);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});