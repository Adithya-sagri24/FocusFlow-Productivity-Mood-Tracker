import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { GoogleIcon } from './icons';
import Button from './ui/Button';
import Card from './ui/Card';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    // Fix: Using `signInWithOtp` for magic link login, which is the current Supabase v2 method.
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the login link!');
    }
    setLoading(false);
  };
  
  const googleSignIn = async () => {
    setLoading(true);
    // Fix: Using `signInWithOAuth` for OAuth login, which is the current Supabase v2 method.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-2">FocusFlow</h1>
        <p className="text-center text-gray-400 mb-8">Sign in to continue</p>
        
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <span>Sending...</span> : <span>Send magic link</span>}
            </Button>
          </div>
        </form>

        {message && <p className="mt-4 text-center text-sm text-green-400">{message}</p>}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">OR</span>
          </div>
        </div>

        <div>
          <Button variant="secondary" className="w-full" onClick={googleSignIn} disabled={loading}>
            <GoogleIcon className="w-5 h-5 mr-3" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </Card>
  );
}
