import React, { useState } from 'react';
import { Button, Typography, Row, Col, Card, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  DollarOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  LockOutlined,
  CloudOutlined,
  RocketOutlined,
  GlobalOutlined,
  ApiOutlined,
  BuildOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import Layout from './components/Layout';
import HeroImagePlaceholder from './components/HeroImagePlaceholder';
import FeatureImagePlaceholder from './components/FeatureImagePlaceholder';
import BenefitsImagePlaceholder from './components/BenefitsImagePlaceholder';
import ScreenshotImagePlaceholder from './components/ScreenshotImagePlaceholder';
import './Home.css';

const { Title, Paragraph, Text } = Typography;

// Hero Image Component with Placeholder
const HeroImageWithPlaceholder: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSrc = '/src/assets/image/hero-dashboard.jpg';

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    console.log('Image failed to load:', imageSrc);
  };

  return (
    <div className="hero-image-wrapper-enterprise">
      <div className="hero-image-container-enterprise">
        {!imageError && (
          <img
            src={imageSrc}
            alt="BabaERP Dashboard"
            className="hero-image-enterprise"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        )}
        {!imageLoaded && (
          <HeroImagePlaceholder />
        )}
        <div className="hero-image-overlay-enterprise"></div>
      </div>
    </div>
  );
};

// Feature Image Component with Placeholder
const FeatureImageWithPlaceholder: React.FC<{ image: string; icon: React.ReactNode; title: string }> = ({ image, icon, title }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="feature-image-wrapper-enterprise">
      {!imageError && (
        <img
          src={image}
          alt={title}
          className="feature-image-enterprise"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      )}
      {!imageLoaded && (
        <FeatureImagePlaceholder icon={icon} title={title} />
      )}
      <div className="feature-image-overlay-enterprise"></div>
    </div>
  );
};

// Benefits Image Component with Placeholder
const BenefitsImageWithPlaceholder: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSrc = '/src/assets/image/benefits/dashboard-analytics.jpg';

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

    return (
    <div className="benefits-image-wrapper-enterprise">
      {!imageError && (
        <img
          src={imageSrc}
          alt="Enterprise Analytics Dashboard"
          className="benefits-image-enterprise"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      )}
      {!imageLoaded && (
        <BenefitsImagePlaceholder />
      )}
      <div className="benefits-image-overlay-enterprise"></div>
      <div className="benefits-image-badge-enterprise">
        <ThunderboltOutlined className="badge-icon-image-enterprise" />
        <Text className="badge-text-image-enterprise">Real-Time Insights</Text>
      </div>
    </div>
  );
};

// Screenshot Image Component with Placeholder
const ScreenshotImageWithPlaceholder: React.FC<{ image: string; title: string }> = ({ image, title }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="screenshot-image-wrapper-enterprise">
      {!imageError && (
        <img
          src={image}
          alt={title}
          className="screenshot-image-enterprise"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      )}
      {!imageLoaded && (
        <ScreenshotImagePlaceholder title={title} />
      )}
    </div>
  );
};

