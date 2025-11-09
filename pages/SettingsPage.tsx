// Fix: Implemented the missing Settings page.
import React from 'react';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAppStore } from '../store/useAppStore';

const SettingsPage: React.FC = () => {
    const session = useAppStore((state) => state.session);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Card>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Account</h2>
                    {session?.user && (
                        <p className="mb-4 text-gray-300">
                            Logged in as: <strong>{session.user.email}</strong>
                        </p>
                    )}
                    <Button onClick={handleLogout} variant="secondary">
                        Sign Out
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default SettingsPage;
