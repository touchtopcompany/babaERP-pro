import { Row, Col, Typography, Space } from "antd";
import {
  ProgressMetricCard,
  TotalSalesCard,
  TaskProgressCard,
  SalesPaymentDueCard,
  PurchasePaymentDueCard,
  ProductStockAlertCard,
  SalesOrderCard,
  PendingShipmentsCard,
} from "../../components/cards";
import { PaymentRecordChart } from "../../components/charts";
import {
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  AppstoreOutlined,
  MinusCircleOutlined,
  DatabaseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useDashboardMetrics } from "../../api/dashboard.api";
import useTheme from "@/theme/useTheme";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();

  // Format currency
  const formatCurrency = (value: number) => {
    return `TSh ${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const metricsData = metrics?.data || {
    totalSales: 0,
    net: 0,
    invoiceDue: 0,
    totalSellReturn: 0,
    totalSellReturnPaid: 0,
    totalPurchase: 0,
    purchaseDue: 0,
    totalPurchaseReturn: 0,
    totalPurchaseReturnPaid: 0,
    expense: 0,
  };

  // Calculate progress values
  const invoiceProgress = metricsData.invoiceDue > 0 && metricsData.totalSales > 0
    ? Math.round((metricsData.invoiceDue / metricsData.totalSales) * 100)
    : 0;
  
  const salesProgress = metricsData.net > 0 && metricsData.totalSales > 0
    ? Math.round((metricsData.net / metricsData.totalSales) * 100)
    : 0;

  const purchaseProgress = metricsData.purchaseDue > 0 && metricsData.totalPurchase > 0
    ? Math.round((metricsData.purchaseDue / metricsData.totalPurchase) * 100)
    : 0;

  const expenseProgress = metricsData.expense > 0 && metricsData.totalSales > 0
    ? Math.round((metricsData.expense / metricsData.totalSales) * 100)
    : 0;

  // Generate chart data for sales/purchase trends
  const generateSalesTrendData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 30) + 10,
    }));
  };

  // Generate total sales chart data (monthly)
  const generateSalesChartData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      date: `M${i + 1}`,
      value: Math.floor(Math.random() * 5000) + 2000,
    }));
  };

  // Top categories/products data
  const topCategories = [
    {
      name: "Electronics",
      type: "Product Category",
      value: formatCurrency(metricsData.totalSales * 0.4 || 1200),
      projects: "45 Products",
      icon: <ShoppingOutlined />,
      iconColor: "#52c41a",
    },
    {
      name: "Clothing",
      type: "Product Category",
      value: formatCurrency(metricsData.totalSales * 0.35 || 1450),
      projects: "32 Products",
      icon: <AppstoreOutlined />,
      iconColor: "#1890ff",
    },
    {
      name: "Accessories",
      type: "Product Category",
      value: formatCurrency(metricsData.totalSales * 0.25 || 1250),
      projects: "28 Products",
      icon: <AppstoreOutlined />,
      iconColor: "#ff4d4f",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div
          style={{
            marginBottom: "24px",
          }}
        >
          <Title 
            level={2} 
            style={{ 
              margin: 0, 
              marginBottom: "8px",
              color: isDark ? "#fff" : "#1f1f1f", 
              fontWeight: 700,
              fontSize: "28px",
            }}
          >
            Welcome C2Z
          </Title>
          <Typography.Text 
            type="secondary" 
            style={{ 
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
            }}
          >
            Here's what's happening with your business today
          </Typography.Text>
        </div>

        {/* Top Row - Progress Metric Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <ProgressMetricCard
              value={formatCurrency(metricsData.invoiceDue || 0)}
              description="Sales Payment Due"
              progress={invoiceProgress}
              progressLabel={`Outstanding Invoices: ${formatCurrency(metricsData.invoiceDue || 0)}`}
              icon={<DollarOutlined />}
              color="#1890ff"
              loading={metricsLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <ProgressMetricCard
              value={formatCurrency(metricsData.totalSales || 0)}
              description="Total Sales"
              progress={salesProgress}
              progressLabel={`Net Sales: ${formatCurrency(metricsData.net || 0)}`}
              icon={<ArrowUpOutlined />}
              color="#52c41a"
              loading={metricsLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <ProgressMetricCard
              value={formatCurrency(metricsData.purchaseDue || 0)}
              description="Purchase Payment Due"
              progress={purchaseProgress}
              progressLabel={`Outstanding Purchases: ${formatCurrency(metricsData.purchaseDue || 0)}`}
              icon={<ArrowDownOutlined />}
              color="#fa8c16"
              loading={metricsLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <ProgressMetricCard
              value={formatCurrency(metricsData.expense || 0)}
              description="Total Expenses"
              progress={expenseProgress}
              progressLabel={`Expense Ratio: ${expenseProgress}%`}
              icon={<MinusCircleOutlined />}
              color="#ff4d4f"
              loading={metricsLoading}
            />
          </Col>
        </Row>

        {/* Middle Section - Payment Record & Total Sales */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <PaymentRecordChart
              summary={{
                awaiting: { 
                  value: formatCurrency(metricsData.invoiceDue || 5486), 
                  progress: 25 
                },
                completed: { 
                  value: formatCurrency(metricsData.net || 9275), 
                  progress: 45 
                },
                rejected: { 
                  value: formatCurrency(metricsData.expense || 3868), 
                  progress: 20 
                },
                revenue: { 
                  value: formatCurrency(metricsData.totalSales || 50668), 
                  progress: 100 
                },
              }}
            />
          </Col>
          <Col xs={24} lg={8}>
            <TotalSalesCard
              totalValue={formatCurrency(metricsData.totalSales || 0)}
              percentage={`${salesProgress > 0 ? '+' : ''}${salesProgress}%`}
              chartData={generateSalesChartData()}
              projects={topCategories}
              loading={metricsLoading}
            />
          </Col>
        </Row>

        {/* Bottom Row - Business Metrics Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <TaskProgressCard
              title="Sales Orders"
              value={`${Math.round((metricsData.totalSales || 0) / 1000) || 0} Orders`}
              progress={salesProgress}
              trend={`${salesProgress > 0 ? '+' : ''}${salesProgress}% from target`}
              icon={<ArrowUpOutlined />}
              color="#1890ff"
              chartData={generateSalesTrendData()}
              loading={metricsLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <TaskProgressCard
              title="Purchase Orders"
              value={`${Math.round((metricsData.totalPurchase || 0) / 1000) || 0} Orders`}
              progress={purchaseProgress}
              trend={`${purchaseProgress > 0 ? '+' : ''}${purchaseProgress}% pending payment`}
              icon={<ArrowDownOutlined />}
              color="#52c41a"
              chartData={generateSalesTrendData()}
              loading={metricsLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <TaskProgressCard
              title="Stock Status"
              value={`${Math.round((metricsData.totalPurchase || 0) / 100) || 0} Items`}
              progress={100 - purchaseProgress}
              trend="Stock levels monitored"
              icon={<DatabaseOutlined />}
              color="#ff4d4f"
              chartData={generateSalesTrendData()}
              loading={metricsLoading}
            />
          </Col>
        </Row>

        {/* Table Cards - Full Width, After Task Progress Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <SalesPaymentDueCard
              totalAmount={formatCurrency(metricsData.invoiceDue || 12500)}
              loading={metricsLoading}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <PurchasePaymentDueCard
              totalAmount={formatCurrency(metricsData.purchaseDue || 8500)}
              loading={metricsLoading}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <ProductStockAlertCard
              totalItems={Math.round((metricsData.totalPurchase || 0) / 100) || 15}
              loading={metricsLoading}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <SalesOrderCard
              totalOrders={Math.round((metricsData.totalSales || 0) / 1000) || 24}
              loading={metricsLoading}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <PendingShipmentsCard
              totalShipments={Math.round((metricsData.expense || 0) / 100) || 7}
              loading={metricsLoading}
            />
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Dashboard;

