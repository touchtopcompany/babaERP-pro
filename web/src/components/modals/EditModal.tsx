import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, DatePicker, Button, Space, Typography } from "antd";
import { EditOutlined, CloseOutlined, SaveOutlined } from "@ant-design/icons";
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

export interface EditModalProps<T = any> {
  open: boolean;
  onClose: () => void;
  onSave: (values: T) => void | Promise<void>;
  title?: string;
  data: T | null;
  fields?: FormField[];
  width?: number | string;
  loading?: boolean;
}

const EditModal = <T extends Record<string, any>>({
  open,
  onClose,
  onSave,
  title = "Edit Record",
  data,
  fields,
  width = 600,
  loading = false,
}: EditModalProps<T>) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(false);

  // Auto-generate fields from data if fields prop is not provided
  const autoFields: FormField[] = React.useMemo(() => {
    if (fields) return fields;
    if (!data) return [];
    
    return Object.keys(data).map((key) => {
      const value = data[key];
      let type: FormField["type"] = "text";
      
      if (typeof value === "number") {
        type = "number";
      } else if (typeof value === "string" && value.includes("@")) {
        type = "email";
      } else if (typeof value === "string" && /^\d{10,}$/.test(value)) {
        type = "phone";
      } else if (typeof value === "string" && value.length > 100) {
        type = "textarea";
      }
      
      return {
        name: key,
        label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim(),
        type,
      };
    });
  }, [fields, data]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset form when data changes
  React.useEffect(() => {
    if (data && open) {
      const formValues: any = { ...data };
      // Convert date strings to dayjs objects if needed
      autoFields.forEach((field) => {
        if (field.type === "date" && formValues[field.name]) {
          formValues[field.name] = dayjs(formValues[field.name]);
        }
      });
      form.setFieldsValue(formValues);
    }
  }, [data, open, form, autoFields]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const processedValues: any = { ...values };
      
      // Convert dayjs objects to ISO strings
      autoFields.forEach((field) => {
        if (field.type === "date" && processedValues[field.name]) {
          processedValues[field.name] = (processedValues[field.name] as Dayjs).toISOString();
        }
      });

      await onSave(processedValues as T);
      form.resetFields();
      onClose();
    } catch (_error) {
      // Validation failed - form will show errors automatically
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
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                color: isDark ? "#fff" : "#1f1f1f",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                borderRadius: "6px",
              }}
            />
          </Form.Item>
        );

      case "select":
        return (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={rules}>
            <Select
              placeholder={field.placeholder}
              options={field.options}
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                color: isDark ? "#fff" : "#1f1f1f",
                borderRadius: "6px",
              }}
            />
          </Form.Item>
        );

      case "date":
        return (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={rules}>
            <DatePicker
              placeholder={field.placeholder}
              style={{
                width: "100%",
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                color: isDark ? "#fff" : "#1f1f1f",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                borderRadius: "6px",
              }}
            />
          </Form.Item>
        );

      case "email":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={[
              ...rules,
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input
              type="email"
              placeholder={field.placeholder}
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                color: isDark ? "#fff" : "#1f1f1f",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                borderRadius: "6px",
                height: "40px",
              }}
            />
          </Form.Item>
        );

      case "phone":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={[
              ...rules,
              { pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, message: "Please enter a valid phone number" },
            ]}
          >
            <Input
              type="tel"
              placeholder={field.placeholder}
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                color: isDark ? "#fff" : "#1f1f1f",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                borderRadius: "6px",
                height: "40px",
              }}
            />
          </Form.Item>
        );

      default:
        return (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={rules}>
            <Input
              placeholder={field.placeholder}
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                color: isDark ? "#fff" : "#1f1f1f",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                borderRadius: "6px",
                height: "40px",
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
      width={isMobile ? "95%" : width}
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
            onClick={handleCancel}
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
            onClick={handleSubmit}
            loading={loading}
            icon={<SaveOutlined />}
            style={{
              minWidth: "140px",
              height: "40px",
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Save Changes
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
              background: "linear-gradient(135deg, #52c41a20 0%, #52c41a10 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#52c41a",
              fontSize: "18px",
              border: "1px solid #52c41a30",
            }}
          >
            <EditOutlined />
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
        {autoFields.map((field) => renderFormField(field))}
      </Form>
    </Modal>
  );
};

export default EditModal;

