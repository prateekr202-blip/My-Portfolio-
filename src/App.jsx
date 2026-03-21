import { useState, useEffect, useRef } from "react";
import "./App.css";
import myPhoto from "./assets/profile picture 2.jpeg"

const NAV_LINKS = ["About", "Skills", "Projects", "Timeline", "Contact"];

const SKILLS = [
  { name: "React", level: 85, color: "#7DD3FC" },
  { name: "JavaScript", level: 90, color: "#FDE68A" },
  { name: "Node.js", level: 80, color: "#6EE7B7" },
  { name: "Express.js", level: 78, color: "#C4B5FD" },
  { name: "HTML & CSS", level: 92, color: "#FDA4AF" },
  { name: "C++", level: 75, color: "#93C5FD" },
  { name: "Java (OOP)", level: 72, color: "#FCA5A5" },
  { name: "MongoDB", level: 70, color: "#86EFAC" },
];

const PROJECTS = [
  {
    title: "Travel Planner",
    emoji: "✈️",
    description: "A web application designed to help users plan trips by organizing destinations, schedules, and related information in one clean interface.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JS"],
    nebula: "linear-gradient(135deg, #0f2744 0%, #1a1040 50%, #0a2a1a 100%)",
    glow: "#7DD3FC",
    link: "https://github.com/prateekr202-blip/Trip-Planner"
  },
  {
    title: "Campus Admin Portal",
    emoji: "🏛️",
    description: "A web-based system to manage campus activities — student records, announcements, and administrative tasks, centralizing information access.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JS"],
    nebula: "linear-gradient(135deg, #1a0a3e 0%, #0a1a3e 50%, #0a2030 100%)",
    glow: "#6EE7B7",
    link: "https://github.com/prateekr202-blip/Campus-Administration-Portal-"
  },
];

const TIMELINE = [
  { year: "2024–Now", title: "Full-Stack Builder", desc: "Building Travel Planner & Campus Admin Portal — complete MERN apps from design to deployment.", icon: "🚀", color: "#7DD3FC" },
  { year: "2023", title: "Backend Unlocked", desc: "Mastered Node.js, Express.js & MongoDB. First complete backend APIs and database integrations.", icon: "⚡", color: "#C4B5FD" },
  { year: "2022", title: "Frontend Foundations", desc: "Fell in love with React. Built dynamic UIs and understood the beauty of component-driven development.", icon: "🎨", color: "#FDE68A" },
  { year: "2021", title: "First Line of Code", desc: "Wrote my first C++ program. The spark that started everything — problem-solving clicked instantly.", icon: "🌌", color: "#6EE7B7" },
];

// ─── Constellation node positions (% of container) ───────────────────────────
const NODE_POS = [
  { x: 18, y: 18 }, { x: 50, y: 8 }, { x: 82, y: 18 },
  { x: 88, y: 50 }, { x: 75, y: 82 }, { x: 50, y: 88 },
  { x: 25, y: 82 }, { x: 12, y: 50 },
];
const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

// ─── Sparkle Cursor ───────────────────────────────────────────────────────────
function SparkleCursor() {
  const [sparkles, setSparkles] = useState([]);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const idRef = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const id = ++idRef.current;
      const angle = Math.random() * 360;
      const dist = 14 + Math.random() * 26;
      setSparkles(s => [
        ...s.slice(-20),
        {
          id, x: e.clientX, y: e.clientY,
          tx: Math.cos((angle * Math.PI) / 180) * dist,
          ty: Math.sin((angle * Math.PI) / 180) * dist,
          size: 3 + Math.random() * 7,
          hue: [200, 260, 170, 50, 340][Math.floor(Math.random() * 5)]
        },
      ]);
      setTimeout(() => setSparkles(s => s.filter(sp => sp.id !== id)), 700);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <svg className="cursor-star" style={{ left: pos.x, top: pos.y }}
        width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="sg" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <polygon points="13,1 15.5,9.5 24,9.5 17.5,15 20,23.5 13,18.5 6,23.5 8.5,15 2,9.5 10.5,9.5"
          fill="white" filter="url(#sg)" />
      </svg>
      {sparkles.map(sp => (
        <div key={sp.id} className="sparkle" style={{
          left: sp.x, top: sp.y,
          width: sp.size, height: sp.size,
          "--tx": `${sp.tx}px`, "--ty": `${sp.ty}px`,
          background: `hsl(${sp.hue},100%,75%)`,
          boxShadow: `0 0 ${sp.size * 2}px hsl(${sp.hue},100%,70%)`,
        }} />
      ))}
    </>
  );
}

