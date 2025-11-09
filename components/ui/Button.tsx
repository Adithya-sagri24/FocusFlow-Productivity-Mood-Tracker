import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'subtle';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600',
    subtle: 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
