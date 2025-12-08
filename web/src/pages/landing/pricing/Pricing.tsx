import React from 'react';
import { Typography, Row, Col, Card, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';
import './Pricing.css';

const { Title, Paragraph, Text } = Typography;

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: 'per month',
      description: 'Perfect for small businesses getting started',
      features: [
        'Up to 10 users',
        'Core modules included',
        'Email support',
        '5GB storage',
        'Basic reporting',
        'Mobile app access',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$299',
      period: 'per month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 50 users',
        'All modules included',
        'Priority support',
        '50GB storage',
        'Advanced reporting',
        'API access',
        'Custom workflows',
        'Advanced analytics',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with specific needs',
      features: [
        'Unlimited users',
        'All modules + custom',
        '24/7 dedicated support',
        'Unlimited storage',
        'Custom reporting',
        'Full API access',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees',
        'On-premise option',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <Layout>
      <div className="pricing-page">
        {/* Hero Section */}
        <section className="pricing-hero">
          <div className="pricing-hero-content">
            <Title level={1} className="pricing-hero-title">
              Simple, Transparent Pricing
            </Title>
            <Paragraph className="pricing-hero-description">
              Choose the perfect plan for your business. All plans include a 14-day free trial 
              with full access to all features. No credit card required.
            </Paragraph>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pricing-plans">
          <div className="section-wrapper-enterprise">
            <Row gutter={[32, 32]} justify="center">
              {plans.map((plan, index) => (
                <Col xs={24} md={12} lg={8} key={index}>
                  <Card 
                    className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
                  >
                    {plan.popular && (
                      <div className="pricing-badge">
                        <StarOutlined /> Most Popular
                      </div>
                    )}
                    <div className="pricing-card-header">
                      <Title level={3} className="pricing-plan-name">{plan.name}</Title>
                      <div className="pricing-price">
                        <span className="pricing-amount">{plan.price}</span>
                        {plan.period !== 'pricing' && (
                          <span className="pricing-period">/{plan.period}</span>
                        )}
                      </div>
                      <Paragraph className="pricing-description">
                        {plan.description}
                      </Paragraph>
                    </div>
                    <Divider />
                    <ul className="pricing-features">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="pricing-feature-item">
                          <CheckCircleOutlined className="feature-check-icon" />
                          <Text className="feature-text">{feature}</Text>
                        </li>
                      ))}
                    </ul>
                    <Link to="/login" className="pricing-cta-link">
                      <Button 
                        type={plan.popular ? 'primary' : 'default'} 
                        block 
                        size="large"
                        className="pricing-cta-button"
                        icon={plan.popular ? <RocketOutlined /> : null}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pricing-faq">
          <div className="section-wrapper-enterprise">
            <div className="section-header-enterprise">
              <Title level={2} className="section-title-enterprise">
                Frequently Asked Questions
              </Title>
            </div>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <div className="faq-item">
                  <Title level={4} className="faq-question">
                    Can I change plans later?
                  </Title>
                  <Paragraph className="faq-answer">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                    and we'll prorate any charges.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="faq-item">
                  <Title level={4} className="faq-question">
                    What happens after my free trial?
                  </Title>
                  <Paragraph className="faq-answer">
                    After your 14-day free trial ends, you'll be automatically enrolled in your chosen plan. 
                    You can cancel anytime before the trial ends with no charges.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="faq-item">
                  <Title level={4} className="faq-question">
                    Is there a setup fee?
                  </Title>
                  <Paragraph className="faq-answer">
                    No, there are no setup fees or hidden costs. The price you see is what you pay, 
                    with transparent billing every month.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="faq-item">
                  <Title level={4} className="faq-question">
                    Do you offer refunds?
                  </Title>
                  <Paragraph className="faq-answer">
                    We offer a 30-day money-back guarantee. If you're not satisfied, contact us within 
                    30 days for a full refund.
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Pricing;
