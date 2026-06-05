// results.jsx — result sections: ADKAR map, learning path, course cards, resources
const { useState: useStateR } = React;

/* renders **bold** and *italic* inline markup from the scripted answer */
function RichText({ text, style }) {
  const parts = [];
  let rem = text,key = 0;
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|ADKAR®)/;
  while (rem.length) {
    const m = rem.match(re);
    if (!m) {parts.push(<span key={key++}>{rem}</span>);break;}
    if (m.index > 0) parts.push(<span key={key++}>{rem.slice(0, m.index)}</span>);
    const tok = m[0];
    if (tok.startsWith("**")) parts.push(<strong key={key++} style={{ fontWeight: 600, color: "var(--text-strong)" }}>{tok.slice(2, -2)}</strong>);else
    if (tok === "ADKAR®") parts.push(<span key={key++} style={{ fontWeight: 600, color: "var(--prosci-purple)" }}>ADKAR®</span>);else
    parts.push(<em key={key++} style={{ fontStyle: "italic" }}>{tok.slice(1, -1)}</em>);
    rem = rem.slice(m.index + tok.length);
  }
  return <span style={style}>{parts}</span>;
}

/* ---------- ADKAR journey ---------- */
function AdkarMap({ adkar, emphasis, accent }) {
  const n = adkar.length;
  const inset = `calc(50% / ${n})`; // centre the rail on first/last circle
  return (
    <div style={{ position: "relative", paddingTop: 4 }}>
      {/* connecting rail behind the circles */}
      <div style={{ position: "absolute", top: 40, left: inset, right: inset, height: 2, background: "var(--border-hairline)", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, alignItems: "start" }}>
        {adkar.map((p) => {
          const on = emphasis.includes(p.key);
          return (
            <div key={p.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 6px" }}>
              {/* milestone circle */}
              <div style={{
                width: 72, height: 72, borderRadius: "50%", display: "grid", placeItems: "center",
                background: on ? "var(--prosci-purple)" : "var(--accent-lilac)",
                boxShadow: on ? `0 0 0 4px var(--surface-cream), 0 0 0 6px ${accent}` : "none",
                transition: "all .3s"
              }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 34, lineHeight: 1, color: on ? "var(--surface-cream)" : "var(--prosci-purple)" }}>{p.key.replace("2", "")}</span>
              </div>
              {/* focus chip — reserves height so labels stay aligned */}
              <div style={{ height: 22, display: "flex", alignItems: "center", marginTop: 12 }}>
                {on &&
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 9.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--prosci-purple)", background: accent, borderRadius: "var(--radius-pill)", padding: "3px 9px" }}>Focus</span>
                }
              </div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--text-strong)", marginTop: 6 }}>{p.label}</span>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, lineHeight: 1.4, margin: "4px 0 0", color: "var(--text-muted)", maxWidth: 150 }}>{p.of}</p>
            </div>);

        })}
      </div>
    </div>);

}

/* ---------- Match ring ---------- */
function MatchRing({ score, accent }) {
  const r = 17,c = 2 * Math.PI * r,off = c * (1 - score / 100);
  return (
    <div style={{ position: "relative", width: 44, height: 44, flex: "none" }}>
      <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="22" cy="22" r={r} fill="none" stroke="var(--surface-beige)" strokeWidth="3.5" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: "stroke-dashoffset .8s ease" }} />
      </svg>
      <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, color: "var(--prosci-purple)" }}>{score}</span>
    </div>);

}

const FMT_ICON = { "In-person": "users", "Virtual": "video", "On-demand": "play-circle" };

/* local course photography (shared with the other versions) */
const COURSE_IMG = {
  ccp: "../course-images/certification_program_1_1.jpg",
  lyt: "../course-images/leading_your_team_through_change_7.jpg",
  tcc: "../course-images/achieve_change_performance_14.jpg",
  dpr: "../course-images/improve_project_health_12.jpg",
  spb: "../course-images/ecm_bootcamp_9.jpg",
  epp: "../course-images/train_the_trainer_10.webp",
};

