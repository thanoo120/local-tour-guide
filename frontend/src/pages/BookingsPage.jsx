import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const INITIAL_BOOKINGS = [
  {
    id: 'BK-001',
    type: 'safari',
    name: 'Yala National Park Safari',
    location: 'Yala, Southern Province',
    date: '2025-08-14',
    time: '6:00 AM',
    duration: '4 hours',
    guests: 2,
    price: 95,
    currency: 'USD',
    status: 'confirmed',
    image: 'https://tse4.mm.bing.net/th/id/OIP.tG_bgVYleAA-hA5399savgHaE7?w=1600&h=1066&rs=1&pid=ImgDetMain&o=7&rm=3',
    bookingRef: 'YNP-2025-8854',
    guide: 'Chaminda Perera',
    includes: ['Jeep safari', 'Park entrance fee', 'Naturalist guide', 'Refreshments'],
  },
  {
    id: 'BK-002',
    type: 'hotel',
    name: 'Shangri-La Colombo',
    location: 'Galle Face, Colombo',
    date: '2025-09-01',
    checkOut: '2025-09-04',
    duration: '3 nights',
    guests: 2,
    price: 540,
    currency: 'USD',
    status: 'confirmed',
    image: 'https://tse3.mm.bing.net/th/id/OIP.BNs7exFhDjrcnujloH-mUAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    bookingRef: 'SHL-2025-1209',
    room: 'Deluxe Ocean View',
    includes: ['Breakfast buffet', 'WiFi', 'Pool access', 'Airport transfer'],
  },
  {
    id: 'BK-003',
    type: 'tour',
    name: 'Sigiriya Rock Fortress Tour',
    location: 'Matale District, Central Province',
    date: '2025-08-16',
    time: '7:00 AM',
    duration: '5 hours',
    guests: 3,
    price: 120,
    currency: 'USD',
    status: 'pending',
    image: 'https://i0.wp.com/unusualplaces.org/wp-content/uploads/2013/10/Sigiriya1.jpg?fit=917,1024&ssl=1',
    bookingRef: 'SIG-2025-3341',
    guide: 'Nimal Jayasuriya',
    includes: ['Entry ticket', 'Licensed guide', 'Water & snacks', 'Transport from hotel'],
  },
  {
    id: 'BK-004',
    type: 'activity',
    name: 'Mirissa Whale Watching',
    location: 'Mirissa, Southern Province',
    date: '2025-09-07',
    time: '6:30 AM',
    duration: '4 hours',
    guests: 2,
    price: 70,
    currency: 'USD',
    status: 'completed',
    image: 'https://tse4.mm.bing.net/th/id/OIP.81rFdM-8xf1NLfL44Vra_QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    bookingRef: 'MIR-2025-0678',
    guide: 'Captain Thilina',
    includes: ['Boat trip', 'Marine biologist guide', 'Life jackets', 'Hot breakfast'],
  },
  {
    id: 'BK-005',
    type: 'hotel',
    name: '98 Acres Resort & Spa — Ella',
    location: 'Ella, Uva Province',
    date: '2025-09-05',
    checkOut: '2025-09-07',
    duration: '2 nights',
    guests: 2,
    price: 190,
    currency: 'USD',
    status: 'confirmed',
    image: 'https://picsum.photos/seed/98-acres/800/533',
    bookingRef: 'ELL-2025-5523',
    room: 'Tea Estate View Suite',
    includes: ['Breakfast & dinner', 'Spa access', 'Tea estate walk', 'WiFi'],
  },
];

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', color: '#10b981', bg: 'rgba(16,185,129,0.10)', icon: '✓' },
  pending:   { label: 'Pending',   color: '#f59e0b', bg: 'rgba(245,158,11,0.10)',  icon: '⏳' },
  completed: { label: 'Completed', color: '#64748b', bg: 'rgba(100,116,139,0.10)', icon: '✓' },
  cancelled: { label: 'Cancelled', color: '#ef4444', bg: 'rgba(239,68,68,0.10)',   icon: '✗' },
};

const TYPE_CONFIG = {
  safari:   { label: 'Safari',       icon: '🦁', gradient: 'linear-gradient(135deg, #d97706, #92400e)' },
  hotel:    { label: 'Hotel',         icon: '🏨', gradient: 'linear-gradient(135deg, #4338ca, #1e40af)' },
  tour:     { label: 'Guided Tour',   icon: '🗺️', gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)' },
  activity: { label: 'Activity',      icon: '⛵', gradient: 'linear-gradient(135deg, #0284c7, #075985)' },
};

