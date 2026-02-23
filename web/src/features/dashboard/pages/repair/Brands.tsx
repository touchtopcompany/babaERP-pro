import React, { useState, useMemo } from "react";
import {
    Card,
    Table,
    Button,
    Input,
    Space,
    Typography,
    message,
    Row,
    Col,
    Dropdown,
    Checkbox,
    Modal,
    Form,
    Select,
} from "antd";
import type { MenuProps } from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    PrinterOutlined,
    UnorderedListOutlined,
    DownOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;
const { Search } = Input;

export interface BrandData {
    key: string;
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    status: "active" | "inactive";
}

const Brands: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [searchText, setSearchText] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedBrand, setSelectedBrand] = useState<BrandData | null>(null);
    const [loading, setLoading] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
        action: true,
        name: true,
        description: true,
        status: true,
        createdAt: true,
    });

    // Mock data - replace with API call
    const defaultBrands: BrandData[] = [
        {
            key: "1",
            id: "BR001",
            name: "ALCATEL",
            description: "Mobile devices and telecommunications equipment",
            createdAt: "2024-01-20",
            status: "active",
        },
        {
            key: "2",
            id: "BR002",
            name: "AQUOS",
            description: "Sharp electronics and displays",
            createdAt: "2024-01-19",
            status: "active",
        },
        {
            key: "3",
            id: "BR003",
            name: "BENZINE",
            description: "Automotive electronics",
            createdAt: "2024-01-18",
            status: "active",
        },
        {
            key: "4",
            id: "BR004",
            name: "BLACK VIEW",
            description: "Rugged mobile devices",
            createdAt: "2024-01-17",
            status: "active",
        },
        {
            key: "5",
            id: "BR005",
            name: "BONTEL",
            description: "Budget mobile devices",
            createdAt: "2024-01-16",
            status: "inactive",
        },
    ];

    const [brands, setBrands] = useState<BrandData[]>(defaultBrands);

    const filteredBrands = useMemo(() => {
        return brands.filter(brand =>
            brand.name.toLowerCase().includes(searchText.toLowerCase()) ||
            brand.description?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [brands, searchText]);

    const handleEdit = (brand: BrandData) => {
        setSelectedBrand(brand);
        form.setFieldsValue(brand);
        setEditModalOpen(true);
    };

    const handleDelete = (brand: BrandData) => {
        setSelectedBrand(brand);
        setDeleteModalOpen(true);
    };

    const handleAdd = () => {
        form.resetFields();
        setAddModalOpen(true);
    };

    const handleEditSubmit = async (values: any) => {
        try {
            setLoading(true);
            // API call to update brand
            setBrands(prev => prev.map(brand =>
                brand.id === selectedBrand?.id
                    ? { ...brand, ...values }
                    : brand
            ));
            message.success("Brand updated successfully");
            setEditModalOpen(false);
        } catch (error) {
            message.error("Failed to update brand");
        } finally {
            setLoading(false);
        }
    };

    const handleAddSubmit = async (values: any) => {
        try {
            setLoading(true);
            // API call to add brand
            const newBrand: BrandData = {
                key: String(brands.length + 1),
                id: `BR${String(brands.length + 1).padStart(3, '0')}`,
                ...values,
                createdAt: new Date().toISOString().split('T')[0],
                status: "active",
            };
            setBrands(prev => [...prev, newBrand]);
            message.success("Brand added successfully");
            setAddModalOpen(false);
        } catch (error) {
            message.error("Failed to add brand");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            setLoading(true);
            // API call to delete brand
            setBrands(prev => prev.filter(brand => brand.id !== selectedBrand?.id));
            message.success("Brand deleted successfully");
            setDeleteModalOpen(false);
        } catch (error) {
            message.error("Failed to delete brand");
        } finally {
            setLoading(false);
        }
    };

    const exportMenuItems: MenuProps['items'] = [
        {
            key: 'csv',
            label: 'Export to CSV',
            icon: <FileExcelOutlined />,
        },
        {
            key: 'excel',
            label: 'Export to Excel',
            icon: <FileExcelOutlined />,
        },
        {
            key: 'pdf',
            label: 'Export to PDF',
            icon: <FilePdfOutlined />,
        },
        {
            key: 'print',
            label: 'Print',
            icon: <PrinterOutlined />,
        },
    ];

    const columns: ColumnsType<BrandData> = [
        {
            title: "Action",
            key: "action",
            width: 120,
            fixed: "left",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a" }}
                    />
                    <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                        danger
                        style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f" }}
                    />
                </Space>
            ),
        },
        {
            title: "Brand Name",
            dataIndex: "name",
            key: "name",
            width: 200,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 300,
            sorter: (a, b) => (a.description || "").localeCompare(b.description || ""),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 120,
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (status: string) => (
                <span
                    style={{
                        color: status === "active" ? "#52c41a" : "#8c8c8c",
                        fontWeight: 500,
                    }}
                >
                    {status.toUpperCase()}
                </span>
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 150,
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
    ];

    const visibleColumns = columns.filter(col => {
        if ('children' in col) {
            // ColumnGroupType - skip or handle as needed
            return true;
        }
        // ColumnType - safely access dataIndex
        const columnType = col as any;
        const colKey = col.key || (typeof columnType.dataIndex === 'string' ? columnType.dataIndex : undefined);
        return colKey && columnVisibility[colKey];
    });

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            {/* Header */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }} align="middle">
                <Col xs={24} sm={12} md={16}>
                    <Title
                        level={2}
                        style={{
                            margin: 0,
                            color: isDark ? "#fff" : "#1f1f1f",
                            fontWeight: 600,
                        }}
                    >
                        Brands
                    </Title>
                    <Text type="secondary">Manage your brands</Text>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </Space>
                </Col>
            </Row>

            {/* Search and Actions */}
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
                    <Col xs={24} sm={12} md={8}>
                        <Search
                            placeholder="Search brands..."
                            allowClear
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                            <Dropdown menu={{ items: exportMenuItems }} placement="bottomRight">
                                <Button icon={<DownOutlined />}>
                                    Export
                                </Button>
                            </Dropdown>
                            <Dropdown
                                menu={{
                                    items: Object.keys(columnVisibility).map(key => ({
                                        key,
                                        label: (
                                            <Checkbox
                                                checked={columnVisibility[key]}
                                                onChange={(e) => setColumnVisibility(prev => ({
                                                    ...prev,
                                                    [key]: e.target.checked
                                                }))}
                                            >
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </Checkbox>
                                        ),
                                    })),
                                }}
                                placement="bottomRight"
                            >
                                <Button icon={<UnorderedListOutlined />}>
                                    Column visibility
                                </Button>
                            </Dropdown>
                            <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
                                Refresh
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
                styles={{ body: { padding: "0" } }}
            >
                <Table
                    columns={visibleColumns}
                    dataSource={filteredBrands}
                    rowKey="key"
                    scroll={{ x: 800 }}
                    pagination={{
                        total: filteredBrands.length,
                        pageSize: 25,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            </Card>

            {/* Edit Modal */}
            <Modal
                title="Edit Brand"
                open={editModalOpen}
                onCancel={() => setEditModalOpen(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleEditSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Brand Name"
                        rules={[{ required: true, message: "Please enter brand name" }]}
                    >
                        <Input placeholder="Enter brand name" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea rows={3} placeholder="Enter brand description" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please select status" }]}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Space>
                            <Button onClick={() => setEditModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Update
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Add Modal */}
            <Modal
                title="Add Brand"
                open={addModalOpen}
                onCancel={() => setAddModalOpen(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Brand name"
                        rules={[{ required: true, message: "Please enter brand name" }]}
                    >
                        <Input placeholder="Enter brand name" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Short description"
                    >
                        <Input.TextArea rows={3} placeholder="Enter short description" />
                    </Form.Item>
                    <Form.Item
                        name="useForRepair"
                        valuePropName="checked"
                    >
                        <Checkbox>Use for repair?</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Space>
                            <Button onClick={() => setAddModalOpen(false)}>
                                Close
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Save
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                title="Delete Brand"
                open={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                footer={null}
                width={400}
            >
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <Text>
                        Are you sure you want to delete the brand "{selectedBrand?.name}"? This action cannot be undone.
                    </Text>
                    <div style={{ marginTop: "24px" }}>
                        <Space>
                            <Button onClick={() => setDeleteModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                danger
                                onClick={handleDeleteConfirm}
                                loading={loading}
                            >
                                Delete
                            </Button>
                        </Space>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Brands;