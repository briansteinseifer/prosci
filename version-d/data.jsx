// data.jsx: Prosci course catalog + scripted AI response engine
// The "AI advisor" (Kaiya) returns a structured recommendation for a natural-language query.

/* ============================ COURSE CATALOG ============================ */
const CATALOG = [
  {
    id: "ccp",
    title: "Prosci Change Management Certification Program",
    blurb: "The flagship 3-day experience. Your team leaves certified, with a tailored change plan for a real project in hand.",
    formats: ["In-person", "Virtual"],
    duration: "3 days",
    level: "Practitioner",
    audience: "Change practitioners & project leads",
    price: "£3,300",
    priceWas: "£3,800",
    phases: ["Prepare", "Manage", "Sustain"],
    tone: "warm",
    credential: "3-Day Certification",
    nextDate: "Nov 11 – 13, 2026",
    location: "Fort Collins, CO",
    availability: "open",
  },
  {
    id: "lyt",
    title: "Leading Your Team Through Change",
    blurb: "Equips people managers to coach their direct reports through the messy middle, the single biggest lever on adoption.",
    formats: ["Virtual"],
    duration: "Half day",
    level: "People managers",
    audience: "Front-line & mid-level managers",
    price: "£900",
    priceWas: "£1,100",
    phases: ["Manage", "Sustain"],
    tone: "lav",
    credential: "Manager Workshop",
    nextDate: "Dec 3, 2026",
    location: null,
    availability: "open",
  },
  {
    id: "tcc",
    title: "Taking Charge of Change",
    blurb: "A foundational primer that gives everyone a shared language for change before the heavy lifting begins.",
    formats: ["Virtual", "On-demand"],
    duration: "1 day",
    level: "Foundational",
    audience: "Anyone impacted by change",
    price: "£1,200",
    priceWas: null,
    phases: ["Prepare", "Manage"],
    tone: "cool",
    credential: "Foundations",
    nextDate: "On-demand",
    location: null,
    availability: "open",
  },
  {
    id: "dpr",
    title: "Delivering Project Results",
    blurb: "Bridges project management and change management so your delivery teams build adoption into the plan, not after it.",
    formats: ["Virtual"],
    duration: "1 day",
    level: "Project teams",
    audience: "PMs & delivery leads",
    price: "£1,200",
    priceWas: "£1,400",
    phases: ["Manage"],
    tone: "warm",
    credential: "1-Day Program",
    nextDate: "Jan 14, 2027",
    location: null,
    availability: "open",
  },
  {
    id: "spb",
    title: "Change Management Sponsor Briefing",
    blurb: "A focused executive session on the sponsor's role: Prosci research names active sponsorship the #1 contributor to success.",
    formats: ["In-person", "Virtual"],
    duration: "2 hours",
    level: "Executive",
    audience: "Sponsors & senior leaders",
    price: "£1,200",
    priceWas: "£1,500",
    phases: ["Prepare"],
    tone: "lav",
    credential: "Executive Briefing",
    nextDate: "By arrangement",
    location: "London, UK",
    availability: "open",
  },
  {
    id: "epp",
    title: "Experienced Practitioner Program",
    blurb: "For certified practitioners scaling change across a portfolio: advanced diagnostics, enterprise readiness and reinforcement.",
    formats: ["Virtual"],
    duration: "2 days",
    level: "Advanced",
    audience: "Experienced change leaders",
    price: "£3,300",
    priceWas: null,
    phases: ["Sustain"],
    tone: "cool",
    credential: "Advanced Program",
    nextDate: "Feb 2027 cohort",
    location: null,
    availability: "open",
  },
];

/* ===================== RELATED RESOURCES ===================== */
const RESOURCES = [
  { kind: "Article", read: "6 min", title: "Why adoption stalls at the ADKAR barrier point", phase: "Ability" },
  { kind: "Webinar", read: "On-demand", title: "Building reinforcement that actually sticks", phase: "Reinforcement" },
  { kind: "Guide", read: "PDF", title: "AI Change Readiness Guide", phase: "Prepare" },
  { kind: "Research", read: "8 min", title: "The manager's role in driving employee adoption", phase: "Knowledge" },
];

/* ===================== ADKAR phases ===================== */
const ADKAR = [
  { key: "A", label: "Awareness", of: "of the need to change" },
  { key: "D", label: "Desire", of: "to support the change" },
  { key: "K", label: "Knowledge", of: "of how to change" },
  { key: "A2", label: "Ability", of: "to implement new skills" },
  { key: "R", label: "Reinforcement", of: "to sustain the change" },
];

/* ===================== RESPONSE ENGINE ===================== */
// Light keyword routing so the demo feels responsive to what's typed.
function classify(q) {
  const s = (q || "").toLowerCase();
  if (/(resist|pushback|buy-?in|skeptic|morale|fear)/.test(s)) return "resistance";
  if (/(sponsor|executive|leader|c-?suite|board|senior)/.test(s)) return "sponsorship";
  if (/(ai|artificial intelligence|automation|digital)/.test(s)) return "ai";
  if (/(start|begin|new to|where do i|first|basics|foundation)/.test(s)) return "starting";
  return "adoption";
}

