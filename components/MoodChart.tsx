import React from 'react';
import Card from './ui/Card';

const MoodChart: React.FC = () => {
  // A real implementation would use a charting library like Chart.js or Recharts
  // to visualize mood history. This is a placeholder.
  return (
    <Card>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white mb-4">Mood Over Time</h2>
        <div className="h-48 flex items-center justify-center bg-gray-700 rounded-lg">
          <p className="text-gray-400">Mood chart placeholder</p>
        </div>
      </div>
    </Card>
  );
};

export default MoodChart;
