import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { UserOutlined, FolderOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const ProjectsReports: React.FC = () => {
    const handleViewEmployeeReport = () => {
        // TODO: Navigate to employee time log report
        console.log('Navigate to employee time log report');
    };

    const handleViewProjectReport = () => {
        // TODO: Navigate to project time log report
        console.log('Navigate to project time log report');
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Project Reports</Title>
                <Space>
                    <ClockCircleOutlined />
                    <Text type="secondary">Time Tracking Reports</Text>
                </Space>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {/* Time Log Report By Employee Card */}
                <Card
                    hoverable
                    style={{ height: 'fit-content' }}
                    bodyStyle={{ padding: '24px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#e6f7ff',
                            borderRadius: '8px',
                            marginRight: '16px'
                        }}>
                            <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                        </div>
                        <Title level={4} style={{ margin: 0 }}>
                            Time Log Report By Employee
                        </Title>
                    </div>

                    <Paragraph style={{ marginBottom: '16px', color: '#666' }}>
                        View detailed time tracking reports organized by employee.
                        Filter by date range, employee, and project to analyze work patterns and productivity.
                    </Paragraph>

                    <div style={{ marginBottom: '20px' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '8px', height: '8px', backgroundColor: '#52c41a', borderRadius: '50%', marginRight: '8px' }}></div>
                                <Text type="secondary">Daily, weekly, and monthly summaries</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '8px', height: '8px', backgroundColor: '#1890ff', borderRadius: '50%', marginRight: '8px' }}></div>
                                <Text type="secondary">Export to PDF and Excel</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '8px', height: '8px', backgroundColor: '#722ed1', borderRadius: '50%', marginRight: '8px' }}></div>
                                <Text type="secondary">Employee performance analytics</Text>
                            </div>
                        </Space>
                    </div>

                    <Button
                        type="primary"
                        block
                        size="large"
                        onClick={handleViewEmployeeReport}
                        style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                    >
                        View Report
                    </Button>
                </Card>

                {/* Time Log Report By Project Card */}
                <Card
                    hoverable
                    style={{ height: 'fit-content' }}
                    bodyStyle={{ padding: '24px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#f6ffed',
                            borderRadius: '8px',
                            marginRight: '16px'
                        }}>
                            <FolderOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                        </div>
                        <Title level={4} style={{ margin: 0 }}>
                            Time Log Report By Project
                        </Title>
                    </div>

                    <Paragraph style={{ marginBottom: '16px', color: '#666' }}>
                        Analyze time spent across different projects and tasks.
                        Track project progress, budget utilization, and resource allocation.
                    </Paragraph>

                    <div style={{ marginBottom: '20px' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '8px', height: '8px', backgroundColor: '#52c41a', borderRadius: '50%', marginRight: '8px' }}></div>
                                <Text type="secondary">Project timeline tracking</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '8px', height: '8px', backgroundColor: '#1890ff', borderRadius: '50%', marginRight: '8px' }}></div>
                                <Text type="secondary">Budget vs actual time analysis</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '8px', height: '8px', backgroundColor: '#722ed1', borderRadius: '50%', marginRight: '8px' }}></div>
                                <Text type="secondary">Resource utilization metrics</Text>
                            </div>
                        </Space>
                    </div>

                    <Button
                        type="primary"
                        block
                        size="large"
                        onClick={handleViewProjectReport}
                        style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                    >
                        View Report
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default ProjectsReports;