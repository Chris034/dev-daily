import { Hono } from 'hono';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60 * 60, // per 1 hour
});

const rateLimitMiddleware = async (c, next) => {
  try {
    await rateLimiter.consume(c.req.ip);
    await next();
  } catch (rejRes) {
    return c.json({ error: 'Too Many Requests' }, 429);
  }
};

export default rateLimitMiddleware;