import React from 'react';
import Card from '../components/ui/Card';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p className="text-gray-400">
            This is where user account settings would be, such as changing password or email.
          </p>
          <div className="mt-6">
             <h2 className="text-xl font-semibold mb-4">Theme</h2>
             <p className="text-gray-400">
                Theme selection (e.g., Light/Dark) could be configured here.
             </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
