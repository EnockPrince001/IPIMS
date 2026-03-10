// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { ClerkProvider } from '@clerk/react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = !!PUBLISHABLE_KEY && PUBLISHABLE_KEY !== 'YOUR_PUBLISHABLE_KEY_HERE';

if (!isClerkConfigured) {
  console.warn(
    '⚠️ Clerk Publishable Key is not set. Set VITE_CLERK_PUBLISHABLE_KEY in your .env file. ' +
    'Sign-in will not work until a valid key is configured.'
  );
}

// Conditional wrapper so the app renders even without Clerk configured
const ClerkWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (isClerkConfigured) {
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        {children}
      </ClerkProvider>
    );
  }
  return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </ClerkWrapper>
  </React.StrictMode>,
);
