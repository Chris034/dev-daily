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
  { id: 'css-container-queries', topic: 'CSS', title: 'Components that respond to space', summary: 'Adapt reusable components to their container.', difficulty: 2, duration: 6 }
];
