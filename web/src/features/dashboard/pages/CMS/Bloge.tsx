import React, { useState } from "react";
import {
    Card,
    Button,
    Table,
    Tag,
    Dropdown,
    Modal,
    Form,
    Input,
    message,
    Typography,
    Empty,
    Upload,
    InputNumber,
    Checkbox,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

interface BlogData {
    id: string;
    title: string;
    content: string;
    author: string;
    category: string;
    addedOn: string;
    status: 'published' | 'draft';
    featureImage?: string;
    priority?: number;
    isEnabled: boolean;
}

const Bloge: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogData[]>([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BlogData | null>(null);
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [featureImage, setFeatureImage] = useState<string | null>(null);

    const handleAdd = () => {
        setEditingBlog(null);
        form.resetFields();
        setContent('');
        setFeatureImage(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record: BlogData) => {
        setEditingBlog(record);
        form.setFieldsValue(record);
        setContent(record.content || '');
        setFeatureImage(record.featureImage || null);
        setIsModalVisible(true);
    };

    const handleDelete = (record: BlogData) => {
        Modal.confirm({
            title: "Are you sure you want to delete this blog post?",
            content: `This action cannot be undone. Post: ${record.title}`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                setBlogs(blogs.filter(blog => blog.id !== record.id));
                message.success("Blog post deleted successfully");
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingBlog) {
                setBlogs(blogs.map(blog =>
                    blog.id === editingBlog.id
                        ? { ...blog, ...values, content, featureImage }
                        : blog
                ));
                message.success("Blog post updated successfully");
            } else {
                const newBlog: BlogData = {
                    id: Date.now().toString(),
                    ...values,
                    content,
                    featureImage,
                    addedOn: new Date().toISOString().split('T')[0],
                };
                setBlogs([...blogs, newBlog]);
                message.success("Blog post added successfully");
            }
            setIsModalVisible(false);
            form.resetFields();
            setContent('');
            setFeatureImage(null);
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setContent('');
        setFeatureImage(null);
    };

    const getMenuItems = (record: BlogData) => [
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

    const columns: ColumnsType<BlogData> = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author",
            width: 120,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: 120,
            render: (category: string) => (
                <Tag color="blue">{category}</Tag>
            ),
        },
        {
            title: "Added On",
            dataIndex: "addedOn",
            key: "addedOn",
            sorter: (a, b) => new Date(a.addedOn).getTime() - new Date(b.addedOn).getTime(),
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

    const { Title } = Typography;

    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "CMS", icon: <FileTextOutlined />, path: "/cms" },
                { label: "Blog", icon: <FileTextOutlined /> },
            ]}
        >
            <div style={{ padding: "24px" }}>
                <Title level={2} style={{ marginBottom: "24px" }}>Blog Management</Title>

                <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={3}>All Blog Posts</Title>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Add
                    </Button>
                </div>

                <Card>
                    {blogs.length === 0 ? (
                        <Empty
                            description="Not found! Please Add One."
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        >
                            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                                Add
                            </Button>
                        </Empty>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={blogs}
                            rowKey="id"
                            pagination={{
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} of ${total} items`,
                            }}
                        />
                    )}
                </Card>

                <Modal
                    title={editingBlog ? "Edit blog" : "Add blog"}
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                    width={800}
                    okText="Submit"
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            status: "draft",
                            isEnabled: true,
                            priority: 0,
                        }}
                    >
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: "Please enter title" }]}
                        >
                            <Input placeholder="Enter title" />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            label="Content"
                            rules={[{ required: true, message: "Please enter content" }]}
                        >
                            <Input.TextArea
                                placeholder="Enter content"
                                rows={6}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="featureImage"
                            label="Feature Image"
                        >
                            <Upload
                                beforeUpload={() => false}
                                showUploadList={false}
                                onChange={(info) => {
                                    if (info.file.status === 'done') {
                                        setFeatureImage(URL.createObjectURL(info.file.originFileObj!));
                                    }
                                }}
                            >
                                <Button icon={<UploadOutlined />}>Browse</Button>
                            </Upload>
                            <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
                                Max File size: 5MB
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="priority"
                            label="Priority/Sort order"
                        >
                            <InputNumber min={0} placeholder="Enter priority" style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="isEnabled"
                            valuePropName="checked"
                        >
                            <Checkbox>Is enabled</Checkbox>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Bloge;