function BookingCard({ booking, onCancel }) {
  const [expanded, setExpanded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [removing, setRemoving] = useState(false);

  const status = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.confirmed;
  const type = TYPE_CONFIG[booking.type] ?? TYPE_CONFIG.tour;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleCancelClick = () => {
    setConfirming(true);
  };

  const handleConfirmCancel = () => {
    setRemoving(true);
    // Wait for fade-out animation then remove
    setTimeout(() => onCancel(booking.id), 380);
  };

  return (
    <div
      style={{
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '16px',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        opacity: removing ? 0 : 1,
        transform: removing ? 'scale(0.96) translateY(-6px)' : 'scale(1) translateY(0)',
      }}
      className="bg-white dark:bg-surface-900 border border-black/5 dark:border-surface-800"
    >

      {/* Image + type badge */}
      <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
        <img
          src={booking.image}
          alt={booking.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${booking.id}/800/400`; }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
        }} />

        {/* Type badge */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: type.gradient,
          borderRadius: '20px', padding: '5px 12px',
          fontSize: '12px', fontWeight: '700', color: '#fff',
          display: 'flex', alignItems: 'center', gap: '5px',
          backdropFilter: 'blur(8px)',
        }}>
          <span>{type.icon}</span>
          <span>{type.label}</span>
        </div>

        {/* Status badge */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          background: 'rgba(255,255,255,0.92)',
          border: `1.5px solid ${status.color}`,
          borderRadius: '20px', padding: '4px 11px',
          fontSize: '11px', fontWeight: '700', color: status.color,
          backdropFilter: 'blur(8px)',
        }}>
          {status.icon} {status.label}
        </div>

        {/* Bottom price */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          fontSize: '18px', fontWeight: '800', color: '#fff',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        }}>
          ${booking.price}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '16px 16px 8px' }}>
        <h3 style={{
          fontSize: '16px', fontWeight: '800', marginBottom: '4px',
          fontFamily: 'Epilogue, sans-serif', lineHeight: 1.2,
        }} className="text-surface-900 dark:text-surface-50">
          {booking.name}
        </h3>
        <p style={{ fontSize: '12px', marginBottom: '12px' }} className="text-surface-400 dark:text-surface-500">
          📍 {booking.location}
        </p>

        {/* Info row */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {[
            { icon: '📅', text: formatDate(booking.date) },
            { icon: '⏱', text: booking.duration },
            { icon: '👥', text: `${booking.guests} guest${booking.guests !== 1 ? 's' : ''}` },
          ].map((info, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              borderRadius: '8px', padding: '5px 10px',
              fontSize: '12px', fontWeight: '600',
            }} className="bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300">
              <span>{info.icon}</span>
              <span>{info.text}</span>
            </div>
          ))}
        </div>

        {/* Ref row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '10px',
        }} className="border-t border-surface-100 dark:border-surface-800">
          <span style={{ fontSize: '11px', fontWeight: '600', fontFamily: 'monospace', letterSpacing: '0.05em' }}
                className="text-surface-400 dark:text-surface-500">
            #{booking.bookingRef}
          </span>
          <button
            type="button"
            onClick={() => setExpanded(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', fontWeight: '700', padding: '4px 0',
            }}
            className="text-primary-600 dark:text-primary-400"
          >
            {expanded ? 'Hide details' : 'View details'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                 style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div style={{
            marginTop: '12px', padding: '12px', borderRadius: '12px',
            animation: 'fadeIn 0.2s ease',
          }} className="bg-surface-50 dark:bg-surface-800">
            {booking.guide && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', color: '#fff', fontWeight: '700', flexShrink: 0,
                }}>
                  {booking.guide[0]}
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '600' }} className="text-surface-500 dark:text-surface-400">Guide</div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }} className="text-surface-800 dark:text-surface-200">{booking.guide}</div>
                </div>
              </div>
            )}
            {booking.room && (
              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', marginBottom: '2px' }} className="text-surface-500 dark:text-surface-400">Room Type</div>
                <div style={{ fontSize: '13px', fontWeight: '700' }} className="text-surface-800 dark:text-surface-200">{booking.room}</div>
              </div>
            )}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', marginBottom: '6px' }} className="text-surface-500 dark:text-surface-400">Includes</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {booking.includes.map((item, i) => (
                  <span key={i} style={{
                    fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '999px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.1))',
                    border: '1px solid rgba(124,58,237,0.15)',
                  }} className="text-primary-700 dark:text-primary-400">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Cancel button / confirmation */}
            {booking.status !== 'completed' && booking.status !== 'cancelled' && (
              <div style={{ marginTop: '14px' }}>
                {!confirming ? (
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    style={{
                      width: '100%', padding: '11px',
                      borderRadius: '12px', fontSize: '13px', fontWeight: '700',
                      background: 'transparent',
                      border: '1.5px solid #ef4444',
                      color: '#ef4444', cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Cancel Booking
                  </button>
                ) : (
                  <div style={{
                    borderRadius: '12px', overflow: 'hidden',
                    border: '1.5px solid #ef4444',
                    animation: 'fadeIn 0.2s ease',
                  }}>
                    <div style={{
                      padding: '10px 14px',
                      background: 'rgba(239,68,68,0.06)',
                      fontSize: '12px', fontWeight: '600', color: '#ef4444',
                      textAlign: 'center',
                    }}>
                      Are you sure you want to cancel this booking?
                    </div>
                    <div style={{ display: 'flex' }}>
                      <button
                        type="button"
                        onClick={() => setConfirming(false)}
                        style={{
                          flex: 1, padding: '10px',
                          background: 'transparent',
                          border: 'none', borderTop: '1px solid rgba(239,68,68,0.2)',
                          fontSize: '13px', fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        className="text-surface-500 dark:text-surface-400"
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        Keep Booking
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmCancel}
                        style={{
                          flex: 1, padding: '10px',
                          background: '#ef4444',
                          border: 'none', borderTop: '1px solid #ef4444',
                          borderLeft: '1px solid rgba(239,68,68,0.3)',
                          fontSize: '13px', fontWeight: '700', color: '#fff',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#dc2626'}
                        onMouseLeave={e => e.currentTarget.style.background = '#ef4444'}
                      >
                        Yes, Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  const handleCancel = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const totalSpent = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="page-content" style={{ paddingBottom: '100px' }}>

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0d1b4a 0%, #1a0533 50%, #03254e 100%)',
        padding: '20px 20px 56px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', left: '-30px',
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(124,58,237,0.4)', flexShrink: 0,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <h1 style={{
              color: '#fff', fontWeight: '800', fontSize: '22px', lineHeight: 1.2,
              margin: 0, fontFamily: 'Epilogue, sans-serif',
            }}>
              {t('nav.bookings')}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', margin: '2px 0 0' }}>
              {bookings.length} trips planned • ${totalSpent} total
            </p>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ margin: '-28px 16px 16px', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'flex', gap: '10px',
          borderRadius: '18px',
          padding: '16px', boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
        }} className="bg-white dark:bg-surface-900">
          {[
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#10b981' },
            { label: 'Pending',   value: bookings.filter(b => b.status === 'pending').length,   color: '#f59e0b' },
            { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: '#7c3aed' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: s.color, lineHeight: 1, fontFamily: 'Epilogue, sans-serif' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '3px' }}
                   className="text-surface-400 dark:text-surface-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div style={{
        display: 'flex', gap: '8px', padding: '0 16px 16px',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {filters.map(f => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            style={{
              flexShrink: 0, padding: '8px 18px', borderRadius: '999px',
              fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer',
              transition: 'all 0.15s',
              background: filter === f.key
                ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                : undefined,
              color: filter === f.key ? '#fff' : undefined,
              boxShadow: filter === f.key ? '0 4px 12px rgba(124,58,237,0.3)' : 'none',
            }}
            className={
              filter === f.key
                ? ''
                : 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-300'
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Booking cards */}
      <div style={{ padding: '0 16px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}
                className="text-surface-800 dark:text-surface-200">
              No {filter === 'all' ? '' : filter} bookings
            </h3>
            <p style={{ fontSize: '13px' }} className="text-surface-400 dark:text-surface-500">
              {filter === 'all'
                ? 'You have no bookings yet.'
                : `You have no ${filter} bookings right now.`}
            </p>
          </div>
        ) : (
          filtered.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: '8px 20px 16px', textAlign: 'center' }}>
        <p className="text-surface-400 dark:text-surface-600" style={{ fontSize: '12px' }}>
          Want to plan more adventures?{' '}
          <Link to="/explore" className="text-primary-600 dark:text-primary-400 font-semibold">
            Explore Sri Lanka →
          </Link>
        </p>
      </div>
    </div>
  );
}
