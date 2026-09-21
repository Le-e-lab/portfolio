import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Intro from './components/Intro';
import { introSeen, markIntroSeen } from './lib/introStorage';
import './index.css';

// Route-level code splitting: each page loads only when visited
const Hero = lazy(() => import('./components/Hero'));
const Work = lazy(() => import('./components/Work'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

function PageFallback() {
  return <div style={{ minHeight: '100vh' }} aria-hidden="true" />;
}

function App() {
  // First-open intro: lives while the session hasn't seen it yet.
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (introSeen()) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markIntroSeen(); // skip the show entirely for reduced motion
      return false;
    }
    return true;
  });

  // Boot the app underneath the intro so portraits/fonts load behind it.
  return (
    <>
      <BrowserRouter basename="/">
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Hero />
                </Suspense>
              }
            />
            <Route
              path="/work"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Work />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<PageFallback />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageFallback />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
    </>
  );
}

export default App;