const Home: React.FC = () => {
  const features = [
    {
      icon: <ShoppingCartOutlined />,
      title: 'Inventory Management',
      description: 'Complete inventory control with real-time tracking, automated reordering, and multi-location support for seamless operations.',
      color: '#4A4A4A',
      image: '/src/assets/image/features/inventory.jpg',
    },
    {
      icon: <TeamOutlined />,
      title: 'CRM & Sales',
      description: 'Comprehensive customer relationship management with advanced lead tracking, sales pipelines, and automated workflows.',
      color: '#4A4A4A',
      image: '/src/assets/image/features/crm.jpg',
    },
    {
      icon: <DollarOutlined />,
      title: 'Financial Management',
      description: 'Enterprise-grade accounting, invoicing, expense tracking, and comprehensive financial reporting with real-time insights.',
      color: '#4A4A4A',
      image: '/src/assets/image/features/finance.jpg',
    },
    {
      icon: <FileTextOutlined />,
      title: 'Project Management',
      description: 'End-to-end project planning, task management, team collaboration, and resource allocation in one unified platform.',
      color: '#4A4A4A',
      image: '/src/assets/image/features/project.jpg',
    },
    {
      icon: <DatabaseOutlined />,
      title: 'Manufacturing',
      description: 'Advanced production planning, recipe management, quality control, and manufacturing workflow optimization.',
      color: '#4A4A4A',
      image: '/src/assets/image/features/manufacturing.jpg',
    },
    {
      icon: <SettingOutlined />,
      title: 'Multi-Business Support',
      description: 'Manage multiple businesses, locations, and operations from a single, powerful enterprise platform with unified controls.',
      color: '#4A4A4A',
      image: '/src/assets/image/features/multi-business.jpg',
    },
  ];

  const benefits = [
    {
      icon: <ThunderboltOutlined />,
      title: 'Real-Time Analytics',
      description: 'Live dashboards and instant insights across all business operations with advanced data visualization.',
    },
    {
      icon: <LockOutlined />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, role-based access control, and compliance-ready infrastructure for maximum protection.',
    },
    {
      icon: <CloudOutlined />,
      title: 'Cloud-Based Architecture',
      description: 'Scalable cloud infrastructure ensuring high availability, disaster recovery, and global accessibility.',
    },
    {
      icon: <GlobalOutlined />,
      title: 'Global Scalability',
      description: 'Built to scale from startup to enterprise, supporting unlimited users, transactions, and data processing.',
    },
    {
      icon: <ApiOutlined />,
      title: 'API Integration',
      description: 'Powerful APIs and integrations with 100+ third-party services for seamless workflow automation.',
    },
    {
      icon: <BuildOutlined />,
      title: 'Customizable Platform',
      description: 'Highly configurable modules and customizable workflows to match your unique business requirements.',
    },
  ];

  const keyBenefits = [
    'Enterprise-grade security & compliance',
    'Seamless third-party integrations',
    'Real-time data synchronization',
    'Scalable cloud infrastructure',
  ];

  return (
    <Layout>

      {/* Hero Section */}
      <section className="hero-enterprise">
        <div className="hero-container-enterprise">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className="hero-content-enterprise">
                
                <div className="hero-title-wrapper-enterprise">
                  <Title level={1} className="hero-title-enterprise">
                    <span className="hero-title-prefix">Power Your Business with </span>
                    <span className="title-gradient">Integrated ERP</span>
                  </Title>
                </div>

                <Paragraph className="hero-description-enterprise">
                  Transform your business operations with a comprehensive enterprise resource planning
                  solution. From inventory and sales to finance and manufacturing, manage everything
                  from a single, powerful dashboard trusted by leading businesses worldwide.
                </Paragraph>

                <div className="hero-actions-enterprise">
                  <Link to="/login">
                    <Button type="primary" size="large" icon={<RocketOutlined />} className="hero-btn-primary">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Button size="large" icon={<PlayCircleOutlined />} className="hero-btn-secondary">
                    Watch Demo
                  </Button>
                </div>

                {/* Key Benefits */}
                <div className="hero-benefits-enterprise">
                  {keyBenefits.map((benefit, index) => (
                    <div key={index} className="hero-benefit-item-enterprise">
                      <CheckCircleOutlined className="hero-benefit-icon-enterprise" />
                      <Text className="hero-benefit-text-enterprise">{benefit}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <HeroImageWithPlaceholder />
            </Col>
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-enterprise">
        <div className="section-wrapper-enterprise">
          <div className="section-header-enterprise">
            <Title level={2} className="section-title-enterprise">
              Comprehensive Business Management Suite
            </Title>
            <Paragraph className="section-description-enterprise">
              Everything you need to streamline operations, boost productivity, and drive growth all integrated in one powerful platform
            </Paragraph>
          </div>

          <Row gutter={[32, 32]} className="features-grid-enterprise">
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card className="feature-card-enterprise" hoverable>
                  <FeatureImageWithPlaceholder
                    image={feature.image}
                    icon={feature.icon}
                    title={feature.title}
                  />
                  <div className="feature-header-enterprise">
                    <div
                      className="feature-icon-wrapper-enterprise"
                      style={{ background: `${feature.color}15` }}
                    >
                      <div className="feature-icon-enterprise" style={{ color: feature.color }}>
                        {React.cloneElement(feature.icon, { style: { fontSize: '28px' } })}
                      </div>
                    </div>
                  </div>
                  <Title level={4} className="feature-title-enterprise">
                    {feature.title}
                  </Title>
                  <Paragraph className="feature-description-enterprise">
                    {feature.description}
                  </Paragraph>
                  <Link to="/features" className="feature-link-enterprise">
                    Learn more <ArrowRightOutlined />
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-enterprise">
        <div className="section-wrapper-enterprise">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className="benefits-content-enterprise">
                <Title level={2} className="section-title-enterprise">
                  Built for Enterprise Excellence
                </Title>
                <Paragraph className="section-description-enterprise">
                  Trusted by businesses across East-Africa, our platform delivers the reliability,
                  security, and scalability your enterprise demands.
                </Paragraph>
                <div className="benefits-list-enterprise">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-item-enterprise">
                      <div className="benefit-icon-wrapper-enterprise">
                        <div className="benefit-icon-enterprise">
                          {React.cloneElement(benefit.icon, { style: { fontSize: '24px' } })}
                        </div>
                      </div>
                      <div className="benefit-content-wrapper-enterprise">
                        <Text strong className="benefit-title-enterprise">
                          {benefit.title}
                        </Text>
                        <Paragraph className="benefit-description-enterprise">
                          {benefit.description}
                        </Paragraph>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="benefits-visual-enterprise">
                <BenefitsImageWithPlaceholder />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Screenshots/Demo Section */}
      <section className="screenshots-enterprise">
        <div className="section-wrapper-enterprise">
          <div className="section-header-enterprise">
            <Title level={2} className="section-title-enterprise">
              See It In Action
            </Title>
            <Paragraph className="section-description-enterprise">
              Explore how BabaERP transforms business operations with intuitive interfaces and powerful features
            </Paragraph>
          </div>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div className="screenshot-card-enterprise">
                <ScreenshotImageWithPlaceholder
                  image="/src/assets/image/screenshots/inventory.jpg"
                  title="Inventory Dashboard"
                />
                <Title level={4} className="screenshot-title-enterprise">Inventory Dashboard</Title>
                <Paragraph className="screenshot-description-enterprise">
                  Real-time inventory tracking and management
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="screenshot-card-enterprise">
                <ScreenshotImageWithPlaceholder
                  image="/src/assets/image/screenshots/reports.jpg"
                  title="Financial Reports"
                />
                <Title level={4} className="screenshot-title-enterprise">Financial Reports</Title>
                <Paragraph className="screenshot-description-enterprise">
                  Comprehensive financial insights and analytics
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="screenshot-card-enterprise">
                <ScreenshotImageWithPlaceholder
                  image="/src/assets/image/screenshots/crm.jpg"
                  title="CRM Pipeline"
                />
                <Title level={4} className="screenshot-title-enterprise">CRM Pipeline</Title>
                <Paragraph className="screenshot-description-enterprise">
                  Manage customer relationships effectively
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-enterprise">
        <div className="section-wrapper-enterprise">
          <Card className="cta-card-enterprise">
            <div className="cta-content-enterprise">
              <Title level={2} className="cta-title-enterprise">
                Ready to Transform Your Business?
              </Title>
              <Paragraph className="cta-description-enterprise">
                Join thousands of enterprises already using BabaERP to streamline operations
                and accelerate growth. Start your free trial today no credit card required.
              </Paragraph>
              <Space size="large" className="cta-buttons-enterprise">
                <Link to="/login">
                  <Button type="primary" size="large" icon={<RocketOutlined />} className="cta-btn-primary">
                    Start Free Trial
                  </Button>
                </Link>
                <Button size="large" className="cta-btn-secondary">
                  Contact Sales
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      </section>

    </Layout>
  );
};

export default Home;