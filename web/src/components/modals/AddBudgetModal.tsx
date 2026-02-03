import React from "react";
import {
  Modal,
  Form,
  Select,
  Button,
  Space,
  Typography,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Text } = Typography;

export interface AddBudgetFormData {
  financialYear: string;
}

const FINANCIAL_YEAR_OPTIONS = [
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
];

interface AddBudgetModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: (values: AddBudgetFormData) => Promise<void> | void;
  loading?: boolean;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({
  open,
  onClose,
  onContinue,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();

  const handleContinue = async () => {
    try {
      const values = await form.validateFields();
      await onContinue(values as AddBudgetFormData);
      form.resetFields();
      onClose();
    } catch (_error) {
      // Validation errors are handled by Ant Design
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      closeIcon={
        <CloseOutlined
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "16px",
          }}
        />
      }
      title={
        <Text
          strong
          style={{
            fontSize: "18px",
            color: "#fff",
          }}
        >
          Financial year for the budget
        </Text>
      }
      width={500}
      styles={{
        content: {
          background: isDark ? "#1f1f1f" : "#ffffff",
          padding: "0",
        },
        header: {
          background: "#1890ff",
          borderBottom: "1px solid #1890ff",
          padding: "20px 24px",
          borderRadius: "8px 8px 0 0",
        },
        body: {
          padding: "24px",
          maxHeight: "70vh",
          overflowY: "auto",
        },
      }}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ financialYear: undefined }}
      >
        <Form.Item
          label={
            <Text
              style={{
                color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                fontSize: "14px",
              }}
            >
              Financial year for the budget
            </Text>
          }
          name="financialYear"
          rules={[{ required: true, message: "Please select a financial year" }]}
        >
          <Select
            placeholder="Financial year for the budget"
            allowClear
            options={FINANCIAL_YEAR_OPTIONS}
            style={{
              width: "100%",
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            }}
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginTop: "24px",
          }}
        >
          <Button
            onClick={handleClose}
            style={{
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Close
          </Button>
          <Button
            type="primary"
            onClick={handleContinue}
            loading={loading}
            style={{
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Continue
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddBudgetModal;
