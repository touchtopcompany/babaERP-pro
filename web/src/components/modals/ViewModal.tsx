import { Modal, Descriptions, Typography, Button, Space } from "antd";
import { EyeOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import useTheme from "@/theme/useTheme";

const { Text } = Typography;

export interface ViewModalProps<T = any> {
  open: boolean;
  onClose: () => void;
  title?: string;
  data: T | null;
  fields?: Array<{
    key: string;
    label: string;
    render?: (value: any, record: T) => React.ReactNode;
  }>;
  width?: number | string;
}

const ViewModal = <T extends Record<string, any>>({
  open,
  onClose,
  title = "View Details",
  data,
  fields = [],
  width = 600,
}: ViewModalProps<T>) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!data) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={isMobile ? "95%" : width}
      style={{ top: isMobile ? 20 : 100 }}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "16px" }}>
          <Button
            type="primary"
            onClick={onClose}
            style={{
              minWidth: "100px",
              height: "40px",
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Close
          </Button>
        </div>
      }
      closeIcon={
        <CloseOutlined
          style={{
            color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
            fontSize: "16px",
          }}
        />
      }
      title={
        <Space>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #1890ff20 0%, #1890ff10 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1890ff",
              fontSize: "18px",
              border: "1px solid #1890ff30",
            }}
          >
            <EyeOutlined />
          </div>
          <Text
            strong
            style={{
              fontSize: "20px",
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            {title}
          </Text>
        </Space>
      }
      width={width}
      styles={{
        content: {
          background: isDark ? "#1f1f1f" : "#ffffff",
          padding: "24px",
        },
        header: {
          background: isDark ? "#1f1f1f" : "#ffffff",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          padding: "20px 24px",
          borderRadius: "8px 8px 0 0",
        },
        footer: {
          background: isDark ? "#1f1f1f" : "#ffffff",
          borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          padding: "16px 24px",
          borderRadius: "0 0 8px 8px",
        },
        body: {
          padding: "24px",
        },
      }}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Descriptions
        bordered
        column={1}
        size="middle"
        style={{
          marginTop: "8px",
        }}
        labelStyle={{
          background: isDark ? "rgba(24, 144, 255, 0.08)" : "rgba(24, 144, 255, 0.04)",
          color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          fontWeight: 600,
          width: "35%",
          padding: "12px 16px",
          borderRight: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e8e8e8",
        }}
        contentStyle={{
          background: isDark ? "rgba(255,255,255,0.02)" : "#ffffff",
          color: isDark ? "#fff" : "#1f1f1f",
          padding: "12px 16px",
          fontWeight: 500,
        }}
      >
        {fields.map((field, index) => {
          const value = data[field.key];
          return (
            <Descriptions.Item
              key={field.key}
              label={field.label}
              style={{
                borderBottom: index < fields.length - 1
                  ? (isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e8e8e8")
                  : "none",
              }}
            >
              {field.render ? field.render(value, data) : (
                <Text
                  style={{
                    color: isDark ? "#fff" : "#1f1f1f",
                    fontSize: "14px",
                  }}
                >
                  {value || (
                    <span style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#bfbfbf" }}>
                      -
                    </span>
                  )}
                </Text>
              )}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </Modal>
  );
};

export default ViewModal;

