import React, { useState, useMemo } from "react";
import {
    Card,
    Table,
    Button,
    Input,
    Space,
    Typography,
    Tag,
    message,
    Row,
    Col,
    Dropdown,
    Checkbox,
    Select,
    Modal,
    Form,
    Divider,
    Tooltip,
    Tabs,
} from "antd";
import type { MenuProps } from "antd";
import {
    PlusOutlined,
    SearchOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    PrinterOutlined,
    UnorderedListOutlined,
    FileTextOutlined,
    DownOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

export interface JobSheetData {
    key: string;
    id: string;
    serviceType: string;
    dueDate: string;
    jobSheetNumber: string;
    invoiceNo: string;
    status: "pending" | "in_progress" | "completed" | "cancelled";
    technician: string;
    customer: string;
    location: string;
    brand: string;
    device: string;
    deviceModel: string;
    serialNumber: string;
    estimatedCost: number;
    addedBy: string;
    createdAt: string;
}

const JobSheets: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [searchText, setSearchText] = useState("");
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addJobSheetModalOpen, setAddJobSheetModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedJobSheet, setSelectedJobSheet] = useState<JobSheetData | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(25);
    const [activeTab, setActiveTab] = useState("pending");
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
        action: true,
        serviceType: true,
        dueDate: true,
        jobSheetNumber: true,
        invoiceNo: true,
        status: true,
        technician: true,
        customer: true,
        location: true,
        brand: true,
        device: true,
        deviceModel: true,
        serialNumber: true,
        estimatedCost: true,
        addedBy: true,
        createdAt: true,
    });

    // Mock data - replace with API call
    const defaultJobSheets: JobSheetData[] = [
        {
            key: "1",
            id: "JS-001",
            serviceType: "Repair",
            dueDate: "2024-01-25",
            jobSheetNumber: "JS2024-001",
            invoiceNo: "INV-2024-001",
            status: "pending",
            technician: "John Tech",
            customer: "Alice Johnson",
            location: "Main Store",
            brand: "Apple",
            device: "iPhone",
            deviceModel: "iPhone 14 Pro",
            serialNumber: "SN123456789",
            estimatedCost: 150.00,
            addedBy: "Admin",
            createdAt: "2024-01-20",
        },
        {
            key: "2",
            id: "JS-002",
            serviceType: "Maintenance",
            dueDate: "2024-01-22",
            jobSheetNumber: "JS2024-002",
            invoiceNo: "INV-2024-002",
            status: "in_progress",
            technician: "Jane Tech",
            customer: "Bob Smith",
            location: "Branch Office",
            brand: "Samsung",
            device: "Galaxy",
            deviceModel: "Galaxy S23",
            serialNumber: "SN987654321",
            estimatedCost: 200.00,
            addedBy: "Manager",
            createdAt: "2024-01-19",
        },
        {
            key: "3",
            id: "JS-003",
            serviceType: "Repair",
            dueDate: "2024-01-18",
            jobSheetNumber: "JS2024-003",
            invoiceNo: "INV-2024-003",
            status: "completed",
            technician: "Mike Tech",
            customer: "Carol Davis",
            location: "Main Store",
            brand: "Dell",
            device: "Laptop",
            deviceModel: "XPS 15",
            serialNumber: "SN456789123",
            estimatedCost: 300.00,
            addedBy: "Staff",
            createdAt: "2024-01-15",
        },
    ];

    const [jobSheets, setJobSheets] = useState<JobSheetData[]>(defaultJobSheets);

    // Filter states
    const [filterConfig, setFilterConfig] = useState<FilterConfig>({
        businessLocation: {
            label: "Business Location:",
            value: "all",
            options: [
                { label: "All", value: "all" },
                { label: "Main Store", value: "Main Store" },
                { label: "Branch Office", value: "Branch Office" },
            ],
        },
        customer: {
            label: "Customer:",
            value: "all",
            options: [
                { label: "All", value: "all" },
                ...defaultJobSheets.map((js) => ({ label: js.customer, value: js.customer })),
            ],
        },
        technician: {
            label: "Technician:",
            value: "all",
            options: [
                { label: "All", value: "all" },
                ...defaultJobSheets.map((js) => ({ label: js.technician, value: js.technician })),
            ],
        },
        status: {
            label: "Status:",
            value: "all",
            options: [
                { label: "All", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "In Progress", value: "in_progress" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
            ],
        },
    });

    // Convert FilterConfig to filters object for filtering logic
    const filters = {
        businessLocation: filterConfig.businessLocation?.value || "all",
        customer: filterConfig.customer?.value || "all",
        technician: filterConfig.technician?.value || "all",
        status: filterConfig.status?.value || "all",
    };

    // Filter job sheets based on search text, filters, and active tab
    const filteredJobSheets = useMemo(() => {
        let filtered = jobSheets;

        // Apply tab filter
        if (activeTab === "pending") {
            filtered = filtered.filter((js) => js.status === "pending");
        } else if (activeTab === "completed") {
            filtered = filtered.filter((js) => js.status === "completed");
        }

        // Apply search filter
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            filtered = filtered.filter(
                (js) =>
                    js.jobSheetNumber.toLowerCase().includes(searchLower) ||
                    js.customer.toLowerCase().includes(searchLower) ||
                    js.technician.toLowerCase().includes(searchLower) ||
                    js.device.toLowerCase().includes(searchLower) ||
                    js.deviceModel.toLowerCase().includes(searchLower) ||
                    js.serialNumber.toLowerCase().includes(searchLower)
            );
        }

        // Apply filters
        if (filters.businessLocation !== "all") {
            filtered = filtered.filter((js) => js.location === filters.businessLocation);
        }
        if (filters.customer !== "all") {
            filtered = filtered.filter((js) => js.customer === filters.customer);
        }
        if (filters.technician !== "all") {
            filtered = filtered.filter((js) => js.technician === filters.technician);
        }
        if (filters.status !== "all") {
            filtered = filtered.filter((js) => js.status === filters.status);
        }

        return filtered;
    }, [jobSheets, searchText, filters, activeTab]);

    const handleAddJobSheet = () => {
        setAddJobSheetModalOpen(true);
        form.resetFields();
    };

    const handleRefresh = () => {
        setLoading(true);
        // TODO: Implement API call to refresh job sheets
        setTimeout(() => {
            setLoading(false);
            message.success("Job sheets refreshed successfully");
        }, 1000);
    };

    const handleExportCSV = () => {
        const headers = [
            "Job Sheet ID", "Service Type", "Due Date", "Job Sheet Number",
            "Invoice No.", "Status", "Technician", "Customer", "Location",
            "Brand", "Device", "Device Model", "Serial Number",
            "Estimated Cost", "Added By", "Created At"
        ];
        const csvData = filteredJobSheets.map((js) => [
            js.id,
            js.serviceType,
            js.dueDate,
            js.jobSheetNumber,
            js.invoiceNo,
            js.status,
            js.technician,
            js.customer,
            js.location,
            js.brand,
            js.device,
            js.deviceModel,
            js.serialNumber,
            js.estimatedCost.toFixed(2),
            js.addedBy,
            js.createdAt,
        ]);

        const csvContent = [
            headers.join(","),
            ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `job_sheets_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        message.success("Job sheets exported to CSV successfully");
    };

    const handleExportExcel = () => {
        message.info("Excel export will be available soon. Exporting as CSV for now.");
        handleExportCSV();
    };

    const handleExportPDF = () => {
        message.info("PDF export functionality coming soon");
    };

    const handlePrint = () => {
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        const tableHTML = `
      <html>
        <head>
          <title>Job Sheets Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f1f1f; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Job Sheets Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Job Sheet ID</th>
                <th>Service Type</th>
                <th>Due Date</th>
                <th>Job Sheet Number</th>
                <th>Invoice No.</th>
                <th>Status</th>
                <th>Technician</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Brand</th>
                <th>Device</th>
                <th>Device Model</th>
                <th>Serial Number</th>
                <th>Estimated Cost</th>
                <th>Added By</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${filteredJobSheets
                .map(
                    (js) => `
                <tr>
                  <td>${js.id}</td>
                  <td>${js.serviceType}</td>
                  <td>${js.dueDate}</td>
                  <td>${js.jobSheetNumber}</td>
                  <td>${js.invoiceNo}</td>
                  <td>${js.status}</td>
                  <td>${js.technician}</td>
                  <td>${js.customer}</td>
                  <td>${js.location}</td>
                  <td>${js.brand}</td>
                  <td>${js.device}</td>
                  <td>${js.deviceModel}</td>
                  <td>${js.serialNumber}</td>
                  <td>$${js.estimatedCost.toFixed(2)}</td>
                  <td>${js.addedBy}</td>
                  <td>${js.createdAt}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

        printWindow.document.write(tableHTML);
        printWindow.document.close();
        printWindow.print();
        message.success("Print dialog opened");
    };

    const handleColumnVisibilityChange = (key: string, visible: boolean) => {
        setColumnVisibility((prev) => ({ ...prev, [key]: visible }));
    };

    const columnVisibilityMenu: MenuProps = {
        items: [
            {
                key: "serviceType", label: (
                    <Checkbox checked={columnVisibility.serviceType} onChange={(e) => handleColumnVisibilityChange("serviceType", e.target.checked)}>
                        Service Type
                    </Checkbox>
                )
            },
            {
                key: "dueDate", label: (
                    <Checkbox checked={columnVisibility.dueDate} onChange={(e) => handleColumnVisibilityChange("dueDate", e.target.checked)}>
                        Due Date
                    </Checkbox>
                )
            },
            {
                key: "jobSheetNumber", label: (
                    <Checkbox checked={columnVisibility.jobSheetNumber} onChange={(e) => handleColumnVisibilityChange("jobSheetNumber", e.target.checked)}>
                        Job Sheet Number
                    </Checkbox>
                )
            },
            {
                key: "invoiceNo", label: (
                    <Checkbox checked={columnVisibility.invoiceNo} onChange={(e) => handleColumnVisibilityChange("invoiceNo", e.target.checked)}>
                        Invoice No.
                    </Checkbox>
                )
            },
            {
                key: "status", label: (
                    <Checkbox checked={columnVisibility.status} onChange={(e) => handleColumnVisibilityChange("status", e.target.checked)}>
                        Status
                    </Checkbox>
                )
            },
            {
                key: "technician", label: (
                    <Checkbox checked={columnVisibility.technician} onChange={(e) => handleColumnVisibilityChange("technician", e.target.checked)}>
                        Technician
                    </Checkbox>
                )
            },
            {
                key: "customer", label: (
                    <Checkbox checked={columnVisibility.customer} onChange={(e) => handleColumnVisibilityChange("customer", e.target.checked)}>
                        Customer
                    </Checkbox>
                )
            },
            {
                key: "location", label: (
                    <Checkbox checked={columnVisibility.location} onChange={(e) => handleColumnVisibilityChange("location", e.target.checked)}>
                        Location
                    </Checkbox>
                )
            },
            {
                key: "brand", label: (
                    <Checkbox checked={columnVisibility.brand} onChange={(e) => handleColumnVisibilityChange("brand", e.target.checked)}>
                        Brand
                    </Checkbox>
                )
            },
            {
                key: "device", label: (
                    <Checkbox checked={columnVisibility.device} onChange={(e) => handleColumnVisibilityChange("device", e.target.checked)}>
                        Device
                    </Checkbox>
                )
            },
            {
                key: "deviceModel", label: (
                    <Checkbox checked={columnVisibility.deviceModel} onChange={(e) => handleColumnVisibilityChange("deviceModel", e.target.checked)}>
                        Device Model
                    </Checkbox>
                )
            },
            {
                key: "serialNumber", label: (
                    <Checkbox checked={columnVisibility.serialNumber} onChange={(e) => handleColumnVisibilityChange("serialNumber", e.target.checked)}>
                        Serial Number
                    </Checkbox>
                )
            },
            {
                key: "estimatedCost", label: (
                    <Checkbox checked={columnVisibility.estimatedCost} onChange={(e) => handleColumnVisibilityChange("estimatedCost", e.target.checked)}>
                        Estimated Cost
                    </Checkbox>
                )
            },
            {
                key: "addedBy", label: (
                    <Checkbox checked={columnVisibility.addedBy} onChange={(e) => handleColumnVisibilityChange("addedBy", e.target.checked)}>
                        Added By
                    </Checkbox>
                )
            },
            {
                key: "createdAt", label: (
                    <Checkbox checked={columnVisibility.createdAt} onChange={(e) => handleColumnVisibilityChange("createdAt", e.target.checked)}>
                        Created At
                    </Checkbox>
                )
            },

        ],
    };

    const columns: ColumnsType<JobSheetData> = [
        {
            title: "Action",
            key: "action",
            width: 120,
            fixed: "left",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="text"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedJobSheet(record);
                            setViewModalOpen(true);
                        }}
                        style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff" }}
                    />
                    <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSelectedJobSheet(record);
                            setEditModalOpen(true);
                        }}
                        style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a" }}
                    />
                    <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setSelectedJobSheet(record);
                            setDeleteModalOpen(true);
                        }}
                        danger
                        style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f" }}
                    />
                </Space>
            ),
        },
        {
            title: "Service type",
            dataIndex: "serviceType",
            key: "serviceType",
            width: 120,
            sorter: (a, b) => a.serviceType.localeCompare(b.serviceType),
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            width: 120,
            sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        },
        {
            title: "Job sheet number",
            dataIndex: "jobSheetNumber",
            key: "jobSheetNumber",
            width: 150,
            sorter: (a, b) => a.jobSheetNumber.localeCompare(b.jobSheetNumber),
        },
        {
            title: "Invoice No.",
            dataIndex: "invoiceNo",
            key: "invoiceNo",
            width: 120,
            sorter: (a, b) => a.invoiceNo.localeCompare(b.invoiceNo),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 120,
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (status: string) => (
                <Tag
                    color={
                        status === "completed" ? "success" :
                            status === "in_progress" ? "processing" :
                                status === "pending" ? "warning" : "default"
                    }
                    style={{ borderRadius: "4px", padding: "4px 12px", fontSize: "12px", fontWeight: 500 }}
                >
                    {status.replace("_", " ").toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Technician",
            dataIndex: "technician",
            key: "technician",
            width: 120,
            sorter: (a, b) => a.technician.localeCompare(b.technician),
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
            width: 150,
            sorter: (a, b) => a.customer.localeCompare(b.customer),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            width: 120,
            sorter: (a, b) => a.location.localeCompare(b.location),
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
            width: 100,
            sorter: (a, b) => a.brand.localeCompare(b.brand),
        },
        {
            title: "Device",
            dataIndex: "device",
            key: "device",
            width: 100,
            sorter: (a, b) => a.device.localeCompare(b.device),
        },
        {
            title: "Device Model",
            dataIndex: "deviceModel",
            key: "deviceModel",
            width: 150,
            sorter: (a, b) => a.deviceModel.localeCompare(b.deviceModel),
        },
        {
            title: "Serial Number",
            dataIndex: "serialNumber",
            key: "serialNumber",
            width: 150,
            sorter: (a, b) => a.serialNumber.localeCompare(b.serialNumber),
        },
        {
            title: "Estimated Cost",
            dataIndex: "estimatedCost",
            key: "estimatedCost",
            width: 130,
            sorter: (a, b) => a.estimatedCost - b.estimatedCost,
            render: (cost: number) => (
                <Text strong>${cost.toFixed(2)}</Text>
            ),
        },
        {
            title: "Added By",
            dataIndex: "addedBy",
            key: "addedBy",
            width: 120,
            sorter: (a, b) => a.addedBy.localeCompare(b.addedBy),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 120,
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
    ];

    // Filter columns based on visibility
    const visibleColumns = columns.filter((col) => columnVisibility[col.key as keyof typeof columnVisibility]);

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            {/* Header Section */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Title level={2} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
                        Job Sheets Management
                    </Title>
                    <Text style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", display: "block", marginTop: "4px" }}>
                        Manage repair job sheets and service requests
                    </Text>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Space style={{ width: "100%", justifyContent: "flex-end", flexWrap: "wrap" }}>
                        <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading} style={{ height: "40px", borderRadius: "6px", fontWeight: 500 }}>
                            Refresh
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddJobSheet} style={{ height: "40px", borderRadius: "6px", fontWeight: 500 }}>
                            Add
                        </Button>
                    </Space>
                </Col>
            </Row>

            {/* Filters Section */}
            <FilterPanel filters={filterConfig} onFilterChange={setFilterConfig} defaultExpanded={true} />

            {/* Job Sheets Management Section */}
            <Card style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: "8px", overflow: "hidden", maxWidth: "100%" }} bodyStyle={{ padding: "24px", overflow: "hidden" }}>
                <Row gutter={[16, 16]} style={{ marginBottom: "16px" }} align="middle">
                    <Col xs={24} sm={24} md={12} lg={8}>
                        <Title level={4} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
                            Job Sheets Management
                        </Title>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={16}>
                        <Space style={{ width: "100%", justifyContent: "flex-end", flexWrap: "wrap" }}>
                            <Select value={pageSize} onChange={setPageSize} style={{ width: 150 }} suffixIcon={<DownOutlined />}>
                                <Select.Option value={10}>Show 10 entries</Select.Option>
                                <Select.Option value={25}>Show 25 entries</Select.Option>
                                <Select.Option value={50}>Show 50 entries</Select.Option>
                                <Select.Option value={100}>Show 100 entries</Select.Option>
                            </Select>
                            <Button icon={<FileTextOutlined />} onClick={handleExportCSV} style={{ height: "40px", borderRadius: "6px", fontWeight: 500, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9", color: isDark ? "#fff" : "#1f1f1f" }}>
                                Export to CSV
                            </Button>
                            <Button icon={<FileExcelOutlined />} onClick={handleExportExcel} style={{ height: "40px", borderRadius: "6px", fontWeight: 500, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9", color: isDark ? "#fff" : "#1f1f1f" }}>
                                Export to Excel
                            </Button>
                            <Button icon={<PrinterOutlined />} onClick={handlePrint} style={{ height: "40px", borderRadius: "6px", fontWeight: 500, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9", color: isDark ? "#fff" : "#1f1f1f" }}>
                                Print
                            </Button>
                            <Dropdown menu={columnVisibilityMenu} trigger={["click"]} placement="bottomRight">
                                <Button icon={<UnorderedListOutlined />} style={{ height: "40px", borderRadius: "6px", fontWeight: 500, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9", color: isDark ? "#fff" : "#1f1f1f" }}>
                                    Column visibility
                                </Button>
                            </Dropdown>
                            <Button icon={<FilePdfOutlined />} onClick={handleExportPDF} style={{ height: "40px", borderRadius: "6px", fontWeight: 500, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9", color: isDark ? "#fff" : "#1f1f1f" }}>
                                Export to PDF
                            </Button>
                            <Search placeholder="Search..." allowClear enterButton={<Button type="primary" icon={<SearchOutlined />} style={{ height: "40px", borderRadius: "0 6px 6px 0" }} />} size="large" value={searchText} onChange={(e) => setSearchText(e.target.value)} onSearch={(value) => setSearchText(value)} style={{ width: 200 }} />
                        </Space>
                    </Col>
                </Row>

                {/* Tabs */}
                <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: "16px" }}>
                    <TabPane tab="Pending" key="pending" />
                    <TabPane tab="Completed" key="completed" />
                </Tabs>

                <Table
                    columns={visibleColumns}
                    dataSource={filteredJobSheets}
                    loading={loading}
                    pagination={{
                        pageSize,
                        showSizeChanger: false,
                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        style: { marginTop: "16px", color: isDark ? "rgba(255,255,255,0.85)" : "#595959" },
                    }}
                    scroll={{ x: "max-content" }}
                    style={{ background: isDark ? "transparent" : "#fafafa", width: "100%" }}
                />
            </Card>

            {/* View Modal */}
            <ViewModal
                open={viewModalOpen}
                onClose={() => { setViewModalOpen(false); setSelectedJobSheet(null); }}
                title="Job Sheet Details"
                data={selectedJobSheet}
                fields={[
                    { key: "id", label: "Job Sheet ID" },
                    { key: "serviceType", label: "Service Type" },
                    { key: "dueDate", label: "Due Date" },
                    { key: "jobSheetNumber", label: "Job Sheet Number" },
                    { key: "invoiceNo", label: "Invoice Number" },
                    { key: "status", label: "Status" },
                    { key: "technician", label: "Technician" },
                    { key: "customer", label: "Customer" },
                    { key: "location", label: "Location" },
                    { key: "brand", label: "Brand" },
                    { key: "device", label: "Device" },
                    { key: "deviceModel", label: "Device Model" },
                    { key: "serialNumber", label: "Serial Number" },
                    { key: "estimatedCost", label: "Estimated Cost" },
                    { key: "addedBy", label: "Added By" },
                    { key: "createdAt", label: "Created At" },
                ]}
                width={800}
            />

            {/* Edit Modal */}
            <EditModal
                open={editModalOpen}
                onClose={() => { setEditModalOpen(false); setSelectedJobSheet(null); }}
                onSave={async (_values) => {
                    setActionLoading(true);
                    try {
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        message.success("Job sheet updated successfully");
                        setEditModalOpen(false);
                        setSelectedJobSheet(null);
                    } catch (_error) {
                        message.error("Failed to update job sheet");
                    } finally {
                        setActionLoading(false);
                    }
                }}
                title="Edit Job Sheet"
                data={selectedJobSheet}
                fields={[
                    {
                        name: "serviceType", label: "Service Type", type: "select", required: true, options: [
                            { label: "Repair", value: "Repair" },
                            { label: "Maintenance", value: "Maintenance" },
                            { label: "Installation", value: "Installation" },
                        ]
                    },
                    { name: "dueDate", label: "Due Date", type: "date", required: true },
                    { name: "technician", label: "Technician", type: "text", required: true },
                    { name: "customer", label: "Customer", type: "text", required: true },
                    {
                        name: "location", label: "Location", type: "select", required: true, options: [
                            { label: "Main Store", value: "Main Store" },
                            { label: "Branch Office", value: "Branch Office" },
                        ]
                    },
                    { name: "brand", label: "Brand", type: "text", required: true },
                    { name: "device", label: "Device", type: "text", required: true },
                    { name: "deviceModel", label: "Device Model", type: "text", required: true },
                    { name: "serialNumber", label: "Serial Number", type: "text", required: true },
                    { name: "estimatedCost", label: "Estimated Cost", type: "number", required: true },
                    {
                        name: "status", label: "Status", type: "select", required: true, options: [
                            { label: "Pending", value: "pending" },
                            { label: "In Progress", value: "in_progress" },
                            { label: "Completed", value: "completed" },
                            { label: "Cancelled", value: "cancelled" },
                        ]
                    },
                ]}
                loading={actionLoading}
                width={800}
            />

            {/* Delete Modal */}
            <DeleteModal
                open={deleteModalOpen}
                onClose={() => { setDeleteModalOpen(false); setSelectedJobSheet(null); }}
                onConfirm={async () => {
                    setActionLoading(true);
                    try {
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        message.success("Job sheet deleted successfully");
                        setJobSheets(jobSheets.filter((js) => js.key !== selectedJobSheet?.key));
                        setDeleteModalOpen(false);
                        setSelectedJobSheet(null);
                    } catch (_error) {
                        message.error("Failed to delete job sheet");
                    } finally {
                        setActionLoading(false);
                    }
                }}
                title="Delete Job Sheet"
                itemName={selectedJobSheet?.jobSheetNumber}
                loading={actionLoading}
            />

            {/* Add Job Sheet Modal */}
            <Modal
                title="Add Job Sheet"
                open={addJobSheetModalOpen}
                onCancel={() => { setAddJobSheetModalOpen(false); form.resetFields(); }}
                footer={[
                    <Button key="cancel" onClick={() => { setAddJobSheetModalOpen(false); form.resetFields(); }}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={async () => {
                        try {
                            const values = await form.validateFields();
                            setActionLoading(true);
                            await new Promise((resolve) => setTimeout(resolve, 1000));
                            message.success("Job sheet added successfully");
                            setAddJobSheetModalOpen(false);
                            form.resetFields();
                            handleRefresh();
                        } catch (error) {
                            console.error("Validation failed:", error);
                        } finally {
                            setActionLoading(false);
                        }
                    }} loading={actionLoading}>
                        Save
                    </Button>,
                ]}
                width={800}
                style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff" }}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="serviceType" label="Service Type" rules={[{ required: true, message: "Please select service type" }]}>
                                <Select placeholder="Select service type">
                                    <Option value="Repair">Repair</Option>
                                    <Option value="Maintenance">Maintenance</Option>
                                    <Option value="Installation">Installation</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: "Please select due date" }]}>
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="technician" label="Technician" rules={[{ required: true, message: "Please enter technician name" }]}>
                                <Input placeholder="Enter technician name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="customer" label="Customer" rules={[{ required: true, message: "Please enter customer name" }]}>
                                <Input placeholder="Enter customer name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please select location" }]}>
                                <Select placeholder="Select location">
                                    <Option value="Main Store">Main Store</Option>
                                    <Option value="Branch Office">Branch Office</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Please enter brand" }]}>
                                <Input placeholder="Enter brand" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="device" label="Device" rules={[{ required: true, message: "Please enter device" }]}>
                                <Input placeholder="Enter device" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="deviceModel" label="Device Model" rules={[{ required: true, message: "Please enter device model" }]}>
                                <Input placeholder="Enter device model" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="serialNumber" label="Serial Number" rules={[{ required: true, message: "Please enter serial number" }]}>
                                <Input placeholder="Enter serial number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="estimatedCost" label="Estimated Cost" rules={[{ required: true, message: "Please enter estimated cost" }]}>
                                <Input type="number" placeholder="Enter estimated cost" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default JobSheets;