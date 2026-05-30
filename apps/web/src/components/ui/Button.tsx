import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md';
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  onClick,
  children,
}) => {
  const baseStyles = 'rounded focus:outline-none transition duration-200';
  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent-dim',
    ghost: 'bg-transparent text-accent hover:bg-accent-dim',
    outline: 'border border-accent text-accent hover:bg-accent-dim',
  };
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-md',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      onClick={onClick}
      disabled={loading}
      type="button"
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;