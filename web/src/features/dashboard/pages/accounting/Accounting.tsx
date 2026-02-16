import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
  Dropdown,
} from "antd";
import type { MenuProps } from "antd";
import {
  MoreOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Pie } from "@ant-design/charts";
import useTheme from "@/theme/useTheme";
import dayjs, { type Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export interface ChartOfAccountData {
  key: string;
  accountType: string;
  currentBalance: number;
}

interface PieChartData {
  type: string;
  value: number;
}

const Accounting: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<[Dayjs, Dayjs] | null>([
    dayjs("2025-01-01"),
    dayjs("2025-12-31"),
  ]);

  // Chart of accounts overview data
  const chartOfAccountsData: ChartOfAccountData[] = [
    {
      key: "1",
      accountType: "Asset",
      currentBalance: 30806400.00,
    },
    {
      key: "2",
      accountType: "Expenses",
      currentBalance: 0.00,
    },
    {
      key: "3",
      accountType: "Income",
      currentBalance: 4023000.00,
    },
    {
      key: "4",
      accountType: "Equity",
      currentBalance: 26783400.00,
    },
    {
      key: "5",
      accountType: "Liability",
      currentBalance: 0.00,
    },
  ];

  // Overview pie chart data (all account types)
  const overviewChartData: PieChartData[] = [
    { type: "Asset", value: 30806400.00 },
    { type: "Expenses", value: 0.00 },
    { type: "Income", value: 4023000.00 },
    { type: "Equity", value: 26783400.00 },
    { type: "Liability", value: 0.00 },
  ];

  // Asset breakdown data
  const assetChartData: PieChartData[] = [
    { type: "Accounts Receivable (A/R)", value: 3500000.00 },
    { type: "Current assets", value: 25000000.00 },
    { type: "Cash and cash equivalents", value: 1200000.00 },
    { type: "Fixed assets", value: 1106400.00 },
    { type: "Non-current assets", value: 0.00 },
  ];

  // Expenses breakdown data
  const expensesChartData: PieChartData[] = [
    { type: "Cost of sales", value: 0.00 },
    { type: "Expenses", value: 0.00 },
    { type: "Other Expense", value: 0.00 },
  ];

  // Income breakdown data
  const incomeChartData: PieChartData[] = [
    { type: "Income", value: 3800000.00 },
    { type: "Other income", value: 223000.00 },
  ];

  // Equity breakdown data
  const equityChartData: PieChartData[] = [
    { type: "Owner's Equity", value: 26783400.00 },
  ];

  // Liability breakdown data
  const liabilityChartData: PieChartData[] = [
    { type: "Accounts Payable (A/P)", value: 0.00 },
    { type: "Credit Card", value: 0.00 },
    { type: "Current liabilities", value: 0.00 },
    { type: "Non-current liabilities", value: 0.00 },
  ];

  // Chart colors
  const chartColors = {
    asset: ["#ff4d4f", "#1890ff", "#faad14", "#52c41a", "#722ed1"],
    expenses: ["#ff4d4f", "#1890ff", "#faad14"],
    income: ["#ff4d4f", "#1890ff"],
    equity: ["#ff4d4f"],
    liability: ["#ff4d4f", "#1890ff", "#faad14", "#52c41a"],
    overview: ["#ff4d4f", "#1890ff", "#faad14", "#52c41a", "#722ed1"],
  };

  // Chart configuration
  const getChartConfig = (data: PieChartData[], colors: string[]) => {
    const filteredData = data.filter((item) => item.value > 0);

    if (filteredData.length === 0) {
      return {
        data: [{ type: "No Data", value: 1 }],
        angleField: "value",
        colorField: "type",
        radius: 0.8,
        color: ["#d9d9d9"],
        legend: false,
        label: false,
        statistic: { title: false, content: false },
      };
    }

    return {
      data: filteredData,
      angleField: "value",
      colorField: "type",
      radius: 0.8,
      label: {
        type: "outer",
        style: {
          fill: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          fontSize: 12,
        },
      },
      legend: {
        position: "bottom" as const,
        itemName: {
          style: {
            fill: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontSize: 12,
          },
        },
      },
      color: colors,
      interactions: [{ type: "element-active" }],
      statistic: {
        title: false,
        content: false,
      },
    };
  };

  const menuItems: MenuProps["items"] = [
    { key: "export", label: "Export" },
    { key: "settings", label: "Settings" },
  ];

  const columns: ColumnsType<ChartOfAccountData> = [
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
      sorter: (a, b) => a.accountType.localeCompare(b.accountType),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 500,
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      align: "right",
      sorter: (a, b) => a.currentBalance - b.currentBalance,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontWeight: 500,
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }} align="middle">
        <Col xs={24} sm={12} md={16} lg={18}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Accounting
          </Title>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Select
              placeholder="Please Select"
              style={{ width: 150 }}
              suffixIcon={<DownOutlined />}
            />
            <RangePicker
              value={selectedDate}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setSelectedDate([dates[0], dates[1]]);
                } else {
                  setSelectedDate(null);
                }
              }}
              format="MM/DD/YYYY"
              placeholder={["Start date", "End date"]}
            />
          </Space>
        </Col>
      </Row>

      {/* Navigation Links */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
        styles={{ body: { padding: "16px 24px" } }}
      >
        <Space size="large" wrap>
          <Button type="link" style={{ padding: 0, height: "auto" }}>
            <Text strong style={{ color: "#1890ff" }}>Accounting</Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/accounting/chart-of-accounts")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Chart of accounts</Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/accounting/journal-entry")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Journal Entry</Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/accounting/transfer")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Transfer</Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/accounting/transactions")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Transactions</Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/accounting/budget")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Budget</Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/accounting/reports")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Reports</Text>
          </Button>
          <Button 
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/accounting/settings")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Settings</Text>
          </Button>
        </Space>
      </Card>

      {/* Chart of accounts overview table */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={8}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            title={
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: isDark ? "#fff" : "#1f1f1f",
                  fontWeight: 600,
                }}
              >
                Chart of accounts overview
              </Title>
            }
            styles={{ body: { padding: "24px" } }}
          >
            <Table
              columns={columns}
              dataSource={chartOfAccountsData}
              pagination={false}
              showHeader={true}
              size="small"
            />
          </Card>
        </Col>

        {/* Overview Pie Chart */}
        <Col xs={24} lg={16}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    color: isDark ? "#fff" : "#1f1f1f",
                    fontWeight: 600,
                  }}
                >
                  Overview
                </Title>
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    style={{
                      color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                    }}
                  />
                </Dropdown>
              </div>
            }
            styles={{ body: { padding: "24px" } }}
          >
            <div style={{ height: "300px" }}>
              <Pie {...getChartConfig(overviewChartData, chartColors.overview)} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Individual Category Pie Charts */}
      <Row gutter={[16, 16]}>
        {/* Asset Chart */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    color: isDark ? "#fff" : "#1f1f1f",
                    fontWeight: 600,
                  }}
                >
                  Asset
                </Title>
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    style={{
                      color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                    }}
                  />
                </Dropdown>
              </div>
            }
            styles={{ body: { padding: "24px" } }}
          >
            <div style={{ height: "250px" }}>
              <Pie {...getChartConfig(assetChartData, chartColors.asset)} />
            </div>
          </Card>
        </Col>

        {/* Expenses Chart */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    color: isDark ? "#fff" : "#1f1f1f",
                    fontWeight: 600,
                  }}
                >
                  Expenses
                </Title>
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    style={{
                      color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                    }}
                  />
                </Dropdown>
              </div>
            }
            styles={{ body: { padding: "24px" } }}
          >
            <div style={{ height: "250px" }}>
              <Pie {...getChartConfig(expensesChartData, chartColors.expenses)} />
            </div>
          </Card>
        </Col>

        {/* Income Chart */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    color: isDark ? "#fff" : "#1f1f1f",
                    fontWeight: 600,
                  }}
                >
                  Income
                </Title>
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    style={{
                      color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                    }}
                  />
                </Dropdown>
              </div>
            }
            styles={{ body: { padding: "24px" } }}
          >
            <div style={{ height: "250px" }}>
              <Pie {...getChartConfig(incomeChartData, chartColors.income)} />
            </div>
          </Card>
        </Col>

        {/* Equity Chart */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    color: isDark ? "#fff" : "#1f1f1f",
                    fontWeight: 600,
                  }}
                >
                  Equity
                </Title>
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    style={{
                      color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                    }}
                  />
                </Dropdown>
              </div>
            }
            styles={{ body: { padding: "24px" } }}
          >
            <div style={{ height: "250px" }}>
              <Pie {...getChartConfig(equityChartData, chartColors.equity)} />
            </div>
          </Card>
        </Col>

        {/* Liability Chart */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    color: isDark ? "#fff" : "#1f1f1f",
                    fontWeight: 600,
                  }}
                >
                  Liability
                </Title>
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    style={{
                      color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                    }}
                  />
                </Dropdown>
              </div>
            }
            styles={{ body: { padding: "24px" } }}
          >
            <div style={{ height: "250px" }}>
              <Pie {...getChartConfig(liabilityChartData, chartColors.liability)} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Accounting;

