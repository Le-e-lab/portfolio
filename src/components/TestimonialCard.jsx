import './TestimonialCard.css';

export default function TestimonialCard({ quote, name, role, company }) {
  return (
    <div className="testimonial-card interactive">
      <div className="testimonial-quote-mark">&ldquo;</div>
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">
          <span className="testimonial-initial">{name.charAt(0)}</span>
        </div>
        <div className="testimonial-info">
          <span className="testimonial-name">{name}</span>
          <span className="testimonial-role font-mono">{role}{company && `, ${company}`}</span>
        </div>
      </div>
    </div>
  );
}
