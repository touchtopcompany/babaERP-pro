import React, { useState, useEffect } from "react";
import {
    Card,
    Row,
    Col,
    Select,
    DatePicker,
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
    Tabs,
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
    FileTextOutlined,
    FileOutlined,
    BellOutlined,
    MessageOutlined,
    BookOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Document from "./Document";
import Memo from "./Memo";
import Reminder from "./Reminder";
import Messages from "./Messages";
import Knowledge from "./Knowledge";
import Settings from "./Settings.tsx";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;
const { Title } = Typography;

interface ToDoItem {
    id: string;
    addedOn: string;
    taskId: string;
    task: string;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
    startDate: string;
    endDate: string;
    estimatedHours: number;
    assignedBy: string;
    assignedTo: string;
    priority: "Low" | "Medium" | "High" | "Critical";
}

const ToDo: React.FC = () => {
    const [activeTab, setActiveTab] = useState("todo");
    const [data, setData] = useState<ToDoItem[]>([]);
    const [loading] = useState(false);
    const [filters, setFilters] = useState({
        assignedTo: "",
        priority: "",
        status: "",
        dateRange: null as [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
    });
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<ToDoItem | null>(null);
    const [form] = Form.useForm();

    // Mock data for demonstration
    useEffect(() => {
        const mockData: ToDoItem[] = [
            {
                id: "1",
                addedOn: "2024-02-20",
                taskId: "TSK-001",
                task: "Complete quarterly financial report",
                status: "In Progress",
                startDate: "2024-02-15",
                endDate: "2024-02-28",
                estimatedHours: 8,
                assignedBy: "John Manager",
                assignedTo: "Alice Developer",
                priority: "High"
            },
            {
                id: "2",
                addedOn: "2024-02-19",
                taskId: "TSK-002",
                task: "Update employee database",
                status: "Pending",
                startDate: "2024-02-22",
                endDate: "2024-03-01",
                estimatedHours: 4,
                assignedBy: "John Manager",
                assignedTo: "Bob Analyst",
                priority: "Medium"
            }
        ];
        setData(mockData);
    }, []);

    const columns = [
        {
            title: "Added On",
            dataIndex: "addedOn",
            key: "addedOn",
            sorter: (a: ToDoItem, b: ToDoItem) =>
                new Date(a.addedOn).getTime() - new Date(b.addedOn).getTime(),
            render: (date: string) => dayjs(date).format("MMM DD, YYYY")
        },
        {
            title: "Task Id",
            dataIndex: "taskId",
            key: "taskId",
            render: (id: string) => (
                <Tag color="blue">{id}</Tag>
            )
        },
        {
            title: "Task",
            dataIndex: "task",
            key: "task",
            ellipsis: true,
            render: (task: string) => (
                <Tooltip title={task}>
                    <span>{task}</span>
                </Tooltip>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const colorMap: Record<string, string> = {
                    "Pending": "orange",
                    "In Progress": "blue",
                    "Completed": "green",
                    "Cancelled": "red"
                };
                return <Tag color={colorMap[status]}>{status}</Tag>;
            },
            filters: [
                { text: "Pending", value: "Pending" },
                { text: "In Progress", value: "In Progress" },
                { text: "Completed", value: "Completed" },
                { text: "Cancelled", value: "Cancelled" }
            ],
            onFilter: (value: any, record: ToDoItem) => record.status === value
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
            render: (date: string) => dayjs(date).format("MMM DD, YYYY")
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
            render: (date: string) => dayjs(date).format("MMM DD, YYYY")
        },
        {
            title: "Estimated Hours",
            dataIndex: "estimatedHours",
            key: "estimatedHours",
            render: (hours: number) => `${hours}h`,
            sorter: (a: ToDoItem, b: ToDoItem) => a.estimatedHours - b.estimatedHours
        },
        {
            title: "Assigned By",
            dataIndex: "assignedBy",
            key: "assignedBy"
        },
        {
            title: "Assigned To",
            dataIndex: "assignedTo",
            key: "assignedTo"
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: ToDoItem) => (
                <Space size="middle">
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

    const handleEdit = (record: ToDoItem) => {
        setEditingRecord(record);
        form.setFieldsValue({
            ...record,
            dateRange: [dayjs(record.startDate), dayjs(record.endDate)]
        });
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this task?",
            content: "This action cannot be undone.",
            onOk: () => {
                setData(data.filter(item => item.id !== id));
                message.success("Task deleted successfully");
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
            const newTask: ToDoItem = {
                id: editingRecord ? editingRecord.id : Date.now().toString(),
                addedOn: editingRecord ? editingRecord.addedOn : dayjs().format("YYYY-MM-DD"),
                taskId: editingRecord ? editingRecord.taskId : `TSK-${String(data.length + 1).padStart(3, '0')}`,
                task: values.task,
                status: values.status,
                startDate: values.dateRange[0].format("YYYY-MM-DD"),
                endDate: values.dateRange[1].format("YYYY-MM-DD"),
                estimatedHours: values.estimatedHours,
                assignedBy: values.assignedBy,
                assignedTo: values.assignedTo,
                priority: values.priority
            };

            if (editingRecord) {
                setData(data.map(item => item.id === editingRecord.id ? newTask : item));
                message.success("Task updated successfully");
            } else {
                setData([...data, newTask]);
                message.success("Task added successfully");
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
        const matchesSearch = item.task.toLowerCase().includes(searchText.toLowerCase()) ||
            item.taskId.toLowerCase().includes(searchText.toLowerCase());
        const matchesAssignedTo = !filters.assignedTo || item.assignedTo === filters.assignedTo;
        const matchesPriority = !filters.priority || item.priority === filters.priority;
        const matchesStatus = !filters.status || item.status === filters.status;
        const matchesDateRange = !filters.dateRange ||
            (dayjs(item.startDate).isAfter(filters.dateRange[0]) &&
                dayjs(item.endDate).isBefore(filters.dateRange[1]));

        return matchesSearch && matchesAssignedTo && matchesPriority && matchesStatus && matchesDateRange;
    });

    return (
        <div className="todo-container">
            <Card>
                <div className="page-header" style={{ marginBottom: 16 }}>
                    <Title level={2} style={{ margin: 0 }}>Essentials</Title>
                </div>

                {/* Navigation Tabs */}
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    size="large"
                    style={{ marginBottom: 24 }}
                >
                    <TabPane
                        tab={
                            <span>
                                <FileTextOutlined />
                                To Do
                            </span>
                        }
                        key="todo"
                    >
                        {/* To Do Content */}
                        <div className="page-header" style={{ marginBottom: 16 }}>
                            <Title level={3} style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>To Do List</Title>
                        </div>

                        {/* Filters Section */}
                        <Card size="small" style={{ marginBottom: 16 }}>
                            <Row gutter={[16, 16]} align="middle">
                                <Col xs={24} sm={12} md={6}>
                                    <Select
                                        placeholder="Assigned To"
                                        style={{ width: "100%" }}
                                        allowClear
                                        value={filters.assignedTo || undefined}
                                        onChange={(value) => setFilters({ ...filters, assignedTo: value })}
                                    >
                                        <Option value="Alice Developer">Alice Developer</Option>
                                        <Option value="Bob Analyst">Bob Analyst</Option>
                                        <Option value="Charlie Designer">Charlie Designer</Option>
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                    <Select
                                        placeholder="Priority"
                                        style={{ width: "100%" }}
                                        allowClear
                                        value={filters.priority || undefined}
                                        onChange={(value) => setFilters({ ...filters, priority: value })}
                                    >
                                        <Option value="Low">Low</Option>
                                        <Option value="Medium">Medium</Option>
                                        <Option value="High">High</Option>
                                        <Option value="Critical">Critical</Option>
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                    <Select
                                        placeholder="Status"
                                        style={{ width: "100%" }}
                                        allowClear
                                        value={filters.status || undefined}
                                        onChange={(value) => setFilters({ ...filters, status: value })}
                                    >
                                        <Option value="Pending">Pending</Option>
                                        <Option value="In Progress">In Progress</Option>
                                        <Option value="Completed">Completed</Option>
                                        <Option value="Cancelled">Cancelled</Option>
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                    <RangePicker
                                        style={{ width: "100%" }}
                                        placeholder={["Start Date", "End Date"]}
                                        value={filters.dateRange}
                                        onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
                                    />
                                </Col>
                            </Row>
                        </Card>

                        {/* Action Bar */}
                        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                            <Col>
                                <Space>
                                    <Search
                                        placeholder="Search tasks..."
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
                            }}
                            scroll={{ x: 1200 }}
                        />
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <FileOutlined />
                                Document
                            </span>
                        }
                        key="document"
                    >
                        <Document />
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <FileTextOutlined />
                                Memos
                            </span>
                        }
                        key="memos"
                    >
                        <Memo />
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <BellOutlined />
                                Reminders
                            </span>
                        }
                        key="reminders"
                    >
                        <Reminder />
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <MessageOutlined />
                                Messages
                            </span>
                        }
                        key="messages"
                    >
                        <Messages />
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <BookOutlined />
                                Knowledge Base
                            </span>
                        }
                        key="knowledge"
                    >
                        <Knowledge />
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <SettingOutlined />
                                Settings
                            </span>
                        }
                        key="settings"
                    >
                        <Settings />
                    </TabPane>
                </Tabs>
            </Card>

            {/* Add/Edit Modal */}
            <Modal
                title={editingRecord ? "Edit Task" : "Add New Task"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        status: "Pending",
                        priority: "Medium",
                        estimatedHours: 1
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="task"
                                label="Task Description"
                                rules={[{ required: true, message: "Please enter task description" }]}
                            >
                                <Input.TextArea rows={3} placeholder="Enter task description" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: "Please select status" }]}
                            >
                                <Select>
                                    <Option value="Pending">Pending</Option>
                                    <Option value="In Progress">In Progress</Option>
                                    <Option value="Completed">Completed</Option>
                                    <Option value="Cancelled">Cancelled</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="priority"
                                label="Priority"
                                rules={[{ required: true, message: "Please select priority" }]}
                            >
                                <Select>
                                    <Option value="Low">Low</Option>
                                    <Option value="Medium">Medium</Option>
                                    <Option value="High">High</Option>
                                    <Option value="Critical">Critical</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="dateRange"
                                label="Date Range"
                                rules={[{ required: true, message: "Please select date range" }]}
                            >
                                <RangePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="estimatedHours"
                                label="Estimated Hours"
                                rules={[{ required: true, message: "Please enter estimated hours" }]}
                            >
                                <Input type="number" min={1} placeholder="Hours" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="assignedBy"
                                label="Assigned By"
                                rules={[{ required: true, message: "Please enter assigned by" }]}
                            >
                                <Input placeholder="Assigned by" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="assignedTo"
                                label="Assigned To"
                                rules={[{ required: true, message: "Please enter assigned to" }]}
                            >
                                <Input placeholder="Assigned to" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ToDo;