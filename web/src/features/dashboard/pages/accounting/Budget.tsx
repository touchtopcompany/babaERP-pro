import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  message,
  Row,
  Col,
  Select,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal, AddBudgetModal } from "@/components/modals";
import type { AddBudgetFormData } from "@/components/modals";

const { Title, Text } = Typography;

export interface BudgetData {
  key: string;
  category: string;
  budgetedAmount: number;
  actualAmount: number;
  variance: number;
  notes?: string;
}

const FINANCIAL_YEARS = [
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
];

// Mock budget data per financial year
const getMockBudgetByYear = (_year: string): BudgetData[] => [
  {
    key: "1",
    category: "Office Supplies",
    budgetedAmount: 1200000.00,
    actualAmount: 980000.00,
    variance: 220000.00,
    notes: "Under budget - bulk purchases",
  },
  {
    key: "2",
    category: "Utilities",
    budgetedAmount: 2400000.00,
    actualAmount: 2550000.00,
    variance: -150000.00,
    notes: "Over budget - electricity increase",
  },
  {
    key: "3",
    category: "Travel & Transport",
    budgetedAmount: 1800000.00,
    actualAmount: 1650000.00,
    variance: 150000.00,
    notes: "Under budget",
  },
  {
    key: "4",
    category: "Marketing",
    budgetedAmount: 3500000.00,
    actualAmount: 3200000.00,
    variance: 300000.00,
    notes: "Campaign delayed to next quarter",
  },
  {
    key: "5",
    category: "Salaries & Wages",
    budgetedAmount: 48000000.00,
    actualAmount: 47500000.00,
    variance: 500000.00,
    notes: "One position vacant for 2 months",
  },
  {
    key: "6",
    category: "Rent",
    budgetedAmount: 12000000.00,
    actualAmount: 12000000.00,
    variance: 0.00,
    notes: "On target",
  },
  {
    key: "7",
    category: "Insurance",
    budgetedAmount: 2400000.00,
    actualAmount: 2380000.00,
    variance: 20000.00,
    notes: "Annual premium paid",
  },
  {
    key: "8",
    category: "IT & Software",
    budgetedAmount: 3600000.00,
    actualAmount: 3850000.00,
    variance: -250000.00,
    notes: "Additional licenses purchased",
  },
  {
    key: "9",
    category: "Training & Development",
    budgetedAmount: 1500000.00,
    actualAmount: 1200000.00,
    variance: 300000.00,
    notes: "Under budget - postponed workshops",
  },
  {
    key: "10",
    category: "Maintenance & Repairs",
    budgetedAmount: 2000000.00,
    actualAmount: 1850000.00,
    variance: 150000.00,
    notes: "Minor repairs only",
  },
  {
    key: "11",
    category: "Telecommunications",
    budgetedAmount: 900000.00,
    actualAmount: 920000.00,
    variance: -20000.00,
    notes: "Slight overrun",
  },
  {
    key: "12",
    category: "Professional Services",
    budgetedAmount: 2800000.00,
    actualAmount: 2650000.00,
    variance: 150000.00,
    notes: "Legal and audit fees",
  },
  {
    key: "13",
    category: "Equipment",
    budgetedAmount: 5000000.00,
    actualAmount: 4800000.00,
    variance: 200000.00,
    notes: "Deferred one purchase",
  },
  {
    key: "14",
    category: "Bank Charges & Fees",
    budgetedAmount: 600000.00,
    actualAmount: 580000.00,
    variance: 20000.00,
    notes: "Within budget",
  },
  {
    key: "15",
    category: "Miscellaneous",
    budgetedAmount: 800000.00,
    actualAmount: 750000.00,
    variance: 50000.00,
    notes: "Contingency",
  },
  {
    key: "16",
    category: "Advertising",
    budgetedAmount: 2200000.00,
    actualAmount: 2100000.00,
    variance: 100000.00,
    notes: "Digital ads",
  },
  {
    key: "17",
    category: "Subscriptions",
    budgetedAmount: 450000.00,
    actualAmount: 420000.00,
    variance: 30000.00,
    notes: "SaaS subscriptions",
  },
  {
    key: "18",
    category: "Staff Welfare",
    budgetedAmount: 1100000.00,
    actualAmount: 1050000.00,
    variance: 50000.00,
    notes: "Team events",
  },
  {
    key: "19",
    category: "Security",
    budgetedAmount: 950000.00,
    actualAmount: 980000.00,
    variance: -30000.00,
    notes: "CCTV upgrade",
  },
  {
    key: "20",
    category: "Cleaning & Hygiene",
    budgetedAmount: 720000.00,
    actualAmount: 700000.00,
    variance: 20000.00,
    notes: "Monthly cleaning contract",
  },
  {
    key: "21",
    category: "Printing & Stationery",
    budgetedAmount: 550000.00,
    actualAmount: 520000.00,
    variance: 30000.00,
    notes: "Under budget",
  },
  {
    key: "22",
    category: "Fuel & Vehicle",
    budgetedAmount: 1800000.00,
    actualAmount: 1950000.00,
    variance: -150000.00,
    notes: "Fuel price increase",
  },
  {
    key: "23",
    category: "Consultancy",
    budgetedAmount: 3200000.00,
    actualAmount: 3000000.00,
    variance: 200000.00,
    notes: "Strategy consultancy",
  },
  {
    key: "24",
    category: "Donations & CSR",
    budgetedAmount: 500000.00,
    actualAmount: 480000.00,
    variance: 20000.00,
    notes: "Community initiatives",
  },
  {
    key: "25",
    category: "Depreciation",
    budgetedAmount: 3500000.00,
    actualAmount: 3500000.00,
    variance: 0.00,
    notes: "As planned",
  },
];

