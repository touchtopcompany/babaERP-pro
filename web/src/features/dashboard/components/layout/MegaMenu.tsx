import { useState } from "react";
import { Card, Typography, Row, Col } from "antd";
import {
  AppstoreOutlined,
  DollarOutlined,
  BarChartOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface Module {
  id: string;
  name: string;
  path: string;
  icon: string;
  color: string;
  description?: string;
}

interface MegaMenuProps {
  visible: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("sales-inventory");

  const menuItems = [
    { key: "sales-inventory", label: "Sales & Inventory", icon: <AppstoreOutlined /> },
    { key: "financial", label: "Financial", icon: <DollarOutlined /> },
    { key: "management", label: "Management", icon: <UsergroupAddOutlined /> },
    { key: "reports", label: "Reports & Analytics", icon: <BarChartOutlined /> },
    { key: "settings", label: "Settings", icon: <SettingOutlined /> },
  ];

  const salesInventoryModules: Module[] = [
    { id: "products", name: "Products", path: "/products/list-products", icon: "P", color: "#1890ff", description: "Manage your product catalog" },
    { id: "sell", name: "Sell", path: "/sell/all-sales", icon: "S", color: "#52c41a", description: "Sales and POS management" },
    { id: "purchases", name: "Purchases", path: "/purchases/list-purchases", icon: "P", color: "#fa8c16", description: "Purchase orders and returns" },
    { id: "stock-transfers", name: "Stock Transfers", path: "/stock-transfers/list-stock-transfers", icon: "T", color: "#722ed1", description: "Transfer stock between locations" },
    { id: "stock-adjustment", name: "Stock Adjustment", path: "/stock-adjustment/list-stock-adjustments", icon: "A", color: "#eb2f96", description: "Adjust inventory levels" },
    { id: "stock-taking", name: "Stock Taking", path: "/stock-taking", icon: "T", color: "#13c2c2", description: "Physical inventory count" },
  ];

  const financialModules: Module[] = [
    { id: "expenses", name: "Expenses", path: "/expenses/list-expenses", icon: "E", color: "#ff4d4f", description: "Track and manage expenses" },
    { id: "payment-accounts", name: "Payment Accounts", path: "/payment-accounts/list-accounts", icon: "A", color: "#1890ff", description: "Manage payment accounts" },
    { id: "accounting", name: "Accounting", path: "/accounting", icon: "A", color: "#52c41a", description: "Accounting and bookkeeping" },
  ];

  const managementModules: Module[] = [
    { id: "user-management", name: "User Management", path: "/user-management/users", icon: "U", color: "#1890ff", description: "Manage users and roles" },
    { id: "contacts", name: "Contacts", path: "/contacts/customers", icon: "C", color: "#52c41a", description: "Customers and suppliers" },
  ];

  const reportsModules: Module[] = [
    { id: "profit-loss", name: "Profit / Loss Report", path: "/reports/profit-loss-report", icon: "P", color: "#52c41a", description: "Financial performance analysis" },
    { id: "purchase-sale", name: "Purchase & Sale Report", path: "/reports/purchase-sale", icon: "P", color: "#1890ff", description: "Sales and purchase reports" },
    { id: "stock-report", name: "Stock Report", path: "/reports/stock-report", icon: "S", color: "#fa8c16", description: "Inventory status reports" },
    { id: "tax-report", name: "Tax Report", path: "/reports/tax-report", icon: "T", color: "#722ed1", description: "Tax compliance reports" },
    { id: "expense-report", name: "Expense Report", path: "/reports/expense-report", icon: "E", color: "#ff4d4f", description: "Expense analysis" },
    { id: "trending-products", name: "Trending Products", path: "/reports/trending-products", icon: "T", color: "#eb2f96", description: "Best selling products" },
  ];

  const settingsModules: Module[] = [
    { id: "business-settings", name: "Business Settings", path: "/settings/business-settings", icon: "B", color: "#1890ff", description: "Configure business details" },
    { id: "locations", name: "Business Locations", path: "/settings/business-locations", icon: "L", color: "#52c41a", description: "Manage business locations" },
    { id: "invoice-settings", name: "Invoice Settings", path: "/settings/invoice-settings", icon: "I", color: "#fa8c16", description: "Customize invoices" },
    { id: "tax-rates", name: "Tax Rates", path: "/settings/tax-rates", icon: "T", color: "#722ed1", description: "Configure tax rates" },
  ];

  const renderModuleGrid = (modules: Module[], title: string, subtitle: string) => {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
          <div>
            <Title level={4} style={{ margin: 0, marginBottom: "8px", color: isDark ? "#fff" : "#1f1f1f" }}>
              {title}
            </Title>
            <Text type="secondary" style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
              {subtitle}
            </Text>
          </div>
        </div>

        <Row gutter={[16, 16]}>
          {modules.map((module) => (
            <Col xs={24} sm={12} lg={8} key={module.id}>
              <Card
                hoverable
                style={{
                  borderRadius: "8px",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  transition: "all 0.3s ease",
                }}
                bodyStyle={{ padding: "16px" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = isDark
                    ? "0 4px 12px rgba(0,0,0,0.3)"
                    : "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => {
                  navigate(module.path);
                  onClose();
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        background: module.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      {module.icon}
                    </div>
                    <div>
                      <Text strong style={{ fontSize: "14px", color: isDark ? "#fff" : "#1f1f1f", display: "block" }}>
                        {module.name}
                      </Text>
                      {module.description && (
                        <Text style={{ fontSize: "12px", color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c", display: "block", marginTop: "4px" }}>
                          {module.description}
                        </Text>
                      )}
                    </div>
                  </div>
                  <RightOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c", fontSize: "12px" }} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
          <Text style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
            Need help? Contact our{" "}
            <Text
              strong
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={() => {
                navigate("/support");
                onClose();
              }}
            >
              support center
            </Text>
          </Text>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "sales-inventory":
        return renderModuleGrid(
          salesInventoryModules,
          "Sales & Inventory",
          "Manage your products, sales, purchases, and inventory."
        );

      case "financial":
        return renderModuleGrid(
          financialModules,
          "Financial Management",
          "Track expenses, manage accounts, and handle accounting."
        );

      case "management":
        return renderModuleGrid(
          managementModules,
          "User & Contact Management",
          "Manage users, roles, customers, and suppliers."
        );

      case "reports":
        return renderModuleGrid(
          reportsModules,
          "Reports & Analytics",
          "View detailed reports and analytics for your business."
        );

      case "settings":
        return renderModuleGrid(
          settingsModules,
          "Settings & Configuration",
          "Configure your business settings and preferences."
        );

      default:
        return renderModuleGrid(
          salesInventoryModules,
          "Sales & Inventory",
          "Manage your products, sales, purchases, and inventory."
        );
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "64px",
        left: 0,
        right: 0,
        bottom: 0,
        background: isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
        zIndex: 999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          background: isDark ? "#1f1f1f" : "#ffffff",
          borderRadius: "12px",
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.15)",
          display: "flex",
          minHeight: "600px",
          maxHeight: "80vh",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar */}
        <div
          style={{
            width: "240px",
            borderRight: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            padding: "24px 0",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
          }}
        >
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => setSelectedMenu(item.key)}
              style={{
                padding: "12px 24px",
                cursor: "pointer",
                background: selectedMenu === item.key
                  ? isDark ? "rgba(24, 144, 255, 0.15)" : "rgba(24, 144, 255, 0.1)"
                  : "transparent",
                borderLeft: selectedMenu === item.key ? "3px solid #1890ff" : "3px solid transparent",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (selectedMenu !== item.key) {
                  e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedMenu !== item.key) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: selectedMenu === item.key ? "#1890ff" : isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                }}
              >
                {item.icon}
              </div>
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: selectedMenu === item.key ? 500 : 400,
                  color: selectedMenu === item.key ? "#1890ff" : isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                }}
              >
                {item.label}
              </Text>
              {selectedMenu === item.key && (
                <RightOutlined style={{ marginLeft: "auto", fontSize: "12px", color: "#1890ff" }} />
              )}
            </div>
          ))}
        </div>

        {/* Right Content Area */}
        <div
          style={{
            flex: 1,
            padding: "32px",
            overflowY: "auto",
            background: isDark ? "#1f1f1f" : "#ffffff",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;

