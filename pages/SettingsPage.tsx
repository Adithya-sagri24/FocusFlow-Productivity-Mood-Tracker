import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppStore } from '../store/useAppStore';

const SettingsPage: React.FC = () => {
    const session = useAppStore((state) => state.session);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Card>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Account</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Email</label>
                            <p className="text-white mt-1">{session?.user?.email}</p>
                        </div>
                        <Button onClick={() => alert('Not implemented yet!')}>
                            Change Password
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SettingsPage;
