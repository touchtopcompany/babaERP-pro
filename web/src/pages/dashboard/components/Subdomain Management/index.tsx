import React, { useState } from 'react';
import { Table, Card, Button, Tag, Space, Input, Select, Modal, Form, DatePicker } from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    CheckCircleOutlined,
    StopOutlined,
    EditOutlined,
    EyeOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface Subdomain {
    key: string;
    businessName: string;
    activeSubscription: string;
    amount: number;
    lastActive: string;
    accountStatus: 'active' | 'suspended' | 'inactive';
    subdomain: string;
    activeModules: string[];
}

const { Option } = Select;
const { RangePicker } = DatePicker;

const SubdomainManagement: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [form] = Form.useForm();

    // Sample data - replace with actual API call
    const [subdomains, setSubdomains] = useState<Subdomain[]>([
        {
            key: '1',
            businessName: 'Acme Corp',
            activeSubscription: 'Enterprise Plan',
            amount: 499,
            lastActive: '2025-12-18T10:30:00',
            accountStatus: 'active' as const,
            subdomain: 'acme.babaerp.com',
            activeModules: ['Inventory', 'CRM', 'Accounting', 'HR']
        },
        {
            key: '2',
            businessName: 'Tech Solutions',
            activeSubscription: 'Professional Plan',
            amount: 299,
            lastActive: '2025-12-17T15:45:00',
            accountStatus: 'active' as const,
            subdomain: 'techsolutions.babaerp.com',
            activeModules: ['CRM', 'Project Management']
        },
        {
            key: '3',
            businessName: 'Global Retail',
            activeSubscription: 'Basic Plan',
            amount: 99,
            lastActive: '2025-12-10T09:15:00',
            accountStatus: 'suspended' as const,
            subdomain: 'globalretail.babaerp.com',
            activeModules: ['Inventory', 'POS']
        },
        {
            key: '4',
            businessName: 'StartUp Inc',
            activeSubscription: 'Trial',
            amount: 0,
            lastActive: '2025-11-30T14:20:00',
            accountStatus: 'inactive' as const,
            subdomain: 'startup.babaerp.com',
            activeModules: ['CRM']
        },
    ]);

    const columns: ColumnsType<Subdomain> = [
        {
            title: 'Business Name',
            dataIndex: 'businessName',
            key: 'businessName',
            sorter: (a, b) => a.businessName.localeCompare(b.businessName),
        },
        {
            title: 'Active Subscription',
            dataIndex: 'activeSubscription',
            key: 'subscription',
            sorter: (a, b) => a.activeSubscription.localeCompare(b.activeSubscription),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            render: (amount: number) => `$${amount.toFixed(2)}`,
        },
        {
            title: 'Last Active',
            dataIndex: 'lastActive',
            key: 'lastActive',
            sorter: (a, b) => new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime(),
            render: (date: string) => dayjs(date).format('MMM D, YYYY h:mm A'),
        },
        {
            title: 'Account Status',
            dataIndex: 'accountStatus',
            key: 'status',
            filters: [
                { text: 'Active', value: 'active' },
                { text: 'Suspended', value: 'suspended' },
                { text: 'Inactive', value: 'inactive' },
            ],
            onFilter: (value, record) => record.accountStatus === value,
            render: (status: string) => {
                const statusMap = {
                    active: { color: 'green', text: 'Active' },
                    suspended: { color: 'orange', text: 'Suspended' },
                    inactive: { color: 'red', text: 'Inactive' },
                };
                const statusInfo = statusMap[status as keyof typeof statusMap] || { color: 'default', text: status };
                return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
            },
        },
        {
            title: 'Subdomain',
            dataIndex: 'subdomain',
            key: 'subdomain',
        },
        {
            title: 'Active Modules',
            dataIndex: 'activeModules',
            key: 'modules',
            render: (modules: string[]) => (
                <Space size={[0, 8]} wrap>
                    {modules.map(module => (
                        <Tag key={module} color="blue">
                            {module}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                    >
                        View
                    </Button>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEditSubscription(record)}
                    >
                        Subscription
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={record.accountStatus === 'active' ? <StopOutlined /> : <CheckCircleOutlined />}
                        onClick={() => handleToggleStatus(record)}
                    >
                        {record.accountStatus === 'active' ? 'Block' : 'Unblock'}
                    </Button>
                </Space>
            ),
        },
    ];

    const handleSearch = (value: string) => {
        setSearchText(value);
        // Implement search logic here
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value || null);
    };

    const handleViewDetails = (record: Subdomain) => {
        Modal.info({
            title: 'Subdomain Details',
            width: 800,
            content: (
                <div>
                    <p><strong>Business Name:</strong> {record.businessName}</p>
                    <p><strong>Subdomain:</strong> {record.subdomain}</p>
                    <p><strong>Status:</strong> <Tag color={record.accountStatus === 'active' ? 'green' : 'red'}>{record.accountStatus}</Tag></p>
                    <p><strong>Active Subscription:</strong> {record.activeSubscription} (${record.amount}/month)</p>
                    <p><strong>Last Active:</strong> {dayjs(record.lastActive).format('MMM D, YYYY h:mm A')}</p>
                    <p><strong>Active Modules:</strong></p>
                    <div style={{ marginTop: '8px' }}>
                        {record.activeModules.map(module => (
                            <Tag key={module} color="blue" style={{ marginBottom: '4px' }}>
                                {module}
                            </Tag>
                        ))}
                    </div>
                </div>
            ),
        });
    };

    const handleEditSubscription = (record: Subdomain) => {
        form.setFieldsValue({
            ...record,
            subscriptionPeriod: [dayjs(record.lastActive), dayjs().add(1, 'month')]
        });
        setIsModalVisible(true);
    };

    const handleToggleStatus = (record: Subdomain) => {
    const newStatus: 'active' | 'suspended' | 'inactive' = 
        record.accountStatus === 'active' ? 'suspended' : 'active';
    const newSubdomains = subdomains.map(item =>
        item.key === record.key ? { ...item, accountStatus: newStatus } : item
    );
    setSubdomains(newSubdomains);

    Modal.success({
        title: 'Success',
        content: `Subdomain has been ${newStatus === 'active' ? 'unblocked' : 'blocked'} successfully.`,
    });
};

    const handleModalOk = () => {
        form.validateFields().then(values => {
            const updatedSubdomains = subdomains.map(item => {
                if (item.key === form.getFieldValue('key')) {
                    return {
                        ...item,
                        activeSubscription: values.activeSubscription,
                        amount: values.amount,
                        lastActive: dayjs().toISOString(),
                    };
                }
                return item;
            });

            setSubdomains(updatedSubdomains);
            setIsModalVisible(false);
            form.resetFields();

            Modal.success({
                title: 'Success',
                content: 'Subscription updated successfully.',
            });
        });
    };

    const handleModalCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const filteredData = subdomains.filter(item => {
        const matchesSearch = item.businessName.toLowerCase().includes(searchText.toLowerCase()) ||
            item.subdomain.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter ? item.accountStatus === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="subdomain-management">
            <Card
                title="Subdomain Management"
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            form.resetFields();
                            setIsModalVisible(true);
                        }}
                    >
                        Add New Subdomain
                    </Button>
                }
            >
                <div className="mb-4 flex gap-4">
                    <Input
                        placeholder="Search by business name or subdomain"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Select
                        placeholder="Filter by status"
                        style={{ width: 200 }}
                        allowClear
                        onChange={handleStatusFilter}
                    >
                        <Option value="active">Active</Option>
                        <Option value="suspended">Suspended</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    scroll={{ x: 1500 }}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} subdomains`
                    }}
                />
            </Card>

            <Modal
                title="Update Subscription"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        activeSubscription: 'Professional Plan',
                        amount: 299,
                    }}
                >
                    <Form.Item name="key" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item name="businessName" label="Business Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter business name" />
                    </Form.Item>

                    <Form.Item name="subdomain" label="Subdomain" rules={[{ required: true }]}>
                        <Input addonBefore="https://" addonAfter=".babaerp.com" placeholder="subdomain" />
                    </Form.Item>

                    <Form.Item name="activeSubscription" label="Subscription Plan" rules={[{ required: true }]}>
                        <Select>
                            <Option value="Basic Plan">Basic Plan ($99/month)</Option>
                            <Option value="Professional Plan">Professional Plan ($299/month)</Option>
                            <Option value="Enterprise Plan">Enterprise Plan ($499/month)</Option>
                            <Option value="Custom Plan">Custom Plan</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="amount" label="Amount (USD)" rules={[{ required: true }]}>
                        <Input type="number" prefix="$" />
                    </Form.Item>

                    <Form.Item name="subscriptionPeriod" label="Subscription Period" rules={[{ required: true }]}>
                        <RangePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="activeModules" label="Active Modules">
                        <Select mode="multiple" placeholder="Select modules">
                            <Option value="Inventory">Inventory</Option>
                            <Option value="CRM">CRM</Option>
                            <Option value="Accounting">Accounting</Option>
                            <Option value="HR">HR</Option>
                            <Option value="Project Management">Project Management</Option>
                            <Option value="POS">Point of Sale</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SubdomainManagement;
