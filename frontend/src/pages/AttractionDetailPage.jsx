import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAttractions } from "../hooks/useAttractions";
import { useGeolocation } from "../hooks/useGeolocation";
import { calculateDistance, formatDistance } from "../utils/distance";

const CAT_GRADIENT = {
  Historical: "linear-gradient(135deg, #92400e, #b45309, #f59e0b)",
  Nature: "linear-gradient(135deg, #064e3b, #059669, #34d399)",
  Hotels: "linear-gradient(135deg, #1e1b4b, #4338ca, #818cf8)",
  Beach: "linear-gradient(135deg, #0c4a6e, #0284c7, #38bdf8)",
  Religious: "linear-gradient(135deg, #3b0764, #7c3aed, #c4b5fd)",
  Adventure: "linear-gradient(135deg, #7f1d1d, #dc2626, #fca5a5)",
  default: "linear-gradient(135deg, #0f172a, #1e40af, #60a5fa)",
};

const CAT_COLOR = {
  Historical: "#b45309",
  Nature: "#059669",
  Hotels: "#4338ca",
  Beach: "#0284c7",
  Religious: "#7c3aed",
  Adventure: "#dc2626",
  default: "#1e40af",
};


const CHIP_PALETTES = [
  { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
  { bg: "#d1fae5", color: "#065f46", border: "#a7f3d0" },
  { bg: "#ede9fe", color: "#5b21b6", border: "#ddd6fe" },
  { bg: "#fce7f3", color: "#9d174d", border: "#fbcfe8" },
  { bg: "#e0f2fe", color: "#075985", border: "#bae6fd" },
  { bg: "#fef9c3", color: "#713f12", border: "#fef08a" },
  { bg: "#dcfce7", color: "#14532d", border: "#bbf7d0" },
  { bg: "#fae8ff", color: "#701a75", border: "#f0abfc" },
];


function Stars({ rating, size = 14 }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = rating >= s;
        const half = !filled && rating >= s - 0.5;
        return (
          <svg key={s} width={size} height={size} viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`hg${s}`} x1="0%" x2="100%">
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={filled ? "#f59e0b" : half ? `url(#hg${s})` : "#e5e7eb"}
              stroke="none"
            />
          </svg>
        );
      })}
    </div>
  );
}

function InfoRow({ icon, label, value, color, bg }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        padding: "14px 16px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: "800",
            color: color,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "3px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "#1e293b",
            fontWeight: "500",
            lineHeight: "1.4",
            wordBreak: "break-word",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "14px",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "11px",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "800",
          color: "#0f172a",
          fontFamily: "Epilogue, sans-serif",
        }}
      >
        {title}
      </h2>
    </div>
  );
}


