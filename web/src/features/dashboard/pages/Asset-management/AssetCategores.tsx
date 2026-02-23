import React, { useState } from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Table,
    Input,
    Modal,
    Form,
    message,
    Popconfirm,
    Dropdown,
    Checkbox,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    TagsOutlined,
    FileTextOutlined,
    PrinterOutlined,
    TableOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Search } = Input;

interface AssetCategory {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

const AssetCategores: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [categories, setCategories] = useState<AssetCategory[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState<AssetCategory | null>(null);
    const [searchText, setSearchText] = useState("");
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        description: true,
        action: true,
    });
    const [form] = Form.useForm();

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchText.toLowerCase()) ||
        category.description.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleAdd = () => {
        setEditingCategory(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record: AssetCategory) => {
        setEditingCategory(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        setCategories(categories.filter(cat => cat.id !== id));
        message.success("Asset category deleted successfully");
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingCategory) {
                // Update existing category
                setCategories(categories.map(cat =>
                    cat.id === editingCategory.id
                        ? { ...cat, ...values, updatedAt: new Date().toISOString() }
                        : cat
                ));
                message.success("Asset category updated successfully");
            } else {
                // Add new category
                const newCategory: AssetCategory = {
                    id: Date.now().toString(),
                    ...values,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                setCategories([...categories, newCategory]);
                message.success("Asset category added successfully");
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingCategory(null);
    };

    const handleColumnVisibilityChange = (column: string, checked: boolean) => {
        setVisibleColumns(prev => ({
            ...prev,
            [column]: checked
        }));
    };

    const allColumns: ColumnsType<AssetCategory> = [
        {
            title: "Asset category",
            dataIndex: "name",
            key: "name",
            render: (text: string) => (
                <Space>
                    <TagsOutlined style={{ color: "#1890ff" }} />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text: string) => (
                <Text type={isDark ? "secondary" : undefined}>
                    {text || "No description provided"}
                </Text>
            ),
        },
        {
            title: "Action",
            key: "action",
            width: 120,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ color: "#1890ff" }}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const columns = allColumns.filter(col => visibleColumns[col.key as keyof typeof visibleColumns]);

    const columnVisibilityMenu = (
        <div style={{ padding: "8px", minWidth: "150px" }}>
            <div style={{ marginBottom: "8px" }}>
                <Checkbox
                    checked={visibleColumns.name}
                    onChange={(e) => handleColumnVisibilityChange('name', e.target.checked)}
                >
                    Asset category
                </Checkbox>
            </div>
            <div style={{ marginBottom: "8px" }}>
                <Checkbox
                    checked={visibleColumns.description}
                    onChange={(e) => handleColumnVisibilityChange('description', e.target.checked)}
                >
                    Description
                </Checkbox>
            </div>
            <div>
                <Checkbox
                    checked={visibleColumns.action}
                    onChange={(e) => handleColumnVisibilityChange('action', e.target.checked)}
                >
                    Action
                </Checkbox>
            </div>
        </div>
    );

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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                    <Title
                        level={2}
                        style={{
                            margin: 0,
                            color: isDark ? "#fff" : "#1f1f1f",
                            fontWeight: 600,
                        }}
                    >
                        Asset Categories
                    </Title>
                    <Space wrap>
                        <Search
                            placeholder="Search categories..."
                            allowClear
                            style={{ width: 250 }}
                            onChange={(e) => setSearchText(e.target.value)}
                            prefix={<SearchOutlined />}
                        />
                        <Button
                            type="default"
                            icon={<FileTextOutlined />}
                            onClick={() => message.info("Export to CSV functionality coming soon")}
                        >
                            Export to CSV
                        </Button>
                        <Button
                            type="default"
                            icon={<FileExcelOutlined />}
                            onClick={() => message.info("Export to Excel functionality coming soon")}
                        >
                            Export to Excel
                        </Button>
                        <Button
                            type="default"
                            icon={<PrinterOutlined />}
                            onClick={() => message.info("Print functionality coming soon")}
                        >
                            Print
                        </Button>
                        <Dropdown
                            dropdownRender={() => columnVisibilityMenu}
                            trigger={["click"]}
                            placement="bottomRight"
                        >
                            <Button
                                type="default"
                                icon={<TableOutlined />}
                            >
                                Column visibility
                            </Button>
                        </Dropdown>
                        <Button
                            type="default"
                            icon={<FilePdfOutlined />}
                            onClick={() => message.info("Export to PDF functionality coming soon")}
                        >
                            Export to PDF
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </Space>
                </div>
            </Card>

            {/* Table Section */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                }}
                styles={{ body: { padding: "24px" } }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredCategories}
                    rowKey="id"
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        pageSizeOptions: ["25", "50", "100"],
                        defaultPageSize: 25,
                    }}
                    locale={{
                        emptyText: "No data available in table",
                    }}
                />
            </Card>

            {/* Add/Edit Modal */}
            <Modal
                title={editingCategory ? "Edit Asset Category" : "Add Asset Category"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText={editingCategory ? "Update" : "Add"}
                cancelText="Cancel"
                width={500}
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: "16px" }}
                >
                    <Form.Item
                        name="name"
                        label="Category Name"
                        rules={[
                            { required: true, message: "Please enter category name" },
                            { max: 100, message: "Category name cannot exceed 100 characters" },
                        ]}
                    >
                        <Input placeholder="Enter category name" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { max: 500, message: "Description cannot exceed 500 characters" },
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Enter category description (optional)"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AssetCategores;