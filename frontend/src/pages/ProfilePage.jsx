import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';


function ToggleSwitch({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onChange(!on); }}
      aria-checked={on}
      role="switch"
      style={{
        width: '44px', height: '26px', borderRadius: '999px',
        background: on ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : '#e2e8f0',
        border: 'none', cursor: 'pointer', padding: '3px',
        transition: 'background 0.2s',
        display: 'flex', alignItems: 'center',
        justifyContent: on ? 'flex-end' : 'flex-start',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%',
        background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'all 0.2s',
      }} />
    </button>
  );
}

function InputField({ label, value, onChange, placeholder, error, type = 'text' }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block', fontSize: '13px', fontWeight: '600',
        marginBottom: '6px',
      }} className="text-surface-600 dark:text-surface-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%', height: '50px',
          padding: '0 16px', borderRadius: '12px', fontSize: '15px',
          borderStyle: 'solid', borderWidth: '1.5px',
          outline: 'none', boxSizing: 'border-box',
        }}
        className={`${
          error
            ? 'border-red-400 dark:border-red-500'
            : 'border-surface-200 dark:border-surface-700'
        } bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-surface-100`}
      />
      {error && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{error}</p>}
    </div>
  );
}


function Sheet({ title, onClose, children }) {
  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: '100%', maxWidth: '400px',
          borderRadius: '24px',
          maxHeight: '85dvh', display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.05)',
        }}
        className="bg-surface-50 dark:bg-surface-900 animate-modal-pop"
      >
        {/* Header */}
        <div style={{ padding: '20px 20px 0', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingBottom: '14px',
          }} className="border-b border-surface-100 dark:border-surface-800">
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}
                className="text-surface-900 dark:text-surface-100">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 0.2s',
              }}
              className="bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                   className="text-surface-500 dark:text-surface-400">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 20px 24px' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─── Edit Profile Sheet ────────────────────────────────── */

function EditProfileSheet({ user, onUpdateProfile, onClose, t }) {
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = t('editProfile.nameRequired');
    if (!email.includes('@')) errs.email = t('editProfile.validEmail');
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    const result = onUpdateProfile({ name, email });
    setSaving(false);
    if (!result.ok) { setErrors({ name: result.error }); return; }
    setSaved(true);
    setTimeout(onClose, 900);
  };

  return (
    <form onSubmit={handleSave}>
      <InputField
        label={t('editProfile.fullName')}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder={t('editProfile.yourName')}
        error={errors.name}
      />
      <InputField
        label={t('editProfile.emailAddress')}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        error={errors.email}
      />

      <button
        type="submit"
        disabled={saving || saved}
        style={{
          width: '100%', height: '52px', borderRadius: '14px', marginTop: '8px',
          border: 'none', cursor: saving || saved ? 'default' : 'pointer',
          transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          fontWeight: '700', fontSize: '16px',
        }}
        className={
          saved
            ? 'bg-green-600 text-white'
            : saving
            ? 'bg-surface-300 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
            : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20'
        }
      >
        {saved ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t('editProfile.saved')}
          </>
        ) : saving ? t('editProfile.saving') : t('editProfile.saveChanges')}
      </button>
    </form>
  );
}

/* ─── Language Sheet ────────────────────────────────────── */

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'si', label: 'Sinhala', native: 'සිංහල' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'zh', label: 'Chinese', native: '中文' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
];

