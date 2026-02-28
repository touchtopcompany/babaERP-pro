import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal, Form, Input, message, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, HomeOutlined, FileTextOutlined, CalendarOutlined, TeamOutlined, UserOutlined, TrophyOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

interface Designation {
    id: string;
    name: string;
    description: string;
    department: string;
    status: string;
}

const Designation: React.FC = () => {
    const [designations, setDesignations] = useState<Designation[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDesignation, setEditingDesignation] = useState<Designation | null>(null);
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

    const columns: ColumnsType<Designation> = [
        {
            title: 'Designation',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
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

    const handleAdd = () => {
        setEditingDesignation(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (designation: Designation) => {
        setEditingDesignation(designation);
        form.setFieldsValue(designation);
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this designation?',
            onOk: () => {
                setDesignations(designations.filter(d => d.id !== id));
                message.success('Designation deleted successfully');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingDesignation) {
                setDesignations(designations.map(d =>
                    d.id === editingDesignation.id
                        ? { ...d, ...values }
                        : d
                ));
                message.success('Designation updated successfully');
            } else {
                const newDesignation: Designation = {
                    id: Date.now().toString(),
                    ...values,
                };
                setDesignations([...designations, newDesignation]);
                message.success('Designation added successfully');
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
        <div className="designation-container">
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
                         style={{
                            background: "#1890ff",
                            borderColor: "#1890ff",
                            color: "#ffffff"
                        }}
                    >
                        Designations
                    </Button>
                    <Button
                        icon={<TrophyOutlined />}
                        onClick={() => navigate("/hms/sales-targets")}
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
                <h2>Designations Management</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Add Designation
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={designations}
                rowKey="id"
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                }}
                scroll={{ x: 'max-content' }}
            />

            <Modal
                title={editingDesignation ? 'Edit Designation' : 'Add Designation'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        status: 'Active',
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Designation Name"
                        rules={[{ required: true, message: 'Please enter designation name' }]}
                    >
                        <Input placeholder="Enter designation name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <Input.TextArea rows={3} placeholder="Enter description" />
                    </Form.Item>

                    <Form.Item
                        name="department"
                        label="Department"
                        rules={[{ required: true, message: 'Please enter department' }]}
                    >
                        <Input placeholder="Enter department" />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select status' }]}
                    >
                        <Input placeholder="Enter status (Active/Inactive)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Designation;