const Budget: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [financialYear, setFinancialYear] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const budgetData = useMemo(() => {
    if (!financialYear) return [];
    return getMockBudgetByYear(financialYear);
  }, [financialYear]);

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleSaveBudget = async (values: AddBudgetFormData) => {
    setActionLoading(true);
    try {
      setFinancialYear(values.financialYear);
      message.success(`Budget for financial year ${values.financialYear} is ready`);
    } catch (_error) {
      message.error("Failed to set financial year");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Budget refreshed successfully");
    }, 1000);
  };

  const handleView = (record: BudgetData) => {
    setSelectedBudget(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: BudgetData) => {
    setSelectedBudget(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: BudgetData) => {
    setSelectedBudget(record);
    setDeleteModalOpen(true);
  };

  const columns: ColumnsType<BudgetData> = [
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "left",
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
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 220,
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontWeight: 500,
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Budgeted amount",
      dataIndex: "budgetedAmount",
      key: "budgetedAmount",
      width: 160,
      align: "right",
      sorter: (a, b) => a.budgetedAmount - b.budgetedAmount,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Actual amount",
      dataIndex: "actualAmount",
      key: "actualAmount",
      width: 160,
      align: "right",
      sorter: (a, b) => a.actualAmount - b.actualAmount,
      render: (value: number) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Variance",
      dataIndex: "variance",
      key: "variance",
      width: 160,
      align: "right",
      sorter: (a, b) => a.variance - b.variance,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: value >= 0 ? (isDark ? "#52c41a" : "#52c41a") : (isDark ? "#ff4d4f" : "#ff4d4f"),
            fontWeight: 500,
          }}
        >
          {value >= 0 ? "+" : ""}TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      width: 280,
      render: (text: string | undefined) => (
        <Text
          ellipsis
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
          }}
        >
          {text || "-"}
        </Text>
      ),
    },
  ];

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
            Budget
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
              onClick={handleAdd}
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

      {/* Financial year selector */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
        styles={{ body: { padding: "16px 24px" } }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={24} md={8} lg={6}>
            <Text
              strong
              style={{
                display: "block",
                marginBottom: 8,
                color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
              }}
            >
              Financial year for the budget
            </Text>
            <Select
              placeholder="Select financial year"
              allowClear
              value={financialYear ?? undefined}
              onChange={(value) => setFinancialYear(value ?? null)}
              options={FINANCIAL_YEARS}
              style={{
                width: "100%",
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* Content: message when no year, table when year selected */}
      {!financialYear ? (
        <Card
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          }}
          styles={{ body: { padding: "48px 24px", textAlign: "center" } }}
        >
          <Text
            style={{
              fontSize: "15px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
            }}
          >
            Select a financial year to view the budget
          </Text>
        </Card>
      ) : (
        <Card
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "100%",
          }}
          styles={{ body: { padding: "24px", overflow: "hidden" } }}
        >
          <Table
            columns={columns}
            dataSource={budgetData}
            loading={loading}
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: 25,
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
            style={{ width: "100%" }}
          />
        </Card>
      )}

      {/* Add Budget Modal */}
      <AddBudgetModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onContinue={handleSaveBudget}
        loading={actionLoading}
      />

      {/* Modals */}
      {selectedBudget && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Budget Details"
            data={selectedBudget}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Budget"
            data={selectedBudget}
            loading={actionLoading}
            onSave={async () => {
              setActionLoading(true);
              try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Budget updated successfully");
                setEditModalOpen(false);
              } catch {
                message.error("Failed to update budget");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Budget"
            message={`Are you sure you want to delete budget for "${selectedBudget.category}"?`}
            loading={actionLoading}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Budget deleted successfully");
                setDeleteModalOpen(false);
              } catch {
                message.error("Failed to delete budget");
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

export default Budget;
