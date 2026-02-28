import React, { useState, useEffect } from "react";
import {
    Card,
    Row,
    Col,
    Table,
    Button,
    Space,
    Dropdown,
    Menu,
    Input,
    Tooltip,
    Modal,
    Form,
    message,
    Typography
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
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Search } = Input;
const { Title } = Typography;

interface MemoItem {
    id: string;
    heading: string;
    description: string;
    createdDate: string;
}

const Memo: React.FC = () => {
    const [data, setData] = useState<MemoItem[]>([]);
    const [loading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<MemoItem | null>(null);
    const [form] = Form.useForm();

    // Mock data for demonstration
    useEffect(() => {
        const mockData: MemoItem[] = [
            {
                id: "1",
                heading: "Q1 Financial Review",
                description: "Quarterly financial performance review and budget analysis for Q1 2024",
                createdDate: "2024-02-20"
            },
            {
                id: "2",
                heading: "Team Meeting Notes",
                description: "Weekly team sync meeting discussing project progress and upcoming deadlines",
                createdDate: "2024-02-19"
            },
            {
                id: "3",
                heading: "Client Requirements",
                description: "New client project requirements and technical specifications document",
                createdDate: "2024-02-18"
            },
            {
                id: "4",
                heading: "Security Update",
                description: "Important security patches and system updates scheduled for this weekend",
                createdDate: "2024-02-17"
            },
            {
                id: "5",
                heading: "Training Schedule",
                description: "Employee training schedule for new software and tools adoption",
                createdDate: "2024-02-16"
            }
        ];
        setData(mockData);
    }, []);

    const columns = [
        {
            title: "Heading",
            dataIndex: "heading",
            key: "heading",
            ellipsis: true,
            render: (heading: string) => (
                <Tooltip title={heading}>
                    <span style={{ fontWeight: 500 }}>{heading}</span>
                </Tooltip>
            ),
            sorter: (a: MemoItem, b: MemoItem) => a.heading.localeCompare(b.heading)
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            render: (description: string) => (
                <Tooltip title={description}>
                    <span>{description}</span>
                </Tooltip>
            )
        },
        {
            title: "Created Date",
            dataIndex: "createdDate",
            key: "createdDate",
            render: (date: string) => dayjs(date).format("MMM DD, YYYY"),
            sorter: (a: MemoItem, b: MemoItem) =>
                new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: MemoItem) => (
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

    const handleView = (record: MemoItem) => {
        Modal.info({
            title: record.heading,
            content: (
                <div>
                    <p><strong>Description:</strong></p>
                    <p>{record.description}</p>
                    <p><strong>Created Date:</strong> {dayjs(record.createdDate).format("MMMM DD, YYYY")}</p>
                </div>
            ),
            width: 600
        });
    };

    const handleEdit = (record: MemoItem) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this memo?",
            content: "This action cannot be undone.",
            onOk: () => {
                setData(data.filter(item => item.id !== id));
                message.success("Memo deleted successfully");
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
            const newMemo: MemoItem = {
                id: editingRecord ? editingRecord.id : Date.now().toString(),
                heading: values.heading,
                description: values.description,
                createdDate: editingRecord ? editingRecord.createdDate : dayjs().format("YYYY-MM-DD")
            };

            if (editingRecord) {
                setData(data.map(item => item.id === editingRecord.id ? newMemo : item));
                message.success("Memo updated successfully");
            } else {
                setData([...data, newMemo]);
                message.success("Memo added successfully");
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
        // Implement export logic here
    };

    const handlePrint = () => {
        window.print();
    };

    const filteredData = data.filter(item => {
        const matchesSearch = item.heading.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="memo-container">
            <Card>
                <div className="page-header" style={{ marginBottom: 16 }}>
                    <Title level={2} style={{ margin: 0 }}>All Memos</Title>
                </div>

                {/* Action Bar */}
                <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                    <Col>
                        <Space>
                            <Search
                                placeholder="Search memos..."
                                allowClear
                                style={{ width: 300 }}
                                prefix={<SearchOutlined />}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
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
                            <Button icon={<EyeOutlined />}>
                                Column Visibility
                            </Button>
                            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                                Add
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
                        defaultPageSize: 25
                    }}
                    scroll={{ x: 800 }}
                />
            </Card>

            {/* Add/Edit Modal */}
            <Modal
                title={editingRecord ? "Edit Memo" : "Add New Memo"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="heading"
                        label="Heading"
                        rules={[{ required: true, message: "Please enter memo heading" }]}
                    >
                        <Input placeholder="Enter memo heading" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: "Please enter memo description" }]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter memo description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Memo;