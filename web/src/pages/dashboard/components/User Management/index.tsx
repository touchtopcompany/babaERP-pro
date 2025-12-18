import React, { useState } from 'react';
import {
    Table,
    Card,
    Button,
    Tag,
    Space,
    Input,
    Select,
    Modal,
    Form,
    Popconfirm,
    message,
    Typography,
    Avatar
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface User {
    key: string;
    name: string;
    email: string;
    role: 'owner' | 'admin' | 'manager' | 'member';
    status: 'active' | 'inactive' | 'pending';
    lastActive: string;
    avatar?: string;
}

const UserManagement: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [roleFilter, setRoleFilter] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form] = Form.useForm();

    // Sample data - replace with API call
    const [users, setUsers] = useState<User[]>([
        {
            key: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'owner',
            status: 'active',
            lastActive: '2025-12-18T10:30:00',
            avatar: 'JD'
        },
        {
            key: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'admin',
            status: 'active',
            lastActive: '2025-12-17T15:45:00',
            avatar: 'JS'
        },
        {
            key: '3',
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'manager',
            status: 'inactive',
            lastActive: '2025-12-10T09:15:00'
        },
        {
            key: '4',
            name: 'Alice Brown',
            email: 'alice@example.com',
            role: 'member',
            status: 'pending',
            lastActive: '2025-11-30T14:20:00'
        },
    ]);

    const getStatusTag = (status: string) => {
        switch (status) {
            case 'active':
                return <Tag color="success">Active</Tag>;
            case 'inactive':
                return <Tag color="error">Inactive</Tag>;
            case 'pending':
                return <Tag color="warning">Pending</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    const getRoleTag = (role: string) => {
        const roleConfig: Record<string, { color: string; label: string }> = {
            owner: { color: 'gold', label: 'Owner' },
            admin: { color: 'blue', label: 'Admin' },
            manager: { color: 'green', label: 'Manager' },
            member: { color: 'default', label: 'Member' },
        };

        const config = roleConfig[role] || { color: 'default', label: role };
        return <Tag color={config.color}>{config.label}</Tag>;
    };

    const handleAddUser = () => {
        setEditingUser(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record: User) => {
        setEditingUser(record);
        form.setFieldsValue({
            name: record.name,
            email: record.email,
            role: record.role,
            status: record.status
        });
        setIsModalVisible(true);
    };

    const handleDelete = (key: string) => {
        setUsers(users.filter(user => user.key !== key));
        message.success('User deleted successfully');
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editingUser) {
                // Update existing user
                setUsers(users.map(user =>
                    user.key === editingUser.key ? { ...user, ...values } : user
                ));
                message.success('User updated successfully');
            } else {
                // Add new user
                const newUser: User = {
                    ...values,
                    key: (users.length + 1).toString(),
                    lastActive: new Date().toISOString(),
                    avatar: values.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                };
                setUsers([...users, newUser]);
                message.success('User added successfully');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = !statusFilter || user.status === statusFilter;
        const matchesRole = !roleFilter || user.role === roleFilter;

        return matchesSearch && matchesStatus && matchesRole;
    });

    const columns: ColumnsType<User> = [
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar
                        style={{ backgroundColor: '#0d9488' }}
                        src={record.avatar}
                        icon={!record.avatar && <UserOutlined />}
                    >
                        {record.avatar}
                    </Avatar>
                    <div>
                        <div style={{ fontWeight: 500 }}>{record.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => getRoleTag(role),
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => getStatusTag(status),
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: 'Last Active',
            dataIndex: 'lastActive',
            key: 'lastActive',
            render: (date) => new Date(date).toLocaleString(),
            sorter: (a, b) => new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    {record.role !== 'owner' && (
                        <Popconfirm
                            title="Are you sure you want to delete this user?"
                            onConfirm={() => handleDelete(record.key)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="text" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0 }}>User Management</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddUser}
                    style={{ backgroundColor: '#0d9488', borderColor: '#0d9488' }}
                >
                    Add User
                </Button>
            </div>

            <Card>
                <div style={{ marginBottom: 16, display: 'flex', gap: '16px' }}>
                    <Input
                        placeholder="Search users..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Select
                        placeholder="Filter by status"
                        style={{ width: 150 }}
                        allowClear
                        onChange={setStatusFilter}
                    >
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                        <Option value="pending">Pending</Option>
                    </Select>
                    <Select
                        placeholder="Filter by role"
                        style={{ width: 150 }}
                        allowClear
                        onChange={setRoleFilter}
                    >
                        <Option value="owner">Owner</Option>
                        <Option value="admin">Admin</Option>
                        <Option value="manager">Manager</Option>
                        <Option value="member">Member</Option>
                    </Select>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="key"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`
                    }}
                />
            </Card>

            <Modal
                title={editingUser ? 'Edit User' : 'Add New User'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
                okText={editingUser ? 'Update' : 'Add'}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        role: 'member',
                        status: 'active'
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input the user\'s name!' }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input the user\'s email!' },
                            { type: 'email', message: 'Please enter a valid email address' }
                        ]}
                    >
                        <Input placeholder="Enter email address" />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        <Select placeholder="Select a role">
                            <Option value="admin">Admin</Option>
                            <Option value="manager">Manager</Option>
                            <Option value="member">Member</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select a status!' }]}
                    >
                        <Select placeholder="Select status">
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                            <Option value="pending">Pending</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;