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
import { ViewModal, EditModal, DeleteModal, AddModal } from "@/components/modals";

const { Title, Text } = Typography;
const { Search } = Input;

export interface CategoryData {
  key: string;
  category: string;
  categoryCode: string;
  description: string;
}

const Categories: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    category: true,
    categoryCode: true,
    description: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultCategories: CategoryData[] = [
    {
      key: "1",
      category: "Electronics",
      categoryCode: "ELEC-001",
      description: "Electronic products and devices",
    },
    {
      key: "2",
      category: "Clothing",
      categoryCode: "CLTH-001",
      description: "Apparel and clothing items",
    },
    {
      key: "3",
      category: "Food & Beverages",
      categoryCode: "FOOD-001",
      description: "Food and beverage products",
    },
    {
      key: "4",
      category: "Home & Garden",
      categoryCode: "HOME-001",
      description: "Home and garden supplies",
    },
    {
      key: "5",
      category: "Sports & Outdoors",
      categoryCode: "SPRT-001",
      description: "Sports equipment and outdoor gear",
    },
  ];

  const [categories, setCategories] = useState<CategoryData[]>(defaultCategories);

  // Filter categories based on search text
  const filteredCategories = useMemo(() => {
    if (!searchText) return categories;
    const searchLower = searchText.toLowerCase();
    return categories.filter(
      (category) =>
        category.category.toLowerCase().includes(searchLower) ||
        category.categoryCode.toLowerCase().includes(searchLower) ||
        category.description.toLowerCase().includes(searchLower)
    );
  }, [categories, searchText]);

  const handleAddCategory = () => {
    setAddModalOpen(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh categories
    setTimeout(() => {
      setLoading(false);
      message.success("Categories refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = ["Category", "Category Code", "Description"];
    const csvData = filteredCategories.map((category) => [
      category.category,
      category.categoryCode,
      category.description,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `categories_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Categories exported to CSV successfully");
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
          <title>Categories Report</title>
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
          <h1>Categories Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Category Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCategories
                .map(
                  (category) => `
                <tr>
                  <td>${category.category}</td>
                  <td>${category.categoryCode}</td>
                  <td>${category.description}</td>
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

  const columns: ColumnsType<CategoryData> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Category Code",
      dataIndex: "categoryCode",
      key: "categoryCode",
      sorter: (a, b) => a.categoryCode.localeCompare(b.categoryCode),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontFamily: "monospace",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedCategory(record);
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
              setSelectedCategory(record);
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
              setSelectedCategory(record);
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
            Categories
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage your categories
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
              onClick={handleAddCategory}
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

      {/* All Categories Section */}
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
            <Space>
              <Text
                style={{
                  fontSize: "14px",
                  color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                }}
              >
                Show
              </Text>
              <Select
                value={pageSize}
                onChange={setPageSize}
                style={{ width: 80 }}
                suffixIcon={<DownOutlined />}
              >
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={25}>25</Select.Option>
                <Select.Option value={50}>50</Select.Option>
                <Select.Option value={100}>100</Select.Option>
              </Select>
              <Text
                style={{
                  fontSize: "14px",
                  color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                }}
              >
                entries
              </Text>
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

        <style>{`
          .categories-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .categories-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .categories-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .categories-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .categories-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .categories-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)"} !important;
          }
          .categories-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .categories-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .categories-table .ant-table-column-sorter-up.on,
          .categories-table .ant-table-column-sorter-down.on,
          .categories-table .ant-table-column-sorter-up.active,
          .categories-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#1890ff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="categories-table"
          columns={visibleColumns}
          dataSource={filteredCategories}
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
          locale={{
            emptyText: "No data available in table",
          }}
          style={{
            background: isDark ? "transparent" : "#fafafa",
          }}
        />
      </Card>

      {/* Add Modal */}
      <AddModal
        open={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
        }}
        onSave={async (values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to create category
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const newCategory: CategoryData = {
              key: Date.now().toString(),
              category: values.category,
              categoryCode: values.categoryCode || "",
              description: values.description || "",
            };
            setCategories([...categories, newCategory]);
            message.success("Category created successfully");
            setAddModalOpen(false);
          } catch (_error) {
            message.error("Failed to create category");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Add Category"
        fields={[
          { name: "category", label: "Category", type: "text", required: true, placeholder: "Enter category name" },
          { name: "categoryCode", label: "Category Code", type: "text", required: false, placeholder: "Enter category code" },
          { name: "description", label: "Description", type: "textarea", required: false, placeholder: "Enter description" },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedCategory(null);
        }}
        title="Category Details"
        data={selectedCategory}
        fields={[
          { key: "category", label: "Category" },
          { key: "categoryCode", label: "Category Code" },
          { key: "description", label: "Description" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedCategory(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update category
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Category updated successfully");
            setEditModalOpen(false);
            setSelectedCategory(null);
          } catch (_error) {
            message.error("Failed to update category");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Category"
        data={selectedCategory}
        fields={[
          { name: "category", label: "Category", type: "text", required: true },
          { name: "categoryCode", label: "Category Code", type: "text", required: false },
          { name: "description", label: "Description", type: "textarea", required: false },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete category
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Category deleted successfully");
            setCategories(categories.filter((c) => c.key !== selectedCategory?.key));
            setDeleteModalOpen(false);
            setSelectedCategory(null);
          } catch (_error) {
            message.error("Failed to delete category");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Category"
        itemName={selectedCategory?.category}
        loading={actionLoading}
      />
    </div>
  );
};

export default Categories;

