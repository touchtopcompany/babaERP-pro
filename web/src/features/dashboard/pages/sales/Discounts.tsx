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
  Checkbox,
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
  StopOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import AddDiscountModal from "@/components/modals/AddDiscountModal";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface DiscountData {
  key: string;
  name: string;
  startsAt: string;
  endsAt: string;
  discountAmount: number;
  discountType: "percentage" | "fixed";
  priority: number;
  brand?: string;
  category?: string;
  products?: string[];
  location: string;
}

const Discounts: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountData | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Location:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2025-12-31")],
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    businessLocation: filterConfig.businessLocation?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    startsAt: true,
    endsAt: true,
    discountAmount: true,
    priority: true,
    brand: true,
    category: true,
    products: true,
    location: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultDiscounts: DiscountData[] = [
    {
      key: "1",
      name: "Summer Sale 2025",
      startsAt: "2025-06-01",
      endsAt: "2025-08-31",
      discountAmount: 20,
      discountType: "percentage",
      priority: 1,
      brand: "All Brands",
      category: "Electronics",
      products: ["Product A", "Product B", "Product C"],
      location: "C2Z Digital Solutions (C2Z1)",
    },
    {
      key: "2",
      name: "New Year Special",
      startsAt: "2025-01-01",
      endsAt: "2025-01-31",
      discountAmount: 50000,
      discountType: "fixed",
      priority: 2,
      brand: "Samsung",
      category: "Mobile Phones",
      products: ["Galaxy S24", "Galaxy A54"],
      location: "C2Z Digital Solutions (C2Z1)",
    },
    {
      key: "3",
      name: "Black Friday Deal",
      startsAt: "2025-11-24",
      endsAt: "2025-11-30",
      discountAmount: 30,
      discountType: "percentage",
      priority: 1,
      brand: "Apple",
      category: "Computers",
      products: ["MacBook Pro", "iMac", "iPad Pro"],
      location: "Location 2",
    },
    {
      key: "4",
      name: "Clearance Sale",
      startsAt: "2025-03-01",
      endsAt: "2025-03-31",
      discountAmount: 15,
      discountType: "percentage",
      priority: 3,
      brand: "HP",
      category: "Laptops",
      products: ["HP Pavilion", "HP EliteBook"],
      location: "C2Z Digital Solutions (C2Z1)",
    },
    {
      key: "5",
      name: "Student Discount",
      startsAt: "2025-01-01",
      endsAt: "2025-12-31",
      discountAmount: 10,
      discountType: "percentage",
      priority: 4,
      brand: "All Brands",
      category: "All Categories",
      products: [],
      location: "C2Z Digital Solutions (C2Z1)",
    },
    {
      key: "6",
      name: "Bulk Purchase Discount",
      startsAt: "2025-01-01",
      endsAt: "2025-12-31",
      discountAmount: 100000,
      discountType: "fixed",
      priority: 2,
      brand: "Dell",
      category: "Servers",
      products: ["Dell PowerEdge", "Dell OptiPlex"],
      location: "Location 2",
    },
    {
      key: "7",
      name: "Holiday Special",
      startsAt: "2025-12-20",
      endsAt: "2025-12-31",
      discountAmount: 25,
      discountType: "percentage",
      priority: 1,
      brand: "Lenovo",
      category: "Tablets",
      products: ["Lenovo Tab", "Yoga Tablet"],
      location: "C2Z Digital Solutions (C2Z1)",
    },
    {
      key: "8",
      name: "Early Bird Discount",
      startsAt: "2025-02-01",
      endsAt: "2025-02-28",
      discountAmount: 75000,
      discountType: "fixed",
      priority: 3,
      brand: "Asus",
      category: "Gaming Laptops",
      products: ["ROG Strix", "TUF Gaming"],
      location: "C2Z Digital Solutions (C2Z1)",
    },
  ];

  const [discounts, setDiscounts] = useState<DiscountData[]>(defaultDiscounts);

  // Filter discounts based on search text and filters
  const filteredDiscounts = useMemo(() => {
    let filtered = discounts;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (discount) =>
          discount.name.toLowerCase().includes(searchLower) ||
          discount.brand?.toLowerCase().includes(searchLower) ||
          discount.category?.toLowerCase().includes(searchLower) ||
          discount.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation && filters.businessLocation !== "all") {
      filtered = filtered.filter((d) => d.location === filters.businessLocation);
    }

    return filtered;
  }, [discounts, searchText, filters]);

  const handleAddDiscount = () => {
    setAddModalOpen(true);
  };

  const handleSaveDiscount = async (values: any) => {
    setActionLoading(true);
    try {
      // Convert form values to DiscountData format
      const newDiscount: DiscountData = {
        key: Date.now().toString(),
        name: values.name,
        startsAt: values.startsAt ? values.startsAt.format("YYYY-MM-DD") : "",
        endsAt: values.endsAt ? values.endsAt.format("YYYY-MM-DD") : "",
        discountAmount: values.discountAmount || 0,
        discountType: values.discountType || "percentage",
        priority: values.priority || 0,
        brand: values.brand,
        category: values.category,
        products: values.products ? values.products.split(",").map((p: string) => p.trim()) : [],
        location: values.location,
      };

      // TODO: Implement API call to save discount
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setDiscounts([...discounts, newDiscount]);
      message.success("Discount added successfully");
      setAddModalOpen(false);
    } catch (error) {
      message.error("Failed to add discount");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Discounts refreshed successfully");
    }, 1000);
  };

  const handleDeactivateSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one discount to deactivate");
      return;
    }
    message.info(`Deactivating ${selectedRowKeys.length} discount(s)...`);
    // TODO: Implement API call to deactivate discounts
  };

  const handleView = (record: DiscountData) => {
    setSelectedDiscount(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: DiscountData) => {
    setSelectedDiscount(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: DiscountData) => {
    setSelectedDiscount(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Starts At",
      "Ends At",
      "Discount Amount",
      "Priority",
      "Brand",
      "Category",
      "Products",
      "Location",
    ];
    const csvData = filteredDiscounts.map((discount) => [
      discount.name,
      discount.startsAt,
      discount.endsAt,
      discount.discountType === "percentage" 
        ? `${discount.discountAmount}%` 
        : `TSh ${discount.discountAmount}`,
      discount.priority,
      discount.brand || "",
      discount.category || "",
      discount.products?.join(", ") || "",
      discount.location,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `discounts_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Discounts exported to CSV successfully");
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
          <title>Discounts Report</title>
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
          <h1>Discounts Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Starts At</th>
                <th>Ends At</th>
                <th>Discount Amount</th>
                <th>Priority</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              ${filteredDiscounts
                .map(
                  (discount) => `
                <tr>
                  <td>${discount.name}</td>
                  <td>${discount.startsAt}</td>
                  <td>${discount.endsAt}</td>
                  <td>${discount.discountType === "percentage" ? `${discount.discountAmount}%` : `TSh ${discount.discountAmount}`}</td>
                  <td>${discount.priority}</td>
                  <td>${discount.location}</td>
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
          <Checkbox
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns: ColumnsType<DiscountData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Starts At",
      dataIndex: "startsAt",
      key: "startsAt",
      width: 150,
      sorter: (a, b) => a.startsAt.localeCompare(b.startsAt),
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
      title: "Ends At",
      dataIndex: "endsAt",
      key: "endsAt",
      width: 150,
      sorter: (a, b) => a.endsAt.localeCompare(b.endsAt),
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
      title: "Discount Amount",
      dataIndex: "discountAmount",
      key: "discountAmount",
      width: 150,
      align: "right",
      sorter: (a, b) => a.discountAmount - b.discountAmount,
      render: (value: number, record: DiscountData) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          {record.discountType === "percentage"
            ? `${value}%`
            : `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        </Text>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 100,
      align: "right",
      sorter: (a, b) => a.priority - b.priority,
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
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 150,
      sorter: (a, b) => (a.brand || "").localeCompare(b.brand || ""),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text || "-"}
        </Text>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      sorter: (a, b) => (a.category || "").localeCompare(b.category || ""),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text || "-"}
        </Text>
      ),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      width: 200,
      render: (products: string[] | undefined) => {
        if (!products || products.length === 0) return "-";
        if (products.length === 1) return products[0];
        return (
          <Tooltip title={products.join(", ")}>
            <Text
              style={{
                fontSize: "13px",
                color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
              }}
            >
              {products.length} products
            </Text>
          </Tooltip>
        );
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
      sorter: (a, b) => a.location.localeCompare(b.location),
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
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
            }}
          />
        </Space>
      ),
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
            Discount
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            All your discounts
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
              onClick={handleAddDiscount}
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
        defaultExpanded={false}
      />

      {/* Discount Management Section */}
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
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Space>
                <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Show
                </Text>
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
                <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  entries
                </Text>
              </Space>
              {selectedRowKeys.length > 0 && (
                <Button
                  icon={<StopOutlined />}
                  onClick={handleDeactivateSelected}
                  style={{
                    height: "32px",
                    borderRadius: "6px",
                    fontWeight: 500,
                    background: "#ff9800",
                    borderColor: "#ff9800",
                    color: "#fff",
                  }}
                >
                  Deactivate Selected
                </Button>
              )}
            </Space>
          </Col>
          <Col xs={24} sm={24} md={12} lg={16}>
            <Space
              style={{
                width: "100%",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
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
          dataSource={filteredDiscounts}
          loading={loading}
          rowSelection={rowSelection}
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
      <AddDiscountModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveDiscount}
        loading={actionLoading}
      />
      {selectedDiscount && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Discount Details"
            data={selectedDiscount}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Discount"
            data={selectedDiscount}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update discount
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Discount updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update discount");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Discount"
            message={`Are you sure you want to delete discount "${selectedDiscount.name}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete discount
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setDiscounts(discounts.filter((d) => d.key !== selectedDiscount.key));
                message.success("Discount deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete discount");
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

export default Discounts;

