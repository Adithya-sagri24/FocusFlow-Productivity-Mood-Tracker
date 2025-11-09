import React from 'react';
import Calendar from '../components/Calendar';
import Card from '../components/ui/Card';

const SchedulePage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Schedule</h1>
            <Card>
                <div className="p-6">
                    <Calendar />
                </div>
            </Card>
        </div>
    );
};

export default SchedulePage;
