import React, { useState } from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Row,
    Col,
    Select,
    DatePicker,
    Statistic,
    Table,
    Tag,
} from "antd";
import {
    DesktopOutlined,
    FileTextOutlined,
    TagsOutlined,
    SettingOutlined,
    UserOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { useNavigate } from "react-router-dom";
import dayjs, { type Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface AssetStats {
    assetsAllocatedToYou: number;
    totalAssets: number;
    totalAssetsAllocated: number;
}

interface AssetData {
    category: string;
    assetsAllocated: number;
    totalAssets: number;
}

interface ExpiringAsset {
    asset: string;
    warrantyStatus: string;
}

const Assets: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<[Dayjs, Dayjs] | null>([
        dayjs("2025-01-01"),
        dayjs("2025-12-31"),
    ]);

    // Mock statistics data
    const stats: AssetStats = {
        assetsAllocatedToYou: 0,
        totalAssets: 0,
        totalAssetsAllocated: 0,
    };

    // Mock assets allocated to you data
    const assetsAllocatedToYou: AssetData[] = [];

    // Mock assets by category data
    const assetsByCategory: AssetData[] = [];

    // Mock expiring assets data
    const expiringAssets: ExpiringAsset[] = [];

    const getWarrantyStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "expired":
                return "error";
            case "expiring":
                return "warning";
            case "valid":
                return "success";
            default:
                return "default";
        }
    };

    // Table columns for assets allocated to you
    const allocatedColumns = [
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (text: string) => <Text>{text}</Text>,
        },
        {
            title: "Assets Allocated to you",
            dataIndex: "assetsAllocated",
            key: "assetsAllocated",
            render: (value: number) => <Text strong>{value}</Text>,
        },
    ];

    // Table columns for assets by category
    const categoryColumns = [
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (text: string) => <Text>{text}</Text>,
        },
        {
            title: "Total Assets",
            dataIndex: "totalAssets",
            key: "totalAssets",
            render: (value: number) => <Text strong>{value}</Text>,
        },
    ];

    // Table columns for expiring assets
    const expiringColumns = [
        {
            title: "Assets",
            dataIndex: "asset",
            key: "asset",
            render: (text: string) => <Text>{text}</Text>,
        },
        {
            title: "Warranty status",
            dataIndex: "warrantyStatus",
            key: "warrantyStatus",
            render: (status: string) => (
                <Tag color={getWarrantyStatusColor(status)}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
    ];

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            {/* Header Section */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }} align="middle">
                <Col xs={24} sm={12} md={16} lg={18}>
                    <Title
                        level={2}
                        style={{
                            margin: 0,
                            color: isDark ? "#fff" : "#1f1f1f",
                            fontWeight: 600,
                        }}
                    >
                        Asset Management
                    </Title>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                        <Select
                            placeholder="Please Select"
                            style={{ width: 150 }}
                        />
                        <RangePicker
                            value={selectedDate}
                            onChange={(dates) => {
                                if (dates && dates[0] && dates[1]) {
                                    setSelectedDate([dates[0], dates[1]]);
                                } else {
                                    setSelectedDate(null);
                                }
                            }}
                            format="MM/DD/YYYY"
                            placeholder={["Start date", "End date"]}
                        />
                    </Space>
                </Col>
            </Row>

            {/* Navigation Links */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                    marginBottom: "24px",
                }}
                styles={{ body: { padding: "16px 24px" } }}
            >
                <Space size="large" wrap>
                    <Button type="link" style={{ padding: 0, height: "auto" }}>
                        <Text strong style={{ color: "#1890ff" }}>Asset Management</Text>
                    </Button>
                    <Button
                        type="link"
                        style={{ padding: 0, height: "auto" }}
                        onClick={() => navigate("/asset-management/assets")}
                    >
                        <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                            <DesktopOutlined /> Assets
                        </Text>
                    </Button>
                    <Button
                        type="link"
                        style={{ padding: 0, height: "auto" }}
                        onClick={() => navigate("/asset-management/asset-allocated")}
                    >
                        <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                            <UserOutlined /> Asset allocated
                        </Text>
                    </Button>
                    <Button
                        type="link"
                        style={{ padding: 0, height: "auto" }}
                        onClick={() => navigate("/asset-management/asset-revoked")}
                    >
                        <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                            <FileTextOutlined /> Asset revoked
                        </Text>
                    </Button>
                    <Button
                        type="link"
                        style={{ padding: 0, height: "auto" }}
                        onClick={() => navigate("/asset-management/asset-maintenance")}
                    >
                        <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                            <SettingOutlined /> Asset maintenance
                        </Text>
                    </Button>
                    <Button
                        type="link"
                        style={{ padding: 0, height: "auto" }}
                        onClick={() => navigate("/asset-management/asset-categories")}
                    >
                        <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                            <TagsOutlined /> Asset categories
                        </Text>
                    </Button>
                    <Button
                        type="link"
                        style={{ padding: 0, height: "auto" }}
                        onClick={() => navigate("/asset-management/settings")}
                    >
                        <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                            <SettingOutlined /> Settings
                        </Text>
                    </Button>
                </Space>
            </Card>

            {/* Statistics Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={12} md={8}>
                    <Card
                        style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                        }}
                        styles={{ body: { padding: "24px" } }}
                    >
                        <Statistic
                            title="ASSETS ALLOCATED TO YOU"
                            value={stats.assetsAllocatedToYou}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: "#1890ff" }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card
                        style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                        }}
                        styles={{ body: { padding: "24px" } }}
                    >
                        <Statistic
                            title="TOTAL ASSETS"
                            value={stats.totalAssets}
                            prefix={<DesktopOutlined />}
                            valueStyle={{ color: "#52c41a" }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card
                        style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                        }}
                        styles={{ body: { padding: "24px" } }}
                    >
                        <Statistic
                            title="TOTAL ASSETS ALLOCATED"
                            value={stats.totalAssetsAllocated}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: "#faad14" }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Tables Section */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={8}>
                    <Card
                        style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                        }}
                        title={
                            <Title
                                level={4}
                                style={{
                                    margin: 0,
                                    color: isDark ? "#fff" : "#1f1f1f",
                                    fontWeight: 600,
                                }}
                            >
                                Assets Allocated to you
                            </Title>
                        }
                        styles={{ body: { padding: "16px" } }}
                    >
                        <Table
                            columns={allocatedColumns}
                            dataSource={assetsAllocatedToYou}
                            pagination={false}
                            size="small"
                            locale={{ emptyText: "No data" }}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                        }}
                        title={
                            <Title
                                level={4}
                                style={{
                                    margin: 0,
                                    color: isDark ? "#fff" : "#1f1f1f",
                                    fontWeight: 600,
                                }}
                            >
                                Assets by category
                            </Title>
                        }
                        styles={{ body: { padding: "16px" } }}
                    >
                        <Table
                            columns={categoryColumns}
                            dataSource={assetsByCategory}
                            pagination={false}
                            size="small"
                            locale={{ emptyText: "No data" }}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                        }}
                        title={
                            <Title
                                level={4}
                                style={{
                                    margin: 0,
                                    color: isDark ? "#fff" : "#1f1f1f",
                                    fontWeight: 600,
                                }}
                            >
                                Assets expired or expiring in one month
                            </Title>
                        }
                        styles={{ body: { padding: "16px" } }}
                    >
                        <Table
                            columns={expiringColumns}
                            dataSource={expiringAssets}
                            pagination={false}
                            size="small"
                            locale={{ emptyText: "No data" }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Assets;