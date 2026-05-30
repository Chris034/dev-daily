import React from 'react';
import { Badge } from '../ui/Badge';
import { ProgressRing } from '../ui/ProgressRing';
import { TopicPill } from '../ui/TopicPill';

interface LessonCardProps {
  title: string;
  topic: string;
  difficulty: number;
  completed: boolean;
  onClick: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ title, topic, difficulty, completed, onClick }) => {
  return (
    <div className="bg-surface-1 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow" onClick={onClick}>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <div className="flex justify-between items-center mt-2">
        <TopicPill topic={topic} />
        <Badge variant={completed ? 'success' : 'lesson'}>{completed ? 'Completed' : 'In Progress'}</Badge>
      </div>
      <ProgressRing progress={completed ? 100 : 0} />
      <p className="text-sm text-text-muted mt-1">Difficulty: {difficulty}</p>
    </div>
  );
};

export default LessonCard;