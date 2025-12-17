import React from 'react';
import { Progress, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

const SubdomainStats: React.FC = () => {
  // Sample data - replace with actual API call
  const stats = {
    total: 150,
    active: 87,
    inactive: 63,
    growth: 12.5, // percentage
  };

  return (
    <div className="subdomain-stats">
      <div className="mb-4">
        <Title level={4} className="mb-1">
          {stats.total}
        </Title>
        <Text type="secondary">Total Subdomains</Text>
      </div>

      <div className="mb-4">
        <Row justify="space-between" align="middle" className="mb-2">
          <Text>Active</Text>
          <Text strong>{stats.active} ({Math.round((stats.active / stats.total) * 100)}%)</Text>
        </Row>
        <Progress 
          percent={Math.round((stats.active / stats.total) * 100)} 
          status="active" 
          strokeColor="#52c41a"
          showInfo={false}
        />
      </div>

      <div className="mb-4">
        <Row justify="space-between" align="middle" className="mb-2">
          <Text>Inactive</Text>
          <Text strong>{stats.inactive} ({Math.round((stats.inactive / stats.total) * 100)}%)</Text>
        </Row>
        <Progress 
          percent={Math.round((stats.inactive / stats.total) * 100)} 
          status="exception" 
          strokeColor="#ff4d4f"
          showInfo={false}
        />
      </div>

      <div className="mt-4 pt-3 border-t">
        <Row justify="space-between" align="middle">
          <Text>Growth this month</Text>
          <Text strong type={stats.growth >= 0 ? 'success' : 'danger'}>
            {stats.growth >= 0 ? '+' : ''}{stats.growth}%
          </Text>
        </Row>
      </div>
    </div>
  );
};

export default SubdomainStats;
