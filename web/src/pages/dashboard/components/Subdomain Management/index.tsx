import React from 'react';
import { Card, Table, Button, Space, Input, Typography } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

const SubdomainManagement: React.FC = () => {
    // Sample data - replace with your actual data
    const dataSource = [
        {
            key: '1',
            name: 'example1',
            domain: 'example1.yourapp.com',
            status: 'Active',
            created: '2023-01-15',
        },
        {
            key: '2',
            name: 'example2',
            domain: 'example2.yourapp.com',
            status: 'Active',
            created: '2023-02-20',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Domain',
            dataIndex: 'domain',
            key: 'domain',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Space size="middle">
                    <Button type="link" size="small">Edit</Button>
                    <Button type="link" danger size="small">Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="subdomain-management">
            <div className="page-header">
                <Title level={3}>Subdomain Management</Title>
                <div className="actions">
                    <Space>
                        <Input
                            placeholder="Search subdomains..."
                            prefix={<SearchOutlined />}
                            style={{ width: 250 }}
                        />
                        <Button type="primary" icon={<PlusOutlined />}>
                            Add Subdomain
                        </Button>
                    </Space>
                </div>
            </div>

            <Card>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default SubdomainManagement;
