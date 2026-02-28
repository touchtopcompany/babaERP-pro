import React, { useState, useEffect } from "react";
import {
    Card,
    Select,
    DatePicker,
    Button,
    Table,
    Dropdown,
    Input,
    Tag
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
    ExportOutlined,
    PrinterOutlined,
    EyeOutlined,
    SearchOutlined,
    AppstoreOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Search } = Input;

interface Task {
    id: string;
    action: string;
    project: string;
    subject: string;
    assignedTo: string;
    priority: "Low" | "Medium" | "High" | "Critical";
    startDate: string;
    dueDate: string;
    status: "Pending" | "In Progress" | "Completed" | "On Hold" | "Cancelled";
    assignedBy: string;
    customField1?: string;
    customField2?: string;
    customField3?: string;
}

const MyTasks: React.FC = () => {
    const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
    const [loading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    // Filter states
    const [projectFilter, setProjectFilter] = useState<string>("");
    const [assignedToFilter, setAssignedToFilter] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [priorityFilter, setPriorityFilter] = useState<string>("");
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const [searchText, setSearchText] = useState<string>("");

    // Mock data - replace with actual API call
    useEffect(() => {
        const mockTasks: Task[] = [
            {
                id: "1",
                action: "Edit",
                project: "Website Redesign",
                subject: "Create homepage mockup",
                assignedTo: "John Doe",
                priority: "High",
                startDate: "2024-02-15",
                dueDate: "2024-02-28",
                status: "In Progress",
                assignedBy: "Jane Smith",
                customField1: "Design Team",
                customField2: "Phase 1",
                customField3: "Client Review"
            },
            {
                id: "2",
                action: "View",
                project: "Mobile App",
                subject: "Fix login issue",
                assignedTo: "Alice Johnson",
                priority: "Critical",
                startDate: "2024-02-10",
                dueDate: "2024-02-20",
                status: "Pending",
                assignedBy: "Bob Wilson",
                customField1: "Backend",
                customField2: "Bug Fix",
                customField3: "High Priority"
            }
        ];

        setTasks(mockTasks);
        setFilteredTasks(mockTasks);
    }, []);

    // Apply filters
    useEffect(() => {
        let filtered = [...tasks];

        if (projectFilter) {
            filtered = filtered.filter(task => task.project === projectFilter);
        }
        if (assignedToFilter) {
            filtered = filtered.filter(task => task.assignedTo === assignedToFilter);
        }
        if (statusFilter) {
            filtered = filtered.filter(task => task.status === statusFilter);
        }
        if (priorityFilter) {
            filtered = filtered.filter(task => task.priority === priorityFilter);
        }
        if (dateRange && dateRange[0] && dateRange[1]) {
            filtered = filtered.filter(task => {
                const taskDate = dayjs(task.dueDate);
                return taskDate.isAfter(dateRange[0]) && taskDate.isBefore(dateRange[1]);
            });
        }
        if (searchText) {
            filtered = filtered.filter(task =>
                task.subject.toLowerCase().includes(searchText.toLowerCase()) ||
                task.project.toLowerCase().includes(searchText.toLowerCase()) ||
                task.assignedTo.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredTasks(filtered);
    }, [tasks, projectFilter, assignedToFilter, statusFilter, priorityFilter, dateRange, searchText]);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Critical": return "red";
            case "High": return "orange";
            case "Medium": return "gold";
            case "Low": return "green";
            default: return "default";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed": return "green";
            case "In Progress": return "blue";
            case "Pending": return "orange";
            case "On Hold": return "default";
            case "Cancelled": return "red";
            default: return "default";
        }
    };

    const columns: ColumnsType<Task> = [
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 80,
            render: (text: string) => (
                <Button type="link" size="small">
                    {text}
                </Button>
            )
        },
        {
            title: "Project",
            dataIndex: "project",
            key: "project",
            sorter: (a: Task, b: Task) => a.project.localeCompare(b.project)
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
            sorter: (a: Task, b: Task) => a.subject.localeCompare(b.subject)
        },
        {
            title: "Assigned To",
            dataIndex: "assignedTo",
            key: "assignedTo",
            sorter: (a: Task, b: Task) => a.assignedTo.localeCompare(b.assignedTo)
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            render: (priority: string) => (
                <Tag color={getPriorityColor(priority)}>{priority}</Tag>
            ),
            sorter: (a: Task, b: Task) => {
                const priorityOrder: Record<string, number> = { "Critical": 4, "High": 3, "Medium": 2, "Low": 1 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
            render: (date: string) => dayjs(date).format("MMM DD, YYYY"),
            sorter: (a: Task, b: Task) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix()
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (date: string) => dayjs(date).format("MMM DD, YYYY"),
            sorter: (a: Task, b: Task) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix()
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={getStatusColor(status)}>{status}</Tag>
            ),
            sorter: (a: Task, b: Task) => a.status.localeCompare(b.status)
        },
        {
            title: "Assigned By",
            dataIndex: "assignedBy",
            key: "assignedBy",
            sorter: (a: Task, b: Task) => a.assignedBy.localeCompare(b.assignedBy)
        },
        {
            title: "Custom Field 1",
            dataIndex: "customField1",
            key: "customField1"
        },
        {
            title: "Custom Field 2",
            dataIndex: "customField2",
            key: "customField2"
        },
        {
            title: "Custom Field 3",
            dataIndex: "customField3",
            key: "customField3"
        }
    ];

    const exportMenuItems = [
        {
            key: "csv",
            label: "Export to CSV",
            icon: <ExportOutlined />
        },
        {
            key: "excel",
            label: "Export to Excel",
            icon: <ExportOutlined />
        },
        {
            key: "pdf",
            label: "Export to PDF",
            icon: <ExportOutlined />
        },
        {
            key: "print",
            label: "Print",
            icon: <PrinterOutlined />
        }
    ];

    const handleExport = (key: string) => {
        console.log(`Exporting as ${key}`);
        // Implement export functionality here
    };

    return (
        <div className="p-6">
            <Card>
                {/* Filters */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Select
                        placeholder="Filter by Project"
                        allowClear
                        value={projectFilter || undefined}
                        onChange={setProjectFilter}
                        className="w-full"
                    >
                        <Select.Option value="Website Redesign">Website Redesign</Select.Option>
                        <Select.Option value="Mobile App">Mobile App</Select.Option>
                    </Select>

                    <Select
                        placeholder="Filter by Assigned To"
                        allowClear
                        value={assignedToFilter || undefined}
                        onChange={setAssignedToFilter}
                        className="w-full"
                    >
                        <Select.Option value="John Doe">John Doe</Select.Option>
                        <Select.Option value="Alice Johnson">Alice Johnson</Select.Option>
                    </Select>

                    <Select
                        placeholder="Filter by Status"
                        allowClear
                        value={statusFilter || undefined}
                        onChange={setStatusFilter}
                        className="w-full"
                    >
                        <Select.Option value="Pending">Pending</Select.Option>
                        <Select.Option value="In Progress">In Progress</Select.Option>
                        <Select.Option value="Completed">Completed</Select.Option>
                        <Select.Option value="On Hold">On Hold</Select.Option>
                        <Select.Option value="Cancelled">Cancelled</Select.Option>
                    </Select>

                    <Select
                        placeholder="Filter by Priority"
                        allowClear
                        value={priorityFilter || undefined}
                        onChange={setPriorityFilter}
                        className="w-full"
                    >
                        <Select.Option value="Critical">Critical</Select.Option>
                        <Select.Option value="High">High</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="Low">Low</Select.Option>
                    </Select>

                    <RangePicker
                        placeholder={["Start Date", "End Date"]}
                        value={dateRange}
                        onChange={setDateRange}
                        className="w-full"
                    />
                </div>

                {/* Action Bar */}
                <div className="mb-4 flex justify-between items-center">
                    <div className="flex gap-2">
                        <Dropdown
                            menu={{
                                items: exportMenuItems,
                                onClick: ({ key }) => handleExport(key)
                            }}
                            placement="bottomLeft"
                        >
                            <Button icon={<ExportOutlined />}>
                                Export
                            </Button>
                        </Dropdown>
                        <Button icon={<PrinterOutlined />}>
                            Print
                        </Button>
                        <Button icon={<EyeOutlined />}>
                            Column Visibility
                        </Button>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Search
                            placeholder="Search tasks..."
                            allowClear
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 250 }}
                            prefix={<SearchOutlined />}
                        />
                        <div className="flex items-center gap-2">
                            <Button
                                type={viewMode === "list" ? "primary" : "default"}
                                icon={<UnorderedListOutlined />}
                                onClick={() => setViewMode("list")}
                            >
                                List View
                            </Button>
                            <Button
                                type={viewMode === "kanban" ? "primary" : "default"}
                                icon={<AppstoreOutlined />}
                                onClick={() => setViewMode("kanban")}
                            >
                                Kanban Board
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={filteredTasks}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        pageSizeOptions: ["10", "25", "50", "100"]
                    }}
                    scroll={{ x: 1500 }}
                />
            </Card>
        </div>
    );
};

export default MyTasks;