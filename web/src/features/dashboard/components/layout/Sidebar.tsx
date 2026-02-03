import { Layout, Menu, Typography, Button, Card, Drawer } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import useTheme from "@/theme/useTheme";
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  ContactsOutlined,
  AppstoreOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  TruckOutlined,
  HourglassOutlined,
  DatabaseOutlined,
  MinusCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  MailOutlined,
  SettingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, isMobile = false }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const isExpanded = !collapsed || isHovered;

  useEffect(() => {
    if (isMobile) {
      setDrawerVisible(!collapsed);
    }
  }, [collapsed, isMobile]);

  const menuItems: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Home",
    },
    {
      key: "/user-management",
      icon: <UsergroupAddOutlined />,
      label: "User Management",
      children: [
        {
          key: "/user-management/users",
          label: "Users",
        },
        {
          key: "/user-management/roles",
          label: "Roles",
        },
        {
          key: "/user-management/sales-commission-agents",
          label: "Sales Commission Agents",
        },
      ],
    },
    {
      key: "/contacts",
      icon: <ContactsOutlined />,
      label: "Contacts",
      children: [
        {
          key: "/contacts/suppliers",
          label: "Suppliers",
        },
        {
          key: "/contacts/customers",
          label: "Customers",
        },
        {
          key: "/contacts/customer-groups",
          label: "Customer Groups",
        },
        {
          key: "/contacts/import-contacts",
          label: "Import Contacts",
        },
      ],
    },
    {
      key: "/products",
      icon: <AppstoreOutlined />,
      label: "Products",
      children: [
        {
          key: "/products/list-products",
          label: "List Products",
        },
        {
          key: "/products/add-product",
          label: "Add Product",
        },
        {
          key: "/products/update-price",
          label: "Update Price",
        },
        {
          key: "/products/print-labels",
          label: "Print Labels",
        },
        {
          key: "/products/variations",
          label: "Variations",
        },
        {
          key: "/products/import-products",
          label: "Import Products",
        },
        {
          key: "/products/import-opening-stock",
          label: "Import Opening Stock",
        },
        {
          key: "/products/price-group",
          label: "Price Group",
        },
        {
          key: "/products/units",
          label: "Units",
        },
        {
          key: "/products/categories",
          label: "Categories",
        },
        {
          key: "/products/brands",
          label: "Brands",
        },
        {
          key: "/products/warranties",
          label: "Warranties",
        },
      ],
    },
    {
      key: "/purchases",
      icon: <ArrowDownOutlined />,
      label: "Purchases",
      children: [
        {
          key: "/purchases/list-purchases",
          label: "List Purchases",
        },
        {
          key: "/purchases/add-purchase",
          label: "Add Purchase",
        },
        {
          key: "/purchases/purchase-return",
          label: "List Purchase Return",
        },
      ],
    },
    {
      key: "/sell",
      icon: <ArrowUpOutlined />,
      label: "Sell",
      children: [
        {
          key: "/sell/all-sales",
          label: "All sales",
        },
        {
          key: "/sell/add-sale",
          label: "Add Sale",
        },
        {
          key: "/sell/list-pos",
          label: "List POS",
        },
        {
          key: "/sell/pos",
          label: "POS",
        },
        {
          key: "/sell/add-draft",
          label: "Add Draft",
        },
        {
          key: "/sell/list-drafts",
          label: "List Drafts",
        },
        {
          key: "/sell/add-quotation",
          label: "Add Quotation",
        },
        {
          key: "/sell/list-quotations",
          label: "List quotations",
        },
        {
          key: "/sell/list-sell-return",
          label: "List Sell Return",
        },
        {
          key: "/sell/shipments",
          label: "Shipments",
        },
        {
          key: "/sell/discounts",
          label: "Discounts",
        },
        {
          key: "/sell/import-sales",
          label: "Import Sales",
        },
        {
          key: "/sell/sales-void",
          label: "Sales Void",
        },
      ],
    },
    {
      key: "/stock-transfers",
      icon: <TruckOutlined />,
      label: "Stock Transfers",
      children: [
        {
          key: "/stock-transfers/list-stock-transfers",
          label: "List Stock Transfers",
        },
        {
          key: "/stock-transfers/add-stock-transfer",
          label: "Add Stock Transfer",
        },
      ],
    },
    {
      key: "/stock-adjustment",
      icon: <HourglassOutlined />,
      label: "Stock Adjustment",
      children: [
        {
          key: "/stock-adjustment/list-stock-adjustments",
          label: "List Stock Adjustments",
        },
        {
          key: "/stock-adjustment/add-stock-adjustment",
          label: "Add Stock Adjustment",
        },
      ],
    },
    {
      key: "/stock-taking",
      icon: <DatabaseOutlined />,
      label: "Stock Taking",
      noChevron: true,
    },
    {
      key: "/expenses",
      icon: <MinusCircleOutlined />,
      label: "Expenses",
      children: [
        {
          key: "/expenses/list-expenses",
          label: "List Expenses",
        },
        {
          key: "/expenses/add-expense",
          label: "Add Expense",
        },
        {
          key: "/expenses/expense-categories",
          label: "Expense Categories",
        },
      ],
    },
    {
      key: "/payment-accounts",
      icon: <DollarOutlined />,
      label: "Payment Accounts",
      children: [
        {
          key: "/payment-accounts/list-accounts",
          label: "List Accounts",
        },
        {
          key: "/payment-accounts/balance-sheet",
          label: "Balance Sheet",
        },
        {
          key: "/payment-accounts/trial-balance",
          label: "Trial Balance",
        },
        {
          key: "/payment-accounts/cash-flow",
          label: "Cash Flow",
        },
        {
          key: "/payment-accounts/payment-account-report",
          label: "Payment Account Report",
        },
      ],
    },
    {
      key: "/accounting",
      icon: <FileTextOutlined />,
      label: "Accounting",
      noChevron: true,
    },
    {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: "Reports",
      children: [
        {
          key: "/reports/profit-loss-report",
          label: "Profit / Loss Report",
        },
        {
          key: "/reports/purchase-sale",
          label: "Purchase & Sale",
        },
        {
          key: "/reports/tax-report",
          label: "Tax Report",
        },
        {
          key: "/reports/supplier-customer-report",
          label: "Supplier & Customer Report",
        },
        {
          key: "/reports/customer-groups-report",
          label: "Customer Groups Report",
        },
        {
          key: "/reports/stock-transfer-report",
          label: "Stock Transfer Report",
        },
        {
          key: "/reports/stock-report",
          label: "Stock Report",
        },
        {
          key: "/reports/stock-adjustment-report",
          label: "Stock Adjustment Report",
        },
        {
          key: "/reports/trending-products",
          label: "Trending Products",
        },
        {
          key: "/reports/items-report",
          label: "Items Report",
        },
        {
          key: "/reports/product-purchase-report",
          label: "Product Purchase Report",
        },
        {
          key: "/reports/product-sell-report",
          label: "Product Sell Report",
        },
        {
          key: "/reports/purchase-payment-report",
          label: "Purchase Payment Report",
        },
        {
          key: "/reports/sell-payment-report",
          label: "Sell Payment Report",
        },
        {
          key: "/reports/expense-report",
          label: "Expense Report",
        },
        {
          key: "/reports/register-report",
          label: "Register Report",
        },
        {
          key: "/reports/sales-representative-report",
          label: "Sales Representative Report",
        },
        {
          key: "/reports/activity-log",
          label: "Activity Log",
        },
      ],
    },
    {
      key: "/notification-templates",
      icon: <MailOutlined />,
      label: "Notification Templates",
      noChevron: true,
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        {
          key: "/settings/business-settings",
          label: "Business Settings",
        },
        {
          key: "/settings/business-locations",
          label: "Business Locations",
        },
        {
          key: "/settings/invoice-settings",
          label: "Invoice Settings",
        },
        {
          key: "/settings/barcode-settings",
          label: "Barcode Settings",
        },
        {
          key: "/settings/receipt-printers",
          label: "Receipt Printers",
        },
        {
          key: "/settings/tax-rates",
          label: "Tax Rates",
        },
      ],
    },
  ].map((item: any) => {
    const hasChildren = item.children && item.children.length > 0;
    const { noChevron, ...menuItemProps } = item;
    return {
      ...menuItemProps,
      icon: item.icon,
      label: hasChildren ? (
        <span>{item.label}</span>
      ) : noChevron ? (
        <span>{item.label}</span>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <span>{item.label}</span>
          <RightOutlined style={{ fontSize: "10px", color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />
        </div>
      ),
      children: item.children?.map((child: any) => ({
        ...child,
        label: (
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <RightOutlined style={{ fontSize: "8px", color: isDark ? "rgba(255,255,255,0.35)" : "#bfbfbf", marginRight: "8px" }} />
            <span>{child.label}</span>
          </div>
        ),
      })),
    };
  });

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith("/")) {
      navigate(key);
    }
  };

  const getSelectedKeys = () => {
    const pathname = location.pathname;
    // Map dashboard route to home menu item
    if (pathname === "/dashboard" || pathname === "/") {
      return ["/dashboard"];
    }
    return [pathname];
  };

  const getOpenKeys = React.useCallback(() => {
    const pathname = location.pathname;
    const keys: string[] = [];

    // Check which parent menu should be open based on current route
    if (pathname.startsWith("/user-management")) {
      keys.push("/user-management");
    }
    if (pathname.startsWith("/contacts")) {
      keys.push("/contacts");
    }
    if (pathname.startsWith("/products")) {
      keys.push("/products");
    }
    if (pathname.startsWith("/purchases")) {
      keys.push("/purchases");
    }
    if (pathname.startsWith("/sell")) {
      keys.push("/sell");
    }
    if (pathname.startsWith("/stock-transfers")) {
      keys.push("/stock-transfers");
    }
    if (pathname.startsWith("/stock-adjustment")) {
      keys.push("/stock-adjustment");
    }
    if (pathname.startsWith("/stock-taking")) {
      keys.push("/stock-taking");
    }
    if (pathname.startsWith("/expenses")) {
      keys.push("/expenses");
    }
    if (pathname.startsWith("/payment-accounts")) {
      keys.push("/payment-accounts");
    }
    if (pathname.startsWith("/accounting")) {
      keys.push("/accounting");
    }
    if (pathname.startsWith("/reports")) {
      keys.push("/reports");
    }
    if (pathname.startsWith("/settings")) {
      keys.push("/settings");
    }

    return keys;
  }, [location.pathname]);

  const selectedKeys = getSelectedKeys();
  
  // Update openKeys when route changes
  React.useEffect(() => {
    const keys = getOpenKeys();
    setOpenKeys(keys);
  }, [getOpenKeys]);

  const sidebarContent = (
    <>

      {/* Scrollable Content Area */}
      <div 
        style={{ 
          flex: 1,
          overflowY: "auto", 
          overflowX: "hidden",
          minHeight: 0,
          maxHeight: "100%",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          scrollbarColor: isDark ? "rgba(255,255,255,0.2) transparent" : "rgba(0,0,0,0.2) transparent",
        }}
      >
        {isExpanded && (
          <div
            style={{
              padding: "20px 24px 16px",
            }}
          >
            <Typography.Text
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              NAVIGATION
            </Typography.Text>
          </div>
        )}
        {collapsed && !isHovered && (
          <div
            style={{
              padding: "20px 24px 16px",
              borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                }}
              />
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                }}
              />
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                }}
              />
            </div>
          </div>
        )}
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={(keys) => {
            // Get the current route's parent menu keys
            const currentOpenKeys = getOpenKeys();
            
            // Always keep the active route's parent menu open
            const newKeys = [...new Set([...keys, ...currentOpenKeys])];
            
            setOpenKeys(newKeys);
          }}
          items={menuItems}
          onClick={(e) => {
            handleMenuClick(e);
            // Keep parent menu open when clicking submenu items
            const currentOpenKeys = getOpenKeys();
            setOpenKeys((prevKeys) => [...new Set([...prevKeys, ...currentOpenKeys])]);
            if (isMobile) {
              setDrawerVisible(false);
            }
          }}
          style={{
            background: isDark ? "#141414" : "#ffffff",
            borderRight: "none",
            padding: "8px 12px",
            height: "100%",
          }}
          theme={isDark ? "dark" : "light"}
          className="sidebar-menu"
          inlineCollapsed={!isMobile && collapsed && !isHovered}
        />
        {isExpanded && (
          <div
            style={{
              padding: "20px",
              marginTop: "auto",
              borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            }}
          >
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e8e8e8",
              borderRadius: "8px",
            }}
            styles={{ body: { padding: "16px" } }}
          >
            <div style={{ textAlign: "center", marginBottom: "12px" }}>
              <div
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: `2px solid ${isDark ? "rgba(255,255,255,0.85)" : "#1890ff"}`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "0",
                      height: "0",
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderBottom: `6px solid ${isDark ? "rgba(255,255,255,0.85)" : "#1890ff"}`,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "24px",
                    height: "1px",
                    background: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
                  }}
                />
              </div>
            </div>
            <Typography.Text
              strong
              style={{
                fontSize: "12px",
                color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                display: "block",
                textAlign: "center",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Downloading Center
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: "11px",
                color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                display: "block",
                textAlign: "center",
                marginBottom: "12px",
                lineHeight: "1.4",
              }}
            >
              BabaErp Pro is a production ready ERP to get started up and running easily.
            </Typography.Text>
            <Button
              type="primary"
              block
              style={{
                background: "#1890ff",
                border: "none",
                borderRadius: "6px",
                height: "32px",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              DOWNLOAD NOW
            </Button>
          </Card>
        </div>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        title={null}
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0, background: isDark ? "#141414" : "#ffffff" }}
        width={250}
        closable={false}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Sider
      width={isExpanded ? 250 : 80}
      collapsed={collapsed && !isHovered}
      collapsedWidth={80}
      onMouseEnter={() => collapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isDark ? "#141414" : "#ffffff",
        height: "calc(100vh - 64px)",
        position: "fixed",
        left: 0,
        top: 64,
        bottom: 0,
        overflow: "hidden",
        borderRight: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        transition: "background 0.3s ease, width 0.2s ease",
        display: "flex",
        flexDirection: "column",
        zIndex: 999,
      }}
    >
      {sidebarContent}
    </Sider>
  );
};

export default Sidebar;

