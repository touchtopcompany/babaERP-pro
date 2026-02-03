import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Button,
  Typography,
  Row,
  Col,
  Table,
  Space,
  message,
  Tooltip,
  DatePicker,
} from "antd";
import {
  InfoCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface LabelProduct {
  key: string;
  product: string;
  numberOfLabels: number;
  packingDate: string;
  sellingPriceGroup: string;
}

const PrintLabels: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  
  // Mock data - replace with API call
  const defaultProducts: LabelProduct[] = [
    {
      key: "1",
      product: "100W Supper charge",
      numberOfLabels: 25,
      packingDate: dayjs().format("YYYY-MM-DD"),
      sellingPriceGroup: "Default",
    },
    {
      key: "2",
      product: "Amplify CA 18",
      numberOfLabels: 10,
      packingDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
      sellingPriceGroup: "Price Group 1",
    },
    {
      key: "3",
      product: "Drums Set",
      numberOfLabels: 5,
      packingDate: dayjs().add(2, "days").format("YYYY-MM-DD"),
      sellingPriceGroup: "Price Group 2",
    },
    {
      key: "4",
      product: "Keyboard (Dell) KB 218",
      numberOfLabels: 15,
      packingDate: dayjs().format("YYYY-MM-DD"),
      sellingPriceGroup: "Default",
    },
    {
      key: "5",
      product: "Data Cable TPE Fast charge",
      numberOfLabels: 30,
      packingDate: dayjs().add(3, "days").format("YYYY-MM-DD"),
      sellingPriceGroup: "Price Group 1",
    },
  ];
  
  const [products, setProducts] = useState<LabelProduct[]>(defaultProducts);
  const [loading, setLoading] = useState(false);

  // Form values for label information
  const [labelInfo, setLabelInfo] = useState({
    productName: { checked: true, size: 15 },
    businessName: { checked: true, size: 20 },
    productVariation: { checked: true, size: 17 },
    printPackingDate: { checked: true, size: 12 },
    productPrice: { checked: true, size: 17 },
    showPrice: "incTax",
  });

  const handleAddProduct = (productName: string) => {
    if (!productName.trim()) {
      message.warning("Please enter a product name");
      return;
    }

    const newProduct: LabelProduct = {
      key: Date.now().toString(),
      product: productName,
      numberOfLabels: 1,
      packingDate: dayjs().format("YYYY-MM-DD"),
      sellingPriceGroup: "Default",
    };

    setProducts([...products, newProduct]);
    setSearchText("");
    message.success("Product added successfully");
  };

  const handleRemoveProduct = (key: string) => {
    setProducts(products.filter((p) => p.key !== key));
    message.success("Product removed");
  };

  const handleUpdateProduct = (key: string, field: keyof LabelProduct, value: any) => {
    setProducts(
      products.map((p) => (p.key === key ? { ...p, [field]: value } : p))
    );
  };

  const handlePreview = () => {
    if (products.length === 0) {
      message.warning("Please add at least one product to generate labels");
      return;
    }
    // TODO: Implement preview functionality
    message.info("Preview functionality coming soon");
  };

  const columns: ColumnsType<LabelProduct> = [
    {
      title: "Products",
      dataIndex: "product",
      key: "product",
      width: 300,
      render: (text: string, record) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "No. of labels",
      dataIndex: "numberOfLabels",
      key: "numberOfLabels",
      width: 150,
      render: (value: number, record) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(val) => handleUpdateProduct(record.key, "numberOfLabels", val || 1)}
          style={{
            width: "100%",
            height: "32px",
            borderRadius: "6px",
          }}
        />
      ),
    },
    {
      title: "Packing Date",
      dataIndex: "packingDate",
      key: "packingDate",
      width: 200,
      render: (value: string, record) => (
        <DatePicker
          value={value ? dayjs(value) : null}
          onChange={(date) =>
            handleUpdateProduct(
              record.key,
              "packingDate",
              date ? date.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD")
            )
          }
          style={{
            width: "100%",
            height: "32px",
            borderRadius: "6px",
          }}
          format="YYYY-MM-DD"
        />
      ),
    },
    {
      title: "Selling Price Group",
      dataIndex: "sellingPriceGroup",
      key: "sellingPriceGroup",
      width: 200,
      render: (value: string, record) => (
        <Select
          value={value}
          onChange={(val) => handleUpdateProduct(record.key, "sellingPriceGroup", val)}
          style={{
            width: "100%",
            height: "32px",
            borderRadius: "6px",
          }}
        >
          <Select.Option value="Default">Default</Select.Option>
          <Select.Option value="Price Group 1">Price Group 1</Select.Option>
          <Select.Option value="Price Group 2">Price Group 2</Select.Option>
          <Select.Option value="Price Group 3">Price Group 3</Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleRemoveProduct(record.key)}
          style={{
            padding: 0,
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Space align="center">
            <Title
              level={2}
              style={{
                margin: 0,
                color: isDark ? "#fff" : "#1f1f1f",
                fontWeight: 600,
              }}
            >
              Print Labels
            </Title>
            <Tooltip title="Generate and print product labels with barcodes">
              <InfoCircleOutlined
                style={{
                  color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                  fontSize: "18px",
                  cursor: "help",
                }}
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>

      {/* Add products to generate Labels Section */}
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
            marginBottom: "16px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 600,
          }}
        >
          Add products to generate Labels
        </Title>

        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%" }}
        >
          <Search
            placeholder="Enter products name to print labels"
            allowClear
            enterButton={
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{
                      height: "40px",
                      borderRadius: "0 6px 6px 0",
                    }}
                  />
                }
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
              onSearch={(value) => setSearchText(value)}
            onSearch={handleAddProduct}
            style={{
              width: "100%",
              maxWidth: "600px",
            }}
          />

          <Table
            columns={columns}
            dataSource={products}
            pagination={false}
            locale={{
              emptyText: "No products added yet. Search and add products to generate labels.",
            }}
            style={{
              background: isDark ? "transparent" : "#fafafa",
            }}
          />
        </Space>
      </Card>

      {/* Information to show in Labels Section */}
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
          Information to show in Labels
        </Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Checkbox
                checked={labelInfo.productName.checked}
                onChange={(e) =>
                  setLabelInfo({
                    ...labelInfo,
                    productName: { ...labelInfo.productName, checked: e.target.checked },
                  })
                }
              >
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Product Name
                </Text>
              </Checkbox>
              {labelInfo.productName.checked && (
                <InputNumber
                  min={1}
                  max={50}
                  value={labelInfo.productName.size}
                  onChange={(val) =>
                    setLabelInfo({
                      ...labelInfo,
                      productName: { ...labelInfo.productName, size: val || 15 },
                    })
                  }
                  addonBefore="Size"
                  style={{
                    width: "100%",
                    marginLeft: "24px",
                  }}
                />
              )}
            </Space>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Checkbox
                checked={labelInfo.businessName.checked}
                onChange={(e) =>
                  setLabelInfo({
                    ...labelInfo,
                    businessName: { ...labelInfo.businessName, checked: e.target.checked },
                  })
                }
              >
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Business name
                </Text>
              </Checkbox>
              {labelInfo.businessName.checked && (
                <InputNumber
                  min={1}
                  max={50}
                  value={labelInfo.businessName.size}
                  onChange={(val) =>
                    setLabelInfo({
                      ...labelInfo,
                      businessName: { ...labelInfo.businessName, size: val || 20 },
                    })
                  }
                  addonBefore="Size"
                  style={{
                    width: "100%",
                    marginLeft: "24px",
                  }}
                />
              )}
            </Space>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Checkbox
                checked={labelInfo.productVariation.checked}
                onChange={(e) =>
                  setLabelInfo({
                    ...labelInfo,
                    productVariation: { ...labelInfo.productVariation, checked: e.target.checked },
                  })
                }
              >
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Product Variation{" "}
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    (recommended)
                  </Text>
                </Text>
              </Checkbox>
              {labelInfo.productVariation.checked && (
                <InputNumber
                  min={1}
                  max={50}
                  value={labelInfo.productVariation.size}
                  onChange={(val) =>
                    setLabelInfo({
                      ...labelInfo,
                      productVariation: { ...labelInfo.productVariation, size: val || 17 },
                    })
                  }
                  addonBefore="Size"
                  style={{
                    width: "100%",
                    marginLeft: "24px",
                  }}
                />
              )}
            </Space>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Checkbox
                checked={labelInfo.printPackingDate.checked}
                onChange={(e) =>
                  setLabelInfo({
                    ...labelInfo,
                    printPackingDate: { ...labelInfo.printPackingDate, checked: e.target.checked },
                  })
                }
              >
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Print packing date
                </Text>
              </Checkbox>
              {labelInfo.printPackingDate.checked && (
                <InputNumber
                  min={1}
                  max={50}
                  value={labelInfo.printPackingDate.size}
                  onChange={(val) =>
                    setLabelInfo({
                      ...labelInfo,
                      printPackingDate: { ...labelInfo.printPackingDate, size: val || 12 },
                    })
                  }
                  addonBefore="Size"
                  style={{
                    width: "100%",
                    marginLeft: "24px",
                  }}
                />
              )}
            </Space>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Checkbox
                checked={labelInfo.productPrice.checked}
                onChange={(e) =>
                  setLabelInfo({
                    ...labelInfo,
                    productPrice: { ...labelInfo.productPrice, checked: e.target.checked },
                  })
                }
              >
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Product Price
                </Text>
              </Checkbox>
              {labelInfo.productPrice.checked && (
                <div style={{ marginLeft: "24px" }}>
                  <Row gutter={8}>
                    <Col span={12}>
                      <InputNumber
                        min={1}
                        max={50}
                        value={labelInfo.productPrice.size}
                        onChange={(val) =>
                          setLabelInfo({
                            ...labelInfo,
                            productPrice: { ...labelInfo.productPrice, size: val || 17 },
                          })
                        }
                        addonBefore="Size"
                        style={{
                          width: "100%",
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <Space>
                        <Text
                          style={{
                            fontSize: "13px",
                            color: isDark ? "rgba(255,255,255,0.65)" : "#595959",
                          }}
                        >
                          Show Price:
                        </Text>
                        <Select
                          value={labelInfo.showPrice}
                          onChange={(val) =>
                            setLabelInfo({
                              ...labelInfo,
                              showPrice: val,
                            })
                          }
                          style={{
                            minWidth: "120px",
                          }}
                          suffixIcon={
                            <Tooltip title="Select how to display price on labels">
                              <InfoCircleOutlined
                                style={{
                                  color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                                }}
                              />
                            </Tooltip>
                          }
                        >
                          <Select.Option value="incTax">Inc. tax</Select.Option>
                          <Select.Option value="excTax">Exc. tax</Select.Option>
                        </Select>
                      </Space>
                    </Col>
                  </Row>
                </div>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Barcode setting Section */}
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
            marginBottom: "16px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 600,
          }}
        >
          Barcode setting:
        </Title>

        <Select
          defaultValue="20_labels"
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "40px",
            borderRadius: "6px",
          }}
          suffixIcon={<SettingOutlined />}
        >
          <Select.Option value="20_labels">
            20 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 4" x 1", Labels per sheet: 20
          </Select.Option>
          <Select.Option value="30_labels">
            30 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 3" x 1", Labels per sheet: 30
          </Select.Option>
          <Select.Option value="40_labels">
            40 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 2.5" x 1", Labels per sheet: 40
          </Select.Option>
        </Select>
      </Card>

      {/* Preview Button */}
      <Row justify="end" style={{ marginTop: "32px", marginBottom: "24px" }}>
        <Col>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="large"
            onClick={handlePreview}
            loading={loading}
            style={{
              height: "48px",
              borderRadius: "6px",
              fontWeight: 500,
              paddingLeft: "32px",
              paddingRight: "32px",
              fontSize: "16px",
            }}
          >
            Preview
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PrintLabels;

