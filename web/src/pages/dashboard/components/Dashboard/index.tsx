import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { UserOutlined, ShopOutlined, LineChartOutlined, CheckCircleOutlined } from '@ant-design/icons';
import RevenueTrend from './components/RevenueTrend';
import SubdomainStats from './components/SubdomainStats';
import ApprovalRequests from './components/ApprovalRequests';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Title level={2} className="dashboard-title">Owner Dashboard</Title>
      
      {/* Stats Overview */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon" style={{ backgroundColor: '#1890ff20' }}>
                <UserOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
              </div>
              <div className="stat-info">
                <div className="stat-value">1,234</div>
                <div className="stat-label">Total Users</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon" style={{ backgroundColor: '#52c41a20' }}>
                <ShopOutlined style={{ color: '#52c41a', fontSize: '24px' }} />
              </div>
              <div className="stat-info">
                <div className="stat-value">42</div>
                <div className="stat-label">Active Subdomains</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon" style={{ backgroundColor: '#faad1420' }}>
                <LineChartOutlined style={{ color: '#faad14', fontSize: '24px' }} />
              </div>
              <div className="stat-info">
                <div className="stat-value">$12,345</div>
                <div className="stat-label">Monthly Revenue</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon" style={{ backgroundColor: '#722ed120' }}>
                <CheckCircleOutlined style={{ color: '#722ed1', fontSize: '24px' }} />
              </div>
              <div className="stat-info">
                <div className="stat-value">15</div>
                <div className="stat-label">Pending Approvals</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Revenue Trend Chart */}
        <Col xs={24} xl={16}>
          <Card title="Revenue Trend" className="dashboard-card">
            <RevenueTrend />
          </Card>
        </Col>
        
        {/* Subdomain Stats */}
        <Col xs={24} xl={8}>
          <Card title="Subdomain Statistics" className="dashboard-card">
            <SubdomainStats />
          </Card>
        </Col>
      </Row>

      {/* Approval Requests */}
      <Row className="mt-4">
        <Col span={24}>
          <Card title="Pending Approvals" className="dashboard-card">
            <ApprovalRequests />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;