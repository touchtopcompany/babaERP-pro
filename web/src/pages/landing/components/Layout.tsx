import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  QuestionCircleOutlined, 
  GlobalOutlined, 
  UserOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';
import logoImg from '../../../assets/image/BabaERP.png';
import '../Home.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src={logoImg} alt="BabaERP logo" className="nav-logo-img" />
          </Link>
          
          <div className="nav-menu">
            <NavLink to="/features" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Features
            </NavLink>
            <NavLink to="/solutions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Solutions
            </NavLink>
            <NavLink to="/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Pricing
            </NavLink>
            <NavLink to="/resources" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Resources
            </NavLink>
            <NavLink to="/docs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Documentation
            </NavLink>
          </div>

          <div className="nav-actions">
            <button className="nav-icon-btn">
              <QuestionCircleOutlined />
            </button>
            <button className="nav-icon-btn">
              <GlobalOutlined />
              <span className="nav-lang">EN</span>
            </button>
            <Link to="/login" className="nav-icon-btn">
              <UserOutlined />
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <NavLink
              to="/features"
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Features
            </NavLink>
            <NavLink
              to="/solutions"
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Solutions
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/resources"
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Resources
            </NavLink>
            <NavLink
              to="/docs"
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Documentation
            </NavLink>
            <Link to="/login" className="mobile-menu-link login" onClick={closeMobileMenu}>
              Log In
            </Link>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          {/* Terms Notice */}
          <div className="footer-terms">
            <span>Terms subject to change. <Link to="/terms" className="footer-terms-link">Learn more.</Link></span>
          </div>

          {/* Footer Links */}
          <div className="footer-links-row">
            <span className="footer-brand">
              <span className="footer-brand-text">BabaERPPro ® {new Date().getFullYear()}</span>
            </span>
            <Link to="/privacy">Privacy & Legal</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/news">News</Link>
            <Link to="/updates">Get Updates</Link>
            <Link to="/locations">Locations</Link>
            <Link to="/learn">Learn</Link>
          </div>

          {/* Social Media Icons */}
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FacebookOutlined />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <InstagramOutlined />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <TwitterOutlined />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <LinkedinOutlined />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <YoutubeOutlined />
            </a>
          </div>

          {/* Powered By */}
          <div className="footer-powered">
            <span>
              Powered by 
              <Link to="/" className="footer-powered-link footer-powered-logo">
                <span>BabaERPPro</span>
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

