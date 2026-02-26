import React, { useState } from 'react';
import { Card, Input, Form, Button, Space, Row, Col, Tabs, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    HomeOutlined,
    FileTextOutlined,
    ClockCircleOutlined,
    SettingOutlined,
    DollarOutlined,
    CalendarOutlined,
    TeamOutlined,
    UserOutlined,
    TrophyOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import useTheme from '@/theme/useTheme';

const Settings: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('leave');

    const handleSave = (values: any) => {
        console.log('Saving settings:', values);
        // TODO: Implement save functionality
    };

    const tabItems = [
        {
            key: 'leave',
            label: 'Leave',
            icon: <FileTextOutlined />,
            children: (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                        leaveReferencePrefix: '',
                        leaveInstructions: ''
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Leave Reference No. prefix"
                                name="leaveReferencePrefix"
                                rules={[{ required: true, message: 'Please enter leave reference prefix' }]}
                            >
                                <Input
                                    placeholder="Leave Reference No. prefix"
                                    style={{
                                        background: isDark ? '#1f1f1f' : '#ffffff',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d9d9d9',
                                        color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                label="Leave Instructions"
                                name="leaveInstructions"
                            >
                                <div style={{
                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#d9d9d9'}`,
                                    borderRadius: '6px',
                                    overflow: 'hidden',
                                    background: isDark ? '#1f1f1f' : '#ffffff'
                                }}>
                                    <textarea
                                        id="leave-instructions"
                                        placeholder="Enter leave instructions..."
                                        rows={10}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            outline: 'none',
                                            resize: 'none',
                                            padding: '16px',
                                            background: 'transparent',
                                            color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit',
                                            fontFamily: 'inherit',
                                            fontSize: '14px',
                                            lineHeight: '1.5'
                                        }}
                                    />
                                    <div style={{
                                        backgroundColor: isDark ? '#141414' : '#f5f5f5',
                                        padding: '4px 8px',
                                        textAlign: 'right',
                                        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e8e8e8'}`
                                    }}>
                                        <span style={{
                                            fontSize: '11px',
                                            color: isDark ? 'rgba(255,255,255,0.45)' : '#8c8c8c',
                                            fontStyle: 'italic'
                                        }}>
                                            Powered by Tiny
                                        </span>
                                    </div>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            background: '#1890ff',
                                            borderColor: '#1890ff'
                                        }}
                                    >
                                        Save Settings
                                    </Button>
                                    <Button>
                                        Cancel
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )
        },
        {
            key: 'payroll',
            label: 'Payroll',
            icon: <DollarOutlined />,
            children: (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                        payrollReferencePrefix: ''
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Payroll Reference No. prefix"
                                name="payrollReferencePrefix"
                                rules={[{ required: true, message: 'Please enter payroll reference prefix' }]}
                            >
                                <Input
                                    placeholder="Payroll Reference No. prefix"
                                    style={{
                                        background: isDark ? '#1f1f1f' : '#ffffff',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d9d9d9',
                                        color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            background: '#1890ff',
                                            borderColor: '#1890ff'
                                        }}
                                    >
                                        Save Settings
                                    </Button>
                                    <Button>
                                        Cancel
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )
        },
        {
            key: 'attendance',
            label: 'Attendance',
            icon: <ClockCircleOutlined />,
            children: (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                        isLocationRequired: false,
                        graceBeforeCheckin: '',
                        graceAfterCheckin: '',
                        graceBeforeCheckout: '',
                        graceAfterCheckout: ''
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Form.Item name="isLocationRequired" valuePropName="checked">
                                <Checkbox
                                    style={{
                                        color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
                                    }}
                                >
                                    Is location required?
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <h4 style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit' }}>Grace Time:</h4>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Grace before checkin"
                                name="graceBeforeCheckin"
                            >
                                <Input
                                    placeholder="Grace before checkin"
                                    style={{
                                        background: isDark ? '#1f1f1f' : '#ffffff',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d9d9d9',
                                        color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
                                    }}
                                />
                            </Form.Item>
                            <p style={{ color: isDark ? 'rgba(255,255,255,0.45)' : '#8c8c8c', fontSize: '12px', marginTop: '-15px' }}>
                                (in minute) this time will not counted as overtime
                            </p>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Grace after checkin"
                                name="graceAfterCheckin"
                            >
                                <Input
                                    placeholder="Grace after checkin"
                                    style={{
                                        background: isDark ? '#1f1f1f' : '#ffffff',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d9d9d9',
                                        color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
                                    }}
                                />
                            </Form.Item>
                            <p style={{ color: isDark ? 'rgba(255,255,255,0.45)' : '#8c8c8c', fontSize: '12px', marginTop: '-15px' }}>
                                (in minute) this time will not counted as late
                            </p>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Grace before checkout"
                                name="graceBeforeCheckout"
                            >
                                <Input
                                    placeholder="Grace before checkout"
                                    style={{
                                        background: isDark ? '#1f1f1f' : '#ffffff',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d9d9d9',
                                        color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
                                    }}
                                />
                            </Form.Item>
                            <p style={{ color: isDark ? 'rgba(255,255,255,0.45)' : '#8c8c8c', fontSize: '12px', marginTop: '-15px' }}>
                                (in minute) this time will not counted as early checkout
                            </p>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Grace after checkout"
                                name="graceAfterCheckout"
                            >
                                <Input
                                    placeholder="Grace after checkout"
                                    style={{
                                        background: isDark ? '#1f1f1f' : '#ffffff',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d9d9d9',
                                        color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
                                    }}
                                />
                            </Form.Item>
                            <p style={{ color: isDark ? 'rgba(255,255,255,0.45)' : '#8c8c8c', fontSize: '12px', marginTop: '-15px' }}>
                                (in minute) this time will not counted as overtime
                            </p>
                        </Col>
                        <Col xs={24}>
                            <div style={{
                                backgroundColor: isDark ? '#001529' : '#e6f7ff',
                                border: `1px solid ${isDark ? '#003a8c' : '#91d5ff'}`,
                                borderRadius: '6px',
                                padding: '12px 16px',
                                marginTop: '16px'
                            }}>
                                <p style={{
                                    margin: 0,
                                    color: isDark ? '#1890ff' : '#0050b3',
                                    fontSize: '14px'
                                }}>
                                    "Allow users to enter their own attendance" setting has been moved to role
                                </p>
                            </div>
                        </Col>
                        <Col xs={24}>
                            <Form.Item>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            background: '#1890ff',
                                            borderColor: '#1890ff'
                                        }}
                                    >
                                        Save Settings
                                    </Button>
                                    <Button>
                                        Cancel
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )
        },
        {
            key: 'sales',
            label: 'Sales Targets',
            icon: <TrophyOutlined />,
            children: (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                        calculateSalesTargetCommissionWithoutTax: false
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Form.Item name="calculateSalesTargetCommissionWithoutTax" valuePropName="checked">
                                <Checkbox
                                    style={{
                                        color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
                                    }}
                                >
                                    Calculate Sales Target Commission without Tax
                                    <InfoCircleOutlined style={{ marginLeft: '8px', color: '#1890ff' }} />
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            background: '#1890ff',
                                            borderColor: '#1890ff'
                                        }}
                                    >
                                        Save Settings
                                    </Button>
                                    <Button>
                                        Cancel
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )
        },
        {
            key: 'essentials',
            label: 'Essentials',
            icon: <SettingOutlined />,
            children: (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                        todosIdPrefix: ''
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Todos ID Prefix:"
                                name="todosIdPrefix"
                                rules={[{ required: true, message: 'Please enter Todos ID prefix' }]}
                            >
                                <Input
                                    placeholder="Todos ID Prefix"
                                    style={{
                                        background: isDark ? '#1f1f1f' : '#ffffff',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d9d9d9',
                                        color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            background: '#1890ff',
                                            borderColor: '#1890ff'
                                        }}
                                    >
                                        Save Settings
                                    </Button>
                                    <Button>
                                        Cancel
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )
        }
    ];

    return (
        <div style={{
            padding: "24px",
            background: isDark ? "#141414" : "#f5f5f5",
            minHeight: "100vh"
        }}>
            {/* HRM Navigation Menu */}
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
                        icon={<ClockCircleOutlined />}
                        onClick={() => navigate("/hms/attendance")}
                    >
                        Attendance
                    </Button>
                    <Button
                        icon={<DollarOutlined />}
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
                    >
                        Sales Targets
                    </Button>
                    <Button
                        icon={<UserOutlined />}
                        onClick={() => navigate("/hms/settings")}
                        style={{
                            background: "#1890ff",
                            borderColor: "#1890ff",
                            color: "#ffffff"
                        }}
                    >
                        Settings
                    </Button>
                </div>
            </Card>

            {/* Settings Content */}
            <Card
                title="Essentials and HRM Settings"
                style={{
                    background: isDark ? "#1f1f1f" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9"
                }}
                headStyle={{
                    borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    color: isDark ? "rgba(255,255,255,0.85)" : "inherit"
                }}
            >
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={tabItems}
                    size="large"
                    style={{
                        color: isDark ? "rgba(255,255,255,0.85)" : "inherit"
                    }}
                />
            </Card>
        </div>
    );
};

export default Settings;