function LanguageSheet({ onClose }) {
  const { language, setLanguage } = useLanguage();

  const pick = (code) => {
    setLanguage(code);
    setTimeout(onClose, 300);
  };

  return (
    <div>
      {LANGUAGES.map((lang) => {
        const active = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => pick(lang.code)}
            style={{
              width: '100%', padding: '14px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderRadius: '12px', cursor: 'pointer', marginBottom: '8px',
              transition: 'all 0.15s',
              borderWidth: '1.5px',
              borderStyle: 'solid',
            }}
            className={active 
              ? 'bg-primary-50 dark:bg-primary-950/30 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400' 
              : 'bg-transparent border-surface-100 dark:border-surface-800 text-surface-600 dark:text-surface-400'}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '15px', fontWeight: '600' }}
                   className={active ? 'text-primary-700 dark:text-primary-400' : 'text-surface-800 dark:text-surface-200'}>
                {lang.label}
              </div>
              <div style={{ fontSize: '13px', marginTop: '2px' }}
                   className="text-surface-400 dark:text-surface-500">
                {lang.native}
              </div>
            </div>
            {active && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                   className="text-primary-600 dark:text-primary-400">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Privacy & Security Sheet ──────────────────────────── */

const PRIVACY_SETTINGS = [
  {
    key: 'publicProfile',
    label: 'Public Profile',
    description: 'Allow others to see your travel activity',
    defaultOn: true,
  },
  {
    key: 'analytics',
    label: 'Usage Analytics',
    description: 'Help improve the app by sharing anonymous usage data',
    defaultOn: true,
  },
  {
    key: 'personalization',
    label: 'Personalized Recommendations',
    description: 'Use your activity to suggest relevant attractions',
    defaultOn: true,
  },
  {
    key: 'marketing',
    label: 'Marketing Emails',
    description: 'Receive news, offers and travel tips via email',
    defaultOn: false,
  },
];

function PrivacySheet({ onClose }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('lanka_privacy') ?? 'null');
      if (stored) return stored;
    } catch {}
    return Object.fromEntries(PRIVACY_SETTINGS.map(s => [s.key, s.defaultOn]));
  });

  const toggle = (key) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('lanka_privacy', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div>
      <p style={{ fontSize: '13px', marginBottom: '20px', lineHeight: '1.5' }}
         className="text-surface-500 dark:text-surface-400">
        Control how your data is used within LankaGuide. Changes are saved automatically.
      </p>

      {PRIVACY_SETTINGS.map((s, i) => (
        <div key={s.key}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '14px 0',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '2px' }}
                   className="text-surface-800 dark:text-surface-200">
                {s.label}
              </div>
              <div style={{ fontSize: '13px', lineHeight: '1.4' }}
                   className="text-surface-400 dark:text-surface-500">
                {s.description}
              </div>
            </div>
            <ToggleSwitch on={settings[s.key]} onChange={() => toggle(s.key)} />
          </div>
          {i < PRIVACY_SETTINGS.length - 1 && (
            <div style={{ height: '1px' }}
                 className="bg-surface-100 dark:bg-surface-800" />
          )}
        </div>
      ))}

      <div style={{
        marginTop: '24px', padding: '14px 16px',
        borderRadius: '12px',
        borderWidth: '1px',
        borderStyle: 'solid',
      }} className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40">
        <p style={{ fontSize: '13px', lineHeight: '1.5' }}
           className="text-amber-800 dark:text-amber-400">
          Your data is stored locally on this device and never shared with third parties without your consent.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        style={{
          width: '100%', height: '50px', borderRadius: '14px', marginTop: '20px',
          background: 'var(--color-primary-600)', color: '#fff',
          fontSize: '15px', fontWeight: '700', border: 'none', cursor: 'pointer',
        }}
      >
        Done
      </button>
    </div>
  );
}

/* ─── Help & FAQ Sheet ──────────────────────────────────── */

const FAQ_ITEMS = [
  {
    q: 'How do I save an attraction to my Favorites?',
    a: 'Tap the heart icon on any attraction card or detail page. Your favorites are saved locally and accessible from the Favorites tab at any time.',
  },
  {
    q: 'Does LankaGuide work offline?',
    a: 'Attraction data is loaded from a local fallback when there is no internet connection, so you can still browse most content offline. Live maps and directions require an internet connection.',
  },
  {
    q: 'How accurate is the distance shown on attraction cards?',
    a: 'Distances are calculated from your current GPS location. Make sure Location Services is enabled in your Profile settings for accurate results.',
  },
  {
    q: 'Can I change the app language?',
    a: 'Yes! Go to Profile → Language and select your preferred language from the list.',
  },
  {
    q: 'How do I update my name or email?',
    a: 'Tap "Edit Profile" on the Profile page. Enter your new details and tap Save Changes.',
  },
  {
    q: 'How do I report a wrong or outdated attraction listing?',
    a: 'Use the "Send Feedback" option in the Profile page and describe the issue. Our team reviews all feedback regularly.',
  },
  {
    q: 'Is my data safe?',
    a: 'All personal data is stored locally on your device. We do not transmit personally identifiable information to external servers without your explicit consent.',
  },
];

