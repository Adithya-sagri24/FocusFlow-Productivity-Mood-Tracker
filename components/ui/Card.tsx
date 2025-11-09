import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  const baseClasses = "bg-gray-800 border border-gray-700 rounded-lg shadow-md";
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
