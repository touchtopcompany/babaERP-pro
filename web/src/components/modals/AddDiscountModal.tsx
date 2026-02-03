import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Checkbox,
  Tooltip,
} from "antd";
import {
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import type { Dayjs } from "dayjs";

const { Text } = Typography;

export interface DiscountFormData {
  name: string;
  products?: string;
  brand?: string;
  category?: string;
  location: string;
  priority?: number;
  discountType: string;
  discountAmount: number;
  startsAt?: Dayjs;
  endsAt?: Dayjs;
  sellingPriceGroup?: string;
  isActive: boolean;
  applyInCustomerGroups: boolean;
}

interface AddDiscountModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: DiscountFormData) => Promise<void> | void;
  loading?: boolean;
}

const AddDiscountModal: React.FC<AddDiscountModalProps> = ({
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
      await onSave(values as DiscountFormData);
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
          Add Discount
        </Text>
      }
      width={800}
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
          isActive: true,
          applyInCustomerGroups: false,
        }}
      >
        {/* Name */}
        <Form.Item
          label={
            <Space>
              <Text>Name:</Text>
              <Text type="danger">*</Text>
            </Space>
          }
          name="name"
          rules={[{ required: true, message: "Please enter discount name" }]}
        >
          <Input
            placeholder="Name"
            style={{
              height: "40px",
              borderRadius: "6px",
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
            }}
          />
        </Form.Item>

        {/* Products */}
        <Form.Item label="Products:" name="products">
          <Input
            placeholder="Products"
            style={{
              height: "40px",
              borderRadius: "6px",
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
            }}
          />
        </Form.Item>

        {/* Brand & Category */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Brand:" name="brand">
              <Select
                placeholder="Please Select"
                style={{
                  height: "40px",
                  borderRadius: "6px",
                }}
              >
                <Select.Option value="all">All Brands</Select.Option>
                <Select.Option value="samsung">Samsung</Select.Option>
                <Select.Option value="apple">Apple</Select.Option>
                <Select.Option value="asus">Asus</Select.Option>
                <Select.Option value="dell">Dell</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Category:" name="category">
              <Select
                placeholder="Please Select"
                style={{
                  height: "40px",
                  borderRadius: "6px",
                }}
              >
                <Select.Option value="electronics">Electronics</Select.Option>
                <Select.Option value="mobile">Mobile Phones</Select.Option>
                <Select.Option value="computers">Computers</Select.Option>
                <Select.Option value="gaming">Gaming Laptops</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Location & Priority */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <Text>Location:</Text>
                  <Text type="danger">*</Text>
                </Space>
              }
              name="location"
              rules={[{ required: true, message: "Please select location" }]}
            >
              <Select
                placeholder="Please Select"
                style={{
                  height: "40px",
                  borderRadius: "6px",
                }}
              >
                <Select.Option value="C2Z Digital Solutions (C2Z1)">
                  C2Z Digital Solutions (C2Z1)
                </Select.Option>
                <Select.Option value="Location 2">Location 2</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <Text>Priority:</Text>
                  <Tooltip title="Discount priority">
                    <InfoCircleOutlined
                      style={{
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        fontSize: "12px",
                      }}
                    />
                  </Tooltip>
                </Space>
              }
              name="priority"
            >
              <InputNumber
                placeholder="Priority"
                min={0}
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "6px",
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Discount Type & Discount Amount */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <Text>Discount Type:</Text>
                  <Text type="danger">*</Text>
                </Space>
              }
              name="discountType"
              rules={[{ required: true, message: "Please select discount type" }]}
            >
              <Select
                placeholder="Please Select"
                style={{
                  height: "40px",
                  borderRadius: "6px",
                }}
              >
                <Select.Option value="percentage">Percentage</Select.Option>
                <Select.Option value="fixed">Fixed Amount</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <Text>Discount Amount:</Text>
                  <Text type="danger">*</Text>
                </Space>
              }
              name="discountAmount"
              rules={[{ required: true, message: "Please enter discount amount" }]}
            >
              <InputNumber
                placeholder="Discount Amount"
                min={0}
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "6px",
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Starts At & Ends At */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Starts At:" name="startsAt">
              <DatePicker
                showTime
                format="MM/DD/YYYY HH:mm"
                placeholder="Starts At"
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "6px",
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Ends At:" name="endsAt">
              <DatePicker
                showTime
                format="MM/DD/YYYY HH:mm"
                placeholder="Ends At"
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "6px",
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Selling Price Group */}
        <Form.Item label="Selling Price Group:" name="sellingPriceGroup">
          <Select
            defaultValue="All"
            style={{
              height: "40px",
              borderRadius: "6px",
            }}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="group1">Group 1</Select.Option>
            <Select.Option value="group2">Group 2</Select.Option>
          </Select>
        </Form.Item>

        {/* Checkboxes */}
        <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>Is active</Checkbox>
        </Form.Item>

        <Form.Item name="applyInCustomerGroups" valuePropName="checked">
          <Checkbox>Apply in customer groups</Checkbox>
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

export default AddDiscountModal;

