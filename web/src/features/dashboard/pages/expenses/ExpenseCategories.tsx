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
import AddExpenseCategoryModal from "@/components/modals/AddExpenseCategoryModal";
import type { ExpenseCategoryFormData } from "@/components/modals/AddExpenseCategoryModal";

const { Title, Text } = Typography;
const { Search } = Input;

export interface ExpenseCategoryData {
  key: string;
  categoryName: string;
  categoryCode: string;
}

const ExpenseCategories: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategoryData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    categoryName: true,
    categoryCode: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultCategories: ExpenseCategoryData[] = [
    {
      key: "1",
      categoryName: "Office Supplies",
      categoryCode: "OFF-001",
    },
    {
      key: "2",
      categoryName: "Utilities",
      categoryCode: "UTL-001",
    },
    {
      key: "3",
      categoryName: "Travel",
      categoryCode: "TRV-001",
    },
    {
      key: "4",
      categoryName: "Marketing",
      categoryCode: "MRK-001",
    },
    {
      key: "5",
      categoryName: "Rent",
      categoryCode: "RNT-001",
    },
    {
      key: "6",
      categoryName: "Insurance",
      categoryCode: "INS-001",
    },
    {
      key: "7",
      categoryName: "Professional Services",
      categoryCode: "PRF-001",
    },
    {
      key: "8",
      categoryName: "Maintenance",
      categoryCode: "MNT-001",
    },
    {
      key: "9",
      categoryName: "Training",
      categoryCode: "TRN-001",
    },
    {
      key: "10",
      categoryName: "Software",
      categoryCode: "SFT-001",
    },
    {
      key: "11",
      categoryName: "Hardware",
      categoryCode: "HRD-001",
    },
    {
      key: "12",
      categoryName: "Communication",
      categoryCode: "COM-001",
    },
    {
      key: "13",
      categoryName: "Legal",
      categoryCode: "LGL-001",
    },
    {
      key: "14",
      categoryName: "Accounting",
      categoryCode: "ACC-001",
    },
    {
      key: "15",
      categoryName: "Bank Charges",
      categoryCode: "BNK-001",
    },
  ];

  const [categories, setCategories] = useState<ExpenseCategoryData[]>(defaultCategories);

  // Filter categories based on search text
  const filteredCategories = useMemo(() => {
    let filtered = categories;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (category) =>
          category.categoryName.toLowerCase().includes(searchLower) ||
          category.categoryCode.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [categories, searchText]);

  const handleAddCategory = () => {
    setAddModalOpen(true);
  };

  const handleSaveCategory = async (values: ExpenseCategoryFormData) => {
    setActionLoading(true);
    try {
      // TODO: Implement API call to create expense category
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Generate a new key for the category
      const newKey = String(categories.length + 1);
      const newCategory: ExpenseCategoryData = {
        key: newKey,
        categoryName: values.categoryName,
        categoryCode: values.categoryCode || `CAT-${String(categories.length + 1).padStart(3, "0")}`,
      };
      
      setCategories([...categories, newCategory]);
      message.success("Expense category added successfully");
      setAddModalOpen(false);
    } catch (_error) {
      message.error("Failed to add expense category");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Expense categories refreshed successfully");
    }, 1000);
  };

  const handleView = (record: ExpenseCategoryData) => {
    setSelectedCategory(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: ExpenseCategoryData) => {
    setSelectedCategory(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: ExpenseCategoryData) => {
    setSelectedCategory(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = ["Category name", "Category code"];
    const csvData = filteredCategories.map((category) => [
      category.categoryName,
      category.categoryCode,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `expense_categories_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Expense categories exported to CSV successfully");
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
          <title>Expense Categories Report</title>
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
          <h1>Expense Categories Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Category name</th>
                <th>Category code</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCategories
                .map(
                  (category) => `
                <tr>
                  <td>${category.categoryName}</td>
                  <td>${category.categoryCode}</td>
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

  const columns: ColumnsType<ExpenseCategoryData> = [
    {
      title: "Category name",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
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
      title: "Category code",
      dataIndex: "categoryCode",
      key: "categoryCode",
      sorter: (a, b) => a.categoryCode.localeCompare(b.categoryCode),
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
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
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
            Expense Categories
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage your expense categories
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

      {/* All Expense Categories Section */}
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
              All your expense categories
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
          dataSource={filteredCategories}
          loading={loading}
          scroll={{ x: "max-content" }}
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
          locale={{
            emptyText: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                  }}
                >
                  No data available in table
                </Text>
              </div>
            ),
          }}
          style={{
            width: "100%",
          }}
        />
      </Card>

      {/* Add Modal */}
      <AddExpenseCategoryModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveCategory}
        loading={actionLoading}
      />

      {/* Modals */}
      {selectedCategory && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Expense Category Details"
            data={selectedCategory}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Expense Category"
            data={selectedCategory}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update expense category
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Expense category updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update expense category");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Expense Category"
            message={`Are you sure you want to delete expense category "${selectedCategory.categoryName}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete expense category
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setCategories(categories.filter((c) => c.key !== selectedCategory.key));
                message.success("Expense category deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete expense category");
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

export default ExpenseCategories;

