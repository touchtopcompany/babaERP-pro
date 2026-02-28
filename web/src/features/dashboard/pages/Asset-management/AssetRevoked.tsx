import React, { useState } from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Row,
    Col,
    Select,
    Input,
    InputNumber,
    Table,
    Tag,
    Dropdown,
    Modal,
    Form,
    DatePicker,
    message,
} from "antd";
import {
    PlusOutlined,
    ExportOutlined,
    PrinterOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

interface AssetRevocation {
    id: string;
    revokeCode: string;
    revokedFor: string;
    allocationCode: string;
    assetName: string;
    seriesModel: string;
    quantity: number;
    revokedAt: string;
    revokedBy: string;
    assetCategory: string;
    reason: string;
}

const AssetRevoked: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [revocations, setRevocations] = useState<AssetRevocation[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRevocation, setEditingRevocation] = useState<AssetRevocation | null>(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [assetCategory, setAssetCategory] = useState("");
    const [revokedFor, setRevokedFor] = useState("");

    const handleAddRevocation = () => {
        setEditingRevocation(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleEditRevocation = (record: AssetRevocation) => {
        setEditingRevocation(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            revokedAt: dayjs(record.revokedAt),
        });
    };

    const handleDeleteRevocation = (record: AssetRevocation) => {
        Modal.confirm({
            title: "Are you sure you want to delete this revocation?",
            content: `Revoke Code: ${record.revokeCode}`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                setRevocations(revocations.filter(r => r.id !== record.id));
                message.success("Revocation deleted successfully");
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            const newRevocation: AssetRevocation = {
                id: editingRevocation ? editingRevocation.id : Date.now().toString(),
                revokeCode: values.revokeCode || `REVOKE${Date.now()}`,
                revokedFor: values.revokedFor,
                allocationCode: values.allocationCode,
                assetName: values.assetName,
                seriesModel: values.seriesModel,
                quantity: values.quantity,
                revokedAt: values.revokedAt.format("YYYY-MM-DD"),
                revokedBy: values.revokedBy,
                assetCategory: values.assetCategory,
                reason: values.reason,
            };

            if (editingRevocation) {
                setRevocations(revocations.map(r => r.id === editingRevocation.id ? newRevocation : r));
                message.success("Revocation updated successfully");
            } else {
                setRevocations([...revocations, newRevocation]);
                message.success("Revocation added successfully");
            }

            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    // Filter revocations based on filters
    const filteredRevocations = revocations.filter(revocation => {
        if (assetCategory && revocation.assetCategory !== assetCategory) return false;
        if (revokedFor && revocation.revokedFor !== revokedFor) return false;
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            return (
                revocation.revokeCode.toLowerCase().includes(searchLower) ||
                revocation.assetName.toLowerCase().includes(searchLower) ||
                revocation.revokedFor.toLowerCase().includes(searchLower) ||
                revocation.allocationCode.toLowerCase().includes(searchLower)
            );
        }
        return true;
    });

    const columns = [
        {
            title: "Action",
            key: "action",
            width: 120,
            render: (_: any, record: AssetRevocation) => (
                <Space size="small">
                    <Button
                        type="link"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => console.log("View revocation:", record)}
                    />
                    <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEditRevocation(record)}
                    />
                    <Button
                        type="link"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteRevocation(record)}
                    />
                </Space>
            ),
        },
        {
            title: "Revoke code",
            dataIndex: "revokeCode",
            key: "revokeCode",
            render: (text: string) => <Text strong>{text}</Text>,
        },
        {
            title: "Revoked for",
            dataIndex: "revokedFor",
            key: "revokedFor",
        },
        {
            title: "Allocation code",
            dataIndex: "allocationCode",
            key: "allocationCode",
        },
        {
            title: "Asset name",
            dataIndex: "assetName",
            key: "assetName",
        },
        {
            title: "Series Model",
            dataIndex: "seriesModel",
            key: "seriesModel",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (value: number) => <Text strong>{value}</Text>,
        },
        {
            title: "Revoked at",
            dataIndex: "revokedAt",
            key: "revokedAt",
            render: (date: string) => dayjs(date).format("MM/DD/YYYY"),
        },
        {
            title: "Revoked by",
            dataIndex: "revokedBy",
            key: "revokedBy",
        },
        {
            title: "Asset category",
            dataIndex: "assetCategory",
            key: "assetCategory",
            render: (category: string) => (
                <Tag color={isDark ? "blue" : "default"}>{category}</Tag>
            ),
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            render: (reason: string) => (
                <Text ellipsis={{ tooltip: reason }} style={{ maxWidth: 200 }}>
                    {reason}
                </Text>
            ),
        },
    ];

    const exportMenuItems = [
        {
            key: "csv",
            label: (
                <Space>
                    <FileTextOutlined />
                    Export as CSV
                </Space>
            ),
            onClick: () => console.log("Export as CSV"),
        },
        {
            key: "excel",
            label: (
                <Space>
                    <FileExcelOutlined />
                    Export as Excel
                </Space>
            ),
            onClick: () => console.log("Export as Excel"),
        },
        {
            key: "pdf",
            label: (
                <Space>
                    <FilePdfOutlined />
                    Export as PDF
                </Space>
            ),
            onClick: () => console.log("Export as PDF"),
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
                        Asset Revoked
                    </Title>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddRevocation}
                        >
                            Add Revocation
                        </Button>
                        <Dropdown menu={{ items: exportMenuItems }} placement="bottomRight">
                            <Button icon={<ExportOutlined />}>
                                Export
                            </Button>
                        </Dropdown>
                        <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
                            Print
                        </Button>
                    </Space>
                </Col>
            </Row>

            {/* Filters Section */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                    marginBottom: "24px",
                }}
                styles={{ body: { padding: "16px 24px" } }}
            >
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={6}>
                        <Search
                            placeholder="Search revocations..."
                            allowClear
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Asset Category"
                            allowClear
                            value={assetCategory || undefined}
                            onChange={setAssetCategory}
                            style={{ width: "100%" }}
                            options={[
                                { value: "Electronics", label: "Electronics" },
                                { value: "Furniture", label: "Furniture" },
                                { value: "Vehicles", label: "Vehicles" },
                                { value: "Machinery", label: "Machinery" },
                            ]}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Revoked For"
                            allowClear
                            value={revokedFor || undefined}
                            onChange={setRevokedFor}
                            style={{ width: "100%" }}
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                { value: "John Doe", label: "John Doe" },
                                { value: "Jane Smith", label: "Jane Smith" },
                                { value: "Bob Johnson", label: "Bob Johnson" },
                            ]}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Button onClick={() => {
                            setSearchText("");
                            setAssetCategory("");
                            setRevokedFor("");
                        }}>
                            Reset Filters
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* Table Section */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                }}
                styles={{ body: { padding: "0" } }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredRevocations}
                    rowKey="id"
                    pagination={{
                        total: filteredRevocations.length,
                        pageSize: 25,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                        pageSizeOptions: ["25", "50", "100"],
                    }}
                    scroll={{ x: 1200 }}
                    size="small"
                />
            </Card>

            {/* Add/Edit Modal */}
            <Modal
                title={editingRevocation ? "Edit Revocation" : "Add Revocation"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={600}
                okText="Save"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: "20px" }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="revokeCode"
                                label="Revoke Code"
                                initialValue={`REVOKE${Date.now()}`}
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="allocationCode"
                                label="Allocation Code"
                                rules={[{ required: true, message: "Please input allocation code!" }]}
                            >
                                <Input placeholder="e.g., ALLOC123" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="revokedFor"
                                label="Revoked For"
                                rules={[{ required: true, message: "Please input revoked for!" }]}
                            >
                                <Input placeholder="e.g., John Doe" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="revokedBy"
                                label="Revoked By"
                                rules={[{ required: true, message: "Please input revoked by!" }]}
                            >
                                <Input placeholder="e.g., Admin" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="assetName"
                                label="Asset Name"
                                rules={[{ required: true, message: "Please input asset name!" }]}
                            >
                                <Input placeholder="e.g., Laptop" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="seriesModel"
                                label="Series Model"
                            >
                                <Input placeholder="e.g., Dell XPS 15" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[{ required: true, message: "Please input quantity!" }]}
                            >
                                <InputNumber
                                    min={1}
                                    placeholder="1"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="assetCategory"
                                label="Asset Category"
                                rules={[{ required: true, message: "Please select asset category!" }]}
                            >
                                <Select placeholder="Select category">
                                    <Select.Option value="Electronics">Electronics</Select.Option>
                                    <Select.Option value="Furniture">Furniture</Select.Option>
                                    <Select.Option value="Vehicles">Vehicles</Select.Option>
                                    <Select.Option value="Machinery">Machinery</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="revokedAt"
                                label="Revoked At"
                                rules={[{ required: true, message: "Please select revoked date!" }]}
                            >
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="reason"
                        label="Reason"
                        rules={[{ required: true, message: "Please input reason!" }]}
                    >
                        <Input.TextArea rows={3} placeholder="Reason for revocation..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AssetRevoked;