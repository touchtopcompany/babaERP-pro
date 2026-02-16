import React, { useState } from 'react';
import { Table, Tag, Button, Space, Avatar, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ApprovalRequest {
  key: string;
  name: string;
  email: string;
  type: 'user' | 'company';
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const ApprovalRequests: React.FC = () => {
  // Sample data - replace with actual API call
  const [requests, setRequests] = useState<ApprovalRequest[]>([
    {
      key: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      type: 'user',
      date: '2025-12-10',
      status: 'pending',
    },
    {
      key: '2',
      name: 'Acme Corp',
      email: 'admin@acmecorp.com',
      type: 'company',
      date: '2025-12-12',
      status: 'pending',
    },
    {
      key: '3',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      type: 'user',
      date: '2025-12-14',
      status: 'pending',
    },
  ]);

  const handleApprove = (key: string) => {
    setRequests(requests.map(request => 
      request.key === key ? { ...request, status: 'approved' } : request
    ));
    // TODO: Add API call to update status
  };

  const handleReject = (key: string) => {
    setRequests(requests.map(request => 
      request.key === key ? { ...request, status: 'rejected' } : request
    ));
    // TODO: Add API call to update status
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ApprovalRequest) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-3" />
          <div>
            <div className="font-medium">{text}</div>
            <Text type="secondary">{record.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'user' ? 'blue' : 'purple'} className="capitalize">
          {type}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag 
          color={
            status === 'approved' 
              ? 'success' 
              : status === 'rejected' 
                ? 'error' 
                : 'warning'
          }
          className="capitalize"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: ApprovalRequest) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<CheckCircleOutlined />} 
            onClick={() => handleApprove(record.key)}
            disabled={record.status !== 'pending'}
            className="text-green-500 hover:bg-green-50"
          >
            Approve
          </Button>
          <Button 
            type="text" 
            danger 
            icon={<CloseCircleOutlined />}
            onClick={() => handleReject(record.key)}
            disabled={record.status !== 'pending'}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="approval-requests">
      <Table 
        columns={columns} 
        dataSource={requests} 
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />
    </div>
  );
};

export default ApprovalRequests;
