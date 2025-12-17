import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Row, Col, Space, Avatar, Rate } from 'antd';
import { Link } from 'react-router-dom';
import {
  SearchOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  DatabaseOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import Layout from './components/Layout';
import './Home.css';

const { Title, Paragraph } = Typography;

// Count Up Hook
const useCountUp = (end: number, duration: number = 2000, decimals: number = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const isDecimal = decimals > 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      if (isDecimal) {
        setCount(parseFloat((easeOutQuart * end).toFixed(decimals)));
      } else {
        setCount(Math.floor(easeOutQuart * end));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, decimals]);

  return count;
};

// Stat Card Component with Count Up
const StatCard: React.FC<{
  value: string;
  label: string;
  numericValue: number;
  isDecimal?: boolean;
  isTime?: boolean;
}> = ({ value, label, numericValue, isDecimal = false, isTime = false }) => {
  const count = useCountUp(numericValue, 2000, isDecimal ? 1 : 0);
  
  // Handle special cases
  const displayValue = (() => {
    if (isTime) {
      // For "24/7", don't animate
      return value;
    }
    if (value.includes('/') && value.includes('.')) {
      // For "4.9/5", show the decimal count
      return `${count}/5`;
    }
    if (value.includes('+')) {
      return `${count.toLocaleString()}+`;
    }
    return count.toLocaleString();
  })();

  return (
    <div className="stat-card">
      <div className="stat-value">{displayValue}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// Pricing Card Component
const PricingCard: React.FC<{
  plan: {
    name: string;
    description: string;
    location: string;
    capacity: string;
    features: string;
    price: string;
    provider: string;
    image: string;
  };
}> = ({ plan }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="pricing-card">
      <div className="pricing-card-image-wrapper">
        {!imgError && (
          <img
            src={plan.image}
            alt={plan.name}
            className={`pricing-card-image ${imgLoaded ? 'loaded' : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{ display: imgLoaded && !imgError ? 'block' : 'none' }}
          />
        )}
        {(!imgLoaded || imgError) && (
          <div className="pricing-card-placeholder">
            <QuestionCircleOutlined className="pricing-placeholder-icon" />
          </div>
        )}
      </div>
      <div className="pricing-card-content">
        <Title level={4} className="pricing-card-title">
          {plan.name}
        </Title>
        <Paragraph className="pricing-card-description">
          {plan.description}
        </Paragraph>
        <div className="pricing-card-details">
          <div className="pricing-detail-item">
            <DatabaseOutlined className="pricing-detail-icon" />
            <span className="pricing-detail-label">Location:</span>
            <span className="pricing-detail-value">{plan.location}</span>
          </div>
          <div className="pricing-detail-item">
            <UserOutlined className="pricing-detail-icon" />
            <span className="pricing-detail-label">Capacity:</span>
            <span className="pricing-detail-value">{plan.capacity}</span>
          </div>
          <div className="pricing-detail-item">
            <CalendarOutlined className="pricing-detail-icon" />
            <span className="pricing-detail-label">Features:</span>
            <span className="pricing-detail-value">{plan.features}</span>
          </div>
        </div>
        <div className="pricing-card-footer">
          <div className="pricing-amount">{plan.price}</div>
          <div className="pricing-provider">{plan.provider}</div>
          <Link to="/pricing">
            <Button type="primary" className="pricing-view-btn">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Solution Offer Card Component
const SolutionOfferCard: React.FC<{
  title: string;
  description: string;
  image: string;
  link: string;
}> = ({ title, description, image, link }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="solution-offer-card">
      <div className="solution-offer-content">
        <Title level={3} className="solution-offer-title">
          {title}
        </Title>
        <Paragraph className="solution-offer-description">
          {description}
        </Paragraph>
        <Link to={link}>
          <Button className="solution-offer-btn">
            Learn More
            <ArrowRightOutlined />
          </Button>
        </Link>
      </div>
      <div className="solution-offer-image-wrapper">
        <img
          src={image}
          alt={title}
          className={`solution-offer-image ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{ display: imgLoaded && !imgError ? 'block' : 'none' }}
        />
        {(!imgLoaded || imgError) && (
          <div className="solution-offer-placeholder">
            <div className="solution-offer-placeholder-icon">
              <SearchOutlined />
            </div>
            <div className="solution-offer-placeholder-text">Image</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Solution Card Component
const SolutionCard: React.FC<{
  solution: {
    category: string;
    name: string;
    price: string;
    description: string;
    image: string;
    badge: string;
  };
}> = ({ solution }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="solution-card">
      <div className="solution-card-image-wrapper">
        {!imgError && (
          <img
            src={solution.image}
            alt={solution.name}
            className={`solution-card-image ${imgLoaded ? 'loaded' : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
        {!imgLoaded && !imgError && (
          <div className="solution-card-placeholder">
            <div className="solution-placeholder-content"></div>
          </div>
        )}
        {imgError && (
          <div className="solution-card-placeholder">
            <div className="solution-placeholder-content"></div>
          </div>
        )}
        <div className="solution-card-overlay"></div>
        <div className="solution-badge">{solution.badge}</div>
        <div className="solution-image-content">
          <Title level={2} className="solution-name-overlay">
            {solution.name}
          </Title>
          <div className="solution-price-overlay">{solution.price}</div>
          <Space size="middle" className="solution-actions">
            <Link to="/login">
              <Button type="primary" className="solution-btn-primary">
                Get Started
              </Button>
            </Link>
            <Link to="/solutions">
              <Button className="solution-btn-secondary">
                Learn More
              </Button>
            </Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // const [activePricingIndex, setActivePricingIndex] = useState(0);
  const pricingScrollRef = useRef<HTMLDivElement>(null);
  const pricingCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Handle scroll to determine active card
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(containerCenter - cardCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveCardIndex(closestIndex);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle dot click to scroll to card
  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    const scrollContainer = scrollContainerRef.current;
    if (card && scrollContainer) {
      const cardRect = card.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const scrollLeft = scrollContainer.scrollLeft;
      const cardLeft = cardRect.left - containerRect.left + scrollLeft;
      const cardWidth = cardRect.width;
      const containerWidth = containerRect.width;
      const targetScroll = cardLeft - (containerWidth - cardWidth) / 2;

      scrollContainer.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  // Handle pricing dot click to scroll
  const scrollToPricingCard = (index: number) => {
    const card = pricingCardRefs.current[index];
    const scrollContainer = pricingScrollRef.current;
    if (card && scrollContainer) {
      const cardRect = card.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const scrollLeft = scrollContainer.scrollLeft;
      const cardLeft = cardRect.left - containerRect.left + scrollLeft;
      const cardWidth = cardRect.width;
      const containerWidth = containerRect.width;
      const targetScroll = cardLeft - (containerWidth - cardWidth) / 2;

      scrollContainer.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const scrollContainer = testimonialsScrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 1; // pixels per frame
    let isScrolling = true;

    const autoScroll = () => {
      if (!isScrolling) return;
      
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollContainer.scrollLeft >= maxScroll - 1) {
        // Reset to start for infinite loop
        scrollContainer.scrollTo({
          left: 0,
          behavior: 'auto',
        });
      } else {
        scrollContainer.scrollBy({
          left: scrollSpeed,
          behavior: 'auto',
        });
      }
    };

    const scrollInterval = setInterval(autoScroll, 20); // ~50fps
    autoScrollIntervalRef.current = scrollInterval;

    // Pause on hover
    const handleMouseEnter = () => {
      isScrolling = false;
    };

    const handleMouseLeave = () => {
      isScrolling = true;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const stats = [
    { value: '500+', label: 'VERIFIED OPERATORS', numericValue: 500, isDecimal: false, isTime: false },
    { value: '10,000+', label: 'SUCCESSFUL DEPLOYMENTS', numericValue: 10000, isDecimal: false, isTime: false },
    { value: '4.9/5', label: 'CUSTOMER RATING', numericValue: 4.9, isDecimal: true, isTime: false },
    { value: '24/7', label: 'SUPPORT', numericValue: 24, isDecimal: false, isTime: true },
  ];

  const solutions = [
    {
      category: 'INVENTORY',
      name: 'Inventory Management',
      price: 'From $99/month',
      description: 'Complete inventory control with real-time tracking',
      image: '/src/assets/image/features/inventory.jpg',
      badge: 'CORE MODULE',
    },
    {
      category: 'SALES',
      name: 'CRM & Sales',
      price: 'From $149/month',
      description: 'Comprehensive customer relationship management',
      image: '/src/assets/image/features/crm.jpg',
      badge: 'POPULAR',
    },
    {
      category: 'FINANCE',
      name: 'Financial Management',
      price: 'From $199/month',
      description: 'Enterprise-grade accounting and financial reporting',
      image: '/src/assets/image/features/finance.jpg',
      badge: 'PREMIUM',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter Plan',
      description: 'Perfect for small businesses getting started with ERP solutions.',
      location: 'Cloud Hosted',
      capacity: 'Up to 10 users',
      features: 'Core modules',
      price: '$99 per month',
      provider: 'by BabaERP',
      image: '/src/assets/image/features/inventory.jpg',
    },
    {
      name: 'Professional Plan',
      description: 'Ideal for growing businesses with advanced features and support.',
      location: 'Cloud Hosted',
      capacity: 'Up to 50 users',
      features: 'All modules',
      price: '$249 per month',
      provider: 'by BabaERP',
      image: '/src/assets/image/features/crm.jpg',
    },
    {
      name: 'Enterprise Plan',
      description: 'Complete solution for large enterprises with dedicated support.',
      location: 'Cloud or On-Premise',
      capacity: 'Unlimited users',
      features: 'Full suite + custom',
      price: '$499 per month',
      provider: 'by BabaERP',
      image: '/src/assets/image/features/finance.jpg',
    },
    {
      name: 'Custom Plan',
      description: 'Tailored solutions designed specifically for your business needs.',
      location: 'Flexible',
      capacity: 'Custom',
      features: 'Customized',
      price: 'Contact us',
      provider: 'by BabaERP',
      image: '/src/assets/image/features/manufacturing.jpg',
    },
  ];

  const testimonials = [
    {
      name: 'Michael T.',
      location: 'KENYA',
      quote: 'Amazing experience! The ERP system transformed our inventory management completely.',
      rating: 5,
      avatar: '/src/assets/image/testimonials/michael.jpg',
    },
    {
      name: 'Emma L.',
      location: 'TANZANIA',
      quote: 'Professional service and incredible value. Will definitely recommend to other businesses!',
      rating: 4.9,
      avatar: '/src/assets/image/testimonials/emma.jpg',
    },
    {
      name: 'David R.',
      location: 'UGANDA',
      quote: 'Outstanding platform and excellent customer support throughout our implementation.',
      rating: 5,
      avatar: '/src/assets/image/testimonials/david.jpg',
    },
    {
      name: 'Sarah K.',
      location: 'RWANDA',
      quote: 'The financial management module exceeded our expectations. Highly recommended!',
      rating: 4.8,
      avatar: '/src/assets/image/testimonials/sarah.jpg',
    },
  ];

    return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content-wrapper">
            <div className="hero-content">
              <div className="hero-badge">
                <span>Enterprise ERP Solution</span>
              </div>
              
              <Title level={1} className="hero-title">
                Transform Your Business Operations with
                <br />
                <span className="hero-title-highlight">Integrated ERP</span>
              </Title>

              <Paragraph className="hero-description">
                The Premier Enterprise Resource Planning Solution for Africa. Connect with powerful
                business management tools trusted by leading companies across East Africa. From inventory
                and sales to finance and manufacturing – manage everything securely from one unified platform.
              </Paragraph>

              <Space size="large" className="hero-actions">
                <Link to="/login">
                  <Button
                    type="primary"
                    size="large"
                    icon={<RocketOutlined />}
                    className="hero-btn-primary"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Button
                  size="large"
                  icon={<SearchOutlined />}
                  className="hero-btn-secondary"
                >
                  Explore Features
                </Button>
              </Space>

              {/* Trust Indicators */}
              <div className="hero-trust-indicators">
                <div className="trust-item">
                  <CheckCircleOutlined className="trust-icon" />
                  <span>No credit card required</span>
                </div>
                <div className="trust-item">
                  <CheckCircleOutlined className="trust-icon" />
                  <span>14-day free trial</span>
                </div>
                <div className="trust-item">
                  <CheckCircleOutlined className="trust-icon" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Hero Visual - Dashboard Preview */}
            <div className="hero-visual">
              <div className="dashboard-preview-wrapper">
                <div className="dashboard-preview">
                  {!heroImageLoaded && !heroImageError && (
                    <div className="dashboard-placeholder">
                      <div className="placeholder-content">
                        <div className="placeholder-header">
                          <div className="placeholder-dot dot-red"></div>
                          <div className="placeholder-dot dot-yellow"></div>
                          <div className="placeholder-dot dot-green"></div>
                        </div>
                        <div className="placeholder-chart">
                          <div className="chart-bar" style={{ height: '60%' }}></div>
                          <div className="chart-bar" style={{ height: '80%' }}></div>
                          <div className="chart-bar" style={{ height: '45%' }}></div>
                          <div className="chart-bar" style={{ height: '90%' }}></div>
                          <div className="chart-bar" style={{ height: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {heroImageLoaded && !heroImageError && (
                    <img
                      src="/src/assets/image/hero-dashboard.jpg"
                      alt="BabaERP Dashboard"
                      className="dashboard-image"
                      onLoad={() => setHeroImageLoaded(true)}
                      onError={() => setHeroImageError(true)}
                    />
                  )}
                </div>
                {/* Decorative Elements */}
                <div className="hero-decorative-1"></div>
                <div className="hero-decorative-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={12} sm={12} md={6} key={index}>
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  numericValue={stat.numericValue}
                  isDecimal={stat.isDecimal}
                  isTime={stat.isTime}
                />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solutions-section">
        <div className="solutions-container">
          <div className="solutions-header">
            <Title level={2} className="solutions-title">
              Choose Your ERP Solution
            </Title>
            <Paragraph className="solutions-subtitle">
              Professional business management modules for every need across East Africa
            </Paragraph>
          </div>

          <div className="solutions-scroll-container" ref={scrollContainerRef}>
            <div className="solutions-scroll-wrapper">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="solution-card-wrapper"
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                >
                  <SolutionCard solution={solution} />
                </div>
              ))}
            </div>
          </div>
          <div className="solutions-pagination">
            {solutions.map((_, index) => (
              <div
                key={index}
                className={`pagination-dot ${index === activeCardIndex ? 'active' : ''}`}
                onClick={() => scrollToCard(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Offers Section */}
      <section className="solutions-offers-section">
        <div className="solutions-offers-container">
          <div className="solutions-offers-header">
            <Title level={2} className="solutions-offers-title">
              Special Offers & Packages
            </Title>
            <Paragraph className="solutions-offers-subtitle">
              Discover our exclusive enterprise solutions designed to transform your business operations
            </Paragraph>
          </div>
          <div className="solutions-offers-scroll-container">
            <div className="solutions-offers-scroll-wrapper">
              {[
                {
                  title: 'Current Offers',
                  description: 'Limited-time enterprise packages. Transform your business operations today with our comprehensive ERP solution.',
                  image: '/src/assets/image/features/inventory.jpg',
                  link: '/pricing',
                },
                {
                  title: 'Business Packages',
                  description: 'Complete business management solutions with expert support. Discover powerful tools for your enterprise needs.',
                  image: '/src/assets/image/features/crm.jpg',
                  link: '/solutions',
                },
                {
                  title: 'Enterprise Solutions',
                  description: 'Scalable ERP solutions designed for growing businesses. Manage all operations from a single platform.',
                  image: '/src/assets/image/features/finance.jpg',
                  link: '/solutions',
                },
              ].map((offer, index) => (
                <SolutionOfferCard
                  key={index}
                  title={offer.title}
                  description={offer.description}
                  image={offer.image}
                  link={offer.link}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-scroll-container" ref={pricingScrollRef}>
            <div className="pricing-scroll-wrapper">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    pricingCardRefs.current[index] = el;
                  }}
                >
                  <PricingCard plan={plan} />
                </div>
              ))}
            </div>
          </div>
          <div className="pricing-pagination">
            {pricingPlans.map((_, index) => (
              <div
                key={index}
                // className={`pagination-dot ${index === activePricingIndex ? 'active' : ''}`}
                onClick={() => scrollToPricingCard(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <Title level={2} className="testimonials-title">
              Customer Testimonials
            </Title>
            <Paragraph className="testimonials-subtitle">
              Hear from businesses who transformed their operations with our ERP solution
            </Paragraph>
          </div>
          <div className="testimonials-scroll-wrapper-outer">
            <div className="testimonials-fade-left"></div>
            <div className="testimonials-scroll-container" ref={testimonialsScrollRef}>
              <div className="testimonials-scroll-wrapper">
                {/* Duplicate cards for seamless loop */}
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <Avatar
                      size={80}
                      src={testimonial.avatar}
                      className="testimonial-avatar"
                    >
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Paragraph className="testimonial-quote">
                      "{testimonial.quote}"
                    </Paragraph>
                    <div className="testimonial-author">
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-location">{testimonial.location}</div>
                    </div>
                    <div className="testimonial-rating">
                      <Rate
                        disabled
                        defaultValue={testimonial.rating}
                        allowHalf
                        className="testimonial-stars"
                      />
                      <span className="testimonial-rating-value">{testimonial.rating}/5</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="testimonials-fade-right"></div>
          </div>
          <div className="testimonials-cta">
            <Button className="testimonials-view-btn">
              View More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <Title level={2} className="cta-title">
            Ready to Transform Your Business?
          </Title>
          <Paragraph className="cta-description">
            Join thousands of businesses who've streamlined their operations with BabaERP. Sign up today for exclusive deals and priority access.
          </Paragraph>
          <Space size="large" className="cta-actions">
            <Link to="/login">
              <Button type="primary" size="large" className="cta-btn-primary">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="large" className="cta-btn-secondary">
                Already a Member? Log In
              </Button>
            </Link>
          </Space>
        </div>
      </section>
    </Layout>
    );
};

export default Home;
