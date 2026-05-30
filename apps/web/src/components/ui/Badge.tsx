import React from 'react';

interface BadgeProps {
  variant: 'lesson' | 'challenge' | 'quiz' | 'success' | 'danger';
  children: React.ReactNode;
}

const variantStyles: Record<BadgeProps['variant'], string> = {
  lesson: 'bg-blue-500 text-white',
  challenge: 'bg-yellow-500 text-black',
  quiz: 'bg-green-500 text-white',
  success: 'bg-green-600 text-white',
  danger: 'bg-red-500 text-white',
};

const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;