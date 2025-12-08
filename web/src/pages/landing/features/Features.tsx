import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { 
  ShoppingCartOutlined,
  TeamOutlined,
  DollarOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  LockOutlined,
  CloudOutlined,
  GlobalOutlined,
  ApiOutlined,
  BuildOutlined,
} from '@ant-design/icons';
import Layout from '../components/Layout';
import '../Home.css';

const { Title, Paragraph } = Typography;

const Features: React.FC = () => {
  const features = [
    {
      icon: <ShoppingCartOutlined />,
      title: 'Inventory Management',
      description: 'Complete inventory control with real-time tracking, automated reordering, and multi-location support for seamless operations.',
    },
    {
      icon: <TeamOutlined />,
      title: 'CRM & Sales',
      description: 'Comprehensive customer relationship management with advanced lead tracking, sales pipelines, and automated workflows.',
    },
    {
      icon: <DollarOutlined />,
      title: 'Financial Management',
      description: 'Enterprise-grade accounting, invoicing, expense tracking, and comprehensive financial reporting with real-time insights.',
    },
    {
      icon: <FileTextOutlined />,
      title: 'Project Management',
      description: 'End-to-end project planning, task management, team collaboration, and resource allocation in one unified platform.',
    },
    {
      icon: <DatabaseOutlined />,
      title: 'Manufacturing',
      description: 'Advanced production planning, recipe management, quality control, and manufacturing workflow optimization.',
    },
    {
      icon: <SettingOutlined />,
      title: 'Multi-Business Support',
      description: 'Manage multiple businesses, locations, and operations from a single, powerful enterprise platform with unified controls.',
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Real-Time Analytics',
      description: 'Advanced analytics and reporting tools with real-time dashboards, custom reports, and actionable business insights.',
    },
    {
      icon: <LockOutlined />,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with role-based access control, data encryption, audit trails, and compliance management.',
    },
    {
      icon: <CloudOutlined />,
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud-based infrastructure with automatic backups, high availability, and seamless updates.',
    },
    {
      icon: <GlobalOutlined />,
      title: 'Multi-Language Support',
      description: 'Global business support with multi-language interfaces, currency conversion, and localized compliance features.',
    },
    {
      icon: <ApiOutlined />,
      title: 'API & Integrations',
      description: 'Comprehensive API and integrations with third-party applications, payment gateways, and business tools.',
    },
    {
      icon: <BuildOutlined />,
      title: 'Customizable Workflows',
      description: 'Flexible workflow automation with custom business rules, approval processes, and automated task assignments.',
    },
  ];

  return (
    <Layout>
      <section className="hero-enterprise">
        <div className="section-wrapper-enterprise">
          <div className="section-header-enterprise" style={{ marginBottom: '60px', textAlign: 'center' }}>
            <Title level={1} className="section-title-enterprise">
              Powerful Features for Your Business
            </Title>
            <Paragraph className="section-description-enterprise" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Discover the comprehensive suite of features designed to streamline your business operations, 
              increase productivity, and drive growth across all departments.
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card className="feature-card-enterprise" style={{ height: '100%' }}>
                  <div className="feature-icon-wrapper-enterprise">
                    {feature.icon}
                  </div>
                  <Title level={4} style={{ marginTop: '20px', marginBottom: '12px' }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: '#666666', marginBottom: 0 }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </Layout>
  );
};

export default Features;

