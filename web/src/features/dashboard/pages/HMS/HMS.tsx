import React from "react";
import { Card, Row, Col, Statistic, Button, List, Avatar, Tag, Progress } from "antd";
import {
    UserOutlined,
    CalendarOutlined,
    TeamOutlined,
    DollarOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    FileTextOutlined,
    TrophyOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { useNavigate } from "react-router-dom";

const HMSDashboard: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const myLeavesData = [
        { type: "Annual Leave", used: 5, total: 15, status: "active" },
        { type: "Sick Leave", used: 2, total: 10, status: "active" },
        { type: "Personal Leave", used: 1, total: 5, status: "active" },
    ];

    const recentLeaves = [
        { name: "John Doe", type: "Annual Leave", days: "3 days", status: "approved", avatar: "JD" },
        { name: "Jane Smith", type: "Sick Leave", days: "2 days", status: "pending", avatar: "JS" },
        { name: "Mike Johnson", type: "Personal Leave", days: "1 day", status: "rejected", avatar: "MJ" },
    ];

    const todayAttendance = [
        { name: "Alice Brown", status: "present", time: "09:00 AM", avatar: "AB" },
        { name: "Bob Wilson", status: "present", time: "08:45 AM", avatar: "BW" },
        { name: "Carol Davis", status: "absent", time: "-", avatar: "CD" },
        { name: "David Miller", status: "late", time: "09:30 AM", avatar: "DM" },
    ];

    const upcomingHolidays = [
        { name: "New Year", date: "2024-01-01", days: "1 day" },
        { name: "Independence Day", date: "2024-07-04", days: "1 day" },
        { name: "Christmas", date: "2024-12-25", days: "1 day" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "green";
            case "pending":
                return "orange";
            case "rejected":
                return "red";
            case "present":
                return "green";
            case "absent":
                return "red";
            case "late":
                return "orange";
            default:
                return "default";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "approved":
                return <CheckCircleOutlined />;
            case "pending":
                return <ClockCircleOutlined />;
            case "rejected":
                return <CloseCircleOutlined />;
            case "present":
                return <CheckCircleOutlined />;
            case "absent":
                return <CloseCircleOutlined />;
            case "late":
                return <ClockCircleOutlined />;
            default:
                return null;
        }
    };

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
                    >
                        Settings
                    </Button>
                </div>
            </Card>
            <Row gutter={[16, 16]}>
                {/* My Leaves Section */}
                <Col xs={24} sm={12} lg={8}>
                    <Card
                        title={
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <FileTextOutlined />
                                <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>My leaves</span>
                            </div>
                        }
                        extra={<Button type="link" size="small">View all</Button>}
                        style={{ height: "300px" }}
                    >
                        <div style={{ height: "200px", overflowY: "auto" }}>
                            {myLeavesData.map((leave, index) => (
                                <div key={index} style={{ marginBottom: "16px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                        <span style={{ fontSize: "14px", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>{leave.type}</span>
                                        <Tag color={getStatusColor(leave.status)}>
                                            {leave.status}
                                        </Tag>
                                    </div>
                                    <Progress
                                        percent={(leave.used / leave.total) * 100}
                                        size="small"
                                        format={() => `${leave.used}/${leave.total} days`}
                                        strokeColor={
                                            leave.used / leave.total > 0.8 ? "#ff4d4f" : "#52c41a"
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                {/* My Sales Targets Section */}
                <Col xs={24} sm={12} lg={8}>
                    <Card
                        title={
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <TrophyOutlined />
                                <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>My sales targets</span>
                            </div>
                        }
                        extra={<Button type="link" size="small">View all</Button>}
                        style={{ height: "300px" }}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title="Monthly Target"
                                    value={12500}
                                    prefix="$"
                                    precision={0}
                                    valueStyle={{ color: "#3f8600" }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Achieved"
                                    value={8750}
                                    prefix="$"
                                    precision={0}
                                    valueStyle={{ color: "#1890ff" }}
                                />
                            </Col>
                        </Row>
                        <div style={{ marginTop: "16px" }}>
                            <Progress
                                percent={70}
                                size="small"
                                format={() => "70% Complete"}
                                strokeColor={{
                                    "0%": "#108ee9",
                                    "100%": "#87d068",
                                }}
                            />
                        </div>
                        <div style={{ marginTop: "16px" }}>
                            <Statistic
                                title="Days Remaining"
                                value={12}
                                suffix="days"
                                valueStyle={{ fontSize: "16px" }}
                            />
                        </div>
                    </Card>
                </Col>

                {/* Users Summary */}
                <Col xs={24} sm={12} lg={8}>
                    <Card
                        title={
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <TeamOutlined />
                                <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>Users</span>
                            </div>
                        }
                        extra={<Button type="link" size="small">View all</Button>}
                        style={{ height: "300px" }}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title="Total Employees"
                                    value={156}
                                    prefix={<UserOutlined />}
                                    valueStyle={{ color: "#1890ff" }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Active Today"
                                    value={142}
                                    prefix={<CheckCircleOutlined />}
                                    valueStyle={{ color: "#52c41a" }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: "16px" }}>
                            <Col span={12}>
                                <Statistic
                                    title="On Leave"
                                    value={8}
                                    prefix={<CalendarOutlined />}
                                    valueStyle={{ color: "#faad14" }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="New This Month"
                                    value={12}
                                    prefix={<UserOutlined />}
                                    valueStyle={{ color: "#722ed1" }}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Recent Leaves */}
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <FileTextOutlined />
                                <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>Leaves</span>
                            </div>
                        }
                        extra={<Button type="link" size="small">View all</Button>}
                    >
                        <List
                            dataSource={recentLeaves}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: "#1890ff" }}>{item.avatar}</Avatar>}
                                        title={
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>{item.name}</span>
                                                <Tag color={getStatusColor(item.status)} icon={getStatusIcon(item.status)}>
                                                    {item.status}
                                                </Tag>
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <div style={{ color: isDark ? "rgba(255,255,255,0.65)" : "inherit" }}>{item.type} - {item.days}</div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* Today's Attendance */}
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <ClockCircleOutlined />
                                <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>Today's Attendance</span>
                            </div>
                        }
                        extra={<Button type="link" size="small">View all</Button>}
                    >
                        <List
                            dataSource={todayAttendance}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: "#52c41a" }}>{item.avatar}</Avatar>}
                                        title={
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>{item.name}</span>
                                                <Tag color={getStatusColor(item.status)} icon={getStatusIcon(item.status)}>
                                                    {item.status}
                                                </Tag>
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <div style={{ color: isDark ? "rgba(255,255,255,0.65)" : "inherit" }}>Check-in: {item.time}</div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* Upcoming Holidays */}
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <CalendarOutlined />
                                <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>Holidays</span>
                            </div>
                        }
                        extra={<Button type="link" size="small">View all</Button>}
                    >
                        <List
                            dataSource={upcomingHolidays}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: "#faad14" }} icon={<CalendarOutlined />} />}
                                        title={<span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>{item.name}</span>}
                                        description={<span style={{ color: isDark ? "rgba(255,255,255,0.65)" : "inherit" }}>{`${item.date} - ${item.days}`}</span>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* Sales Targets */}
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <DollarOutlined />
                                <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>Sales targets</span>
                            </div>
                        }
                        extra={<Button type="link" size="small">View all</Button>}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title="Team Target"
                                    value={85000}
                                    prefix="$"
                                    precision={0}
                                    valueStyle={{ color: "#3f8600" }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Team Achieved"
                                    value={62000}
                                    prefix="$"
                                    precision={0}
                                    valueStyle={{ color: "#1890ff" }}
                                />
                            </Col>
                        </Row>
                        <div style={{ marginTop: "16px" }}>
                            <Progress
                                percent={73}
                                size="small"
                                format={() => "73% Complete"}
                                strokeColor={{
                                    "0%": "#108ee9",
                                    "100%": "#87d068",
                                }}
                            />
                        </div>
                        <div style={{ marginTop: "16px" }}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title="Top Performer"
                                        value="John Doe"
                                        valueStyle={{ fontSize: "14px", color: "#52c41a" }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Achievement"
                                        value="$12,500"
                                        valueStyle={{ fontSize: "14px", color: "#1890ff" }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HMSDashboard;