import React from 'react';

type TopicPillProps = {
  topic: string;
  isActive: boolean;
  onClick: () => void;
};

const TopicPill: React.FC<TopicPillProps> = ({ topic, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-full transition-colors ${
        isActive ? 'bg-accent text-accent-fg' : 'bg-surface-1 text-text-primary'
      }`}
      onClick={onClick}
    >
      {topic}
    </button>
  );
};

export default TopicPill;