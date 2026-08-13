import { useState } from 'react';
import { ApiService } from '../services/api.js';

export default function AdminLogin({ onLoginSuccess, onBackHome }) {
  const [username, setUsername] = useState('admin@techavam.in');
  const [password, setPassword] = useState('');
  const [apiUrl, setApiUrl] = useState(ApiService.getApiUrl());
  const [showConfig, setShowConfig] = useState(!ApiService.getApiUrl());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both your username/email and password.');
      return;
    }

    setError('');
    setInfo('');
    setLoading(true);

    try {
      if (apiUrl) {
        ApiService.setApiUrl(apiUrl);
      }

      const res = await ApiService.login(username.trim(), password.trim(), apiUrl);

      if (res.success) {
        if (res.isOfflineMode) {
          setInfo(res.message || 'Logged in. (Live sheet fetching requires Apps Script URL).');
        }
        onLoginSuccess();
      } else {
        setError(res.message || 'Invalid credentials. Please verify and try again.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-card__brand">
          <span className="admin-login-card__kicker">TechoCrats · IT Department</span>
          <h1 className="admin-login-card__title">TECHAVAM 2026</h1>
          <p className="admin-login-card__sub">Organiser Registration Portal</p>
        </div>

        {error && (
          <div className="admin-login-alert admin-login-alert--error" role="alert">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {info && (
          <div className="admin-login-alert admin-login-alert--info" role="status">
            <span>ℹ️</span>
            <p>{info}</p>
          </div>
        )}

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-user" className="admin-form-label">
              Organiser Username / Email
            </label>
            <input
              id="admin-user"
              type="text"
              className="admin-form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin@techavam.in"
              required
              autoComplete="username"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-pass" className="admin-form-label">
              Password
            </label>
            <input
              id="admin-pass"
              type="password"
              className="admin-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter organiser password"
              required
              autoComplete="current-password"
            />
          </div>

          {/* Toggle Apps Script URL configuration */}
          <div className="admin-config-toggle">
            <button
              type="button"
              className="admin-btn-link"
              onClick={() => setShowConfig(!showConfig)}
            >
              {showConfig ? '▼ Hide Backend URL Setting' : '⚙️ Configure Apps Script Web App URL'}
            </button>

            {showConfig && (
              <div className="admin-config-box">
                <label htmlFor="admin-api" className="admin-form-label">
                  Google Apps Script Web App URL
                </label>
                <input
                  id="admin-api"
                  type="url"
                  className="admin-form-input admin-form-input--mono"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                />
                <p className="admin-form-hint">
                  Deploy the <code>google-apps-script/</code> scripts to connect to live Google Sheets.
                </p>
              </div>
            )}
          </div>

          <div className="admin-form-actions">
            <button
              type="submit"
              className="btn btn--gold btn--full"
              disabled={loading}
            >
              {loading ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD →'}
            </button>
          </div>
        </form>

        <div className="admin-login-card__footer">
          <button type="button" className="admin-btn-back" onClick={onBackHome}>
            ← Return to TECHAVAM 2026 Home
          </button>
          <p className="admin-login-notice">
            Confidential organiser system · Protected by role-based session tokens
          </p>
        </div>
      </div>
    </div>
  );
}
