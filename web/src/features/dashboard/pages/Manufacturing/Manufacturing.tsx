import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Button,
    Table,
    Modal,
    Form,
    Input,
    Select,
    InputNumber,
    message,
    Typography,
    Row,
    Col,
    Space,
} from "antd";
import {
    PlusOutlined,
    EyeOutlined,
    FileTextOutlined,
    SettingOutlined,
    BarChartOutlined,
    PlayCircleOutlined,
    ExportOutlined,
    PrinterOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface RecipeItem {
    key: string;
    recipe: string;
    category: string;
    subCategory: string;
    quantity: number;
    price: number;
    unitPrice: number;
}

const Manufacturing: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string>("overview");
    const [recipes, setRecipes] = useState<RecipeItem[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const manufacturingSections = [
        {
            key: "recipe",
            title: "Recipe Management",
            icon: <FileTextOutlined />,
            description: "Manage manufacturing recipes and formulations",
            color: "#1890ff",
        },
        {
            key: "production",
            title: "Production",
            icon: <PlayCircleOutlined />,
            description: "Track and manage production orders",
            color: "#52c41a",
            onClick: () => navigate('/manufacturing/production')
        },
        {
            key: "settings",
            title: "Settings",
            icon: <SettingOutlined />,
            description: "Configure manufacturing settings",
            color: "#faad14",
            onClick: () => navigate('/manufacturing/settings')
        },
        {
            key: "reports",
            title: "Manufacturing Reports",
            icon: <BarChartOutlined />,
            description: "View production and cost reports",
            color: "#722ed1",
            onClick: () => navigate('/manufacturing/reports')
        },
    ];

    const recipeColumns: ColumnsType<RecipeItem> = [
        {
            title: "Recipe",
            dataIndex: "recipe",
            key: "recipe",
            sorter: (a, b) => a.recipe.localeCompare(b.recipe),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            sorter: (a, b) => a.category.localeCompare(b.category),
        },
        {
            title: "Sub category",
            dataIndex: "subCategory",
            key: "subCategory",
            sorter: (a, b) => a.subCategory.localeCompare(b.subCategory),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "Unit Price",
            dataIndex: "unitPrice",
            key: "unitPrice",
            sorter: (a, b) => a.unitPrice - b.unitPrice,
            render: (unitPrice: number) => `$${unitPrice.toFixed(2)}`,
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <Space size="middle">
                    <Button type="link" icon={<EyeOutlined />} size="small">
                        View
                    </Button>
                    <Button type="link" size="small">
                        Edit
                    </Button>
                    <Button type="link" danger size="small">
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleAddRecipe = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            const newRecipe: RecipeItem = {
                key: Date.now().toString(),
                ...values,
            };
            setRecipes([...recipes, newRecipe]);
            message.success('Recipe added successfully');
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const renderContent = () => {
        switch (activeSection) {
            case "overview":
                return (
                    <div>
                        <Title level={2} style={{ marginBottom: "24px" }}>
                            Manufacturing Module
                        </Title>
                        <Row gutter={[16, 16]}>
                            {manufacturingSections.map((section) => (
                                <Col xs={24} sm={12} md={6} key={section.key}>
                                    <Card
                                        hoverable
                                        style={{
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            border: "1px solid #d9d9d9"
                                        }}
                                        bodyStyle={{ padding: "24px" }}
                                        onClick={section.onClick || (() => setActiveSection(section.key))}
                                    >
                                        <div style={{ textAlign: "center" }}>
                                            <div style={{
                                                fontSize: "32px",
                                                color: section.color,
                                                marginBottom: "16px"
                                            }}>
                                                {section.icon}
                                            </div>
                                            <Title level={4} style={{ margin: "0 0 8px 0" }}>
                                                {section.title}
                                            </Title>
                                            <Text type="secondary" style={{ display: "block", marginBottom: "12px" }}>
                                                {section.description}
                                            </Text>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <div style={{ marginTop: "32px" }}>
                            <Title level={3}>Recent Recipes</Title>
                            <Card>
                                <Table
                                    columns={recipeColumns}
                                    dataSource={recipes.slice(0, 5)}
                                    pagination={false}
                                    locale={{
                                        emptyText: "No recipes available",
                                    }}
                                />
                            </Card>
                        </div>
                    </div>
                );

            case "recipe":
                return (
                    <div>
                        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Title level={3}>Recipe Management</Title>
                            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRecipe}>
                                Add Recipe
                            </Button>
                        </div>

                        <Card style={{ marginBottom: 16 }}>
                            <Space wrap>
                                <Search
                                    placeholder="Search recipes..."
                                    allowClear
                                    style={{ width: 300 }}
                                />
                                <Select defaultValue="25" style={{ width: 120 }}>
                                    <Option value="10">Show 10</Option>
                                    <Option value="25">Show 25</Option>
                                    <Option value="50">Show 50</Option>
                                    <Option value="100">Show 100</Option>
                                </Select>
                                <Button icon={<ExportOutlined />}>Export</Button>
                                <Button icon={<PrinterOutlined />}>Print</Button>
                            </Space>
                        </Card>

                        <Card>
                            <Table
                                columns={recipeColumns}
                                dataSource={recipes}
                                pagination={{
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: (total, range) =>
                                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                }}
                                locale={{
                                    emptyText: "No data available in table",
                                }}
                            />
                        </Card>

                        <div style={{ marginTop: 16 }}>
                            <Button type="primary" size="large">
                                Update product price
                            </Button>
                        </div>
                    </div>
                );



            default:
                return null;
        }
    };

    return (
        <div style={{ padding: "24px" }}>
            {activeSection !== "overview" && (
                <div style={{ marginBottom: "24px" }}>
                    <Button
                        onClick={() => setActiveSection("overview")}
                        style={{ marginBottom: "16px" }}
                    >
                        ← Back to Overview
                    </Button>
                </div>
            )}

            {renderContent()}

            <Modal
                title="Add New Recipe"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="recipe"
                        label="Recipe Name"
                        rules={[{ required: true, message: 'Please input recipe name!' }]}
                    >
                        <Input placeholder="Enter recipe name" />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select category!' }]}
                    >
                        <Select placeholder="Select category">
                            <Option value="Food">Food</Option>
                            <Option value="Beverage">Beverage</Option>
                            <Option value="Chemical">Chemical</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="subCategory"
                        label="Sub Category"
                    >
                        <Input placeholder="Enter sub category" />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[{ required: true, message: 'Please enter quantity!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="Enter quantity" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter price!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="Enter price" />
                    </Form.Item>
                    <Form.Item
                        name="unitPrice"
                        label="Unit Price"
                        rules={[{ required: true, message: 'Please enter unit price!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="Enter unit price" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Manufacturing;