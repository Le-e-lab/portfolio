import useReveal from '../hooks/useReveal';
import './ServicesSection.css';

const services = [
  {
    num: '01',
    title: 'Brand Identity',
    desc: 'Logos, visual systems, and brand guidelines that make businesses unforgettable. From concept to complete brand packages.',
    tags: ['Logo Design', 'Visual Identity', 'Brand Guidelines'],
  },
  {
    num: '02',
    title: 'UI / Web Design',
    desc: 'Premium websites and applications designed for conversion. Every pixel intentional, every interaction purposeful.',
    tags: ['Web Design', 'Landing Pages', 'Design Systems'],
  },
  {
    num: '03',
    title: 'Full-Stack Development',
    desc: 'React frontends, Node.js backends, and everything in between. I build what I design — no handoff gaps.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
];

export default function ServicesSection() {
  const headerRef = useReveal();
  const cardsRef = useReveal();

  return (
    <section className="section section--light services-section">
      <div className="services-container">
        <div ref={headerRef} className="reveal services-header">
          <span className="section-number services-number">What I Do</span>
          <h2 className="services-heading">
            Design that converts. Code that scales.
          </h2>
          <p className="services-sub">
            I bridge the gap between visual design and technical execution — so your brand looks premium and performs flawlessly.
          </p>
        </div>

        <div ref={cardsRef} className="reveal services-grid">
          {services.map((s) => (
            <div key={s.num} className="service-card interactive">
              <span className="service-num font-mono">{s.num}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map((t) => (
                  <span key={t} className="service-tag font-mono">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
