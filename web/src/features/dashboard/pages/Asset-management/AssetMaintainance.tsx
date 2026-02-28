import React, { useState } from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Row,
    Col,
    Select,
    Input,
    Table,
    Tag,
    Dropdown,
    Modal,
    Form,
    DatePicker,
    message,
} from "antd";
import {
    PlusOutlined,
    SearchOutlined,
    ExportOutlined,
    PrinterOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    FileTextOutlined,
    FilterOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title } = Typography;
const { Search } = Input;

interface AssetMaintenance {
    id: string;
    maintenanceId: string;
    asset: string;
    status: string;
    priority: string;
    warranty: string;
    details: string;
    dateTime: string;
    assignedTo: string;
    createdBy: string;
}

const AssetMaintainance: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [maintenanceRecords, setMaintenanceRecords] = useState<AssetMaintenance[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<AssetMaintenance | null>(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [assignedToFilter, setAssignedToFilter] = useState<string>("all");

    const handleAddMaintenance = () => {
        setEditingRecord(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleEditMaintenance = (record: AssetMaintenance) => {
        setEditingRecord(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            dateTime: dayjs(record.dateTime),
        });
    };

    const handleDeleteMaintenance = (record: AssetMaintenance) => {
        Modal.confirm({
            title: "Are you sure you want to delete this maintenance record?",
            content: `Maintenance ID: ${record.maintenanceId}`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                setMaintenanceRecords(maintenanceRecords.filter(m => m.id !== record.id));
                message.success("Maintenance record deleted successfully");
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            const newMaintenance: AssetMaintenance = {
                id: editingRecord ? editingRecord.id : Date.now().toString(),
                maintenanceId: values.maintenanceId || `MAINT${Date.now()}`,
                asset: values.asset,
                status: values.status,
                priority: values.priority,
                warranty: values.warranty,
                details: values.details,
                dateTime: values.dateTime.format("YYYY-MM-DD HH:mm:ss"),
                assignedTo: values.assignedTo,
                createdBy: values.createdBy,
            };

            if (editingRecord) {
                setMaintenanceRecords(maintenanceRecords.map(m => m.id === editingRecord.id ? newMaintenance : m));
                message.success("Maintenance record updated successfully");
            } else {
                setMaintenanceRecords([...maintenanceRecords, newMaintenance]);
                message.success("Maintenance record added successfully");
            }

            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    // Filter maintenance records based on filters
    const filteredMaintenanceRecords = maintenanceRecords.filter(record => {
        if (statusFilter !== "all" && record.status !== statusFilter) return false;
        if (priorityFilter !== "all" && record.priority !== priorityFilter) return false;
        if (assignedToFilter !== "all" && record.assignedTo !== assignedToFilter) return false;
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            return (
                record.maintenanceId.toLowerCase().includes(searchLower) ||
                record.asset.toLowerCase().includes(searchLower) ||
                record.assignedTo.toLowerCase().includes(searchLower)
            );
        }
        return true;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "success";
            case "in progress":
                return "processing";
            case "pending":
                return "warning";
            case "cancelled":
                return "error";
            default:
                return "default";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case "high":
                return "red";
            case "medium":
                return "orange";
            case "low":
                return "green";
            default:
                return "default";
        }
    };

    const getWarrantyColor = (warranty: string) => {
        switch (warranty.toLowerCase()) {
            case "expired":
                return "error";
            case "expiring":
                return "warning";
            case "valid":
                return "success";
            default:
                return "default";
        }
    };

    const columns = [
        {
            title: "Action",
            key: "action",
            width: 120,
            render: (_: any, record: AssetMaintenance) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => console.log("View maintenance", record)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEditMaintenance(record)}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        onClick={() => handleDeleteMaintenance(record)}
                    />
                </Space>
            ),
        },
        {
            title: "Maintenance id",
            dataIndex: "maintenanceId",
            key: "maintenanceId",
            sorter: (a: AssetMaintenance, b: AssetMaintenance) => a.maintenanceId.localeCompare(b.maintenanceId),
        },
        {
            title: "Asset",
            dataIndex: "asset",
            key: "asset",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={getStatusColor(status)}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            render: (priority: string) => (
                <Tag color={getPriorityColor(priority)}>
                    {priority.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Warranty",
            dataIndex: "warranty",
            key: "warranty",
            render: (warranty: string) => (
                <Tag color={getWarrantyColor(warranty)}>
                    {warranty.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Details",
            dataIndex: "details",
            key: "details",
            ellipsis: true,
        },
        {
            title: "Date time",
            dataIndex: "dateTime",
            key: "dateTime",
            render: (dateTime: string) => dayjs(dateTime).format("MM/DD/YYYY HH:mm"),
        },
        {
            title: "Assigned to",
            dataIndex: "assignedTo",
            key: "assignedTo",
        },
        {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
        },
    ];

    const exportMenuItems = [
        {
            key: "csv",
            label: "Export to CSV",
            icon: <FileTextOutlined />,
            onClick: () => message.info("Export to CSV functionality"),
        },
        {
            key: "excel",
            label: "Export to Excel",
            icon: <FileExcelOutlined />,
            onClick: () => message.info("Export to Excel functionality"),
        },
        {
            key: "pdf",
            label: "Export to PDF",
            icon: <FilePdfOutlined />,
            onClick: () => message.info("Export to PDF functionality"),
        },
        {
            key: "print",
            label: "Print",
            icon: <PrinterOutlined />,
            onClick: () => message.info("Print functionality"),
        },
    ];

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            {/* Header Section */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }} align="middle">
                <Col xs={24} sm={12} md={16} lg={18}>
                    <Title
                        level={2}
                        style={{
                            margin: 0,
                            color: isDark ? "#fff" : "#1f1f1f",
                            fontWeight: 600,
                        }}
                    >
                        Asset Maintenance
                    </Title>
                </Col>
            </Row>

            {/* Filters Section */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                    marginBottom: "16px",
                }}
                styles={{ body: { padding: "16px 24px" } }}
            >
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={8} md={6}>
                        <Title level={5} style={{ marginBottom: 8, color: isDark ? "#fff" : "#1f1f1f" }}>Status</Title>
                        <Select
                            value={statusFilter}
                            onChange={setStatusFilter}
                            placeholder="Select Status"
                            style={{ width: "100%" }}
                        >
                            <Select.Option value="all">All</Select.Option>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="in progress">In Progress</Select.Option>
                            <Select.Option value="completed">Completed</Select.Option>
                            <Select.Option value="cancelled">Cancelled</Select.Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={8} md={6}>
                        <Title level={5} style={{ marginBottom: 8, color: isDark ? "#fff" : "#1f1f1f" }}>Priority</Title>
                        <Select
                            value={priorityFilter}
                            onChange={setPriorityFilter}
                            placeholder="Select Priority"
                            style={{ width: "100%" }}
                        >
                            <Select.Option value="all">All</Select.Option>
                            <Select.Option value="high">High</Select.Option>
                            <Select.Option value="medium">Medium</Select.Option>
                            <Select.Option value="low">Low</Select.Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={8} md={6}>
                        <Title level={5} style={{ marginBottom: 8, color: isDark ? "#fff" : "#1f1f1f" }}>Assigned to</Title>
                        <Select
                            value={assignedToFilter}
                            onChange={setAssignedToFilter}
                            placeholder="Select Person"
                            style={{ width: "100%" }}
                        >
                            <Select.Option value="all">All</Select.Option>
                            <Select.Option value="John Doe">John Doe</Select.Option>
                            <Select.Option value="Jane Smith">Jane Smith</Select.Option>
                            <Select.Option value="Mike Johnson">Mike Johnson</Select.Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                            <Button icon={<FilterOutlined />}>
                                Filter
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            {/* Table Controls */}
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                    marginBottom: "16px",
                }}
                styles={{ body: { padding: "16px 24px" } }}
            >
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={8}>
                        <Search
                            placeholder="Search maintenance records..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            prefix={<SearchOutlined />}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                            <Select
                                defaultValue="25"
                                style={{ width: 120 }}
                                options={[
                                    { value: "10", label: "Show 10" },
                                    { value: "25", label: "Show 25" },
                                    { value: "50", label: "Show 50" },
                                    { value: "100", label: "Show 100" },
                                ]}
                            />
                            <Dropdown
                                menu={{ items: exportMenuItems }}
                                placement="bottomRight"
                            >
                                <Button icon={<ExportOutlined />}>
                                    Export
                                </Button>
                            </Dropdown>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleAddMaintenance}
                            >
                                Add
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card >

            {/* Table */}
            < Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                }}
                styles={{ body: { padding: 0 } }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredMaintenanceRecords}
                    rowKey="id"
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card >

            {/* Add/Edit Modal */}
            < Modal
                title={editingRecord ? "Edit Asset Maintenance" : "Add Asset Maintenance"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={600}
                okText={editingRecord ? "Update" : "Add"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: "20px" }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="maintenanceId"
                                label="Maintenance ID"
                                rules={[{ required: true, message: "Please enter maintenance ID" }]}
                            >
                                <Input placeholder="Enter maintenance ID" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="asset"
                                label="Asset"
                                rules={[{ required: true, message: "Please enter asset name" }]}
                            >
                                <Input placeholder="Enter asset name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: "Please select status" }]}
                            >
                                <Select placeholder="Select status">
                                    <Select.Option value="pending">Pending</Select.Option>
                                    <Select.Option value="in progress">In Progress</Select.Option>
                                    <Select.Option value="completed">Completed</Select.Option>
                                    <Select.Option value="cancelled">Cancelled</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="priority"
                                label="Priority"
                                rules={[{ required: true, message: "Please select priority" }]}
                            >
                                <Select placeholder="Select priority">
                                    <Select.Option value="high">High</Select.Option>
                                    <Select.Option value="medium">Medium</Select.Option>
                                    <Select.Option value="low">Low</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="warranty"
                                label="Warranty"
                                rules={[{ required: true, message: "Please select warranty status" }]}
                            >
                                <Select placeholder="Select warranty">
                                    <Select.Option value="valid">Valid</Select.Option>
                                    <Select.Option value="expiring">Expiring</Select.Option>
                                    <Select.Option value="expired">Expired</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="details"
                                label="Details"
                                rules={[{ required: true, message: "Please enter details" }]}
                            >
                                <Input.TextArea rows={3} placeholder="Enter maintenance details" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="Date Time"
                                rules={[{ required: true, message: "Please select date and time" }]}
                            >
                                <DatePicker showTime style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="assignedTo"
                                label="Assigned To"
                                rules={[{ required: true, message: "Please select person" }]}
                            >
                                <Select placeholder="Select person">
                                    <Select.Option value="John Doe">John Doe</Select.Option>
                                    <Select.Option value="Jane Smith">Jane Smith</Select.Option>
                                    <Select.Option value="Mike Johnson">Mike Johnson</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="createdBy"
                                label="Created By"
                                rules={[{ required: true, message: "Please enter created by" }]}
                            >
                                <Input placeholder="Enter created by" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </div >
    );
};

export default AssetMaintainance;