/* ---------- Course card ---------- */
function CourseCard({ course, rank, t, compact }) {
  const [h, setH] = useStateR(false);
  const accent = t.accent;
  const waitlist = course.availability === "waitlist";
  const imgH = compact ? 156 : 196;
  const pad = compact ? 20 : 26;
  const titleColor = waitlist ? "var(--accent-lilac)" : "var(--text-strong)";
  const bodyColor = waitlist ? "var(--text-muted)" : "var(--text-ink)";
  const divider = { height: 1, background: "var(--border-hairline)", margin: "0 0" };

  return (
    <article onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{
      background: "var(--surface-sand)", border: "1px solid var(--border-hairline)",
      overflow: "hidden", display: "flex", flexDirection: "column", position: "relative",
      boxShadow: h ? "var(--shadow-card-hover)" : "var(--shadow-sm)", transform: h ? "translateY(-3px)" : "none",
      transition: "box-shadow .2s, transform .2s", borderRadius: "6px", backgroundColor: "rgb(246, 244, 237)"
    }}>
      {/* image header */}
      <div style={{ position: "relative", width: "100%", height: imgH, overflow: "hidden", background: "var(--surface-lavender)" }}>
        <img
          src={COURSE_IMG[course.id]}
          alt={course.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: waitlist ? "grayscale(.5)" : "none" }} />
        {waitlist && <div style={{ position: "absolute", inset: 0, background: "color-mix(in oklab, var(--prosci-purple) 32%, transparent)", pointerEvents: "none" }} />}
        {t.showScores &&
        <span style={{ position: "absolute", top: 12, left: 12, display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, color: "var(--prosci-purple)", background: accent, borderRadius: "var(--radius-pill)", padding: "4px 11px", boxShadow: "var(--shadow-sm)" }}>
            {course.score}% match
          </span>
        }
      </div>

      {/* body */}
      <div style={{ ...{ padding: pad, display: "flex", flexDirection: "column", flex: 1 }, padding: "24px", alignItems: "stretch" }}>
        {/* credential badge */}
        <span style={{
          alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
          color: waitlist ? "var(--accent-lilac)" : "var(--prosci-purple)",
          border: `1.5px solid ${waitlist ? "color-mix(in oklab, var(--accent-pink) 35%, var(--border-hairline))" : "var(--accent-pink)"}`,
          borderRadius: "var(--radius-button)", padding: "7px 13px", marginBottom: compact ? 14 : 18
        }}>
          <Icon name="award" size={16} stroke={1.8} /> {course.credential}
        </span>

        <Serif as="h3" size={compact ? 22 : 26} style={{ color: titleColor, lineHeight: 1.12, marginBottom: 12 }}>{course.title}</Serif>

        {/* AI rationale — the advisor's reason */}
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: waitlist ? "var(--text-muted)" : "var(--accent-pink)", display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
          <KaiyaMark size={17} accent="var(--prosci-purple)" /> Why this fits
        </span>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55, color: bodyColor, margin: "0 0 22px" }}>{course.why}</p>

        <div style={{ ...divider, marginTop: "auto" }} />

        {/* meta: date + delivery */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 22, fontFamily: "var(--font-sans)", fontSize: 14.5, color: waitlist ? "var(--text-muted)" : "var(--text-strong)", padding: compact ? "16px 0" : "20px 0" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon name="calendar" size={17} stroke={1.7} color={waitlist ? "var(--text-muted)" : "var(--prosci-purple)"} /> {course.nextDate}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Icon name={course.location ? "map-pin" : "monitor"} size={17} stroke={1.7} color={waitlist ? "var(--text-muted)" : "var(--prosci-purple)"} /> {course.location || "Online"}
          </span>
        </div>

        <div style={divider} />

        {/* footer: price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: compact ? 16 : 22, paddingTop: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            {/[£$€]/.test(course.price) ?
            <span style={{ display: "inline-flex", alignItems: "baseline", gap: 9 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, color: titleColor, letterSpacing: "-0.01em" }}>{course.price}</span>
                {course.priceWas && <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--text-muted)", textDecoration: "line-through" }}>{course.priceWas}</span>}
              </span> :

            <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: titleColor }}>{course.price}</span>
            }
            <span title="Pricing details" style={{ width: 22, height: 22, flex: "none", borderRadius: "var(--radius-pill)", background: "var(--prosci-purple)", color: "var(--surface-cream)", display: "grid", placeItems: "center", cursor: "help" }}>
              <Icon name="info" size={13} stroke={2.2} />
            </span>
          </div>
          {waitlist ?
          <button style={{ display: "inline-flex", alignItems: "center", gap: 8, background: h ? "var(--surface-lavender)" : "transparent", color: "var(--prosci-purple)", border: "2px solid var(--prosci-purple)", borderRadius: "var(--radius-button)", padding: "11px 20px", fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", cursor: "pointer", transition: "background .18s" }}>
              Join waitlist
            </button> :

          <button style={{ display: "inline-flex", alignItems: "center", gap: 8, background: h ? "var(--prosci-purple-700)" : "var(--prosci-purple)", color: "var(--surface-cream)", border: "2px solid transparent", borderRadius: "var(--radius-button)", padding: "11px 22px", fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", cursor: "pointer", transition: "background .18s" }}>
              Register now
            </button>
          }
        </div>
      </div>
    </article>);

}

/* ---------- Learning path ---------- */
function LearningPath({ variant, accent }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, position: "relative" }}>
      {variant.path.map((p, i) => {
        const course = getCourse(p.course);
        return (
          <div key={p.step} style={{ position: "relative", background: "var(--surface-white)", border: "1px solid var(--border-hairline)", borderRadius: 6, padding: "20px 20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ width: 30, height: 30, borderRadius: 999, background: "var(--prosci-purple)", color: accent, display: "grid", placeItems: "center", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" }}>{p.role}</span>
            </div>
            <Serif as="h4" size={18} style={{ color: "var(--text-strong)", marginBottom: 8 }}>{course.title}</Serif>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.5, color: "var(--text-muted)", margin: 0 }}>{p.note}</p>
            {i < variant.path.length - 1 &&
            <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 24, height: 24, borderRadius: 999, background: "var(--surface-cream)", border: "1px solid var(--border-hairline)", display: "grid", placeItems: "center" }}>
                <Icon name="chevron-right" size={14} stroke={2.2} color="var(--prosci-purple)" />
              </div>
            }
          </div>);

      })}
    </div>);

}

/* ---------- Resources rail ---------- */
const RES_ICON = { Article: "file-text", Webinar: "video", Guide: "book-open", Research: "line-chart" };
function ResourceRow({ r }) {
  const [h, setH] = useStateR(false);
  return (
    <a onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 6, background: h ? "var(--surface-sand)" : "transparent", cursor: "pointer", transition: "background .15s", textDecoration: "none" }}>
      <span style={{ width: 38, height: 38, flex: "none", borderRadius: 6, background: "var(--surface-lavender)", display: "grid", placeItems: "center", color: "var(--prosci-purple)" }}>
        <Icon name={RES_ICON[r.kind]} size={18} stroke={1.8} />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--accent-pink)" }}>{r.kind}</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)" }}>· {r.read}</span>
        </div>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 500, color: "var(--text-strong)", lineHeight: 1.35 }}>{r.title}</span>
      </div>
      <Icon name="arrow-up-right" size={16} stroke={2} color={h ? "var(--prosci-purple)" : "var(--text-disabled)"} />
    </a>);

}

Object.assign(window, { RichText, AdkarMap, MatchRing, CourseCard, LearningPath, ResourceRow });