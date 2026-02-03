import React from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  Typography,
  Checkbox,
} from "antd";
import {
  CloseOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Text } = Typography;

export interface ExpenseCategoryFormData {
  categoryName: string;
  categoryCode?: string;
  addAsSubCategory: boolean;
}

interface AddExpenseCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: ExpenseCategoryFormData) => Promise<void> | void;
  loading?: boolean;
}

const AddExpenseCategoryModal: React.FC<AddExpenseCategoryModalProps> = ({
  open,
  onClose,
  onSave,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSave(values as ExpenseCategoryFormData);
      form.resetFields();
      onClose();
    } catch (_error) {
      // Validation errors are handled by Ant Design
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      closeIcon={
        <CloseOutlined
          style={{
            color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
            fontSize: "16px",
          }}
        />
      }
      title={
        <Text
          strong
          style={{
            fontSize: "18px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          Add Expense Category
        </Text>
      }
      width={600}
      styles={{
        content: {
          background: isDark ? "#1f1f1f" : "#ffffff",
          padding: "0",
        },
        header: {
          background: isDark ? "#1f1f1f" : "#ffffff",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
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
        initialValues={{
          addAsSubCategory: false,
        }}
      >
        {/* Category name */}
        <Form.Item
          label={
            <Space>
              <Text>Category name:</Text>
              <Text type="danger">*</Text>
            </Space>
          }
          name="categoryName"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input
            placeholder="Category name"
            style={{
              height: "40px",
              borderRadius: "6px",
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
            }}
          />
        </Form.Item>

        {/* Category code */}
        <Form.Item label="Category code:" name="categoryCode">
          <Input
            placeholder="Category code"
            style={{
              height: "40px",
              borderRadius: "6px",
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
            }}
          />
        </Form.Item>

        {/* Add as sub-category checkbox */}
        <Form.Item name="addAsSubCategory" valuePropName="checked">
          <Checkbox
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
            }}
          >
            Add as sub-category
          </Checkbox>
        </Form.Item>
      </Form>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        }}
      >
        <Button
          onClick={handleCancel}
          style={{
            height: "40px",
            borderRadius: "6px",
            fontWeight: 500,
            minWidth: "100px",
          }}
        >
          Close
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          style={{
            height: "40px",
            borderRadius: "6px",
            fontWeight: 500,
            minWidth: "100px",
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default AddExpenseCategoryModal;

