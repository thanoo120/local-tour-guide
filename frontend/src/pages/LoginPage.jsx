import { useState } from 'react';

function EyeIcon({ show }) {
  return show ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function InputField({ label, type, value, onChange, placeholder, error, rightSlot }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block', fontSize: '13px', fontWeight: '600',
        color: 'var(--color-surface-600)', marginBottom: '6px',
      }} className="dark:text-surface-400">
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%', height: '50px',
            padding: rightSlot ? '0 48px 0 16px' : '0 16px',
            borderRadius: '12px', fontSize: '15px',
            border: `1.5px solid ${error ? '#f87171' : 'var(--color-surface-200)'}`,
            background: 'var(--color-surface-50)',
            color: 'var(--color-surface-900)',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          className="dark:bg-surface-800 dark:text-surface-100 dark:border-surface-700 focus:border-primary-500"
        />
        {rightSlot && (
          <div style={{
            position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
          }}>
            {rightSlot}
          </div>
        )}
      </div>
      {error && (
        <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{error}</p>
      )}
    </div>
  );
}

export default function LoginPage({ onLogin, onSignup }) {
  const [tab, setTab] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [signupErrors, setSignupErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setGlobalError('');
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 400));
    const result = onLogin(loginForm);
    if (!result.ok) setGlobalError(result.error);
    setSubmitting(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!signupForm.name.trim()) errs.name = 'Name is required.';
    if (!signupForm.email.includes('@')) errs.email = 'Enter a valid email.';
    if (signupForm.password.length < 6) errs.password = 'At least 6 characters.';
    if (signupForm.password !== signupForm.confirm) errs.confirm = 'Passwords do not match.';
    if (Object.keys(errs).length) { setSignupErrors(errs); return; }

    setSignupErrors({});
    setGlobalError('');
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 400));
    const result = onSignup(signupForm);
    if (!result.ok) setGlobalError(result.error);
    setSubmitting(false);
  };

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: 'var(--color-surface-50)',
    }} className="dark:bg-surface-950">

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #003d2e 0%, #016b54 60%, #2d9e80 100%)',
        padding: '56px 32px 48px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', left: '-40px',
          width: '140px', height: '140px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />

        <div style={{
          width: '64px', height: '64px', borderRadius: '18px',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          backdropFilter: 'blur(8px)',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
               stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2" />
          </svg>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)', fontWeight: '800',
          fontSize: '28px', color: '#fff', marginBottom: '8px',
        }}>
          LankaGuide
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px' }}>
          Discover the beauty of Sri Lanka
        </p>
      </div>

      {/* Card */}
      <div style={{
        flex: 1, padding: '0 20px 32px',
        marginTop: '-20px',
        background: 'var(--color-surface-50)',
        borderRadius: '24px 24px 0 0',
      }} className="dark:bg-surface-950">

        {/* Tabs */}
        <div style={{
          display: 'flex', background: 'var(--color-surface-100)',
          borderRadius: '12px', padding: '4px', margin: '24px 0 24px',
        }} className="dark:bg-surface-800">
          {['login', 'signup'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTab(t); setGlobalError(''); }}
              style={{
                flex: 1, padding: '10px', borderRadius: '9px',
                fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer',
                transition: 'all 0.2s',
                background: tab === t ? '#fff' : 'transparent',
                color: tab === t ? 'var(--color-primary-600)' : 'var(--color-surface-500)',
                boxShadow: tab === t ? '0 1px 6px rgba(0,0,0,0.1)' : 'none',
              }}
              className={tab === t ? 'dark:bg-surface-700 dark:text-primary-400' : 'dark:text-surface-500'}
            >
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {globalError && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: '10px', padding: '10px 14px',
            fontSize: '13px', color: '#dc2626', marginBottom: '16px',
          }}>
            {globalError}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <InputField
              label="Email"
              type="email"
              value={loginForm.email}
              onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
            />
            <InputField
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={loginForm.password}
              onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Your password"
              rightSlot={
                <button type="button" onClick={() => setShowPass(v => !v)}
                        style={{ color: 'var(--color-surface-400)', lineHeight: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <EyeIcon show={showPass} />
                </button>
              }
            />

            <div style={{ textAlign: 'right', marginTop: '-8px', marginBottom: '20px' }}>
              <button type="button"
                      style={{ fontSize: '13px', color: 'var(--color-primary-600)', fontWeight: '600',
                               background: 'none', border: 'none', cursor: 'pointer' }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%', height: '52px', borderRadius: '14px',
                background: submitting ? 'var(--color-surface-300)' : 'var(--color-primary-600)',
                color: '#fff', fontSize: '16px', fontWeight: '700',
                border: 'none', cursor: submitting ? 'default' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px',
                        color: 'var(--color-surface-500)' }}>
              Demo: <span style={{ color: 'var(--color-surface-700)', fontWeight: '600' }}>demo@lankaguide.com</span>
              {' / '}<span style={{ color: 'var(--color-surface-700)', fontWeight: '600' }}>demo1234</span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <InputField
              label="Full Name"
              type="text"
              value={signupForm.name}
              onChange={e => setSignupForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              error={signupErrors.name}
            />
            <InputField
              label="Email"
              type="email"
              value={signupForm.email}
              onChange={e => setSignupForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              error={signupErrors.email}
            />
            <InputField
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={signupForm.password}
              onChange={e => setSignupForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Min. 6 characters"
              error={signupErrors.password}
              rightSlot={
                <button type="button" onClick={() => setShowPass(v => !v)}
                        style={{ color: 'var(--color-surface-400)', lineHeight: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <EyeIcon show={showPass} />
                </button>
              }
            />
            <InputField
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              value={signupForm.confirm}
              onChange={e => setSignupForm(f => ({ ...f, confirm: e.target.value }))}
              placeholder="Repeat password"
              error={signupErrors.confirm}
              rightSlot={
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                        style={{ color: 'var(--color-surface-400)', lineHeight: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <EyeIcon show={showConfirm} />
                </button>
              }
            />

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%', height: '52px', borderRadius: '14px',
                background: submitting ? 'var(--color-surface-300)' : 'var(--color-primary-600)',
                color: '#fff', fontSize: '16px', fontWeight: '700',
                border: 'none', cursor: submitting ? 'default' : 'pointer',
                transition: 'background 0.2s', marginTop: '4px',
              }}
            >
              {submitting ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
