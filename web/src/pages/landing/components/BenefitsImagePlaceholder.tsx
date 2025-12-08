import React from 'react';
import { ThunderboltOutlined, LineChartOutlined, PieChartOutlined } from '@ant-design/icons';
import './ImagePlaceholders.css';

const BenefitsImagePlaceholder: React.FC = () => {
  return (
    <div className="image-placeholder benefits-placeholder">
      <div className="placeholder-content">
        <div className="placeholder-icon-large">
          <ThunderboltOutlined />
        </div>
        <div className="placeholder-charts">
          <div className="chart-item">
            <PieChartOutlined />
          </div>
          <div className="chart-item">
            <LineChartOutlined />
          </div>
        </div>
        <div className="placeholder-bars">
          <div className="bar" style={{ height: '60%' }}></div>
          <div className="bar" style={{ height: '80%' }}></div>
          <div className="bar" style={{ height: '45%' }}></div>
          <div className="bar" style={{ height: '90%' }}></div>
          <div className="bar" style={{ height: '70%' }}></div>
        </div>
        <div className="placeholder-text">Analytics Dashboard</div>
      </div>
    </div>
  );
};

export default BenefitsImagePlaceholder;