export default function AttractionDetailPage({ isFavorite, onToggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAttractionById, loading } = useAttractions();
  const { position } = useGeolocation();
  const [favAnim, setFavAnim] = useState(false);

  const attraction = getAttractionById(id);

  if (loading) {
    return (
      <div className="page-content">
        <div className="skeleton" style={{ height: "380px", width: "100%" }} />
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            className="skeleton"
            style={{ height: "14px", width: "40%", borderRadius: "6px" }}
          />
          <div
            className="skeleton"
            style={{ height: "28px", width: "80%", borderRadius: "8px" }}
          />
          <div
            className="skeleton"
            style={{ height: "14px", width: "55%", borderRadius: "6px" }}
          />
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="skeleton"
                style={{ flex: 1, height: "72px", borderRadius: "14px" }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  
  if (!attraction) {
    return (
      <div
        className="page-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            fontSize: "36px",
          }}
        >
          😕
        </div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "10px",
            fontFamily: "Epilogue, sans-serif",
          }}
        >
          Attraction not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          type="button"
          style={{
            color: "#7c3aed",
            fontWeight: "700",
            fontSize: "15px",
            background: "#ede9fe",
            padding: "10px 24px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          ← Go back
        </button>
      </div>
    );
  }

  const distance = position
    ? calculateDistance(
        position.latitude,
        position.longitude,
        attraction.latitude,
        attraction.longitude,
      )
    : null;
  const catGradient = CAT_GRADIENT[attraction.category] || CAT_GRADIENT.default;
  const catColor = CAT_COLOR[attraction.category] || CAT_COLOR.default;
  const paragraphs =
    attraction.description?.split("\n\n").filter(Boolean) || [];
  const fav = isFavorite(attraction.id);

  const handleToggleFav = () => {
    setFavAnim(true);
    onToggleFavorite(attraction.id, attraction.name);
    setTimeout(() => setFavAnim(false), 600);
  };

  const quickStats = [
    {
      label: "Rating",
      value: attraction.rating?.toFixed(1),
      sub: `${(attraction.reviewCount ?? 0).toLocaleString()} reviews`,
      bg: "linear-gradient(135deg, #fef9c3, #fef3c7)",
      iconBg: "#f59e0b",
      color: "#92400e",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      label: "Distance",
      value: distance !== null ? formatDistance(distance) : "—",
      sub: distance !== null ? "from you" : "enable GPS",
      bg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
      iconBg: "#7c3aed",
      color: "#5b21b6",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      ),
    },
    {
      label: "Opens",
      value: attraction.openHours?.split(" - ")[0] ?? "—",
      sub: attraction.openHours?.split(" - ")[1] ?? "daily",
      bg: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
      iconBg: "#059669",
      color: "#065f46",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      label: "Entry",
      value:
        attraction.entryFee === "Free"
          ? "FREE"
          : (attraction.entryFee?.split("/")[0] ?? "—"),
      sub: attraction.entryFee === "Free" ? "no fee" : "per person",
      bg: "linear-gradient(135deg, #fce7f3, #fbcfe8)",
      iconBg: "#e11d48",
      color: "#9d174d",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="page-content" style={{ background: "#f8f7ff" }}>
      
      <div style={{ position: "relative", height: "380px" }}>
        
        <div
          style={{ position: "absolute", inset: 0, background: catGradient }}
        />

        <img
          src={attraction.images?.[0] || ""}
          alt={attraction.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Top fade for buttons */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 35%, transparent 45%, rgba(0,0,0,0.7) 75%, rgba(15,2,30,0.95) 100%)",
          }}
        />

        <button
          onClick={() => navigate(-1)}
          type="button"
          style={{
            position: "absolute",
            top: "max(16px, calc(env(safe-area-inset-top, 0px) + 12px))",
            left: "16px",
            width: "40px",
            height: "40px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div
          style={{
            position: "absolute",
            top: "max(16px, calc(env(safe-area-inset-top, 0px) + 12px))",
            right: "16px",
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            type="button"
            aria-label="Share"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
          <button
            onClick={handleToggleFav}
            type="button"
            aria-label={fav ? "Remove favourite" : "Add favourite"}
            className={favAnim ? "animate-heartbeat" : ""}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "14px",
              background: fav
                ? "rgba(244,63,94,0.85)"
                : "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${fav ? "rgba(244,63,94,0.5)" : "rgba(255,255,255,0.25)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={fav ? "#fff" : "none"}
              stroke={fav ? "#fff" : "#fff"}
              strokeWidth="2.2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 20px 20px",
          }}
        >
          {/* Category badge */}
          <div style={{ marginBottom: "8px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: catColor,
                color: "#fff",
                fontSize: "10px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "4px 12px",
                borderRadius: "999px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {attraction.category}
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "900",
              color: "#fff",
              lineHeight: "1.15",
              marginBottom: "8px",
              fontFamily: "Epilogue, sans-serif",
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            {attraction.name}
          </h1>

          {/* Rating row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(8px)",
                padding: "5px 12px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Stars rating={attraction.rating} size={13} />
              <span
                style={{
                  color: "#fef3c7",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                {attraction.rating?.toFixed(1)}
              </span>
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {(attraction.reviewCount ?? 0).toLocaleString()} reviews
            </span>
            {attraction.featured && (
              <span
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #f97316)",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: "800",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      
      <div
        style={{
          borderRadius: "28px 28px 0 0",
          marginTop: "-20px",
          position: "relative",
          zIndex: 2,
          background: "#f8f7ff",
          paddingTop: "10px",
        }}
      >
        {/* Pill handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10px",
            paddingBottom: "4px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              borderRadius: "2px",
              background: "#ddd6fe",
            }}
          />
        </div>

        {/* Location row */}
        <div
          style={{
            padding: "8px 20px 16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2.5"
            style={{ flexShrink: 0 }}
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span
            style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}
          >
            {attraction.location || attraction.address}
          </span>
        </div>

        {/* ── Quick Stats 4-grid ── */}
        <div
          style={{
            padding: "0 20px 20px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {quickStats.map((s, index) => (
            <div
              key={s.label}
              className={`animate-fade-in-up stagger-${index + 1}`}
              style={{
                padding: "14px 12px",
                background: s.bg,
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "12px",
                  background: s.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 3px 10px ${s.iconBg}55`,
                }}
              >
                {s.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: "800",
                    color: s.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "800",
                    color: "#0f172a",
                    lineHeight: "1.2",
                    fontFamily: "Epilogue, sans-serif",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: s.color,
                    opacity: 0.8,
                    fontWeight: "500",
                  }}
                >
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-fade-in-up stagger-5" style={{ padding: "0 20px 24px", display: "flex", gap: "10px" }}>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${attraction.latitude},${attraction.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              padding: "15px 10px",
              background:
                "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #06b6d4 100%)",
              color: "#fff",
              fontWeight: "800",
              fontSize: "13px",
              borderRadius: "18px",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(124,58,237,0.4)",
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Open Maps
          </a>

          {attraction.bookingUrl ? (
            <a
              href={attraction.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                padding: "15px 10px",
                background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
                color: "#fff",
                fontWeight: "800",
                fontSize: "13px",
                borderRadius: "18px",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(249,115,22,0.4)",
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              Book Now
            </a>
          ) : attraction.phone ? (
            <a
              href={`tel:${attraction.phone}`}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                padding: "15px 10px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#fff",
                fontWeight: "800",
                fontSize: "13px",
                borderRadius: "18px",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(16,185,129,0.4)",
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call Info
            </a>
          ) : null}
        </div>

        <div
          className="animate-fade-in stagger-5"
          style={{
            margin: "0 20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, transparent, #ddd6fe)",
            }}
          />
          <div style={{ display: "flex", gap: "4px" }}>
            {["#7c3aed", "#f59e0b", "#06b6d4", "#f43f5e", "#10b981"].map(
              (c) => (
                <div
                  key={c}
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ),
            )}
          </div>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to left, transparent, #ddd6fe)",
            }}
          />
        </div>

     
        <div className="animate-fade-in-up stagger-6" style={{ padding: "0 20px 24px" }}>
          <SectionHeader
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            }
            title={attraction.headline || "About This Place"}
            color="linear-gradient(135deg, #7c3aed, #6d28d9)"
          />

       
          {attraction.tags?.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "7px",
                marginBottom: "16px",
              }}
            >
              {attraction.tags.map((tag, i) => {
                const p = CHIP_PALETTES[i % CHIP_PALETTES.length];
                return (
                  <span
                    key={tag}
                    style={{
                      background: p.bg,
                      color: p.color,
                      border: `1.5px solid ${p.border}`,
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}

        
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: i === 0 ? "15px" : "14px",
                  lineHeight: "1.75",
                  color: i === 0 ? "#1e293b" : "#475569",
                  fontWeight: i === 0 ? "500" : "400",
                  borderLeft: i === 0 ? `3px solid ${catColor}` : "none",
                  paddingLeft: i === 0 ? "12px" : "0",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

      
        {attraction.quote && (
          <div className="animate-fade-in-up stagger-7" style={{ margin: "0 20px 24px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #1a0533, #2d1b69)",
                borderRadius: "20px",
                padding: "20px 20px 20px 24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  fontSize: "100px",
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                  color: "rgba(167,139,250,0.2)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                "
              </div>
              <p
                style={{
                  position: "relative",
                  zIndex: 1,
                  fontSize: "14px",
                  lineHeight: "1.75",
                  color: "rgba(255,255,255,0.9)",
                  fontStyle: "italic",
                  fontWeight: "400",
                  paddingTop: "12px",
                }}
              >
                {attraction.quote.replace(/^[""]|[""]$/g, "")}
              </p>
            </div>
          </div>
        )}

      
        {attraction.images?.length > 1 && (
          <div className="animate-fade-in-up stagger-7" style={{ padding: "0 20px 24px" }}>
            <SectionHeader
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              }
              title="Photo Gallery"
              color="linear-gradient(135deg, #f97316, #ef4444)"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
           
              <div
                style={{
                  gridColumn: "1 / -1",
                  height: "200px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: catGradient,
                  position: "relative",
                }}
              >
                <img
                  src={attraction.images[0]}
                  alt={attraction.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "12px",
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(6px)",
                    borderRadius: "999px",
                    padding: "3px 10px",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  1 / {attraction.images.length}
                </div>
              </div>
              {/* Smaller images */}
              {attraction.images.slice(1, 4).map((img, i) => {
                const isLast = i === 2 && attraction.images.length > 4;
                const remaining = attraction.images.length - 4;
                return (
                  <div
                    key={i}
                    style={{
                      height: "120px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: catGradient,
                      position: "relative",
                      ...(i === 2 && attraction.images.length <= 3
                        ? { gridColumn: "1 / -1" }
                        : {}),
                    }}
                  >
                    <img
                      src={img}
                      alt={`${attraction.name} ${i + 2}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    {isLast && remaining > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.55)",
                          backdropFilter: "blur(2px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "22px",
                          fontWeight: "800",
                          fontFamily: "Epilogue, sans-serif",
                        }}
                      >
                        +{remaining}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

       
        {attraction.proTip && (
          <div className="animate-fade-in-up stagger-8" style={{ margin: "0 20px 24px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #fef9c3, #fef3c7)",
                borderRadius: "20px",
                padding: "16px 18px",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                border: "1.5px solid #fde68a",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(245,158,11,0.4)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "800",
                    color: "#92400e",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "5px",
                  }}
                >
                  ✦ Pro Tip
                </div>
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "#78350f",
                    lineHeight: "1.65",
                    fontWeight: "500",
                  }}
                >
                  {attraction.proTip}
                </p>
              </div>
            </div>
          </div>
        )}

       
        <div style={{ padding: "0 20px 24px" }}>
          <SectionHeader
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
            }
            title="Visitor Information"
            color="linear-gradient(135deg, #06b6d4, #0891b2)"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {attraction.address && (
              <InfoRow
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                }
                label="Address"
                value={attraction.address}
                color="#5b21b6"
                bg="linear-gradient(135deg, #7c3aed, #6d28d9)"
              />
            )}
            {attraction.openHours && (
              <InfoRow
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                }
                label="Opening Hours"
                value={attraction.openHours}
                color="#065f46"
                bg="linear-gradient(135deg, #10b981, #059669)"
              />
            )}
            {attraction.entryFee && (
              <InfoRow
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                }
                label="Entry Fee"
                value={attraction.entryFee}
                color="#9d174d"
                bg="linear-gradient(135deg, #f43f5e, #e11d48)"
              />
            )}
            {attraction.bestVisitTime && (
              <InfoRow
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                }
                label="Best Visit Time"
                value={attraction.bestVisitTime}
                color="#92400e"
                bg="linear-gradient(135deg, #f59e0b, #d97706)"
              />
            )}
            {attraction.phone && (
              <InfoRow
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                }
                label="Phone"
                value={attraction.phone}
                color="#075985"
                bg="linear-gradient(135deg, #06b6d4, #0891b2)"
              />
            )}
          </div>
        </div>

    
        {attraction.highlights?.length > 0 && (
          <div style={{ padding: "0 20px 24px" }}>
            <SectionHeader
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              }
              title="Highlights"
              color="linear-gradient(135deg, #f59e0b, #d97706)"
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {attraction.highlights.map((tag, i) => {
                const p = CHIP_PALETTES[i % CHIP_PALETTES.length];
                return (
                  <span
                    key={tag}
                    style={{
                      background: p.bg,
                      color: p.color,
                      border: `1.5px solid ${p.border}`,
                      fontSize: "12px",
                      fontWeight: "700",
                      padding: "7px 16px",
                      borderRadius: "999px",
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        )}

       
        <div style={{ margin: "0 20px 16px" }}>
          <div
            style={{
              background:
                "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0d1b4a 100%)",
              borderRadius: "24px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 8px 28px rgba(124,58,237,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "-20px",
                top: "-20px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "rgba(124,58,237,0.2)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  color: "rgba(167,139,250,0.8)",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                }}
              >
                Ready to visit?
              </p>
              <p
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "800",
                  fontFamily: "Epilogue, sans-serif",
                }}
              >
                Plan Your Trip Now
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${attraction.latitude},${attraction.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "800",
                padding: "11px 18px",
                borderRadius: "14px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
                position: "relative",
                zIndex: 1,
                whiteSpace: "nowrap",
              }}
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
