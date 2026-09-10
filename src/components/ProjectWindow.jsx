import { useEffect, useCallback } from 'react';
import Icon from './Icon';
import './ProjectWindow.css';

export default function ProjectWindow({ project, onClose }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, handleKey]);

  if (!project) return null;

  return (
    <div className="pw-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="pw-window" onClick={(e) => e.stopPropagation()}>
        {/* Title bar */}
        <div className="pw-titlebar">
          <div className="pw-titlebar-dots">
            <span className="pw-dot pw-dot--red" />
            <span className="pw-dot pw-dot--yellow" />
            <span className="pw-dot pw-dot--green" />
          </div>
          <span className="pw-titlebar-text">{project.title}</span>
          <button className="pw-close interactive" onClick={onClose} aria-label="Close">
            <Icon name="x" size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="pw-body">
          <div className="pw-image-wrap">
            <img src={project.image} alt={project.title} className="pw-image" />
          </div>
          <div className="pw-meta">
            <div className="pw-meta-row">
              <span className="pw-meta-label">Category</span>
              <span className="pw-meta-value">{project.category}</span>
            </div>
            {project.client && (
              <div className="pw-meta-row">
                <span className="pw-meta-label">Client</span>
                <span className="pw-meta-value">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="pw-meta-row">
                <span className="pw-meta-label">Year</span>
                <span className="pw-meta-value">{project.year}</span>
              </div>
            )}
            <div className="pw-description">
              <p>{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
