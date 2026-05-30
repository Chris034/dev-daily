import React from 'react';

interface CardProps {
  title: string;
  content: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, content, className }) => {
  return (
    <div className={`bg-surface-1 border border-border rounded-lg p-4 shadow-md ${className}`}>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <div className="mt-2 text-text-secondary">{content}</div>
    </div>
  );
};

export default Card;