const VARIANTS = {
  adoption: {
    emphasis: ["K", "A2", "R"],
    short:
      "Adoption lives in the back half of the ADKAR® journey: **Knowledge, Ability and Reinforcement**. People won't sustain new processes until they know *how* to work differently, feel *able* to do it day-to-day, and see that change reinforced by their managers.",
    long:
      "Adoption lives in the back half of the ADKAR® journey: **Knowledge, Ability and Reinforcement**. People won't sustain new processes until they know *how* to work differently, feel *able* to do it day-to-day, and see that change reinforced by their managers.\n\nThe most common failure isn't desire; it's the **Ability barrier**: employees want to change but can't make it stick without coaching, practice and time. So I've built a path that puts a certified plan at the centre, activates the people managers who drive adoption locally, and equips your sponsors to reinforce it from the top.",
    pathLabel: "A path to drive adoption",
    path: [
      { step: "01", course: "ccp", role: "Build the plan", note: "Certify your core team so adoption is engineered, not hoped for." },
      { step: "02", course: "lyt", role: "Activate managers", note: "Managers are the #1 channel for adoption: give them the coaching playbook." },
      { step: "03", course: "spb", role: "Reinforce from the top", note: "Visible, active sponsorship is what makes new behaviour stick." },
    ],
    order: ["ccp", "lyt", "spb", "dpr", "tcc", "epp"],
    scores: { ccp: 96, lyt: 93, spb: 88, dpr: 81, tcc: 74, epp: 68 },
    why: {
      ccp: "Directly builds the adoption plan your transformation needs.",
      lyt: "Targets the manager behaviours that move employees up the ADKAR curve.",
      spb: "Closes the reinforcement gap most adoption efforts miss.",
      dpr: "Bakes adoption into delivery so it isn't bolted on at go-live.",
      tcc: "Gives impacted employees a shared language before the change lands.",
      epp: "For scaling adoption across multiple initiatives at once.",
    },
    followups: ["We're a 5,000-person org. How does this scale?", "How long to roll this out?", "What does it cost end-to-end?"],
  },
  resistance: {
    emphasis: ["A", "D"],
    short:
      "Resistance is almost always a signal, not an obstacle. It usually means people are stuck at **Awareness or Desire**: they don't yet see why the change matters *to them*. The fix is rarely more communication; it's the right communication from the right messenger.",
    long:
      "Resistance is almost always a signal, not an obstacle. It usually means people are stuck at **Awareness or Desire**: they don't yet see why the change matters *to them*. The fix is rarely more communication; it's the right communication from the right messenger.\n\nProsci research is clear on who that messenger is: the *why* lands best from senior sponsors, while the *what's-in-it-for-me* lands best from a person's own manager. The path below builds that two-channel approach into your plan.",
    pathLabel: "A path to address resistance",
    path: [
      { step: "01", course: "ccp", role: "Diagnose the source", note: "Certification gives you tools to pinpoint where resistance really sits." },
      { step: "02", course: "spb", role: "Land the why", note: "Sponsors carry the business case; this briefing prepares them." },
      { step: "03", course: "lyt", role: "Land the WIIFM", note: "Managers translate change into what it means for each person." },
    ],
    order: ["ccp", "spb", "lyt", "tcc", "dpr", "epp"],
    scores: { ccp: 94, spb: 91, lyt: 89, tcc: 78, dpr: 72, epp: 66 },
    why: {
      ccp: "Resistance-management planning is a core certification skill.",
      spb: "Active sponsorship is the antidote to org-wide resistance.",
      lyt: "Managers resolve resistance one conversation at a time.",
      tcc: "Builds early awareness so resistance never compounds.",
      dpr: "Aligns the project team on managing resistance proactively.",
      epp: "Advanced diagnostics for persistent, structural resistance.",
    },
    followups: ["The resistance is from middle management", "How do we measure resistance?", "Just the sponsor briefing"],
  },
  sponsorship: {
    emphasis: ["A", "R"],
    short:
      "If you're leading from the top, your highest-leverage move is **active and visible sponsorship**. Prosci's research has named it the #1 contributor to change success for over a decade, ahead of budget, methodology or tooling.",
    long:
      "If you're leading from the top, your highest-leverage move is **active and visible sponsorship**. Prosci's research has named it the #1 contributor to change success for over a decade, ahead of budget, methodology or tooling.\n\nThe gap is rarely willingness; it's knowing what good sponsorship actually looks like day-to-day. The path below starts with the sponsor playbook, then equips the team and managers who turn executive intent into front-line behaviour.",
    pathLabel: "A path for change leaders",
    path: [
      { step: "01", course: "spb", role: "Master the sponsor role", note: "The ABCs of sponsorship: be active, build a coalition, communicate." },
      { step: "02", course: "ccp", role: "Resource the work", note: "Stand up a certified team to execute behind your sponsorship." },
      { step: "03", course: "lyt", role: "Cascade through managers", note: "Extend your sponsorship into every team via their managers." },
    ],
    order: ["spb", "ccp", "lyt", "epp", "dpr", "tcc"],
    scores: { spb: 97, ccp: 90, lyt: 85, epp: 79, dpr: 71, tcc: 64 },
    why: {
      spb: "Purpose-built for executives sponsoring transformation.",
      ccp: "Gives you a certified team to deliver on your vision.",
      lyt: "Turns your managers into an extension of your sponsorship.",
      epp: "Enterprise-scale readiness for portfolio sponsors.",
      dpr: "Connects your sponsorship to project delivery.",
      tcc: "Foundational alignment for the wider organisation.",
    },
    followups: ["What should I say at kickoff?", "How do I build a sponsor coalition?", "Brief my exec team"],
  },
  ai: {
    emphasis: ["D", "K", "A2"],
    short:
      "AI-driven change is different. The technology moves faster than people can absorb it, so the bottleneck shifts hard toward **Desire, Knowledge and Ability**: trust in the tools, fluency in using them, and the confidence to change how work gets done.",
    long:
      "AI-driven change is different. The technology moves faster than people can absorb it, so the bottleneck shifts hard toward **Desire, Knowledge and Ability**: trust in the tools, fluency in using them, and the confidence to change how work gets done.\n\nThat means heavier investment in hands-on enablement and continuous reinforcement than a typical process change. The path below pairs a certified change approach with manager-led enablement, and points you to Prosci's AI-specific research.",
    pathLabel: "A path for AI adoption",
    path: [
      { step: "01", course: "ccp", role: "Engineer the approach", note: "A structured plan keeps fast-moving AI change people-centred." },
      { step: "02", course: "tcc", role: "Build AI confidence", note: "Foundational fluency so the whole org speaks the same language." },
      { step: "03", course: "lyt", role: "Coach the new way", note: "Managers help teams build real ability with the new tools." },
    ],
    order: ["ccp", "tcc", "lyt", "dpr", "spb", "epp"],
    scores: { ccp: 95, tcc: 88, lyt: 86, dpr: 80, spb: 76, epp: 70 },
    why: {
      ccp: "Anchors fast AI change in a proven, repeatable method.",
      tcc: "Builds the shared AI literacy adoption depends on.",
      lyt: "Managers turn AI tools into everyday ability.",
      dpr: "Aligns AI delivery teams with adoption goals.",
      spb: "Keeps leaders visibly behind the AI transformation.",
      epp: "Scales AI adoption across multiple business units.",
    },
    followups: ["See the AI Change Readiness Guide", "How is AI change different?", "We're piloting in one team first"],
  },
  starting: {
    emphasis: ["A", "D", "K"],
    short:
      "Starting out, the goal is a **shared foundation**: get everyone using the same language for change before you build plans. That front-loads **Awareness and Desire** so the harder work later has somewhere to land.",
    long:
      "Starting out, the goal is a **shared foundation**: get everyone using the same language for change before you build plans. That front-loads **Awareness and Desire** so the harder work later has somewhere to land.\n\nStart broad and shallow, then go deep with a certified core team. The path below does exactly that: a foundational primer for the many, certification for the few who'll lead.",
    pathLabel: "A path to get started",
    path: [
      { step: "01", course: "tcc", role: "Build a shared base", note: "Everyone learns the same change vocabulary first." },
      { step: "02", course: "ccp", role: "Certify your core", note: "A small expert team to lead the real work." },
      { step: "03", course: "lyt", role: "Bring managers along", note: "Equip the managers who'll carry it day-to-day." },
    ],
    order: ["tcc", "ccp", "lyt", "spb", "dpr", "epp"],
    scores: { tcc: 95, ccp: 92, lyt: 84, spb: 77, dpr: 73, epp: 62 },
    why: {
      tcc: "The ideal entry point, no prior change experience needed.",
      ccp: "Builds your first certified, capable change team.",
      lyt: "Prepares managers before the change reaches their teams.",
      spb: "Gets leadership aligned from day one.",
      dpr: "Connects early to your project delivery.",
      epp: "For later, once you're scaling beyond the first initiative.",
    },
    followups: ["What order should people take these?", "We have no change team yet", "Just the basics for now"],
  },
};

function getCourse(id) { return CATALOG.find((c) => c.id === id); }

function buildResponse(query) {
  const variant = VARIANTS[classify(query)];
  const courses = variant.order.map((id) => ({ ...getCourse(id), score: variant.scores[id], why: variant.why[id] }));
  return { variant, courses, resources: RESOURCES, adkar: ADKAR };
}

const EXAMPLE_PROMPTS = [
  "My company is going through a major transformation. How do I get employees to adopt new processes?",
  "My team is pushing back hard on a new system. How do I deal with the resistance?",
  "I'm a VP sponsoring a big reorg. What's my role and where do I start?",
  "We're rolling out AI tools across the business. How is that change different?",
];

Object.assign(window, { CATALOG, RESOURCES, ADKAR, buildResponse, EXAMPLE_PROMPTS, getCourse });
