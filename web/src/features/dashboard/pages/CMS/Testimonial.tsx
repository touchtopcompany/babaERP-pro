import React, { useState } from "react";
import {
    Card,
    Button,
    Tag,
    Modal,
    Form,
    Input,
    Select,
    Rate,
    message,
    Typography,
    Row,
    Col,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface TestimonialData {
    id: string;
    clientName: string;
    company: string;
    rating: number;
    content: string;
    addedOn: string;
    status: 'published' | 'draft';
}

const Testimonial: React.FC = () => {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([
        {
            id: "1",
            clientName: "Alice Johnson",
            company: "Tech Solutions Inc.",
            rating: 5,
            content: "Excellent service and support. The system has transformed our business operations.",
            addedOn: "2024-02-15",
            status: "published",
        },
        {
            id: "2",
            clientName: "Bob Wilson",
            company: "Global Enterprises",
            rating: 4,
            content: "Great product with amazing features. Highly recommended for any business.",
            addedOn: "2024-02-10",
            status: "draft",
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<TestimonialData | null>(null);
    const [form] = Form.useForm();

    const handleAdd = () => {
        setEditingTestimonial(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record: TestimonialData) => {
        setEditingTestimonial(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = (record: TestimonialData) => {
        Modal.confirm({
            title: "Are you sure you want to delete this testimonial?",
            content: `This action cannot be undone. Testimonial from: ${record.clientName}`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                setTestimonials(testimonials.filter(testimonial => testimonial.id !== record.id));
                message.success("Testimonial deleted successfully");
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingTestimonial) {
                setTestimonials(testimonials.map(testimonial =>
                    testimonial.id === editingTestimonial.id
                        ? { ...testimonial, ...values }
                        : testimonial
                ));
                message.success("Testimonial updated successfully");
            } else {
                const newTestimonial: TestimonialData = {
                    id: Date.now().toString(),
                    ...values,
                    addedOn: new Date().toISOString().split('T')[0],
                };
                setTestimonials([...testimonials, newTestimonial]);
                message.success("Testimonial added successfully");
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const { Title } = Typography;

    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "CMS", icon: <FileTextOutlined />, path: "/cms" },
                { label: "Testimonials", icon: <FileTextOutlined /> },
            ]}
        >
            <div style={{ padding: "24px" }}>
                <Title level={2} style={{ marginBottom: "24px" }}>Testimonials Management</Title>

                <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={3}>All Testimonials</Title>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Add Testimonial
                    </Button>
                </div>

                <Row gutter={[16, 16]}>
                    {testimonials.map((testimonial) => (
                        <Col xs={24} sm={12} lg={8} key={testimonial.id}>
                            <Card
                                hoverable
                                actions={[
                                    <EditOutlined key="edit" onClick={() => handleEdit(testimonial)} />,
                                    <DeleteOutlined key="delete" onClick={() => handleDelete(testimonial)} />,
                                ]}
                            >
                                <Card.Meta
                                    title={testimonial.clientName}
                                    description={
                                        <div>
                                            <div style={{ marginBottom: 8 }}>
                                                <strong>Company:</strong> {testimonial.company}
                                            </div>
                                            <div style={{ marginBottom: 8 }}>
                                                <Rate disabled value={testimonial.rating} style={{ fontSize: '12px' }} />
                                            </div>
                                            <div style={{ marginBottom: 8 }}>
                                                <em>"{testimonial.content}"</em>
                                            </div>
                                            <div style={{ marginBottom: 8 }}>
                                                <strong>Added On:</strong> {testimonial.addedOn}
                                            </div>
                                            <div>
                                                <Tag color={testimonial.status === 'published' ? 'green' : 'orange'}>
                                                    {testimonial.status.toUpperCase()}
                                                </Tag>
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Modal
                    title={editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                    width={600}
                    okText={editingTestimonial ? "Update" : "Create"}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            status: "draft",
                            rating: 5,
                        }}
                    >
                        <Form.Item
                            name="clientName"
                            label="Client Name"
                            rules={[{ required: true, message: "Please enter client name" }]}
                        >
                            <Input placeholder="Enter client name" />
                        </Form.Item>

                        <Form.Item
                            name="company"
                            label="Company"
                            rules={[{ required: true, message: "Please enter company name" }]}
                        >
                            <Input placeholder="Enter company name" />
                        </Form.Item>

                        <Form.Item
                            name="rating"
                            label="Rating"
                            rules={[{ required: true, message: "Please select rating" }]}
                        >
                            <Rate />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            label="Testimonial Content"
                            rules={[{ required: true, message: "Please enter testimonial content" }]}
                        >
                            <Input.TextArea
                                placeholder="Enter testimonial content"
                                rows={4}
                                showCount
                                maxLength={500}
                            />
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

export default Testimonial;