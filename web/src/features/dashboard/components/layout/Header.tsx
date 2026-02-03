import { Layout, Button, Space, Badge, Avatar, Typography, Tooltip, Dropdown } from "antd";
import {
  PlusOutlined,
  AppstoreOutlined,
  BellOutlined,
  SearchOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  ContactsOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  TruckOutlined,
  HourglassOutlined,
  MinusCircleOutlined,
  DollarOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "@/theme/useTheme";
import useSerialize from "@/hooks/useSerialize";
import useLocalstorage from "@/hooks/useLocalstorage";
import { APP_THEME_NAME } from "@/utils/constants";
import type { UserType } from "@/types/index";
import type { MenuProps } from "antd";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";
import NotificationsDropdown from "./NotificationsDropdown";
import ProfileDropdown from "./ProfileDropdown";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  businessName?: string;
}

const Header: React.FC<HeaderProps> = ({
  collapsed,
  onToggle,
  businessName: _businessName = "C2Z Electronics",
}) => {
  const { theme, setTheme, setAutoTheme } = useTheme();
  const isDark = theme === "dark";
  const { loadFromStorage } = useSerialize();
  const { setItem } = useLocalstorage();
  const [user, setUser] = useState<UserType | null>(null);
  const [megaMenuVisible, setMegaMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    (async () => {
      const storedUser = await loadFromStorage("user");
      setUser(storedUser);
    })();
  }, [loadFromStorage]);

  // Fullscreen functionality
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setItem(APP_THEME_NAME, newTheme);
    setTheme(newTheme);
    setAutoTheme(false); // Disable auto theme when manually toggling
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith("/")) {
      navigate(key);
    }
  };

  const addMenuItems: MenuProps["items"] = [
    {
      key: "user-management",
      icon: <UsergroupAddOutlined />,
      label: "User Management",
      children: [
        { key: "/user-management/users", label: "Add User" },
        { key: "/user-management/roles", label: "Add Role" },
        { key: "/user-management/sales-commission-agents", label: "Add Sales Agent" },
      ],
    },
    {
      key: "contacts",
      icon: <ContactsOutlined />,
      label: "Contacts",
      children: [
        { key: "/contacts/suppliers", label: "Add Supplier" },
        { key: "/contacts/customers", label: "Add Customer" },
        { key: "/contacts/customer-groups", label: "Add Customer Group" },
        { key: "/contacts/import-contacts", label: "Import Contacts" },
      ],
    },
    {
      key: "products",
      icon: <AppstoreOutlined />,
      label: "Products",
      children: [
        { key: "/products/add-product", label: "Add Product" },
        { key: "/products/variations", label: "Add Variation" },
        { key: "/products/categories", label: "Add Category" },
        { key: "/products/brands", label: "Add Brand" },
        { key: "/products/units", label: "Add Unit" },
        { key: "/products/price-group", label: "Add Price Group" },
        { key: "/products/warranties", label: "Add Warranty" },
        { key: "/products/import-products", label: "Import Products" },
      ],
    },
    {
      key: "purchases",
      icon: <ArrowDownOutlined />,
      label: "Purchases",
      children: [
        { key: "/purchases/add-purchase", label: "Add Purchase" },
        { key: "/purchases/purchase-return", label: "Add Purchase Return" },
      ],
    },
    {
      key: "sell",
      icon: <ArrowUpOutlined />,
      label: "Sell",
      children: [
        { key: "/sell/add-sale", label: "Add Sale" },
        { key: "/sell/add-draft", label: "Add Draft" },
        { key: "/sell/add-quotation", label: "Add Quotation" },
        { key: "/sell/pos", label: "New POS Sale" },
        { key: "/sell/list-sell-return", label: "Add Sell Return" },
        { key: "/sell/shipments", label: "Add Shipment" },
        { key: "/sell/discounts", label: "Add Discount" },
      ],
    },
    {
      key: "stock-transfers",
      icon: <TruckOutlined />,
      label: "Stock Transfers",
      children: [
        { key: "/stock-transfers/add-stock-transfer", label: "Add Stock Transfer" },
      ],
    },
    {
      key: "stock-adjustment",
      icon: <HourglassOutlined />,
      label: "Stock Adjustment",
      children: [
        { key: "/stock-adjustment/add-stock-adjustment", label: "Add Stock Adjustment" },
      ],
    },
    {
      key: "expenses",
      icon: <MinusCircleOutlined />,
      label: "Expenses",
      children: [
        { key: "/expenses/add-expense", label: "Add Expense" },
        { key: "/expenses/expense-categories", label: "Add Expense Category" },
      ],
    },
    {
      key: "payment-accounts",
      icon: <DollarOutlined />,
      label: "Payment Accounts",
      children: [
        { key: "/payment-accounts/list-accounts", label: "Add Payment Account" },
      ],
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Reports",
      children: [
        { key: "/reports/profit-loss-report", label: "Profit / Loss Report" },
        { key: "/reports/purchase-sale", label: "Purchase & Sale Report" },
        { key: "/reports/tax-report", label: "Tax Report" },
        { key: "/reports/expense-report", label: "Expense Report" },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        { key: "/settings/business", label: "Business Settings" },
        { key: "/settings/locations", label: "Add Location" },
        { key: "/settings/tax-rates", label: "Add Tax Rate" },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "add-new-items",
      icon: <PlusOutlined />,
      label: "Add New Items",
    },
  ].map((item: any) => {
    if (item.type === "divider") {
      return { type: "divider" };
    }
    if (item.children) {
      return {
        ...item,
        label: (
          <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "4px 0" }}>
            <span style={{ fontWeight: 500 }}>{item.label}</span>
          </div>
        ),
        children: item.children.map((child: any) => ({
          ...child,
          label: (
            <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "4px 0" }}>
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: isDark ? "rgba(24, 144, 255, 0.15)" : "rgba(24, 144, 255, 0.1)",
                  border: `1px solid ${isDark ? "rgba(24, 144, 255, 0.4)" : "rgba(24, 144, 255, 0.3)"}`,
                  marginRight: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                <PlusOutlined 
                  style={{ 
                    fontSize: "10px", 
                    color: isDark ? "rgba(24, 144, 255, 0.9)" : "#1890ff",
                    transition: "all 0.2s ease",
                  }} 
                />
              </div>
              <span style={{ 
                color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                fontSize: "13px",
                transition: "color 0.2s ease",
              }}>{child.label}</span>
            </div>
          ),
        })),
      };
    }
    return {
      ...item,
      label: (
        <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "4px 0" }}>
          <span style={{ fontWeight: 500 }}>{item.label}</span>
        </div>
      ),
    };
  });

  return (
    <Fragment>
    <AntHeader
      style={{
        background: isDark ? "#141414" : "#ffffff",
        padding: isMobile ? "0 16px" : "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 64,
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        transition: "all 0.3s ease",
        boxShadow: isDark ? "none" : "0 1px 4px rgba(0,21,41,.08)",
      }}
    >
      <Space size={isMobile ? 8 : 16} align="center">
        {!isMobile && (
          <Typography.Text
            strong
            style={{
              fontSize: isMobile ? "14px" : "18px",
              fontWeight: 700,
              color: isDark ? "#ffffff" : "#1f1f1f",
              fontFamily: "sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            {user?.phone || user?.email?.split("@")[0] || "User"}
          </Typography.Text>
        )}
        <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="bottom">
          <Button
            type="text"
            onClick={onToggle}
            style={{ 
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
            }}
          >
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "4px",
              alignItems: "flex-start",
              width: "18px",
            }}>
              <div style={{
                width: "12px",
                height: "2px",
                background: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                borderRadius: "1px",
              }} />
              <div style={{
                width: "18px",
                height: "2px",
                background: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                borderRadius: "1px",
              }} />
              <div style={{
                width: "12px",
                height: "2px",
                background: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                borderRadius: "1px",
              }} />
            </div>
          </Button>
        </Tooltip>
        <Dropdown
          menu={{ 
            items: addMenuItems, 
            onClick: handleMenuClick,
            style: {
              borderRadius: "8px",
              padding: "8px 0",
              background: isDark ? "#1f1f1f" : "#ffffff",
              boxShadow: isDark 
                ? "0 4px 16px rgba(0,0,0,0.4)" 
                : "0 4px 16px rgba(0,0,0,0.15)",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              minWidth: "280px",
            },
          }}
          trigger={["hover"]}
          placement="bottomLeft"
          overlayStyle={{
            borderRadius: "8px",
          }}
        >
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            style={{ 
              background: "#1890ff",
              border: "none",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          />
        </Dropdown>
        {!isMobile && (
          <Button
            type="default"
            icon={<AppstoreOutlined />}
            onClick={() => setMegaMenuVisible(!megaMenuVisible)}
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 500,
              textTransform: "uppercase",
              fontSize: "12px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 12px",
            }}
          >
            MEGA MENU
          </Button>
        )}
      </Space>

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "16px" }}>
        <div 
          style={{ position: "relative" }}
          onMouseEnter={() => setSearchVisible(true)}
          onMouseLeave={() => setSearchVisible(false)}
        >
          <Button
            type="text"
            icon={<SearchOutlined />}
            style={{ 
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
              fontSize: "18px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              minWidth: "40px",
            }}
          />
          <SearchOverlay visible={searchVisible} onClose={() => setSearchVisible(false)} />
        </div>
        {!isMobile && (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              cursor: "pointer",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e8e8e8",
            }}
          >
            🇺🇸
          </div>
        )}
        {!isMobile && (
          <Button
            type="text"
            icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={toggleFullscreen}
            style={{ 
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
              fontSize: "18px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            minWidth: "40px",
          }}
          />
        )}
        <Button
          type="text"
          icon={isDark ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{ 
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontSize: "18px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            minWidth: "40px",
          }}
        />
        <Badge 
          count={2} 
          offset={[-8, 8]} 
          color="#52c41a"
          style={{ 
            fontSize: "11px",
            fontWeight: 600,
            minWidth: "18px",
            height: "18px",
            lineHeight: "18px",
            padding: "0 4px",
          }}
        >
          <Button
            type="text"
            icon={<ClockCircleOutlined />}
            style={{ 
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
              fontSize: "18px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              minWidth: "40px",
            }}
          />
        </Badge>
        <div 
          style={{ position: "relative" }}
          onMouseEnter={() => setNotificationsVisible(true)}
          onMouseLeave={() => setNotificationsVisible(false)}
        >
          <Badge 
            count={3} 
            offset={[-8, 8]} 
            color="#ff4d4f"
            style={{ 
              fontSize: "11px",
              fontWeight: 600,
              minWidth: "18px",
              height: "18px",
              lineHeight: "18px",
              padding: "0 4px",
            }}
          >
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ 
                color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                fontSize: "18px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                minWidth: "40px",
              }}
            />
          </Badge>
          <NotificationsDropdown 
            visible={notificationsVisible} 
            onClose={() => setNotificationsVisible(false)} 
          />
        </div>
        <div 
          style={{ position: "relative" }}
          onMouseEnter={() => setProfileVisible(true)}
          onMouseLeave={() => setProfileVisible(false)}
        >
          <Avatar
            size={40}
            icon={<UserOutlined />}
            style={{
              background: "#1890ff",
              cursor: "pointer",
              border: "2px solid transparent",
            }}
          />
          {profileVisible && (
            <ProfileDropdown 
              visible={profileVisible} 
              onClose={() => setProfileVisible(false)} 
            />
          )}
        </div>
      </div>
      </AntHeader>
      <MegaMenu visible={megaMenuVisible} onClose={() => setMegaMenuVisible(false)} />
    </Fragment>
  );
};

export default Header;

