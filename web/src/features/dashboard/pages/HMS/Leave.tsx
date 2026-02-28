import React, { useState } from "react";
import { Card, Table, Button, Space, Input, Select, DatePicker, message, Popconfirm, Row, Col } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, FilterOutlined, HomeOutlined, FileTextOutlined, ClockCircleOutlined, DollarOutlined, CalendarOutlined, TeamOutlined, UserOutlined, TrophyOutlined } from "@ant-design/icons";
import AddModal, { type FormField } from "@/components/modals/AddModal";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

const { RangePicker } = DatePicker;

interface Leave {
    id: string;
    leaveType: string;
    employee: string;
    fromDate: string;
    toDate: string;
    days: number;
    reason: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
}

const LeavePage: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const [leaves, setLeaves] = useState<Leave[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingLeave, setEditingLeave] = useState<Leave | null>(null);
    const [searchText, setSearchText] = useState("");

    // Filter states
    const [employeeFilter, setEmployeeFilter] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [leaveTypeFilter, setLeaveTypeFilter] = useState<string>("");
    const [dateRangeFilter, setDateRangeFilter] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);

    const formFields: FormField[] = [
        {
            name: "leaveType",
            label: "Leave Type",
            type: "select",
            placeholder: "Select leave type",
            required: true,
            options: [
                { label: "Annual Leave", value: "annual_leave" },
                { label: "Sick Leave", value: "sick_leave" },
                { label: "Maternity Leave", value: "maternity_leave" },
                { label: "Paternity Leave", value: "paternity_leave" },
                { label: "Emergency Leave", value: "emergency_leave" },
            ],
        },
        {
            name: "employee",
            label: "Employee Name",
            type: "select",
            placeholder: "Select employee",
            required: true,
            options: [
                { label: "John Doe", value: "john_doe" },
                { label: "Jane Smith", value: "jane_smith" },
                { label: "Mike Johnson", value: "mike_johnson" },
                { label: "Sarah Williams", value: "sarah_williams" },
            ],
        },
        {
            name: "fromDate",
            label: "From Date",
            type: "date",
            placeholder: "Select start date",
            required: true,
        },
        {
            name: "toDate",
            label: "To Date",
            type: "date",
            placeholder: "Select end date",
            required: true,
        },
        {
            name: "days",
            label: "Days",
            type: "number",
            placeholder: "Number of days",
            required: true,
        },
        {
            name: "reason",
            label: "Reason",
            type: "textarea",
            placeholder: "Enter reason for leave",
            required: true,
        },
    ];

    const employeeOptions = [
        { label: "All Employees", value: "" },
        { label: "John Doe", value: "john_doe" },
        { label: "Jane Smith", value: "jane_smith" },
        { label: "Mike Johnson", value: "mike_johnson" },
        { label: "Sarah Williams", value: "sarah_williams" },
    ];

    const statusOptions = [
        { label: "All Status", value: "" },
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
    ];

    const leaveTypeOptions = [
        { label: "All Leave Types", value: "" },
        { label: "Annual Leave", value: "annual_leave" },
        { label: "Sick Leave", value: "sick_leave" },
        { label: "Maternity Leave", value: "maternity_leave" },
        { label: "Paternity Leave", value: "paternity_leave" },
        { label: "Emergency Leave", value: "emergency_leave" },
    ];

    const columns = [
        {
            title: "Leave Type",
            dataIndex: "leaveType",
            key: "leaveType",
            sorter: (a: Leave, b: Leave) => a.leaveType.localeCompare(b.leaveType),
            render: (type: string) => {
                const typeLabels: Record<string, string> = {
                    annual_leave: "Annual Leave",
                    sick_leave: "Sick Leave",
                    maternity_leave: "Maternity Leave",
                    paternity_leave: "Paternity Leave",
                    emergency_leave: "Emergency Leave",
                };
                return typeLabels[type] || type;
            },
        },
        {
            title: "Employee Name",
            dataIndex: "employee",
            key: "employee",
            sorter: (a: Leave, b: Leave) => a.employee.localeCompare(b.employee),
            render: (employee: string) => {
                const employeeLabels: Record<string, string> = {
                    john_doe: "John Doe",
                    jane_smith: "Jane Smith",
                    mike_johnson: "Mike Johnson",
                    sarah_williams: "Sarah Williams",
                };
                return employeeLabels[employee] || employee;
            },
        },
        {
            title: "From Date",
            dataIndex: "fromDate",
            key: "fromDate",
            sorter: (a: Leave, b: Leave) => a.fromDate.localeCompare(b.fromDate),
            render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
        },
        {
            title: "To Date",
            dataIndex: "toDate",
            key: "toDate",
            sorter: (a: Leave, b: Leave) => a.toDate.localeCompare(b.toDate),
            render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
        },
        {
            title: "Days",
            dataIndex: "days",
            key: "days",
            sorter: (a: Leave, b: Leave) => a.days - b.days,
            render: (days: number) => `${days} days`,
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            ellipsis: true,
            width: 200,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: (a: Leave, b: Leave) => a.status.localeCompare(b.status),
            render: (status: string) => {
                const statusColors = {
                    pending: "#faad14",
                    approved: "#52c41a",
                    rejected: "#ff4d4f",
                };
                return (
                    <span
                        style={{
                            color: statusColors[status as keyof typeof statusColors],
                            fontWeight: 500,
                            textTransform: "capitalize",
                        }}
                    >
                        {status}
                    </span>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            width: 120,
            render: (_: any, record: Leave) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ color: "#1890ff" }}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this leave request?"
                        description="This action cannot be undone."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                            style={{ color: "#ff4d4f" }}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleAdd = () => {
        setEditingLeave(null);
        setModalVisible(true);
    };

    const handleEdit = (record: Leave) => {
        setEditingLeave(record);
        setModalVisible(true);
    };

    const handleSave = async (values: any) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (editingLeave) {
                // Update existing leave
                setLeaves(prev =>
                    prev.map(leave =>
                        leave.id === editingLeave.id
                            ? { ...leave, ...values, updatedAt: new Date().toISOString() }
                            : leave
                    )
                );
                message.success("Leave request updated successfully!");
            } else {
                // Add new leave
                const newLeave: Leave = {
                    id: Date.now().toString(),
                    ...values,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                setLeaves(prev => [...prev, newLeave]);
                message.success("Leave request added successfully!");
            }

            setModalVisible(false);
        } catch (error) {
            message.error("Failed to save leave request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            setLeaves(prev => prev.filter(leave => leave.id !== id));
            message.success("Leave request deleted successfully!");
        } catch (error) {
            message.error("Failed to delete leave request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const clearFilters = () => {
        setEmployeeFilter("");
        setStatusFilter("");
        setLeaveTypeFilter("");
        setDateRangeFilter(null);
        setSearchText("");
    };

    const getFilteredData = () => {
        return leaves.filter(leave => {
            // Search filter
            const matchesSearch = searchText === "" ||
                leave.leaveType.toLowerCase().includes(searchText.toLowerCase()) ||
                leave.employee.toLowerCase().includes(searchText.toLowerCase()) ||
                leave.reason.toLowerCase().includes(searchText.toLowerCase());

            // Employee filter
            const matchesEmployee = employeeFilter === "" || leave.employee === employeeFilter;

            // Status filter
            const matchesStatus = statusFilter === "" || leave.status === statusFilter;

            // Leave type filter
            const matchesLeaveType = leaveTypeFilter === "" || leave.leaveType === leaveTypeFilter;

            // Date range filter
            let matchesDateRange = true;
            if (dateRangeFilter) {
                if (dateRangeFilter[0] && dateRangeFilter[1]) {
                    const leaveFromDate = dayjs(leave.fromDate);
                    const leaveToDate = dayjs(leave.toDate);
                    matchesDateRange = (leaveFromDate.isAfter(dateRangeFilter[0]) || leaveFromDate.isSame(dateRangeFilter[0])) &&
                        (leaveToDate.isBefore(dateRangeFilter[1]) || leaveToDate.isSame(dateRangeFilter[1]));
                } else if (dateRangeFilter[0]) {
                    const leaveFromDate = dayjs(leave.fromDate);
                    matchesDateRange = leaveFromDate.isAfter(dateRangeFilter[0]) || leaveFromDate.isSame(dateRangeFilter[0]);
                } else if (dateRangeFilter[1]) {
                    const leaveToDate = dayjs(leave.toDate);
                    matchesDateRange = leaveToDate.isBefore(dateRangeFilter[1]) || leaveToDate.isSame(dateRangeFilter[1]);
                }
            }

            return matchesSearch && matchesEmployee && matchesStatus && matchesLeaveType && matchesDateRange;
        });
    };

    const exportToCSV = () => {
        const filteredData = getFilteredData();
        const csvContent = [
            ["Leave Type", "Employee Name", "From Date", "To Date", "Days", "Reason", "Status"],
            ...filteredData.map(leave => [
                leave.leaveType,
                leave.employee,
                leave.fromDate,
                leave.toDate,
                leave.days,
                leave.reason,
                leave.status,
            ])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "leave_requests.csv";
        a.click();
        window.URL.revokeObjectURL(url);
        message.success("Exported to CSV successfully!");
    };

    const exportToExcel = () => {
        exportToCSV();
        const a = document.createElement("a");
        a.download = "leave_requests.xlsx";
        a.click();
    };

    const handlePrint = () => {
        window.print();
        message.success("Print dialog opened!");
    };

    const exportToPDF = () => {
        message.info("PDF export functionality requires additional setup.");
    };

    return (
        <DashboardLayout
            businessName="BabaERP Pro"
            breadcrumbs={[
                { label: "Home", icon: <HomeOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <TeamOutlined />, path: "/hms" },
                { label: "Leave Management", icon: <FileTextOutlined /> },
            ]}
        >
            <div style={{ padding: "24px" }}>
                <Card
                    style={{
                        marginBottom: "24px",
                        background: isDark ? "#1f1f1f" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9"
                    }}
                    bodyStyle={{ padding: "16px" }}
                >
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px",
                        alignItems: "center"
                    }}>
                        <Button
                            type="primary"
                            icon={<HomeOutlined />}
                            onClick={() => navigate("/hms")}
                            style={{
                                background: "#1890ff",
                                borderColor: "#1890ff"
                            }}
                        >
                            HRM
                        </Button>
                        <Button
                            icon={<FileTextOutlined />}
                            onClick={() => navigate("/hms/leave-type")}
                        >
                            Leave Type
                        </Button>
                        <Button
                            icon={<FileTextOutlined />}
                            onClick={() => navigate("/hms/leave")}
                            style={{
                                background: "#1890ff",
                                borderColor: "#1890ff",
                                color: "#ffffff"
                            }}
                        >
                            Leave
                        </Button>
                        <Button
                            icon={<ClockCircleOutlined />}
                            onClick={() => navigate("/hms/attendance")}
                        >
                            Attendance
                        </Button>
                        <Button
                            icon={<DollarOutlined />}
                            onClick={() => navigate("/hms/payroll")}
                        >
                            Payroll
                        </Button>
                        <Button
                            icon={<CalendarOutlined />}
                            onClick={() => navigate("/hms/holiday")}
                        >
                            Holiday
                        </Button>
                        <Button
                            icon={<TeamOutlined />}
                            onClick={() => navigate("/hms/departments")}
                        >
                            Departments
                        </Button>
                        <Button
                            icon={<UserOutlined />}
                            onClick={() => navigate("/hms/designations")}
                        >
                            Designations
                        </Button>
                        <Button
                            icon={<TrophyOutlined />}
                            onClick={() => navigate("/hms/sales-targets")}
                        >
                            Sales Targets
                        </Button>
                        <Button
                            icon={<UserOutlined />}
                            onClick={() => navigate("/hms/settings")}
                        >
                            Settings
                        </Button>
                    </div>
                </Card>
                <Card
                    title={
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "10px",
                                    background: "linear-gradient(135deg, #1890ff20 0%, #1890ff10 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#1890ff",
                                    fontSize: "18px",
                                    border: "1px solid #1890ff30",
                                }}
                            >
                                📅
                            </div>
                            <span style={{ fontSize: "20px", fontWeight: 600, color: isDark ? "#fff" : "#1f1f1f" }}>
                                Leave Management
                            </span>
                        </div>
                    }
                    extra={
                        <Space>
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={handleAdd}
                                style={{ borderRadius: "6px" }}
                            >
                                Add Leave
                            </Button>
                        </Space>
                    }
                    style={{
                        background: isDark ? "#1f1f1f" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                        borderRadius: "12px",
                        boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                >
                    {/* Filters Section */}
                    <div style={{
                        marginBottom: "24px",
                        padding: "16px",
                        background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                        borderRadius: "8px",
                        border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #f0f0f0",
                    }}>
                        <Row gutter={[16, 16]} align="middle">
                            <Col xs={24} sm={12} md={6}>
                                <Select
                                    placeholder="Employee"
                                    value={employeeFilter}
                                    onChange={setEmployeeFilter}
                                    style={{ width: "100%" }}
                                    options={employeeOptions}
                                />
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Select
                                    placeholder="Status"
                                    value={statusFilter}
                                    onChange={setStatusFilter}
                                    style={{ width: "100%" }}
                                    options={statusOptions}
                                />
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Select
                                    placeholder="Leave Type"
                                    value={leaveTypeFilter}
                                    onChange={setLeaveTypeFilter}
                                    style={{ width: "100%" }}
                                    options={leaveTypeOptions}
                                />
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <RangePicker
                                    placeholder={["Start Date", "End Date"]}
                                    value={dateRangeFilter}
                                    onChange={setDateRangeFilter}
                                    style={{ width: "100%" }}
                                />
                            </Col>
                        </Row>
                    </div>

                    {/* Search and Export Controls */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
                        flexWrap: "wrap",
                        gap: "12px"
                    }}>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                            <Input
                                placeholder="Search leave requests..."
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={handleSearch}
                                style={{
                                    width: "300px",
                                    borderRadius: "6px",
                                }}
                            />
                            <Button
                                icon={<FilterOutlined />}
                                onClick={clearFilters}
                                style={{ borderRadius: "6px" }}
                            >
                                Clear Filters
                            </Button>
                        </div>

                        <Space>
                            <Button onClick={exportToCSV}>Export to CSV</Button>
                            <Button onClick={exportToExcel}>Export to Excel</Button>
                            <Button onClick={handlePrint}>Print</Button>
                            <Button onClick={exportToPDF}>Export to PDF</Button>
                        </Space>
                    </div>

                    {/* Table */}
                    <Table
                        columns={columns}
                        dataSource={getFilteredData()}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            total: getFilteredData().length,
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                        }}
                        style={{
                            background: isDark ? "#1f1f1f" : "#ffffff",
                        }}
                        scroll={{ x: 1000 }}
                    />
                </Card>

                {/* Add/Edit Modal */}
                <AddModal
                    open={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSave={handleSave}
                    title={editingLeave ? "Edit Leave Request" : "Add New Leave Request"}
                    fields={formFields}
                    loading={loading}
                    width={600}
                />
            </div>
        </DashboardLayout>
    );
};

export default LeavePage;