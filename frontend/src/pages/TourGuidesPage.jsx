import { useState, useMemo } from "react";
import { tourGuides } from "../data/tourGuides";

/* ─── Reusable star component ─────────────────────── */
function Stars({ rating, size = 12 }) {
  return (
    <div style={{ display: "flex", gap: "1px" }}>
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = rating >= s;
        const half = !filled && rating >= s - 0.5;
        return (
          <svg key={s} width={size} height={size} viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`hg-tg${s}`} x1="0%" x2="100%">
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={filled ? "#f59e0b" : half ? `url(#hg-tg${s})` : "#e5e7eb"}
              stroke="none"
            />
          </svg>
        );
      })}
    </div>
  );
}

/* ─── Language pill ─────────────────────────────────── */
const LANG_COLORS = [
  { bg: "#ede9fe", color: "#5b21b6" },
  { bg: "#d1fae5", color: "#065f46" },
  { bg: "#fef3c7", color: "#92400e" },
  { bg: "#fce7f3", color: "#9d174d" },
  { bg: "#e0f2fe", color: "#075985" },
];

/* ─── Single guide card ─────────────────────────────── */
function GuideCard({ guide }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
        border: "1px solid rgba(124,58,237,0.07)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.07)";
      }}
    >
      {/* ── Top hero strip ── */}
      <div
        style={{
          background: guide.avatarGradient,
          padding: "20px 20px 0",
          position: "relative",
        }}
      >
        {/* Availability dot */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            padding: "4px 10px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: guide.available ? "#4ade80" : "#f87171",
              boxShadow: guide.available
                ? "0 0 0 2px rgba(74,222,128,0.3)"
                : "0 0 0 2px rgba(248,113,113,0.3)",
            }}
          />
          <span style={{ color: "#fff", fontSize: "10px", fontWeight: "700" }}>
            {guide.available ? "Available" : "Busy"}
          </span>
        </div>

        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "14px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "22px",
              background: "rgba(255,255,255,0.2)",
              border: "3px solid rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "900",
              color: "#fff",
              fontFamily: "Epilogue, sans-serif",
              letterSpacing: "-0.5px",
              flexShrink: 0,
              marginBottom: "-18px",
            }}
          >
            {guide.avatar}
          </div>
          <div style={{ paddingBottom: "22px", flex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: "9px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "3px 9px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.3)",
                marginBottom: "4px",
              }}
            >
              ✦ {guide.badge}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              {guide.experience} yrs experience
            </div>
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: "26px 18px 18px" }}>
        {/* Name & title */}
        <h3
          style={{
            fontSize: "17px",
            fontWeight: "900",
            color: "#0f172a",
            fontFamily: "Epilogue, sans-serif",
            marginBottom: "2px",
          }}
        >
          {guide.name}
        </h3>
        <p style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "700", marginBottom: "2px" }}>
          {guide.title}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "10px",
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2.5"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "500" }}>
            {guide.region}
          </span>
        </div>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            marginBottom: "12px",
          }}
        >
          <Stars rating={guide.rating} size={13} />
          <span style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a" }}>
            {guide.rating.toFixed(1)}
          </span>
          <span style={{ fontSize: "11px", color: "#94a3b8" }}>
            ({guide.reviewCount} reviews)
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "12.5px",
            color: "#475569",
            lineHeight: "1.6",
            fontStyle: "italic",
            marginBottom: "12px",
            borderLeft: "3px solid #ddd6fe",
            paddingLeft: "10px",
          }}
        >
          "{guide.tagline}"
        </p>

        {/* Languages */}
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}
        >
          {guide.languages.map((lang, i) => {
            const col = LANG_COLORS[i % LANG_COLORS.length];
            return (
              <span
                key={lang}
                style={{
                  background: col.bg,
                  color: col.color,
                  fontSize: "10px",
                  fontWeight: "700",
                  padding: "3px 10px",
                  borderRadius: "999px",
                }}
              >
                {lang}
              </span>
            );
          })}
        </div>

        {/* Price */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
            padding: "10px 14px",
            background: "linear-gradient(135deg, #f8f7ff, #ede9fe)",
            borderRadius: "14px",
          }}
        >
          <span style={{ fontSize: "11px", color: "#7c3aed", fontWeight: "700" }}>
            Starting Price / Day
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "900",
              color: "#0f172a",
              fontFamily: "Epilogue, sans-serif",
            }}
          >
            {guide.pricePerDay}
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
          {/* Call */}
          <a
            href={`tel:${guide.phone}`}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "11px 6px",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "800",
              borderRadius: "14px",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(16,185,129,0.35)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${guide.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "11px 6px",
              background: "linear-gradient(135deg, #25d366, #128c7e)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "800",
              borderRadius: "14px",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(37,211,102,0.35)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.557 4.126 1.527 5.857L0 24l6.266-1.648A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.578 9.578 0 01-4.9-1.349l-.35-.208-3.72.978.996-3.636-.228-.373A9.551 9.551 0 012.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z" />
            </svg>
            WhatsApp
          </a>

          {/* Email */}
          <a
            href={`mailto:${guide.email}`}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "11px 6px",
              background: "linear-gradient(135deg, #7c3aed, #4338ca)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "800",
              borderRadius: "14px",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(124,58,237,0.35)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email
          </a>
        </div>

        {/* See tours toggle */}
        <button
          type="button"
          onClick={() => setShowDetails((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "9px",
            background: "transparent",
            color: "#7c3aed",
            fontSize: "12px",
            fontWeight: "700",
            border: "1.5px solid #ddd6fe",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f3ff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {showDetails ? "Hide" : "View"} Tours & Specialties
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              transform: showDetails ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s",
            }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Expandable tours & specialties */}
        {showDetails && (
          <div
            style={{
              marginTop: "12px",
              padding: "14px",
              background: "#f8f7ff",
              borderRadius: "14px",
              border: "1px solid #ede9fe",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                fontWeight: "800",
                color: "#7c3aed",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              📍 Specialties
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
              {guide.specialties.map((s) => (
                <span
                  key={s}
                  style={{
                    background: "#ede9fe",
                    color: "#5b21b6",
                    fontSize: "10px",
                    fontWeight: "700",
                    padding: "4px 10px",
                    borderRadius: "999px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <p
              style={{
                fontSize: "10px",
                fontWeight: "800",
                color: "#059669",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              🗺 Popular Tours
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {guide.tours.map((tour, i) => (
                <div
                  key={tour}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#1e293b",
                    fontWeight: "500",
                  }}
                >
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "6px",
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      color: "#fff",
                      fontSize: "9px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  {tour}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Region filter chip ────────────────────────────── */
const REGIONS = ["All", "Cultural Triangle", "Southern Province", "Southern Coast", "Uva & Central Highlands", "Colombo & Western Province", "Kandy & Highlands"];

/* ─── Main page ─────────────────────────────────────── */
export default function TourGuidesPage() {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = useMemo(() => {
    return tourGuides.filter((g) => {
      const matchSearch =
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.region.toLowerCase().includes(search.toLowerCase()) ||
        g.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        g.languages.some((l) => l.toLowerCase().includes(search.toLowerCase()));
      const matchRegion = activeRegion === "All" || g.region === activeRegion;
      const matchAvail = !onlyAvailable || g.available;
      return matchSearch && matchRegion && matchAvail;
    });
  }, [search, activeRegion, onlyAvailable]);

  return (
    <div className="page-content" style={{ background: "#f8f7ff", paddingBottom: "110px" }}>
      {/* ── Hero Header ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0d1b4a 100%)",
          padding: "28px 20px 36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-30px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "rgba(124,58,237,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "-20px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "rgba(6,182,212,0.15)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.12)",
              color: "#c4b5fd",
              fontSize: "10px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "5px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.2)",
              marginBottom: "12px",
            }}
          >
            🧭 Expert Local Guides
          </span>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "900",
              color: "#fff",
              fontFamily: "Epilogue, sans-serif",
              lineHeight: "1.2",
              marginBottom: "8px",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            Meet Your Tour Guides
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: "1.6", maxWidth: "280px" }}>
            Connect directly with certified Sri Lankan guides. Call, WhatsApp, or email them instantly.
          </p>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        style={{
          margin: "-16px 20px 0",
          background: "#fff",
          borderRadius: "20px",
          padding: "16px 20px",
          display: "flex",
          gap: "0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 2,
          marginBottom: "20px",
        }}
      >
        {[
          { value: tourGuides.length, label: "Guides", icon: "👤" },
          { value: tourGuides.filter((g) => g.available).length, label: "Available", icon: "✅" },
          { value: "8+", label: "Languages", icon: "🌐" },
          { value: "6", label: "Regions", icon: "📍" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              textAlign: "center",
              borderRight: i < 3 ? "1px solid #f1f5f9" : "none",
            }}
          >
            <div style={{ fontSize: "16px", marginBottom: "2px" }}>{stat.icon}</div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "900",
                color: "#0f172a",
                fontFamily: "Epilogue, sans-serif",
                lineHeight: "1",
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: "600", marginTop: "2px" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Search ── */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ position: "relative" }}>
          <svg
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, region, language, specialty…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              height: "48px",
              paddingLeft: "42px",
              paddingRight: "16px",
              borderRadius: "14px",
              border: "2px solid #ede9fe",
              background: "#fff",
              fontSize: "13px",
              color: "#0f172a",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
            onBlur={(e) => (e.target.style.borderColor = "#ede9fe")}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#ede9fe",
                border: "none",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                color: "#7c3aed",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Available only toggle ── */}
      <div style={{ padding: "0 20px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          type="button"
          onClick={() => setOnlyAvailable((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "7px 14px",
            borderRadius: "999px",
            border: "1.5px solid",
            borderColor: onlyAvailable ? "#10b981" : "#e2e8f0",
            background: onlyAvailable ? "#d1fae5" : "#fff",
            color: onlyAvailable ? "#065f46" : "#64748b",
            fontSize: "12px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: onlyAvailable ? "#10b981" : "#d1d5db",
            }}
          />
          Available Only
        </button>
        <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500" }}>
          {filtered.length} guide{filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* ── Region filter scroll ── */}
      <div
        className="hide-scrollbar"
        style={{
          overflowX: "auto",
          display: "flex",
          gap: "8px",
          padding: "0 20px 20px",
        }}
      >
        {REGIONS.map((region) => {
          const isActive = activeRegion === region;
          return (
            <button
              key={region}
              type="button"
              onClick={() => setActiveRegion(region)}
              style={{
                padding: "7px 14px",
                borderRadius: "999px",
                border: "none",
                background: isActive
                  ? "linear-gradient(135deg, #7c3aed, #4338ca)"
                  : "#fff",
                color: isActive ? "#fff" : "#475569",
                fontSize: "11px",
                fontWeight: "700",
                whiteSpace: "nowrap",
                flexShrink: 0,
                cursor: "pointer",
                boxShadow: isActive
                  ? "0 4px 14px rgba(124,58,237,0.4)"
                  : "0 1px 6px rgba(0,0,0,0.07)",
                transform: isActive ? "scale(1.04)" : "scale(1)",
                transition: "all 0.2s",
              }}
            >
              {region}
            </button>
          );
        })}
      </div>

      {/* ── Guide Cards ── */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: "18px" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "22px",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
              }}
            >
              🔍
            </div>
            <p style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", fontFamily: "Epilogue, sans-serif" }}>
              No guides found
            </p>
            <p style={{ fontSize: "13px", color: "#94a3b8" }}>
              Try adjusting your search or filters.
            </p>
            <button
              type="button"
              onClick={() => { setSearch(""); setActiveRegion("All"); setOnlyAvailable(false); }}
              style={{
                padding: "9px 20px",
                background: "#ede9fe",
                color: "#7c3aed",
                borderRadius: "999px",
                border: "none",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map((guide) => <GuideCard key={guide.id} guide={guide} />)
        )}
      </div>

      {/* ── CTA Banner ── */}
      {filtered.length > 0 && (
        <div style={{ padding: "28px 20px 8px" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #059669 0%, #047857 40%, #065f46 100%)",
              borderRadius: "24px",
              padding: "24px 22px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 8px 28px rgba(5,150,105,0.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "-30px",
                right: "-30px",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                Become a Guide
              </p>
              <p style={{ color: "#fff", fontSize: "17px", fontWeight: "800", fontFamily: "Epilogue, sans-serif", marginBottom: "8px", lineHeight: "1.3" }}>
                Share Your Local Knowledge
              </p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", lineHeight: "1.6", marginBottom: "16px", maxWidth: "220px" }}>
                Join our network of certified guides and connect with travellers from around the world.
              </p>
              <a
                href="mailto:guides@lankaguide.lk"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#fff",
                  color: "#059669",
                  padding: "10px 20px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "800",
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                Apply Now →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
