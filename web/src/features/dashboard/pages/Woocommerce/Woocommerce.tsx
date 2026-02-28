import React, { useState } from "react";
import {
    Card,
    Button,
    Alert,
    Typography,
    Space,
    Divider,
    Form,
    Input,
    Switch,
    Row,
    Col,
    Badge,
    Tabs,
    Table,
    Dropdown,
    Menu,
    Select,
    Checkbox,
} from "antd";
import type { Key } from "antd/es/table/interface";
import {
    ShoppingCartOutlined,
    SyncOutlined,
    SettingOutlined,
    FileTextOutlined,
    DollarOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    DownOutlined,
    ExportOutlined,
    PrinterOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface WoocommerceSettings {
    apiUrl: string;
    consumerKey: string;
    consumerSecret: string;
    isActive: boolean;
}

interface SyncLogEntry {
    key: string;
    date: string;
    syncType: string;
    operation: string;
    syncedBy: string;
    records: number;
}

const WoocommercePage: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [form] = Form.useForm();
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("woocommerce");
    const [searchText, setSearchText] = useState("");

    const handleTestConnection = async () => {
        setLoading(true);
        try {
            // Simulate API connection test
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsConnected(true);
        } catch (error) {
            setIsConnected(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSettings = async (values: WoocommerceSettings) => {
        setLoading(true);
        try {
            // Simulate saving settings
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Saving WooCommerce settings:", values);
        } catch (error) {
            console.error("Error saving settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const syncActions = [
        {
            title: "Sync Product Categories",
            description: "Synchronize product categories from WooCommerce",
            icon: <ShoppingCartOutlined />,
            action: "sync-categories",
        },
        {
            title: "Sync Products",
            description: "Import products from WooCommerce store",
            icon: <ShoppingCartOutlined />,
            action: "sync-products",
        },
        {
            title: "Map Tax Rates",
            description: "Configure tax rate mapping between systems",
            icon: <DollarOutlined />,
            action: "map-tax-rates",
        },
        {
            title: "Sync Orders",
            description: "Import orders from WooCommerce",
            icon: <FileTextOutlined />,
            action: "sync-orders",
        },
    ];

    const syncLogData: SyncLogEntry[] = [
        {
            key: "1",
            date: "2025-02-26 10:30:00",
            syncType: "Products",
            operation: "Import",
            syncedBy: "Admin User",
            records: 150,
        },
        {
            key: "2",
            date: "2025-02-26 09:15:00",
            syncType: "Orders",
            operation: "Import",
            syncedBy: "John Doe",
            records: 25,
        },
        {
            key: "3",
            date: "2025-02-25 16:45:00",
            syncType: "Categories",
            operation: "Sync",
            syncedBy: "Admin User",
            records: 12,
        },
    ];

    const syncLogColumns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a: SyncLogEntry, b: SyncLogEntry) => a.date.localeCompare(b.date),
        },
        {
            title: "Sync Type",
            dataIndex: "syncType",
            key: "syncType",
            filters: [
                { text: "Products", value: "Products" },
                { text: "Orders", value: "Orders" },
                { text: "Categories", value: "Categories" },
            ],
            onFilter: (value: boolean | Key, record: SyncLogEntry) => typeof value === 'string' && record.syncType === value,
        },
        {
            title: "Operation",
            dataIndex: "operation",
            key: "operation",
            filters: [
                { text: "Import", value: "Import" },
                { text: "Sync", value: "Sync" },
                { text: "Export", value: "Export" },
            ],
            onFilter: (value: boolean | Key, record: SyncLogEntry) => typeof value === 'string' && record.operation === value,
        },
        {
            title: "Synced By",
            dataIndex: "syncedBy",
            key: "syncedBy",
        },
        {
            title: "Records",
            dataIndex: "records",
            key: "records",
            sorter: (a: SyncLogEntry, b: SyncLogEntry) => a.records - b.records,
            render: (records: number) => records.toLocaleString(),
        },
    ];

    const exportMenu = (
        <Menu>
            <Menu.Item key="csv" icon={<ExportOutlined />}>
                Export to CSV
            </Menu.Item>
            <Menu.Item key="excel" icon={<ExportOutlined />}>
                Export to Excel
            </Menu.Item>
            <Menu.Item key="pdf" icon={<ExportOutlined />}>
                Export to PDF
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="print" icon={<PrinterOutlined />}>
                Print
            </Menu.Item>
        </Menu>
    );

    const filteredSyncLogData = syncLogData.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div style={{ padding: "24px", background: isDark ? "#141414" : "#f5f5f5", minHeight: "100vh" }}>
            <Title level={2} style={{ color: isDark ? "#ffffff" : "#000000", marginBottom: "24px" }}>
                WooCommerce Integration
            </Title>

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                style={{
                    background: isDark ? "#1f1f1f" : "#ffffff",
                    borderRadius: "8px",
                    padding: "8px",
                    border: isDark ? "1px solid #303030" : "1px solid #d9d9d9",
                }}
            >
                <TabPane
                    tab={
                        <Space>
                            <ShoppingCartOutlined />
                            <span>WooCommerce</span>
                        </Space>
                    }
                    key="woocommerce"
                >
                    {!isConnected && (
                        <Alert
                            message="Unable to connect with WooCommerce. Check API settings"
                            type="error"
                            showIcon
                            style={{ marginBottom: "24px" }}
                        />
                    )}

                    <Row gutter={[24, 24]}>
                        {/* API Settings */}
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <Space>
                                        <SettingOutlined />
                                        <span>API Settings</span>
                                        {isConnected ? (
                                            <Badge status="success" text="Connected" />
                                        ) : (
                                            <Badge status="error" text="Not Connected" />
                                        )}
                                    </Space>
                                }
                                style={{
                                    background: isDark ? "#1f1f1f" : "#ffffff",
                                    border: isDark ? "1px solid #303030" : "1px solid #d9d9d9",
                                }}
                            >
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleSaveSettings}
                                    initialValues={{
                                        isActive: false,
                                    }}
                                >
                                    <Form.Item
                                        label="WooCommerce API URL"
                                        name="apiUrl"
                                        rules={[{ required: true, message: "Please enter API URL" }]}
                                    >
                                        <Input
                                            placeholder="https://yourstore.com/wp-json/wc/v3"
                                            style={{ background: isDark ? "#262626" : "#ffffff" }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Consumer Key"
                                        name="consumerKey"
                                        rules={[{ required: true, message: "Please enter consumer key" }]}
                                    >
                                        <Input.Password
                                            placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            style={{ background: isDark ? "#262626" : "#ffffff" }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Consumer Secret"
                                        name="consumerSecret"
                                        rules={[{ required: true, message: "Please enter consumer secret" }]}
                                    >
                                        <Input.Password
                                            placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            style={{ background: isDark ? "#262626" : "#ffffff" }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Enable WooCommerce Integration"
                                        name="isActive"
                                        valuePropName="checked"
                                    >
                                        <Switch />
                                    </Form.Item>

                                    <Divider />

                                    <Space>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            icon={<CheckCircleOutlined />}
                                        >
                                            Save Settings
                                        </Button>
                                        <Button
                                            onClick={handleTestConnection}
                                            loading={loading}
                                            icon={<SyncOutlined />}
                                        >
                                            Test Connection
                                        </Button>
                                    </Space>
                                </Form>
                            </Card>
                        </Col>

                        {/* Sync Actions */}
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <Space>
                                        <SyncOutlined />
                                        <span>Sync Actions</span>
                                    </Space>
                                }
                                style={{
                                    background: isDark ? "#1f1f1f" : "#ffffff",
                                    border: isDark ? "1px solid #303030" : "1px solid #d9d9d9",
                                }}
                            >
                                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                                    {syncActions.map((action, index) => (
                                        <Card
                                            key={index}
                                            size="small"
                                            hoverable
                                            style={{
                                                background: isDark ? "#262626" : "#fafafa",
                                                border: isDark ? "1px solid #404040" : "1px solid #e8e8e8",
                                            }}
                                            actions={[
                                                <Button
                                                    type="link"
                                                    icon={<SyncOutlined />}
                                                    onClick={() => console.log(`Trigger ${action.action}`)}
                                                    disabled={!isConnected}
                                                >
                                                    Sync
                                                </Button>,
                                            ]}
                                        >
                                            <Space>
                                                <div
                                                    style={{
                                                        fontSize: "20px",
                                                        color: isDark ? "#1890ff" : "#1890ff",
                                                    }}
                                                >
                                                    {action.icon}
                                                </div>
                                                <div>
                                                    <Text strong style={{ color: isDark ? "#ffffff" : "#000000" }}>
                                                        {action.title}
                                                    </Text>
                                                    <br />
                                                    <Text
                                                        type="secondary"
                                                        style={{ fontSize: "12px", color: isDark ? "#a6a6a6" : "#8c8c8c" }}
                                                    >
                                                        {action.description}
                                                    </Text>
                                                </div>
                                            </Space>
                                        </Card>
                                    ))}
                                </Space>
                            </Card>
                        </Col>
                    </Row>

                    {/* Status Card */}
                    <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
                        <Col span={24}>
                            <Card
                                title="Integration Status"
                                style={{
                                    background: isDark ? "#1f1f1f" : "#ffffff",
                                    border: isDark ? "1px solid #303030" : "1px solid #d9d9d9",
                                }}
                            >
                                <Row gutter={16}>
                                    <Col xs={24} sm={8}>
                                        <div style={{ textAlign: "center" }}>
                                            <div
                                                style={{
                                                    fontSize: "32px",
                                                    color: isConnected ? "#52c41a" : "#ff4d4f",
                                                    marginBottom: "8px",
                                                }}
                                            >
                                                {isConnected ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                                            </div>
                                            <Text strong style={{ color: isDark ? "#ffffff" : "#000000" }}>
                                                Connection Status
                                            </Text>
                                            <br />
                                            <Text
                                                type={isConnected ? "success" : "danger"}
                                                style={{ color: isConnected ? "#52c41a" : "#ff4d4f" }}
                                            >
                                                {isConnected ? "Connected" : "Disconnected"}
                                            </Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <div style={{ textAlign: "center" }}>
                                            <div
                                                style={{
                                                    fontSize: "32px",
                                                    color: "#1890ff",
                                                    marginBottom: "8px",
                                                }}
                                            >
                                                <SyncOutlined />
                                            </div>
                                            <Text strong style={{ color: isDark ? "#ffffff" : "#000000" }}>
                                                Last Sync
                                            </Text>
                                            <br />
                                            <Text type="secondary" style={{ color: isDark ? "#a6a6a6" : "#8c8c8c" }}>
                                                Never
                                            </Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <div style={{ textAlign: "center" }}>
                                            <div
                                                style={{
                                                    fontSize: "32px",
                                                    color: "#faad14",
                                                    marginBottom: "8px",
                                                }}
                                            >
                                                <ShoppingCartOutlined />
                                            </div>
                                            <Text strong style={{ color: isDark ? "#ffffff" : "#000000" }}>
                                                Products Synced
                                            </Text>
                                            <br />
                                            <Text type="secondary" style={{ color: isDark ? "#a6a6a6" : "#8c8c8c" }}>
                                                0
                                            </Text>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <FileTextOutlined />
                            <span>Sync Log</span>
                        </Space>
                    }
                    key="sync-log"
                >
                    <Card
                        title="Sync History"
                        style={{
                            background: isDark ? "#1f1f1f" : "#ffffff",
                            border: isDark ? "1px solid #303030" : "1px solid #d9d9d9",
                        }}
                        extra={
                            <Space>
                                <Input
                                    placeholder="Search sync logs..."
                                    prefix={<SearchOutlined />}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    style={{ width: 250 }}
                                />
                                <Dropdown overlay={exportMenu} placement="bottomRight">
                                    <Button icon={<DownOutlined />}>
                                        Export
                                    </Button>
                                </Dropdown>
                            </Space>
                        }
                    >
                        <Table
                            columns={syncLogColumns}
                            dataSource={filteredSyncLogData}
                            pagination={{
                                total: filteredSyncLogData.length,
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} of ${total} items`,
                            }}
                            scroll={{ x: 800 }}
                            style={{
                                background: isDark ? "#1f1f1f" : "#ffffff",
                            }}
                        />
                    </Card>
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <SettingOutlined />
                            <span>API Settings</span>
                        </Space>
                    }
                    key="api-settings"
                >
                    <Card
                        title="Instructions"
                        bordered={false}
                        style={{ marginBottom: "24px", background: isDark ? "#2b2b2b" : "#fff" }}
                        headStyle={{ color: isDark ? "#fff" : "#000" }}
                    >
                        <ul style={{ color: isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)" }}>
                            <li>Do not refresh or leave the page while synchronizing</li>
                            <li>Timezone of POS should be same as timezone of the Woocommerce App</li>
                            <li>
                                Get WooCommerce API details from, <b>WooCommerce -&gt; Settings -&gt; Advance -&gt; REST API</b>. Enter description, select User &amp; Provide <b>Read/Write</b> Permission. <a href="https://woocommerce.com/document/woocommerce-rest-api/#section-3">Click here for more info</a>
                            </li>
                            <li>Change the permalinks option to "<b>Post Name</b>" in WordPress permalink option.</li>
                            <li>If still doesn't work try to reset the permalink</li>
                            <li>
                                To <b>Auto Sync</b> categories, products and orders you must setup a cron job with this command:
                                <pre style={{ background: isDark ? "#1e1e1e" : "#f0f0f0", padding: "10px", borderRadius: "4px", marginTop: "10px", color: isDark ? "#52c41a" : "#000" }}>
                                    ***** /opt/alt/php82/usr/bin/lsphp /home/u717332437/domains/babaerp.live/public_html/artisan schedule:run &gt;&gt; /dev/null 2&gt;&amp;1
                                </pre>
                            </li>
                            <li>Set it in cron jobs tab in cpanel or directadmin or similar panel.</li>
                            <li>Or edit crontab if using cloud/dedicated hosting.</li>
                            <li>Or contact hosting for help with cron job settings.</li>
                        </ul>
                    </Card>

                    <Card
                        title="API Settings"
                        style={{
                            marginBottom: "24px",
                            background: isDark ? "#1f1f1f" : "#ffffff",
                            border: isDark ? "1px solid #303030" : "1px solid #d9d9d9",
                        }}
                        headStyle={{ color: isDark ? "#fff" : "#000" }}
                    >
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col xs={24} md={8}>
                                    <Form.Item label="API URL">
                                        <Input
                                            placeholder="https://yourstore.com/wp-json/wc/v3"
                                            style={{ background: isDark ? "#262626" : "#ffffff" }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item label="API Version">
                                        <Select
                                            placeholder="Select API version"
                                            style={{ width: "100%", background: isDark ? "#262626" : "#ffffff" }}
                                        >
                                            <Select.Option value="v3">v3</Select.Option>
                                            <Select.Option value="v2">v2</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item label="Business Location">
                                        <Select
                                            placeholder="Select business location"
                                            style={{ width: "100%", background: isDark ? "#262626" : "#ffffff" }}
                                        >
                                            <Select.Option value="us">United States</Select.Option>
                                            <Select.Option value="uk">United Kingdom</Select.Option>
                                            <Select.Option value="ca">Canada</Select.Option>
                                            <Select.Option value="au">Australia</Select.Option>
                                            <Select.Option value="de">Germany</Select.Option>
                                            <Select.Option value="fr">France</Select.Option>
                                            <Select.Option value="in">India</Select.Option>
                                            <Select.Option value="other">Other</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Consumer Key">
                                        <Input.Password
                                            placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            style={{ background: isDark ? "#262626" : "#ffffff" }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Consumer Secret">
                                        <Input.Password
                                            placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            style={{ background: isDark ? "#262626" : "#ffffff" }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Enable Auto Sync">
                                        <Switch defaultChecked />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>

                    <Card
                        title="Product Sync Settings"
                        style={{
                            marginBottom: "24px",
                            background: isDark ? "#1f1f1f" : "#ffffff",
                            border: isDark ? "1px solid #303030" : "1px solid #d9d9d9",
                        }}
                        headStyle={{ color: isDark ? "#fff" : "#000" }}
                    >
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Default Tax Class">
                                        <Select
                                            placeholder="Select tax class"
                                            style={{ width: "100%", background: isDark ? "#262626" : "#ffffff" }}
                                        >
                                            <Select.Option value="standard">Standard</Select.Option>
                                            <Select.Option value="reduced-rate">Reduced Rate</Select.Option>
                                            <Select.Option value="zero-rate">Zero Rate</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Sync Product Price">
                                        <Select
                                            placeholder="Select price option"
                                            style={{ width: "100%", background: isDark ? "#262626" : "#ffffff" }}
                                        >
                                            <Select.Option value="including-tax">Including Tax</Select.Option>
                                            <Select.Option value="excluding-tax">Excluding Tax</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Default Selling Price Group">
                                        <Select
                                            placeholder="Select price group"
                                            style={{ width: "100%", background: isDark ? "#262626" : "#ffffff" }}
                                        >
                                            <Select.Option value="default">Default</Select.Option>
                                            <Select.Option value="wholesale">Wholesale</Select.Option>
                                            <Select.Option value="retail">Retail</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Sync product description as">
                                        <Select
                                            placeholder="Select description type"
                                            style={{ width: "100%", background: isDark ? "#262626" : "#ffffff" }}
                                        >
                                            <Select.Option value="short">Short Description</Select.Option>
                                            <Select.Option value="full">Full Description</Select.Option>
                                            <Select.Option value="both">Both</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24}>
                                    <Form.Item label="Product fields to be synced with woocommerce while creating products:">
                                        <Checkbox.Group style={{ width: "100%" }}>
                                            <Row>
                                                <Col span={8}>
                                                    <Checkbox value="name" defaultChecked>Product Name</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="price" defaultChecked>Price</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="category" defaultChecked>Category</Checkbox>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: "8px" }}>
                                                <Col span={8}>
                                                    <Checkbox value="quantity" defaultChecked>Quantity</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="weight">Weight</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="images" defaultChecked>Images</Checkbox>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: "8px" }}>
                                                <Col span={8}>
                                                    <Checkbox value="description" defaultChecked>Description</Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24}>
                                    <Form.Item label="Product fields to be synced with woocommerce while updating products:">
                                        <Checkbox.Group style={{ width: "100%" }}>
                                            <Row>
                                                <Col span={8}>
                                                    <Checkbox value="update-name" defaultChecked>Product Name</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="update-price" defaultChecked>Price</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="update-category" defaultChecked>Category</Checkbox>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: "8px" }}>
                                                <Col span={8}>
                                                    <Checkbox value="update-quantity" defaultChecked>Quantity</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="update-weight">Weight</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="update-images" defaultChecked>Images</Checkbox>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: "8px" }}>
                                                <Col span={8}>
                                                    <Checkbox value="update-description" defaultChecked>Description</Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>

                    <Card
                        title="Order Sync Settings"
                        style={{
                            marginBottom: "24px",
                            background: isDark ? "#1f1f1f" : "#ffffff",
                            border: isDark ? "1px solid #303030" : "1px solid #d9d9d9",
                        }}
                        headStyle={{ color: isDark ? "#fff" : "#000" }}
                    >
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col xs={24}>
                                    <Form.Item label="Order Status Mapping">
                                        <Table
                                            dataSource={[
                                                { key: '1', wooStatus: 'Pending', posStatus: '', shippingStatus: '' },
                                                { key: '2', wooStatus: 'Processing', posStatus: '', shippingStatus: '' },
                                                { key: '3', wooStatus: 'On hold', posStatus: '', shippingStatus: '' },
                                                { key: '4', wooStatus: 'Completed', posStatus: '', shippingStatus: '' },
                                                { key: '5', wooStatus: 'Cancelled', posStatus: '', shippingStatus: '' },
                                                { key: '6', wooStatus: 'Refunded', posStatus: '', shippingStatus: '' },
                                                { key: '7', wooStatus: 'Failed', posStatus: '', shippingStatus: '' },
                                                { key: '8', wooStatus: 'Shipped', posStatus: '', shippingStatus: '' },
                                            ]}
                                            columns={[
                                                {
                                                    title: 'WooCommerce order status',
                                                    dataIndex: 'wooStatus',
                                                    key: 'wooStatus',
                                                    width: '33%',
                                                },
                                                {
                                                    title: 'Equivalent POS sell status',
                                                    dataIndex: 'posStatus',
                                                    key: 'posStatus',
                                                    width: '33%',
                                                    render: () => (
                                                        <Select
                                                            placeholder="Select status"
                                                            style={{ width: "100%", background: isDark ? "#262626" : "#ffffff" }}
                                                        >
                                                            <Select.Option value="pending">Pending</Select.Option>
                                                            <Select.Option value="processing">Processing</Select.Option>
                                                            <Select.Option value="completed">Completed</Select.Option>
                                                            <Select.Option value="cancelled">Cancelled</Select.Option>
                                                        </Select>
                                                    ),
                                                },
                                                {
                                                    title: 'Equivalent shipping status',
                                                    dataIndex: 'shippingStatus',
                                                    key: 'shippingStatus',
                                                    width: '34%',
                                                    render: () => (
                                                        <Select
                                                            placeholder="Select status"
                                                            style={{ width: "100%", background: isDark ? "#262626" : "#ffffff" }}
                                                        >
                                                            <Select.Option value="pending">Pending</Select.Option>
                                                            <Select.Option value="processing">Processing</Select.Option>
                                                            <Select.Option value="shipped">Shipped</Select.Option>
                                                            <Select.Option value="delivered">Delivered</Select.Option>
                                                        </Select>
                                                    ),
                                                },
                                            ]}
                                            pagination={false}
                                            size="middle"
                                            style={{
                                                background: isDark ? "#1f1f1f" : "#ffffff",
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>

                    <Card
                        title="Webhook Settings"
                        style={{
                            marginBottom: "24px",
                            background: isDark ? "#1f1f1f" : "#ffffff",
                            border: isDark ? "1px solid #303030" : "1px solid #d9d9d9",
                        }}
                        headStyle={{ color: isDark ? "#fff" : "#000" }}
                    >
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Card
                                        size="small"
                                        title="Order Created"
                                        style={{
                                            background: isDark ? "#262626" : "#f8f9fa",
                                            border: isDark ? "1px solid #404040" : "1px solid #e9ecef",
                                        }}
                                        headStyle={{ color: isDark ? "#fff" : "#000" }}
                                    >
                                        <Form layout="vertical">
                                            <Form.Item label="Webhook Secret:">
                                                <Input.Password
                                                    value="Webhook Secret"
                                                    style={{ background: isDark ? "#1a1a1a" : "#ffffff" }}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Webhook Delivery URL:">
                                                <Input
                                                    value="https://c2z.babaerp.live/webhook/order-created/1"
                                                    style={{ background: isDark ? "#1a1a1a" : "#ffffff" }}
                                                />
                                            </Form.Item>
                                        </Form>
                                    </Card>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Card
                                        size="small"
                                        title="Order Updated"
                                        style={{
                                            background: isDark ? "#262626" : "#f8f9fa",
                                            border: isDark ? "1px solid #404040" : "1px solid #e9ecef",
                                        }}
                                        headStyle={{ color: isDark ? "#fff" : "#000" }}
                                    >
                                        <Form layout="vertical">
                                            <Form.Item label="Webhook Secret:">
                                                <Input.Password
                                                    value="Webhook Secret"
                                                    style={{ background: isDark ? "#1a1a1a" : "#ffffff" }}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Webhook Delivery URL:">
                                                <Input
                                                    value="https://c2z.babaerp.live/webhook/order-updated/1"
                                                    style={{ background: isDark ? "#1a1a1a" : "#ffffff" }}
                                                />
                                            </Form.Item>
                                        </Form>
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: "16px" }}>
                                <Col xs={24} md={12}>
                                    <Card
                                        size="small"
                                        title="Order Deleted"
                                        style={{
                                            background: isDark ? "#262626" : "#f8f9fa",
                                            border: isDark ? "1px solid #404040" : "1px solid #e9ecef",
                                        }}
                                        headStyle={{ color: isDark ? "#fff" : "#000" }}
                                    >
                                        <Form layout="vertical">
                                            <Form.Item label="Webhook Secret:">
                                                <Input.Password
                                                    value="Webhook Secret"
                                                    style={{ background: isDark ? "#1a1a1a" : "#ffffff" }}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Webhook Delivery URL:">
                                                <Input
                                                    value="https://c2z.babaerp.live/webhook/order-deleted/1"
                                                    style={{ background: isDark ? "#1a1a1a" : "#ffffff" }}
                                                />
                                            </Form.Item>
                                        </Form>
                                    </Card>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Card
                                        size="small"
                                        title="Order Restored"
                                        style={{
                                            background: isDark ? "#262626" : "#f8f9fa",
                                            border: isDark ? "1px solid #404040" : "1px solid #e9ecef",
                                        }}
                                        headStyle={{ color: isDark ? "#fff" : "#000" }}
                                    >
                                        <Form layout="vertical">
                                            <Form.Item label="Webhook Secret:">
                                                <Input.Password
                                                    value="Webhook Secret"
                                                    style={{ background: isDark ? "#1a1a1a" : "#ffffff" }}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Webhook Delivery URL:">
                                                <Input
                                                    value="https://c2z.babaerp.live/webhook/order-restored/1"
                                                    style={{ background: isDark ? "#1a1a1a" : "#ffffff" }}
                                                />
                                            </Form.Item>
                                        </Form>
                                    </Card>
                                </Col>
                            </Row>
                        </Form>
                    </Card>

                    <Text strong style={{ color: isDark ? "#ffffff" : "#000000" }}>WooCommerce module version - <span style={{ color: "#f5222d" }}>4.8</span></Text>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default WoocommercePage;