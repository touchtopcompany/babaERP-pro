import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import '../Home.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="landing-enterprise">
      {/* Navigation */}
      <nav className="enterprise-nav">
        <div className="nav-container-enterprise">
          <Link to="/" className="nav-brand-enterprise">
            <img
              src="/src/assets/image/BabaERP.png"
              alt="BabaERP"
              className="nav-logo-enterprise"
            />
          </Link>
          <div className="nav-menu-enterprise">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-item-enterprise ${isActive ? 'nav-item-active' : ''}`}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) => `nav-item-enterprise ${isActive ? 'nav-item-active' : ''}`}
            >
              Features
            </NavLink>
            <NavLink
              to="/solutions"
              className={({ isActive }) => `nav-item-enterprise ${isActive ? 'nav-item-active' : ''}`}
            >
              Solutions
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) => `nav-item-enterprise ${isActive ? 'nav-item-active' : ''}`}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/resources"
              className={({ isActive }) => `nav-item-enterprise ${isActive ? 'nav-item-active' : ''}`}
            >
              Resources
            </NavLink>
            <NavLink
              to="/docs"
              className={({ isActive }) => `nav-item-enterprise ${isActive ? 'nav-item-active' : ''}`}
            >
              Documentation
            </NavLink>
          </div>
          <div className="nav-actions-enterprise">
            <Link to="/login" className="nav-login-enterprise">Sign In</Link>
            <Link to="/login">
              <Button type="primary" size="large" className="nav-cta-enterprise">
                Get Started
                <ArrowRightOutlined />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="footer-enterprise">
        <div className="footer-container-enterprise">
          <div className="footer-content-enterprise">
            <div className="footer-brand-enterprise">
              <span className="footer-brand-text-enterprise">BabaERP</span>
            </div>
            <div className="footer-links-simple-enterprise">
              <Link to="/privacy" className="footer-link-simple-enterprise">Privacy & Legal</Link>
              <Link to="/contact" className="footer-link-simple-enterprise">Contact</Link>
            </div>
            <div className="footer-copyright-enterprise">
              <span>© {new Date().getFullYear()} BabaERP. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

