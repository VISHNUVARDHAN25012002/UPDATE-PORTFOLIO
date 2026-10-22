import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Hero from './components/Hero';
import { About, Experience, Skills } from './components/About';
import { Certificates, Contact, Projects } from './components/Work';
import { Cursor, Footer, Loader, Navbar, ScrollProgress } from './components/Chrome';
import { useReducedMotion } from './hooks/useMedia';

// three.js is heavy — load the 3D background in its own chunk
const Scene3D = lazy(() => import('./components/Scene3D'));

export default function App() {
  const reduced = useReducedMotion();
  const [loading, setLoading] = useState(!reduced);
  const done = useCallback(() => setLoading(false), []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
      <Suspense fallback={null}>
        <Scene3D reducedMotion={reduced} />
      </Suspense>
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <ScrollProgress />
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certificates />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </MotionConfig>
  );
}
