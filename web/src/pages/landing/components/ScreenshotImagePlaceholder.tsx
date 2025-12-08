import React from 'react';
import './ImagePlaceholders.css';

interface ScreenshotImagePlaceholderProps {
  title?: string;
}

const ScreenshotImagePlaceholder: React.FC<ScreenshotImagePlaceholderProps> = ({ title }) => {
  return (
    <div className="image-placeholder screenshot-placeholder">
      <div className="placeholder-content">
        <div className="placeholder-header">
          <div className="placeholder-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="placeholder-sections">
          <div className="section-item">
            <div className="section-bar"></div>
            <div className="section-bars">
              <div className="mini-bar"></div>
              <div className="mini-bar"></div>
              <div className="mini-bar"></div>
            </div>
          </div>
          <div className="section-item">
            <div className="section-bar"></div>
            <div className="section-bars">
              <div className="mini-bar"></div>
              <div className="mini-bar"></div>
            </div>
          </div>
        </div>
        {title && <div className="placeholder-text-small">{title}</div>}
      </div>
    </div>
  );
};

export default ScreenshotImagePlaceholder;
