// app.jsx — Prosci Course Finder: landing → thinking → streaming results
const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#D2F7A9",
  "showScores": true,
  "density": "comfortable",
  "layout": "grid",
  "detail": "detailed",
  "showAdkar": true,
  "showPath": true
} /*EDITMODE-END*/;

/* ---------------- tokenizer + streaming answer ---------------- */
function tokenize(text) {
  const segs = [];
  text.split("\n\n").forEach((para, pi) => {
    if (pi > 0) segs.push({ kind: "break" });
    let rem = para;
    const re = /(\*\*[^*]+\*\*|\*[^*]+\*|ADKAR®)/;
    while (rem.length) {
      const m = rem.match(re);
      if (!m) {segs.push({ kind: "plain", text: rem });break;}
      if (m.index > 0) segs.push({ kind: "plain", text: rem.slice(0, m.index) });
      const tok = m[0];
      if (tok.startsWith("**")) segs.push({ kind: "bold", text: tok.slice(2, -2) });else
      if (tok === "ADKAR®") segs.push({ kind: "adkar", text: "ADKAR®" });else
      segs.push({ kind: "italic", text: tok.slice(1, -1) });
      rem = rem.slice(m.index + tok.length);
    }
  });
  return segs;
}
const SEG_STYLE = {
  plain: {},
  bold: { fontWeight: 600, color: "var(--text-strong)" },
  italic: { fontStyle: "italic" },
  adkar: { fontWeight: 600, color: "var(--prosci-purple)" }
};

function StreamingAnswer({ text, onDone, speed = 12 }) {
  const segs = useMemo(() => tokenize(text), [text]);
  const total = useMemo(() => segs.reduce((n, s) => n + (s.kind === "break" ? 1 : s.text.length), 0), [segs]);
  const [vis, setVis] = useState(0);
  useEffect(() => {
    setVis(0);
    const dur = Math.min(2600, total * 9); // wall-clock pacing — robust to tab throttling
    const start = performance.now();
    const id = setInterval(() => {
      const n = Math.min(total, Math.round((performance.now() - start) / dur * total));
      setVis(n);
      if (n >= total) {clearInterval(id);onDone && onDone();}
    }, speed);
    return () => clearInterval(id);
  }, [text]);

  let used = 0;
  const out = [];
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    if (s.kind === "break") {if (used < vis) out.push(<span key={i} style={{ display: "block", height: 16 }} />);used += 1;continue;}
    const remain = vis - used;
    if (remain <= 0) break;
    const shown = s.text.slice(0, remain);
    out.push(<span key={i} style={SEG_STYLE[s.kind]}>{shown}</span>);
    used += s.text.length;
  }
  const done = vis >= total;
  return (
    <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.62, color: "var(--text-ink)", margin: 0 }}>
      {out}
      {!done && <span style={{ display: "inline-block", width: 8, height: 18, marginLeft: 2, background: "var(--prosci-purple)", verticalAlign: "text-bottom", animation: "blink 1s step-end infinite" }} />}
    </p>);

}

/* ---------------- reveal wrapper ---------------- */
function Reveal({ show, delay = 0, children }) {
  return (
    <div style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(14px)", transition: `opacity .5s ease ${delay}ms, transform .5s ease ${delay}ms`, pointerEvents: show ? "auto" : "none" }}>
      {children}
    </div>);

}

/* ---------------- thinking steps ---------------- */
const STEPS = ["Reading your challenge", "Mapping it to the ADKAR® model", "Matching courses & building a path", "Pulling supporting research"];
function Thinking({ query }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length)), 560);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 28 }}>
        <KaiyaMark size={42} glow />
        <div>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent-pink)" }}>Prosci Advisor is thinking</span>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--text-strong)", margin: "2px 0 0", fontStyle: "italic" }}>Working through your question…</p>
        </div>
      </div>
      <div style={{ background: "var(--surface-sand)", border: "1px solid var(--border-hairline)", borderRadius: 6, padding: "10px 20px" }}>
        {STEPS.map((s, i) => {
          const done = i < step,active = i === step;
          return (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 0", borderBottom: i < STEPS.length - 1 ? "1px solid var(--border-hairline)" : 0, opacity: done || active ? 1 : 0.4, transition: "opacity .4s" }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, flex: "none", display: "grid", placeItems: "center", background: done ? "var(--prosci-purple)" : "transparent", border: done ? "0" : "1.5px solid var(--border-default)" }}>
                {done ? <Icon name="check" size={13} stroke={3} color="var(--accent-green)" /> : active ? <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent-pink)", animation: "pulse 1s ease-in-out infinite" }} /> : null}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: done || active ? 600 : 500, color: done || active ? "var(--text-strong)" : "var(--text-muted)" }}>{s}</span>
            </div>);

        })}
      </div>
    </div>);

}

