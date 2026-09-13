export type ApiLesson = {
  id: string;
  topic: string;
  title: string;
  summary: string;
  difficulty: 1 | 2 | 3;
  duration: number;
};

export const lessonCatalog: ApiLesson[] = [
  { id: 'js-array-pipelines', topic: 'JavaScript', title: 'Readable array pipelines', summary: 'Turn noisy loops into focused transformations.', difficulty: 1, duration: 6 },
  { id: 'ts-narrowing', topic: 'TypeScript', title: 'Narrow unknown data safely', summary: 'Validate values at system boundaries.', difficulty: 2, duration: 8 },
  { id: 'react-derived-state', topic: 'React', title: 'Stop syncing derived state', summary: 'Remove effects and state that can be calculated during render.', difficulty: 2, duration: 7 },
  { id: 'node-error-boundaries', topic: 'Node.js', title: 'Design useful API errors', summary: 'Separate operational failures from defects.', difficulty: 3, duration: 9 },
  { id: 'css-container-queries', topic: 'CSS', title: 'Components that respond to space', summary: 'Adapt reusable components to their container.', difficulty: 2, duration: 6 },
  { id: 'js-promises', topic: 'JavaScript', title: 'Run independent work concurrently', summary: 'Reduce async latency by separating dependencies from independent work.', difficulty: 2, duration: 7 },
  { id: 'system-design-caching', topic: 'System Design', title: 'Choose the right cache boundary', summary: 'Reduce latency without introducing stale data in the wrong layer.', difficulty: 2, duration: 9 },
  { id: 'system-design-queues', topic: 'System Design', title: 'Move slow work off the request path', summary: 'Use queues to make user-facing requests fast and resilient.', difficulty: 3, duration: 10 },
  { id: 'ai-structured-output', topic: 'AI', title: 'Build reliable structured AI output', summary: 'Turn probabilistic model responses into validated application data.', difficulty: 2, duration: 8 },
  { id: 'ai-retrieval', topic: 'AI', title: 'Ground answers with retrieval', summary: 'Use relevant source material to improve accuracy and traceability.', difficulty: 3, duration: 10 },
];
