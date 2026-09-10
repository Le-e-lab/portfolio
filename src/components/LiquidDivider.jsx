import './LiquidDivider.css';

/* Liquid section divider — an organic blob of the NEXT section's color that
   bleeds up into the previous section with a soft blurred edge, so the page
   reads as one continuous flowing canvas instead of stacked boxes.
   `fill` = the upcoming section's background color (e.g. var(--bg) for dark).
   `variant` rotates between three blob curves so dividers don't repeat. */

const BLOBS = [
  'M0,80 C160,25 320,120 520,90 C720,60 860,15 1040,55 C1220,95 1360,35 1440,75 L1440,140 L0,140 Z',
  'M0,95 C120,35 340,130 560,85 C780,40 920,10 1120,60 C1320,110 1380,50 1440,85 L1440,140 L0,140 Z',
  'M0,60 C200,115 400,20 600,75 C800,130 1000,30 1200,65 C1320,90 1380,45 1440,70 L1440,140 L0,140 Z',
];

export default function LiquidDivider({
  fill = 'var(--bg)',
  variant = 0,
  flip = false,
  className = '',
}) {
  return (
    <div className={`liquid-divider ${flip ? 'liquid-divider--flip' : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none">
        <path className="liquid-bleed" d={BLOBS[variant % BLOBS.length]} fill={fill} />
        <path d={BLOBS[variant % BLOBS.length]} fill={fill} />
      </svg>
    </div>
  );
}