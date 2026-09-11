import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

// ── Route-level code splitting: each page loads only when visited ──
const Hero = lazy(() => import('./components/Hero'));
const Work = lazy(() => import('./components/Work'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

function PageFallback() {
  return <div style={{ minHeight: '100vh' }} aria-hidden="true" />;
}

function App() {
  return (
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
  );
}

export default App;