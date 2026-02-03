import React from "react";
import { Modal, Form, Input, InputNumber, Select, DatePicker, Button, Space, Typography } from "antd";
import { PlusOutlined, CloseOutlined, SaveOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import dayjs, { Dayjs } from "dayjs";

const { TextArea } = Input;
const { Text } = Typography;

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "date" | "email" | "phone";
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string | number }>;
  rules?: any[];
}

export interface AddModalProps<T = any> {
  open: boolean;
  onClose: () => void;
  onSave: (values: T) => Promise<void> | void;
  title?: string;
  fields: FormField[];
  width?: number | string;
  loading?: boolean;
}

const AddModal = <T extends Record<string, any>>({
  open,
  onClose,
  onSave,
  title = "Add New Record",
  fields,
  width = 600,
  loading = false,
}: AddModalProps<T>) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const processedValues: any = { ...values };
      
      // Convert dayjs objects to ISO strings
      fields.forEach((field) => {
        if (field.type === "date" && processedValues[field.name]) {
          processedValues[field.name] = (processedValues[field.name] as Dayjs).toISOString();
        }
      });

      await onSave(processedValues as T);
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

  const renderFormField = (field: FormField) => {
    const rules = field.rules || [];
    if (field.required) {
      rules.push({ required: true, message: `Please enter ${field.label.toLowerCase()}` });
    }

    switch (field.type) {
      case "textarea":
        return (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={rules}>
            <TextArea
              placeholder={field.placeholder}
              rows={4}
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                color: isDark ? "#fff" : "#1f1f1f",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                borderRadius: "6px",
              }}
            />
          </Form.Item>
        );

      case "number":
        return (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={rules}>
            <InputNumber
              placeholder={field.placeholder}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
              }}
            />
          </Form.Item>
        );

      case "select":
        return (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={rules}>
            <Select
              placeholder={field.placeholder || "Please select"}
              options={field.options}
              style={{
                height: "40px",
                borderRadius: "6px",
              }}
            />
          </Form.Item>
        );

      case "date":
        return (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={rules}>
            <DatePicker
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
              }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        );

      default:
        return (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={rules}>
            <Input
              placeholder={field.placeholder}
              style={{
                height: "40px",
                borderRadius: "6px",
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                color: isDark ? "#fff" : "#1f1f1f",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
              }}
            />
          </Form.Item>
        );
    }
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
        <Space align="center">
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #1890ff20 0%, #1890ff10 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1890ff",
              fontSize: "16px",
              border: "1px solid #1890ff30",
            }}
          >
            <PlusOutlined />
          </div>
          <Text
            strong
            style={{
              fontSize: "18px",
              color: isDark ? "#fff" : "#1f1f1f",
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
        style={{
          marginTop: "8px",
        }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        {fields.map((field) => renderFormField(field))}
      </Form>

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
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          icon={<SaveOutlined />}
          style={{
            height: "40px",
            borderRadius: "6px",
            fontWeight: 500,
            minWidth: "120px",
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default AddModal;