/* ---------------- landing ---------------- */
function Landing({ onSubmit }) {
  const [val, setVal] = useState("");
  const ref = useRef(null);
  const grow = (el) => {if (!el) return;el.style.height = "auto";el.style.height = Math.min(el.scrollHeight, 220) + "px";};
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <img src={(window.__resources && window.__resources.radialBurst) || "assets/radial-burst.svg"} alt="" style={{ position: "absolute", top: -120, right: -160, width: 620, opacity: 0.07, pointerEvents: "none" }} />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "76px 24px 90px", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--surface-sand)", border: "1px solid var(--border-hairline)", borderRadius: 999, padding: "7px 16px 7px 8px" }}>
            <KaiyaMark size={24} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--text-strong)" }}>Powered by Prosci Advisor</span>
          </span>
        </div>
        <Serif as="h1" size={58} style={{ textAlign: "center", letterSpacing: "-0.015em", marginBottom: 18 }}>
          Describe your change challenge.<br /><span style={{ fontStyle: "italic", color: "var(--prosci-purple)" }}>We'll map the path.</span>
        </Serif>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.55, color: "var(--text-muted)", textAlign: "center", maxWidth: 620, margin: "0 auto 36px" }}>
          Tell us what you're navigating in plain language. Prosci Advisor maps it to the ADKAR® model and recommends the exact Prosci training, learning path and research to get it done.
        </p>

        {/* input */}
        <div style={{ background: "var(--surface-white)", border: "1.5px solid var(--border-default)", borderRadius: 10, boxShadow: "var(--shadow-md)", padding: "18px 18px 16px", maxWidth: 760, margin: "0 auto" }}>
          <textarea ref={ref} value={val} onChange={(e) => {setVal(e.target.value);grow(e.target);}}
          onKeyDown={(e) => {if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && val.trim()) onSubmit(val.trim());}}
          placeholder="e.g. My company is going through a major transformation. How do I get employees to adopt new processes?"
          rows={2}
          style={{ width: "100%", border: 0, outline: 0, resize: "none", fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: "var(--text-ink)", background: "transparent", display: "block" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--text-disabled)" }}>Press ⌘↵ to ask</span>
            <Button onClick={() => val.trim() && onSubmit(val.trim())} icon="arrow-right">Find my courses</Button>
          </div>
        </div>

        {/* example prompts */}
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>Try one of these</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 16, maxWidth: 800, marginInline: "auto" }}>
            {EXAMPLE_PROMPTS.map((p) => <PromptChip key={p} text={p} onClick={() => onSubmit(p)} />)}
          </div>
        </div>
      </div>
    </div>);

}
function PromptChip({ text, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ display: "inline-flex", alignItems: "center", gap: 8, maxWidth: 360, textAlign: "left", background: h ? "var(--surface-white)" : "var(--surface-sand)", border: `1px solid ${h ? "var(--prosci-purple)" : "var(--border-hairline)"}`, borderRadius: 999, padding: "9px 16px", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--text-strong)", lineHeight: 1.35, transition: "all .15s", boxShadow: h ? "var(--shadow-sm)" : "none" }}>
      <Icon name="sparkles" size={14} stroke={2} color="var(--accent-pink)" />
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{text}</span>
    </button>);

}

