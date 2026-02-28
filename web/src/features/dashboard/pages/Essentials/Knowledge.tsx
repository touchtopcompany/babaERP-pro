import React, { useState, useEffect } from "react";
import {
    Card,
    Row,
    Col,
    Select,
    Table,
    Button,
    Space,
    Dropdown,
    Menu,
    Input,
    Tag,
    Tooltip,
    Modal,
    Form,
    message,
    Typography,
    Upload
} from "antd";
import {
    SearchOutlined,
    ExportOutlined,
    PrinterOutlined,
    EyeOutlined,
    PlusOutlined,
    ReloadOutlined,
    EditOutlined,
    DeleteOutlined,
    FileTextOutlined,
    UploadOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { Search } = Input;
const { Title, Text: TypographyText } = Typography;
const { TextArea } = Input;

interface KnowledgeItem {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
    createdDate: string;
    lastModified: string;
    attachments: string[];
    status: "Published" | "Draft" | "Archived";
}

const Knowledge: React.FC = () => {
    const [data, setData] = useState<KnowledgeItem[]>([]);
    const [loading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<KnowledgeItem | null>(null);
    const [form] = Form.useForm();

    // Mock data for demonstration
    useEffect(() => {
        const mockData: KnowledgeItem[] = [
            {
                id: "1",
                title: "Employee Onboarding Process",
                content: "Complete guide for new employee onboarding including paperwork, system access, and training schedule.",
                category: "HR",
                tags: ["onboarding", "HR", "new hires"],
                author: "HR Manager",
                createdDate: "2024-02-15",
                lastModified: "2024-02-20",
                attachments: ["onboarding_checklist.pdf", "welcome_kit.docx"],
                status: "Published"
            },
            {
                id: "2",
                title: "IT Security Guidelines",
                content: "Comprehensive security policies and best practices for all employees including password management and data protection.",
                category: "IT",
                tags: ["security", "IT", "policies"],
                author: "IT Administrator",
                createdDate: "2024-02-10",
                lastModified: "2024-02-18",
                attachments: ["security_policy.pdf"],
                status: "Published"
            }
        ];
        setData(mockData);
    }, []);

    const categories = ["HR", "IT", "Finance", "Operations", "Sales", "Marketing", "Legal"];
    const statuses = ["Published", "Draft", "Archived"];

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            ellipsis: true,
            render: (title: string, record: KnowledgeItem) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{title}</div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '2px' }}>
                        by {record.author}
                    </div>
                </div>
            )
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category: string) => (
                <Tag color="blue">{category}</Tag>
            ),
            filters: categories.map(cat => ({ text: cat, value: cat })),
            onFilter: (value: any, record: KnowledgeItem) => record.category === value
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags: string[]) => (
                <Space wrap>
                    {tags.slice(0, 2).map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                    {tags.length > 2 && (
                        <Tag>+{tags.length - 2}</Tag>
                    )}
                </Space>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const colorMap: Record<string, string> = {
                    "Published": "green",
                    "Draft": "orange",
                    "Archived": "default"
                };
                return <Tag color={colorMap[status]}>{status}</Tag>;
            },
            filters: statuses.map(status => ({ text: status, value: status })),
            onFilter: (value: any, record: KnowledgeItem) => record.status === value
        },
        {
            title: "Created",
            dataIndex: "createdDate",
            key: "createdDate",
            render: (date: string) => dayjs(date).format("MMM DD, YYYY"),
            sorter: (a: KnowledgeItem, b: KnowledgeItem) =>
                new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
        },
        {
            title: "Attachments",
            dataIndex: "attachments",
            key: "attachments",
            render: (attachments: string[]) => (
                <Space>
                    {attachments.length > 0 ? (
                        <Tooltip title={`${attachments.length} file(s)`}>
                            <FileTextOutlined style={{ color: '#1890ff' }} />
                        </Tooltip>
                    ) : (
                        <span style={{ color: '#bfbfbf' }}>-</span>
                    )}
                </Space>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: KnowledgeItem) => (
                <Space size="middle">
                    <Tooltip title="View">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={() => handleView(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ];

    const handleView = (record: KnowledgeItem) => {
        Modal.info({
            title: record.title,
            width: 800,
            content: (
                <div>
                    <div style={{ marginBottom: 16 }}>
                        <Space>
                            <Tag color="blue">{record.category}</Tag>
                            <Tag color={record.status === "Published" ? "green" : record.status === "Draft" ? "orange" : "default"}>
                                {record.status}
                            </Tag>
                        </Space>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Space wrap>
                            {record.tags.map(tag => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                        </Space>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <TypographyText strong>Author: </TypographyText>
                        <TypographyText>{record.author}</TypographyText>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <TypographyText strong>Created: </TypographyText>
                        <TypographyText>{dayjs(record.createdDate).format("MMMM DD, YYYY")}</TypographyText>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <TypographyText strong>Last Modified: </TypographyText>
                        <TypographyText>{dayjs(record.lastModified).format("MMMM DD, YYYY")}</TypographyText>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <TypographyText strong>Content:</TypographyText>
                    </div>
                    <div style={{
                        background: '#f5f5f5',
                        padding: 16,
                        borderRadius: 6,
                        whiteSpace: 'pre-wrap'
                    }}>
                        {record.content}
                    </div>
                    {record.attachments.length > 0 && (
                        <div style={{ marginTop: 16 }}>
                            <TypographyText strong>Attachments:</TypographyText>
                            <div style={{ marginTop: 8 }}>
                                {record.attachments.map((file, index) => (
                                    <div key={index} style={{ marginBottom: 4 }}>
                                        <FileTextOutlined style={{ marginRight: 8 }} />
                                        {file}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )
        });
    };

    const handleEdit = (record: KnowledgeItem) => {
        setEditingRecord(record);
        form.setFieldsValue({
            ...record,
            createdDate: dayjs(record.createdDate),
            lastModified: dayjs(record.lastModified)
        });
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this knowledge base item?",
            content: "This action cannot be undone.",
            onOk: () => {
                setData(data.filter(item => item.id !== id));
                message.success("Knowledge base item deleted successfully");
            }
        });
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            const newItem: KnowledgeItem = {
                id: editingRecord ? editingRecord.id : Date.now().toString(),
                title: values.title,
                content: values.content,
                category: values.category,
                tags: values.tags || [],
                author: values.author,
                createdDate: editingRecord ? editingRecord.createdDate : dayjs().format("YYYY-MM-DD"),
                lastModified: dayjs().format("YYYY-MM-DD"),
                attachments: values.attachments || [],
                status: values.status
            };

            if (editingRecord) {
                setData(data.map(item => item.id === editingRecord.id ? newItem : item));
                message.success("Knowledge base item updated successfully");
            } else {
                setData([...data, newItem]);
                message.success("Knowledge base item added successfully");
            }

            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const exportMenu = (
        <Menu>
            <Menu.Item key="csv" icon={<ExportOutlined />} onClick={() => handleExport("csv")}>
                Export to CSV
            </Menu.Item>
            <Menu.Item key="excel" icon={<ExportOutlined />} onClick={() => handleExport("excel")}>
                Export to Excel
            </Menu.Item>
            <Menu.Item key="pdf" icon={<ExportOutlined />} onClick={() => handleExport("pdf")}>
                Export to PDF
            </Menu.Item>
        </Menu>
    );

    const handleExport = (format: string) => {
        message.info(`Exporting to ${format.toUpperCase()}...`);
    };

    const handlePrint = () => {
        window.print();
    };

    const filteredData = data.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.content.toLowerCase().includes(searchText.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        const matchesStatus = !selectedStatus || item.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div>
            {/* Page Header */}
            <div className="page-header" style={{ marginBottom: 16 }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={3} style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>
                            Knowledge Base
                        </Title>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                            Add Knowledge Base Item
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Filters */}
            <Card size="small" style={{ marginBottom: 16 }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Select Category"
                            style={{ width: "100%" }}
                            allowClear
                            value={selectedCategory || undefined}
                            onChange={setSelectedCategory}
                        >
                            {categories.map(cat => (
                                <Option key={cat} value={cat}>{cat}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Select Status"
                            style={{ width: "100%" }}
                            allowClear
                            value={selectedStatus || undefined}
                            onChange={setSelectedStatus}
                        >
                            {statuses.map(status => (
                                <Option key={status} value={status}>{status}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Search
                            placeholder="Search knowledge base..."
                            allowClear
                            prefix={<SearchOutlined />}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                </Row>
            </Card>

            {/* Action Bar */}
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Space>
                        <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
                            Refresh
                        </Button>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Dropdown overlay={exportMenu} placement="bottomRight">
                            <Button icon={<ExportOutlined />}>
                                Export
                            </Button>
                        </Dropdown>
                        <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                            Print
                        </Button>
                    </Space>
                </Col>
            </Row>

            {/* Data Table */}
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                loading={loading}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                }}
                scroll={{ x: 1000 }}
            />

            {/* Add/Edit Modal */}
            <Modal
                title={editingRecord ? "Edit Knowledge Base Item" : "Add New Knowledge Base Item"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        status: "Draft",
                        category: "HR"
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: "Please enter title" }]}
                            >
                                <Input placeholder="Enter knowledge base item title" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[{ required: true, message: "Please select category" }]}
                            >
                                <Select placeholder="Select category">
                                    {categories.map(cat => (
                                        <Option key={cat} value={cat}>{cat}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: "Please select status" }]}
                            >
                                <Select placeholder="Select status">
                                    {statuses.map(status => (
                                        <Option key={status} value={status}>{status}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="content"
                                label="Content"
                                rules={[{ required: true, message: "Please enter content" }]}
                            >
                                <TextArea rows={6} placeholder="Enter detailed content" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="author"
                                label="Author"
                                rules={[{ required: true, message: "Please enter author name" }]}
                            >
                                <Input placeholder="Enter author name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tags"
                                label="Tags"
                            >
                                <Select
                                    mode="tags"
                                    placeholder="Add tags"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="attachments"
                                label="Attachments"
                            >
                                <Upload
                                    multiple
                                    beforeUpload={() => false}
                                    showUploadList={{ showRemoveIcon: true }}
                                >
                                    <Button icon={<UploadOutlined />}>Upload Files</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Knowledge;