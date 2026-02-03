import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Checkbox,
  InputNumber,
  Tag,
  message,
} from "antd";
import {
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [manageStock, setManageStock] = useState(true);
  const [enableProductDescription, setEnableProductDescription] = useState(false);
  const [notForSelling, setNotForSelling] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["C2Z Digital Solutions (C2Z1)"]);
  const [margin, setMargin] = useState<number>(25.00);
  const [purchaseExcTax, setPurchaseExcTax] = useState<number>(0);
  const [purchaseIncTax, setPurchaseIncTax] = useState<number>(0);
  const [sellingExcTax, setSellingExcTax] = useState<number>(0);

  // Calculate selling price based on margin
  React.useEffect(() => {
    if (purchaseExcTax > 0 && margin > 0) {
      const calculatedSelling = purchaseExcTax * (1 + margin / 100);
      setSellingExcTax(calculatedSelling);
    }
  }, [purchaseExcTax, margin]);

  const handleRemoveLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((l) => l !== location));
  };

  const handleAddLocation = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleSubmit = async (_values: any) => {
    setLoading(true);
    try {
      // TODO: Implement API call to save product
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Product created successfully");
      form.resetFields();
      setManageStock(true);
      setEnableProductDescription(false);
      setNotForSelling(false);
      setSelectedLocations(["C2Z Digital Solutions (C2Z1)"]);
      setMargin(25.00);
      setPurchaseExcTax(0);
      setPurchaseIncTax(0);
      setSellingExcTax(0);
      onSave?.();
      onClose();
    } catch (_error) {
      message.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setManageStock(true);
    setEnableProductDescription(false);
    setNotForSelling(false);
    setSelectedLocations(["C2Z Digital Solutions (C2Z1)"]);
    setMargin(25.00);
    setPurchaseExcTax(0);
    setPurchaseIncTax(0);
    setSellingExcTax(0);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={1200}
      closeIcon={
        <CloseOutlined
          style={{
            color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
            fontSize: "18px",
          }}
        />
      }
      styles={{
        content: {
          background: isDark ? "rgba(30,30,30,0.95)" : "#ffffff",
          padding: 0,
        },
        header: {
          background: isDark ? "rgba(255,255,255,0.05)" : "#fafafa",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          padding: "20px 24px",
          borderRadius: "8px 8px 0 0",
        },
        body: {
          padding: "24px",
          maxHeight: "80vh",
          overflowY: "auto",
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          barcodeType: "C128",
          applicableTax: "none",
          sellingPriceTaxType: "exclusive",
        }}
      >
        {/* Header */}
        <Title
          level={3}
          style={{
            margin: 0,
            marginBottom: "24px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 600,
          }}
        >
          Add new product
        </Title>

        {/* Product Identification Section */}
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
            borderRadius: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Product Name</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="productName"
                rules={[{ required: true, message: "Please enter product name" }]}
              >
                <Input
                  placeholder="Product Name"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>SKU</Text>
                    <InfoCircleOutlined
                      style={{
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        fontSize: "12px",
                      }}
                    />
                  </Space>
                }
                name="sku"
              >
                <Input
                  placeholder="SKU"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Barcode Type</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="barcodeType"
                rules={[{ required: true, message: "Please select barcode type" }]}
              >
                <Select style={{ width: "100%" }}>
                  <Select.Option value="C128">Code 128 (C128)</Select.Option>
                  <Select.Option value="C39">Code 39 (C39)</Select.Option>
                  <Select.Option value="EAN13">EAN-13</Select.Option>
                  <Select.Option value="EAN8">EAN-8</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Unit</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="unit"
                rules={[{ required: true, message: "Please select unit" }]}
              >
                <Select placeholder="Please Select" style={{ width: "100%" }}>
                  <Select.Option value="piece">Piece</Select.Option>
                  <Select.Option value="kg">Kilogram</Select.Option>
                  <Select.Option value="liter">Liter</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Brand:" name="brand">
                <Select placeholder="Please Select" style={{ width: "100%" }}>
                  <Select.Option value="brand1">Brand 1</Select.Option>
                  <Select.Option value="brand2">Brand 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Category:" name="category">
                <Select placeholder="Please Select" style={{ width: "100%" }}>
                  <Select.Option value="cat1">Category 1</Select.Option>
                  <Select.Option value="cat2">Category 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Sub category:" name="subCategory">
                <Select placeholder="Please Select" style={{ width: "100%" }}>
                  <Select.Option value="subcat1">Sub Category 1</Select.Option>
                  <Select.Option value="subcat2">Sub Category 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Stock and Location Management Section */}
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
            borderRadius: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Alert quantity:" name="alertQuantity">
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="Alert quantity"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Business Locations:</Text>
                    <InfoCircleOutlined
                      style={{
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        fontSize: "12px",
                      }}
                    />
                  </Space>
                }
              >
                <Select
                  placeholder="Select location"
                  style={{ width: "100%" }}
                  onSelect={handleAddLocation}
                >
                  <Select.Option value="C2Z Digital Solutions (C2Z1)">
                    C2Z Digital Solutions (C2Z1)
                  </Select.Option>
                  <Select.Option value="Location 2">Location 2</Select.Option>
                </Select>
                <div style={{ marginTop: "8px" }}>
                  {selectedLocations.map((location) => (
                    <Tag
                      key={location}
                      closable
                      onClose={() => handleRemoveLocation(location)}
                      color="blue"
                      style={{ marginBottom: "4px" }}
                    >
                      {location}
                    </Tag>
                  ))}
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Weight:" name="weight">
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="Weight"
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item>
                <Checkbox
                  checked={manageStock}
                  onChange={(e) => setManageStock(e.target.checked)}
                >
                  <Space>
                    <Text>Manage Stock?</Text>
                    <InfoCircleOutlined
                      style={{
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        fontSize: "12px",
                      }}
                    />
                  </Space>
                </Checkbox>
                <div style={{ marginTop: "4px", marginLeft: "24px" }}>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "12px",
                      color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                    }}
                  >
                    Enable stock management at product level
                  </Text>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Product Description Section */}
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
            borderRadius: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          }}
        >
          <Form.Item label="Product Description:" name="description">
            <TextArea
              rows={8}
              placeholder="Enter product description..."
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
              }}
            />
            <div
              style={{
                marginTop: "8px",
                textAlign: "right",
                fontSize: "12px",
                color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
              }}
            >
              <Text type="secondary">0 words</Text>
              <Text type="secondary" style={{ marginLeft: "8px" }}>
                Powered by Tiny
              </Text>
            </div>
          </Form.Item>
        </div>

        {/* Tax and Selling Price Section */}
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
            borderRadius: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Applicable Tax:" name="applicableTax">
                <Select style={{ width: "100%" }}>
                  <Select.Option value="none">None</Select.Option>
                  <Select.Option value="vat18">VAT 18%</Select.Option>
                  <Select.Option value="vat20">VAT 20%</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Selling Price Tax Type</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="sellingPriceTaxType"
                rules={[{ required: true, message: "Please select tax type" }]}
              >
                <Select style={{ width: "100%" }}>
                  <Select.Option value="exclusive">Exclusive</Select.Option>
                  <Select.Option value="inclusive">Inclusive</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item>
                <Checkbox
                  checked={enableProductDescription}
                  onChange={(e) => setEnableProductDescription(e.target.checked)}
                >
                  <Space>
                    <Text>Enable Product description, IMEI or Serial Number</Text>
                    <InfoCircleOutlined
                      style={{
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        fontSize: "12px",
                      }}
                    />
                  </Space>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Custom Fields Section */}
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
            borderRadius: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item>
                <Checkbox
                  checked={notForSelling}
                  onChange={(e) => setNotForSelling(e.target.checked)}
                >
                  <Space>
                    <Text>Not for selling</Text>
                    <InfoCircleOutlined
                      style={{
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        fontSize: "12px",
                      }}
                    />
                  </Space>
                </Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Custom Field1:" name="customField1">
                <Input
                  placeholder="Custom Field1"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Custom Field2:" name="customField2">
                <Input
                  placeholder="Custom Field2"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Custom Field3:" name="customField3">
                <Input
                  placeholder="Custom Field3"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Custom Field4:" name="customField4">
                <Input
                  placeholder="Custom Field4"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Pricing Information Section */}
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
            borderRadius: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          }}
        >
          {/* Default Purchase Price */}
          <div
            style={{
              background: "#52c41a",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "4px",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            Default Purchase Price
          </div>
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Exc. tax</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="purchaseExcTax"
                rules={[{ required: true, message: "Please enter purchase price" }]}
              >
                <InputNumber
                  value={purchaseExcTax}
                  onChange={(val) => setPurchaseExcTax(val || 0)}
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix="TSh"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Inc. tax</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="purchaseIncTax"
                rules={[{ required: true, message: "Please enter purchase price with tax" }]}
              >
                <InputNumber
                  value={purchaseIncTax}
                  onChange={(val) => setPurchaseIncTax(val || 0)}
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix="TSh"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Margin */}
          <div
            style={{
              background: "#52c41a",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "4px",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            <Space>
              <Text style={{ color: "#fff" }}>x Margin(%)</Text>
              <InfoCircleOutlined style={{ color: "#fff", fontSize: "14px" }} />
            </Space>
          </div>
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            <Col xs={24} sm={12} md={8}>
              <InputNumber
                value={margin}
                onChange={(val) => setMargin(val || 0)}
                min={0}
                precision={2}
                style={{ width: "100%" }}
                suffix="%"
              />
            </Col>
          </Row>

          {/* Default Selling Price */}
          <div
            style={{
              background: "#52c41a",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "4px",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            Default Selling Price
          </div>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Exc. tax" name="sellingExcTax">
                <InputNumber
                  value={sellingExcTax}
                  onChange={(val) => setSellingExcTax(val || 0)}
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix="TSh"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Footer with Save and Close Buttons */}
        <Row justify="end" style={{ marginTop: "24px", paddingTop: "16px", borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
          <Col>
            <Space>
              <Button
                onClick={handleCancel}
                style={{
                  height: "40px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Close
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  height: "40px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Save
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddProductModal;

