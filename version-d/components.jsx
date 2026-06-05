// components.jsx — shared Prosci primitives for the Course Finder
const { useState, useEffect, useRef } = React;

/* ---------- Brand wordmark (real glyph paths) ---------- */
function Wordmark({ color = "var(--prosci-purple)", size = 26 }) {
  return (
    <svg viewBox="0 0 100 32" height={size} style={{ display: "block", color, width: "auto" }} aria-label="Prosci">
      <g fill="currentColor">
        <path d="M0 0.292099C0 0.130174 0.130528 0 0.292891 0H10.1748C17.4493 0 21.3747 3.69251 21.3747 10.5473C21.3747 17.4021 16.7776 21.3613 9.46165 21.3613H7.96855C7.80618 21.3613 7.67566 21.4915 7.67566 21.6534V30.4195C7.67566 30.5815 7.54513 30.7116 7.38277 30.7116H0.292891C0.130528 30.7116 0 30.5815 0 30.4195V0.292099ZM9.68451 15.9765C12.2282 15.9765 13.6099 14.062 13.6099 10.6362C13.6099 7.21039 12.3619 5.38477 9.72908 5.38477H7.96855C7.80618 5.38477 7.67566 5.51495 7.67566 5.67687V15.6876C7.67566 15.8495 7.80618 15.9797 7.96855 15.9797H9.68451V15.9765Z"/>
        <path d="M23.0048 8.45533H29.3847C29.5471 8.45533 29.6776 8.58551 29.6776 8.74743V11.77C29.6776 12.0875 30.117 12.1732 30.2379 11.878C31.1962 9.53166 32.6829 8.18864 34.765 8.18864C35.0038 8.18864 35.2266 8.20769 35.4113 8.23626C35.5546 8.25531 35.6564 8.37914 35.6564 8.52518V14.5354C35.6564 14.7101 35.5036 14.8466 35.3285 14.8244C34.9847 14.7831 34.5135 14.7355 34.0933 14.7355C31.0593 14.7355 29.6744 16.4722 29.6744 20.1647V30.4199C29.6744 30.5818 29.5439 30.712 29.3816 30.712H23.0016C22.8393 30.712 22.7087 30.5818 22.7087 30.4199V8.74743C22.7087 8.58551 22.8393 8.45533 23.0016 8.45533H23.0048Z"/>
        <path d="M35.7422 19.6694C35.7422 12.6368 39.311 8.09979 45.6941 8.09979C52.0772 8.09979 55.1112 12.4622 55.1112 19.5805C55.1112 26.6989 51.6315 31.0613 45.3376 31.0613C39.0436 31.0613 35.7422 26.7433 35.7422 19.6694ZM48.0595 19.4027C48.0595 14.8625 47.3464 12.7734 45.5158 12.7734C43.6853 12.7734 42.8384 14.8657 42.8384 19.4472C42.8384 24.0287 43.5516 26.2131 45.3821 26.2131C47.3464 26.2131 48.0595 24.1208 48.0595 19.4027Z"/>
        <path d="M55.8628 23.9866H61.8447C61.9976 23.9866 62.1185 24.1041 62.1344 24.2565C62.2968 25.8694 63.1755 26.7901 64.6145 26.7901C65.8179 26.7901 66.4896 26.1234 66.4896 25.0534C66.4896 23.9834 65.8211 23.2278 64.3025 22.6499L60.6 21.1799C57.878 20.1131 55.8691 18.1986 55.8691 14.9062C55.8691 10.766 59.2151 8.14027 64.3916 8.14027C69.5681 8.14027 72.4652 10.5564 72.7231 14.6426C72.7326 14.8077 72.5958 14.9506 72.4302 14.9506H66.6329C66.4832 14.9506 66.3527 14.8363 66.3432 14.6871C66.2381 13.2361 65.6014 12.3249 64.1688 12.3249C62.9654 12.3249 62.2491 12.9472 62.2491 13.9727C62.2491 14.9982 62.9622 15.6205 64.659 16.2873L68.1833 17.6239C71.351 18.8241 73.0478 20.8275 73.0478 23.9866C73.0478 28.4379 69.7019 31.0192 64.4808 31.0192C59.6799 31.0192 55.8596 28.8475 55.5699 24.2946C55.5603 24.1295 55.6972 23.9898 55.8628 23.9898V23.9866Z"/>
        <path d="M73.4488 19.7583C73.4488 12.7257 76.8839 8.18864 83.1333 8.18864C88.7842 8.18864 91.5093 11.1445 91.7768 16.4722C91.7863 16.6373 91.6494 16.777 91.4839 16.777H85.3204C85.1676 16.777 85.0435 16.6595 85.0307 16.5071C84.8174 14.0116 84.0343 13.3067 82.9996 13.3067C81.3919 13.3067 80.5005 15.1768 80.5005 19.6249C80.5005 24.0731 81.3027 25.9432 82.8659 25.9432C84.117 25.9432 84.7856 24.6128 85.0275 22.0697C85.0435 21.9204 85.1676 21.803 85.3172 21.803H91.5125C91.6844 21.803 91.8213 21.9554 91.8054 22.1236C91.1878 28.1339 88.0424 31.0136 82.955 31.0136C76.6197 31.0136 73.4488 26.829 73.4488 19.7551V19.7583Z"/>
        <path d="M93.3304 0H99.7103C99.8727 0 100.003 0.130174 100.003 0.292099V5.62925C100.003 5.79117 99.8727 5.92135 99.7103 5.92135H93.3304C93.168 5.92135 93.0375 5.79117 93.0375 5.62925V0.292099C93.0375 0.130174 93.168 0 93.3304 0ZM93.3304 8.45498H99.7103C99.8727 8.45498 100.003 8.58516 100.003 8.74708V30.4164C100.003 30.5783 99.8727 30.7085 99.7103 30.7085H93.3304C93.168 30.7085 93.0375 30.5783 93.0375 30.4164V8.74708C93.0375 8.58516 93.168 8.45498 93.3304 8.45498Z"/>
      </g>
    </svg>
  );
}

