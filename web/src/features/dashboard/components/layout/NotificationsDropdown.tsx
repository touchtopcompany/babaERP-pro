import { useState } from "react";
import { Typography, Avatar, Space, Button, Divider } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  DollarOutlined,
  ShoppingOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface Notification {
  id: string;
  type: "product" | "customer" | "sale" | "purchase" | "stock" | "report" | "payment";
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
  route?: string;
}

interface NotificationsDropdownProps {
  visible: boolean;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "product",
      title: "Low Stock Alert",
      message: "Product 'Electronics Item A' is running low. Current stock: 5 units",
      timestamp: "2 minutes ago",
      unread: true,
      route: "/products/list-products",
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Due Reminder",
      message: "Customer 'John Doe' has an outstanding invoice of TSh 5,569.00",
      timestamp: "36 minutes ago",
      unread: true,
      route: "/sell/all-sales",
    },
    {
      id: "3",
      type: "customer",
      title: "New Customer Added",
      message: "A new customer 'Jane Smith' has been added to the system",
      timestamp: "53 minutes ago",
      unread: true,
      route: "/contacts/customers",
    },
    {
      id: "4",
      type: "purchase",
      title: "Purchase Payment Due",
      message: "Supplier 'ABC Suppliers' has a pending payment of TSh 8,500.00",
      timestamp: "1 hour ago",
      unread: true,
      route: "/purchases/list-purchases",
    },
    {
      id: "5",
      type: "stock",
      title: "Stock Adjustment Required",
      message: "Stock adjustment needed for 'Warehouse 1' location",
      timestamp: "2 hours ago",
      unread: false,
      route: "/stock-adjustment/add-stock-adjustment",
    },
    {
      id: "6",
      type: "report",
      title: "Monthly Report Ready",
      message: "Your monthly sales report for January 2024 is ready to view",
      timestamp: "3 hours ago",
      unread: false,
      route: "/reports/purchase-sale",
    },
  ]);

  const getNotificationIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      product: <AppstoreOutlined />,
      customer: <ContactsOutlined />,
      sale: <ShoppingOutlined />,
      purchase: <ShoppingOutlined />,
      stock: <DatabaseOutlined />,
      report: <BarChartOutlined />,
      payment: <DollarOutlined />,
    };
    return iconMap[type] || <ExclamationCircleOutlined />;
  };

  const getNotificationColor = (type: string) => {
    const colorMap: Record<string, string> = {
      product: "#1890ff",
      customer: "#52c41a",
      sale: "#52c41a",
      purchase: "#fa8c16",
      stock: "#722ed1",
      report: "#1890ff",
      payment: "#ff4d4f",
    };
    return colorMap[type] || "#1890ff";
  };

  const handleMarkAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.route) {
      navigate(notification.route);
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        right: 0,
        width: "380px",
        background: isDark ? "#1f1f1f" : "#ffffff",
        borderRadius: "12px",
        boxShadow: isDark 
          ? "0 8px 32px rgba(0,0,0,0.5)" 
          : "0 8px 32px rgba(0,0,0,0.15)",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        zIndex: 1002,
        maxHeight: "500px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          Notifications
        </Text>
        <Button
          type="text"
          icon={<CheckOutlined />}
          onClick={handleMarkAsRead}
          style={{
            color: "#52c41a",
            fontSize: "13px",
            padding: "4px 8px",
            height: "auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Make as Read
        </Button>
      </div>

      {/* Notifications List */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {notifications.map((notification, index) => (
          <div key={notification.id}>
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                gap: "12px",
                position: "relative",
                transition: "all 0.2s ease",
                cursor: notification.route ? "pointer" : "default",
              }}
              onClick={() => handleNotificationClick(notification)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "#fafafa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Icon Avatar */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: `${getNotificationColor(notification.type)}20`,
                  border: `1px solid ${getNotificationColor(notification.type)}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: getNotificationColor(notification.type),
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
                  <Text
                    strong
                    style={{
                      fontSize: "14px",
                      color: isDark ? "#fff" : "#1f1f1f",
                      display: "block",
                    }}
                  >
                    {notification.title}
                  </Text>
                  {notification.unread && (
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: isDark ? "rgba(255,255,255,0.4)" : "#bfbfbf",
                        marginTop: "6px",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
                <Text
                  style={{
                    fontSize: "13px",
                    color: isDark ? "rgba(255,255,255,0.65)" : "#595959",
                    display: "block",
                    marginBottom: "6px",
                    lineHeight: "1.5",
                  }}
                >
                  {notification.message}
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                  }}
                >
                  {notification.timestamp}
                </Text>
              </div>

              {/* Dismiss Button */}
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => handleDismiss(notification.id)}
                style={{
                  color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                  fontSize: "12px",
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  minWidth: "24px",
                  flexShrink: 0,
                }}
              />
            </div>
            {index < notifications.length - 1 && (
              <Divider style={{ margin: 0, borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        }}
      >
        <Button
          type="primary"
          block
          style={{
            background: "#1890ff",
            border: "none",
            height: "36px",
            fontWeight: 500,
          }}
          onClick={() => {
            // Navigate to all notifications page
            onClose();
          }}
        >
          Alls Notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;

