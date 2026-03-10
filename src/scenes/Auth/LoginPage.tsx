// src/scenes/Auth/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <button className="back" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <div className="lcard">
        {/* Logo */}
        <div className="llogo">
          <div className="lmark">💊</div>
          <div className="ltext">
            <span className="ip">IP</span>IMS
          </div>
          <div className="lsub">Intelligent Pharmacy Management System</div>
        </div>

        {/* Heading */}
        <h2 className="lh">
          Login to <span className="ip">IP</span>
          <span className="ims">IMS</span>
        </h2>
        <p className="lst">Enter your credentials to access the system.</p>

        {/* Error */}
        {error && <div className="error-msg">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="fg">
            <input
              type="text"
              className="fi2"
              placeholder="Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="fg">
            <input
              type="password"
              className="fi2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="frow">
            <label className="rem">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="#" className="fl">
              Forgot your password?
            </Link>
          </div>

          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          <p className="lft">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
