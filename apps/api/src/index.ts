import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { z } from 'zod';
import { lessonCatalog } from './catalog.js';

const app = new Hono();

app.use('*', logger());
app.use('*', cors({
  origin: (origin) => origin || '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'X-Guest-Id'],
}));

app.get('/', (context) => context.json({
  service: 'Dev Daily API',
  status: 'ok',
  version: '1.0.0',
}));
app.get('/health', (context) => context.json({ status: 'healthy' }));

app.get('/lessons', (context) => {
  const topic = context.req.query('topic');
  const lessons = topic
    ? lessonCatalog.filter((lesson) => lesson.topic.toLowerCase() === topic.toLowerCase())
    : lessonCatalog;
  return context.json({ data: lessons, count: lessons.length });
});

const recommendationSchema = z.object({
  completedLessonIds: z.array(z.string()).default([]),
  focusTopics: z.array(z.string()).default([]),
  difficulty: z.union([z.literal('adaptive'), z.literal(1), z.literal(2), z.literal(3)]).default('adaptive'),
});

app.post('/lessons/recommend', async (context) => {
  const payload = recommendationSchema.safeParse(await context.req.json().catch(() => null));
  if (!payload.success) {
    return context.json({ error: { code: 'INVALID_REQUEST', message: 'Recommendation preferences are invalid.' } }, 400);
  }
  const { completedLessonIds, focusTopics, difficulty } = payload.data;
  const available = lessonCatalog.filter((lesson) => {
    const matchesTopic = focusTopics.length === 0 || focusTopics.includes(lesson.topic);
    const matchesDifficulty = difficulty === 'adaptive' || lesson.difficulty === difficulty;
    return !completedLessonIds.includes(lesson.id) && matchesTopic && matchesDifficulty;
  });
  return context.json({ data: available[0] ?? lessonCatalog[0] });
});

app.notFound((context) => context.json({
  error: { code: 'NOT_FOUND', message: 'The requested endpoint does not exist.' },
}, 404));

app.onError((error, context) => {
  console.error(error);
  return context.json({
    error: { code: 'INTERNAL_ERROR', message: 'The service could not process the request.' },
  }, 500);
});

const port = Number(process.env.PORT ?? 8787);
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Dev Daily API listening on http://localhost:${info.port}`);
});
