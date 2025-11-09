import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ children, className, ...props }) => {
  const baseClasses = "flex-shrink-0 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500";
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
