import { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { aboutPoints, experience, services, skills, sphereTags } from '../data';
import { useReducedMotion } from '../hooks/useMedia';
import { Reveal, SectionHeading, TiltCard } from './Motion';

export function About() {
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="01 · About" title="What I do" sub="FullStack Java development, end to end." />
      <div className="about-grid">
        <Reveal className="about-text glass">
          <ul>
            {aboutPoints.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {p}
              </motion.li>
            ))}
          </ul>
          <p className="about-cta">
            Let&apos;s build something <span className="gradient-text">innovative together</span>!
          </p>
        </Reveal>

        <div className="service-list">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <TiltCard className="service-card glass">
                <span className="service-icon">{s.icon}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** DOM-based 3D sphere of tags; auto-rotates and can be spun by dragging or hovering. */
function TagSphere() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const points = useMemo(() => {
    const n = sphereTags.length;
    return sphereTags.map((tag, i) => {
      // Fibonacci sphere distribution for even spacing
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return { tag, x: Math.cos(theta) * Math.sin(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(phi) };
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLSpanElement>('.tag'));
    const pts = points.map((p) => ({ ...p }));
    let vx = 0.004;
    let vy = 0.006;
    let dragging = false;
    let last = { x: 0, y: 0 };
    let raf = 0;

    const render = () => {
      const radius = el.clientWidth * 0.4;
      const cx = Math.cos(vx), sx = Math.sin(vx), cy = Math.cos(vy), sy = Math.sin(vy);
      pts.forEach((p, i) => {
        // rotate around X then Y
        const y1 = p.y * cx - p.z * sx;
        const z1 = p.y * sx + p.z * cx;
        const x2 = p.x * cy + z1 * sy;
        const z2 = -p.x * sy + z1 * cy;
        p.x = x2;
        p.y = y1;
        p.z = z2;
        const scale = (p.z + 2) / 3;
        const item = items[i];
        item.style.transform = `translate(-50%, -50%) translate3d(${p.x * radius}px, ${p.y * radius}px, 0) scale(${scale})`;
        item.style.opacity = String(0.25 + ((p.z + 1) / 2) * 0.75);
        item.style.zIndex = String(Math.round(scale * 100));
      });
      if (!dragging) {
        vx += (0.003 - vx) * 0.02;
        vy += (0.005 - vy) * 0.02;
      }
      raf = requestAnimationFrame(render);
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      vy = (e.clientX - last.x) * 0.004;
      vx = -(e.clientY - last.y) * 0.004;
      last = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      dragging = false;
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    if (reduced) {
      vx = 0;
      vy = 0;
      render();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(render);
    }
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [points, reduced]);

  return (
    <div className="sphere" ref={ref} data-cursor title="Drag to spin">
      <div className="sphere-core" />
      {points.map((p) => (
        <span key={p.tag} className="tag">
          {p.tag}
        </span>
      ))}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading eyebrow="02 · Skills" title="Technical toolkit" sub="Drag the sphere — it spins." />
      <div className="skills-grid">
        <Reveal className="sphere-wrap">
          <TagSphere />
        </Reveal>
        <div className="skill-cards">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06} y={30}>
              <TiltCard className="skill-card glass" max={16}>
                <div className="skill-head">
                  <span className="skill-icon">{s.icon}</span>
                  <h3>{s.name}</h3>
                  <span className={`badge badge-${s.level.toLowerCase()}`}>{s.level}</span>
                </div>
                <p>{s.description}</p>
                <div className="meter">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 50%'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="section">
      <SectionHeading eyebrow="03 · Experience" title="Professional journey" sub="My path in software development." />
      <div className="timeline" ref={ref}>
        <div className="timeline-track">
          <motion.div className="timeline-fill" style={{ height }} />
        </div>
        <Reveal className="timeline-item">
          <span className="timeline-dot" />
          <TiltCard className="timeline-card glass" max={6}>
            <span className="timeline-date">{experience.period}</span>
            <h3>{experience.role}</h3>
            <h4>{experience.company}</h4>
            <p>{experience.summary}</p>
            <ul>
              {experience.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="chips">
              {experience.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