// ─── Star Field ───────────────────────────────────────────────────────────────
function StarField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let W = (c.width = window.innerWidth);
    let H = (c.height = window.innerHeight);
    let raf;
    const stars = Array.from({ length: 260 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.2,
      speed: Math.random() * 0.2 + 0.04,
      a: Math.random(),
      da: (Math.random() * 0.007 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
    }));
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.a += s.da;
        if (s.a > 1 || s.a < 0) s.da *= -1;
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, s.a)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const onResize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="starfield" />;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(thresh = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: thresh }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [thresh]);
  return [ref, inView];
}

function Counter({ target, suffix = "" }) {
  const [n, setN] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = Math.ceil(target / 50);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setN(target); clearInterval(t); } else setN(v);
    }, 28);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ─── 3D Tilt Hook ─────────────────────────────────────────────────────────────
function useTilt(intensity = 12) {
  const ref = useRef(null);
  const frame = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.transform = `perspective(900px) rotateY(${dx * intensity}deg) rotateX(${-dy * intensity}deg) scale3d(1.04,1.04,1.04)`;
        el.style.transition = "transform 0.07s ease";
      });
    };
    const onLeave = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
      el.style.transition = "transform 0.55s cubic-bezier(0.4,0,0.2,1)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity]);
  return ref;
}

// ─── Skill Constellation ──────────────────────────────────────────────────────
function SkillConstellation() {
  const [wrapRef, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (inView) setTimeout(() => setRevealed(true), 250);
  }, [inView]);

  return (
    <div ref={wrapRef} className="constellation-wrap">
      {/* SVG lines */}
      <svg className="const-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="0.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {EDGES.map(([a, b], i) => {
          const isActive = hovered === a || hovered === b;
          return (
            <line key={i}
              x1={NODE_POS[a].x} y1={NODE_POS[a].y}
              x2={NODE_POS[b].x} y2={NODE_POS[b].y}
              className={`const-edge ${revealed ? "revealed" : ""} ${isActive ? "edge-active" : ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
              filter="url(#lineGlow)"
            />
          );
        })}
      </svg>

      {/* Star nodes */}
      {SKILLS.map((skill, i) => {
        const p = NODE_POS[i];
        const isH = hovered === i;
        const size = 32 + (skill.level / 100) * 28;
        return (
          <div key={skill.name}
            className={`const-node ${revealed ? "revealed" : ""}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, "--nc": skill.color, "--delay": `${i * 90 + 400}ms` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Ambient glow behind node */}
            <div className="node-aura" style={{
              width: size + 28, height: size + 28,
              background: `radial-gradient(circle, ${skill.color}28 0%, transparent 70%)`,
              opacity: isH ? 1 : 0.5,
            }} />
            {/* The star orb */}
            <div className="node-orb" style={{
              width: size, height: size,
              background: `radial-gradient(circle at 32% 32%, ${skill.color}ee, ${skill.color}44)`,
              boxShadow: isH
                ? `0 0 0 3px ${skill.color}66, 0 0 32px ${skill.color}99, 0 0 64px ${skill.color}33`
                : `0 0 18px ${skill.color}55`,
              border: `1.5px solid ${skill.color}99`,
              transform: isH ? "scale(1.18)" : "scale(1)",
            }}>
              <span className="node-num">{skill.level}</span>
            </div>
            {/* Tooltip label */}
            <div className={`node-tooltip ${isH ? "show" : ""}`} style={{ color: skill.color, borderColor: `${skill.color}44`, background: `rgba(3,3,10,0.92)` }}>
              <span className="tooltip-name">{skill.name}</span>
              <span className="tooltip-bar">
                <span className="tooltip-fill" style={{ width: `${skill.level}%`, background: skill.color }} />
              </span>
              <span className="tooltip-pct">{skill.level}%</span>
            </div>
          </div>
        );
      })}

      {/* Hint */}
      <p className="const-hint">✦ Hover any star · Size reflects proficiency ✦</p>
    </div>
  );
}

