import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal, Form, Input, message, Card, InputNumber, Select, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, HomeOutlined, FileTextOutlined, CalendarOutlined, TeamOutlined, UserOutlined, TrophyOutlined, AimOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

interface SalesTarget {
    id: string;
    user: string;
    targetAmount: number;
    period: string;
    startDate: string;
    endDate: string;
    status: string;
    achievedAmount?: number;
}

const SalesTargets: React.FC = () => {
    const [salesTargets, setSalesTargets] = useState<SalesTarget[]>([
        {
            id: '1',
            user: 'Mr C2Z Electronics',
            targetAmount: 0,
            period: 'monthly',
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().add(1, 'month').format('YYYY-MM-DD'),
            status: 'Active'
        }
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTarget, setEditingTarget] = useState<SalesTarget | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            const htmlElement = document.documentElement;
            const isDarkMode = htmlElement.classList.contains('dark') ||
                htmlElement.getAttribute('data-theme') === 'dark' ||
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(isDarkMode);
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme']
        });

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(checkDarkMode);

        return () => {
            observer.disconnect();
            mediaQuery.removeListener(checkDarkMode);
        };
    }, []);

    const columns: ColumnsType<SalesTarget> = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            sorter: (a, b) => a.user.localeCompare(b.user),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<AimOutlined />}
                        onClick={() => handleSetTarget(record)}
                    >
                        Set Sales Target
                    </Button>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleSetTarget = (target: SalesTarget) => {
        setEditingTarget(target);
        form.setFieldsValue({
            ...target,
            startDate: moment(target.startDate),
            endDate: moment(target.endDate)
        });
        setIsModalVisible(true);
    };

    const handleAdd = () => {
        setEditingTarget(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (target: SalesTarget) => {
        setEditingTarget(target);
        form.setFieldsValue({
            ...target,
            startDate: moment(target.startDate),
            endDate: moment(target.endDate)
        });
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this sales target?',
            onOk: () => {
                setSalesTargets(salesTargets.filter(t => t.id !== id));
                message.success('Sales target deleted successfully');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            const formattedValues = {
                ...values,
                startDate: values.startDate.format('YYYY-MM-DD'),
                endDate: values.endDate.format('YYYY-MM-DD')
            };

            if (editingTarget) {
                setSalesTargets(salesTargets.map(t =>
                    t.id === editingTarget.id
                        ? { ...t, ...formattedValues }
                        : t
                ));
                message.success('Sales target updated successfully');
            } else {
                const newTarget: SalesTarget = {
                    id: Date.now().toString(),
                    ...formattedValues,
                };
                setSalesTargets([...salesTargets, newTarget]);
                message.success('Sales target added successfully');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <div className="sales-targets-container">
            <Card
                style={{
                    marginBottom: "24px",
                    background: isDark ? "#1f1f1f" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9"
                }}
                bodyStyle={{ padding: "16px" }}
            >
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    alignItems: "center"
                }}>
                    <Button
                        type="primary"
                        icon={<HomeOutlined />}
                        onClick={() => navigate("/hms")}
                        style={{
                            background: "#1890ff",
                            borderColor: "#1890ff"
                        }}
                    >
                        HRM
                    </Button>
                    <Button
                        icon={<FileTextOutlined />}
                        onClick={() => navigate("/hms/leave-type")}
                    >
                        Leave Type
                    </Button>
                    <Button
                        icon={<FileTextOutlined />}
                        onClick={() => navigate("/hms/leave")}
                    >
                        Leave
                    </Button>
                    <Button
                        icon={<CalendarOutlined />}
                        onClick={() => navigate("/hms/attendance")}
                    >
                        Attendance
                    </Button>
                    <Button
                        icon={<CalendarOutlined />}
                        onClick={() => navigate("/hms/payroll")}
                    >
                        Payroll
                    </Button>
                    <Button
                        icon={<CalendarOutlined />}
                        onClick={() => navigate("/hms/holiday")}
                    >
                        Holiday
                    </Button>
                    <Button
                        icon={<TeamOutlined />}
                        onClick={() => navigate("/hms/departments")}
                    >
                        Departments
                    </Button>
                    <Button
                        icon={<UserOutlined />}
                        onClick={() => navigate("/hms/designations")}
                    >
                        Designations
                    </Button>
                    <Button
                        icon={<TrophyOutlined />}
                        onClick={() => navigate("/hms/sales-targets")}
                        style={{
                            background: "#1890ff",
                            borderColor: "#1890ff",
                            color: "#ffffff"
                        }}
                    >
                        Sales Targets
                    </Button>
                    <Button
                        icon={<UserOutlined />}
                        onClick={() => navigate("/hms/settings")}
                    >
                        Settings
                    </Button>
                </div>
            </Card>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Sales Targets Management</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Add Sales Target
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={salesTargets}
                rowKey="id"
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                }}
                scroll={{ x: 'max-content' }}
            />

            <Modal
                title={editingTarget ? 'Edit Sales Target' : 'Set Sales Target'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        period: 'monthly',
                        status: 'Active',
                        startDate: moment(),
                        endDate: moment().add(1, 'month')
                    }}
                >
                    <Form.Item
                        name="user"
                        label="User"
                        rules={[{ required: true, message: 'Please enter user name' }]}
                    >
                        <Input placeholder="Enter user name" />
                    </Form.Item>

                    <Form.Item
                        name="targetAmount"
                        label="Target Amount ($)"
                        rules={[{ required: true, message: 'Please enter target amount' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="Enter target amount"
                            min={0}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value: string | undefined): number => parseFloat(value!.replace(/\$\s?|(,*)/g, '')) || 0}
                        />
                    </Form.Item>

                    <Form.Item
                        name="period"
                        label="Period"
                        rules={[{ required: true, message: 'Please select period' }]}
                    >
                        <Select placeholder="Select period">
                            <Select.Option value="daily">Daily</Select.Option>
                            <Select.Option value="weekly">Weekly</Select.Option>
                            <Select.Option value="monthly">Monthly</Select.Option>
                            <Select.Option value="quarterly">Quarterly</Select.Option>
                            <Select.Option value="yearly">Yearly</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[{ required: true, message: 'Please select start date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="endDate"
                        label="End Date"
                        rules={[{ required: true, message: 'Please select end date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select status' }]}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value="Active">Active</Select.Option>
                            <Select.Option value="Inactive">Inactive</Select.Option>
                            <Select.Option value="Completed">Completed</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SalesTargets;