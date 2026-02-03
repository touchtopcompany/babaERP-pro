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
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Search } = Input;

export interface QuotationData {
  key: string;
  date: string;
  referenceNo: string;
  customerName: string;
  contactNumber: string;
  location: string;
  totalItems: number;
  addedBy: string;
}

const ListQuotations: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<QuotationData | null>(null);
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
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    businessLocation: filterConfig.businessLocation?.value || "all",
    customer: filterConfig.customer?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
    user: filterConfig.user?.value || "all",
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    date: true,
    referenceNo: true,
    customerName: true,
    contactNumber: true,
    location: true,
    totalItems: true,
    addedBy: true,
  });

  // Mock data - replace with API call
  const defaultQuotations: QuotationData[] = [
    {
      key: "1",
      date: "2025-01-15",
      referenceNo: "QUOT-2025-001",
      customerName: "John Doe",
      contactNumber: "+255 712 345 678",
      location: "C2Z Digital Solutions (C2Z1)",
      totalItems: 5,
      addedBy: "Jane Smith",
    },
    {
      key: "2",
      date: "2025-01-16",
      referenceNo: "QUOT-2025-002",
      customerName: "Mary Johnson",
      contactNumber: "+255 713 456 789",
      location: "C2Z Digital Solutions (C2Z1)",
      totalItems: 3,
      addedBy: "Bob Johnson",
    },
    {
      key: "3",
      date: "2025-01-17",
      referenceNo: "QUOT-2025-003",
      customerName: "Peter Wilson",
      contactNumber: "+255 714 567 890",
      location: "Location 2",
      totalItems: 8,
      addedBy: "Jane Smith",
    },
    {
      key: "4",
      date: "2025-01-18",
      referenceNo: "QUOT-2025-004",
      customerName: "Sarah Brown",
      contactNumber: "+255 715 678 901",
      location: "C2Z Digital Solutions (C2Z1)",
      totalItems: 2,
      addedBy: "Bob Johnson",
    },
    {
      key: "5",
      date: "2025-01-19",
      referenceNo: "QUOT-2025-005",
      customerName: "Michael Davis",
      contactNumber: "+255 716 789 012",
      location: "C2Z Digital Solutions (C2Z1)",
      totalItems: 12,
      addedBy: "Jane Smith",
    },
    {
      key: "6",
      date: "2025-01-20",
      referenceNo: "QUOT-2025-006",
      customerName: "Emily White",
      contactNumber: "+255 717 890 123",
      location: "Location 2",
      totalItems: 6,
      addedBy: "Bob Johnson",
    },
    {
      key: "7",
      date: "2025-01-21",
      referenceNo: "QUOT-2025-007",
      customerName: "David Miller",
      contactNumber: "+255 718 901 234",
      location: "C2Z Digital Solutions (C2Z1)",
      totalItems: 4,
      addedBy: "Jane Smith",
    },
    {
      key: "8",
      date: "2025-01-22",
      referenceNo: "QUOT-2025-008",
      customerName: "Lisa Anderson",
      contactNumber: "+255 719 012 345",
      location: "C2Z Digital Solutions (C2Z1)",
      totalItems: 9,
      addedBy: "Bob Johnson",
    },
    {
      key: "9",
      date: "2025-01-23",
      referenceNo: "QUOT-2025-009",
      customerName: "Robert Taylor",
      contactNumber: "+255 720 123 456",
      location: "Location 2",
      totalItems: 7,
      addedBy: "Jane Smith",
    },
    {
      key: "10",
      date: "2025-01-24",
      referenceNo: "QUOT-2025-010",
      customerName: "Jennifer Lee",
      contactNumber: "+255 721 234 567",
      location: "C2Z Digital Solutions (C2Z1)",
      totalItems: 11,
      addedBy: "Bob Johnson",
    },
  ];

  const [quotations, setQuotations] = useState<QuotationData[]>(defaultQuotations);

  // Filter quotations based on search text and filters
  const filteredQuotations = useMemo(() => {
    let filtered = quotations;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (quotation) =>
          quotation.referenceNo.toLowerCase().includes(searchLower) ||
          quotation.customerName.toLowerCase().includes(searchLower) ||
          quotation.location.toLowerCase().includes(searchLower) ||
          quotation.contactNumber.includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation && filters.businessLocation !== "all") {
      filtered = filtered.filter((q) => q.location === filters.businessLocation);
    }
    if (filters.customer !== "all") {
      filtered = filtered.filter((q) => q.customerName === filters.customer);
    }
    if (filters.user !== "all") {
      filtered = filtered.filter((q) => q.addedBy === filters.user);
    }

    return filtered;
  }, [quotations, searchText, filters]);

  const handleAddQuotation = () => {
    navigate("/sell/add-quotation");
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Quotations refreshed successfully");
    }, 1000);
  };

  const handleView = (record: QuotationData) => {
    setSelectedQuotation(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: QuotationData) => {
    setSelectedQuotation(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: QuotationData) => {
    setSelectedQuotation(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Reference No",
      "Customer Name",
      "Contact Number",
      "Location",
      "Total Items",
      "Added By",
    ];
    const csvData = filteredQuotations.map((quotation) => [
      quotation.date,
      quotation.referenceNo,
      quotation.customerName,
      quotation.contactNumber,
      quotation.location,
      quotation.totalItems,
      quotation.addedBy,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `quotations_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Quotations exported to CSV successfully");
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
          <title>Quotations Report</title>
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
          <h1>Quotations Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No</th>
                <th>Customer Name</th>
                <th>Total Items</th>
              </tr>
            </thead>
            <tbody>
              ${filteredQuotations
                .map(
                  (quotation) => `
                <tr>
                  <td>${quotation.date}</td>
                  <td>${quotation.referenceNo}</td>
                  <td>${quotation.customerName}</td>
                  <td>${quotation.totalItems}</td>
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

  const columns: ColumnsType<QuotationData> = [
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
      title: "Reference No",
      dataIndex: "referenceNo",
      key: "referenceNo",
      width: 150,
      sorter: (a, b) => a.referenceNo.localeCompare(b.referenceNo),
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
      title: "Total Items",
      dataIndex: "totalItems",
      key: "totalItems",
      width: 120,
      align: "right",
      sorter: (a, b) => a.totalItems - b.totalItems,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      width: 150,
      sorter: (a, b) => a.addedBy.localeCompare(b.addedBy),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "right",
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
  ];

  // Filter columns based on visibility
  const visibleColumns = columns.filter((col) => {
    if (col.key === "action") return columnVisibility.action;
    return columnVisibility[col.key as string] !== false;
  });

  return (
    <div>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            List Quotations
          </Title>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Space
            style={{
              width: "100%",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddQuotation}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add Quotation
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Filters Section */}
      <FilterPanel
        filters={filterConfig}
        onFilterChange={setFilterConfig}
        defaultExpanded={true}
      />

      {/* List Quotations Section */}
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
              List Quotations
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
          dataSource={filteredQuotations}
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
      {selectedQuotation && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Quotation Details"
            data={selectedQuotation}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Quotation"
            data={selectedQuotation}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update quotation
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Quotation updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update quotation");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Quotation"
            message={`Are you sure you want to delete quotation "${selectedQuotation.referenceNo}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete quotation
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setQuotations(quotations.filter((q) => q.key !== selectedQuotation.key));
                message.success("Quotation deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete quotation");
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

export default ListQuotations;

