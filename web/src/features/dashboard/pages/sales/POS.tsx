import React, { useState } from "react";
import {
  Card,
  Form,
  InputNumber,
  Button,
  Space,
  Typography,
  Row,
  Col,
  message,
} from "antd";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;

const POS: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOpenRegister = async (values: { cashInHand: number }) => {
    setLoading(true);
    try {
      // TODO: Implement API call to open cash register
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Cash register opened successfully");
      form.resetFields();
      // TODO: Navigate to POS interface or update state
    } catch (_error) {
      message.error("Failed to open cash register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 200px)",
        background: isDark ? "#141414" : "#F8FAFC",
        padding: "24px",
        borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
      }}
    >
      <Row justify="center" align="middle" style={{ minHeight: "calc(100vh - 250px)" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.3)"
                : "0 2px 8px rgba(0,0,0,0.08)",
            }}
            bodyStyle={{ padding: "32px" }}
          >
            <Title
              level={2}
              style={{
                margin: 0,
                marginBottom: "32px",
                color: isDark ? "#fff" : "#1f1f1f",
                fontWeight: 600,
              }}
            >
              Open Cash Register
            </Title>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleOpenRegister}
              initialValues={{
                cashInHand: 0,
              }}
            >
              <Form.Item
                label={
                  <Space>
                    <Text
                      style={{
                        fontSize: "14px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                        fontWeight: 500,
                      }}
                    >
                      Cash in hand:
                    </Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="cashInHand"
                rules={[
                  { required: true, message: "Please enter cash in hand amount" },
                  { type: "number", min: 0, message: "Amount must be greater than or equal to 0" },
                ]}
              >
                <Space.Compact style={{ width: "100%", display: "flex" }}>
                  <InputNumber
                    placeholder="Enter amount"
                    min={0}
                    precision={2}
                    style={{
                      flex: 1,
                      height: "48px",
                      borderRadius: "6px 0 0 6px",
                      background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    }}
                    formatter={(value) => {
                      if (!value) return "";
                      return `TSh ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }}
                    parser={(value) => {
                      if (!value) return 0;
                      return parseFloat(value.replace(/TSh\s?|(,*)/g, "")) || 0;
                    }}
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{
                      height: "48px",
                      borderRadius: "0 6px 6px 0",
                      fontWeight: 500,
                      paddingLeft: "32px",
                      paddingRight: "32px",
                      fontSize: "16px",
                    }}
                  >
                    Open Register
                  </Button>
                </Space.Compact>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default POS;

