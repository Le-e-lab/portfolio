import { useState, useEffect } from 'react';

/* ─── Fallback design projects (used if JSON fetch fails) ─── */
const fallbackDesign = [
  {
    title: 'Gold Brand Piece',
    category: 'Brand Identity',
    group: 'brand-identity',
    description: 'Premium gold-toned brand asset for a luxury client — rich palette with editorial structure and refined typography that commands attention.',
    client: 'Private Client',
    year: '2025',
    image: '/images/design/brand-identity/gold-brand-piece.jpg',
    featured: true
  },
  {
    title: 'Logo Design',
    category: 'Logo',
    group: 'logo',
    description: 'Custom logomark — geometric precision meets bold visual identity. Designed for a tech startup seeking a modern, memorable mark.',
    client: 'Startup Client',
    year: '2025',
    image: '/images/design/logo/logo-design.jpg',
    featured: true
  },
  {
    title: 'Studio Logo',
    category: 'Logo',
    group: 'logo',
    description: 'Black and white minimal studio identity — clean geometry, timeless type. Built for a creative studio focused on simplicity.',
    client: 'Creative Studio',
    year: '2025',
    image: '/images/design/logo/studio-logo.jpg',
    featured: true
  },
];

/* Shared design-projects data source for Hero + Work pages.
   Fetches the static JSON once; falls back to curated defaults offline. */
export default function useDesignProjects() {
  const [projects, setProjects] = useState(fallbackDesign);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const res = await fetch('/design-projects.json');
        if (res.ok) {
          const data = await res.json();
          if (data.projects?.length) setProjects(data.projects);
        }
      } catch { /* fallback already set */ }
    };
    fetchDesign();
  }, []);

  return projects;
}