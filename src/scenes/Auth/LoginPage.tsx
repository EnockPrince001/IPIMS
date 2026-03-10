// src/scenes/Auth/LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '@clerk/react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <button className="back" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <div className="clerk-signin-wrapper">
        <SignIn
          signUpUrl="/signup"
          forceRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: {
                width: '100%',
                maxWidth: '460px',
              },
              card: {
                borderRadius: '24px',
                boxShadow: '0 24px 80px rgba(26, 58, 42, 0.11), 0 4px 16px rgba(0, 0, 0, 0.05)',
              },
              headerTitle: {
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
              },
              formButtonPrimary: {
                background: 'linear-gradient(135deg, #2d6a4f, #40916c)',
                borderRadius: '10px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                padding: '15px',
                boxShadow: '0 4px 16px rgba(45, 106, 79, 0.28)',
                transition: 'all 0.25s',
              },
              formFieldInput: {
                borderRadius: '10px',
                border: '1.5px solid #cde3d6',
                fontFamily: "'DM Sans', sans-serif",
                background: '#f8fcfa',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