/* ---------------- results ---------------- */
function Results({ query, data, t, onNewSearch, onFollowup }) {
  const [answerDone, setAnswerDone] = useState(false);
  const [step, setStep] = useState(0); // section reveal index
  const { variant, courses, resources, adkar } = data;
  const answer = t.detail === "detailed" ? variant.long : variant.short;

  // Stagger the section reveals on a mount timer (independent of answer detection,
  // with a guaranteed fallback so content can never stay stuck at opacity 0).
  useEffect(() => {
    setAnswerDone(false);
    setStep(0);
    const dur = t.detail === "detailed" ? 2600 : 1600; // matches answer stream length
    const timers = [1, 2, 3, 4, 5, 6].map((i) =>
    setTimeout(() => setStep((s) => Math.max(s, i)), dur + i * 360)
    );
    return () => timers.forEach(clearTimeout);
  }, [query, t.detail]);

  const compact = t.density === "compact";
  const grid = t.layout === "grid";

  return (
    <div style={{ maxWidth: 940, margin: "0 auto", padding: "36px 24px 120px" }}>
      {/* query recap bar */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 30 }}>
        <div style={{ flex: 1, background: "var(--surface-white)", border: "1px solid var(--border-hairline)", borderRadius: 8, padding: "16px 20px", display: "flex", gap: 13, alignItems: "flex-start" }}>
          <Icon name="message-square-quote" size={20} stroke={1.8} color="var(--prosci-purple)" style={{ marginTop: 2 }} />
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 19, lineHeight: 1.4, color: "var(--text-strong)", margin: 0 }}>{query}</p>
        </div>
        <button onClick={onNewSearch} style={{ flex: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "1.5px solid var(--prosci-purple)", borderRadius: 3, padding: "13px 18px", color: "var(--prosci-purple)", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", cursor: "pointer", marginTop: 2 }}>
          <Icon name="rotate-ccw" size={14} stroke={2.2} /> New search
        </button>
      </div>

      {/* answer */}
      <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
        <KaiyaMark size={42} glow accent={t.accent} />
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent-pink)", display: "block", marginBottom: 10 }}>Prosci Advisor's read on this</span>
          <StreamingAnswer text={answer} onDone={() => setAnswerDone(true)} />
        </div>
      </div>

      {/* ADKAR map */}
      {t.showAdkar &&
      <Reveal show={step >= 1}>
          <Section eyebrow="Where this sits" title="Your challenge on the ADKAR® journey" accent={t.accent}>
            <AdkarMap adkar={adkar} emphasis={variant.emphasis} accent={t.accent} />
          </Section>
        </Reveal>
      }

      {/* learning path */}
      {t.showPath &&
      <Reveal show={step >= 2}>
          <Section eyebrow="Recommended sequence" title={variant.pathLabel} accent={t.accent}>
            <LearningPath variant={variant} accent={t.accent} />
          </Section>
        </Reveal>
      }

      {/* course matches */}
      <Reveal show={step >= 3}>
        <Section eyebrow="Matched training" title="Courses ranked for your challenge" accent={t.accent}>
          <div style={{ display: "grid", gridTemplateColumns: grid ? "repeat(2, 1fr)" : "1fr", gap: 24 }}>
            {courses.map((c, i) => <CourseCard key={c.id} course={c} rank={i + 1} t={t} compact={compact} />)}
          </div>
        </Section>
      </Reveal>

      {/* resources + follow up */}
      <Reveal show={step >= 4}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, marginTop: 56, alignItems: "start" }}>
          <div>
            <Section eyebrow="Supporting research" title="Read while you decide" accent={t.accent} tight>
              <div style={{ marginTop: 4 }}>
                {resources.map((r) => <ResourceRow key={r.title} r={r} />)}
              </div>
            </Section>
          </div>
          <div style={{ background: "var(--prosci-purple)", borderRadius: 8, padding: "30px 30px 32px", position: "relative", overflow: "hidden" }}>
            <img src={(window.__resources && window.__resources.radialBurst) || "assets/radial-burst.svg"} alt="" style={{ position: "absolute", bottom: -90, right: -90, width: 320, opacity: 0.18, filter: "brightness(0) invert(1)" }} />
            <div style={{ position: "relative" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent-green)" }}>Keep going</span>
              <Serif size={26} color="var(--surface-cream)" style={{ margin: "10px 0 18px" }}>Refine your recommendation</Serif>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {variant.followups.map((f) =>
                <button key={f} onClick={() => onFollowup(f)} style={{ textAlign: "left", background: "rgba(255,254,250,.08)", border: "1px solid rgba(255,254,250,.22)", borderRadius: 6, padding: "13px 15px", color: "var(--surface-cream)", fontFamily: "var(--font-sans)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, transition: "background .15s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,254,250,.16)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,254,250,.08)"}>
                    {f} <Icon name="arrow-right" size={15} stroke={2.2} color="var(--accent-green)" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>);

}

function Section({ eyebrow, title, children, accent, tight }) {
  return (
    <section style={{ marginBottom: tight ? 0 : 48 }}>
      <div style={{ marginBottom: 18 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent-pink)", marginBottom: 8 }}>
          <span style={{ width: 18, height: 2, background: accent }} />{eyebrow}
        </span>
        <Serif as="h2" size={28} style={{ color: "var(--text-strong)" }}>{title}</Serif>
      </div>
      {children}
    </section>);

}

/* ---------------- root ---------------- */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useState("landing"); // landing | thinking | results
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const ask = (q) => {
    setQuery(q);
    setView("thinking");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    setTimeout(() => {setData(buildResponse(q));setView("results");}, 2500);
  };
  const reset = () => {setView("landing");setQuery("");setData(null);};

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-cream)" }}>
      <Header onReset={reset} />
      {view === "landing" && <Landing onSubmit={ask} />}
      {view === "thinking" && <Thinking query={query} />}
      {view === "results" && data && <Results query={query} data={data} t={t} onNewSearch={reset} onFollowup={ask} />}

      <TweaksPanel>
        <TweakSection label="Display" />
        <TweakColor label="Accent" value={t.accent} options={["#D2F7A9", "#FF1AA3", "#B5BBDB", "#F3902D"]} onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Card density" value={t.density} options={["comfortable", "compact"]} onChange={(v) => setTweak("density", v)} />
        <TweakRadio label="Course layout" value={t.layout} options={["list", "grid"]} onChange={(v) => setTweak("layout", v)} />
        <TweakToggle label="Match scores" value={t.showScores} onChange={(v) => setTweak("showScores", v)} />
        <TweakSection label="AI response" />
        <TweakRadio label="Answer length" value={t.detail} options={["concise", "detailed"]} onChange={(v) => setTweak("detail", v)} />
        <TweakToggle label="ADKAR mapping" value={t.showAdkar} onChange={(v) => setTweak("showAdkar", v)} />
        <TweakToggle label="Learning path" value={t.showPath} onChange={(v) => setTweak("showPath", v)} />
      </TweaksPanel>
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);