import React, { useState } from "react";
import {
    Card,
    Row,
    Col,
    Typography,
    Button,
    Space,
    Input,
    Divider,
    Select,
    Tabs,
} from "antd";
import {
    SettingOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface TransactionMapping {
    sellPaymentAccount: string;
    sellDepositTo: string;
    salesPaymentsPaymentAccount: string;
    salesPaymentsDepositTo: string;
    purchasePaymentAccount: string;
    purchaseDepositTo: string;
    purchasePaymentsPaymentAccount: string;
    purchasePaymentsDepositTo: string;
}

const Settings: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeTab, setActiveTab] = useState<string>("map-transactions");
    const [journalEntryPrefix, setJournalEntryPrefix] = useState<string>("");
    const [transferPrefix, setTransferPrefix] = useState<string>("");
    const [transactionMapping, setTransactionMapping] = useState<TransactionMapping>({
        sellPaymentAccount: "",
        sellDepositTo: "",
        salesPaymentsPaymentAccount: "",
        salesPaymentsDepositTo: "",
        purchasePaymentAccount: "",
        purchaseDepositTo: "",
        purchasePaymentsPaymentAccount: "",
        purchasePaymentsDepositTo: "",
    });

    const handleResetData = () => {
        setJournalEntryPrefix("");
        setTransferPrefix("");
        setTransactionMapping({
            sellPaymentAccount: "",
            sellDepositTo: "",
            salesPaymentsPaymentAccount: "",
            salesPaymentsDepositTo: "",
            purchasePaymentAccount: "",
            purchaseDepositTo: "",
            purchasePaymentsPaymentAccount: "",
            purchasePaymentsDepositTo: "",
        });
    };

    const handleTransactionMappingChange = (field: keyof TransactionMapping, value: string) => {
        setTransactionMapping(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const MapTransactionsTab = () => (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    {/* Prefix Settings */}
                    <Card
                        style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                            marginBottom: "24px",
                        }}
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Title level={4} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
                                Accounting Settings / Map Transactions
                            </Title>

                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12} lg={8}>
                                    <div>
                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                            Journal Entry Prefix
                                        </Text>
                                        <Input
                                            value={journalEntryPrefix}
                                            onChange={(e) => setJournalEntryPrefix(e.target.value)}
                                            placeholder="Enter journal entry prefix"
                                            style={{
                                                background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                                                border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",
                                                color: isDark ? "#fff" : "#1f1f1f",
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={8}>
                                    <div>
                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                            Transfer Prefix
                                        </Text>
                                        <Input
                                            value={transferPrefix}
                                            onChange={(e) => setTransferPrefix(e.target.value)}
                                            placeholder="Enter transfer prefix"
                                            style={{
                                                background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                                                border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",
                                                color: isDark ? "#fff" : "#1f1f1f",
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={8}>
                                    <div style={{ display: "flex", alignItems: "flex-end", height: "100%" }}>
                                        <Button
                                            icon={<ReloadOutlined />}
                                            onClick={handleResetData}
                                            style={{
                                                background: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0",
                                                border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",
                                                color: isDark ? "#fff" : "#1f1f1f",
                                            }}
                                        >
                                            Reset data
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Space>
                    </Card>

                    {/* Map Transactions */}
                    <Card
                        style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                        }}
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Title level={4} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
                                Map Transactions
                            </Title>

                            {/* MAIN SHOP Section */}
                            <div>
                                <Title level={5} style={{ margin: "0 0 16px 0", color: isDark ? "#fff" : "#1f1f1f" }}>
                                    MAIN SHOP
                                </Title>

                                <Row gutter={[24, 24]}>
                                    {/* Sell Section */}
                                    <Col xs={24} sm={12} md={12} lg={6}>
                                        <Card
                                            size="small"
                                            style={{
                                                background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",
                                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <Title level={5} style={{ margin: "0 0 12px 0", color: isDark ? "#fff" : "#1f1f1f", fontSize: "14px" }}>
                                                Sell
                                            </Title>
                                            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                                <div>
                                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>
                                                        Payment account
                                                    </Text>
                                                    <Select
                                                        value={transactionMapping.sellPaymentAccount}
                                                        onChange={(value) => handleTransactionMappingChange('sellPaymentAccount', value)}
                                                        style={{ width: "100%" }}
                                                        placeholder="Select account"
                                                        size="small"
                                                    >
                                                        <Select.Option value="">Select account</Select.Option>
                                                        {/* Add account options here */}
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>
                                                        Deposit to
                                                    </Text>
                                                    <Select
                                                        value={transactionMapping.sellDepositTo}
                                                        onChange={(value) => handleTransactionMappingChange('sellDepositTo', value)}
                                                        style={{ width: "100%" }}
                                                        placeholder="Select account"
                                                        size="small"
                                                    >
                                                        <Select.Option value="">Select account</Select.Option>
                                                        {/* Add account options here */}
                                                    </Select>
                                                </div>
                                            </Space>
                                        </Card>
                                    </Col>

                                    {/* Sales Payments Section */}
                                    <Col xs={24} sm={12} md={12} lg={6}>
                                        <Card
                                            size="small"
                                            style={{
                                                background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",
                                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <Title level={5} style={{ margin: "0 0 12px 0", color: isDark ? "#fff" : "#1f1f1f", fontSize: "14px" }}>
                                                Sales Payments
                                            </Title>
                                            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                                <div>
                                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>
                                                        Payment account
                                                    </Text>
                                                    <Select
                                                        value={transactionMapping.salesPaymentsPaymentAccount}
                                                        onChange={(value) => handleTransactionMappingChange('salesPaymentsPaymentAccount', value)}
                                                        style={{ width: "100%" }}
                                                        placeholder="Select account"
                                                        size="small"
                                                    >
                                                        <Select.Option value="">Select account</Select.Option>
                                                        {/* Add account options here */}
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>
                                                        Deposit to
                                                    </Text>
                                                    <Select
                                                        value={transactionMapping.salesPaymentsDepositTo}
                                                        onChange={(value) => handleTransactionMappingChange('salesPaymentsDepositTo', value)}
                                                        style={{ width: "100%" }}
                                                        placeholder="Select account"
                                                        size="small"
                                                    >
                                                        <Select.Option value="">Select account</Select.Option>
                                                        {/* Add account options here */}
                                                    </Select>
                                                </div>
                                            </Space>
                                        </Card>
                                    </Col>

                                    {/* Purchase Section */}
                                    <Col xs={24} sm={12} md={12} lg={6}>
                                        <Card
                                            size="small"
                                            style={{
                                                background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",
                                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <Title level={5} style={{ margin: "0 0 12px 0", color: isDark ? "#fff" : "#1f1f1f", fontSize: "14px" }}>
                                                Purchase
                                            </Title>
                                            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                                <div>
                                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>
                                                        Payment account
                                                    </Text>
                                                    <Select
                                                        value={transactionMapping.purchasePaymentAccount}
                                                        onChange={(value) => handleTransactionMappingChange('purchasePaymentAccount', value)}
                                                        style={{ width: "100%" }}
                                                        placeholder="Select account"
                                                        size="small"
                                                    >
                                                        <Select.Option value="">Select account</Select.Option>
                                                        {/* Add account options here */}
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>
                                                        Deposit to
                                                    </Text>
                                                    <Select
                                                        value={transactionMapping.purchaseDepositTo}
                                                        onChange={(value) => handleTransactionMappingChange('purchaseDepositTo', value)}
                                                        style={{ width: "100%" }}
                                                        placeholder="Select account"
                                                        size="small"
                                                    >
                                                        <Select.Option value="">Select account</Select.Option>
                                                        {/* Add account options here */}
                                                    </Select>
                                                </div>
                                            </Space>
                                        </Card>
                                    </Col>

                                    {/* Purchase Payments Section */}
                                    <Col xs={24} sm={12} md={12} lg={6}>
                                        <Card
                                            size="small"
                                            style={{
                                                background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",
                                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <Title level={5} style={{ margin: "0 0 12px 0", color: isDark ? "#fff" : "#1f1f1f", fontSize: "14px" }}>
                                                Purchase Payments
                                            </Title>
                                            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                                <div>
                                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>
                                                        Payment account
                                                    </Text>
                                                    <Select
                                                        value={transactionMapping.purchasePaymentsPaymentAccount}
                                                        onChange={(value) => handleTransactionMappingChange('purchasePaymentsPaymentAccount', value)}
                                                        style={{ width: "100%" }}
                                                        placeholder="Select account"
                                                        size="small"
                                                    >
                                                        <Select.Option value="">Select account</Select.Option>
                                                        {/* Add account options here */}
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>
                                                        Deposit to
                                                    </Text>
                                                    <Select
                                                        value={transactionMapping.purchasePaymentsDepositTo}
                                                        onChange={(value) => handleTransactionMappingChange('purchasePaymentsDepositTo', value)}
                                                        style={{ width: "100%" }}
                                                        placeholder="Select account"
                                                        size="small"
                                                    >
                                                        <Select.Option value="">Select account</Select.Option>
                                                        {/* Add account options here */}
                                                    </Select>
                                                </div>
                                            </Space>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const AccountSubTypeTab = () => (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                }}
            >
                <Title level={4} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
                    Account Sub Type Settings
                </Title>
                <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                    Account sub type configuration will be implemented here.
                </Text>
            </Card>
        </div>
    );

    const DetailTypeTab = () => (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                }}
            >
                <Title level={4} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
                    Detail Type Settings
                </Title>
                <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                    Detail type configuration will be implemented here.
                </Text>
            </Card>
        </div>
    );

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <SettingOutlined style={{ fontSize: "24px", color: isDark ? "#fff" : "#1f1f1f" }} />
                        <Title
                            level={2}
                            style={{
                                margin: 0,
                                color: isDark ? "#fff" : "#1f1f1f",
                                fontWeight: 600,
                            }}
                        >
                            Settings
                        </Title>
                    </div>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Card
                        style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                        }}
                        bodyStyle={{ padding: 0 }}
                    >
                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            style={{
                                color: isDark ? "#fff" : "#1f1f1f",
                            }}
                            tabBarStyle={{
                                background: isDark ? "rgba(255,255,255,0.05)" : "#fafafa",
                                margin: 0,
                                padding: "0 24px",
                                borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                            }}
                        >
                            <TabPane tab="Map Transactions" key="map-transactions">
                                <div style={{ padding: "24px" }}>
                                    <MapTransactionsTab />
                                </div>
                            </TabPane>
                            <TabPane tab="Account Sub Type" key="account-sub-type">
                                <div style={{ padding: "24px" }}>
                                    <AccountSubTypeTab />
                                </div>
                            </TabPane>
                            <TabPane tab="Detail Type" key="detail-type">
                                <div style={{ padding: "24px" }}>
                                    <DetailTypeTab />
                                </div>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Settings;