// ─── Project Card (with tilt) ─────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [revealRef, inView] = useInView();
  const tiltRef = useTilt(10);
  const [hov, setHov] = useState(false);

  return (
    <div ref={revealRef} className={`proj-card-wrap ${inView ? "visible" : ""}`}
      style={{ "--delay": `${index * 180}ms` }}>
      <div ref={tiltRef} className="proj-card"
        style={{ "--glow": project.glow }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div className="proj-nebula" style={{ background: project.nebula, opacity: hov ? 1 : 0.7 }} />
        <div className="proj-orbit-ring" style={{ borderColor: `${project.glow}30`, opacity: hov ? 1 : 0 }} />
        {/* Shine sweep on hover */}
        <div className="proj-shine" style={{ opacity: hov ? 1 : 0 }} />
        <div className="proj-body">
          <span className="proj-emoji">{project.emoji}</span>
          <h3 className="proj-title">{project.title}</h3>
          <p className="proj-desc">{project.description}</p>
          <div className="proj-tags">
            {project.tech.map(t => (
              <span key={t} className="proj-tag" style={{ "--tg": project.glow }}>{t}</span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="proj-link"
            style={{ color: project.glow }}
          >
            Explore Mission →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline Item (with tilt) ────────────────────────────────────────────────
function TimelineItem({ item, index }) {
  const [revealRef, inView] = useInView();
  const tiltRef = useTilt(7);
  return (
    <div ref={revealRef}
      className={`tl-item ${index % 2 === 0 ? "tl-left" : "tl-right"} ${inView ? "visible" : ""}`}
      style={{ "--delay": `${index * 130}ms` }}
    >
      <div className="tl-dot" style={{ "--dc": item.color }}>
        <span className="tl-icon">{item.icon}</span>
        <div className="tl-pulse" style={{ background: item.color }} />
      </div>
      <div ref={tiltRef} className="tl-card" style={{ "--dc": item.color }}>
        <span className="tl-year" style={{ color: item.color }}>{item.year}</span>
        <h4 className="tl-title">{item.title}</h4>
        <p className="tl-desc">{item.desc}</p>
      </div>
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ label }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`sec-label ${inView ? "visible" : ""}`}>
      <span className="sec-line" />✦ {label} ✦<span className="sec-line" />
    </div>
  );
}

// ─── Contact Card (with tilt) ─────────────────────────────────────────────────
function ContactCard({ icon, label, value, href, color, disabled }) {
  const [revealRef, inView] = useInView();
  const tiltRef = useTilt(8);
  return (
    <a ref={revealRef}
      href={href}
      className={`contact-card ${inView ? "visible" : ""} ${disabled ? "disabled" : ""}`}
      style={{ "--cc": color }}
      target={href !== "#" ? "_blank" : undefined}
      rel="noreferrer"
    >
      <div ref={tiltRef} className="contact-inner">
        <div className="contact-orb" style={{ "--cc": color }}>
          <span>{icon}</span>
          <div className="orb-ring" style={{ borderColor: color }} />
        </div>
        <span className="contact-label">{label}</span>
        <span className="contact-value">{value}</span>
        <div className="contact-glow-bg" style={{ background: color }} />
      </div>
    </a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const secs = NAV_LINKS.map(l => document.getElementById(l.toLowerCase()));
      for (let i = secs.length - 1; i >= 0; i--) {
        if (secs[i] && window.scrollY >= secs[i].offsetTop - 220) { setActive(NAV_LINKS[i]); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <SparkleCursor />
      <StarField />

      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => go("about")}>✦ PR</div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map(l => (
            <li key={l}>
              <button className={`nav-link ${active === l ? "active" : ""}`} onClick={() => go(l)}>{l}</button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="about" className="hero">
        <div className="nebula n1" /><div className="nebula n2" /><div className="nebula n3" />
        <div className="orbit-wrap orbit-a"><div className="orb-planet p1" /></div>
        <div className="orbit-wrap orbit-b"><div className="orb-planet p2" /></div>

        <div className="hero-content">
          <div className="photo-wrap">
            <div className="p-ring ra" /><div className="p-ring rb" />
            <div className="photo-card">
              <img
                src={myPhoto}
                alt="Prateek Rai"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  borderRadius: "26px",
                }}
              />
              <div className="photo-shimmer" />
            </div>
            <div className="availability-badge"><span className="avail-dot" />Open to opportunities</div>
          </div>

          <div className="hero-text">
            <p className="greeting">Greetings, I'm</p>
            <h1 className="hero-name">
              <span className="n1t">Prateek</span>
              <span className="n2t">Rai</span>
            </h1>
            <p className="hero-tagline">
              Student developer building &amp; exploring<br />
              <span className="tag-glow">modern web applications</span>
            </p>
            <p className="hero-bio">
              A CS student orbiting the world of web development — passionate about
              building efficient, user-friendly applications and continuously learning
              technologies that push boundaries.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => go("Projects")}>🚀 See My Work</button>
              <button className="btn-ghost" onClick={() => go("Contact")}>📡 Contact Me</button>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          {[{ n: 2, s: "", l: "Projects" }, { n: 8, s: "+", l: "Technologies" }, { n: 100, s: "%", l: "Dedication" }].map(({ n, s, l }) => (
            <div key={l} className="stat">
              <strong><Counter target={n} suffix={s} /></strong>
              <span>{l}</span>
            </div>
          ))}
        </div>

        <div className="scroll-cue">
          <span className="scroll-rocket">🚀</span>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section">
        <SectionLabel label="Cosmic Toolkit" />
        <h2 className="sec-title">Skills <span className="gtext">Galaxy</span></h2>
        <p className="sec-sub">Navigate my constellation of technologies</p>
        <SkillConstellation />
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section projects-section">
        <SectionLabel label="Missions Completed" />
        <h2 className="sec-title">My <span className="gtext">Projects</span></h2>
        <p className="sec-sub">Full-stack apps launched from scratch · Tilt to explore</p>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" className="section">
        <SectionLabel label="Space Log" />
        <h2 className="sec-title">My <span className="gtext">Journey</span></h2>
        <p className="sec-sub">Key coordinates on my developer flight path</p>
        <div className="tl-track">
          <div className="tl-line" />
          {TIMELINE.map((item, i) => <TimelineItem key={item.year} item={item} index={i} />)}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section contact-section">
        <SectionLabel label="Open Channel" />
        <h2 className="sec-title">Let's <span className="gtext">Connect</span></h2>
        <p className="sec-sub">Send a signal — I'll respond from orbit 🛸</p>
        <div className="contact-grid">
          <ContactCard icon="📧" label="Email" value="prateekr202@gmail.com" href="mailto:prateekr202@gmail.com" color="#7DD3FC" />
          <ContactCard icon="🐙" label="GitHub" value="prateekr202-blip" href="https://github.com/prateekr202-blip" color="#C4B5FD" />
          <ContactCard icon="💼" label="LinkedIn" value="Prateek Rai" href="https://www.linkedin.com/in/prateek-rai-aa435b380/" color="#6EE7B7" />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-stars">✦ ✧ ✦ ✧ ✦</div>
        <p>Crafted by <strong>Prateek Rai</strong> · {new Date().getFullYear()}</p>
        <p className="footer-sub">Launched into the cosmos 🌌</p>
      </footer>
    </div>
  );
}
