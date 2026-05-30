import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const cacheService = {
  async get(key: string) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },

  async set(key: string, value: any, ttl: number) {
    await redis.set(key, JSON.stringify(value), 'EX', ttl);
  },

  async del(key: string) {
    await redis.del(key);
  },

  async exists(key: string) {
    const exists = await redis.exists(key);
    return exists === 1;
  },
};