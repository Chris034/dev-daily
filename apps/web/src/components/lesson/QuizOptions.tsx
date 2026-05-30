import React from 'react';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizOptionsProps {
  options: QuizOption[];
  onSelect: (selectedOptionId: string) => void;
}

const QuizOptions: React.FC<QuizOptionsProps> = ({ options, onSelect }) => {
  return (
    <div className="flex flex-col space-y-2">
      {options.map(option => (
        <button
          key={option.id}
          className="bg-surface-1 text-text-primary p-2 rounded hover:bg-surface-2 transition"
          onClick={() => onSelect(option.id)}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default QuizOptions;