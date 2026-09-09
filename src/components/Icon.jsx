// Minimal inline SVG icon set — replaces react-icons (saves ~80KB).
// Stroke-based, viewBox 24, inherit currentColor. No external dependency.

const paths = {
  envelope: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </>
  ),
  'code-bracket': (
    <>
      <path d="M8 7l-5 5 5 5" />
      <path d="M16 7l5 5-5 5" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 21h16" />
    </>
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10.5V17" />
      <circle cx="8" cy="7.8" r="1" fill="currentColor" stroke="none" />
      <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
    </>
  ),
  x: (
    <path d="M4 4l7.2 9.3L4.4 20h2.2l5.5-5.6L16.8 20H20l-7.5-9.7L18.9 4h-2.2l-5 5.2L7.2 4H4z" />
  ),
};

export default function Icon({ name, size = 16, className = '', style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}