function HelpSheet() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <p style={{ fontSize: '13px', marginBottom: '20px', lineHeight: '1.5' }}
         className="text-surface-500 dark:text-surface-400">
        Frequently asked questions about using LankaGuide.
      </p>

      {FAQ_ITEMS.map((item, i) => (
        <div key={i} style={{ marginBottom: '8px' }}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', padding: '14px 16px',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px',
              border: 'none', borderRadius: open === i ? '12px 12px 0 0' : '12px',
              cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.15s',
            }}
            className={
              open === i 
                ? 'bg-primary-50 dark:bg-primary-950/30' 
                : 'bg-surface-100 dark:bg-surface-800'
            }
          >
            <span style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.4', flex: 1 }}
                  className={open === i ? 'text-primary-700 dark:text-primary-400' : 'text-surface-800 dark:text-surface-200'}>
              {item.q}
            </span>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0, marginTop: '1px' }}
              className="text-surface-400 dark:text-surface-500"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open === i && (
            <div style={{
              padding: '12px 16px 14px',
              borderRadius: '0 0 12px 12px',
            }} className="bg-primary-50 dark:bg-primary-950/20 border-t border-primary-100 dark:border-primary-900/40">
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}
                 className="text-surface-600 dark:text-surface-400">
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px' }} className="text-surface-400 dark:text-surface-500">
          Still need help?{' '}
          <span
            style={{ color: 'var(--color-primary-600)', fontWeight: '600', cursor: 'pointer' }}
            className="dark:text-primary-400"
          >
            Send us a message
          </span>
        </p>
      </div>
    </div>
  );
}

/* ─── Send Feedback Sheet ───────────────────────────────── */

const FEEDBACK_CATEGORIES = [
  { value: 'bug', label: '🐛  Bug Report' },
  { value: 'suggestion', label: '💡  Suggestion' },
  { value: 'content', label: '📍  Attraction Issue' },
  { value: 'compliment', label: '🌟  Compliment' },
  { value: 'other', label: '💬  Other' },
];

function FeedbackSheet({ user, onClose }) {
  const [category, setCategory] = useState('suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim().length < 10) {
      setError('Please write at least 10 characters.');
      return;
    }
    setError('');
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 600));

    const record = {
      category,
      message: message.trim(),
      email: user?.email ?? 'anonymous',
      timestamp: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem('lanka_feedback') ?? '[]');
      localStorage.setItem('lanka_feedback', JSON.stringify([...existing, record]));
    } catch {}

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
               stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}
            className="text-surface-900 dark:text-surface-100">
          Thanks for your feedback!
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '28px' }}
           className="text-surface-500 dark:text-surface-400">
          We read every message and use them to make LankaGuide better. We'll follow up if we need more details.
        </p>
        <button
          type="button"
          onClick={onClose}
          style={{
            width: '100%', height: '50px', borderRadius: '14px',
            background: 'var(--color-primary-600)', color: '#fff',
            fontSize: '15px', fontWeight: '700', border: 'none', cursor: 'pointer',
          }}
        >
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ fontSize: '13px', marginBottom: '20px', lineHeight: '1.5' }}
         className="text-surface-500 dark:text-surface-400">
        Tell us what's on your mind. We read every message.
      </p>

      {/* Category picker */}
      <p style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px' }}
         className="text-surface-600 dark:text-surface-400">
        Category
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {FEEDBACK_CATEGORIES.map(c => (
          <button
            key={c.value}
            type="button"
            onClick={() => setCategory(c.value)}
            style={{
              padding: '8px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: '600',
              borderStyle: 'solid', borderWidth: '1.5px',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            className={category === c.value
              ? 'border-primary-400 dark:border-primary-700 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-400'
              : 'border-surface-200 dark:border-surface-700 bg-transparent text-surface-600 dark:text-surface-400'}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Message */}
      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}
               className="text-surface-600 dark:text-surface-400">
          Message
        </label>
        <textarea
          value={message}
          onChange={e => { setMessage(e.target.value); setError(''); }}
          placeholder="Describe the issue, idea, or experience…"
          rows={5}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '15px',
            borderStyle: 'solid', borderWidth: '1.5px',
            outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: '1.5',
            fontFamily: 'inherit',
          }}
          className={`${
            error
              ? 'border-red-400 dark:border-red-500'
              : 'border-surface-200 dark:border-surface-700'
          } bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-surface-100`}
        />
        {error && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{error}</p>}
        <p style={{ fontSize: '12px', marginTop: '4px', textAlign: 'right' }}
           className={message.length < 10 ? 'text-surface-400' : 'text-primary-600 dark:text-primary-400'}>
          {message.length} characters {message.length < 10 ? `(${10 - message.length} more needed)` : '✓'}
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%', height: '52px', borderRadius: '14px', marginTop: '12px',
          border: 'none', cursor: submitting ? 'default' : 'pointer', transition: 'all 0.2s',
          fontWeight: '700', fontSize: '16px',
        }}
        className={
          submitting
            ? 'bg-surface-300 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
            : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20'
        }
      >
        {submitting ? 'Sending…' : 'Send Feedback'}
      </button>
    </form>
  );
}

