import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion';
import { navItems } from '../data';
import { useFinePointer, useReducedMotion } from '../hooks/useMedia';

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Intro overlay with a counting progress number. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let n = 0;
    const id = window.setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 9));
      setCount(n);
      if (n >= 100) {
        window.clearInterval(id);
        window.setTimeout(onDone, 350);
      }
    }, 45);
    return () => window.clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      className="loader"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="loader-mark"
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        VR
      </motion.div>
      <div className="loader-bar">
        <span style={{ width: `${count}%` }} />
      </div>
      <span className="loader-count">{count}%</span>
    </motion.div>
  );
}

/** Dot + trailing ring cursor that grows over interactive elements (desktop only). */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!fine || reduced) return;
    document.body.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest('a, button, input, textarea, [data-cursor]'));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div
        className={`cursor-ring ${hover ? 'is-hover' : ''} ${down ? 'is-down' : ''}`}
        style={{ x: rx, y: ry }}
      />
    </>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export function Navbar() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="nav-logo" onClick={() => go('home')} aria-label="Back to top">
        <span>V</span>R
      </button>

      <nav className="nav-links" aria-label="Primary">
        {navItems.slice(0, -1).map((n) => (
          <button key={n.id} className={active === n.id ? 'is-active' : ''} onClick={() => go(n.id)}>
            {active === n.id && <motion.span layoutId="nav-pill" className="nav-pill" />}
            <span className="nav-label">{n.label}</span>
          </button>
        ))}
      </nav>

      <button className="btn btn-primary nav-cta" onClick={() => go('contact')}>
        Let&apos;s talk
      </button>

      <button
        className={`nav-burger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {navItems.map((n, i) => (
              <motion.button
                key={n.id}
                onClick={() => go(n.id)}
                className={active === n.id ? 'is-active' : ''}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <small>0{i + 1}</small> {n.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Vishnu Vardhan R. Crafted with React, TypeScript & Three.js.</p>
      <button className="link-btn" onClick={() => scrollToId('home')}>
        Back to top ↑
      </button>
    </footer>
  );
}
