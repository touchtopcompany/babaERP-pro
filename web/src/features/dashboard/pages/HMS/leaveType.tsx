import React, { useState } from "react";
import { Card, Table, Button, Space, Input, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, HomeOutlined, FileTextOutlined, ClockCircleOutlined, DollarOutlined, CalendarOutlined, TeamOutlined, UserOutlined, TrophyOutlined } from "@ant-design/icons";
import AddModal, { type FormField } from "@/components/modals/AddModal";
import useTheme from "@/theme/useTheme";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

interface LeaveType {
    id: string;
    leaveType: string;
    maxLeaveCount: number;
    leaveInterval: string;
    createdAt: string;
    updatedAt: string;
}

const LeaveTypePage: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingType, setEditingType] = useState<LeaveType | null>(null);
    const [searchText, setSearchText] = useState("");

    const formFields: FormField[] = [
        {
            name: "leaveType",
            label: "Leave Type",
            type: "text",
            placeholder: "e.g., Annual Leave, Sick Leave",
            required: true,
        },
        {
            name: "maxLeaveCount",
            label: "Max Leave Count",
            type: "number",
            placeholder: "e.g., 21",
            required: true,
            rules: [
                { required: true, message: "Please enter max leave count" },
                { type: "number", min: 1, message: "Leave count must be at least 1" },
                { type: "number", max: 365, message: "Leave count cannot exceed 365" },
            ],
        },
        {
            name: "leaveInterval",
            label: "Leave count interval",
            type: "radio-group",
            options: [
                { label: "Current month", value: "current_month" },
                { label: "Current financial year", value: "current_financial_year" },
                { label: "None", value: "none" },
            ],
            required: true,
        },
    ];

    const columns = [
        {
            title: "Leave Type",
            dataIndex: "leaveType",
            key: "leaveType",
            sorter: (a: LeaveType, b: LeaveType) => a.leaveType.localeCompare(b.leaveType),
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value: any, record: LeaveType) =>
                record.leaveType.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "Max Leave Count",
            dataIndex: "maxLeaveCount",
            key: "maxLeaveCount",
            sorter: (a: LeaveType, b: LeaveType) => a.maxLeaveCount - b.maxLeaveCount,
            render: (count: number) => `${count} days`,
        },
        {
            title: "Action",
            key: "action",
            width: 120,
            render: (_: any, record: LeaveType) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ color: "#1890ff" }}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this leave type?"
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
        setEditingType(null);
        setModalVisible(true);
    };

    const handleEdit = (record: LeaveType) => {
        setEditingType(record);
        setModalVisible(true);
    };

    const handleSave = async (values: any) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (editingType) {
                // Update existing leave type
                setLeaveTypes(prev =>
                    prev.map(type =>
                        type.id === editingType.id
                            ? { ...type, ...values, updatedAt: new Date().toISOString() }
                            : type
                    )
                );
                message.success("Leave type updated successfully!");
            } else {
                // Add new leave type
                const newLeaveType: LeaveType = {
                    id: Date.now().toString(),
                    ...values,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                setLeaveTypes(prev => [...prev, newLeaveType]);
                message.success("Leave type added successfully!");
            }

            setModalVisible(false);
        } catch (error) {
            message.error("Failed to save leave type. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            setLeaveTypes(prev => prev.filter(type => type.id !== id));
            message.success("Leave type deleted successfully!");
        } catch (error) {
            message.error("Failed to delete leave type. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const exportToCSV = () => {
        const csvContent = [
            ["Leave Type", "Max Leave Count"],
            ...leaveTypes.map(type => [type.leaveType, type.maxLeaveCount])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "leave_types.csv";
        a.click();
        window.URL.revokeObjectURL(url);
        message.success("Exported to CSV successfully!");
    };

    const exportToExcel = () => {
        // For Excel export, you would typically use a library like xlsx
        // For now, we'll export as CSV with .xlsx extension
        exportToCSV();
        const a = document.createElement("a");
        a.download = "leave_types.xlsx";
        a.click();
    };

    const handlePrint = () => {
        window.print();
        message.success("Print dialog opened!");
    };

    const exportToPDF = () => {
        // For PDF export, you would typically use a library like jspdf
        message.info("PDF export functionality requires additional setup.");
    };

    return (
        <DashboardLayout
            businessName="BabaERP Pro"
            breadcrumbs={[
                { label: "Home", icon: <HomeOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <TeamOutlined />, path: "/hms" },
                { label: "Leave Type Management", icon: <FileTextOutlined /> },
            ]}
        >
            {/* HRM Navigation Menu */}
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
                        style={{
                            background: "#1890ff",
                            borderColor: "#1890ff",
                            color: "#ffffff"
                        }}
                    >
                        Leave Type
                    </Button>
                    <Button
                        icon={<FileTextOutlined />}
                        onClick={() => navigate("/hms/leave")}
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
                            📋
                        </div>
                        <span style={{ fontSize: "20px", fontWeight: 600, color: isDark ? "#fff" : "#1f1f1f" }}>
                            Leave Type Management
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
                            Add Leave Type
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
                {/* Search and Export Controls */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                    flexWrap: "wrap",
                    gap: "12px"
                }}>
                    <Input
                        placeholder="Search leave types..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={handleSearch}
                        style={{
                            width: "300px",
                            borderRadius: "6px",
                        }}
                    />

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
                    dataSource={leaveTypes}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        total: leaveTypes.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    style={{
                        background: isDark ? "#1f1f1f" : "#ffffff",
                    }}
                    scroll={{ x: 800 }}
                />
            </Card>

            {/* Add/Edit Modal */}
            <AddModal
                open={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSave}
                title={editingType ? "Edit Leave Type" : "Add New Leave Type"}
                fields={formFields}
                loading={loading}
                width={600}
            />
        </DashboardLayout>
    );
};

export default LeaveTypePage;