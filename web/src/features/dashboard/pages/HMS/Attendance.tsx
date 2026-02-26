import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    Card,
    Table,
    Button,
    Input,
    Select,
    DatePicker,
    Space,
    Tag,
    Modal,
    Form,
    TimePicker,
    Switch,
    message,
    Tabs,
    Row,
    Col
} from "antd";
import {
    PlusOutlined,
    ExportOutlined,
    PrinterOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Shift {
    id: string;
    name: string;
    shiftType: string;
    startTime: string;
    endTime: string;
    holiday: boolean;
}

const Attendance: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeTab, setActiveTab] = useState("shifts");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isClockInModalVisible, setIsClockInModalVisible] = useState(false);
    const [clockInNote, setClockInNote] = useState<string>('');
    const [userIpAddress, setUserIpAddress] = useState<string>('');
    const [editingShift, setEditingShift] = useState<Shift | null>(null);
    const [form] = Form.useForm();

    // Mock data for shifts
    const [shifts, setShifts] = useState<Shift[]>([
        {
            id: "1",
            name: "Morning Shift",
            shiftType: "Regular",
            startTime: "09:00",
            endTime: "17:00",
            holiday: false
        },
        {
            id: "2",
            name: "Night Shift",
            shiftType: "Overtime",
            startTime: "18:00",
            endTime: "02:00",
            holiday: false
        }
    ]);

    // Mock attendance data
    const attendanceData = [
        {
            id: "1",
            date: "2024-02-25",
            employeeName: "John Doe",
            checkIn: "09:00 AM",
            checkOut: "17:00 PM",
            workDuration: "8h 0m",
            ipAddress: "192.168.1.100",
            shift: "Morning Shift"
        },
        {
            id: "2",
            date: "2024-02-25",
            employeeName: "Jane Smith",
            checkIn: "08:45 AM",
            checkOut: "17:15 PM",
            workDuration: "8h 30m",
            ipAddress: "192.168.1.101",
            shift: "Morning Shift"
        },
        {
            id: "3",
            date: "2024-02-24",
            employeeName: "Bob Johnson",
            checkIn: "09:15 AM",
            checkOut: "17:30 PM",
            workDuration: "8h 15m",
            ipAddress: "192.168.1.102",
            shift: "Morning Shift"
        }
    ];

    const shiftColumns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Shift Type",
            dataIndex: "shiftType",
            key: "shiftType",
            render: (type: string) => (
                <Tag color={type === "Regular" ? "green" : "blue"}>
                    {type}
                </Tag>
            ),
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            key: "endTime",
        },
        {
            title: "Holiday",
            dataIndex: "holiday",
            key: "holiday",
            render: (isHoliday: boolean) => (
                <Tag color={isHoliday ? "red" : "green"}>
                    {isHoliday ? "Yes" : "No"}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: Shift) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const attendanceColumns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a: any, b: any) => a.date.localeCompare(b.date),
        },
        {
            title: "Employee",
            dataIndex: "employeeName",
            key: "employeeName",
            sorter: (a: any, b: any) => a.employeeName.localeCompare(b.employeeName),
        },
        {
            title: "Clock In",
            dataIndex: "checkIn",
            key: "checkIn",
            sorter: (a: any, b: any) => a.checkIn.localeCompare(b.checkIn),
        },
        {
            title: "Clock Out",
            dataIndex: "checkOut",
            key: "checkOut",
            sorter: (a: any, b: any) => a.checkOut.localeCompare(b.checkOut),
        },
        {
            title: "Work Duration",
            dataIndex: "workDuration",
            key: "workDuration",
            sorter: (a: any, b: any) => a.workDuration.localeCompare(b.workDuration),
        },
        {
            title: "IP Address",
            dataIndex: "ipAddress",
            key: "ipAddress",
        },
        {
            title: "Shift",
            dataIndex: "shift",
            key: "shift",
            render: (shift: string) => (
                <Tag color="blue">{shift}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any) => (
                <Space size="middle">
                    <Button type="link" size="small">View</Button>
                    <Button type="link" size="small">Edit</Button>
                    <Button type="link" danger size="small">Delete</Button>
                </Space>
            ),
        },
    ];

    const handleAdd = () => {
        setEditingShift(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (shift: Shift) => {
        setEditingShift(shift);
        form.setFieldsValue({
            ...shift,
            startTime: dayjs(shift.startTime, "HH:mm"),
            endTime: dayjs(shift.endTime, "HH:mm"),
        });
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this shift?",
            onOk: () => {
                setShifts(shifts.filter(shift => shift.id !== id));
                message.success("Shift deleted successfully");
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            const newShift: Shift = {
                id: editingShift ? editingShift.id : Date.now().toString(),
                name: values.name,
                shiftType: values.shiftType,
                startTime: values.startTime.format("HH:mm"),
                endTime: values.endTime.format("HH:mm"),
                holiday: values.holiday || false,
            };

            if (editingShift) {
                setShifts(shifts.map(shift =>
                    shift.id === editingShift.id ? newShift : shift
                ));
                message.success("Shift updated successfully");
            } else {
                setShifts([...shifts, newShift]);
                message.success("Shift added successfully");
            }

            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleClockIn = () => {
        getUserIpAddress();
        setIsClockInModalVisible(true);
    };

    const getUserIpAddress = async () => {
        try {
            // Try to get IP from a public API
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setUserIpAddress(data.ip);
        } catch (error) {
            // Fallback to a common local IP pattern if API fails
            setUserIpAddress('192.168.1.' + Math.floor(Math.random() * 254 + 1));
        }
    };

    const handleClockInSubmit = () => {
        message.success("Clocked in successfully!");
        setClockInNote('');
        setIsClockInModalVisible(false);
    };

    const handleClockInClose = () => {
        setClockInNote('');
        setIsClockInModalVisible(false);
    };

    const tabItems = [
        {
            key: "shifts",
            label: "Shifts",
            children: (
                <div>
                    <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Space>
                            <Search placeholder="Search shifts..." style={{ width: 200 }} />
                            <Select defaultValue="25" style={{ width: 120 }}>
                                <Option value="25">Show 25</Option>
                                <Option value="50">Show 50</Option>
                                <Option value="100">Show 100</Option>
                            </Select>
                        </Space>
                        <Space>
                            <Button icon={<ExportOutlined />}>Export to CSV</Button>
                            <Button icon={<ExportOutlined />}>Export to Excel</Button>
                            <Button icon={<PrinterOutlined />}>Print</Button>
                            <Button icon={<EyeOutlined />}>Column visibility</Button>
                            <Button icon={<ExportOutlined />}>Export to PDF</Button>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleAdd}
                            >
                                Add
                            </Button>
                        </Space>
                    </div>
                    <Table
                        columns={shiftColumns}
                        dataSource={shifts}
                        rowKey="id"
                        pagination={{
                            total: shifts.length,
                            pageSize: 25,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                    />
                </div>
            ),
        },
        {
            key: "all-attendance",
            label: "All Attendance",
            children: (
                <div>
                    <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Space>
                            <Select placeholder="Employees" style={{ width: 150 }}>
                                <Option value="all">All Employees</Option>
                                <Option value="john">John Doe</Option>
                                <Option value="jane">Jane Smith</Option>
                                <Option value="bob">Bob Johnson</Option>
                            </Select>
                            <RangePicker placeholder={["Start date", "End date"]} />
                            <Select defaultValue="25" style={{ width: 120 }}>
                                <Option value="25">Show 25</Option>
                                <Option value="50">Show 50</Option>
                                <Option value="100">Show 100</Option>
                            </Select>
                        </Space>
                        <Space>
                            <Button icon={<ExportOutlined />}>Export</Button>
                            <Button icon={<PrinterOutlined />}>Print</Button>
                            <Button icon={<EyeOutlined />}>Column visibility</Button>
                            <Button icon={<ExportOutlined />}>Copy</Button>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                            >
                                Add latest attendance
                            </Button>
                        </Space>
                    </div>
                    <Table
                        columns={attendanceColumns}
                        dataSource={attendanceData}
                        rowKey="id"
                        pagination={{
                            total: attendanceData.length,
                            pageSize: 25,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                    />
                </div>
            ),
        },
        {
            key: "attendance-by-shift",
            label: "Attendance by shift",
            children: (
                <div>
                    <div style={{ marginBottom: 16 }}>
                        <DatePicker defaultValue={dayjs()} />
                    </div>
                    <Table
                        columns={[
                            {
                                title: "Shift",
                                dataIndex: "shift",
                                key: "shift",
                            },
                            {
                                title: "Present",
                                dataIndex: "present",
                                key: "present",
                            },
                            {
                                title: "Absent",
                                dataIndex: "absent",
                                key: "absent",
                            },
                        ]}
                        dataSource={[
                            { key: "1", shift: "Morning Shift", present: 15, absent: 2 },
                            { key: "2", shift: "Night Shift", present: 8, absent: 1 },
                        ]}
                        rowKey="key"
                        pagination={false}
                    />
                </div>
            ),
        },
        {
            key: "attendance-by-date",
            label: "Attendance by date",
            children: (
                <div>
                    <div style={{ marginBottom: 16 }}>
                        <RangePicker placeholder={["Start date", "End date"]} />
                    </div>
                    <Table
                        columns={[
                            {
                                title: "Date",
                                dataIndex: "date",
                                key: "date",
                            },
                            {
                                title: "Present",
                                dataIndex: "present",
                                key: "present",
                            },
                            {
                                title: "Absent",
                                dataIndex: "absent",
                                key: "absent",
                            },
                        ]}
                        dataSource={[
                            { key: "1", date: "2024-02-19", present: 23, absent: 3 },
                            { key: "2", date: "2024-02-20", present: 25, absent: 1 },
                            { key: "3", date: "2024-02-21", present: 22, absent: 4 },
                            { key: "4", date: "2024-02-22", present: 24, absent: 2 },
                            { key: "5", date: "2024-02-23", present: 21, absent: 5 },
                        ]}
                        rowKey="key"
                        pagination={false}
                    />
                </div>
            ),
        },
        {
            key: "import-attendance",
            label: "Import Attendance",
            children: (
                <Card>
                    <h3>Import Attendance Data</h3>
                    <p>Upload a CSV or Excel file containing attendance data.</p>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Space>
                            <Button type="primary" icon={<ExportOutlined />}>
                                Choose File
                            </Button>
                            <Button type="primary">
                                Submit
                            </Button>
                            <Button>Download Template file</Button>
                        </Space>

                        <div style={{ marginTop: 24 }}>
                            <h4>Import File Format</h4>
                            <Table
                                columns={[
                                    {
                                        title: "Column Name",
                                        dataIndex: "column",
                                        key: "column",
                                    },
                                    {
                                        title: "Required/Optional",
                                        dataIndex: "required",
                                        key: "required",
                                        render: (required: string) => (
                                            <Tag color={required === "Required" ? "red" : "blue"}>
                                                {required}
                                            </Tag>
                                        ),
                                    },
                                    {
                                        title: "Format",
                                        dataIndex: "format",
                                        key: "format",
                                    },
                                ]}
                                dataSource={[
                                    {
                                        key: "1",
                                        column: "Email",
                                        required: "Required",
                                        format: "",
                                    },
                                    {
                                        key: "2",
                                        column: "Clock in time",
                                        required: "Required",
                                        format: "Y-m-d H:i:s",
                                    },
                                    {
                                        key: "3",
                                        column: "Clock out time",
                                        required: "Optional",
                                        format: "Y-m-d H:i:s",
                                    },
                                    {
                                        key: "4",
                                        column: "Clock in note",
                                        required: "Optional",
                                        format: "",
                                    },
                                    {
                                        key: "5",
                                        column: "Clock out note",
                                        required: "Optional",
                                        format: "",
                                    },
                                    {
                                        key: "6",
                                        column: "IP Address",
                                        required: "Optional",
                                        format: "",
                                    },
                                ]}
                                pagination={false}
                                size="small"
                            />
                        </div>
                    </Space>
                </Card>
            ),
        },
    ];

    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <div style={{
                padding: "24px",
                background: isDark ? "#141414" : "#f5f5f5",
                minHeight: "100vh"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px"
                }}>
                    <h2 style={{
                        color: isDark ? "rgba(255,255,255,0.85)" : "inherit",
                        margin: 0
                    }}>
                        Attendance Management
                    </h2>
                    <Button
                        type="primary"
                        size="large"
                        icon={<ClockCircleOutlined />}
                        onClick={handleClockIn}
                    >
                        Clock In
                    </Button>
                </div>

                <Card
                    style={{
                        background: isDark ? "#1f1f1f" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9"
                    }}
                >
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={tabItems}
                    />
                </Card>

                <Modal
                    title={editingShift ? "Edit Shift" : "Add New Shift"}
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={() => setIsModalVisible(false)}
                    width={600}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            shiftType: "Regular",
                            holiday: false,
                        }}
                    >
                        <Form.Item
                            name="name"
                            label="Shift Name"
                            rules={[{ required: true, message: "Please input shift name!" }]}
                        >
                            <Input placeholder="Enter shift name" />
                        </Form.Item>

                        <Form.Item
                            name="shiftType"
                            label="Shift Type"
                            rules={[{ required: true, message: "Please select shift type!" }]}
                        >
                            <Select placeholder="Select shift type">
                                <Option value="Regular">Regular</Option>
                                <Option value="Overtime">Overtime</Option>
                                <Option value="Weekend">Weekend</Option>
                                <Option value="Holiday">Holiday</Option>
                            </Select>
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="startTime"
                                    label="Start Time"
                                    rules={[{ required: true, message: "Please select start time!" }]}
                                >
                                    <TimePicker
                                        format="HH:mm"
                                        style={{ width: "100%" }}
                                        placeholder="Select start time"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="endTime"
                                    label="End Time"
                                    rules={[{ required: true, message: "Please select end time!" }]}
                                >
                                    <TimePicker
                                        format="HH:mm"
                                        style={{ width: "100%" }}
                                        placeholder="Select end time"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="holiday"
                            label="Holiday Shift"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Clock In"
                    open={isClockInModalVisible}
                    onOk={handleClockInSubmit}
                    onCancel={handleClockInClose}
                    footer={[
                        <Button key="close" onClick={handleClockInClose}>
                            Close
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleClockInSubmit}>
                            Submit
                        </Button>,
                    ]}
                >
                    <div style={{ marginBottom: 16 }}>
                        <strong>IP Address:</strong> {userIpAddress || 'Detecting...'}
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8 }}>
                            <strong>Clock in note:</strong>
                        </label>
                        <Input.TextArea
                            value={clockInNote}
                            onChange={(e) => setClockInNote(e.target.value)}
                            placeholder="Clock in note"
                            rows={4}
                            style={{ width: '100%' }}
                        />
                    </div>
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Attendance;