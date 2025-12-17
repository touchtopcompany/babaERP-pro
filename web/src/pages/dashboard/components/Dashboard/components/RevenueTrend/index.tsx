import React from 'react';
import { Line } from '@ant-design/charts';
import { Card, Select, Row, Col } from 'antd';

const { Option } = Select;

const RevenueTrend: React.FC = () => {
  // Sample data - replace with actual API call
  const data = [
    { month: 'Jan', revenue: 3500 },
    { month: 'Feb', revenue: 4200 },
    { month: 'Mar', revenue: 3800 },
    { month: 'Apr', revenue: 5100 },
    { month: 'May', revenue: 4900 },
    { month: 'Jun', revenue: 6200 },
    { month: 'Jul', revenue: 5800 },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'revenue',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {},
    smooth: true,
    lineStyle: {
      lineWidth: 3,
    },
    color: '#1890ff',
    xAxis: {
      line: { style: { stroke: '#d9d9d9' } },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `$${v}`,
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: 'Revenue', value: `$${datum.revenue}` };
      },
    },
  };

  return (
    <div className="revenue-trend">
      <Row justify="end" className="mb-3">
        <Col>
          <Select defaultValue="monthly" style={{ width: 120 }}>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
            <Option value="yearly">Yearly</Option>
          </Select>
        </Col>
      </Row>
      <div style={{ height: '300px' }}>
        <Line {...config} />
      </div>
    </div>
  );
};

export default RevenueTrend;
