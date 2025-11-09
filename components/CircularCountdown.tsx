import React from 'react';

interface CircularCountdownProps {
  percentage: number;
  time: string;
}

const CircularCountdown: React.FC<CircularCountdownProps> = ({ percentage, time }) => {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <svg className="absolute w-full h-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          strokeWidth="15"
          className="stroke-gray-700"
          fill="transparent"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          strokeWidth="15"
          className="stroke-purple-500 transition-all duration-500"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />
      </svg>
      <span className="text-5xl font-bold text-white z-10">{time}</span>
    </div>
  );
};

export default CircularCountdown;
