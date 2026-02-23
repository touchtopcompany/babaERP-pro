import React, { useState } from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Input,
    Tabs,
    message,
    Row,
    Col,
    Divider,
    Checkbox,
    Select,
    Tag,
} from "antd";
import {
    SettingOutlined,
    BellOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface PrefixSettings {
    assetCodePrefix: string;
    allocationCodePrefix: string;
    revokeCodePrefix: string;
    assetMaintenancePrefix: string;
}

interface NotificationSettings {
    sendForMaintenance: {
        availableTags: string[];
        recipients: string[];
        enableEmail: boolean;
    };
    assignedForMaintenance: {
        availableTags: string[];
        recipients: string[];
        enableEmail: boolean;
    };
}

const Settings: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [prefixSettings, setPrefixSettings] = useState<PrefixSettings>({
        assetCodePrefix: "AST",
        allocationCodePrefix: "ALC",
        revokeCodePrefix: "REV",
        assetMaintenancePrefix: "MNT",
    });

    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        sendForMaintenance: {
            availableTags: ["{asset_name}", "{maintenance_type}", "{date}", "{technician}"],
            recipients: [],
            enableEmail: false,
        },
        assignedForMaintenance: {
            availableTags: ["{asset_name}", "{maintenance_type}", "{date}", "{technician}"],
            recipients: [],
            enableEmail: false,
        },
    });

    const [activeTab, setActiveTab] = useState("prefixes");

    const handlePrefixChange = (field: keyof PrefixSettings, value: string) => {
        setPrefixSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdate = () => {
        // Validate that all prefixes are filled
        const hasEmptyPrefix = Object.values(prefixSettings).some(value => !value.trim());

        if (hasEmptyPrefix) {
            message.error("All prefix fields are required");
            return;
        }

        // Here you would typically make an API call to save the settings
        console.log("Updating settings:", prefixSettings);
        message.success("Settings updated successfully");
    };

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            {/* Header Section */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                    marginBottom: "24px",
                }}
                styles={{ body: { padding: "24px" } }}
            >
                <Title
                    level={2}
                    style={{
                        margin: 0,
                        color: isDark ? "#fff" : "#1f1f1f",
                        fontWeight: 600,
                    }}
                >
                    Asset settings
                </Title>
            </Card>

            {/* Settings Tabs */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                }}
                styles={{ body: { padding: "24px" } }}
            >
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    style={{ marginBottom: "24px" }}
                >
                    <TabPane
                        tab={
                            <Space>
                                <SettingOutlined />
                                <span>Prefixes</span>
                            </Space>
                        }
                        key="prefixes"
                    >
                        <div style={{ maxWidth: "800px" }}>
                            <Title
                                level={4}
                                style={{
                                    marginBottom: "32px",
                                    color: isDark ? "#fff" : "#1f1f1f",
                                }}
                            >
                                Prefixes
                            </Title>

                            <Row gutter={[24, 16]}>
                                <Col xs={24} sm={12} md={12}>
                                    <div style={{ marginBottom: "16px" }}>
                                        <Text
                                            strong
                                            style={{
                                                display: "block",
                                                marginBottom: "8px",
                                                color: isDark ? "#fff" : "#1f1f1f",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Asset code prefix
                                        </Text>
                                        <Input
                                            value={prefixSettings.assetCodePrefix}
                                            onChange={(e) => handlePrefixChange("assetCodePrefix", e.target.value)}
                                            placeholder="Enter asset code prefix"
                                            style={{
                                                width: "100%",
                                                height: "40px",
                                                borderRadius: "6px",
                                            }}
                                            size="middle"
                                        />
                                    </div>
                                </Col>

                                <Col xs={24} sm={12} md={12}>
                                    <div style={{ marginBottom: "16px" }}>
                                        <Text
                                            strong
                                            style={{
                                                display: "block",
                                                marginBottom: "8px",
                                                color: isDark ? "#fff" : "#1f1f1f",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Allocation code prefix
                                        </Text>
                                        <Input
                                            value={prefixSettings.allocationCodePrefix}
                                            onChange={(e) => handlePrefixChange("allocationCodePrefix", e.target.value)}
                                            placeholder="Enter allocation code prefix"
                                            style={{
                                                width: "100%",
                                                height: "40px",
                                                borderRadius: "6px",
                                            }}
                                            size="middle"
                                        />
                                    </div>
                                </Col>

                                <Col xs={24} sm={12} md={12}>
                                    <div style={{ marginBottom: "16px" }}>
                                        <Text
                                            strong
                                            style={{
                                                display: "block",
                                                marginBottom: "8px",
                                                color: isDark ? "#fff" : "#1f1f1f",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Revoke code prefix
                                        </Text>
                                        <Input
                                            value={prefixSettings.revokeCodePrefix}
                                            onChange={(e) => handlePrefixChange("revokeCodePrefix", e.target.value)}
                                            placeholder="Enter revoke code prefix"
                                            style={{
                                                width: "100%",
                                                height: "40px",
                                                borderRadius: "6px",
                                            }}
                                            size="middle"
                                        />
                                    </div>
                                </Col>

                                <Col xs={24} sm={12} md={12}>
                                    <div style={{ marginBottom: "16px" }}>
                                        <Text
                                            strong
                                            style={{
                                                display: "block",
                                                marginBottom: "8px",
                                                color: isDark ? "#fff" : "#1f1f1f",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Asset maintenance prefix
                                        </Text>
                                        <Input
                                            value={prefixSettings.assetMaintenancePrefix}
                                            onChange={(e) => handlePrefixChange("assetMaintenancePrefix", e.target.value)}
                                            placeholder="Enter asset maintenance prefix"
                                            style={{
                                                width: "100%",
                                                height: "40px",
                                                borderRadius: "6px",
                                            }}
                                            size="middle"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Divider style={{ margin: "24px 0 32px 0" }} />

                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <Button
                                    type="primary"
                                    onClick={handleUpdate}
                                    size="large"
                                    style={{
                                        height: "44px",
                                        padding: "0 32px",
                                        borderRadius: "6px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </TabPane>

                    <TabPane
                        tab={
                            <Space>
                                <BellOutlined />
                                <span>Notifications</span>
                            </Space>
                        }
                        key="notifications"
                    >
                        <div style={{ maxWidth: "800px" }}>
                            <Title
                                level={4}
                                style={{
                                    marginBottom: "24px",
                                    color: isDark ? "#fff" : "#1f1f1f",
                                }}
                            >
                                Notifications
                            </Title>

                            {/* Asset send for maintenance notification */}
                            <Card
                                style={{
                                    background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",
                                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                    borderRadius: "8px",
                                    marginBottom: "16px",
                                }}
                                styles={{ body: { padding: "20px" } }}
                            >
                                <Title
                                    level={5}
                                    style={{
                                        margin: "0 0 16px 0",
                                        color: isDark ? "#fff" : "#1f1f1f",
                                        fontWeight: 500,
                                    }}
                                >
                                    Asset send for maintenance notification
                                </Title>
                                
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={8}>
                                        <div style={{ marginBottom: "12px" }}>
                                            <Text
                                                strong
                                                style={{
                                                    display: "block",
                                                    marginBottom: "8px",
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Available Tags
                                            </Text>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                                {notificationSettings.sendForMaintenance.availableTags.map((tag, index) => (
                                                    <Tag
                                                        key={index}
                                                        style={{
                                                            background: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0",
                                                            border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",
                                                            color: isDark ? "#fff" : "#1f1f1f",
                                                        }}
                                                    >
                                                        {tag}
                                                    </Tag>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                    
                                    <Col xs={24} md={8}>
                                        <div style={{ marginBottom: "12px" }}>
                                            <Text
                                                strong
                                                style={{
                                                    display: "block",
                                                    marginBottom: "8px",
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Recipients
                                            </Text>
                                            <Select
                                                mode="multiple"
                                                placeholder="Select recipients"
                                                style={{ width: "100%" }}
                                                value={notificationSettings.sendForMaintenance.recipients}
                                                onChange={(value) => setNotificationSettings(prev => ({
                                                    ...prev,
                                                    sendForMaintenance: {
                                                        ...prev.sendForMaintenance,
                                                        recipients: value
                                                    }
                                                }))}
                                                options={[
                                                    { label: "admin@company.com", value: "admin@company.com" },
                                                    { label: "manager@company.com", value: "manager@company.com" },
                                                    { label: "tech@company.com", value: "tech@company.com" },
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                    
                                    <Col xs={24} md={8}>
                                        <div style={{ marginBottom: "12px" }}>
                                            <Text
                                                strong
                                                style={{
                                                    display: "block",
                                                    marginBottom: "8px",
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Enable email
                                            </Text>
                                            <Checkbox
                                                checked={notificationSettings.sendForMaintenance.enableEmail}
                                                onChange={(e) => setNotificationSettings(prev => ({
                                                    ...prev,
                                                    sendForMaintenance: {
                                                        ...prev.sendForMaintenance,
                                                        enableEmail: e.target.checked
                                                    }
                                                }))}
                                            >
                                                Enable email notifications
                                            </Checkbox>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Asset assigned for maintenance notification */}
                            <Card
                                style={{
                                    background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",
                                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                    borderRadius: "8px",
                                    marginBottom: "16px",
                                }}
                                styles={{ body: { padding: "20px" } }}
                            >
                                <Title
                                    level={5}
                                    style={{
                                        margin: "0 0 16px 0",
                                        color: isDark ? "#fff" : "#1f1f1f",
                                        fontWeight: 500,
                                    }}
                                >
                                    Asset assigned for maintenance notification
                                </Title>
                                
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={8}>
                                        <div style={{ marginBottom: "12px" }}>
                                            <Text
                                                strong
                                                style={{
                                                    display: "block",
                                                    marginBottom: "8px",
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Available Tags
                                            </Text>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                                {notificationSettings.assignedForMaintenance.availableTags.map((tag, index) => (
                                                    <Tag
                                                        key={index}
                                                        style={{
                                                            background: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0",
                                                            border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",
                                                            color: isDark ? "#fff" : "#1f1f1f",
                                                        }}
                                                    >
                                                        {tag}
                                                    </Tag>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                    
                                    <Col xs={24} md={8}>
                                        <div style={{ marginBottom: "12px" }}>
                                            <Text
                                                strong
                                                style={{
                                                    display: "block",
                                                    marginBottom: "8px",
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Recipients
                                            </Text>
                                            <Select
                                                mode="multiple"
                                                placeholder="Select recipients"
                                                style={{ width: "100%" }}
                                                value={notificationSettings.assignedForMaintenance.recipients}
                                                onChange={(value) => setNotificationSettings(prev => ({
                                                    ...prev,
                                                    assignedForMaintenance: {
                                                        ...prev.assignedForMaintenance,
                                                        recipients: value
                                                    }
                                                }))}
                                                options={[
                                                    { label: "admin@company.com", value: "admin@company.com" },
                                                    { label: "manager@company.com", value: "manager@company.com" },
                                                    { label: "tech@company.com", value: "tech@company.com" },
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                    
                                    <Col xs={24} md={8}>
                                        <div style={{ marginBottom: "12px" }}>
                                            <Text
                                                strong
                                                style={{
                                                    display: "block",
                                                    marginBottom: "8px",
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Enable email
                                            </Text>
                                            <Checkbox
                                                checked={notificationSettings.assignedForMaintenance.enableEmail}
                                                onChange={(e) => setNotificationSettings(prev => ({
                                                    ...prev,
                                                    assignedForMaintenance: {
                                                        ...prev.assignedForMaintenance,
                                                        enableEmail: e.target.checked
                                                    }
                                                }))}
                                            >
                                                Enable email notifications
                                            </Checkbox>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                            <Divider style={{ margin: "24px 0 32px 0" }} />

                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        console.log("Updating notification settings:", notificationSettings);
                                        message.success("Notification settings updated successfully");
                                    }}
                                    size="large"
                                    style={{
                                        height: "44px",
                                        padding: "0 32px",
                                        borderRadius: "6px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default Settings;
