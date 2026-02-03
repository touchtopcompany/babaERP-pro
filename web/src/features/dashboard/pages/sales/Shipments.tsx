import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Typography,
  message,
  Row,
  Col,
  Dropdown,
  Select,
  Tooltip,
  Tag,
} from "antd";
import type { MenuProps } from "antd";
import {
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

export interface ShipmentData {
  key: string;
  date: string;
  invoiceNo: string;
  customerName: string;
  contactNumber: string;
  location: string;
  deliveryPerson: string;
  shippingStatus: string;
  paymentStatus: string;
}

const Shipments: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Business Location:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
      ],
    },
    customer: {
      label: "Customer:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "John Doe", value: "John Doe" },
        { label: "Mary Johnson", value: "Mary Johnson" },
        { label: "Peter Wilson", value: "Peter Wilson" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2025-12-31")],
    },
    user: {
      label: "User:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Jane Smith", value: "Jane Smith" },
        { label: "Bob Johnson", value: "Bob Johnson" },
      ],
    },
    paymentStatus: {
      label: "Payment Status:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Paid", value: "paid" },
        { label: "Partial", value: "partial" },
        { label: "Due", value: "due" },
      ],
    },
    shippingStatus: {
      label: "Shipping Status:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Shipped", value: "shipped" },
        { label: "Delivered", value: "delivered" },
      ],
    },
    deliveryPerson: {
      type: "select",
      label: "Delivery Person:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Person 1", value: "Person 1" },
        { label: "Person 2", value: "Person 2" },
      ],
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    businessLocation: filterConfig.businessLocation?.value || "all",
    customer: filterConfig.customer?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
    user: filterConfig.user?.value || "all",
    paymentStatus: filterConfig.paymentStatus?.value || "all",
    shippingStatus: filterConfig.shippingStatus?.value || "all",
    deliveryPerson: filterConfig.deliveryPerson?.value || "all",
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    date: true,
    invoiceNo: true,
    customerName: true,
    contactNumber: true,
    location: true,
    deliveryPerson: true,
    shippingStatus: true,
    paymentStatus: true,
  });

  // Mock data - replace with API call
  const defaultShipments: ShipmentData[] = [
    {
      key: "1",
      date: "2025-01-15",
      invoiceNo: "INV-2025-001",
      customerName: "John Doe",
      contactNumber: "+255 712 345 678",
      location: "C2Z Digital Solutions (C2Z1)",
      deliveryPerson: "Person 1",
      shippingStatus: "delivered",
      paymentStatus: "paid",
    },
    {
      key: "2",
      date: "2025-01-16",
      invoiceNo: "INV-2025-002",
      customerName: "Mary Johnson",
      contactNumber: "+255 713 456 789",
      location: "C2Z Digital Solutions (C2Z1)",
      deliveryPerson: "Person 2",
      shippingStatus: "shipped",
      paymentStatus: "partial",
    },
    {
      key: "3",
      date: "2025-01-17",
      invoiceNo: "INV-2025-003",
      customerName: "Peter Wilson",
      contactNumber: "+255 714 567 890",
      location: "Location 2",
      deliveryPerson: "Person 1",
      shippingStatus: "pending",
      paymentStatus: "due",
    },
    {
      key: "4",
      date: "2025-01-18",
      invoiceNo: "INV-2025-004",
      customerName: "Sarah Brown",
      contactNumber: "+255 715 678 901",
      location: "C2Z Digital Solutions (C2Z1)",
      deliveryPerson: "Person 2",
      shippingStatus: "delivered",
      paymentStatus: "paid",
    },
    {
      key: "5",
      date: "2025-01-19",
      invoiceNo: "INV-2025-005",
      customerName: "Michael Davis",
      contactNumber: "+255 716 789 012",
      location: "C2Z Digital Solutions (C2Z1)",
      deliveryPerson: "Person 1",
      shippingStatus: "shipped",
      paymentStatus: "paid",
    },
    {
      key: "6",
      date: "2025-01-20",
      invoiceNo: "INV-2025-006",
      customerName: "Emily White",
      contactNumber: "+255 717 890 123",
      location: "Location 2",
      deliveryPerson: "Person 2",
      shippingStatus: "pending",
      paymentStatus: "partial",
    },
  ];

  const [shipments, setShipments] = useState<ShipmentData[]>(defaultShipments);

  // Filter shipments based on search text and filters
  const filteredShipments = useMemo(() => {
    let filtered = shipments;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (shipment) =>
          shipment.invoiceNo.toLowerCase().includes(searchLower) ||
          shipment.customerName.toLowerCase().includes(searchLower) ||
          shipment.location.toLowerCase().includes(searchLower) ||
          shipment.contactNumber.includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation && filters.businessLocation !== "all") {
      filtered = filtered.filter((s) => s.location === filters.businessLocation);
    }
    if (filters.customer !== "all") {
      filtered = filtered.filter((s) => s.customerName === filters.customer);
    }
    if (filters.paymentStatus !== "all") {
      filtered = filtered.filter((s) => s.paymentStatus === filters.paymentStatus);
    }
    if (filters.shippingStatus !== "all") {
      filtered = filtered.filter((s) => s.shippingStatus === filters.shippingStatus);
    }
    if (filters.deliveryPerson !== "all") {
      filtered = filtered.filter((s) => s.deliveryPerson === filters.deliveryPerson);
    }

    return filtered;
  }, [shipments, searchText, filters]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Shipments refreshed successfully");
    }, 1000);
  };

  const handleView = (record: ShipmentData) => {
    setSelectedShipment(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: ShipmentData) => {
    setSelectedShipment(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: ShipmentData) => {
    setSelectedShipment(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Invoice No.",
      "Customer name",
      "Contact Number",
      "Location",
      "Delivery Person",
      "Shipping Status",
      "Payment Status",
    ];
    const csvData = filteredShipments.map((shipment) => [
      shipment.date,
      shipment.invoiceNo,
      shipment.customerName,
      shipment.contactNumber,
      shipment.location,
      shipment.deliveryPerson,
      shipment.shippingStatus,
      shipment.paymentStatus,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `shipments_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Shipments exported to CSV successfully");
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
          <title>Shipments Report</title>
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
          <h1>Shipments Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice No.</th>
                <th>Customer Name</th>
                <th>Location</th>
                <th>Shipping Status</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredShipments
                .map(
                  (shipment) => `
                <tr>
                  <td>${shipment.date}</td>
                  <td>${shipment.invoiceNo}</td>
                  <td>${shipment.customerName}</td>
                  <td>${shipment.location}</td>
                  <td>${shipment.shippingStatus}</td>
                  <td>${shipment.paymentStatus}</td>
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
    items: Object.keys(columnVisibility).map((key) => ({
      key,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={columnVisibility[key]}
            onChange={(e) => handleColumnVisibilityChange(key, e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim()}
        </div>
      ),
    })),
  };

  const columns: ColumnsType<ShipmentData> = [
    {
      title: "Action",
      key: "action",
      width: 120,
      fixed: "left",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Invoice No.",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      width: 150,
      sorter: (a, b) => a.invoiceNo.localeCompare(b.invoiceNo),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontFamily: "monospace",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Customer name",
      dataIndex: "customerName",
      key: "customerName",
      width: 180,
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 150,
      sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Delivery Person",
      dataIndex: "deliveryPerson",
      key: "deliveryPerson",
      width: 150,
      sorter: (a, b) => a.deliveryPerson.localeCompare(b.deliveryPerson),
    },
    {
      title: "Shipping Status",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
      width: 150,
      sorter: (a, b) => a.shippingStatus.localeCompare(b.shippingStatus),
      render: (text: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          pending: { color: "warning", text: "Pending" },
          shipped: { color: "processing", text: "Shipped" },
          delivered: { color: "success", text: "Delivered" },
        };
        const config = statusConfig[text.toLowerCase()] || { color: "default", text: text };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 150,
      sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
      render: (text: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          paid: { color: "success", text: "Paid" },
          partial: { color: "warning", text: "Partial" },
          due: { color: "error", text: "Due" },
        };
        const config = statusConfig[text.toLowerCase()] || { color: "default", text: text };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
  ];

  // Filter columns based on visibility
  const visibleColumns = columns.filter((col) => {
    if (!col.key) return true;
    return columnVisibility[col.key as string] !== false;
  });

  return (
    <div>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Shipments
          </Title>
        </Col>
      </Row>

      {/* Filters */}
      <FilterPanel
        filters={filterConfig}
        onFilterChange={setFilterConfig}
        defaultExpanded={true}
      />

      {/* Shipments Section */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
        bodyStyle={{ padding: "24px", overflow: "hidden" }}
      >
        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }} align="middle">
          <Col xs={24} sm={24} md={12} lg={8}>
            <Title
              level={4}
              style={{
                margin: 0,
                color: isDark ? "#fff" : "#1f1f1f",
                fontWeight: 600,
              }}
            >
              Shipments
            </Title>
          </Col>
          <Col xs={24} sm={24} md={12} lg={16}>
            <Space
              style={{
                width: "100%",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Select
                value={pageSize}
                onChange={setPageSize}
                style={{ width: 150 }}
                suffixIcon={<DownOutlined />}
              >
                <Select.Option value={10}>Show 10 entries</Select.Option>
                <Select.Option value={25}>Show 25 entries</Select.Option>
                <Select.Option value={50}>Show 50 entries</Select.Option>
                <Select.Option value={100}>Show 100 entries</Select.Option>
              </Select>
              <Button
                icon={<FileTextOutlined />}
                onClick={handleExportCSV}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to CSV
              </Button>
              <Button
                icon={<FileExcelOutlined />}
                onClick={handleExportExcel}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to Excel
              </Button>
              <Button
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Print
              </Button>
              <Dropdown
                menu={columnVisibilityMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button
                  icon={<UnorderedListOutlined />}
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    fontWeight: 500,
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Column visibility
                </Button>
              </Dropdown>
              <Button
                icon={<FilePdfOutlined />}
                onClick={handleExportPDF}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to PDF
              </Button>
              <Search
                placeholder="Search..."
                allowClear
                enterButton={
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{
                      height: "40px",
                      borderRadius: "0 6px 6px 0",
                    }}
                  />
                }
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={(value) => setSearchText(value)}
                style={{
                  width: 200,
                }}
              />
            </Space>
          </Col>
        </Row>

        <Table
          columns={visibleColumns}
          dataSource={filteredShipments}
          loading={loading}
          pagination={{
            pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            style: {
              marginTop: "16px",
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            },
          }}
          scroll={{ x: "max-content" }}
          locale={{
            emptyText: "No data available in table",
          }}
        />
      </Card>

      {/* Modals */}
      {selectedShipment && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Shipment Details"
            data={selectedShipment}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Shipment"
            data={selectedShipment}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update shipment
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Shipment updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update shipment");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Shipment"
            message={`Are you sure you want to delete shipment "${selectedShipment.invoiceNo}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete shipment
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setShipments(shipments.filter((s) => s.key !== selectedShipment.key));
                message.success("Shipment deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete shipment");
              } finally {
                setActionLoading(false);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default Shipments;



