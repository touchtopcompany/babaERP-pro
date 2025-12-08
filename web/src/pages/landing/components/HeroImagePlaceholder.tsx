import React from 'react';
import { BarChartOutlined, FileTextOutlined, ShoppingCartOutlined, DollarOutlined, TeamOutlined } from '@ant-design/icons';
import './ImagePlaceholders.css';

const HeroImagePlaceholder: React.FC = () => {
  return (
    <div className="image-placeholder hero-placeholder">
      <div className="placeholder-content hero-dashboard-layout">
        {/* Dashboard Header */}
        <div className="hero-dashboard-header">
          <div className="hero-dashboard-header-left">
            <div className="hero-dashboard-logo"></div>
            <div className="hero-dashboard-title">BabaERP Dashboard</div>
          </div>
          <div className="hero-dashboard-header-right">
            <div className="hero-dashboard-icon-circle"></div>
            <div className="hero-dashboard-icon-circle"></div>
            <div className="hero-dashboard-icon-circle"></div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="hero-dashboard-main">
          <div className="hero-dashboard-widgets">
            <div className="hero-dashboard-widget large">
              <div className="hero-widget-icon">
                <BarChartOutlined />
              </div>
              <div className="hero-widget-content">
                <div className="hero-chart-bars">
                  <div className="hero-bar" style={{ height: '60%' }}></div>
                  <div className="hero-bar" style={{ height: '85%' }}></div>
                  <div className="hero-bar" style={{ height: '45%' }}></div>
                  <div className="hero-bar" style={{ height: '70%' }}></div>
                  <div className="hero-bar" style={{ height: '90%' }}></div>
                  <div className="hero-bar" style={{ height: '55%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="hero-dashboard-widget">
              <div className="hero-widget-icon">
                <ShoppingCartOutlined />
              </div>
              <div className="hero-widget-number">1,247</div>
              <div className="hero-widget-label">ORDERS</div>
            </div>
            
            <div className="hero-dashboard-widget">
              <div className="hero-widget-icon">
                <DollarOutlined />
              </div>
              <div className="hero-widget-number">$45.2K</div>
              <div className="hero-widget-label">REVENUE</div>
            </div>
            
            <div className="hero-dashboard-widget">
              <div className="hero-widget-icon">
                <TeamOutlined />
              </div>
              <div className="hero-widget-number">892</div>
              <div className="hero-widget-label">CUSTOMERS</div>
            </div>
            
            <div className="hero-dashboard-widget">
              <div className="hero-widget-icon">
                <FileTextOutlined />
              </div>
              <div className="hero-widget-number">156</div>
              <div className="hero-widget-label">REPORTS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImagePlaceholder;