function Icon({ name, size = 20, stroke = 1.8, color, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const e = document.createElement("i");
      e.setAttribute("data-lucide", name);
      ref.current.appendChild(e);
      window.lucide.createIcons({ attrs: { width: size, height: size, "stroke-width": stroke } });
    }
  }, [name, size, stroke]);
  return <span ref={ref} style={{ display: "inline-flex", lineHeight: 0, color, ...style }} />;
}

/* ---------- Kaiya AI mark — a small spark/asterisk glyph in a purple disc ---------- */
function KaiyaMark({ size = 34, glow = false, accent = "var(--accent-green)" }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: 999, flex: "none",
      background: "radial-gradient(120% 120% at 30% 25%, var(--prosci-purple-deep), var(--prosci-purple) 60%, var(--prosci-purple-ink))",
      display: "grid", placeItems: "center", position: "relative",
      boxShadow: glow ? `0 0 0 4px color-mix(in oklab, ${accent} 28%, transparent)` : "var(--shadow-sm)",
      transition: "box-shadow .3s",
    }}>
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 256 256" style={{ display: "block" }}>
        {/* Phosphor "Sparkle" (fill) — nudged to optically centre in the disc */}
        <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94l-51.65,19-19,51.61a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.65a15.92,15.92,0,0,1,29.88,0l19,51.65,51.65,19A15.78,15.78,0,0,1,208,144Z" transform="translate(11 -12)" fill={accent}/>
      </svg>
    </span>
  );
}

/* ---------- Button (uppercase, 3px radius) ---------- */
function Button({ children, variant = "primary", onClick, dark = false, size = "md", icon }) {
  const [h, setH] = useState(false);
  const pad = size === "sm" ? "10px 18px" : "14px 26px";
  const v = {
    primary: { background: "var(--prosci-purple)", color: "var(--surface-cream)", border: "1.5px solid transparent" },
    secondary: { background: "transparent", color: dark ? "var(--surface-cream)" : "var(--prosci-purple)", border: `1.5px solid ${dark ? "rgba(255,254,250,.55)" : "var(--prosci-purple)"}` },
    accent: { background: "var(--accent-green)", color: "var(--prosci-purple-ink)", border: "1.5px solid transparent" },
  }[variant];
  const hov = h ? (variant === "primary" ? { background: "var(--prosci-purple-700)" } : variant === "accent" ? { background: "var(--accent-green-700)" } : { background: dark ? "rgba(255,254,250,.1)" : "rgba(53,9,68,.05)" }) : {};
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...v, ...hov, display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, letterSpacing: ".09em", textTransform: "uppercase", borderRadius: 3, padding: pad, cursor: "pointer", lineHeight: 1, transition: "background .18s", whiteSpace: "nowrap" }}>
      {children}{icon && <Icon name={icon} size={15} stroke={2.2} />}
    </button>
  );
}

const Serif = ({ children, size = 44, color = "var(--text-strong)", italic = false, style, as = "h2" }) => {
  const Tag = as;
  return <Tag style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: italic ? "italic" : "normal", fontSize: size, lineHeight: 1.12, color, margin: 0, letterSpacing: "-0.005em", ...style }}>{children}</Tag>;
};

const Eyebrow = ({ children, color = "var(--accent-pink)", style }) => (
  <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color, ...style }}>{children}</span>
);

/* ---------- Header (slim tool-page chrome) ---------- */
const NAV = ["Change Management", "Methodology", "Solutions", "Resources"];
function Header({ onReset }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, fontFamily: "var(--font-sans)" }}>
      <div style={{ background: "var(--prosci-purple)", color: "var(--surface-cream)", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 22, padding: "0 40px", height: 38, fontSize: 12.5 }}>
        <a style={uLink}>Training</a>
        <a style={uLink}>Suite Account</a>
        <a style={{ ...uLink, display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="globe" size={13} /> English</a>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,254,250,.12)", border: "1px solid rgba(255,254,250,.3)", borderRadius: 999, padding: "4px 13px", cursor: "pointer" }}>
          <Icon name="layout-grid" size={13} /> Prosci Portal
        </span>
      </div>
      <div style={{ background: "var(--surface-cream)", borderBottom: "1px solid var(--border-hairline)", display: "flex", alignItems: "center", gap: 28, padding: "0 40px", height: 66 }}>
        <button onClick={onReset} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <Wordmark size={25} />
          <span style={{ width: 1, height: 22, background: "var(--border-default)" }} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <KaiyaMark size={22} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--text-strong)", letterSpacing: "-0.01em" }}>Course Finder</span>
          </span>
        </button>
        <nav style={{ display: "flex", gap: 22, marginLeft: 10 }}>
          {NAV.map((n) => <button key={n} style={navItem}>{n}<Icon name="chevron-down" size={13} stroke={2} /></button>)}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <Button variant="secondary" size="sm">Talk to an advisor</Button>
        </div>
      </div>
    </header>
  );
}
const uLink = { color: "var(--surface-cream)", textDecoration: "none", cursor: "pointer" };
const navItem = { background: "none", border: 0, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--text-ink)", display: "inline-flex", alignItems: "center", gap: 3 };

Object.assign(window, { Wordmark, Icon, KaiyaMark, Button, Serif, Eyebrow, Header });
