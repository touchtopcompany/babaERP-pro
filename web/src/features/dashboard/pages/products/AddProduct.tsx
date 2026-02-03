import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Upload,
  message,
  Divider,
  Tooltip,
} from "antd";
import {
  InfoCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  SaveOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd";
import useTheme from "@/theme/useTheme";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { TextArea } = Input;

const AddProduct: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [manageStock, setManageStock] = useState(true);
  const [productImageList, setProductImageList] = useState<UploadFile[]>([]);
  const [brochureList, setBrochureList] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // TODO: Implement API call to create product
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Product created successfully");
      form.resetFields();
      navigate("/products/list-products");
    } catch (error) {
      message.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndAddAnother = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // TODO: Implement API call to create product
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Product created successfully");
      form.resetFields();
      setProductImageList([]);
      setBrochureList([]);
    } catch (error) {
      message.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndAddOpeningStock = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // TODO: Implement API call to create product and navigate to opening stock
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Product created successfully");
      // TODO: Navigate to opening stock page
      message.info("Opening stock page coming soon");
    } catch (error) {
      message.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBrand = () => {
    // TODO: Open add brand modal
    message.info("Add brand functionality coming soon");
  };

  return (
    <div>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Add new product
          </Title>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Space
            style={{
              width: "100%",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Button
              icon={<ReloadOutlined />}
              onClick={() => form.resetFields()}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Reset
            </Button>
          </Space>
        </Col>
      </Row>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          manageStock: true,
          barcodeType: "C128",
          sellingPriceTaxType: "exclusive",
          productType: "single",
          applicableTax: "none",
        }}
      >
        {/* Product Basic Information Section */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Title
            level={4}
            style={{
              marginBottom: "24px",
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Product Basic Information
          </Title>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="productName"
                label={
                  <Space>
                    <Text>Product Name</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                rules={[{ required: true, message: "Please enter product name" }]}
              >
                <Input
                  placeholder="Product Name"
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    color: isDark ? "#fff" : "#1f1f1f",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="unit"
                label={
                  <Space>
                    <Text>Unit</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                rules={[{ required: true, message: "Please select unit" }]}
              >
                <Select
                  placeholder="Please Select"
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  <Select.Option value="pieces">Pieces</Select.Option>
                  <Select.Option value="sets">Sets</Select.Option>
                  <Select.Option value="pairs">Pairs</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="sku"
                label={
                  <Space>
                    <Text>SKU</Text>
                    <Tooltip title="Stock Keeping Unit">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          cursor: "help",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
              >
                <Input
                  placeholder="SKU"
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    color: isDark ? "#fff" : "#1f1f1f",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="brand"
                label="Brand"
              >
                <Space.Compact style={{ width: "100%" }}>
                  <Select
                    placeholder="Please Select"
                    style={{
                      flex: 1,
                      height: "40px",
                      borderRadius: "6px",
                    }}
                  >
                    <Select.Option value="brand1">Brand 1</Select.Option>
                    <Select.Option value="brand2">Brand 2</Select.Option>
                  </Select>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddBrand}
                    style={{
                      height: "40px",
                      borderRadius: "0 6px 6px 0",
                    }}
                  />
                </Space.Compact>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="barcodeType"
                label={
                  <Space>
                    <Text>Barcode Type</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                rules={[{ required: true, message: "Please select barcode type" }]}
              >
                <Select
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  <Select.Option value="C128">Code 128 (C128)</Select.Option>
                  <Select.Option value="C39">Code 39 (C39)</Select.Option>
                  <Select.Option value="EAN13">EAN-13</Select.Option>
                  <Select.Option value="EAN8">EAN-8</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="category"
                label="Category"
              >
                <Select
                  placeholder="Please Select"
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  <Select.Option value="cat1">Category 1</Select.Option>
                  <Select.Option value="cat2">Category 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="subCategory"
                label="Sub category"
              >
                <Select
                  placeholder="Please Select"
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  <Select.Option value="sub1">Sub Category 1</Select.Option>
                  <Select.Option value="sub2">Sub Category 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item
                name="businessLocations"
                label={
                  <Space>
                    <Text>Business Locations</Text>
                    <Tooltip title="Select business locations for this product">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          cursor: "help",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
              >
                <Select
                  mode="multiple"
                  placeholder="Select business locations"
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  <Select.Option value="location1">C2Z Digital Solutions</Select.Option>
                  <Select.Option value="location2">Location 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Stock Management and Description Section */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item name="manageStock" valuePropName="checked">
                <Checkbox
                  checked={manageStock}
                  onChange={(e) => setManageStock(e.target.checked)}
                >
                  <Space>
                    <Text>Manage Stock?</Text>
                    <Tooltip title="Enable stock management at product level">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          cursor: "help",
                        }}
                      />
                    </Tooltip>
                  </Space>
                </Checkbox>
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginTop: "4px",
                    fontSize: "12px",
                  }}
                >
                  Enable stock management at product level
                </Text>
              </Form.Item>
            </Col>

            {manageStock && (
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="alertQuantity"
                  label={
                    <Space>
                      <Text>Alert quantity</Text>
                      <Tooltip title="Alert when stock falls below this quantity">
                        <InfoCircleOutlined
                          style={{
                            color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                            cursor: "help",
                          }}
                        />
                      </Tooltip>
                    </Space>
                  }
                >
                  <InputNumber
                    placeholder="Alert quantity"
                    min={0}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "6px",
                    }}
                  />
                </Form.Item>
              </Col>
            )}

            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item
                name="productDescription"
                label="Product Description"
              >
                <TextArea
                  rows={6}
                  placeholder="Enter product description..."
                  style={{
                    borderRadius: "6px",
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    color: isDark ? "#fff" : "#1f1f1f",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item
                name="productImage"
                label="Product image"
              >
                <Upload
                  fileList={productImageList}
                  onChange={({ fileList }) => setProductImageList(fileList)}
                  beforeUpload={() => false}
                  accept="image/*"
                  maxCount={1}
                >
                  <Button
                    icon={<UploadOutlined />}
                    style={{
                      height: "40px",
                      borderRadius: "6px",
                      fontWeight: 500,
                    }}
                  >
                    Browse..
                  </Button>
                </Upload>
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginTop: "8px",
                    fontSize: "12px",
                  }}
                >
                  Max File size: 5MB | Aspect ratio should be 1:1
                </Text>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Product Brochure Section */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Form.Item
            name="productBrochure"
            label="Product brochure"
          >
            <Upload
              fileList={brochureList}
              onChange={({ fileList }) => setBrochureList(fileList)}
              beforeUpload={() => false}
              accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
              maxCount={1}
            >
              <Button
                icon={<UploadOutlined />}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Choose File
              </Button>
            </Upload>
            <Text
              type="secondary"
              style={{
                display: "block",
                marginTop: "8px",
                fontSize: "12px",
              }}
            >
              Max File size: 5MB | Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
            </Text>
          </Form.Item>
        </Card>

        {/* Additional Product Details Section */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item name="enableIMEI" valuePropName="checked">
                <Checkbox>
                  <Space>
                    <Text>Enable Product description, IMEI or Serial Number</Text>
                    <Tooltip title="Enable IMEI or Serial Number tracking">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          cursor: "help",
                        }}
                      />
                    </Tooltip>
                  </Space>
                </Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item name="notForSelling" valuePropName="checked">
                <Checkbox>
                  <Space>
                    <Text>Not for selling</Text>
                    <Tooltip title="Mark product as not available for sale">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          cursor: "help",
                        }}
                      />
                    </Tooltip>
                  </Space>
                </Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item
                name="weight"
                label="Weight"
              >
                <Input
                  placeholder="Weight"
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    color: isDark ? "#fff" : "#1f1f1f",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item
                name="preparationTime"
                label="Service staff timer/Preparation time (In minutes)"
              >
                <InputNumber
                  placeholder="Service staff timer/Preparation time (In minutes)"
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
        </Card>

        {/* Pricing and Tax Section */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="applicableTax"
                label="Applicable Tax"
              >
                <Select
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  <Select.Option value="none">None</Select.Option>
                  <Select.Option value="tax1">Tax 1</Select.Option>
                  <Select.Option value="tax2">Tax 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="sellingPriceTaxType"
                label={
                  <Space>
                    <Text>Selling Price Tax Type</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                rules={[{ required: true, message: "Please select tax type" }]}
              >
                <Select
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  <Select.Option value="exclusive">Exclusive</Select.Option>
                  <Select.Option value="inclusive">Inclusive</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="productType"
                label={
                  <Space>
                    <Text>Product Type</Text>
                    <Text type="danger">*</Text>
                    <Tooltip title="Single product or variable product">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          cursor: "help",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                rules={[{ required: true, message: "Please select product type" }]}
              >
                <Select
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  <Select.Option value="single">Single</Select.Option>
                  <Select.Option value="variable">Variable</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ margin: "24px 0" }} />

          {/* Default Purchase Price Section */}
          <div
            style={{
              background: isDark ? "rgba(82, 196, 26, 0.1)" : "rgba(82, 196, 26, 0.05)",
              padding: "16px",
              borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
              marginBottom: "16px",
            }}
          >
            <Title
              level={5}
              style={{
                marginBottom: "16px",
                color: "#52c41a",
                fontWeight: 600,
              }}
            >
              Default Purchase Price
            </Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="purchasePriceExcTax"
                  label={
                    <Space>
                      <Text>Exc. tax</Text>
                      <Text type="danger">*</Text>
                    </Space>
                  }
                  rules={[{ required: true, message: "Please enter purchase price (exc. tax)" }]}
                >
                  <InputNumber
                    placeholder="Exc. tax"
                    min={0}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "6px",
                    }}
                    formatter={(value) => `TSh ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value!.replace(/TSh\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="purchasePriceIncTax"
                  label={
                    <Space>
                      <Text>Inc. tax</Text>
                      <Text type="danger">*</Text>
                    </Space>
                  }
                  rules={[{ required: true, message: "Please enter purchase price (inc. tax)" }]}
                >
                  <InputNumber
                    placeholder="Inc. tax"
                    min={0}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "6px",
                    }}
                    formatter={(value) => `TSh ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value!.replace(/TSh\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Margin Section */}
          <div
            style={{
              background: isDark ? "rgba(82, 196, 26, 0.1)" : "rgba(82, 196, 26, 0.05)",
              padding: "16px",
              borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
              marginBottom: "16px",
            }}
          >
            <Title
              level={5}
              style={{
                marginBottom: "16px",
                color: "#52c41a",
                fontWeight: 600,
              }}
            >
              Margin(%)
            </Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="margin"
                  initialValue={25.00}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "6px",
                    }}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value!.replace("%", "")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Default Selling Price Section */}
          <div
            style={{
              background: isDark ? "rgba(82, 196, 26, 0.1)" : "rgba(82, 196, 26, 0.05)",
              padding: "16px",
              borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
              marginBottom: "16px",
            }}
          >
            <Title
              level={5}
              style={{
                marginBottom: "16px",
                color: "#52c41a",
                fontWeight: 600,
              }}
            >
              Default Selling Price
            </Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="sellingPriceExcTax"
                  label="Exc. Tax"
                >
                  <InputNumber
                    placeholder="Exc. tax"
                    min={0}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "6px",
                    }}
                    formatter={(value) => `TSh ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value!.replace(/TSh\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Product Image Section (Duplicate) */}
          <div
            style={{
              background: isDark ? "rgba(82, 196, 26, 0.1)" : "rgba(82, 196, 26, 0.05)",
              padding: "16px",
              borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
            }}
          >
            <Title
              level={5}
              style={{
                marginBottom: "16px",
                color: "#52c41a",
                fontWeight: 600,
              }}
            >
              Product image
            </Title>
            <Form.Item
              name="productImageDuplicate"
            >
              <Upload
                fileList={productImageList}
                onChange={({ fileList }) => setProductImageList(fileList)}
                beforeUpload={() => false}
                accept="image/*"
                maxCount={5}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    fontWeight: 500,
                  }}
                >
                  Choose Files
                </Button>
              </Upload>
              <Text
                type="secondary"
                style={{
                  display: "block",
                  marginTop: "8px",
                  fontSize: "12px",
                }}
              >
                Max File size: 5MB | Aspect ratio should be 1:1
              </Text>
            </Form.Item>
          </div>
        </Card>

        {/* Action Buttons */}
        <Card
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Space size="large">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSaveAndAddOpeningStock}
              loading={loading}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
                background: "#722ed1",
                borderColor: "#722ed1",
              }}
            >
              Save & Add Opening Stock
            </Button>
            <Button
              type="primary"
              danger
              icon={<SaveOutlined />}
              onClick={handleSaveAndAddAnother}
              loading={loading}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Save And Add Another
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Save
            </Button>
          </Space>
        </Card>
      </Form>
    </div>
  );
};

export default AddProduct;

