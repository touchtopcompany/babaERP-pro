import React from 'react';
import { Typography, Row, Col, Card, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { 
  ShopOutlined,
  BuildOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  BankOutlined,
  RocketOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import Layout from '../components/Layout';
import './Solutions.css';

const { Title, Paragraph } = Typography;

const Solutions: React.FC = () => {
  const solutions = [
    {
      icon: <ShopOutlined />,
      title: 'Retail & E-Commerce',
      description: 'Complete retail management solution with point-of-sale integration, inventory optimization, and customer loyalty programs.',
      features: ['POS Integration', 'Inventory Management', 'Customer Analytics', 'Multi-Channel Sales'],
      color: '#3B82F6',
    },
    {
      icon: <BuildOutlined />,
      title: 'Manufacturing',
      description: 'End-to-end manufacturing ERP with production planning, quality control, supply chain management, and equipment maintenance.',
      features: ['Production Planning', 'Quality Control', 'Supply Chain', 'Maintenance Management'],
      color: '#10B981',
    },
    {
      icon: <MedicineBoxOutlined />,
      title: 'Healthcare',
      description: 'Specialized healthcare management with patient records, appointment scheduling, billing, and compliance management.',
      features: ['Patient Management', 'Appointment Scheduling', 'Medical Billing', 'Compliance'],
      color: '#EF4444',
    },
    {
      icon: <HomeOutlined />,
      title: 'Real Estate',
      description: 'Comprehensive real estate management for properties, tenants, leases, maintenance, and financial reporting.',
      features: ['Property Management', 'Tenant Management', 'Lease Tracking', 'Maintenance'],
      color: '#F59E0B',
    },
    {
      icon: <BankOutlined />,
      title: 'Financial Services',
      description: 'Advanced financial services platform with portfolio management, risk assessment, and regulatory compliance.',
      features: ['Portfolio Management', 'Risk Assessment', 'Compliance', 'Reporting'],
      color: '#8B5CF6',
    },
    {
      icon: <RocketOutlined />,
      title: 'Startups & SMEs',
      description: 'Scalable ERP solution designed for growing businesses with flexible pricing and essential features to get started quickly.',
      features: ['Quick Setup', 'Essential Features', 'Scalable Growth', 'Cost-Effective'],
      color: '#EC4899',
    },
  ];

  return (
    <Layout>
      <div className="solutions-page">
        {/* Hero Section */}
        <section className="solutions-hero">
          <div className="solutions-hero-content">
            <Title level={1} className="solutions-hero-title">
              Industry-Specific Solutions
            </Title>
            <Paragraph className="solutions-hero-description">
              Tailored ERP solutions designed for your industry with specialized features and workflows 
              that address your unique business challenges.
            </Paragraph>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="solutions-grid">
          <div className="section-wrapper-enterprise">
            <Row gutter={[32, 32]}>
              {solutions.map((solution, index) => (
                <Col xs={24} md={12} lg={8} key={index}>
                  <Card 
                    className="solution-card"
                    hoverable
                  >
                    <div 
                      className="solution-icon-wrapper"
                      style={{ '--icon-color': solution.color } as React.CSSProperties}
                    >
                      {solution.icon}
                    </div>
                    <Title level={4} className="solution-title">
                      {solution.title}
                    </Title>
                    <Paragraph className="solution-description">
                      {solution.description}
                    </Paragraph>
                    <div className="solution-features">
                      {solution.features.map((feature, idx) => (
                        <Tag key={idx} className="solution-feature-tag">
                          {feature}
                        </Tag>
                      ))}
                    </div>
                    <Link to="/pricing" className="solution-link">
                      <Button 
                        type="link" 
                        className="solution-cta"
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* CTA Section */}
        <section className="solutions-cta">
          <div className="section-wrapper-enterprise">
            <Card className="cta-card">
              <div className="cta-content">
                <Title level={2} className="cta-title">
                  Need a Custom Solution?
                </Title>
                <Paragraph className="cta-description">
                  Our team can help you build a tailored ERP solution that perfectly fits your industry 
                  and business requirements.
                </Paragraph>
                <Link to="/login">
                  <Button type="primary" size="large" className="cta-button">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Solutions;
