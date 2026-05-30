import { Anthropic } from 'anthropic-sdk';
import { z } from 'zod';
import { Lesson } from '../db/schema';
import { cacheService } from './cache.service';
import { prompts } from '../lib/prompts';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const lessonSchema = z.object({
  id: z.string(),
  topic: z.string(),
  type: z.string(),
  content: z.any(),
  difficulty: z.number(),
  createdAt: z.string(),
});

export const aiService = {
  async generateLesson(topic: string, type: string, difficulty: number) {
    const cacheKey = `lesson:${topic}:${type}:${difficulty}`;
    const cachedLesson = await cacheService.get(cacheKey);

    if (cachedLesson) {
      return lessonSchema.parse(cachedLesson);
    }

    const prompt = prompts.generateLesson(topic, type, difficulty);
    const response = await client.generate(prompt);

    const lessonData = {
      id: response.id,
      topic,
      type,
      content: response.content,
      difficulty,
      createdAt: new Date().toISOString(),
    };

    await cacheService.set(cacheKey, lessonData, 86400); // Cache for 24 hours
    return lessonSchema.parse(lessonData);
  },
};