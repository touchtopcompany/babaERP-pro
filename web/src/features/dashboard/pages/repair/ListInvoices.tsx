import React, { useState } from "react";
import {
    Card,
    Table,
    Button,
    Input,
    Space,
    Typography,
    Tag,
    Row,
    Col,
    Dropdown,
    Select,
    Tabs,
    DatePicker,
} from "antd";
import type { MenuProps } from "antd";
import {
    PlusOutlined,
    SearchOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    PrinterOutlined,
    UnorderedListOutlined,
    DownOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

export interface InvoiceData {
    key: string;
    date: string;
    deliveryDate: string;
    jobSheetNumber: string;
    invoiceNo: string;
    technician: string;
    addedBy: string;
    customerName: string;
    brand: string;
    deviceModel: string;
    serialNumber: string;
    status: string;
    location: string;
    from: string;
    repairWarranty: string;
    paymentStatus: string;
    totalAmount: number;
    paymentDue: number;
    sellReturnDue: number;
}

const ListInvoices: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("pending");
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [pageSize, setPageSize] = useState(25);

    const columns: ColumnsType<InvoiceData> = [
        {
            title: "Action",
            key: "action",
            width: 80,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => console.log("View", record)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => console.log("Edit", record)}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        onClick={() => console.log("Delete", record)}
                    />
                </Space>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: 100,
            render: (date) => dayjs(date).format("DD/MM/YYYY"),
        },
        {
            title: "Delivery Date",
            dataIndex: "deliveryDate",
            key: "deliveryDate",
            width: 120,
            render: (date) => dayjs(date).format("DD/MM/YYYY"),
        },
        {
            title: "Job sheet number",
            dataIndex: "jobSheetNumber",
            key: "jobSheetNumber",
            width: 150,
        },
        {
            title: "Invoice No.",
            dataIndex: "invoiceNo",
            key: "invoiceNo",
            width: 120,
        },
        {
            title: "Technician",
            dataIndex: "technician",
            key: "technician",
            width: 120,
        },
        {
            title: "Added By",
            dataIndex: "addedBy",
            key: "addedBy",
            width: 120,
        },
        {
            title: "Customer name",
            dataIndex: "customerName",
            key: "customerName",
            width: 150,
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
            width: 100,
        },
        {
            title: "Device Model",
            dataIndex: "deviceModel",
            key: "deviceModel",
            width: 120,
        },
        {
            title: "Serial Number",
            dataIndex: "serialNumber",
            key: "serialNumber",
            width: 120,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 100,
            render: (status) => (
                <Tag color={status === "Completed" ? "green" : status === "Pending" ? "orange" : "red"}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            width: 100,
        },
        {
            title: "From",
            dataIndex: "from",
            key: "from",
            width: 100,
        },
        {
            title: "Repair Warranty",
            dataIndex: "repairWarranty",
            key: "repairWarranty",
            width: 130,
        },
        {
            title: "Payment Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            width: 120,
            render: (status) => (
                <Tag color={status === "Paid" ? "green" : status === "Pending" ? "orange" : "red"}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Total amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            width: 120,
            render: (amount) => `TSh ${amount.toLocaleString()}`,
        },
        {
            title: "Payment due",
            dataIndex: "paymentDue",
            key: "paymentDue",
            width: 120,
            render: (amount) => `TSh ${amount.toLocaleString()}`,
        },
        {
            title: "Sell Return Due",
            dataIndex: "sellReturnDue",
            key: "sellReturnDue",
            width: 140,
            render: (amount) => `TSh ${amount.toLocaleString()}`,
        },
    ];

    const exportMenuItems: MenuProps['items'] = [
        {
            key: 'csv',
            label: 'Export to CSV',
            icon: <FileExcelOutlined />,
            onClick: () => console.log('Export CSV'),
        },
        {
            key: 'excel',
            label: 'Export to Excel',
            icon: <FileExcelOutlined />,
            onClick: () => console.log('Export Excel'),
        },
        {
            key: 'pdf',
            label: 'Export to PDF',
            icon: <FilePdfOutlined />,
            onClick: () => console.log('Export PDF'),
        },
        {
            key: 'print',
            label: 'Print',
            icon: <PrinterOutlined />,
            onClick: () => console.log('Print'),
        },
    ];

    const mockData: InvoiceData[] = [];

    return (
        <div>
            <Card>
                <FilterPanel
                    filters={{
                        businessLocation: {
                            label: "Business Location",
                            value: "all",
                            options: [
                                { label: "All Locations", value: "all" },
                                { label: "Main Branch", value: "main" },
                                { label: "Branch A", value: "branch_a" },
                            ],
                        },
                        user: {
                            label: "User",
                            value: "all",
                            options: [
                                { label: "All Users", value: "all" },
                                { label: "Admin", value: "admin" },
                                { label: "Technician", value: "technician" },
                            ],
                        },
                        customer: {
                            label: "Customer",
                            value: "all",
                            options: [
                                { label: "All Customers", value: "all" },
                                { label: "John Doe", value: "john_doe" },
                                { label: "Jane Smith", value: "jane_smith" },
                            ],
                        },
                        paymentStatus: {
                            label: "Payment Status",
                            value: "all",
                            options: [
                                { label: "All Status", value: "all" },
                                { label: "Paid", value: "paid" },
                                { label: "Pending", value: "pending" },
                                { label: "Overdue", value: "overdue" },
                            ],
                        },
                        dateRange: {
                            label: "Date Range",
                            value: null,
                        },
                        timeRange: {
                            label: "Time range",
                            value: null,
                        },
                        status: {
                            label: "Status",
                            value: "all",
                            options: [
                                { label: "All Status", value: "all" },
                                { label: "Pending", value: "pending" },
                                { label: "Completed", value: "completed" },
                                { label: "Cancelled", value: "cancelled" },
                            ],
                        },
                        technician: {
                            label: "Technician",
                            value: "all",
                            options: [
                                { label: "All Technicians", value: "all" },
                                { label: "Tech 1", value: "tech1" },
                                { label: "Tech 2", value: "tech2" },
                            ],
                        },
                    }}
                    onFilterChange={(filters) => console.log('Filter changed:', filters)}
                />

                <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 16 }}>
                    <TabPane tab="Pending" key="pending" />
                    <TabPane tab="Completed" key="completed" />
                </Tabs>

                <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                    <Col>
                        <Space>
                            <Select
                                value={pageSize}
                                onChange={setPageSize}
                                style={{ width: 120 }}
                            >
                                <Option value={25}>Show 25</Option>
                                <Option value={50}>Show 50</Option>
                                <Option value={100}>Show 100</Option>
                            </Select>

                            <Dropdown menu={{ items: exportMenuItems }} placement="bottomLeft">
                                <Button icon={<DownOutlined />}>
                                    Export
                                </Button>
                            </Dropdown>

                            <Button icon={<PrinterOutlined />} onClick={() => console.log('Print')}>
                                Print
                            </Button>

                            <Button icon={<UnorderedListOutlined />} onClick={() => console.log('Column visibility')}>
                                Column visibility
                            </Button>
                        </Space>
                    </Col>

                    <Col>
                        <Space>
                            <Search
                                placeholder="Search invoices..."
                                allowClear
                                style={{ width: 250 }}
                                prefix={<SearchOutlined />}
                            />
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => navigate("/repair/add-invoice")}
                            >
                                Add
                            </Button>
                        </Space>
                    </Col>
                </Row>

                <Table
                    columns={columns}
                    dataSource={mockData}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }}
                    pagination={{
                        pageSize,
                        showSizeChanger: false,
                        showQuickJumper: true,
                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    }}
                    scroll={{ x: 1500 }}
                    footer={() => (
                        <Row justify="space-between">
                            <Col>
                                <Text strong>Total:</Text>
                            </Col>
                            <Col>
                                <Space split={<Text>|</Text>}>
                                    <Text>TSh 0</Text>
                                    <Text>TSh 0</Text>
                                    <Text>TSh 0</Text>
                                </Space>
                            </Col>
                        </Row>
                    )}
                />
            </Card>
        </div>
    );
};

export default ListInvoices;