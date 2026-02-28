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
    Select,
    message,
    Typography,
} from "antd";
import { Editor } from '@tinymce/tinymce-react';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    MoreOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

interface PageData {
    id: string;
    title: string;
    description: string;
    priority: number;
    addedOn: string;
    layout: string;
    status: 'published' | 'draft';
}

const PagesPage: React.FC = () => {
    const [pages, setPages] = useState<PageData[]>([
        {
            id: "1",
            title: "Contact Us",
            description: "<p>Contact us page content</p>",
            priority: 1,
            addedOn: "2024-02-15",
            layout: "Default",
            status: "published",
        },
        {
            id: "2",
            title: "Automate your business management at very-Low cost",
            description: "<p>Learn how to automate your business management with our cost-effective solutions.</p>",
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

    const { Title } = Typography;

    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "CMS", icon: <FileTextOutlined />, path: "/cms" },
                { label: "Pages", icon: <FileTextOutlined /> },
            ]}
        >
            <div style={{ padding: "24px" }}>
                <Title level={2} style={{ marginBottom: "24px" }}>Pages Management</Title>

                <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={3}>All Pages</Title>
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
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: "Please enter page description" }]}
                        >
                            <Editor
                                apiKey="0okczgi5nx161bxzhmt6x8xvsdgvkgoea2gaqd9iewp33pv8"
                                initialValue=""
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | code help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                                onEditorChange={(content) => {
                                    form.setFieldValue('description', content);
                                }}
                            />
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
        </DashboardLayout>
    );
};

export default PagesPage;
