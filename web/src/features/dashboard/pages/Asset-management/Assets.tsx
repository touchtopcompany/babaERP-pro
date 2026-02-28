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
    Checkbox,
    Dropdown,
    Modal,
    Form,
    Upload,
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
    UploadOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;
const { TextArea } = Input;

interface Warranty {
    id: string;
    startDate: string;
    warrantyMonths: number;
    additionalCost: number;
    additionalNotes: string;
}

interface Asset {
    id: string;
    assetCode: string;
    assetName: string;
    quantity: number;
    warranty: string;
    isAllocatable: boolean;
    purchaseDate: string;
    allocatedQuantity: number;
    unitPrice: number;
    seriesModel: string;
    image?: string;
    businessLocation: string;
    assetCategory: string;
    description: string;
    warranties?: Warranty[];
}

const Assets: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [assets, setAssets] = useState<Asset[]>([
        {
            id: "1",
            assetCode: "AST001",
            assetName: "Laptop Dell XPS 15",
            quantity: 5,
            warranty: "2025-12-31",
            isAllocatable: true,
            purchaseDate: "2023-01-15",
            allocatedQuantity: 3,
            unitPrice: 1299.99,
            seriesModel: "XPS 9530",
            image: "",
            businessLocation: "Head Office",
            assetCategory: "Electronics",
            description: "High-performance laptop for development team",
            warranties: [
                {
                    id: "w1",
                    startDate: "2023-01-15",
                    warrantyMonths: 36,
                    additionalCost: 199.99,
                    additionalNotes: "Extended warranty for hardware coverage"
                }
            ]
        },
        {
            id: "2",
            assetCode: "AST002",
            assetName: "Office Chair Ergonomic",
            quantity: 20,
            warranty: "2024-06-30",
            isAllocatable: true,
            purchaseDate: "2022-05-10",
            allocatedQuantity: 15,
            unitPrice: 299.99,
            seriesModel: "EC-100",
            image: "",
            businessLocation: "Branch Office A",
            assetCategory: "Furniture",
            description: "Ergonomic office chairs with lumbar support",
            warranties: [
                {
                    id: "w2",
                    startDate: "2022-05-10",
                    warrantyMonths: 24,
                    additionalCost: 49.99,
                    additionalNotes: "Standard manufacturer warranty"
                }
            ]
        },
        {
            id: "3",
            assetCode: "AST003",
            assetName: "Company Vehicle Toyota Camry",
            quantity: 2,
            warranty: "2025-03-15",
            isAllocatable: false,
            purchaseDate: "2023-02-20",
            allocatedQuantity: 0,
            unitPrice: 25000.00,
            seriesModel: "Camry LE 2023",
            image: "",
            businessLocation: "Head Office",
            assetCategory: "Vehicles",
            description: "Company vehicles for business travel",
            warranties: [
                {
                    id: "w3",
                    startDate: "2023-02-20",
                    warrantyMonths: 48,
                    additionalCost: 2499.99,
                    additionalNotes: "Comprehensive vehicle warranty with roadside assistance"
                }
            ]
        }
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Filter states
    const [businessLocation, setBusinessLocation] = useState<string>("");
    const [assetCategory, setAssetCategory] = useState<string>("");
    const [purchaseType, setPurchaseType] = useState<string>("");
    const [isAllocatable, setIsAllocatable] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    // Mock data for dropdowns
    const businessLocations = ["Head Office", "Branch Office A", "Branch Office B", "Warehouse"];
    const assetCategories = ["Electronics", "Furniture", "Vehicles", "Machinery", "Office Supplies"];
    const purchaseTypes = ["New", "Used", "Leased", "Rented"];

    const handleAddAsset = () => {
        setEditingAsset(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditAsset = (asset: Asset) => {
        setEditingAsset(asset);
        form.setFieldsValue({
            ...asset,
            purchaseDate: asset.purchaseDate ? dayjs(asset.purchaseDate) : null,
            warranty: asset.warranty ? dayjs(asset.warranty) : null,
            warranties: asset.warranties || [],
        });
        setIsModalVisible(true);
    };

    const handleDeleteAsset = (asset: Asset) => {
        Modal.confirm({
            title: "Delete Asset",
            content: `Are you sure you want to delete "${asset.assetName}"?`,
            onOk: () => {
                setAssets(assets.filter(a => a.id !== asset.id));
                message.success("Asset deleted successfully");
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            const newAsset: Asset = {
                id: editingAsset ? editingAsset.id : Date.now().toString(),
                ...values,
                purchaseDate: values.purchaseDate ? values.purchaseDate.format("YYYY-MM-DD") : "",
                warranty: values.warranty ? values.warranty.format("YYYY-MM-DD") : "",
                warranties: values.warranties || [],
                isAllocatable: values.isAllocatable || false,
            };

            if (editingAsset) {
                setAssets(assets.map(a => a.id === editingAsset.id ? newAsset : a));
                message.success("Asset updated successfully");
            } else {
                setAssets([...assets, newAsset]);
                message.success("Asset added successfully");
            }

            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const getWarrantyStatusColor = (warranty: string) => {
        if (!warranty) return "default";
        const warrantyDate = dayjs(warranty);
        const now = dayjs();
        const diffMonths = warrantyDate.diff(now, "month");

        if (diffMonths < 0) return "error";
        if (diffMonths <= 1) return "warning";
        return "success";
    };

    const getWarrantyStatusText = (warranty: string) => {
        if (!warranty) return "No Warranty";
        const warrantyDate = dayjs(warranty);
        const now = dayjs();
        const diffMonths = warrantyDate.diff(now, "month");

        if (diffMonths < 0) return "Expired";
        if (diffMonths <= 1) return "Expiring Soon";
        return "Valid";
    };

    // Filter assets based on filters
    const filteredAssets = assets.filter(asset => {
        if (businessLocation && asset.businessLocation !== businessLocation) return false;
        if (assetCategory && asset.assetCategory !== assetCategory) return false;
        if (purchaseType && asset.seriesModel !== purchaseType) return false;
        if (isAllocatable && !asset.isAllocatable) return false;
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            return (
                asset.assetCode.toLowerCase().includes(searchLower) ||
                asset.assetName.toLowerCase().includes(searchLower) ||
                asset.description.toLowerCase().includes(searchLower)
            );
        }
        return true;
    });

    const columns = [
        {
            title: "Action",
            key: "action",
            width: 80,
            render: (_: any, record: Asset) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => console.log("View asset", record)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEditAsset(record)}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        onClick={() => handleDeleteAsset(record)}
                    />
                </Space>
            ),
        },
        {
            title: "Asset code",
            dataIndex: "assetCode",
            key: "assetCode",
            sorter: (a: Asset, b: Asset) => a.assetCode.localeCompare(b.assetCode),
        },
        {
            title: "Asset name",
            dataIndex: "assetName",
            key: "assetName",
            sorter: (a: Asset, b: Asset) => a.assetName.localeCompare(b.assetName),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            sorter: (a: Asset, b: Asset) => a.quantity - b.quantity,
            render: (value: number) => <Text strong>{value}</Text>,
        },
        {
            title: "Warranty",
            dataIndex: "warranty",
            key: "warranty",
            render: (warranty: string) => (
                <Tag color={getWarrantyStatusColor(warranty)}>
                    {getWarrantyStatusText(warranty)}
                </Tag>
            ),
        },
        {
            title: "Is allocatable?",
            dataIndex: "isAllocatable",
            key: "isAllocatable",
            render: (isAllocatable: boolean) => (
                <Tag color={isAllocatable ? "success" : "default"}>
                    {isAllocatable ? "Yes" : "No"}
                </Tag>
            ),
        },
        {
            title: "Purchase Date",
            dataIndex: "purchaseDate",
            key: "purchaseDate",
            render: (date: string) => date ? dayjs(date).format("MM/DD/YYYY") : "-",
        },
        {
            title: "Allocated quantity",
            dataIndex: "allocatedQuantity",
            key: "allocatedQuantity",
            render: (value: number) => <Text>{value}</Text>,
        },
        {
            title: "Unit Price",
            dataIndex: "unitPrice",
            key: "unitPrice",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "Series/Model",
            dataIndex: "seriesModel",
            key: "seriesModel",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image: string) =>
                image ? (
                    <img src={image} alt="Asset" style={{ width: 40, height: 40, objectFit: "cover" }} />
                ) : (
                    <Text type="secondary">No Image</Text>
                ),
        },
        {
            title: "Business Location",
            dataIndex: "businessLocation",
            key: "businessLocation",
        },
        {
            title: "Asset category",
            dataIndex: "assetCategory",
            key: "assetCategory",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
        },
    ];

    const exportMenuItems = [
        {
            key: "csv",
            label: "Export to CSV",
            icon: <FileTextOutlined />,
            onClick: () => console.log("Export to CSV"),
        },
        {
            key: "excel",
            label: "Export to Excel",
            icon: <FileExcelOutlined />,
            onClick: () => console.log("Export to Excel"),
        },
        {
            key: "pdf",
            label: "Export to PDF",
            icon: <FilePdfOutlined />,
            onClick: () => console.log("Export to PDF"),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            {/* Header */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={12} md={16}>
                    <Title
                        level={2}
                        style={{
                            margin: 0,
                            color: isDark ? "#fff" : "#1f1f1f",
                            fontWeight: 600,
                        }}
                    >
                        All assets
                    </Title>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddAsset}
                        >
                            Add
                        </Button>
                    </Space>
                </Col>
            </Row>

            {/* Filters */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                    marginBottom: "24px",
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
                        Filters
                    </Title>
                }
                styles={{ body: { padding: "16px" } }}
            >
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={6}>
                        <Text strong style={{ marginBottom: "8px", display: "block" }}>
                            Business Location
                        </Text>
                        <Select
                            placeholder="Select business location"
                            style={{ width: "100%" }}
                            value={businessLocation}
                            onChange={setBusinessLocation}
                            allowClear
                        >
                            {businessLocations.map(location => (
                                <Select.Option key={location} value={location}>
                                    {location}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Text strong style={{ marginBottom: "8px", display: "block" }}>
                            Asset Category
                        </Text>
                        <Select
                            placeholder="Select asset category"
                            style={{ width: "100%" }}
                            value={assetCategory}
                            onChange={setAssetCategory}
                            allowClear
                        >
                            {assetCategories.map(category => (
                                <Select.Option key={category} value={category}>
                                    {category}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Text strong style={{ marginBottom: "8px", display: "block" }}>
                            Purchase Type
                        </Text>
                        <Select
                            placeholder="Select purchase type"
                            style={{ width: "100%" }}
                            value={purchaseType}
                            onChange={setPurchaseType}
                            allowClear
                        >
                            {purchaseTypes.map(type => (
                                <Select.Option key={type} value={type}>
                                    {type}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Text strong style={{ marginBottom: "8px", display: "block" }}>
                            Allocation Status
                        </Text>
                        <Checkbox
                            checked={isAllocatable}
                            onChange={(e) => setIsAllocatable(e.target.checked)}
                        >
                            Is allocatable?
                        </Checkbox>
                    </Col>
                </Row>
            </Card>

            {/* Table Controls */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                }}
                styles={{ body: { padding: "16px" } }}
            >
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                    <Col xs={24} sm={12} md={8}>
                        <Space>
                            <span>Show</span>
                            <Select defaultValue="25" style={{ width: 80 }}>
                                <Select.Option value="25">25</Select.Option>
                                <Select.Option value="50">50</Select.Option>
                                <Select.Option value="100">100</Select.Option>
                            </Select>
                            <span>entries</span>
                        </Space>
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                            <Dropdown
                                menu={{ items: exportMenuItems }}
                                trigger={["click"]}
                            >
                                <Button icon={<ExportOutlined />}>
                                    Export
                                </Button>
                            </Dropdown>
                            <Button icon={<PrinterOutlined />}>
                                Print
                            </Button>
                            <Search
                                placeholder="Search assets..."
                                style={{ width: 250 }}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                prefix={<SearchOutlined />}
                            />
                        </Space>
                    </Col>
                </Row>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={filteredAssets}
                    rowKey="id"
                    rowSelection={rowSelection}
                    pagination={{
                        total: filteredAssets.length,
                        pageSize: 25,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    }}
                    scroll={{ x: 1500 }}
                    style={{ marginTop: "16px" }}
                />
            </Card>

            {/* Add/Edit Asset Modal */}
            <Modal
                title={editingAsset ? "Edit Asset" : "Add New Asset"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={800}
                okText={editingAsset ? "Update" : "Add"}
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: "20px" }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="assetCode"
                                label="Asset Code"
                                rules={[{ required: true, message: "Please enter asset code" }]}
                            >
                                <Input placeholder="Enter asset code" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="assetName"
                                label="Asset Name"
                                rules={[{ required: true, message: "Please enter asset name" }]}
                            >
                                <Input placeholder="Enter asset name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[{ required: true, message: "Please enter quantity" }]}
                            >
                                <InputNumber
                                    min={1}
                                    style={{ width: "100%" }}
                                    placeholder="Enter quantity"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="unitPrice"
                                label="Unit Price"
                                rules={[{ required: true, message: "Please enter unit price" }]}
                            >
                                <InputNumber
                                    min={0}
                                    precision={2}
                                    style={{ width: "100%" }}
                                    placeholder="Enter unit price"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="allocatedQuantity"
                                label="Allocated Quantity"
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: "100%" }}
                                    placeholder="Enter allocated quantity"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="purchaseDate"
                                label="Purchase Date"
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder="Select purchase date"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="warranty"
                                label="Warranty Expiry Date"
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder="Select warranty expiry date"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="isAllocatable"
                                valuePropName="checked"
                            >
                                <Checkbox>Is Allocatable</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="businessLocation"
                                label="Business Location"
                                rules={[{ required: true, message: "Please select business location" }]}
                            >
                                <Select placeholder="Select business location">
                                    {businessLocations.map(location => (
                                        <Select.Option key={location} value={location}>
                                            {location}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="assetCategory"
                                label="Asset Category"
                                rules={[{ required: true, message: "Please select asset category" }]}
                            >
                                <Select placeholder="Select asset category">
                                    {assetCategories.map(category => (
                                        <Select.Option key={category} value={category}>
                                            {category}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="seriesModel"
                                label="Series/Model"
                            >
                                <Input placeholder="Enter series/model" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Enter asset description"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Warranties Section */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Title
                                level={5}
                                style={{
                                    marginBottom: "16px",
                                    color: isDark ? "#fff" : "#1f1f1f",
                                    fontWeight: 600,
                                }}
                            >
                                Warranties
                            </Title>
                            <Form.List name="warranties">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Card
                                                key={key}
                                                style={{
                                                    background: isDark ? "rgba(255,255,255,0.05)" : "#fafafa",
                                                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                                    borderRadius: "6px",
                                                    marginBottom: "16px",
                                                }}
                                                size="small"
                                            >
                                                <Row gutter={[12, 12]}>
                                                    <Col xs={24} sm={12} md={6}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "startDate"]}
                                                            label="Start Date"
                                                            rules={[{ required: true, message: "Please select start date" }]}
                                                        >
                                                            <DatePicker
                                                                style={{ width: "100%" }}
                                                                placeholder="Select start date"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={12} md={6}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "warrantyMonths"]}
                                                            label="Warranty Months"
                                                            rules={[{ required: true, message: "Please enter warranty months" }]}
                                                        >
                                                            <InputNumber
                                                                min={1}
                                                                style={{ width: "100%" }}
                                                                placeholder="Enter months"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={12} md={6}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "additionalCost"]}
                                                            label="Additional Cost"
                                                        >
                                                            <InputNumber
                                                                min={0}
                                                                precision={2}
                                                                style={{ width: "100%" }}
                                                                placeholder="Enter cost"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={12} md={6}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "additionalNotes"]}
                                                            label="Additional Notes"
                                                        >
                                                            <Input
                                                                placeholder="Enter notes"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Button
                                                    type="text"
                                                    danger
                                                    onClick={() => remove(name)}
                                                    style={{ marginTop: "8px" }}
                                                >
                                                    Remove
                                                </Button>
                                            </Card>
                                        ))}
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: "100%" }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add More
                                        </Button>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Form.Item
                                name="image"
                                label="Asset Image"
                            >
                                <Upload
                                    listType="picture-card"
                                    beforeUpload={() => false}
                                    maxCount={1}
                                >
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Assets;
