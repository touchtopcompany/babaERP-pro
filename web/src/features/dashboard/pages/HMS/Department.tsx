import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, Button, Space, Input, message, Popconfirm, Row, Col } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, HomeOutlined, FileTextOutlined, CalendarOutlined, TeamOutlined, UserOutlined, TrophyOutlined } from "@ant-design/icons";
import AddModal, { type FormField } from "@/components/modals/AddModal";
import useTheme from "@/theme/useTheme";

interface Department {
    id: string;
    name: string;
    departmentId: string;
    description: string;
    status: "active" | "inactive";
    headOfDepartment: string;
    employeeCount: number;
    createdAt: string;
    updatedAt: string;
}

const DepartmentPage: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
    const [searchText, setSearchText] = useState("");

    const formFields: FormField[] = [
        {
            name: "name",
            label: "Department Name",
            type: "text",
            placeholder: "Enter department name",
            required: true,
        },
        {
            name: "departmentId",
            label: "Department ID",
            type: "text",
            placeholder: "Enter department ID (e.g., DEPT001)",
            required: true,
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            placeholder: "Enter department description",
            required: true,
        },
    ];

    // Mock data for demonstration
    const mockDepartments: Department[] = [
        {
            id: "1",
            name: "Human Resources",
            departmentId: "HR001",
            description: "Manages employee relations, recruitment, and HR policies",
            status: "active",
            headOfDepartment: "Sarah Johnson",
            employeeCount: 12,
            createdAt: "2025-01-01T10:00:00Z",
            updatedAt: "2025-01-01T10:00:00Z",
        },
        {
            id: "2",
            name: "Information Technology",
            departmentId: "IT001",
            description: "Handles technology infrastructure, software development, and IT support",
            status: "active",
            headOfDepartment: "Michael Chen",
            employeeCount: 25,
            createdAt: "2025-01-01T10:00:00Z",
            updatedAt: "2025-01-01T10:00:00Z",
        },
        {
            id: "3",
            name: "Finance",
            departmentId: "FIN001",
            description: "Manages financial planning, budgeting, and accounting operations",
            status: "active",
            headOfDepartment: "Emily Davis",
            employeeCount: 18,
            createdAt: "2025-01-01T10:00:00Z",
            updatedAt: "2025-01-01T10:00:00Z",
        },
        {
            id: "4",
            name: "Marketing",
            departmentId: "MKT001",
            description: "Develops marketing strategies and manages brand promotion",
            status: "active",
            headOfDepartment: "Robert Wilson",
            employeeCount: 15,
            createdAt: "2025-01-01T10:00:00Z",
            updatedAt: "2025-01-01T10:00:00Z",
        },
        {
            id: "5",
            name: "Sales",
            departmentId: "SAL001",
            description: "Handles sales operations and customer relationship management",
            status: "active",
            headOfDepartment: "Lisa Anderson",
            employeeCount: 32,
            createdAt: "2025-01-01T10:00:00Z",
            updatedAt: "2025-01-01T10:00:00Z",
        },
        {
            id: "6",
            name: "Operations",
            departmentId: "OPS001",
            description: "Manages day-to-day operations and process optimization",
            status: "inactive",
            headOfDepartment: "James Taylor",
            employeeCount: 20,
            createdAt: "2025-01-01T10:00:00Z",
            updatedAt: "2025-01-01T10:00:00Z",
        },
    ];

    React.useEffect(() => {
        setDepartments(mockDepartments);
    }, []);

    // Filter departments based on search
    const filteredDepartments = departments.filter((department) => {
        const matchesSearch = department.name.toLowerCase().includes(searchText.toLowerCase()) ||
            department.departmentId.toLowerCase().includes(searchText.toLowerCase()) ||
            department.description.toLowerCase().includes(searchText.toLowerCase());

        return matchesSearch;
    });

    const handleAdd = () => {
        setEditingDepartment(null);
        setModalVisible(true);
    };

    const handleEdit = (department: Department) => {
        setEditingDepartment(department);
        setModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            setDepartments(departments.filter(d => d.id !== id));
            message.success("Department deleted successfully");
        } catch (error) {
            message.error("Failed to delete department");
        }
    };

    const handleSave = async (values: any) => {
        try {
            setLoading(true);

            if (editingDepartment) {
                // Update existing department
                setDepartments(departments.map(d =>
                    d.id === editingDepartment.id
                        ? {
                            ...d,
                            ...values,
                            updatedAt: new Date().toISOString()
                        }
                        : d
                ));
                message.success("Department updated successfully");
            } else {
                // Add new department
                const newDepartment: Department = {
                    id: Date.now().toString(),
                    ...values,
                    employeeCount: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                setDepartments([...departments, newDepartment]);
                message.success("Department added successfully");
            }

            setModalVisible(false);
            setEditingDepartment(null);
        } catch (error) {
            message.error("Failed to save department");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "Department",
            dataIndex: "name",
            key: "name",
            sorter: (a: Department, b: Department) => a.name.localeCompare(b.name),
            render: (text: string, record: Department) => (
                <div>
                    <div style={{ fontWeight: 500, color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>
                        {text}
                    </div>
                    <div style={{ fontSize: "12px", color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }}>
                        {record.employeeCount} employees
                    </div>
                </div>
            ),
        },
        {
            title: "Department ID",
            dataIndex: "departmentId",
            key: "departmentId",
            sorter: (a: Department, b: Department) => a.departmentId.localeCompare(b.departmentId),
            render: (text: string) => (
                <span style={{ fontFamily: "monospace", backgroundColor: isDark ? "#262626" : "#f5f5f5", padding: "2px 6px", borderRadius: "4px" }}>
                    {text}
                </span>
            ),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            render: (text: string) => (
                <div style={{ maxWidth: "300px" }} title={text}>
                    {text}
                </div>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: Department) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ color: "#1890ff" }}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this department?"
                        description="This action cannot be undone."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{
            padding: "24px",
            background: isDark ? "#141414" : "#f5f5f5",
            minHeight: "100vh"
        }}>
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
                        icon={<CalendarOutlined />}
                        onClick={() => navigate("/hms/attendance")}
                    >
                        Attendance
                    </Button>
                    <Button
                        icon={<CalendarOutlined />}
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
                        style={{
                            background: "#1890ff",
                            borderColor: "#1890ff",
                            color: "#ffffff"
                        }}
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

            {/* Main Content */}
            <Card
                title="All Departments"
                style={{
                    background: isDark ? "#1f1f1f" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9"
                }}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Add Department
                    </Button>
                }
            >
                {/* Filters */}
                <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
                    <Col xs={24} sm={12} md={6}>
                        <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>
                            Search
                        </label>
                        <Input
                            placeholder="Search departments..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                </Row>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={filteredDepartments}
                    rowKey="id"
                    pagination={{
                        total: filteredDepartments.length,
                        pageSize: 25,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>

            {/* Add/Edit Modal */}
            <AddModal
                open={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setEditingDepartment(null);
                }}
                onSave={handleSave}
                title={editingDepartment ? "Edit Department" : "Add New Department"}
                fields={formFields}
                loading={loading}
            />
        </div>
    );
};

export default DepartmentPage;