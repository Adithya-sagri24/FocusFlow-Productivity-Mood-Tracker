import React from 'react';
import Card from '../components/ui/Card';

const PrivacyPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <Card>
        <div className="p-6 prose prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to FocusFlow. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
          </p>
          <h2>2. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect includes:
          </p>
          <ul>
            <li><strong>Personal Data:</strong> Email address when you register via Supabase Authentication.</li>
            <li><strong>Usage Data:</strong> Information about your tasks and application usage (e.g., tasks you create, Pomodoro sessions you complete). This data is stored securely in our Supabase database and is protected by Row Level Security, meaning you can only access your own data.</li>
            <li><strong>Spotify Data:</strong> If you connect your Spotify account, we store an authentication token in your browser's local storage to make requests to the Spotify API on your behalf. We do not store your Spotify data on our servers.</li>
          </ul>
          <h2>3. Use of Your Information</h2>
          <p>
            Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Provide personalized music recommendations through the Spotify API.</li>
            <li>Monitor and analyze usage and trends to improve your experience.</li>
          </ul>
          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. All data stored in our database is protected by Supabase's built-in security features.
          </p>
          <h2>5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at privacy@focusflow.example.com.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PrivacyPage;