/* ─── About Sheet ───────────────────────────────────────── */

function AboutSheet() {
  return (
    <div>
      {/* Logo block */}
      <div style={{
        background: 'linear-gradient(135deg, #003d2e, #016b54)',
        borderRadius: '16px', padding: '28px 24px', textAlign: 'center', marginBottom: '24px',
      }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '16px',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
               stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '4px',
                     fontFamily: 'var(--font-heading)' }}>
          LankaGuide
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
          Version 1.0.0
        </p>
      </div>

      {/* Info rows */}
      {[
        { label: 'Version', value: '1.0.0' },
        { label: 'Platform', value: 'Web (React + Vite)' },
        { label: 'Data', value: 'Local + REST API' },
        { label: 'License', value: 'MIT' },
      ].map(row => (
        <div key={row.label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 0',
        }} className="border-b border-surface-100 dark:border-surface-800">
          <span style={{ fontSize: '14px' }} className="text-surface-500 dark:text-surface-400">
            {row.label}
          </span>
          <span style={{ fontSize: '14px', fontWeight: '600' }}
                className="text-surface-800 dark:text-surface-200">
            {row.value}
          </span>
        </div>
      ))}

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', lineHeight: '1.7' }}
           className="text-surface-400 dark:text-surface-500">
          LankaGuide helps travellers discover the best of Sri Lanka — from ancient temples to pristine beaches.
          Built with ❤️ for explorers.
        </p>
      </div>
    </div>
  );
}

/* ─── Stats & Menu data ─────────────────────────────────── */

// STATS use stable string keys for label, translated in the render
const STATS = [
  {
    labelKey: 'profile.placesVisited', value: '12',
  },
  {
    labelKey: 'profile.favorites', value: null,
  },
  {
    labelKey: 'profile.reviews', value: '5',
  },
];

