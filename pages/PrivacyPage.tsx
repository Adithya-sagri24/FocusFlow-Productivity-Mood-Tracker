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
            <li><strong>Personal Data:</strong> Email address when you register.</li>
            <li><strong>Usage Data:</strong> Information about your tasks and application usage.</li>
            <li><strong>Camera Data:</strong> We access your camera to capture frames for emotion detection. These images are sent to a third-party API (Google Gemini) for analysis and are not stored by us.</li>
          </ul>
          <h2>3. Use of Your Information</h2>
          <p>
            Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Provide personalized music recommendations.</li>
            <li>Monitor and analyze usage and trends to improve your experience.</li>
          </ul>
          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information.
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
