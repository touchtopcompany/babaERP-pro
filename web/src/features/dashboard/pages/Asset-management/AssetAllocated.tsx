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
    Table,
    Tag,
    Dropdown,
    Modal,
    Form,
    DatePicker,
    InputNumber,
    message,
} from "antd";
import {
    PlusOutlined,
    SearchOutlined,
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
const { TextArea } = Input;

interface AssetAllocation {
    id: string;
    allocationCode: string;
    allocatedTo: string;
    assetName: string;
    seriesModel: string;
    quantity: number;
    revokedQty: number;
    allocatedFrom: string;
    allocatedUpto: string;
    allocatedBy: string;
    assetCategory: string;
    reason: string;
}

const AssetAllocated: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [allocations, setAllocations] = useState<AssetAllocation[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAllocation, setEditingAllocation] = useState<AssetAllocation | null>(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [assetCategory, setAssetCategory] = useState("");
    const [allocatedTo, setAllocatedTo] = useState("");

    const handleAddAllocation = () => {
        setEditingAllocation(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleEditAllocation = (record: AssetAllocation) => {
        setEditingAllocation(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            allocatedFrom: dayjs(record.allocatedFrom),
            allocatedUpto: dayjs(record.allocatedUpto),
        });
    };

    const handleDeleteAllocation = (record: AssetAllocation) => {
        Modal.confirm({
            title: "Are you sure you want to delete this allocation?",
            content: `Allocation Code: ${record.allocationCode}`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                setAllocations(allocations.filter(a => a.id !== record.id));
                message.success("Allocation deleted successfully");
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            const newAllocation: AssetAllocation = {
                id: editingAllocation ? editingAllocation.id : Date.now().toString(),
                allocationCode: values.allocationCode || `ALLOC${Date.now()}`,
                allocatedTo: values.allocatedTo,
                assetName: values.assetName,
                seriesModel: values.seriesModel,
                quantity: values.quantity,
                revokedQty: values.revokedQty || 0,
                allocatedFrom: values.allocatedFrom.format("YYYY-MM-DD"),
                allocatedUpto: values.allocatedUpto.format("YYYY-MM-DD"),
                allocatedBy: values.allocatedBy,
                assetCategory: values.assetCategory,
                reason: values.reason,
            };

            if (editingAllocation) {
                setAllocations(allocations.map(a => a.id === editingAllocation.id ? newAllocation : a));
                message.success("Allocation updated successfully");
            } else {
                setAllocations([...allocations, newAllocation]);
                message.success("Allocation added successfully");
            }

            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    // Filter allocations based on filters
    const filteredAllocations = allocations.filter(allocation => {
        if (assetCategory && allocation.assetCategory !== assetCategory) return false;
        if (allocatedTo && allocation.allocatedTo !== allocatedTo) return false;
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            return (
                allocation.allocationCode.toLowerCase().includes(searchLower) ||
                allocation.assetName.toLowerCase().includes(searchLower) ||
                allocation.allocatedTo.toLowerCase().includes(searchLower)
            );
        }
        return true;
    });

    const columns = [
        {
            title: "Action",
            key: "action",
            width: 120,
            render: (_: any, record: AssetAllocation) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => console.log("View allocation", record)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEditAllocation(record)}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        onClick={() => handleDeleteAllocation(record)}
                    />
                </Space>
            ),
        },
        {
            title: "Allocation code",
            dataIndex: "allocationCode",
            key: "allocationCode",
            sorter: (a: AssetAllocation, b: AssetAllocation) => a.allocationCode.localeCompare(b.allocationCode),
        },
        {
            title: "Allocated to",
            dataIndex: "allocatedTo",
            key: "allocatedTo",
        },
        {
            title: "Asset name",
            dataIndex: "assetName",
            key: "assetName",
        },
        {
            title: "Series/Model",
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
            title: "Revoked qty",
            dataIndex: "revokedQty",
            key: "revokedQty",
            render: (value: number) => <Text type="danger">{value}</Text>,
        },
        {
            title: "Allocated from",
            dataIndex: "allocatedFrom",
            key: "allocatedFrom",
            render: (date: string) => dayjs(date).format("MM/DD/YYYY"),
        },
        {
            title: "Allocated upto",
            dataIndex: "allocatedUpto",
            key: "allocatedUpto",
            render: (date: string) => dayjs(date).format("MM/DD/YYYY"),
        },
        {
            title: "Allocated by",
            dataIndex: "allocatedBy",
            key: "allocatedBy",
        },
        {
            title: "Asset category",
            dataIndex: "assetCategory",
            key: "assetCategory",
            render: (category: string) => (
                <Tag color="blue">{category}</Tag>
            ),
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            ellipsis: true,
        },
    ];

    const exportMenuItems = [
        {
            key: "csv",
            label: "Export to CSV",
            icon: <FileTextOutlined />,
            onClick: () => message.info("Export to CSV functionality"),
        },
        {
            key: "excel",
            label: "Export to Excel",
            icon: <FileExcelOutlined />,
            onClick: () => message.info("Export to Excel functionality"),
        },
        {
            key: "pdf",
            label: "Export to PDF",
            icon: <FilePdfOutlined />,
            onClick: () => message.info("Export to PDF functionality"),
        },
        {
            key: "print",
            label: "Print",
            icon: <PrinterOutlined />,
            onClick: () => message.info("Print functionality"),
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
                        Asset Allocated
                    </Title>
                </Col>
            </Row>

            {/* Table Controls */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                    marginBottom: "16px",
                }}
                styles={{ body: { padding: "16px 24px" } }}
            >
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={8}>
                        <Search
                            placeholder="Search allocations..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            prefix={<SearchOutlined />}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                            <Select
                                defaultValue="25"
                                style={{ width: 120 }}
                                options={[
                                    { value: "10", label: "Show 10" },
                                    { value: "25", label: "Show 25" },
                                    { value: "50", label: "Show 50" },
                                    { value: "100", label: "Show 100" },
                                ]}
                            />
                            <Dropdown
                                menu={{ items: exportMenuItems }}
                                placement="bottomRight"
                            >
                                <Button icon={<ExportOutlined />}>
                                    Export
                                </Button>
                            </Dropdown>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleAddAllocation}
                            >
                                Add
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            {/* Table */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                }}
                styles={{ body: { padding: 0 } }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredAllocations}
                    rowKey="id"
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            {/* Add/Edit Modal */}
            <Modal
                title={editingAllocation ? "Edit Asset Allocation" : "Add Asset Allocation"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={600}
                okText={editingAllocation ? "Update" : "Add"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: "20px" }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="allocationCode"
                                label="Allocation Code"
                                rules={[{ required: true, message: "Please enter allocation code" }]}
                            >
                                <Input placeholder="Enter allocation code" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="allocatedTo"
                                label="Allocated To"
                                rules={[{ required: true, message: "Please select person" }]}
                            >
                                <Select placeholder="Select person">
                                    <Select.Option value="John Doe">John Doe</Select.Option>
                                    <Select.Option value="Jane Smith">Jane Smith</Select.Option>
                                    <Select.Option value="Mike Johnson">Mike Johnson</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="assetName"
                                label="Asset Name"
                                rules={[{ required: true, message: "Please enter asset name" }]}
                            >
                                <Input placeholder="Enter asset name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="seriesModel"
                                label="Series/Model"
                            >
                                <Input placeholder="Enter series/model" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[{ required: true, message: "Please enter quantity" }]}
                            >
                                <InputNumber
                                    min={1}
                                    placeholder="Quantity"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="revokedQty"
                                label="Revoked Quantity"
                            >
                                <InputNumber
                                    min={0}
                                    placeholder="Revoked qty"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="assetCategory"
                                label="Asset Category"
                                rules={[{ required: true, message: "Please select category" }]}
                            >
                                <Select placeholder="Select category">
                                    <Select.Option value="Electronics">Electronics</Select.Option>
                                    <Select.Option value="Furniture">Furniture</Select.Option>
                                    <Select.Option value="Vehicles">Vehicles</Select.Option>
                                    <Select.Option value="Equipment">Equipment</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="allocatedFrom"
                                label="Allocated From"
                                rules={[{ required: true, message: "Please select date" }]}
                            >
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="allocatedUpto"
                                label="Allocated Upto"
                                rules={[{ required: true, message: "Please select date" }]}
                            >
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="allocatedBy"
                                label="Allocated By"
                                rules={[{ required: true, message: "Please enter name" }]}
                            >
                                <Input placeholder="Enter allocated by" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="reason"
                                label="Reason"
                            >
                                <Input placeholder="Enter reason" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default AssetAllocated;