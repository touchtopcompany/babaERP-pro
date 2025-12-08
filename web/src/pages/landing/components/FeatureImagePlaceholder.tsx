import React from 'react';
import './ImagePlaceholders.css';

interface FeatureImagePlaceholderProps {
  icon?: React.ReactNode;
  title?: string;
}

const FeatureImagePlaceholder: React.FC<FeatureImagePlaceholderProps> = ({ icon, title }) => {
  return (
    <div className="image-placeholder feature-placeholder">
      <div className="placeholder-content">
        <div className="placeholder-icon-medium">
          {icon || <div className="placeholder-icon-generic" />}
        </div>
        <div className="placeholder-lines">
          <div className="placeholder-line short"></div>
          <div className="placeholder-line medium"></div>
          <div className="placeholder-line long"></div>
        </div>
        {title && <div className="placeholder-text-small">{title}</div>}
      </div>
    </div>
  );
};

export default FeatureImagePlaceholder;
