import { Modal, Typography, Button, Space } from "antd";
import { ExclamationCircleOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import useTheme from "@/theme/useTheme";

const { Text, Paragraph } = Typography;

export interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
  itemName?: string;
  loading?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Delete Record",
  message,
  itemName,
  loading = false,
}) => {
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

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (_error) {
      // Error handling is done in the parent component
    }
  };

  const defaultMessage = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : "Are you sure you want to delete this record? This action cannot be undone.";

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={isMobile ? "95%" : 520}
      style={{ top: isMobile ? 20 : 100 }}
      closeIcon={
        <CloseOutlined
          style={{
            color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
            fontSize: "16px",
          }}
        />
      }
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "16px" }}>
          <Button
            onClick={onClose}
            disabled={loading}
            style={{
              minWidth: "100px",
              height: "40px",
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleConfirm}
            loading={loading}
            icon={<DeleteOutlined />}
            style={{
              minWidth: "120px",
              height: "40px",
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Delete
          </Button>
        </div>
      }
      title={
        <Space>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #ff4d4f20 0%, #ff4d4f10 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ff4d4f",
              fontSize: "18px",
              border: "1px solid #ff4d4f30",
            }}
          >
            <ExclamationCircleOutlined />
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
      width={520}
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
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
          marginTop: "8px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: isDark ? "rgba(255, 77, 79, 0.15)" : "rgba(255, 77, 79, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ff4d4f",
            fontSize: "24px",
            flexShrink: 0,
          }}
        >
          <ExclamationCircleOutlined />
        </div>
        <div style={{ flex: 1 }}>
          <Paragraph
            style={{
              margin: 0,
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
              fontSize: "15px",
              lineHeight: "1.6",
            }}
          >
            {message || defaultMessage}
          </Paragraph>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

