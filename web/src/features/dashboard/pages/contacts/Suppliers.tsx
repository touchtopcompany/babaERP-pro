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
  Checkbox,
  Select,
  Collapse,
  Divider,
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

const { Title, Text } = Typography;
const { Search } = Input;

export interface SupplierData {
  key: string;
  contactId: string;
  businessName: string;
  name: string;
  email: string;
  taxNumber: string;
  payTerm: string;
  openingBalance: number;
  advanceBalance: number;
  addedOn: string;
  address: string;
  mobile: string;
  totalPurchaseDue: number;
  totalPurchaseReturnDue: number;
  customField1?: string;
  customField2?: string;
  customField3?: string;
  customField4?: string;
  customField5?: string;
  customField6?: string;
  customField7?: string;
  customField8?: string;
  customField9?: string;
  customField10?: string;
  assignedTo?: string;
  status?: string;
}

const Suppliers: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    purchaseDue: {
      label: "Purchase Due",
      value: false,
    },
    purchaseReturn: {
      label: "Purchase Return",
      value: false,
    },
    advanceBalance: {
      label: "Advance Balance",
      value: false,
    },
    openingBalance: {
      label: "Opening Balance",
      value: false,
    },
    assignedTo: {
      label: "Assigned to:",
      value: undefined,
      options: [
        { label: "User 1", value: "User 1" },
        { label: "User 2", value: "User 2" },
      ],
      allowClear: true,
      placeholder: "None",
    },
    status: {
      label: "Status:",
      value: undefined,
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      allowClear: true,
      placeholder: "None",
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    purchaseDue: filterConfig.purchaseDue?.value || false,
    purchaseReturn: filterConfig.purchaseReturn?.value || false,
    advanceBalance: filterConfig.advanceBalance?.value || false,
    openingBalance: filterConfig.openingBalance?.value || false,
    assignedTo: filterConfig.assignedTo?.value,
    status: filterConfig.status?.value,
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    contactId: true,
    businessName: true,
    name: true,
    email: true,
    taxNumber: true,
    payTerm: true,
    openingBalance: true,
    advanceBalance: true,
    addedOn: true,
    address: true,
    mobile: true,
    totalPurchaseDue: true,
    totalPurchaseReturnDue: true,
    customField1: false,
    customField2: false,
    customField3: false,
    customField4: false,
    customField5: false,
    customField6: false,
    customField7: false,
    customField8: false,
    customField9: false,
    customField10: false,
  });

  // Mock data - replace with API call
  const defaultSuppliers: SupplierData[] = [
    {
      key: "1",
      contactId: "SUP-001",
      businessName: "ABC Trading Co.",
      name: "John Smith",
      email: "john.smith@abctrading.com",
      taxNumber: "TAX-123456",
      payTerm: "Net 30",
      openingBalance: 5000.00,
      advanceBalance: 2000.00,
      addedOn: "2024-01-15",
      address: "123 Main St, City",
      mobile: "+255 123 456 789",
      totalPurchaseDue: 15000.00,
      totalPurchaseReturnDue: 500.00,
      assignedTo: "User 1",
      status: "Active",
    },
    {
      key: "2",
      contactId: "SUP-002",
      businessName: "XYZ Suppliers Ltd",
      name: "Jane Doe",
      email: "jane.doe@xyzltd.com",
      taxNumber: "TAX-789012",
      payTerm: "Net 15",
      openingBalance: 3000.00,
      advanceBalance: 1000.00,
      addedOn: "2024-01-10",
      address: "456 Market Ave, Town",
      mobile: "+255 987 654 321",
      totalPurchaseDue: 8000.00,
      totalPurchaseReturnDue: 200.00,
      assignedTo: "User 2",
      status: "Active",
    },
    {
      key: "3",
      contactId: "SUP-003",
      businessName: "Global Imports Inc",
      name: "Bob Johnson",
      email: "bob@globalimports.com",
      taxNumber: "TAX-345678",
      payTerm: "Net 45",
      openingBalance: 10000.00,
      advanceBalance: 5000.00,
      addedOn: "2024-01-05",
      address: "789 Business Blvd, District",
      mobile: "+255 555 123 456",
      totalPurchaseDue: 25000.00,
      totalPurchaseReturnDue: 1000.00,
      assignedTo: "User 1",
      status: "Inactive",
    },
  ];

  const [suppliers, setSuppliers] = useState<SupplierData[]>(defaultSuppliers);

  // Filter suppliers based on search text and filters
  const filteredSuppliers = useMemo(() => {
    let filtered = suppliers;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (supplier) =>
          supplier.contactId.toLowerCase().includes(searchLower) ||
          supplier.businessName.toLowerCase().includes(searchLower) ||
          supplier.name.toLowerCase().includes(searchLower) ||
          supplier.email.toLowerCase().includes(searchLower) ||
          supplier.mobile.toLowerCase().includes(searchLower)
      );
    }

    // Apply checkbox filters
    if (filters.purchaseDue) {
      filtered = filtered.filter((s) => s.totalPurchaseDue > 0);
    }
    if (filters.purchaseReturn) {
      filtered = filtered.filter((s) => s.totalPurchaseReturnDue > 0);
    }
    if (filters.advanceBalance) {
      filtered = filtered.filter((s) => s.advanceBalance > 0);
    }
    if (filters.openingBalance) {
      filtered = filtered.filter((s) => s.openingBalance > 0);
    }

    // Apply dropdown filters
    if (filters.assignedTo) {
      filtered = filtered.filter((s) => s.assignedTo === filters.assignedTo);
    }
    if (filters.status) {
      filtered = filtered.filter((s) => s.status === filters.status);
    }

    return filtered;
  }, [suppliers, searchText, filters]);

  // Calculate totals
  const totals = useMemo(() => {
    return {
      totalPurchaseDue: filteredSuppliers.reduce((sum, s) => sum + s.totalPurchaseDue, 0),
      totalPurchaseReturnDue: filteredSuppliers.reduce((sum, s) => sum + s.totalPurchaseReturnDue, 0),
    };
  }, [filteredSuppliers]);

  const handleAddSupplier = () => {
    // TODO: Navigate to add supplier page or open add supplier modal
    message.info("Add supplier functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh suppliers
    setTimeout(() => {
      setLoading(false);
      message.success("Suppliers refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = [
      "Contact ID",
      "Business Name",
      "Name",
      "Email",
      "Tax Number",
      "Pay Term",
      "Opening Balance",
      "Advance Balance",
      "Added On",
      "Address",
      "Mobile",
      "Total Purchase Due",
      "Total Purchase Return Due",
    ];
    const csvData = filteredSuppliers.map((supplier) => [
      supplier.contactId,
      supplier.businessName,
      supplier.name,
      supplier.email,
      supplier.taxNumber,
      supplier.payTerm,
      supplier.openingBalance.toFixed(2),
      supplier.advanceBalance.toFixed(2),
      supplier.addedOn,
      supplier.address,
      supplier.mobile,
      supplier.totalPurchaseDue.toFixed(2),
      supplier.totalPurchaseReturnDue.toFixed(2),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `suppliers_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Suppliers exported to CSV successfully");
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
          <title>Suppliers Report</title>
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
          <h1>Suppliers Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Contact ID</th>
                <th>Business Name</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Total Purchase Due</th>
                <th>Total Purchase Return Due</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSuppliers
                .map(
                  (supplier) => `
                <tr>
                  <td>${supplier.contactId}</td>
                  <td>${supplier.businessName}</td>
                  <td>${supplier.name}</td>
                  <td>${supplier.email}</td>
                  <td>${supplier.mobile}</td>
                  <td>${supplier.totalPurchaseDue.toFixed(2)}</td>
                  <td>${supplier.totalPurchaseReturnDue.toFixed(2)}</td>
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
        <Checkbox
          checked={columnVisibility[key]}
          onChange={(e) => handleColumnVisibilityChange(key, e.target.checked)}
        >
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim()}
        </Checkbox>
      ),
    })),
  };

  const columns: ColumnsType<SupplierData> = [
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
              setSelectedSupplier(record);
              setViewModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedSupplier(record);
              setEditModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedSupplier(record);
              setDeleteModalOpen(true);
            }}
            danger
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
            }}
          />
        </Space>
      ),
    },
    {
      title: "Contact ID",
      dataIndex: "contactId",
      key: "contactId",
      width: 120,
      sorter: (a, b) => a.contactId.localeCompare(b.contactId),
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      width: 200,
      sorter: (a, b) => a.businessName.localeCompare(b.businessName),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Tax number",
      dataIndex: "taxNumber",
      key: "taxNumber",
      width: 150,
    },
    {
      title: "Pay term",
      dataIndex: "payTerm",
      key: "payTerm",
      width: 120,
    },
    {
      title: "Opening Balance",
      dataIndex: "openingBalance",
      key: "openingBalance",
      width: 150,
      align: "right",
      sorter: (a, b) => a.openingBalance - b.openingBalance,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Advance Balance",
      dataIndex: "advanceBalance",
      key: "advanceBalance",
      width: 150,
      align: "right",
      sorter: (a, b) => a.advanceBalance - b.advanceBalance,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Added On",
      dataIndex: "addedOn",
      key: "addedOn",
      width: 120,
      sorter: (a, b) => new Date(a.addedOn).getTime() - new Date(b.addedOn).getTime(),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      width: 150,
    },
    {
      title: "Total Purchase Due",
      dataIndex: "totalPurchaseDue",
      key: "totalPurchaseDue",
      width: 180,
      align: "right",
      sorter: (a, b) => a.totalPurchaseDue - b.totalPurchaseDue,
      render: (value: number) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Total Purchase Return Due",
      dataIndex: "totalPurchaseReturnDue",
      key: "totalPurchaseReturnDue",
      width: 220,
      align: "right",
      sorter: (a, b) => a.totalPurchaseReturnDue - b.totalPurchaseReturnDue,
      render: (value: number) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Custom Field 1",
      dataIndex: "customField1",
      key: "customField1",
      width: 150,
    },
    {
      title: "Custom Field 2",
      dataIndex: "customField2",
      key: "customField2",
      width: 150,
    },
    {
      title: "Custom Field 3",
      dataIndex: "customField3",
      key: "customField3",
      width: 150,
    },
    {
      title: "Custom Field 4",
      dataIndex: "customField4",
      key: "customField4",
      width: 150,
    },
    {
      title: "Custom Field 5",
      dataIndex: "customField5",
      key: "customField5",
      width: 150,
    },
    {
      title: "Custom Field 6",
      dataIndex: "customField6",
      key: "customField6",
      width: 150,
    },
    {
      title: "Custom Field 7",
      dataIndex: "customField7",
      key: "customField7",
      width: 150,
    },
    {
      title: "Custom Field 8",
      dataIndex: "customField8",
      key: "customField8",
      width: 150,
    },
    {
      title: "Custom Field 9",
      dataIndex: "customField9",
      key: "customField9",
      width: 150,
    },
    {
      title: "Custom Field 10",
      dataIndex: "customField10",
      key: "customField10",
      width: 150,
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
        <Col xs={24} sm={24} md={12} lg={12}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Suppliers
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage your Suppliers
          </Text>
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
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={loading}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddSupplier}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add
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

      <Divider style={{ margin: "24px 0" }} />

      {/* All your Suppliers Section */}
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
              All your Suppliers
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

        <style>{`
          .suppliers-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .suppliers-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .suppliers-table .ant-table-thead > tr > th:first-child {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "#1890ff"} !important;
            color: ${isDark ? "rgba(255,255,255,0.85)" : "#fff"} !important;
          }
          .suppliers-table .ant-table-thead > tr > th:first-child:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .suppliers-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .suppliers-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .suppliers-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .suppliers-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
          .suppliers-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .suppliers-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .suppliers-table .ant-table-column-sorter-up.on,
          .suppliers-table .ant-table-column-sorter-down.on,
          .suppliers-table .ant-table-column-sorter-up.active,
          .suppliers-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#fff"} !important;
            opacity: 1 !important;
          }
          .suppliers-table .ant-table-thead > tr > th:first-child .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"} !important;
          }
          .suppliers-table .ant-table-thead > tr > th:first-child .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
          .suppliers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"} !important;
          }
          .suppliers-table .ant-table-thead > tr > th:nth-child(2).ant-table-column-sorted .ant-table-column-sorter-up,
          .suppliers-table .ant-table-thead > tr > th:nth-child(2).ant-table-column-sorted .ant-table-column-sorter-down,
          .suppliers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter-up.on,
          .suppliers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter-down.on,
          .suppliers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter-up.active,
          .suppliers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter-down.active {
            color: ${isDark ? "rgba(255,255,255,0.85)" : "#1890ff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="suppliers-table"
          columns={visibleColumns}
          dataSource={filteredSuppliers}
          loading={loading}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            style: {
              marginTop: "16px",
            },
          }}
          scroll={{ x: "max-content" }}
          style={{
            background: isDark ? "transparent" : "#fafafa",
          }}
          summary={(_pageData) => {
            // Find indices of Total Purchase Due and Total Purchase Return Due columns
            const purchaseDueIndex = visibleColumns.findIndex((col) => col.key === "totalPurchaseDue");
            const purchaseReturnIndex = visibleColumns.findIndex((col) => col.key === "totalPurchaseReturnDue");
            
            if (purchaseDueIndex === -1 || purchaseReturnIndex === -1) {
              return null;
            }

            // Calculate colspan for cells before the totals
            const colSpanBefore = purchaseDueIndex;
            const colSpanBetween = purchaseReturnIndex - purchaseDueIndex - 1;
            const colSpanAfter = visibleColumns.length - purchaseReturnIndex - 1;

            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={colSpanBefore}>
                    <Text strong>Total:</Text>
                  </Table.Summary.Cell>
                  {colSpanBetween > 0 && (
                    <Table.Summary.Cell index={purchaseDueIndex} colSpan={colSpanBetween} />
                  )}
                  <Table.Summary.Cell index={purchaseDueIndex} align="right">
                    <Text strong>TSh {totals.totalPurchaseDue.toFixed(2)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={purchaseReturnIndex} align="right">
                    <Text strong>TSh {totals.totalPurchaseReturnDue.toFixed(2)}</Text>
                  </Table.Summary.Cell>
                  {colSpanAfter > 0 && (
                    <Table.Summary.Cell index={purchaseReturnIndex + 1} colSpan={colSpanAfter} />
                  )}
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Card>

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedSupplier(null);
        }}
        title="Supplier Details"
        data={selectedSupplier}
        fields={[
          { key: "contactId", label: "Contact ID" },
          { key: "businessName", label: "Business Name" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "taxNumber", label: "Tax Number" },
          { key: "payTerm", label: "Pay Term" },
          { key: "openingBalance", label: "Opening Balance" },
          { key: "advanceBalance", label: "Advance Balance" },
          { key: "addedOn", label: "Added On" },
          { key: "address", label: "Address" },
          { key: "mobile", label: "Mobile" },
          { key: "totalPurchaseDue", label: "Total Purchase Due" },
          { key: "totalPurchaseReturnDue", label: "Total Purchase Return Due" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedSupplier(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update supplier
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Supplier updated successfully");
            setEditModalOpen(false);
            setSelectedSupplier(null);
          } catch (_error) {
            message.error("Failed to update supplier");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Supplier"
        data={selectedSupplier}
        fields={[
          { name: "businessName", label: "Business Name", type: "text", required: true },
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "taxNumber", label: "Tax Number", type: "text" },
          { name: "payTerm", label: "Pay Term", type: "text" },
          { name: "mobile", label: "Mobile", type: "text" },
          { name: "address", label: "Address", type: "text" },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedSupplier(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete supplier
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Supplier deleted successfully");
            setSuppliers(suppliers.filter((s) => s.key !== selectedSupplier?.key));
            setDeleteModalOpen(false);
            setSelectedSupplier(null);
          } catch (_error) {
            message.error("Failed to delete supplier");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Supplier"
        itemName={selectedSupplier?.businessName}
        loading={actionLoading}
      />
    </div>
  );
};

export default Suppliers;

