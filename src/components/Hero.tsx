import { useEffect, useState, type PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import photo from '../assets/My_pic.jpeg';
import resume from '../assets/updated onepage.pdf';
import { profile } from '../data';
import { useFinePointer, useReducedMotion } from '../hooks/useMedia';
import { Magnetic } from './Motion';
import { scrollToId } from './Chrome';

const ease = [0.22, 1, 0.36, 1] as const;

function SplitWord({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="split" aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ y: '110%', rotateX: -80, opacity: 0 }}
          animate={{ y: '0%', rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: delay + i * 0.04, ease }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="role-rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[i]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Photo in a layered 3D frame: each layer sits at a different depth so it parallaxes on tilt. */
function PhotoPortal() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const active = fine && !reduced;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-1, 1], [-18, 18]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-1, 1], [14, -14]), { stiffness: 150, damping: 18 });
  const shineX = useTransform(px, [-1, 1], ['0%', '100%']);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      className="portal-wrap"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, scale: 0.85, rotateY: -25 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, delay: 0.5, ease }}
      data-cursor
    >
      <motion.div className="portal" style={{ rotateX, rotateY }}>
        <div className="portal-ring" />
        <div className="portal-frame">
          <img src={photo} alt="Vishnu Vardhan R — FullStack Java Developer, Vishnu Portfolio" fetchPriority="high" />
          <motion.div className="portal-shine" style={{ left: shineX }} />
          <div className="portal-fade" />
        </div>

        <div className="portal-chip chip-status">
          <span className="pulse" /> Available for work
        </div>
        <div className="portal-chip chip-a">☕ Java</div>
        <div className="portal-chip chip-b">🍃 Spring Boot</div>
        <div className="portal-chip chip-c">⚛️ React</div>

        <div className="portal-orbit">
          <span />
          <span />
          <span />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const download = () => {
    const a = document.createElement('a');
    a.href = resume;
    a.download = 'VISHNU VARDHAN R.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="wave">👋</span> Hello, I&apos;m
        </motion.span>

        <h1 className="hero-title">
          <SplitWord text={profile.firstName} delay={0.4} />{' '}
          <br />
          <span className="gradient-text">
            <SplitWord text={profile.lastName} delay={0.7} />
          </span>
        </h1>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <RoleRotator />
        </motion.p>

        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease }}
        >
          {profile.intro}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease }}
        >
          <Magnetic>
            <button className="btn btn-primary" onClick={download}>
              Download Resume <span aria-hidden="true">↓</span>
            </button>
          </Magnetic>
          <Magnetic>
            <button className="btn btn-ghost" onClick={() => scrollToId('projects')}>
              View my work <span aria-hidden="true">→</span>
            </button>
          </Magnetic>
        </motion.div>

        <motion.dl
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div>
            <dt>4+</dt>
            <dd>Live projects</dd>
          </div>
          <div>
            <dt>5</dt>
            <dd>Certifications</dd>
          </div>
          <div>
            <dt>2024</dt>
            <dd>Building in industry</dd>
          </div>
        </motion.dl>
      </div>

      <PhotoPortal />

      <motion.button
        className="scroll-hint"
        onClick={() => scrollToId('about')}
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="mouse">
          <span />
        </span>
        Scroll
      </motion.button>
    </section>
  );
}
