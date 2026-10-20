import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { certificates, profile, projects, type Certificate } from '../data';
import { useReducedMotion } from '../hooks/useMedia';
import { Magnetic, Reveal, SectionHeading, TiltCard } from './Motion';

export function Projects() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const project = projects[active];

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 4000);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="04 · Projects"
        title="Featured work"
        sub="From government portals to e-commerce platforms — live and in production."
      />
      <div className="projects">
        <div className="project-tabs" role="tablist">
          {projects.map((p, i) => (
            <button
              key={p.name}
              role="tab"
              aria-selected={active === i}
              className={`project-tab ${active === i ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {active === i && <motion.span layoutId="tab-bg" className="project-tab-bg" />}
              <span className="project-num">0{i + 1}</span>
              <span className="project-tab-text">
                <strong>{p.name}</strong>
                <small>{p.tagline}</small>
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.name}
            className="project-stage"
            initial={{ opacity: 0, rotateY: -12, x: 40 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, rotateY: 12, x: -40 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard className="browser glass" max={5}>
              <div className="browser-bar">
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="browser-url">{project.url.replace(/^https?:\/\//, '')}</span>
              </div>
              <div className="browser-view">
                {loading && (
                  <div className="browser-loading">
                    <span className="spinner" />
                    Loading live preview…
                  </div>
                )}
                <iframe
                  src={project.url}
                  title={project.name}
                  loading="lazy"
                  onLoad={() => setLoading(false)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </TiltCard>

            <div className="project-info">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul className="features">
                {project.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                  >
                    {f}
                  </motion.li>
                ))}
              </ul>
              <div className="chips">
                {project.technologies.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <Magnetic>
                <a className="btn btn-primary" href={project.url} target="_blank" rel="noopener noreferrer">
                  Visit live site ↗
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/** Certificates arranged on a rotating 3D ring; drag or use the arrows, click to enlarge. */
export function Certificates() {
  const reduced = useReducedMotion();
  const n = certificates.length;
  const step = 360 / n;
  const angle = useMotionValue(0);
  const smooth = useSpring(angle, { stiffness: 60, damping: 18 });
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<Certificate | null>(null);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);

  useAnimationFrame((_, delta) => {
    if (reduced || paused || drag.current || open) return;
    angle.set(angle.get() - delta * 0.008);
  });

  const snap = (dir: number) => angle.set(Math.round(angle.get() / step) * step + dir * step);

  return (
    <section id="certificates" className="section">
      <SectionHeading
        eyebrow="05 · Certificates"
        title="Certifications"
        sub="OOP and DSA from Great Learning, Java and REST API from HackerRank, plus Edureka."
      />
      <Reveal>
        <div
          className="carousel"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => {
            setPaused(false);
            drag.current = null;
          }}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, start: angle.get(), moved: false };
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            const dx = e.clientX - drag.current.x;
            if (Math.abs(dx) > 4) drag.current.moved = true;
            angle.set(drag.current.start + dx * 0.3);
          }}
          onPointerUp={() => {
            if (drag.current?.moved) snap(0);
            window.setTimeout(() => (drag.current = null), 0);
          }}
          data-cursor
        >
          <motion.div className="carousel-ring" style={{ rotateY: smooth }}>
            {certificates.map((c, i) => (
              <button
                key={c.title + c.issuer}
                className="cert-card"
                style={{ transform: `rotateY(${i * step}deg) translateZ(var(--ring-radius))` }}
                onClick={() => {
                  if (!drag.current?.moved) setOpen(c);
                }}
              >
                <img src={c.image} alt={`${c.title} — ${c.issuer}`} loading="lazy" draggable={false} />
                <span className="cert-meta">
                  <strong>{c.title}</strong>
                  <small>{c.issuer}</small>
                </span>
              </button>
            ))}
          </motion.div>
        </div>
        <div className="carousel-controls">
          <button className="icon-btn" onClick={() => snap(1)} aria-label="Previous certificate">
            ←
          </button>
          <span>Drag, or click a card to view</span>
          <button className="icon-btn" onClick={() => snap(-1)} aria-label="Next certificate">
            →
          </button>
        </div>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lightbox"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.figure
              initial={{ scale: 0.7, rotateX: 25 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.7, rotateX: -25 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={open.image} alt={open.title} />
              <figcaption>
                {open.title} · <span>{open.issuer}</span>
              </figcaption>
              <button className="icon-btn lightbox-close" onClick={() => setOpen(null)} aria-label="Close">
                ✕
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const Icons = {
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    </svg>
  ),
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [ip, setIp] = useState('');

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((r) => r.json() as Promise<{ ip: string }>)
      .then((d) => setIp(d.ip))
      .catch(() => undefined);
  }, []);

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm('service_yfeq9bi', 'template_2zrkvqf', form.current, 'mhu7rb3AjFb7VKG5E');
      form.current.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const socials = [
    { label: 'GitHub', href: profile.social.github, icon: Icons.github },
    { label: 'LinkedIn', href: profile.social.linkedin, icon: Icons.linkedin },
    { label: 'Instagram', href: profile.social.instagram, icon: Icons.instagram },
  ];

  return (
    <section id="contact" className="section">
      <SectionHeading eyebrow="06 · Contact" title="Let's build something" sub="Have an opportunity or an idea? Drop me a message." />
      <div className="contact-grid">
        <Reveal className="contact-side">
          <h3>
            Got a project in mind? <span className="gradient-text">Let&apos;s talk.</span>
          </h3>
          <p>I&apos;m open to full-time roles, freelance work and collaborations. I usually reply within a day.</p>
          <div className="socials">
            {socials.map((s) => (
              <Magnetic key={s.label} strength={0.5}>
                <a className="social" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <TiltCard className="contact-card glass" max={4} glare={false}>
            <form ref={form} onSubmit={send} className="contact-form">
              <label className="field">
                <input type="text" name="to_name" placeholder=" " required />
                <span>Your name</span>
              </label>
              <label className="field">
                <input type="email" name="from_email" placeholder=" " required />
                <span>Your email</span>
              </label>
              <label className="field">
                <textarea name="message" rows={5} placeholder=" " required />
                <span>Message</span>
              </label>
              <input type="hidden" name="ip_address" value={ip} readOnly />
              <button className="btn btn-primary btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message ✦'}
              </button>
              <AnimatePresence>
                {(status === 'sent' || status === 'error') && (
                  <motion.p
                    className={`form-status ${status}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                  >
                    {status === 'sent' ? 'Message sent — thank you! 🎉' : 'Something went wrong. Please try again.'}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
