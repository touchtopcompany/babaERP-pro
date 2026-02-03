import { Typography, Avatar, Divider, Tag } from "antd";
import {
  CheckCircleOutlined,
  DollarOutlined,
  UserOutlined,
  HeartOutlined,
  CreditCardOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  RightOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { useNavigate } from "react-router-dom";
import useSerialize from "@/hooks/useSerialize";
import type { UserType } from "@/types/index";
import { useState, useEffect } from "react";

const { Text } = Typography;

interface ProfileDropdownProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { loadFromStorage } = useSerialize();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    (async () => {
      const storedUser = await loadFromStorage("user");
      setUser(storedUser);
    })();
  }, [loadFromStorage]);

  const menuItems = [
    {
      key: "active",
      label: "Active",
      icon: <CheckCircleOutlined />,
      hasArrow: true,
      hasDot: true,
      dotColor: "#52c41a",
    },
    {
      key: "subscriptions",
      label: "Subscriptions",
      icon: <DollarOutlined />,
      hasArrow: true,
    },
    {
      key: "profile-details",
      label: "Profile Details",
      icon: <UserOutlined />,
    },
    {
      key: "activity-feed",
      label: "Activity Feed",
      icon: <HeartOutlined />,
    },
    {
      key: "billing-details",
      label: "Billing Details",
      icon: <CreditCardOutlined />,
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: <BellOutlined />,
    },
    {
      key: "account-settings",
      label: "Account Settings",
      icon: <SettingOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      // Handle logout
      console.log("Logout");
      onClose();
      return;
    }
    
    const routes: Record<string, string> = {
      "profile-details": "/profile",
      "activity-feed": "/activity",
      "billing-details": "/billing",
      "account-settings": "/settings",
      "notifications": "/notifications",
    };
    
    if (routes[key]) {
      navigate(routes[key]);
      onClose();
    }
  };

  if (!visible) return null;

  const userName = user?.name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "user@example.com";

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        right: 0,
        width: "300px",
        background: isDark ? "#1f1f1f" : "#ffffff",
        borderRadius: "12px",
        boxShadow: isDark 
          ? "0 8px 32px rgba(0,0,0,0.5)" 
          : "0 8px 32px rgba(0,0,0,0.15)",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        zIndex: 1002,
        overflow: "hidden",
      }}
      onMouseEnter={() => {}} // Keep open on hover
      onMouseLeave={onClose} // Close when mouse leaves
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header Section */}
      <div
        style={{
          padding: "20px",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <Avatar
            size={48}
            style={{
              background: "#1890ff",
              flexShrink: 0,
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
              <Text
                strong
                style={{
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                  lineHeight: "1.4",
                }}
              >
                {userName}
              </Text>
              <Tag
                color="#52c41a"
                style={{
                  margin: 0,
                  padding: "2px 8px",
                  fontSize: "11px",
                  fontWeight: 600,
                  borderRadius: "4px",
                  height: "20px",
                  lineHeight: "16px",
                }}
              >
                PRO
              </Tag>
            </div>
            <Text
              style={{
                fontSize: "13px",
                color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                display: "block",
              }}
            >
              {userEmail}
            </Text>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div>
        {menuItems.map((item, index) => (
          <div key={item.key}>
            <div
              onClick={() => handleMenuClick(item.key)}
              style={{
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "#fafafa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  color: item.danger 
                    ? "#ff4d4f" 
                    : isDark 
                    ? "rgba(255,255,255,0.85)" 
                    : "#595959",
                  width: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                {item.hasDot && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: item.dotColor || "#52c41a",
                      flexShrink: 0,
                    }}
                  />
                )}
                <Text
                  style={{
                    fontSize: "14px",
                    color: item.danger 
                      ? "#ff4d4f" 
                      : isDark 
                      ? "rgba(255,255,255,0.85)" 
                      : "#1f1f1f",
                  }}
                >
                  {item.label}
                </Text>
              </div>
              {item.hasArrow && (
                <RightOutlined
                  style={{
                    fontSize: "12px",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                    marginLeft: "auto",
                  }}
                />
              )}
            </div>
            {index < menuItems.length - 1 && (
              <Divider style={{ margin: 0, borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDropdown;