function MenuItem({ item }) {
  const [on, setOn] = useState(item.defaultOn ?? false);

  const handleToggle = () => {
    if (item.disabled) return;
    const next = !on;
    setOn(next);
    if (item.onToggle) item.onToggle(next);
  };

  // Toggle rows use a div wrapper to avoid nested <button> in <button> (invalid HTML)
  const sharedStyle = {
    display: 'flex', alignItems: 'center', gap: '14px',
    width: '100%', padding: '14px 20px',
    background: 'none', border: 'none',
    textAlign: 'left',
    opacity: item.disabled ? 0.5 : 1,
  };

  const inner = (
    <>
      <div style={{
        width: '38px', height: '38px', borderRadius: '12px',
        background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#7c3aed', flexShrink: 0,
      }}>
        {item.icon}
      </div>

      <span style={{ flex: 1, fontSize: '15px', fontWeight: '500', color: 'inherit' }}
            className="text-surface-800 dark:text-surface-200">
        {item.label}
      </span>

      {item.toggle ? (
        <ToggleSwitch on={on} onChange={setOn} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {item.value && (
            <span style={{ fontSize: '13px' }} className="text-surface-400 dark:text-surface-500">
              {item.value}
            </span>
          )}
          {item.chevron && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 className="text-surface-400 dark:text-surface-500">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </div>
      )}
    </>
  );

  if (item.toggle) {
    return (
      <div
        role="button"
        tabIndex={item.disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(); }}
        aria-disabled={item.disabled}
        style={{
          ...sharedStyle,
          cursor: item.disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {inner}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      style={{
        ...sharedStyle,
        cursor: item.chevron ? 'pointer' : 'default',
      }}
    >
      {inner}
    </button>
  );
}


/* ─── Appearance Sheet ──────────────────────────────────── */

const THEME_OPTIONS = [
  {
    value: 'light',
    label: 'Light',
    description: 'Always use the light theme',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Always use the dark theme',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
  },
  {
    value: 'system',
    label: 'System',
    description: 'Follow your device setting',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

function AppearanceSheet({ theme, onSetTheme, onClose, t }) {
  const [selected, setSelected] = useState(theme ?? 'system');

  const pick = (value) => {
    setSelected(value);
    onSetTheme(value);
  };

  return (
    <div>
      <p style={{ fontSize: '13px', marginBottom: '20px', lineHeight: '1.5' }}
         className="text-surface-500 dark:text-surface-400">
        Choose how LankaGuide looks. The System option follows your device's appearance setting.
      </p>

      {THEME_OPTIONS.map((opt) => {
        const active = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => pick(opt.value)}
            style={{
              width: '100%', padding: '14px 16px', marginBottom: '10px',
              display: 'flex', alignItems: 'center', gap: '14px',
              borderRadius: '14px', cursor: 'pointer',
              transition: 'all 0.15s', textAlign: 'left',
              borderWidth: '1.5px',
              borderStyle: 'solid',
            }}
            className={active 
              ? 'bg-primary-50 dark:bg-primary-950/30 border-primary-300 dark:border-primary-700' 
              : 'bg-transparent border-surface-100 dark:border-surface-800'}
          >
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} className={active 
              ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400' 
              : 'bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400'}>
              {opt.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '2px' }}
                   className={active ? 'text-primary-700 dark:text-primary-400' : 'text-surface-800 dark:text-surface-200'}>
                {opt.label}
              </div>
              <div style={{ fontSize: '13px', lineHeight: '1.4' }}
                   className="text-surface-400 dark:text-surface-500">
                {opt.description}
              </div>
            </div>

            {active && (
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                background: 'var(--color-primary-600)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                     stroke="white" strokeWidth="3" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </button>
        );
      })}

      <button
        type="button"
        onClick={onClose}
        style={{
          width: '100%', height: '50px', borderRadius: '14px', marginTop: '8px',
          background: 'var(--color-primary-600)', color: '#fff',
          fontSize: '15px', fontWeight: '700', border: 'none', cursor: 'pointer',
        }}
      >
        {t('common.done')}
      </button>
    </div>
  );
}

/* ─── ProfilePage ───────────────────────────────────────── */

export default function ProfilePage({ user, favoritesCount = 0, onLogout, onUpdateProfile, onUpdateProfilePhoto, theme, onSetTheme, notifications }) {
  const { t, language, setLanguage } = useLanguage();
  const [sheet, setSheet] = useState(null); // 'editProfile' | 'language' | 'privacy' | 'help' | 'feedback' | 'about' | 'appearance'

  const langLabel = LANGUAGES.find(l => l.code === language)?.label ?? 'English';

  // Derived notification status label
  const notifLabel = !notifications?.supported
    ? 'N/A'
    : notifications.permission === 'denied'
    ? t('notifications.blocked')
    : notifications.enabled
    ? t('notifications.enabled')
    : t('notifications.disabled');

  // Handle notification toggle
  const handleNotificationToggle = async (on) => {
    if (on) {
      await notifications.enable();
    } else {
      notifications.disable();
    }
  };

  const initials = user?.initials ?? '?';
  const displayName = user?.name ?? 'Traveler';
  const profilePhoto = user?.photo ?? null;

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onUpdateProfilePhoto?.(ev.target.result);
    };
    reader.readAsDataURL(file);
  };
  const displayEmail = user?.email ?? '';

  const stats = STATS.map(s =>
    s.labelKey === 'profile.favorites' ? { ...s, value: String(favoritesCount) } : s
  );

  // Stats colors per item
  const STAT_CONFIGS = [
    { gradient: 'linear-gradient(135deg, #f97316, #ef4444)', shadow: 'rgba(249,115,22,0.25)' },
    { gradient: 'linear-gradient(135deg, #f43f5e, #be185d)',  shadow: 'rgba(244,63,94,0.25)'  },
    { gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',  shadow: 'rgba(245,158,11,0.25)'  },
  ];

  const MENU_SECTIONS = [
    {
      title: t('profile.preferences'),
      items: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
            </svg>
          ),
          label: t('profile.language'),
          value: langLabel,
          chevron: true,
          onClick: () => setSheet('language'),
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          ),
          label: t('profile.appearance'),
          value: theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System',
          chevron: true,
          onClick: () => setSheet('appearance'),
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          ),
          label: t('profile.locationServices'),
          value: t('common.on'),
          chevron: false,
          toggle: true,
          defaultOn: true,
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 8h1a4 4 0 010 8h-1" />
              <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          ),
          label: t('profile.notifications'),
          value: notifLabel,
          chevron: false,
          toggle: notifications?.supported && notifications.permission !== 'denied',
          defaultOn: notifications?.enabled ?? false,
          onToggle: handleNotificationToggle,
          // When permission is 'denied', show a disabled toggle with a blocked state
          disabled: notifications?.permission === 'denied',
        },
      ],
    },
    {
      title: t('profile.account'),
      items: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          ),
          label: t('profile.editProfile'),
          chevron: true,
          onClick: () => setSheet('editProfile'),
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          ),
          label: t('profile.privacySecurity'),
          chevron: true,
          onClick: () => setSheet('privacy'),
        },
      ],
    },
    {
      title: t('profile.support'),
      items: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          ),
          label: t('profile.helpFaq'),
          chevron: true,
          onClick: () => setSheet('help'),
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          ),
          label: t('profile.sendFeedback'),
          chevron: true,
          onClick: () => setSheet('feedback'),
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          ),
          label: t('profile.aboutApp'),
          value: 'v1.0.0',
          chevron: true,
          onClick: () => setSheet('about'),
        },
      ],
    },
  ];

  return (
    <div className="page-content">

      {/* Hero gradient bar */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0d1b4a 100%)',
        padding: '28px 20px 56px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: '-30px', right: '-30px',
          width: '140px', height: '140px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20px', left: '-20px',
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
        }} />
      </div>

      {/* Avatar + name */}
      <div style={{ padding: '0 20px 20px', textAlign: 'center', marginTop: '-48px', position: 'relative', zIndex: 2 }}>
        <label
          htmlFor="profile-photo-input"
          style={{ display: 'inline-block', cursor: 'pointer', position: 'relative', margin: '0 auto 14px' }}
          title="Change profile photo"
        >
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            background: profilePhoto ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 24px rgba(124,58,237,0.4)',
            overflow: 'hidden',
            border: '4px solid #f8f7ff',
          }}>
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{
                fontFamily: 'var(--font-heading)', fontWeight: '800',
                fontSize: '32px', color: '#fff', letterSpacing: '1px',
              }}>{initials}</span>
            )}
          </div>
          {/* Camera overlay */}
          <div style={{
            position: 'absolute', bottom: '2px', right: '2px',
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            border: '2.5px solid #f8f7ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                 stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <input
            id="profile-photo-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
        </label>

        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px', fontFamily: 'Epilogue, sans-serif' }}
            className="text-surface-900 dark:text-surface-50">
          {displayName}
        </h2>
        <p style={{ fontSize: '13px', marginBottom: '16px' }}
           className="text-surface-500 dark:text-surface-400">
          {displayEmail}
        </p>

        <button
          type="button"
          onClick={() => setSheet('editProfile')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            color: '#fff',
            padding: '10px 22px', borderRadius: '999px',
            fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          {t('profile.editProfile')}
        </button>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', gap: '12px', margin: '0 20px 24px',
      }}>
        {stats.map((stat, i) => {
          const cfg = STAT_CONFIGS[i] || STAT_CONFIGS[0];
          const label = t(stat.labelKey);
          return (
            <div key={stat.labelKey} style={{
              flex: 1, padding: '14px 8px', textAlign: 'center',
              borderRadius: '16px',
              boxShadow: `0 4px 16px ${cfg.shadow}`,
            }} className="bg-white dark:bg-surface-900 border border-black/5 dark:border-surface-800">
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: cfg.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 6px',
              }}>
                {stat.labelKey === 'profile.placesVisited' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3" fill="white" stroke="none"/></svg>
                )}
                {stat.labelKey === 'profile.favorites' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                )}
                {stat.labelKey === 'profile.reviews' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                )}
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', lineHeight: '1', fontFamily: 'Epilogue, sans-serif' }}
                   className="text-surface-900 dark:text-surface-50">
                {stat.value}
              </div>
              <div style={{ fontSize: '10px', marginTop: '3px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                   className="text-surface-400 dark:text-surface-500">
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Menu sections */}
      {MENU_SECTIONS.map((section) => (
        <div key={section.title} style={{ marginBottom: '12px' }}>
          <p style={{
            fontSize: '11px', fontWeight: '800', textTransform: 'uppercase',
            letterSpacing: '0.1em', padding: '0 20px 8px', color: '#94a3b8',
          }}>
            {section.title}
          </p>
          <div style={{
            margin: '0 20px', borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }} className="bg-white dark:bg-surface-900 border border-[rgba(124,58,237,0.06)] dark:border-surface-800">
            {section.items.map((item, i) => (
              <div key={item.label}>
                <MenuItem item={item} />
                {i < section.items.length - 1 && (
                  <div style={{ height: '1px', margin: '0 16px' }} className="bg-surface-100 dark:bg-surface-800/60" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <div style={{ padding: '16px 20px 8px' }}>
        <button
          type="button"
          onClick={onLogout}
          style={{
            width: '100%', padding: '14px',
            borderRadius: '16px', cursor: 'pointer',
            fontSize: '14px', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            borderWidth: '1.5px',
            borderStyle: 'solid',
          }}
          className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {t('profile.signOut')}
        </button>
      </div>

      {/* Explore CTA */}
      <div style={{ padding: '8px 20px 16px', textAlign: 'center' }}>
        <p className="text-surface-400 dark:text-surface-600" style={{ fontSize: '12px' }}>
          {t('profile.discoverMore')}{' '}
          <Link to="/explore" className="text-primary-600 dark:text-primary-400 font-semibold">
            {t('profile.exploreNow')}
          </Link>
        </p>
      </div>

      {/* Sheets */}
      {sheet === 'editProfile' && (
        <Sheet title={t('profile.editProfile')} onClose={() => setSheet(null)}>
          <EditProfileSheet user={user} onUpdateProfile={onUpdateProfile} onClose={() => setSheet(null)} t={t} />
        </Sheet>
      )}
      {sheet === 'language' && (
        <Sheet title={t('profile.language')} onClose={() => setSheet(null)}>
          <LanguageSheet onClose={() => setSheet(null)} />
        </Sheet>
      )}
      {sheet === 'privacy' && (
        <Sheet title={t('profile.privacySecurity')} onClose={() => setSheet(null)}>
          <PrivacySheet onClose={() => setSheet(null)} />
        </Sheet>
      )}
      {sheet === 'help' && (
        <Sheet title={t('profile.helpFaq')} onClose={() => setSheet(null)}>
          <HelpSheet />
        </Sheet>
      )}
      {sheet === 'feedback' && (
        <Sheet title={t('profile.sendFeedback')} onClose={() => setSheet(null)}>
          <FeedbackSheet user={user} onClose={() => setSheet(null)} />
        </Sheet>
      )}
      {sheet === 'about' && (
        <Sheet title={t('profile.aboutApp')} onClose={() => setSheet(null)}>
          <AboutSheet />
        </Sheet>
      )}
      {sheet === 'appearance' && (
        <Sheet title={t('profile.appearance')} onClose={() => setSheet(null)}>
          <AppearanceSheet theme={theme} onSetTheme={onSetTheme} onClose={() => setSheet(null)} t={t} />
        </Sheet>
      )}

    </div>
  );
}
