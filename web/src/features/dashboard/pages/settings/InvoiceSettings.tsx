import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Input,
  Typography,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Modal,
  Form,
  Select,
  Checkbox,
  message,
  Card,
  Row,
  Col,
  Popconfirm,
  Divider,
  Upload,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Editor } from '@tinymce/tinymce-react';
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;

export interface InvoiceSchemeRecord {
  key: string;
  name: string;
  isDefault: boolean;
  prefix: string;
  numberingType: string;
  startFrom: number;
  invoiceCount: number;
  numberOfDigits: number;
}

const MOCK_SCHEMES: InvoiceSchemeRecord[] = [
  {
    key: "1",
    name: "C2Z Digital Solutions",
    isDefault: true,
    prefix: "",
    numberingType: "Sequential",
    startFrom: 0,
    invoiceCount: 9,
    numberOfDigits: 4,
  },
];

export interface InvoiceLayoutRecord {
  key: string;
  name: string;
  isDefault: boolean;
  usedInLocations?: string[];
  // Layout Details
  design?: string;
  showLetterHead?: boolean;
  invoiceLogo?: string;
  showInvoiceLogo?: boolean;
  headerText?: string;
  subHeadingLines?: string[];
  // Invoice Details
  invoiceHeading?: string;
  quotationHeading?: string;
  dateLabel?: string;
  dueDateLabel?: string;
  headingSuffixNotPaid?: string;
  headingSuffixPaid?: string;
  salesOrderHeading?: string;
  invoiceNoLabel?: string;
  showDueDate?: boolean;
  proformaInvoiceHeading?: string;
  quotationNoLabel?: string;
  dateTimeFormat?: string;
  // Sales Person & Commission Agent
  salesPersonLabel?: string;
  commissionAgentLabel?: string;
  showBusinessName?: boolean;
  showLocationName?: boolean;
  showSalesPerson?: boolean;
  showCommissionAgent?: boolean;
  // Customer Details
  showCustomerInformation?: boolean;
  customerLabel?: string;
  showClientId?: boolean;
  clientIdLabel?: string;
  clientTaxNumberLabel?: string;
  showRewardPoint?: boolean;
  url?: string;
  customField2?: string;
  customField3?: string;
  customField4?: string;
  // Location Address Fields
  landmark?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  customField1?: string;
  // Communication Details
  mobileNumber?: string;
  alternateNumber?: string;
  email?: string;
  // Tax Details
  tax1Details?: string;
  tax2Details?: string;
  // Product Labels
  productLabel?: string;
  quantityLabel?: string;
  unitPriceLabel?: string;
  categoryOrHSNCodeLabel?: string;
  totalQuantityLabel?: string;
  itemDiscountLabel?: string;
  discountedUnitPriceLabel?: string;
  // Product Display Options
  showBrand?: boolean;
  showSKU?: boolean;
  showCategoryCodeOrHSN?: boolean;
  showSaleDescription?: boolean;
  showProductIMEIOrSerialNumber?: boolean;
  showProductDescription?: boolean;
  showProductImage?: boolean;
  showWarrantyName?: boolean;
  showWarrantyExpiryDate?: boolean;
  showWarrantyDescription?: boolean;
  showBaseUnitDetails?: boolean;
  // Invoice Totals and Payment
  subtotalLabel?: string;
  discountLabel?: string;
  taxLabel?: string;
  totalLabel?: string;
  totalItemsLabel?: string;
  roundOffLabel?: string;
  totalDueLabelCurrentSale?: string;
  amountPaidLabel?: string;
  showPaymentInformation?: boolean;
  showBarcode?: boolean;
  totalDueLabelAllSales?: string;
  showTotalBalanceDueAllSales?: boolean;
  changeReturnLabel?: string;
  showTotalInWords?: boolean;
  wordFormat?: string;
  taxSummaryLabel?: string;
  footerText?: string;
  // QR Code Settings
  showQRCode?: boolean;
  showQRCodeLabels?: boolean;
  showZATCAQRCode?: boolean;
  qrCodeBusinessName?: boolean;
  qrCodeBusinessLocation?: boolean;
  qrCodeBusinessTax1?: boolean;
  qrCodeBusinessTax2?: boolean;
  qrCodeInvoiceNo?: boolean;
  qrCodeInvoiceDatetime?: boolean;
  qrCodeSubtotal?: boolean;
  qrCodeTotalWithTax?: boolean;
  qrCodeTotalTax?: boolean;
  qrCodeCustomerName?: boolean;
  qrCodeInvoiceURL?: boolean;
  // Restaurant Module Settings
  showServiceStaff?: boolean;
  serviceStaffLabel?: string;
  // Repair Module Settings
  showRepairStatus?: boolean;
  repairStatusLabel?: string;
  showRepairWarranty?: boolean;
  repairWarrantyLabel?: string;
  showRepairBrand?: boolean;
  repairBrandLabel?: string;
  showDevice?: boolean;
  deviceLabel?: string;
  showModel?: boolean;
  modelNumberLabel?: string;
  showSerialNumber?: boolean;
  serialNumberLabel?: string;
  showDefects?: boolean;
  defectLabel?: string;
  showRepairChecklist?: boolean;
  repairChecklistLabel?: string;
  // Credit Note / Sell Return Details
  creditNoteHeading?: string;
  referenceNumberLabel?: string;
  totalAmountLabel?: string;
}

const MOCK_LAYOUTS: InvoiceLayoutRecord[] = [
  {
    key: "1",
    name: "Davao Invoice Layout",
    isDefault: true,
    design: "Custom (New Custom)",
    showLetterHead: true,
    invoiceLogo: "/logo.png",
    showInvoiceLogo: true,
    headerText: "<p>Company Header Text</p>",
    subHeadingLines: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
    invoiceHeading: "INVOICE",
    quotationHeading: "QUOTATION",
    dateLabel: "Date",
    dueDateLabel: "Due Date",
    headingSuffixNotPaid: "(Not Paid)",
    headingSuffixPaid: "(Paid)",
    salesOrderHeading: "SALES ORDER",
    invoiceNoLabel: "Invoice No.",
    showDueDate: true,
    proformaInvoiceHeading: "PROFORMA INVOICE",
    quotationNoLabel: "Quotation No.",
    dateTimeFormat: "DD-MM-YYYY",
    // Sales Person & Commission Agent
    salesPersonLabel: "Sales Person",
    commissionAgentLabel: "Commission Agent",
    showBusinessName: true,
    showLocationName: true,
    showSalesPerson: true,
    showCommissionAgent: false,
    // Customer Details
    showCustomerInformation: true,
    customerLabel: "Customer",
    showClientId: true,
    clientIdLabel: "Client ID",
    clientTaxNumberLabel: "Client tax number",
    showRewardPoint: false,
    url: "",
    customField2: "",
    customField3: "",
    customField4: "",
    // Location Address Fields
    landmark: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    customField1: "",
    // Communication Details
    mobileNumber: "",
    alternateNumber: "",
    email: "",
    // Tax Details
    tax1Details: "",
    tax2Details: "",
    // Product Labels
    productLabel: "Product",
    quantityLabel: "Quantity",
    unitPriceLabel: "Unit Price",
    categoryOrHSNCodeLabel: "HSN",
    totalQuantityLabel: "Total Quantity",
    itemDiscountLabel: "Discount",
    discountedUnitPriceLabel: "Price after discount",
    // Product Display Options
    showBrand: true,
    showSKU: true,
    showCategoryCodeOrHSN: true,
    showSaleDescription: true,
    showProductIMEIOrSerialNumber: true,
    showProductDescription: true,
    showProductImage: true,
    showWarrantyName: false,
    showWarrantyExpiryDate: false,
    showWarrantyDescription: false,
    showBaseUnitDetails: false,
    // Invoice Totals and Payment
    subtotalLabel: "Subtotal",
    discountLabel: "Discount",
    taxLabel: "Tax",
    totalLabel: "Total",
    totalItemsLabel: "Total items label",
    roundOffLabel: "Round Off",
    totalDueLabelCurrentSale: "Due",
    amountPaidLabel: "Total paid",
    showPaymentInformation: true,
    showBarcode: true,
    totalDueLabelAllSales: "Total Due Label",
    showTotalBalanceDueAllSales: true,
    changeReturnLabel: "Change Return",
    showTotalInWords: true,
    wordFormat: "International",
    taxSummaryLabel: "Tax summary label",
    footerText: "<p>Company Footer Text</p>",
    // QR Code Settings
    showQRCode: false,
    showQRCodeLabels: true,
    showZATCAQRCode: false,
    qrCodeBusinessName: true,
    qrCodeBusinessLocation: true,
    qrCodeBusinessTax1: true,
    qrCodeBusinessTax2: false,
    qrCodeInvoiceNo: true,
    qrCodeInvoiceDatetime: true,
    qrCodeSubtotal: true,
    qrCodeTotalWithTax: true,
    qrCodeTotalTax: true,
    qrCodeCustomerName: true,
    qrCodeInvoiceURL: false,
    // Restaurant Module Settings
    showServiceStaff: false,
    serviceStaffLabel: "Service staff",
    // Repair Module Settings
    showRepairStatus: false,
    repairStatusLabel: "Repair Status",
    showRepairWarranty: false,
    repairWarrantyLabel: "Repair Warranty",
    showRepairBrand: false,
    repairBrandLabel: "Brand",
    showDevice: false,
    deviceLabel: "Device",
    showModel: false,
    modelNumberLabel: "Model No.",
    showSerialNumber: false,
    serialNumberLabel: "Serial No.",
    showDefects: false,
    defectLabel: "Defects",
    showRepairChecklist: false,
    repairChecklistLabel: "Repair Checklist",
    // Credit Note / Sell Return Details
    creditNoteHeading: "Credit Note",
    referenceNumberLabel: "Reference No",
    totalAmountLabel: "Credit Amount",
  },
  {
    key: "2",
    name: "C2Z Repair",
    isDefault: false,
    usedInLocations: ["C2Z Digital Solutions"],
    design: "Default",
    showLetterHead: false,
    invoiceLogo: "",
    showInvoiceLogo: false,
    headerText: "",
    subHeadingLines: ["", "", "", "", ""],
    invoiceHeading: "INVOICE",
    quotationHeading: "QUOTATION",
    dateLabel: "Date",
    dueDateLabel: "Due Date",
    headingSuffixNotPaid: "",
    headingSuffixPaid: "",
    salesOrderHeading: "SALES ORDER",
    invoiceNoLabel: "Invoice No.",
    showDueDate: true,
    proformaInvoiceHeading: "PROFORMA INVOICE",
    quotationNoLabel: "Quotation No.",
    dateTimeFormat: "MM-DD-YYYY",
    // Sales Person & Commission Agent
    salesPersonLabel: "Sales Person",
    commissionAgentLabel: "Commission Agent",
    showBusinessName: false,
    showLocationName: false,
    showSalesPerson: false,
    showCommissionAgent: false,
    // Customer Details
    showCustomerInformation: false,
    customerLabel: "Customer",
    showClientId: false,
    clientIdLabel: "Client ID",
    clientTaxNumberLabel: "Client tax number",
    showRewardPoint: false,
    url: "",
    customField1: "",
    customField2: "",
    customField3: "",
    customField4: "",
    footerText: "",
    // QR Code Settings
    showQRCode: false,
    showQRCodeLabels: true,
    showZATCAQRCode: false,
    qrCodeBusinessName: false,
    qrCodeBusinessLocation: false,
    qrCodeBusinessTax1: false,
    qrCodeBusinessTax2: false,
    qrCodeInvoiceNo: false,
    qrCodeInvoiceDatetime: false,
    qrCodeSubtotal: false,
    qrCodeTotalWithTax: false,
    qrCodeTotalTax: false,
    qrCodeCustomerName: false,
    qrCodeInvoiceURL: false,
    // Restaurant Module Settings
    showServiceStaff: false,
    serviceStaffLabel: "Service staff",
    // Repair Module Settings
    showRepairStatus: false,
    repairStatusLabel: "Repair Status",
    showRepairWarranty: false,
    repairWarrantyLabel: "Repair Warranty",
    showRepairBrand: false,
    repairBrandLabel: "Brand",
    showDevice: false,
    deviceLabel: "Device",
    showModel: false,
    modelNumberLabel: "Model No.",
    showSerialNumber: false,
    serialNumberLabel: "Serial No.",
    showDefects: false,
    defectLabel: "Defects",
    showRepairChecklist: false,
    repairChecklistLabel: "Repair Checklist",
    // Credit Note / Sell Return Details
    creditNoteHeading: "Credit Note",
    referenceNumberLabel: "Reference No",
    totalAmountLabel: "Credit Amount",
  },
];

