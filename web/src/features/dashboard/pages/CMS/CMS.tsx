import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Button,
    Table,
    Tag,
    Dropdown,
    Modal,
    Form,
    Input,
    Select,
    message,
    Typography,
    Row,
    Col,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    MoreOutlined,
    EyeOutlined,
    GlobalOutlined,
    FileTextOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface PageData {
    id: string;
    title: string;
    priority: number;
    addedOn: string;
    layout: string;
    status: 'published' | 'draft';
}

interface SiteDetailData {
    id: string;
    siteName: string;
    siteUrl: string;
    description: string;
    addedOn: string;
    status: 'active' | 'inactive';
}

interface BlogData {
    id: string;
    title: string;
    author: string;
    category: string;
    addedOn: string;
    status: 'published' | 'draft';
}

interface TestimonialData {
    id: string;
    clientName: string;
    company: string;
    rating: number;
    content: string;
    addedOn: string;
    status: 'published' | 'draft';
}

const CMS: React.FC = () => {
    const navigate = useNavigate();
    const [pages, setPages] = useState<PageData[]>([
        {
            id: "1",
            title: "Contact Us",
            priority: 1,
            addedOn: "2024-02-15",
            layout: "Default",
            status: "published",
        },
        {
            id: "2",
            title: "Automate your business management at very-Low cost",
            priority: 2,
            addedOn: "2024-02-10",
            layout: "Landing Page",
            status: "published",
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPage, setEditingPage] = useState<PageData | null>(null);
    const [form] = Form.useForm();

    const handleAdd = () => {
        setEditingPage(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record: PageData) => {
        setEditingPage(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = (record: PageData) => {
        Modal.confirm({
            title: "Are you sure you want to delete this page?",
            content: `This action cannot be undone. Page: ${record.title}`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                setPages(pages.filter(page => page.id !== record.id));
                message.success("Page deleted successfully");
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingPage) {
                setPages(pages.map(page =>
                    page.id === editingPage.id
                        ? { ...page, ...values }
                        : page
                ));
                message.success("Page updated successfully");
            } else {
                const newPage: PageData = {
                    id: Date.now().toString(),
                    ...values,
                    addedOn: new Date().toISOString().split('T')[0],
                };
                setPages([...pages, newPage]);
                message.success("Page added successfully");
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const getMenuItems = (record: PageData) => [
        {
            key: "view",
            icon: <EyeOutlined />,
            label: "View",
        },
        {
            key: "edit",
            icon: <EditOutlined />,
            label: "Edit",
            onClick: () => handleEdit(record),
        },
        {
            key: "delete",
            icon: <DeleteOutlined />,
            label: "Delete",
            danger: true,
            onClick: () => handleDelete(record),
        },
    ];

    const columns: ColumnsType<PageData> = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: "Priority/Sort order",
            dataIndex: "priority",
            key: "priority",
            sorter: (a, b) => a.priority - b.priority,
            width: 150,
        },
        {
            title: "Added On",
            dataIndex: "addedOn",
            key: "addedOn",
            sorter: (a, b) => new Date(a.addedOn).getTime() - new Date(b.addedOn).getTime(),
            width: 120,
        },
        {
            title: "Layout",
            dataIndex: "layout",
            key: "layout",
            width: 120,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 100,
            render: (status: string) => (
                <Tag color={status === 'published' ? 'green' : 'orange'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            width: 80,
            render: (_, record) => (
                <Dropdown
                    menu={{ items: getMenuItems(record) }}
                    trigger={["click"]}
                    placement="bottomRight"
                >
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];

    const { Title, Text } = Typography;

    const cmsSections = [
        {
            key: "pages",
            title: "Pages",
            icon: <FileTextOutlined />,
            description: "Manage website pages and content",
        },
        {
            key: "siteDetails",
            title: "Site Details",
            icon: <GlobalOutlined />,
            description: "Manage site configuration and settings",
        },
        {
            key: "blogs",
            title: "Blog",
            icon: <FileTextOutlined />, 
            description: "Manage blog posts and articles",
        },
        {
            key: "testimonials",
            title: "Testimonials",
            icon: <MessageOutlined />,
            description: "Manage customer testimonials",
        },
    ];

    return (
        <div style={{ padding: "24px" }}>
            <Title level={2} style={{ marginBottom: "24px" }}>Content Management System</Title>

            <Row gutter={[16, 16]}>
                {cmsSections.map((section) => (
                    <Col xs={24} sm={12} md={6} key={section.key}>
                        <Card
                            hoverable
                            style={{
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                border: "1px solid #d9d9d9"
                            }}
                            bodyStyle={{ padding: "24px" }}
                            onClick={() => {
                                const routeMap: { [key: string]: string } = {
                                    pages: "/cms/pages",
                                    siteDetails: "/cms/site-details",
                                    blogs: "/cms/blog",
                                    testimonials: "/cms/testimonials",
                                };
                                navigate(routeMap[section.key]);
                            }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "32px", color: "#1890ff", marginBottom: "16px" }}>
                                    {section.icon}
                                </div>
                                <Title level={4} style={{ margin: "0 0 8px 0" }}>
                                    {section.title}
                                </Title>
                                <Text type="secondary" style={{ display: "block", marginBottom: "12px" }}>
                                    {section.description}
                                </Text>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: "16px"
                                }}>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div style={{ marginTop: "32px" }}>
                <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={3}>Pages</Title>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Add Page
                    </Button>
                </div>

                <Card>
                    <Table
                        columns={columns}
                        dataSource={pages}
                        rowKey="id"
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                        }}
                    />
                </Card>
            </div>

            <Modal
                title={editingPage ? "Edit Page" : "Add New Page"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={600}
                okText={editingPage ? "Update" : "Create"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        status: "draft",
                        layout: "Default",
                        priority: 1,
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Page Title"
                        rules={[{ required: true, message: "Please enter page title" }]}
                    >
                        <Input placeholder="Enter page title" />
                    </Form.Item>

                    <Form.Item
                        name="priority"
                        label="Priority/Sort Order"
                        rules={[{ required: true, message: "Please enter priority" }]}
                    >
                        <Input type="number" placeholder="Enter priority" min={1} />
                    </Form.Item>

                    <Form.Item
                        name="layout"
                        label="Layout"
                        rules={[{ required: true, message: "Please select layout" }]}
                    >
                        <Select placeholder="Select layout">
                            <Select.Option value="Default">Default</Select.Option>
                            <Select.Option value="Landing Page">Landing Page</Select.Option>
                            <Select.Option value="Full Width">Full Width</Select.Option>
                            <Select.Option value="Sidebar">Sidebar</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please select status" }]}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value="draft">Draft</Select.Option>
                            <Select.Option value="published">Published</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CMS;