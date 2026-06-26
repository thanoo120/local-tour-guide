import { useState } from 'react';

function EyeIcon({ show }) {
  return show ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function InputField({ label, type, value, onChange, placeholder, error, rightSlot, className = '' }) {
  return (
    <div style={{ marginBottom: '16px' }} className={className}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%', height: '52px',
            padding: rightSlot ? '0 48px 0 16px' : '0 16px',
            borderRadius: '14px', fontSize: '15px',
            border: `2px solid ${error ? '#f43f5e' : '#e2e8f0'}`,
            background: '#f8f7ff',
            color: '#0f172a',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxSizing: 'border-box',
          }}
          onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)'; }}
          onBlur={e => { e.target.style.borderColor = error ? '#f43f5e' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
        />
        {rightSlot && (
          <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
            {rightSlot}
          </div>
        )}
      </div>
      {error && <p style={{ fontSize: '12px', color: '#f43f5e', marginTop: '5px', fontWeight: '500' }}>{error}</p>}
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
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: '#f8f7ff' }}>

     
      <div style={{
        background: 'linear-gradient(160deg, #1a0533 0%, #2d1b69 40%, #0d1b4a 70%, #03254e 100%)',
        padding: '52px 28px 64px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', left: '-30px',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '40px', left: '30px',
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)',
        }} />

        
        <div style={{
          width: '72px', height: '72px', borderRadius: '22px',
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 8px 32px rgba(124,58,237,0.4)',
          position: 'relative', zIndex: 1,
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="white" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)', fontWeight: '800',
          fontSize: '30px', marginBottom: '8px', position: 'relative', zIndex: 1,
          background: 'linear-gradient(90deg, #a78bfa, #67e8f9, #fbbf24)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          LankaGuide
        </h1>
        <p style={{ color: 'rgba(167,139,250,0.85)', fontSize: '15px', position: 'relative', zIndex: 1 }}>
          Discover the beauty of Sri Lanka
        </p>

        
        {[...Array(6)].map((_, i) => (
          <div key={i}
            className="animate-float"
            style={{
              position: 'absolute',
              width: '6px', height: '6px', borderRadius: '50%',
              background: ['#7c3aed','#06b6d4','#f97316','#f43f5e','#10b981','#fbbf24'][i],
              opacity: 0.6,
              top: `${[20,60,35,75,50,15][i]}%`,
              left: `${[15,8,85,90,5,92][i]}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

    
      <div
        className="animate-fade-in-up stagger-1"
        style={{
          flex: 1, padding: '0 20px 32px',
          marginTop: '-24px',
          background: '#f8f7ff',
          borderRadius: '28px 28px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.08)',
        }}
      >

        
        <div style={{
          display: 'flex',
          background: '#ede9fe',
          borderRadius: '14px', padding: '4px', margin: '24px 0',
        }}>
          {['login', 'signup'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTab(t); setGlobalError(''); }}
              style={{
                flex: 1, padding: '11px', borderRadius: '11px',
                fontSize: '14px', fontWeight: '700', border: 'none', cursor: 'pointer',
                transition: 'all 0.2s',
                background: tab === t
                  ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                  : 'transparent',
                color: tab === t ? '#fff' : '#7c3aed',
                boxShadow: tab === t ? '0 4px 12px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {globalError && (
          <div style={{
            background: '#fef2f2', border: '1.5px solid #fecaca',
            borderRadius: '12px', padding: '10px 14px',
            fontSize: '13px', color: '#dc2626', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {globalError}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <InputField
              label="Email Address"
              type="email"
              value={loginForm.email}
              onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              className="animate-fade-in-up stagger-2"
            />
            <InputField
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={loginForm.password}
              onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Your password"
              className="animate-fade-in-up stagger-3"
              rightSlot={
                <button type="button" onClick={() => setShowPass(v => !v)}
                        style={{ color: '#94a3b8', lineHeight: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <EyeIcon show={showPass} />
                </button>
              }
            />

            <div style={{ textAlign: 'right', marginTop: '-8px', marginBottom: '24px' }} className="animate-fade-in-up stagger-4">
              <button type="button" style={{ fontSize: '13px', color: '#7c3aed', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="animate-fade-in-up stagger-4"
              style={{
                width: '100%', height: '54px', borderRadius: '16px',
                background: submitting ? '#e2e8f0' : 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #06b6d4 100%)',
                color: submitting ? '#94a3b8' : '#fff',
                fontSize: '16px', fontWeight: '700',
                border: 'none', cursor: submitting ? 'default' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: submitting ? 'none' : '0 6px 20px rgba(124,58,237,0.35)',
              }}
            >
              {submitting ? 'Signing in…' : 'Sign In →'}
            </button>


          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <InputField
              label="Full Name"
              type="text"
              value={signupForm.name}
              onChange={e => setSignupForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your full name"
              error={signupErrors.name}
              className="animate-fade-in-up stagger-2"
            />
            <InputField
              label="Email Address"
              type="email"
              value={signupForm.email}
              onChange={e => setSignupForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              error={signupErrors.email}
              className="animate-fade-in-up stagger-3"
            />
            <InputField
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={signupForm.password}
              onChange={e => setSignupForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Min. 6 characters"
              error={signupErrors.password}
              className="animate-fade-in-up stagger-4"
              rightSlot={
                <button type="button" onClick={() => setShowPass(v => !v)}
                        style={{ color: '#94a3b8', lineHeight: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
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
              className="animate-fade-in-up stagger-5"
              rightSlot={
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                        style={{ color: '#94a3b8', lineHeight: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <EyeIcon show={showConfirm} />
                </button>
              }
            />

            <button
              type="submit"
              disabled={submitting}
              className="animate-fade-in-up stagger-6"
              style={{
                width: '100%', height: '54px', borderRadius: '16px', marginTop: '4px',
                background: submitting ? '#e2e8f0' : 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #06b6d4 100%)',
                color: submitting ? '#94a3b8' : '#fff',
                fontSize: '16px', fontWeight: '700',
                border: 'none', cursor: submitting ? 'default' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: submitting ? 'none' : '0 6px 20px rgba(124,58,237,0.35)',
              }}
            >
              {submitting ? 'Creating account…' : 'Create Account →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
