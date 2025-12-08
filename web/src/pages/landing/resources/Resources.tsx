import React from 'react';
import { Typography, Row, Col, Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { 
  FileTextOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  FilePdfOutlined,
  ArrowRightOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import Layout from '../components/Layout';
import './Resources.css';

const { Title, Paragraph, Text } = Typography;

const Resources: React.FC = () => {
  const resources = [
    {
      icon: <FileTextOutlined />,
      title: 'Documentation',
      description: 'Comprehensive guides, API references, and technical documentation to help you get the most out of BabaERP.',
      link: '/docs',
      tag: 'Documentation',
      color: '#3B82F6',
      count: '50+ Articles',
    },
    {
      icon: <PlayCircleOutlined />,
      title: 'Video Tutorials',
      description: 'Step-by-step video tutorials covering all features, from basic setup to advanced configurations.',
      link: '#',
      tag: 'Tutorials',
      color: '#EF4444',
      count: '30+ Videos',
    },
    {
      icon: <QuestionCircleOutlined />,
      title: 'Help Center',
      description: 'Find answers to common questions and learn how to troubleshoot issues with our comprehensive help center.',
      link: '#',
      tag: 'Support',
      color: '#10B981',
      count: '100+ FAQs',
    },
    {
      icon: <BookOutlined />,
      title: 'Knowledge Base',
      description: 'In-depth articles, best practices, and tips to optimize your business operations with BabaERP.',
      link: '#',
      tag: 'Articles',
      color: '#F59E0B',
      count: '75+ Articles',
    },
    {
      icon: <CustomerServiceOutlined />,
      title: 'Community Forum',
      description: 'Join our community of users, share experiences, ask questions, and get help from experts.',
      link: '#',
      tag: 'Community',
      color: '#8B5CF6',
      count: '5K+ Members',
    },
    {
      icon: <FilePdfOutlined />,
      title: 'Download Resources',
      description: 'Download guides, checklists, templates, and other resources to help streamline your implementation.',
      link: '#',
      tag: 'Downloads',
      color: '#EC4899',
      count: '20+ Files',
    },
  ];

  return (
    <Layout>
      <div className="resources-page">
        {/* Hero Section */}
        <section className="resources-hero">
          <div className="resources-hero-content">
            <Title level={1} className="resources-hero-title">
              Resources & Support
            </Title>
            <Paragraph className="resources-hero-description">
              Access comprehensive resources, documentation, and support to help you succeed with BabaERP. 
              Everything you need to get started and excel.
            </Paragraph>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="resources-grid">
          <div className="section-wrapper-enterprise">
            <Row gutter={[32, 32]}>
              {resources.map((resource, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Link to={resource.link} className="resource-card-link">
                    <Card 
                      className="resource-card"
                      hoverable
                    >
                      <div 
                        className="resource-icon-wrapper"
                        style={{ '--icon-color': resource.color } as React.CSSProperties}
                      >
                        {resource.icon}
                      </div>
                      <div className="resource-header">
                        <Tag 
                          className="resource-tag"
                          style={{ 
                            backgroundColor: `${resource.color}15`,
                            color: resource.color,
                            borderColor: `${resource.color}30`
                          }}
                        >
                          {resource.tag}
                        </Tag>
                        <Text className="resource-count">{resource.count}</Text>
                      </div>
                      <Title level={4} className="resource-title">
                        {resource.title}
                      </Title>
                      <Paragraph className="resource-description">
                        {resource.description}
                      </Paragraph>
                      <div className="resource-cta">
                        <Text className="resource-link-text">
                          Explore <ArrowRightOutlined />
                        </Text>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="resources-quick-links">
          <div className="section-wrapper-enterprise">
            <div className="section-header-enterprise">
              <Title level={2} className="section-title-enterprise">
                Quick Access
              </Title>
            </div>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={6}>
                <Link to="/docs" className="quick-link-card">
                  <FileTextOutlined className="quick-link-icon" />
                  <Text className="quick-link-text">Get Started Guide</Text>
                </Link>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Link to="/docs" className="quick-link-card">
                  <PlayCircleOutlined className="quick-link-icon" />
                  <Text className="quick-link-text">Watch Tutorials</Text>
                </Link>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Link to="/docs" className="quick-link-card">
                  <DownloadOutlined className="quick-link-icon" />
                  <Text className="quick-link-text">Download Assets</Text>
                </Link>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Link to="/docs" className="quick-link-card">
                  <QuestionCircleOutlined className="quick-link-icon" />
                  <Text className="quick-link-text">Contact Support</Text>
                </Link>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Resources;
