import React from 'react';
import Card from '../components/ui/Card';
import WeeklySessionsChart from '../components/charts/WeeklySessionsChart';

const AnalyticsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Pomodoro Sessions This Week</h2>
            <WeeklySessionsChart />
          </div>
        </Card>
        <Card>
           <div className="p-6">
             <h2 className="text-xl font-semibold mb-4">Task Completion Rate</h2>
             <div className="h-48 flex items-center justify-center bg-gray-700 rounded-lg">
                <p className="text-gray-400">Another chart placeholder</p>
             </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