const ColHeader: React.FC<{ title: string; tooltip: string }> = ({ title, tooltip }) => (
  <span>
    {title}{" "}
    <Tooltip title={tooltip}>
      <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
    </Tooltip>
  </span>
);

const InvoiceSettings: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("schemes");
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [schemes, setSchemes] = useState<InvoiceSchemeRecord[]>(MOCK_SCHEMES);
  const [layouts, setLayouts] = useState<InvoiceLayoutRecord[]>(MOCK_LAYOUTS);
  const [addSchemeModalOpen, setAddSchemeModalOpen] = useState(false);
  const [addLayoutModalOpen, setAddLayoutModalOpen] = useState(false);
  const [editSchemeModalOpen, setEditSchemeModalOpen] = useState(false);
  const [editLayoutModalOpen, setEditLayoutModalOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<InvoiceSchemeRecord | null>(null);
  const [editingLayout, setEditingLayout] = useState<InvoiceLayoutRecord | null>(null);
  const [schemeForm] = Form.useForm();
  const [layoutForm] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const uploadProps = {
    name: 'file',
    multiple: false,
    fileList,
    beforeUpload: (file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG/GIF files!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return false;
      }
      setFileList([file]);
      layoutForm.setFieldValue('invoiceLogo', file.name);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setFileList([]);
      layoutForm.setFieldValue('invoiceLogo', '');
    }
  };

  const filteredSchemes = useMemo(() => {
    if (!searchText.trim()) return schemes;
    const q = searchText.toLowerCase();
    return schemes.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.prefix && s.prefix.toLowerCase().includes(q)) ||
        s.numberingType.toLowerCase().includes(q)
    );
  }, [schemes, searchText]);

  const handleAddScheme = () => {
    schemeForm.resetFields();
    setAddSchemeModalOpen(true);
  };

  const handleAddSchemeSubmit = () => {
    schemeForm.validateFields().then((values) => {
      const newRecord: InvoiceSchemeRecord = {
        key: String(Date.now()),
        name: values.name || "",
        isDefault: values.isDefault ?? false,
        prefix: values.prefix || "",
        numberingType: values.numberingType || "Sequential",
        startFrom: Number(values.startFrom) ?? 0,
        invoiceCount: 0,
        numberOfDigits: Number(values.numberOfDigits) ?? 4,
      };
      setSchemes((prev) => [...prev, newRecord]);
      message.success("Invoice scheme added successfully");
      setAddSchemeModalOpen(false);
      schemeForm.resetFields();
    });
  };

  const openEditScheme = (record: InvoiceSchemeRecord) => {
    setEditingScheme(record);
    schemeForm.setFieldsValue({
      name: record.name,
      prefix: record.prefix,
      numberingType: record.numberingType,
      startFrom: record.startFrom,
      numberOfDigits: record.numberOfDigits,
      isDefault: record.isDefault,
    });
    setEditSchemeModalOpen(true);
  };

  const handleEditSchemeSubmit = () => {
    if (!editingScheme) return;
    schemeForm.validateFields().then((values) => {
      setSchemes((prev) =>
        prev.map((s) =>
          s.key === editingScheme.key
            ? {
              ...s,
              name: values.name || "",
              prefix: values.prefix || "",
              numberingType: values.numberingType || "Sequential",
              startFrom: Number(values.startFrom) ?? 0,
              numberOfDigits: Number(values.numberOfDigits) ?? 4,
              isDefault: values.isDefault ?? false,
            }
            : s
        )
      );
      message.success("Invoice scheme updated successfully");
      setEditSchemeModalOpen(false);
      setEditingScheme(null);
      schemeForm.resetFields();
    });
  };

  const handleDeleteScheme = (record: InvoiceSchemeRecord) => {
    setSchemes((prev) => prev.filter((s) => s.key !== record.key));
    message.success("Invoice scheme deleted");
  };

  const handleSetDefault = (record: InvoiceSchemeRecord) => {
    setSchemes((prev) =>
      prev.map((s) => ({ ...s, isDefault: s.key === record.key }))
    );
    message.success(`Default set to ${record.name}`);
  };

  const openEditLayout = (record: InvoiceLayoutRecord) => {
    setEditingLayout(record);
    // Set file list if there's an existing logo
    if (record.invoiceLogo) {
      setFileList([{
        uid: '-1',
        name: record.invoiceLogo,
        status: 'done',
        url: record.invoiceLogo,
      }]);
    } else {
      setFileList([]);
    }

    layoutForm.setFieldsValue({
      name: record.name,
      isDefault: record.isDefault,
      usedInLocations: record.usedInLocations?.join(", "),
      // Layout Details
      design: record.design || "Default",
      showLetterHead: record.showLetterHead || false,
      invoiceLogo: record.invoiceLogo || "",
      showInvoiceLogo: record.showInvoiceLogo || false,
      headerText: record.headerText || "",
      subHeadingLines: record.subHeadingLines || ["", "", "", "", ""],
      // Invoice Details
      invoiceHeading: record.invoiceHeading || "INVOICE",
      quotationHeading: record.quotationHeading || "QUOTATION",
      dateLabel: record.dateLabel || "Date",
      dueDateLabel: record.dueDateLabel || "Due Date",
      headingSuffixNotPaid: record.headingSuffixNotPaid || "",
      headingSuffixPaid: record.headingSuffixPaid || "",
      salesOrderHeading: record.salesOrderHeading || "SALES ORDER",
      invoiceNoLabel: record.invoiceNoLabel || "Invoice No.",
      showDueDate: record.showDueDate !== undefined ? record.showDueDate : true,
      proformaInvoiceHeading: record.proformaInvoiceHeading || "PROFORMA INVOICE",
      quotationNoLabel: record.quotationNoLabel || "Quotation No.",
      dateTimeFormat: record.dateTimeFormat || "DD-MM-YYYY",
      // Sales Person & Commission Agent
      salesPersonLabel: record.salesPersonLabel || "Sales Person",
      commissionAgentLabel: record.commissionAgentLabel || "Commission Agent",
      showBusinessName: record.showBusinessName !== undefined ? record.showBusinessName : false,
      showLocationName: record.showLocationName !== undefined ? record.showLocationName : false,
      showSalesPerson: record.showSalesPerson !== undefined ? record.showSalesPerson : false,
      showCommissionAgent: record.showCommissionAgent !== undefined ? record.showCommissionAgent : false,
      // Customer Details
      showCustomerInformation: record.showCustomerInformation !== undefined ? record.showCustomerInformation : false,
      customerLabel: record.customerLabel || "Customer",
      showClientId: record.showClientId !== undefined ? record.showClientId : false,
      clientIdLabel: record.clientIdLabel || "Client ID",
      clientTaxNumberLabel: record.clientTaxNumberLabel || "Client tax number",
      showRewardPoint: record.showRewardPoint !== undefined ? record.showRewardPoint : false,
      url: record.url || "",
      customField2: record.customField2 || "",
      customField3: record.customField3 || "",
      customField4: record.customField4 || "",
      // Location Address Fields
      landmark: record.landmark || "",
      city: record.city || "",
      state: record.state || "",
      country: record.country || "",
      zipCode: record.zipCode || "",
      customField1: record.customField1 || "",
      // Communication Details
      mobileNumber: record.mobileNumber || "",
      alternateNumber: record.alternateNumber || "",
      email: record.email || "",
      // Tax Details
      tax1Details: record.tax1Details || "",
      tax2Details: record.tax2Details || "",
      // Product Labels
      productLabel: record.productLabel || "Product",
      quantityLabel: record.quantityLabel || "Quantity",
      unitPriceLabel: record.unitPriceLabel || "Unit Price",
      categoryOrHSNCodeLabel: record.categoryOrHSNCodeLabel || "HSN",
      totalQuantityLabel: record.totalQuantityLabel || "Total Quantity",
      itemDiscountLabel: record.itemDiscountLabel || "Discount",
      discountedUnitPriceLabel: record.discountedUnitPriceLabel || "Price after discount",
      // Product Display Options
      showBrand: record.showBrand !== undefined ? record.showBrand : false,
      showSKU: record.showSKU !== undefined ? record.showSKU : false,
      showCategoryCodeOrHSN: record.showCategoryCodeOrHSN !== undefined ? record.showCategoryCodeOrHSN : false,
      showSaleDescription: record.showSaleDescription !== undefined ? record.showSaleDescription : false,
      showProductIMEIOrSerialNumber: record.showProductIMEIOrSerialNumber !== undefined ? record.showProductIMEIOrSerialNumber : false,
      showProductDescription: record.showProductDescription !== undefined ? record.showProductDescription : false,
      showProductImage: record.showProductImage !== undefined ? record.showProductImage : false,
      showWarrantyName: record.showWarrantyName !== undefined ? record.showWarrantyName : false,
      showWarrantyExpiryDate: record.showWarrantyExpiryDate !== undefined ? record.showWarrantyExpiryDate : false,
      showWarrantyDescription: record.showWarrantyDescription !== undefined ? record.showWarrantyDescription : false,
      showBaseUnitDetails: record.showBaseUnitDetails !== undefined ? record.showBaseUnitDetails : false,
      // Invoice Totals and Payment
      subtotalLabel: record.subtotalLabel || "Subtotal",
      discountLabel: record.discountLabel || "Discount",
      taxLabel: record.taxLabel || "Tax",
      totalLabel: record.totalLabel || "Total",
      totalItemsLabel: record.totalItemsLabel || "Total items label",
      roundOffLabel: record.roundOffLabel || "Round Off",
      totalDueLabelCurrentSale: record.totalDueLabelCurrentSale || "Due",
      amountPaidLabel: record.amountPaidLabel || "Total paid",
      showPaymentInformation: record.showPaymentInformation !== undefined ? record.showPaymentInformation : false,
      showBarcode: record.showBarcode !== undefined ? record.showBarcode : false,
      totalDueLabelAllSales: record.totalDueLabelAllSales || "Total Due Label",
      showTotalBalanceDueAllSales: record.showTotalBalanceDueAllSales !== undefined ? record.showTotalBalanceDueAllSales : false,
      changeReturnLabel: record.changeReturnLabel || "Change Return",
      showTotalInWords: record.showTotalInWords !== undefined ? record.showTotalInWords : false,
      wordFormat: record.wordFormat || "International",
      taxSummaryLabel: record.taxSummaryLabel || "Tax summary label",
      footerText: record.footerText || "",
      // QR Code Settings
      showQRCode: record.showQRCode !== undefined ? record.showQRCode : false,
      showQRCodeLabels: record.showQRCodeLabels !== undefined ? record.showQRCodeLabels : true,
      showZATCAQRCode: record.showZATCAQRCode !== undefined ? record.showZATCAQRCode : false,
      qrCodeBusinessName: record.qrCodeBusinessName !== undefined ? record.qrCodeBusinessName : false,
      qrCodeBusinessLocation: record.qrCodeBusinessLocation !== undefined ? record.qrCodeBusinessLocation : false,
      qrCodeBusinessTax1: record.qrCodeBusinessTax1 !== undefined ? record.qrCodeBusinessTax1 : false,
      qrCodeBusinessTax2: record.qrCodeBusinessTax2 !== undefined ? record.qrCodeBusinessTax2 : false,
      qrCodeInvoiceNo: record.qrCodeInvoiceNo !== undefined ? record.qrCodeInvoiceNo : false,
      qrCodeInvoiceDatetime: record.qrCodeInvoiceDatetime !== undefined ? record.qrCodeInvoiceDatetime : false,
      qrCodeSubtotal: record.qrCodeSubtotal !== undefined ? record.qrCodeSubtotal : false,
      qrCodeTotalWithTax: record.qrCodeTotalWithTax !== undefined ? record.qrCodeTotalWithTax : false,
      qrCodeTotalTax: record.qrCodeTotalTax !== undefined ? record.qrCodeTotalTax : false,
      qrCodeCustomerName: record.qrCodeCustomerName !== undefined ? record.qrCodeCustomerName : false,
      qrCodeInvoiceURL: record.qrCodeInvoiceURL !== undefined ? record.qrCodeInvoiceURL : false,
      // Restaurant Module Settings
      showServiceStaff: record.showServiceStaff !== undefined ? record.showServiceStaff : false,
      serviceStaffLabel: record.serviceStaffLabel || "Service staff",
      // Repair Module Settings
      showRepairStatus: record.showRepairStatus !== undefined ? record.showRepairStatus : false,
      repairStatusLabel: record.repairStatusLabel || "Repair Status",
      showRepairWarranty: record.showRepairWarranty !== undefined ? record.showRepairWarranty : false,
      repairWarrantyLabel: record.repairWarrantyLabel || "Repair Warranty",
      showRepairBrand: record.showRepairBrand !== undefined ? record.showRepairBrand : false,
      repairBrandLabel: record.repairBrandLabel || "Brand",
      showDevice: record.showDevice !== undefined ? record.showDevice : false,
      deviceLabel: record.deviceLabel || "Device",
      showModel: record.showModel !== undefined ? record.showModel : false,
      modelNumberLabel: record.modelNumberLabel || "Model No.",
      showSerialNumber: record.showSerialNumber !== undefined ? record.showSerialNumber : false,
      serialNumberLabel: record.serialNumberLabel || "Serial No.",
      showDefects: record.showDefects !== undefined ? record.showDefects : false,
      defectLabel: record.defectLabel || "Defects",
      showRepairChecklist: record.showRepairChecklist !== undefined ? record.showRepairChecklist : false,
      repairChecklistLabel: record.repairChecklistLabel || "Repair Checklist",
      // Credit Note / Sell Return Details
      creditNoteHeading: record.creditNoteHeading || "Credit Note",
      referenceNumberLabel: record.referenceNumberLabel || "Reference No",
      totalAmountLabel: record.totalAmountLabel || "Credit Amount",
    });
    setEditLayoutModalOpen(true);
  };

  const handleEditLayoutSubmit = () => {
    if (!editingLayout) return;
    layoutForm.validateFields().then((values) => {
      const usedIn = values.usedInLocations;
      const usedInLocations = typeof usedIn === "string"
        ? (usedIn.trim() ? usedIn.split(",").map((s: string) => s.trim()).filter(Boolean) : undefined)
        : Array.isArray(usedIn) ? usedIn : undefined;

      setLayouts((prev) =>
        prev.map((l) =>
          l.key === editingLayout.key
            ? {
              ...l,
              name: values.name || "",
              isDefault: values.isDefault ?? false,
              usedInLocations,
              // Layout Details
              design: values.design || "Default",
              showLetterHead: values.showLetterHead || false,
              invoiceLogo: values.invoiceLogo || "",
              showInvoiceLogo: values.showInvoiceLogo || false,
              headerText: values.headerText || "",
              subHeadingLines: values.subHeadingLines || ["", "", "", "", ""],
              // Invoice Details
              invoiceHeading: values.invoiceHeading || "INVOICE",
              quotationHeading: values.quotationHeading || "QUOTATION",
              dateLabel: values.dateLabel || "Date",
              dueDateLabel: values.dueDateLabel || "Due Date",
              headingSuffixNotPaid: values.headingSuffixNotPaid || "",
              headingSuffixPaid: values.headingSuffixPaid || "",
              salesOrderHeading: values.salesOrderHeading || "SALES ORDER",
              invoiceNoLabel: values.invoiceNoLabel || "Invoice No.",
              showDueDate: values.showDueDate !== undefined ? values.showDueDate : true,
              proformaInvoiceHeading: values.proformaInvoiceHeading || "PROFORMA INVOICE",
              quotationNoLabel: values.quotationNoLabel || "Quotation No.",
              dateTimeFormat: values.dateTimeFormat || "DD-MM-YYYY",
              // Sales Person & Commission Agent
              salesPersonLabel: values.salesPersonLabel || "Sales Person",
              commissionAgentLabel: values.commissionAgentLabel || "Commission Agent",
              showBusinessName: values.showBusinessName || false,
              showLocationName: values.showLocationName || false,
              showSalesPerson: values.showSalesPerson || false,
              showCommissionAgent: values.showCommissionAgent || false,
              // Customer Details
              showCustomerInformation: values.showCustomerInformation || false,
              customerLabel: values.customerLabel || "Customer",
              showClientId: values.showClientId || false,
              clientIdLabel: values.clientIdLabel || "Client ID",
              clientTaxNumberLabel: values.clientTaxNumberLabel || "Client tax number",
              showRewardPoint: values.showRewardPoint || false,
              url: values.url || "",
              customField2: values.customField2 || "",
              customField3: values.customField3 || "",
              customField4: values.customField4 || "",
              // Location Address Fields
              landmark: values.landmark || "",
              city: values.city || "",
              state: values.state || "",
              country: values.country || "",
              zipCode: values.zipCode || "",
              customField1: values.customField1 || "",
              // Communication Details
              mobileNumber: values.mobileNumber || "",
              alternateNumber: values.alternateNumber || "",
              email: values.email || "",
              // Tax Details
              tax1Details: values.tax1Details || "",
              tax2Details: values.tax2Details || "",
              // Product Labels
              productLabel: values.productLabel || "Product",
              quantityLabel: values.quantityLabel || "Quantity",
              unitPriceLabel: values.unitPriceLabel || "Unit Price",
              categoryOrHSNCodeLabel: values.categoryOrHSNCodeLabel || "HSN",
              totalQuantityLabel: values.totalQuantityLabel || "Total Quantity",
              itemDiscountLabel: values.itemDiscountLabel || "Discount",
              discountedUnitPriceLabel: values.discountedUnitPriceLabel || "Price after discount",
              // Product Display Options
              showBrand: values.showBrand || false,
              showSKU: values.showSKU || false,
              showCategoryCodeOrHSN: values.showCategoryCodeOrHSN || false,
              showSaleDescription: values.showSaleDescription || false,
              showProductIMEIOrSerialNumber: values.showProductIMEIOrSerialNumber || false,
              showProductDescription: values.showProductDescription || false,
              showProductImage: values.showProductImage || false,
              showWarrantyName: values.showWarrantyName || false,
              showWarrantyExpiryDate: values.showWarrantyExpiryDate || false,
              showWarrantyDescription: values.showWarrantyDescription || false,
              showBaseUnitDetails: values.showBaseUnitDetails || false,
              // Invoice Totals and Payment
              subtotalLabel: values.subtotalLabel || "Subtotal",
              discountLabel: values.discountLabel || "Discount",
              taxLabel: values.taxLabel || "Tax",
              totalLabel: values.totalLabel || "Total",
              totalItemsLabel: values.totalItemsLabel || "Total items label",
              roundOffLabel: values.roundOffLabel || "Round Off",
              totalDueLabelCurrentSale: values.totalDueLabelCurrentSale || "Due",
              amountPaidLabel: values.amountPaidLabel || "Total paid",
              showPaymentInformation: values.showPaymentInformation || false,
              showBarcode: values.showBarcode || false,
              totalDueLabelAllSales: values.totalDueLabelAllSales || "Total Due Label",
              showTotalBalanceDueAllSales: values.showTotalBalanceDueAllSales || false,
              changeReturnLabel: values.changeReturnLabel || "Change Return",
              showTotalInWords: values.showTotalInWords || false,
              wordFormat: values.wordFormat || "International",
              taxSummaryLabel: values.taxSummaryLabel || "Tax summary label",
              footerText: values.footerText || "",
              // QR Code Settings
              showQRCode: values.showQRCode || false,
              showQRCodeLabels: values.showQRCodeLabels || false,
              showZATCAQRCode: values.showZATCAQRCode || false,
              qrCodeBusinessName: values.qrCodeBusinessName || false,
              qrCodeBusinessLocation: values.qrCodeBusinessLocation || false,
              qrCodeBusinessTax1: values.qrCodeBusinessTax1 || false,
              qrCodeBusinessTax2: values.qrCodeBusinessTax2 || false,
              qrCodeInvoiceNo: values.qrCodeInvoiceNo || false,
              qrCodeInvoiceDatetime: values.qrCodeInvoiceDatetime || false,
              qrCodeSubtotal: values.qrCodeSubtotal || false,
              qrCodeTotalWithTax: values.qrCodeTotalWithTax || false,
              qrCodeTotalTax: values.qrCodeTotalTax || false,
              qrCodeCustomerName: values.qrCodeCustomerName || false,
              qrCodeInvoiceURL: values.qrCodeInvoiceURL || false,
              // Restaurant Module Settings
              showServiceStaff: values.showServiceStaff || false,
              serviceStaffLabel: values.serviceStaffLabel || "Service staff",
              // Repair Module Settings
              showRepairStatus: values.showRepairStatus || false,
              repairStatusLabel: values.repairStatusLabel || "Repair Status",
              showRepairWarranty: values.showRepairWarranty || false,
              repairWarrantyLabel: values.repairWarrantyLabel || "Repair Warranty",
              showRepairBrand: values.showRepairBrand || false,
              repairBrandLabel: values.repairBrandLabel || "Brand",
              showDevice: values.showDevice || false,
              deviceLabel: values.deviceLabel || "Device",
              showModel: values.showModel || false,
              modelNumberLabel: values.modelNumberLabel || "Model No.",
              showSerialNumber: values.showSerialNumber || false,
              serialNumberLabel: values.serialNumberLabel || "Serial No.",
              showDefects: values.showDefects || false,
              defectLabel: values.defectLabel || "Defects",
              showRepairChecklist: values.showRepairChecklist || false,
              repairChecklistLabel: values.repairChecklistLabel || "Repair Checklist",
              // Credit Note / Sell Return Details
              creditNoteHeading: values.creditNoteHeading || "Credit Note",
              referenceNumberLabel: values.referenceNumberLabel || "Reference No",
              totalAmountLabel: values.totalAmountLabel || "Credit Amount",
            }
            : l
        )
      );
      message.success("Invoice layout updated successfully");
      setEditLayoutModalOpen(false);
      setEditingLayout(null);
      layoutForm.resetFields();
    });
  };

  const handleDeleteLayout = (record: InvoiceLayoutRecord) => {
    setLayouts((prev) => prev.filter((l) => l.key !== record.key));
    message.success("Invoice layout deleted");
  };

  const handleAddLayout = () => {
    layoutForm.resetFields();
    setFileList([]); // Reset file list for new layout
    // Set default values for new layout
    layoutForm.setFieldsValue({
      design: "Default",
      showLetterHead: false,
      showInvoiceLogo: false,
      subHeadingLines: ["", "", "", "", ""],
      invoiceHeading: "INVOICE",
      quotationHeading: "QUOTATION",
      dateLabel: "Date",
      dueDateLabel: "Due Date",
      salesOrderHeading: "SALES ORDER",
      invoiceNoLabel: "Invoice No.",
      showDueDate: true,
      proformaInvoiceHeading: "PROFORMA INVOICE",
      quotationNoLabel: "Quotation No.",
      dateTimeFormat: "DD-MM-YYYY",
      // Sales Person & Commission Agent
      salesPersonLabel: "Sales Person",
      commissionAgentLabel: "Commission Agent",
      showBusinessName: false,
      showLocationName: false,
      showSalesPerson: false,
      showCommissionAgent: false,
      // Customer Details
      showCustomerInformation: false,
      customerLabel: "Customer",
      showClientId: false,
      clientIdLabel: "Client ID",
      clientTaxNumberLabel: "Client tax number",
      showRewardPoint: false,
      url: "",
      customField2: "",
      customField3: "",
      customField4: "",
      // Location Address Fields
      landmark: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      customField1: "",
      // Communication Details
      mobileNumber: "",
      alternateNumber: "",
      email: "",
      // Tax Details
      tax1Details: "",
      tax2Details: "",
      // Product Labels
      productLabel: "Product",
      quantityLabel: "Quantity",
      unitPriceLabel: "Unit Price",
      categoryOrHSNCodeLabel: "HSN",
      totalQuantityLabel: "Total Quantity",
      itemDiscountLabel: "Discount",
      discountedUnitPriceLabel: "Price after discount",
      // Product Display Options
      showBrand: false,
      showSKU: false,
      showCategoryCodeOrHSN: false,
      showSaleDescription: false,
      showProductIMEIOrSerialNumber: false,
      showProductDescription: false,
      showProductImage: false,
      showWarrantyName: false,
      showWarrantyExpiryDate: false,
      showWarrantyDescription: false,
      showBaseUnitDetails: false,
      // Invoice Totals and Payment
      subtotalLabel: "Subtotal",
      discountLabel: "Discount",
      taxLabel: "Tax",
      totalLabel: "Total",
      totalItemsLabel: "Total items label",
      roundOffLabel: "Round Off",
      totalDueLabelCurrentSale: "Due",
      amountPaidLabel: "Total paid",
      showPaymentInformation: false,
      showBarcode: false,
      totalDueLabelAllSales: "Total Due Label",
      showTotalBalanceDueAllSales: false,
      changeReturnLabel: "Change Return",
      showTotalInWords: false,
      wordFormat: "International",
      taxSummaryLabel: "Tax summary label",
      footerText: "",
      // QR Code Settings
      showQRCode: false,
      showQRCodeLabels: true,
      showZATCAQRCode: false,
      qrCodeBusinessName: false,
      qrCodeBusinessLocation: false,
      qrCodeBusinessTax1: false,
      qrCodeBusinessTax2: false,
      qrCodeInvoiceNo: false,
      qrCodeInvoiceDatetime: false,
      qrCodeSubtotal: false,
      qrCodeTotalWithTax: false,
      qrCodeTotalTax: false,
      qrCodeCustomerName: false,
      qrCodeInvoiceURL: false,
      // Restaurant Module Settings
      showServiceStaff: false,
      serviceStaffLabel: "Service staff",
      // Repair Module Settings
      showRepairStatus: false,
      repairStatusLabel: "Repair Status",
      showRepairWarranty: false,
      repairWarrantyLabel: "Repair Warranty",
      showRepairBrand: false,
      repairBrandLabel: "Brand",
      showDevice: false,
      deviceLabel: "Device",
      showModel: false,
      modelNumberLabel: "Model No.",
      showSerialNumber: false,
      serialNumberLabel: "Serial No.",
      showDefects: false,
      defectLabel: "Defects",
      showRepairChecklist: false,
      repairChecklistLabel: "Repair Checklist",
      // Credit Note / Sell Return Details
      creditNoteHeading: "Credit Note",
      referenceNumberLabel: "Reference No",
      totalAmountLabel: "Credit Amount",
    });
    setAddLayoutModalOpen(true);
  };

  const handleAddLayoutSubmit = () => {
    layoutForm.validateFields().then((values) => {
      const usedIn = values.usedInLocations;
      const usedInLocations = typeof usedIn === "string" ? (usedIn.trim() ? usedIn.split(",").map((s: string) => s.trim()).filter(Boolean) : undefined) : Array.isArray(usedIn) ? usedIn : undefined;
      const newRecord: InvoiceLayoutRecord = {
        key: String(Date.now()),
        name: values.name || "",
        isDefault: values.isDefault ?? false,
        usedInLocations,
        // Layout Details
        design: values.design || "Default",
        showLetterHead: values.showLetterHead || false,
        invoiceLogo: values.invoiceLogo || "",
        showInvoiceLogo: values.showInvoiceLogo || false,
        headerText: values.headerText || "",
        subHeadingLines: values.subHeadingLines || ["", "", "", "", ""],
        // Invoice Details
        invoiceHeading: values.invoiceHeading || "INVOICE",
        quotationHeading: values.quotationHeading || "QUOTATION",
        dateLabel: values.dateLabel || "Date",
        dueDateLabel: values.dueDateLabel || "Due Date",
        headingSuffixNotPaid: values.headingSuffixNotPaid || "",
        headingSuffixPaid: values.headingSuffixPaid || "",
        salesOrderHeading: values.salesOrderHeading || "SALES ORDER",
        invoiceNoLabel: values.invoiceNoLabel || "Invoice No.",
        showDueDate: values.showDueDate !== undefined ? values.showDueDate : true,
        proformaInvoiceHeading: values.proformaInvoiceHeading || "PROFORMA INVOICE",
        quotationNoLabel: values.quotationNoLabel || "Quotation No.",
        dateTimeFormat: values.dateTimeFormat || "DD-MM-YYYY",
        // Sales Person & Commission Agent
        salesPersonLabel: values.salesPersonLabel || "Sales Person",
        commissionAgentLabel: values.commissionAgentLabel || "Commission Agent",
        showBusinessName: values.showBusinessName || false,
        showLocationName: values.showLocationName || false,
        showSalesPerson: values.showSalesPerson || false,
        showCommissionAgent: values.showCommissionAgent || false,
        // Customer Details
        showCustomerInformation: values.showCustomerInformation || false,
        customerLabel: values.customerLabel || "Customer",
        showClientId: values.showClientId || false,
        clientIdLabel: values.clientIdLabel || "Client ID",
        clientTaxNumberLabel: values.clientTaxNumberLabel || "Client tax number",
        showRewardPoint: values.showRewardPoint || false,
        url: values.url || "",
        customField2: values.customField2 || "",
        customField3: values.customField3 || "",
        customField4: values.customField4 || "",
        // Location Address Fields
        landmark: values.landmark || "",
        city: values.city || "",
        state: values.state || "",
        country: values.country || "",
        zipCode: values.zipCode || "",
        customField1: values.customField1 || "",
        // Communication Details
        mobileNumber: values.mobileNumber || "",
        alternateNumber: values.alternateNumber || "",
        email: values.email || "",
        // Tax Details
        tax1Details: values.tax1Details || "",
        tax2Details: values.tax2Details || "",
        // Product Labels
        productLabel: values.productLabel || "Product",
        quantityLabel: values.quantityLabel || "Quantity",
        unitPriceLabel: values.unitPriceLabel || "Unit Price",
        categoryOrHSNCodeLabel: values.categoryOrHSNCodeLabel || "HSN",
        totalQuantityLabel: values.totalQuantityLabel || "Total Quantity",
        itemDiscountLabel: values.itemDiscountLabel || "Discount",
        discountedUnitPriceLabel: values.discountedUnitPriceLabel || "Price after discount",
        // Product Display Options
        showBrand: values.showBrand || false,
        showSKU: values.showSKU || false,
        showCategoryCodeOrHSN: values.showCategoryCodeOrHSN || false,
        showSaleDescription: values.showSaleDescription || false,
        showProductIMEIOrSerialNumber: values.showProductIMEIOrSerialNumber || false,
        showProductDescription: values.showProductDescription || false,
        showProductImage: values.showProductImage || false,
        showWarrantyName: values.showWarrantyName || false,
        showWarrantyExpiryDate: values.showWarrantyExpiryDate || false,
        showWarrantyDescription: values.showWarrantyDescription || false,
        showBaseUnitDetails: values.showBaseUnitDetails || false,
        // Invoice Totals and Payment
        subtotalLabel: values.subtotalLabel || "Subtotal",
        discountLabel: values.discountLabel || "Discount",
        taxLabel: values.taxLabel || "Tax",
        totalLabel: values.totalLabel || "Total",
        totalItemsLabel: values.totalItemsLabel || "Total items label",
        roundOffLabel: values.roundOffLabel || "Round Off",
        totalDueLabelCurrentSale: values.totalDueLabelCurrentSale || "Due",
        amountPaidLabel: values.amountPaidLabel || "Total paid",
        showPaymentInformation: values.showPaymentInformation || false,
        showBarcode: values.showBarcode || false,
        totalDueLabelAllSales: values.totalDueLabelAllSales || "Total Due Label",
        showTotalBalanceDueAllSales: values.showTotalBalanceDueAllSales || false,
        changeReturnLabel: values.changeReturnLabel || "Change Return",
        showTotalInWords: values.showTotalInWords || false,
        wordFormat: values.wordFormat || "International",
        taxSummaryLabel: values.taxSummaryLabel || "Tax summary label",
        footerText: values.footerText || "",
        // QR Code Settings
        showQRCode: values.showQRCode || false,
        showQRCodeLabels: values.showQRCodeLabels || false,
        showZATCAQRCode: values.showZATCAQRCode || false,
        qrCodeBusinessName: values.qrCodeBusinessName || false,
        qrCodeBusinessLocation: values.qrCodeBusinessLocation || false,
        qrCodeBusinessTax1: values.qrCodeBusinessTax1 || false,
        qrCodeBusinessTax2: values.qrCodeBusinessTax2 || false,
        qrCodeInvoiceNo: values.qrCodeInvoiceNo || false,
        qrCodeInvoiceDatetime: values.qrCodeInvoiceDatetime || false,
        qrCodeSubtotal: values.qrCodeSubtotal || false,
        qrCodeTotalWithTax: values.qrCodeTotalWithTax || false,
        qrCodeTotalTax: values.qrCodeTotalTax || false,
        qrCodeCustomerName: values.qrCodeCustomerName || false,
        qrCodeInvoiceURL: values.qrCodeInvoiceURL || false,
        // Restaurant Module Settings
        showServiceStaff: values.showServiceStaff || false,
        serviceStaffLabel: values.serviceStaffLabel || "Service staff",
        // Repair Module Settings
        showRepairStatus: values.showRepairStatus || false,
        repairStatusLabel: values.repairStatusLabel || "Repair Status",
        showRepairWarranty: values.showRepairWarranty || false,
        repairWarrantyLabel: values.repairWarrantyLabel || "Repair Warranty",
        showRepairBrand: values.showRepairBrand || false,
        repairBrandLabel: values.repairBrandLabel || "Brand",
        showDevice: values.showDevice || false,
        deviceLabel: values.deviceLabel || "Device",
        showModel: values.showModel || false,
        modelNumberLabel: values.modelNumberLabel || "Model No.",
        showSerialNumber: values.showSerialNumber || false,
        serialNumberLabel: values.serialNumberLabel || "Serial No.",
        showDefects: values.showDefects || false,
        defectLabel: values.defectLabel || "Defects",
        showRepairChecklist: values.showRepairChecklist || false,
        repairChecklistLabel: values.repairChecklistLabel || "Repair Checklist",
        // Credit Note / Sell Return Details
        creditNoteHeading: values.creditNoteHeading || "Credit Note",
        referenceNumberLabel: values.referenceNumberLabel || "Reference No",
        totalAmountLabel: values.totalAmountLabel || "Credit Amount",
      };
      setLayouts((prev) => [...prev, newRecord]);
      message.success("Invoice layout added successfully");
      setAddLayoutModalOpen(false);
      layoutForm.resetFields();
      setFileList([]);
    });
  };

  const columns: ColumnsType<InvoiceSchemeRecord> = [
    {
      title: <ColHeader title="Name" tooltip="Invoice scheme name" />,
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 200,
      render: (name: string, record: InvoiceSchemeRecord) => (
        <Space>
          <span>{name}</span>
          {record.isDefault && <Tag color="green">Default</Tag>}
        </Space>
      ),
    },
    {
      title: <ColHeader title="Prefix" tooltip="Prefix for invoice numbers" />,
      dataIndex: "prefix",
      key: "prefix",
      sorter: (a, b) => (a.prefix || "").localeCompare(b.prefix || ""),
      width: 100,
    },
    {
      title: <ColHeader title="Numbering Type" tooltip="How invoice numbers are generated" />,
      dataIndex: "numberingType",
      key: "numberingType",
      sorter: (a, b) => a.numberingType.localeCompare(b.numberingType),
      width: 120,
    },
    {
      title: <ColHeader title="Start from" tooltip="Starting number for sequential numbering" />,
      dataIndex: "startFrom",
      key: "startFrom",
      sorter: (a, b) => a.startFrom - b.startFrom,
      width: 100,
    },
    {
      title: <ColHeader title="Invoice Count" tooltip="Current invoice count" />,
      dataIndex: "invoiceCount",
      key: "invoiceCount",
      sorter: (a, b) => a.invoiceCount - b.invoiceCount,
      width: 120,
    },
    {
      title: <ColHeader title="Number of digits" tooltip="Number of digits in invoice number" />,
      dataIndex: "numberOfDigits",
      key: "numberOfDigits",
      sorter: (a, b) => a.numberOfDigits - b.numberOfDigits,
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      width: 260,
      fixed: "right",
      render: (_: unknown, record: InvoiceSchemeRecord) => (
        <Space size="small">
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openEditScheme(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete invoice scheme"
            description="Are you sure you want to delete this invoice scheme?"
            onConfirm={() => handleDeleteScheme(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          {!record.isDefault && (
            <Button
              type="primary"
              size="small"
              style={{ background: "#52c41a", borderColor: "#52c41a" }}
              icon={<CheckCircleOutlined />}
              onClick={() => handleSetDefault(record)}
            >
              Default
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, filteredSchemes.length);
  const total = filteredSchemes.length;
  const paginationText = total > 0 ? `Showing ${start + 1} to ${end} of ${total} entries` : "Showing 0 to 0 of 0 entries";

  const schemesTab = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
          All your invoice schemes
        </Title>
        <Space size="middle">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: 220,
              background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
              borderRadius: 6,
            }}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddScheme} style={{ borderRadius: 6 }}>
            Add
          </Button>
        </Space>
      </div>
      <Table<InvoiceSchemeRecord>
        columns={columns}
        dataSource={filteredSchemes}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredSchemes.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
          showTotal: () => paginationText,
          onChange: (page, size) => {
            setCurrentPage(page);
            if (size) setPageSize(size);
          },
        }}
        scroll={{ x: 1000 }}
        size="small"
        style={{
          background: isDark ? "transparent" : "#fff",
          borderRadius: 8,
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        }}
      />
    </>
  );

  const layoutsTab = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
          All your invoice layouts
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddLayout} style={{ borderRadius: 6 }}>
          Add
        </Button>
      </div>
      <Row gutter={[24, 24]}>
        {layouts.map((layout) => (
          <Col xs={24} sm={12} md={8} lg={6} key={layout.key}>
            <Card
              hoverable
              style={{
                background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                borderRadius: 8,
                textAlign: "center",
              }}
              bodyStyle={{ padding: 24 }}
            >
              <div style={{ marginBottom: 12 }}>
                <FileTextOutlined style={{ fontSize: 48, color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: layout.usedInLocations?.length ? 8 : 0 }}>
                <Text strong style={{ fontSize: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
                  {layout.name}
                </Text>
                {layout.isDefault && <Tag color="green">Default</Tag>}
              </div>
              {layout.usedInLocations && layout.usedInLocations.length > 0 && (
                <Text type="secondary" style={{ display: "block", fontSize: 13, marginBottom: 12 }}>
                  Used in locations: {layout.usedInLocations.join(", ")}
                </Text>
              )}
              <Space size="small" wrap style={{ justifyContent: "center" }}>
                <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openEditLayout(layout)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Delete invoice layout"
                  description="Are you sure you want to delete this layout?"
                  onConfirm={() => handleDeleteLayout(layout)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" size="small" danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 4, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Invoice Settings
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 14 }}>
        Manage your invoice settings
      </Text>
      <div style={{ borderBottom: "3px solid #1890ff", marginBottom: 24, width: "100%" }} />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "schemes", label: "Invoice Schemes", children: schemesTab },
          { key: "layouts", label: "Invoice Layouts", children: layoutsTab },
        ]}
        style={{ color: isDark ? "#fff" : "#1f1f1f" }}
      />

      <Modal
        title="Add Invoice Scheme"
        open={addSchemeModalOpen}
        onCancel={() => setAddSchemeModalOpen(false)}
        onOk={handleAddSchemeSubmit}
        okText="Add"
        destroyOnClose
        width={480}
      >
        <Form form={schemeForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input placeholder="Scheme name" />
          </Form.Item>
          <Form.Item name="prefix" label="Prefix">
            <Input placeholder="Prefix for invoice numbers" />
          </Form.Item>
          <Form.Item name="numberingType" label="Numbering Type">
            <Select placeholder="Select" options={[{ label: "Sequential", value: "Sequential" }, { label: "Year", value: "Year" }, { label: "Random", value: "Random" }]} />
          </Form.Item>
          <Form.Item name="startFrom" label="Start from">
            <Input type="number" min={0} placeholder="0" />
          </Form.Item>
          <Form.Item name="numberOfDigits" label="Number of digits">
            <Input type="number" min={1} max={10} placeholder="4" />
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Invoice Layout"
        open={addLayoutModalOpen}
        onCancel={() => { setAddLayoutModalOpen(false); setFileList([]); }}
        onOk={handleAddLayoutSubmit}
        okText="Add"
        destroyOnClose
        width={1200}
        style={{ top: 10 }}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <Form form={layoutForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="name" label="Layout name" rules={[{ required: true, message: "Please enter layout name" }]}>
                <Input placeholder="Layout name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="design" label="Design">
                <Select placeholder="Select design">
                  <Select.Option value="Default">Default</Select.Option>
                  <Select.Option value="Custom (New Custom)">Custom (New Custom)</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="showLetterHead" valuePropName="checked">
                <Checkbox>Show letter head</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Invoice Logo">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Allowed file types: .png, .jpg, .jpeg, .gif. Maximum file size: 2MB
                  </Text>
                  <Form.Item name="showInvoiceLogo" valuePropName="checked">
                    <Checkbox>Show invoice Logo</Checkbox>
                  </Form.Item>
                </Space>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="headerText" label="Header text">
                <Editor
                  apiKey="0okczgi5nx161bxzhmt6x8xvsdgvkgoea2gaqd9iewp33pv8"
                  initialValue=""
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | code help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  onEditorChange={(content) => {
                    layoutForm.setFieldValue('headerText', content);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Sub Heading Lines">
                <Row gutter={12}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Col span={12} key={num} style={{ marginBottom: 16 }}>
                      <Form.Item name={['subHeadingLines', num - 1]} noStyle>
                        <Input placeholder={`Sub Heading Line ${num}`} />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="invoiceHeading" label="Invoice heading">
                <Input placeholder="Invoice heading" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="quotationHeading" label="Quotation Heading">
                <Input placeholder="Quotation heading" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="dateLabel" label="Date Label">
                <Input placeholder="Date label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dueDateLabel" label="Due date label">
                <Input placeholder="Due date label" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="headingSuffixNotPaid" label="Heading Suffix for not paid">
                <Input placeholder="Suffix for not paid" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="headingSuffixPaid" label="Heading Suffix for paid">
                <Input placeholder="Suffix for paid" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="salesOrderHeading" label="Sales Order Heading">
                <Input placeholder="Sales order heading" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="invoiceNoLabel" label="Invoice no. label">
                <Input placeholder="Invoice no. label" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showDueDate" valuePropName="checked">
                <Checkbox>Show due date</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="proformaInvoiceHeading" label="Proforma invoice heading">
                <Input placeholder="Proforma invoice heading" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="quotationNoLabel" label="Quotation no. label">
                <Input placeholder="Quotation no. label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dateTimeFormat" label="Date time format">
                <Select placeholder="Select date format">
                  <Select.Option value="DD-MM-YYYY">DD-MM-YYYY</Select.Option>
                  <Select.Option value="MM-DD-YYYY">MM-DD-YYYY</Select.Option>
                  <Select.Option value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
                  <Select.Option value="DD/MM/YYYY">DD/MM/YYYY</Select.Option>
                  <Select.Option value="MM/DD/YYYY">MM/DD/YYYY</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="isDefault" valuePropName="checked">
                <Checkbox>Set as default</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="usedInLocations" label="Used in locations">
                <Input placeholder="Comma-separated location names" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="salesPersonLabel" label="Sales Person Label">
                <Input placeholder="Sales Person Label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="commissionAgentLabel" label="Commission agent label">
                <Input placeholder="Commission Agent" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showBusinessName" valuePropName="checked">
                <Checkbox>Show business name</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="showLocationName" valuePropName="checked">
                <Checkbox>Show location name</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showSalesPerson" valuePropName="checked">
                <Checkbox>Show Sales Person</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="showCommissionAgent" valuePropName="checked">
                <Checkbox>Show commission agent</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields to be shown in customer details:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showCustomerInformation" valuePropName="checked">
                <Checkbox>Show Customer information</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customerLabel" label="Customer Label">
                <Input placeholder="Customer" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showClientId" valuePropName="checked">
                <Checkbox>Show client ID</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="clientIdLabel" label="Client ID Label">
                <Input placeholder="Client ID Label" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="clientTaxNumberLabel" label="Client tax number label">
                <Input placeholder="Client tax number label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="showRewardPoint" valuePropName="checked">
                <Checkbox>Show reward point</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="url" label="URL">
                <Input placeholder="URL" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField2" label="Custom Field 2">
                <Input placeholder="Custom Field 2" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField3" label="Custom Field 3">
                <Input placeholder="Custom Field 3" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField4" label="Custom Field 4">
                <Input placeholder="Custom Field 4" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields to be shown in location address:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="landmark" label="Landmark">
                <Input placeholder="Landmark" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="city" label="City">
                <Input placeholder="City" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="state" label="State">
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="country" label="Country">
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="zipCode" label="Zip Code">
                <Input placeholder="Zip Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField1" label="Custom field 1">
                <Input placeholder="Custom field 1" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField2" label="Custom field 2">
                <Input placeholder="Custom field 2" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField3" label="Custom field 3">
                <Input placeholder="Custom field 3" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField4" label="Custom field 4">
                <Input placeholder="Custom field 4" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields for Communication details:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="mobileNumber" label="Mobile number">
                <Input placeholder="Mobile number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="alternateNumber" label="Alternate number">
                <Input placeholder="Alternate number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label="Email">
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields for Tax details:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="tax1Details" label="Tax 1 details">
                <Input placeholder="Tax 1 details" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tax2Details" label="Tax 2 details">
                <Input placeholder="Tax 2 details" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Product Labels:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="productLabel" label="Product Label">
                <Input placeholder="Product" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="quantityLabel" label="Quantity Label">
                <Input placeholder="Quantity" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="unitPriceLabel" label="Unit Price Label">
                <Input placeholder="Unit Price" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="subtotalLabel" label="Subtotal Label">
                <Input placeholder="Subtotal" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="categoryOrHSNCodeLabel" label="Category or HSN code label">
                <Input placeholder="HSN" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="totalQuantityLabel" label="Total quantity label">
                <Input placeholder="Total Quantity" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="itemDiscountLabel" label="Item discount label">
                <Input placeholder="Discount" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="discountedUnitPriceLabel" label="Discounted unit price label">
                <Input placeholder="Price after discount" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Product details to be shown:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="showBrand" valuePropName="checked">
                <Checkbox>Show brand</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showSKU" valuePropName="checked">
                <Checkbox>Show SKU</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showCategoryCodeOrHSN" valuePropName="checked">
                <Checkbox>Show category code or HSN code</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showSaleDescription" valuePropName="checked">
                <Checkbox>Show sale description</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="showProductIMEIOrSerialNumber" valuePropName="checked">
                <Checkbox>(Product IMEI or Serial Number)</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showProductDescription" valuePropName="checked">
                <Checkbox>Show product description</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showProductImage" valuePropName="checked">
                <Checkbox>Show product image</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showWarrantyName" valuePropName="checked">
                <Checkbox>Show warranty name</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="showWarrantyExpiryDate" valuePropName="checked">
                <Checkbox>Show warranty expiry date</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showWarrantyDescription" valuePropName="checked">
                <Checkbox>Show warranty description</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showBaseUnitDetails" valuePropName="checked">
                <Checkbox>Show base unit details (If applicable)</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              {/* Empty column for balance */}
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField1" label="Custom Field1">
                <Input placeholder="Custom Field1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField2" label="Custom Field2">
                <Input placeholder="Custom Field2" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField3" label="Custom Field3">
                <Input placeholder="Custom Field3" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField4" label="Custom Field4">
                <Input placeholder="Custom Field4" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Invoice Totals and Payment:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="subtotalLabel" label="Subtotal label">
                <Input placeholder="Subtotal" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="discountLabel" label="Discount label">
                <Input placeholder="Discount" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="taxLabel" label="Tax label">
                <Input placeholder="Tax" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="totalLabel" label="Total label">
                <Input placeholder="Total" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="totalItemsLabel" label="Total items label">
                <Input placeholder="Total items label" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="roundOffLabel" label="Round off label">
                <Input placeholder="Round Off" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="totalDueLabelCurrentSale" label="Total Due Label (Current sale)">
                <Input placeholder="Due" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="amountPaidLabel" label="Amount Paid Label">
                <Input placeholder="Total paid" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showPaymentInformation" valuePropName="checked">
                <Checkbox>Show Payment information</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showBarcode" valuePropName="checked">
                <Checkbox>Show Barcode</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="totalDueLabelAllSales" label="Total Due Label (All sales)">
                <Input placeholder="Total Due Label" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showTotalBalanceDueAllSales" valuePropName="checked">
                <Checkbox>Show total balance due (All sales)</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="changeReturnLabel" label="Change return label">
                <Input placeholder="Change Return" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showTotalInWords" valuePropName="checked">
                <Checkbox>Show total in words</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="wordFormat" label="Word Format">
                <Input placeholder="International" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="taxSummaryLabel" label="Tax summary label">
                <Input placeholder="Tax summary label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Empty column for balance */}
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="footerText" label="Footer text">
                <Editor
                  apiKey="0okczgi5nx161bxzhmt6x8xvsdgvkgoea2gaqd9iewp33pv8"
                  initialValue=""
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | code help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  onEditorChange={(content) => {
                    layoutForm.setFieldValue('footerText', content);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                QR Code:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showQRCode" valuePropName="checked">
                <Checkbox>Show QR Code</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showQRCodeLabels" valuePropName="checked">
                <Checkbox>Show Labels</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showZATCAQRCode" valuePropName="checked">
                <Checkbox>ZATCA (Fatoora) QR code</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields to be shown:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="qrCodeBusinessName" valuePropName="checked">
                <Checkbox>Business Name</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeBusinessLocation" valuePropName="checked">
                <Checkbox>Business location address</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeBusinessTax1" valuePropName="checked">
                <Checkbox>Business tax 1</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeBusinessTax2" valuePropName="checked">
                <Checkbox>Business tax 2</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="qrCodeInvoiceNo" valuePropName="checked">
                <Checkbox>Invoice No.</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeInvoiceDatetime" valuePropName="checked">
                <Checkbox>Invoice Datetime</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeSubtotal" valuePropName="checked">
                <Checkbox>Subtotal</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeTotalWithTax" valuePropName="checked">
                <Checkbox>Total amount with tax</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="qrCodeTotalTax" valuePropName="checked">
                <Checkbox>Total Tax</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeCustomerName" valuePropName="checked">
                <Checkbox>Customer name</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeInvoiceURL" valuePropName="checked">
                <Checkbox>Invoice URL</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              {/* Empty column for balance */}
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Restaurant module settings:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showServiceStaff" valuePropName="checked">
                <Checkbox>Show service staff</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="serviceStaffLabel" label="Service staff label">
                <Input placeholder="Service staff" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Repair Module Settings:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showRepairStatus" valuePropName="checked">
                <Checkbox>Show repair status</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showRepairWarranty" valuePropName="checked">
                <Checkbox>Show repair warranty</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showRepairBrand" valuePropName="checked">
                <Checkbox>Show Brand</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showDevice" valuePropName="checked">
                <Checkbox>Show Device</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showModel" valuePropName="checked">
                <Checkbox>Show Model</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showSerialNumber" valuePropName="checked">
                <Checkbox>Show serial number</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showDefects" valuePropName="checked">
                <Checkbox>Show defects</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showRepairChecklist" valuePropName="checked">
                <Checkbox>Show repair checklist</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* Empty column for balance */}
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="repairStatusLabel" label="Repair status label">
                <Input placeholder="Repair Status" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="repairWarrantyLabel" label="Repair warranty label">
                <Input placeholder="Repair Warranty" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="repairBrandLabel" label="Brand Label">
                <Input placeholder="Brand" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="deviceLabel" label="Device Label">
                <Input placeholder="Device" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="modelNumberLabel" label="Model number label">
                <Input placeholder="Model No." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="serialNumberLabel" label="Serial number label">
                <Input placeholder="Serial No." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="defectLabel" label="Defect label">
                <Input placeholder="Defects" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="repairChecklistLabel" label="Repair checklist label">
                <Input placeholder="Repair Checklist" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Credit Note / Sell Return Details:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="creditNoteHeading" label="Heading">
                <Input placeholder="Credit Note" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="referenceNumberLabel" label="Reference Number">
                <Input placeholder="Reference No" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="totalAmountLabel" label="Total Amount">
                <Input placeholder="Credit Amount" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Empty column for balance */}
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Edit Invoice Scheme"
        open={editSchemeModalOpen}
        onCancel={() => { setEditSchemeModalOpen(false); setEditingScheme(null); schemeForm.resetFields(); }}
        onOk={handleEditSchemeSubmit}
        okText="Save"
        destroyOnClose
        width={480}
      >
        <Form form={schemeForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input placeholder="Scheme name" />
          </Form.Item>
          <Form.Item name="prefix" label="Prefix">
            <Input placeholder="Prefix for invoice numbers" />
          </Form.Item>
          <Form.Item name="numberingType" label="Numbering Type">
            <Select placeholder="Select" options={[{ label: "Sequential", value: "Sequential" }, { label: "Year", value: "Year" }, { label: "Random", value: "Random" }]} />
          </Form.Item>
          <Form.Item name="startFrom" label="Start from">
            <Input type="number" min={0} placeholder="0" />
          </Form.Item>
          <Form.Item name="numberOfDigits" label="Number of digits">
            <Input type="number" min={1} max={10} placeholder="4" />
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Invoice Layout"
        open={editLayoutModalOpen}
        onCancel={() => { setEditLayoutModalOpen(false); setEditingLayout(null); layoutForm.resetFields(); setFileList([]); }}
        onOk={handleEditLayoutSubmit}
        okText="Save"
        destroyOnClose
        width={1200}
        style={{ top: 10 }}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <Form form={layoutForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="name" label="Layout name" rules={[{ required: true, message: "Please enter layout name" }]}>
                <Input placeholder="Layout name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="design" label="Design">
                <Select placeholder="Select design">
                  <Select.Option value="Default">Default</Select.Option>
                  <Select.Option value="Custom (New Custom)">Custom (New Custom)</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="showLetterHead" valuePropName="checked">
                <Checkbox>Show letter head</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Invoice Logo">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Allowed file types: .png, .jpg, .jpeg, .gif. Maximum file size: 2MB
                  </Text>
                  <Form.Item name="showInvoiceLogo" valuePropName="checked">
                    <Checkbox>Show invoice Logo</Checkbox>
                  </Form.Item>
                </Space>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="headerText" label="Header text">
                <Editor
                  apiKey="0okczgi5nx161bxzhmt6x8xvsdgvkgoea2gaqd9iewp33pv8"
                  initialValue=""
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | code help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  onEditorChange={(content) => {
                    layoutForm.setFieldValue('headerText', content);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Sub Heading Lines">
                <Row gutter={12}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Col span={12} key={num} style={{ marginBottom: 16 }}>
                      <Form.Item name={['subHeadingLines', num - 1]} noStyle>
                        <Input placeholder={`Sub Heading Line ${num}`} />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="invoiceHeading" label="Invoice heading">
                <Input placeholder="Invoice heading" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="quotationHeading" label="Quotation Heading">
                <Input placeholder="Quotation heading" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="dateLabel" label="Date Label">
                <Input placeholder="Date label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dueDateLabel" label="Due date label">
                <Input placeholder="Due date label" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="headingSuffixNotPaid" label="Heading Suffix for not paid">
                <Input placeholder="Suffix for not paid" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="headingSuffixPaid" label="Heading Suffix for paid">
                <Input placeholder="Suffix for paid" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="salesOrderHeading" label="Sales Order Heading">
                <Input placeholder="Sales order heading" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="invoiceNoLabel" label="Invoice no. label">
                <Input placeholder="Invoice no. label" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showDueDate" valuePropName="checked">
                <Checkbox>Show due date</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="proformaInvoiceHeading" label="Proforma invoice heading">
                <Input placeholder="Proforma invoice heading" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="quotationNoLabel" label="Quotation no. label">
                <Input placeholder="Quotation no. label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dateTimeFormat" label="Date time format">
                <Select placeholder="Select date format">
                  <Select.Option value="DD-MM-YYYY">DD-MM-YYYY</Select.Option>
                  <Select.Option value="MM-DD-YYYY">MM-DD-YYYY</Select.Option>
                  <Select.Option value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
                  <Select.Option value="DD/MM/YYYY">DD/MM/YYYY</Select.Option>
                  <Select.Option value="MM/DD/YYYY">MM/DD/YYYY</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="isDefault" valuePropName="checked">
                <Checkbox>Set as default</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="usedInLocations" label="Used in locations">
                <Input placeholder="Comma-separated location names" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="salesPersonLabel" label="Sales Person Label">
                <Input placeholder="Sales Person Label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="commissionAgentLabel" label="Commission agent label">
                <Input placeholder="Commission Agent" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showBusinessName" valuePropName="checked">
                <Checkbox>Show business name</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="showLocationName" valuePropName="checked">
                <Checkbox>Show location name</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showSalesPerson" valuePropName="checked">
                <Checkbox>Show Sales Person</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="showCommissionAgent" valuePropName="checked">
                <Checkbox>Show commission agent</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields to be shown in customer details:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showCustomerInformation" valuePropName="checked">
                <Checkbox>Show Customer information</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customerLabel" label="Customer Label">
                <Input placeholder="Customer" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showClientId" valuePropName="checked">
                <Checkbox>Show client ID</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="clientIdLabel" label="Client ID Label">
                <Input placeholder="Client ID Label" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="clientTaxNumberLabel" label="Client tax number label">
                <Input placeholder="Client tax number label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="showRewardPoint" valuePropName="checked">
                <Checkbox>Show reward point</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="url" label="URL">
                <Input placeholder="URL" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField2" label="Custom Field 2">
                <Input placeholder="Custom Field 2" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField3" label="Custom Field 3">
                <Input placeholder="Custom Field 3" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField4" label="Custom Field 4">
                <Input placeholder="Custom Field 4" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields to be shown in location address:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="landmark" label="Landmark">
                <Input placeholder="Landmark" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="city" label="City">
                <Input placeholder="City" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="state" label="State">
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="country" label="Country">
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="zipCode" label="Zip Code">
                <Input placeholder="Zip Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField1" label="Custom field 1">
                <Input placeholder="Custom field 1" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField2" label="Custom field 2">
                <Input placeholder="Custom field 2" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField3" label="Custom field 3">
                <Input placeholder="Custom field 3" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField4" label="Custom field 4">
                <Input placeholder="Custom field 4" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields for Communication details:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="mobileNumber" label="Mobile number">
                <Input placeholder="Mobile number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="alternateNumber" label="Alternate number">
                <Input placeholder="Alternate number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label="Email">
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields for Tax details:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="tax1Details" label="Tax 1 details">
                <Input placeholder="Tax 1 details" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tax2Details" label="Tax 2 details">
                <Input placeholder="Tax 2 details" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Product Labels:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="productLabel" label="Product Label">
                <Input placeholder="Product" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="quantityLabel" label="Quantity Label">
                <Input placeholder="Quantity" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="unitPriceLabel" label="Unit Price Label">
                <Input placeholder="Unit Price" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="subtotalLabel" label="Subtotal Label">
                <Input placeholder="Subtotal" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="categoryOrHSNCodeLabel" label="Category or HSN code label">
                <Input placeholder="HSN" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="totalQuantityLabel" label="Total quantity label">
                <Input placeholder="Total Quantity" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="itemDiscountLabel" label="Item discount label">
                <Input placeholder="Discount" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="discountedUnitPriceLabel" label="Discounted unit price label">
                <Input placeholder="Price after discount" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Product details to be shown:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="showBrand" valuePropName="checked">
                <Checkbox>Show brand</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showSKU" valuePropName="checked">
                <Checkbox>Show SKU</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showCategoryCodeOrHSN" valuePropName="checked">
                <Checkbox>Show category code or HSN code</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showSaleDescription" valuePropName="checked">
                <Checkbox>Show sale description</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="showProductIMEIOrSerialNumber" valuePropName="checked">
                <Checkbox>(Product IMEI or Serial Number)</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showProductDescription" valuePropName="checked">
                <Checkbox>Show product description</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showProductImage" valuePropName="checked">
                <Checkbox>Show product image</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showWarrantyName" valuePropName="checked">
                <Checkbox>Show warranty name</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="showWarrantyExpiryDate" valuePropName="checked">
                <Checkbox>Show warranty expiry date</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showWarrantyDescription" valuePropName="checked">
                <Checkbox>Show warranty description</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="showBaseUnitDetails" valuePropName="checked">
                <Checkbox>Show base unit details (If applicable)</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              {/* Empty column for balance */}
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField1" label="Custom Field1">
                <Input placeholder="Custom Field1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField2" label="Custom Field2">
                <Input placeholder="Custom Field2" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="customField3" label="Custom Field3">
                <Input placeholder="Custom Field3" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customField4" label="Custom Field4">
                <Input placeholder="Custom Field4" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Invoice Totals and Payment:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="subtotalLabel" label="Subtotal label">
                <Input placeholder="Subtotal" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="discountLabel" label="Discount label">
                <Input placeholder="Discount" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="taxLabel" label="Tax label">
                <Input placeholder="Tax" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="totalLabel" label="Total label">
                <Input placeholder="Total" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="totalItemsLabel" label="Total items label">
                <Input placeholder="Total items label" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="roundOffLabel" label="Round off label">
                <Input placeholder="Round Off" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="totalDueLabelCurrentSale" label="Total Due Label (Current sale)">
                <Input placeholder="Due" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="amountPaidLabel" label="Amount Paid Label">
                <Input placeholder="Total paid" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showPaymentInformation" valuePropName="checked">
                <Checkbox>Show Payment information</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showBarcode" valuePropName="checked">
                <Checkbox>Show Barcode</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="totalDueLabelAllSales" label="Total Due Label (All sales)">
                <Input placeholder="Total Due Label" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showTotalBalanceDueAllSales" valuePropName="checked">
                <Checkbox>Show total balance due (All sales)</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="changeReturnLabel" label="Change return label">
                <Input placeholder="Change Return" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showTotalInWords" valuePropName="checked">
                <Checkbox>Show total in words</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="wordFormat" label="Word Format">
                <Input placeholder="International" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="taxSummaryLabel" label="Tax summary label">
                <Input placeholder="Tax summary label" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Empty column for balance */}
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="footerText" label="Footer text">
                <Editor
                  apiKey="0okczgi5nx161bxzhmt6x8xvsdgvkgoea2gaqd9iewp33pv8"
                  initialValue=""
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | code help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  onEditorChange={(content) => {
                    layoutForm.setFieldValue('footerText', content);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                QR Code:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showQRCode" valuePropName="checked">
                <Checkbox>Show QR Code</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showQRCodeLabels" valuePropName="checked">
                <Checkbox>Show Labels</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showZATCAQRCode" valuePropName="checked">
                <Checkbox>ZATCA (Fatoora) QR code</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Fields to be shown:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="qrCodeBusinessName" valuePropName="checked">
                <Checkbox>Business Name</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeBusinessLocation" valuePropName="checked">
                <Checkbox>Business location address</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeBusinessTax1" valuePropName="checked">
                <Checkbox>Business tax 1</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeBusinessTax2" valuePropName="checked">
                <Checkbox>Business tax 2</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="qrCodeInvoiceNo" valuePropName="checked">
                <Checkbox>Invoice No.</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeInvoiceDatetime" valuePropName="checked">
                <Checkbox>Invoice Datetime</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeSubtotal" valuePropName="checked">
                <Checkbox>Subtotal</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeTotalWithTax" valuePropName="checked">
                <Checkbox>Total amount with tax</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="qrCodeTotalTax" valuePropName="checked">
                <Checkbox>Total Tax</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeCustomerName" valuePropName="checked">
                <Checkbox>Customer name</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="qrCodeInvoiceURL" valuePropName="checked">
                <Checkbox>Invoice URL</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              {/* Empty column for balance */}
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Restaurant module settings:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="showServiceStaff" valuePropName="checked">
                <Checkbox>Show service staff</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="serviceStaffLabel" label="Service staff label">
                <Input placeholder="Service staff" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Repair Module Settings:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showRepairStatus" valuePropName="checked">
                <Checkbox>Show repair status</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showRepairWarranty" valuePropName="checked">
                <Checkbox>Show repair warranty</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showRepairBrand" valuePropName="checked">
                <Checkbox>Show Brand</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showDevice" valuePropName="checked">
                <Checkbox>Show Device</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showModel" valuePropName="checked">
                <Checkbox>Show Model</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showSerialNumber" valuePropName="checked">
                <Checkbox>Show serial number</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="showDefects" valuePropName="checked">
                <Checkbox>Show defects</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showRepairChecklist" valuePropName="checked">
                <Checkbox>Show repair checklist</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* Empty column for balance */}
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="repairStatusLabel" label="Repair status label">
                <Input placeholder="Repair Status" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="repairWarrantyLabel" label="Repair warranty label">
                <Input placeholder="Repair Warranty" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="repairBrandLabel" label="Brand Label">
                <Input placeholder="Brand" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="deviceLabel" label="Device Label">
                <Input placeholder="Device" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="modelNumberLabel" label="Model number label">
                <Input placeholder="Model No." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="serialNumberLabel" label="Serial number label">
                <Input placeholder="Serial No." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="defectLabel" label="Defect label">
                <Input placeholder="Defects" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="repairChecklistLabel" label="Repair checklist label">
                <Input placeholder="Repair Checklist" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>
                Credit Note / Sell Return Details:
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="creditNoteHeading" label="Heading">
                <Input placeholder="Credit Note" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="referenceNumberLabel" label="Reference Number">
                <Input placeholder="Reference No" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="totalAmountLabel" label="Total Amount">
                <Input placeholder="Credit Amount" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Empty column for balance */}
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default InvoiceSettings;
