import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, Button, Space, Input, Select, DatePicker, message, Popconfirm, Row, Col } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, FilterOutlined, HomeOutlined, FileTextOutlined, CalendarOutlined, TeamOutlined, UserOutlined, TrophyOutlined } from "@ant-design/icons";
import AddModal, { type FormField } from "@/components/modals/AddModal";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';

// Extend dayjs with isBetween plugin
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

interface Holiday {
    id: string;
    name: string;
    date: string;
    businessLocation: string;
    note: string;
    createdAt: string;
    updatedAt: string;
}

const HolidayPage: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
    const [searchText, setSearchText] = useState("");

    // Filter states
    const [businessLocationFilter, setBusinessLocationFilter] = useState<string>("");
    const [dateRangeFilter, setDateRangeFilter] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);

    const formFields: FormField[] = [
        {
            name: "name",
            label: "Holiday Name",
            type: "text",
            placeholder: "Enter holiday name",
            required: true,
        },
        {
            name: "date",
            label: "Date",
            type: "date",
            placeholder: "Select holiday date",
            required: true,
        },
        {
            name: "businessLocation",
            label: "Business Location",
            type: "select",
            placeholder: "Select business location",
            required: true,
            options: [
                { label: "All Locations", value: "all" },
                { label: "Head Office", value: "head_office" },
                { label: "Branch A", value: "branch_a" },
                { label: "Branch B", value: "branch_b" },
                { label: "Remote", value: "remote" },
            ],
        },
        {
            name: "note",
            label: "Note",
            type: "textarea",
            placeholder: "Enter additional notes (optional)",
            required: false,
        },
    ];

    const businessLocationOptions = [
        { label: "All", value: "" },
        { label: "Head Office", value: "head_office" },
        { label: "Branch A", value: "branch_a" },
        { label: "Branch B", value: "branch_b" },
        { label: "Remote", value: "remote" },
    ];

    // Mock data for demonstration
    const mockHolidays: Holiday[] = [
        {
            id: "1",
            name: "New Year's Day",
            date: "2026-01-01",
            businessLocation: "all",
            note: "Public holiday for all locations",
            createdAt: "2025-12-01T10:00:00Z",
            updatedAt: "2025-12-01T10:00:00Z",
        },
        {
            id: "2",
            name: "Independence Day",
            date: "2026-07-04",
            businessLocation: "all",
            note: "National holiday",
            createdAt: "2025-12-01T10:00:00Z",
            updatedAt: "2025-12-01T10:00:00Z",
        },
        {
            id: "3",
            name: "Christmas Day",
            date: "2026-12-25",
            businessLocation: "all",
            note: "Public holiday for all locations",
            createdAt: "2025-12-01T10:00:00Z",
            updatedAt: "2025-12-01T10:00:00Z",
        },
    ];

    React.useEffect(() => {
        setHolidays(mockHolidays);
    }, []);

    // Filter holidays based on search and filters
    const filteredHolidays = holidays.filter((holiday) => {
        const matchesSearch = holiday.name.toLowerCase().includes(searchText.toLowerCase()) ||
            holiday.note.toLowerCase().includes(searchText.toLowerCase());
        const matchesLocation = !businessLocationFilter || holiday.businessLocation === businessLocationFilter;
        const matchesDateRange = !dateRangeFilter ||
            (dateRangeFilter[0] && dateRangeFilter[1] &&
                dayjs(holiday.date).isBetween(dateRangeFilter[0], dateRangeFilter[1], 'day', '[]'));

        return matchesSearch && matchesLocation && matchesDateRange;
    });

    const handleAdd = () => {
        setEditingHoliday(null);
        setModalVisible(true);
    };

    const handleEdit = (holiday: Holiday) => {
        setEditingHoliday(holiday);
        setModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            setHolidays(holidays.filter(h => h.id !== id));
            message.success("Holiday deleted successfully");
        } catch (error) {
            message.error("Failed to delete holiday");
        }
    };

    const handleSave = async (values: any) => {
        try {
            setLoading(true);

            if (editingHoliday) {
                // Update existing holiday
                setHolidays(holidays.map(h =>
                    h.id === editingHoliday.id
                        ? {
                            ...h,
                            ...values,
                            date: values.date.format('YYYY-MM-DD'),
                            updatedAt: new Date().toISOString()
                        }
                        : h
                ));
                message.success("Holiday updated successfully");
            } else {
                // Add new holiday
                const newHoliday: Holiday = {
                    id: Date.now().toString(),
                    ...values,
                    date: values.date.format('YYYY-MM-DD'),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                setHolidays([...holidays, newHoliday]);
                message.success("Holiday added successfully");
            }

            setModalVisible(false);
            setEditingHoliday(null);
        } catch (error) {
            message.error("Failed to save holiday");
        } finally {
            setLoading(false);
        }
    };

    const getBusinessLocationLabel = (value: string) => {
        const option = businessLocationOptions.find(opt => opt.value === value);
        return option ? option.label : value;
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a: Holiday, b: Holiday) => a.name.localeCompare(b.name),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a: Holiday, b: Holiday) => a.date.localeCompare(b.date),
            render: (date: string) => dayjs(date).format('MMMM DD, YYYY'),
        },
        {
            title: "Business Location",
            dataIndex: "businessLocation",
            key: "businessLocation",
            render: (location: string) => getBusinessLocationLabel(location),
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
            ellipsis: true,
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: Holiday) => (
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
                        title="Are you sure you want to delete this holiday?"
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
                        style={{
                            background: "#1890ff",
                            borderColor: "#1890ff",
                            color: "#ffffff"
                        }}
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

            {/* Main Content */}
            <Card
                title="All Holidays"
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
                        Add Holiday
                    </Button>
                }
            >
                {/* Filters */}
                <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
                    <Col xs={24} sm={12} md={6}>
                        <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>
                            Business Location
                        </label>
                        <Select
                            placeholder="Select location"
                            value={businessLocationFilter}
                            onChange={setBusinessLocationFilter}
                            style={{ width: "100%" }}
                            options={businessLocationOptions}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>
                            Date Range
                        </label>
                        <RangePicker
                            value={dateRangeFilter}
                            onChange={setDateRangeFilter}
                            style={{ width: "100%" }}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>
                            Search
                        </label>
                        <Input
                            placeholder="Search holidays..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", color: isDark ? "rgba(255,255,255,0.85)" : "inherit" }}>
                            &nbsp;
                        </label>
                        <Button
                            icon={<FilterOutlined />}
                            onClick={() => {
                                setBusinessLocationFilter("");
                                setDateRangeFilter(null);
                                setSearchText("");
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Col>
                </Row>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={filteredHolidays}
                    rowKey="id"
                    pagination={{
                        total: filteredHolidays.length,
                        pageSize: 25,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    scroll={{ x: 800 }}
                />
            </Card>

            {/* Add/Edit Modal */}
            <AddModal
                open={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setEditingHoliday(null);
                }}
                onSave={handleSave}
                title={editingHoliday ? "Edit Holiday" : "Add New Holiday"}
                fields={formFields}
                loading={loading}
            />
        </div>
    );
};

export default HolidayPage;