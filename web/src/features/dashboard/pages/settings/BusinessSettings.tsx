import React, { useState } from "react";
import {
  Layout,
  Menu,
  Input,
  Row,
  Col,
  Typography,
  Button,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Space,
  message,
  Tooltip,
  Table,
} from "antd";
import type { MenuProps } from "antd";
import {
  SearchOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  AppstoreOutlined,
  ColumnWidthOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const SETTINGS_MENU_ITEMS: MenuProps["items"] = [
  { key: "business", label: "Business", icon: <AppstoreOutlined /> },
  { key: "tax", label: "Tax", icon: <InfoCircleOutlined /> },
  { key: "product", label: "Product" },
  { key: "contact", label: "Contact" },
  { key: "sale", label: "Sale" },
  { key: "pos", label: "POS" },
  { key: "purchases", label: "Purchases" },
  { key: "payment", label: "Payment" },
  { key: "dashboard", label: "Dashboard" },
  { key: "system", label: "System" },
  { key: "prefixes", label: "Prefixes" },
  { key: "email-settings", label: "Email Settings" },
  { key: "sms-settings", label: "SMS Settings" },
  { key: "reward-point-settings", label: "Reward Point Settings" },
  { key: "modules", label: "Modules" },
  { key: "custom-labels", label: "Custom Labels" },
];

const BusinessSettings: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedMenu, setSelectedMenu] = useState("business");
  const [search, setSearch] = useState("");

  const [businessName, setBusinessName] = useState("C2Z");
  const [currencySymbolPlacement, setCurrencySymbolPlacement] = useState("before");
  const [logoPath, setLogoPath] = useState("");
  const [dateFormat, setDateFormat] = useState("mm/dd/yyyy");
  const [quantityPrecision, setQuantityPrecision] = useState(2);

  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs("2025-08-26"));
  const [timeZone, setTimeZone] = useState("Africa/Dar_es_Salaam");
  const [financialYearStartMonth, setFinancialYearStartMonth] = useState("January");
  const [timeFormat, setTimeFormat] = useState("24");
  const [enableMultiCurrency, setEnableMultiCurrency] = useState(false);

  const [currency, setCurrency] = useState("TZS");
  const [transactionEditDays, setTransactionEditDays] = useState(30);
  const [stockAccountingMethod, setStockAccountingMethod] = useState("FIFO");
  const [currencyPrecision, setCurrencyPrecision] = useState(2);

  const [pricingStrategy, setPricingStrategy] = useState<"profit_margin" | "markup">("profit_margin");
  const [defaultMargin, setDefaultMargin] = useState(25);

  const [tax1Name, setTax1Name] = useState("");
  const [tax1No, setTax1No] = useState("");
  const [tax2Name, setTax2Name] = useState("");
  const [tax2No, setTax2No] = useState("");
  const [enableInlineTax, setEnableInlineTax] = useState(false);

  const [skuPrefix, setSkuPrefix] = useState("");
  const [enableProductExpiry, setEnableProductExpiry] = useState(false);
  const [enableBrands, setEnableBrands] = useState(true);
  const [enableCategories, setEnableCategories] = useState(true);
  const [enableSubCategories, setEnableSubCategories] = useState(true);
  const [enablePriceTaxInfo, setEnablePriceTaxInfo] = useState(true);
  const [defaultUnit, setDefaultUnit] = useState<string | null>(null);
  const [enableSubUnits, setEnableSubUnits] = useState(false);
  const [enableRacks, setEnableRacks] = useState(false);
  const [enableRow, setEnableRow] = useState(false);
  const [enablePosition, setEnablePosition] = useState(false);
  const [enableWarranty, setEnableWarranty] = useState(false);
  const [isProductImageRequired, setIsProductImageRequired] = useState(false);

  const [defaultCreditLimit, setDefaultCreditLimit] = useState("");

  const [defaultSaleDiscount, setDefaultSaleDiscount] = useState(0);
  const [defaultSaleTax, setDefaultSaleTax] = useState("none");
  const [salesItemAdditionMethod, setSalesItemAdditionMethod] = useState("increase");
  const [amountRoundingMethod, setAmountRoundingMethod] = useState("none");
  const [salesPriceIsMinSellingPrice, setSalesPriceIsMinSellingPrice] = useState(false);
  const [allowOverselling, setAllowOverselling] = useState(false);
  const [enableSalesOrder, setEnableSalesOrder] = useState(false);
  const [isPayTermRequired, setIsPayTermRequired] = useState(false);
  const [salesCommissionAgent, setSalesCommissionAgent] = useState("disable");
  const [commissionCalculationType, setCommissionCalculationType] = useState("invoice_value");
  const [isCommissionAgentRequired, setIsCommissionAgentRequired] = useState(false);
  const [enablePaymentLink, setEnablePaymentLink] = useState(false);
  const [razorpayKeyId, setRazorpayKeyId] = useState("");
  const [razorpayKeySecret, setRazorpayKeySecret] = useState("");
  const [stripePublicKey, setStripePublicKey] = useState("");
  const [stripeSecretKey, setStripeSecretKey] = useState("");

  // POS module state
  const [posExpressCheckout, setPosExpressCheckout] = useState("shift+e");
  const [posPayCheckout, setPosPayCheckout] = useState("shift+p");
  const [posDraft, setPosDraft] = useState("shift+d");
  const [posCancel, setPosCancel] = useState("shift+c");
  const [posGoToProductQty, setPosGoToProductQty] = useState("f2");
  const [posWeighingScale, setPosWeighingScale] = useState("");
  const [posEditDiscount, setPosEditDiscount] = useState("shift+i");
  const [posEditOrderTax, setPosEditOrderTax] = useState("shift+t");
  const [posAddPaymentRow, setPosAddPaymentRow] = useState("shift+r");
  const [posFinalizePayment, setPosFinalizePayment] = useState("shift+f");
  const [posAddNewProduct, setPosAddNewProduct] = useState("f4");

  const [posDisableMultiplePay, setPosDisableMultiplePay] = useState(false);
  const [posDontShowProductSuggestion, setPosDontShowProductSuggestion] = useState(false);
  const [posDisableOrderTax, setPosDisableOrderTax] = useState(false);
  const [posEnableTransactionDate, setPosEnableTransactionDate] = useState(false);
  const [posIsServiceStaffRequired, setPosIsServiceStaffRequired] = useState(false);
  const [posShowInvoiceScheme, setPosShowInvoiceScheme] = useState(false);
  const [posShowPricingOnSuggestion, setPosShowPricingOnSuggestion] = useState(false);
  const [posDisableDraft, setPosDisableDraft] = useState(false);
  const [posDontShowRecentTransactions, setPosDontShowRecentTransactions] = useState(false);
  const [posSubtotalEditable, setPosSubtotalEditable] = useState(false);
  const [posDisableCreditSaleButton, setPosDisableCreditSaleButton] = useState(false);
  const [posShowInvoiceLayoutDropdown, setPosShowInvoiceLayoutDropdown] = useState(true);
  const [posDisableExpressCheckout, setPosDisableExpressCheckout] = useState(false);
  const [posDisableDiscount, setPosDisableDiscount] = useState(false);
  const [posDisableSuspendSale, setPosDisableSuspendSale] = useState(false);
  const [posEnableServiceStaffInLine, setPosEnableServiceStaffInLine] = useState(false);
  const [posEnableWeighingScale, setPosEnableWeighingScale] = useState(false);
  const [posPrintInvoiceOnSuspend, setPosPrintInvoiceOnSuspend] = useState(false);

  const [weighingScalePrefix, setWeighingScalePrefix] = useState("");
  const [weighingScaleProductSkuLength, setWeighingScaleProductSkuLength] = useState(5);
  const [weighingScaleQtyIntLength, setWeighingScaleQtyIntLength] = useState(4);
  const [weighingScaleQtyFracLength, setWeighingScaleQtyFracLength] = useState(3);

  // Purchases module state
  const [purchasesEnableEditPrice, setPurchasesEnableEditPrice] = useState(true);
  const [purchasesEnableLotNumber, setPurchasesEnableLotNumber] = useState(false);
  const [purchasesEnableRequisition, setPurchasesEnableRequisition] = useState(false);
  const [purchasesEnableStatus, setPurchasesEnableStatus] = useState(true);
  const [purchasesEnableOrder, setPurchasesEnableOrder] = useState(false);
  const [purchasesConfirmOrder, setPurchasesConfirmOrder] = useState(false);

  // Dashboard module state
  const [dashboardViewStockExpiryAlertFor, setDashboardViewStockExpiryAlertFor] = useState(30);

  // System module state
  const [systemThemeColor, setSystemThemeColor] = useState<string | null>(null);
  const [systemDefaultDatatableEntries, setSystemDefaultDatatableEntries] = useState(25);
  const [systemShowHelpText, setSystemShowHelpText] = useState(true);

  // Prefixes module state
  const [prefixPurchase, setPrefixPurchase] = useState("PO");
  const [prefixPurchaseOrder, setPrefixPurchaseOrder] = useState("");
  const [prefixSellReturn, setPrefixSellReturn] = useState("CN");
  const [prefixPurchasePayment, setPrefixPurchasePayment] = useState("PP");
  const [prefixBusinessLocation, setPrefixBusinessLocation] = useState("BL");
  const [prefixDraft, setPrefixDraft] = useState("");
  const [prefixPurchaseReturn, setPrefixPurchaseReturn] = useState("");
  const [prefixStockTransfer, setPrefixStockTransfer] = useState("ST");
  const [prefixExpenses, setPrefixExpenses] = useState("EP");
  const [prefixSellPayment, setPrefixSellPayment] = useState("SP");
  const [prefixUsername, setPrefixUsername] = useState("");
  const [prefixSalesOrder, setPrefixSalesOrder] = useState("");
  const [prefixPurchaseRequisition, setPrefixPurchaseRequisition] = useState("");
  const [prefixStockAdjustment, setPrefixStockAdjustment] = useState("SA");
  const [prefixContacts, setPrefixContacts] = useState("CO");
  const [prefixExpensePayment, setPrefixExpensePayment] = useState("");
  const [prefixSubscriptionNo, setPrefixSubscriptionNo] = useState("");

  // Email Settings module state
  const [emailMailDriver, setEmailMailDriver] = useState("smtp");
  const [emailHost, setEmailHost] = useState("");
  const [emailPort, setEmailPort] = useState("");
  const [emailUsername, setEmailUsername] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailEncryption, setEmailEncryption] = useState("tls");
  const [emailFromAddress, setEmailFromAddress] = useState("");
  const [emailFromName, setEmailFromName] = useState("");

  // SMS Settings module state
  const [smsService, setSmsService] = useState("other");
  const [smsUrl, setSmsUrl] = useState("");
  const [smsSendToParam, setSmsSendToParam] = useState("");
  const [smsMessageParam, setSmsMessageParam] = useState("");
  const [smsRequestMethod, setSmsRequestMethod] = useState("POST");
  const [smsHeader1Key, setSmsHeader1Key] = useState("");
  const [smsHeader1Value, setSmsHeader1Value] = useState("");
  const [smsHeader2Key, setSmsHeader2Key] = useState("");
  const [smsHeader2Value, setSmsHeader2Value] = useState("");
  const [smsHeader3Key, setSmsHeader3Key] = useState("");
  const [smsHeader3Value, setSmsHeader3Value] = useState("");
  const [smsParam1Key, setSmsParam1Key] = useState("");
  const [smsParam1Value, setSmsParam1Value] = useState("");
  const [smsParam2Key, setSmsParam2Key] = useState("");
  const [smsParam2Value, setSmsParam2Value] = useState("");
  const [smsParam3Key, setSmsParam3Key] = useState("");
  const [smsParam3Value, setSmsParam3Value] = useState("");
  const [smsParam4Key, setSmsParam4Key] = useState("");
  const [smsParam4Value, setSmsParam4Value] = useState("");
  const [smsParam5Key, setSmsParam5Key] = useState("");
  const [smsParam5Value, setSmsParam5Value] = useState("");
  const [smsParam6Key, setSmsParam6Key] = useState("");
  const [smsParam6Value, setSmsParam6Value] = useState("");
  const [smsParam7Key, setSmsParam7Key] = useState("");
  const [smsParam7Value, setSmsParam7Value] = useState("");
  const [smsParam8Key, setSmsParam8Key] = useState("");
  const [smsParam8Value, setSmsParam8Value] = useState("");
  const [smsParam9Key, setSmsParam9Key] = useState("");
  const [smsParam9Value, setSmsParam9Value] = useState("");
  const [smsParam10Key, setSmsParam10Key] = useState("");
  const [smsParam10Value, setSmsParam10Value] = useState("");
  const [smsTestNumber, setSmsTestNumber] = useState("");

  // Reward Point Settings module state
  const [rewardEnableRewardPoint, setRewardEnableRewardPoint] = useState(false);
  const [rewardDisplayName, setRewardDisplayName] = useState("");
  const [rewardAmountSpendForUnitPoint, setRewardAmountSpendForUnitPoint] = useState("1.00");
  const [rewardMinimumOrderTotalToEarn, setRewardMinimumOrderTotalToEarn] = useState("1.00");
  const [rewardMaximumPointsPerOrder, setRewardMaximumPointsPerOrder] = useState("");
  const [rewardRedeemAmountPerUnitPoint, setRewardRedeemAmountPerUnitPoint] = useState("1.00");
  const [rewardMinimumOrderTotalToRedeem, setRewardMinimumOrderTotalToRedeem] = useState("1.00");
  const [rewardMinimumRedeemPoint, setRewardMinimumRedeemPoint] = useState("");
  const [rewardMaximumRedeemPointPerOrder, setRewardMaximumRedeemPointPerOrder] = useState("");
  const [rewardExpiryPeriod, setRewardExpiryPeriod] = useState("");
  const [rewardExpiryUnit, setRewardExpiryUnit] = useState("year");

  // Modules (Enable/Disable) state
  const [modProduct, setModProduct] = useState(true);
  const [modPos, setModPos] = useState(true);
  const [modExpenses, setModExpenses] = useState(true);
  const [modModifiers, setModModifiers] = useState(false);
  const [modKitchen, setModKitchen] = useState(false);
  const [modStockTaking, setModStockTaking] = useState(true);
  const [modManufacturing, setModManufacturing] = useState(false);
  const [modHms, setModHms] = useState(false);
  const [modAccounting, setModAccounting] = useState(true);
  const [modSpreadsheet, setModSpreadsheet] = useState(false);
  const [modPurchases, setModPurchases] = useState(true);
  const [modStockTransfers, setModStockTransfers] = useState(true);
  const [modAccount, setModAccount] = useState(true);
  const [modServiceStaff, setModServiceStaff] = useState(false);
  const [modEnableSubscription, setModEnableSubscription] = useState(false);
  const [modEssentials, setModEssentials] = useState(false);
  const [modProject, setModProject] = useState(false);
  const [modCrm, setModCrm] = useState(false);
  const [modAssetManagement, setModAssetManagement] = useState(false);
  const [modAddSale, setModAddSale] = useState(true);
  const [modStockAdjustment, setModStockAdjustment] = useState(true);
  const [modTables, setModTables] = useState(false);
  const [modEnableBookings, setModEnableBookings] = useState(false);
  const [modTypesOfService, setModTypesOfService] = useState(false);
  const [modWoocommerce, setModWoocommerce] = useState(false);
  const [modRepair, setModRepair] = useState(false);
  const [modProductCatalogue, setModProductCatalogue] = useState(false);
  const [modCms, setModCms] = useState(false);

  // Custom Labels module state
  const [clPayment1, setClPayment1] = useState("");
  const [clPayment2, setClPayment2] = useState("");
  const [clPayment3, setClPayment3] = useState("");
  const [clPayment4, setClPayment4] = useState("");
  const [clPayment5, setClPayment5] = useState("");
  const [clPayment6, setClPayment6] = useState("");
  const [clPayment7, setClPayment7] = useState("");
  const [clContact1, setClContact1] = useState("");
  const [clContact2, setClContact2] = useState("");
  const [clContact3, setClContact3] = useState("");
  const [clContact4, setClContact4] = useState("");
  const [clContact5, setClContact5] = useState("");
  const [clContact6, setClContact6] = useState("");
  const [clContact7, setClContact7] = useState("");
  const [clContact8, setClContact8] = useState("");
  const [clContact9, setClContact9] = useState("");
  const [clContact10, setClContact10] = useState("");
  const [clProduct1, setClProduct1] = useState("");
  const [clProduct1Type, setClProduct1Type] = useState<string | null>(null);
  const [clProduct2, setClProduct2] = useState("");
  const [clProduct2Type, setClProduct2Type] = useState<string | null>(null);
  const [clProduct3, setClProduct3] = useState("");
  const [clProduct3Type, setClProduct3Type] = useState<string | null>(null);
  const [clProduct4, setClProduct4] = useState("");
  const [clProduct4Type, setClProduct4Type] = useState<string | null>(null);
  const [clProduct5, setClProduct5] = useState("");
  const [clProduct5Type, setClProduct5Type] = useState<string | null>(null);
  const [clProduct6, setClProduct6] = useState("");
  const [clProduct6Type, setClProduct6Type] = useState<string | null>(null);
  const [clProduct7, setClProduct7] = useState("");
  const [clProduct7Type, setClProduct7Type] = useState<string | null>(null);
  const [clProduct8, setClProduct8] = useState("");
  const [clProduct8Type, setClProduct8Type] = useState<string | null>(null);
  const [clProduct9, setClProduct9] = useState("");
  const [clProduct9Type, setClProduct9Type] = useState<string | null>(null);
  const [clProduct10, setClProduct10] = useState("");
  const [clProduct10Type, setClProduct10Type] = useState<string | null>(null);
  const [clProduct11, setClProduct11] = useState("");
  const [clProduct11Type, setClProduct11Type] = useState<string | null>(null);
  const [clProduct12, setClProduct12] = useState("");
  const [clProduct12Type, setClProduct12Type] = useState<string | null>(null);
  const [clProduct13, setClProduct13] = useState("");
  const [clProduct13Type, setClProduct13Type] = useState<string | null>(null);
  const [clProduct14, setClProduct14] = useState("");
  const [clProduct14Type, setClProduct14Type] = useState<string | null>(null);
  const [clProduct15, setClProduct15] = useState("");
  const [clProduct15Type, setClProduct15Type] = useState<string | null>(null);
  const [clProduct16, setClProduct16] = useState("");
  const [clProduct16Type, setClProduct16Type] = useState<string | null>(null);
  const [clProduct17, setClProduct17] = useState("");
  const [clProduct17Type, setClProduct17Type] = useState<string | null>(null);
  const [clProduct18, setClProduct18] = useState("");
  const [clProduct18Type, setClProduct18Type] = useState<string | null>(null);
  const [clProduct19, setClProduct19] = useState("");
  const [clProduct19Type, setClProduct19Type] = useState<string | null>(null);
  const [clProduct20, setClProduct20] = useState("");
  const [clProduct20Type, setClProduct20Type] = useState<string | null>(null);
  const [clLocation1, setClLocation1] = useState("");
  const [clLocation2, setClLocation2] = useState("");
  const [clLocation3, setClLocation3] = useState("");
  const [clLocation4, setClLocation4] = useState("");
  const [clUser1, setClUser1] = useState("");
  const [clUser2, setClUser2] = useState("");
  const [clUser3, setClUser3] = useState("");
  const [clUser4, setClUser4] = useState("");
  const [clPurchase1, setClPurchase1] = useState("");
  const [clPurchase1Required, setClPurchase1Required] = useState(false);
  const [clPurchase2, setClPurchase2] = useState("");
  const [clPurchase2Required, setClPurchase2Required] = useState(false);
  const [clPurchase3, setClPurchase3] = useState("");
  const [clPurchase3Required, setClPurchase3Required] = useState(false);
  const [clPurchase4, setClPurchase4] = useState("");
  const [clPurchase4Required, setClPurchase4Required] = useState(false);
  const [clPurchaseShip1, setClPurchaseShip1] = useState("");
  const [clPurchaseShip1Required, setClPurchaseShip1Required] = useState(false);
  const [clPurchaseShip2, setClPurchaseShip2] = useState("");
  const [clPurchaseShip2Required, setClPurchaseShip2Required] = useState(false);
  const [clPurchaseShip3, setClPurchaseShip3] = useState("");
  const [clPurchaseShip3Required, setClPurchaseShip3Required] = useState(false);
  const [clPurchaseShip4, setClPurchaseShip4] = useState("");
  const [clPurchaseShip4Required, setClPurchaseShip4Required] = useState(false);
  const [clSell1, setClSell1] = useState("");
  const [clSell1Required, setClSell1Required] = useState(false);
  const [clSell2, setClSell2] = useState("");
  const [clSell2Required, setClSell2Required] = useState(false);
  const [clSell3, setClSell3] = useState("");
  const [clSell3Required, setClSell3Required] = useState(false);
  const [clSell4, setClSell4] = useState("");
  const [clSell4Required, setClSell4Required] = useState(false);
  const [clSaleShip1, setClSaleShip1] = useState("");
  const [clSaleShip1Required, setClSaleShip1Required] = useState(false);
  const [clSaleShip1Default, setClSaleShip1Default] = useState(false);
  const [clSaleShip2, setClSaleShip2] = useState("");
  const [clSaleShip2Required, setClSaleShip2Required] = useState(false);
  const [clSaleShip2Default, setClSaleShip2Default] = useState(false);
  const [clSaleShip3, setClSaleShip3] = useState("");
  const [clSaleShip3Required, setClSaleShip3Required] = useState(false);
  const [clSaleShip3Default, setClSaleShip3Default] = useState(false);
  const [clSaleShip4, setClSaleShip4] = useState("");
  const [clSaleShip4Required, setClSaleShip4Required] = useState(false);
  const [clSaleShip4Default, setClSaleShip4Default] = useState(false);
  const [clSaleShip5, setClSaleShip5] = useState("");
  const [clSaleShip5Required, setClSaleShip5Required] = useState(false);
  const [clSaleShip5Default, setClSaleShip5Default] = useState(false);
  const [clTypesOfService1, setClTypesOfService1] = useState("");
  const [clTypesOfService2, setClTypesOfService2] = useState("");
  const [clTypesOfService3, setClTypesOfService3] = useState("");
  const [clTypesOfService4, setClTypesOfService4] = useState("");
  const [clTypesOfService5, setClTypesOfService5] = useState("");
  const [clTypesOfService6, setClTypesOfService6] = useState("");

  const fieldTypeOptions = [
    { label: "Text", value: "text" },
    { label: "Number", value: "number" },
    { label: "Date", value: "date" },
    { label: "Dropdown", value: "dropdown" },
  ];

  const labelStyle: React.CSSProperties = { color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: 13, marginBottom: 8, display: "block" };
  const inputStyle = { background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9", borderRadius: 6, color: isDark ? "#fff" : "#1f1f1f", width: "100%" };
  const requiredMark = <span style={{ color: "#ff4d4f", marginRight: 4 }}>*</span>;

  const handleUpdateSettings = () => {
    message.success("Settings updated successfully");
  };

  const handleSendTestEmail = () => {
    message.info("Test email sent (demo)");
  };

  const handleSendTestSms = () => {
    message.info("Test SMS sent (demo)");
  };

  const siderBg = isDark ? "rgba(255,255,255,0.03)" : "#fafafa";
  const contentBg = isDark ? "transparent" : "#ffffff";

  const businessForm = (
    <>
      <Row gutter={[24, 20]}>
        <Col xs={24} lg={8}>
          <Text style={labelStyle}>{requiredMark}Business Name:</Text>
          <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} style={inputStyle} placeholder="Business Name" />

          <Text style={{ ...labelStyle, marginTop: 16 }}>Currency Symbol Placement:</Text>
          <Select value={currencySymbolPlacement} onChange={setCurrencySymbolPlacement} style={inputStyle} options={[{ label: "Before amount", value: "before" }, { label: "After amount", value: "after" }]} />

          <Text style={{ ...labelStyle, marginTop: 16 }}>Upload Logo:</Text>
          <Space.Compact style={{ width: "100%" }}>
            <Input placeholder="File path" value={logoPath} onChange={(e) => setLogoPath(e.target.value)} style={inputStyle} />
            <Button style={{ borderRadius: "0 6px 6px 0" }}>Browse..</Button>
          </Space.Compact>
          <Text type="secondary" style={{ fontSize: 12, display: "block", marginTop: 4 }}>Previous logo (if exists) will be replaced</Text>

          <Text style={{ ...labelStyle, marginTop: 16 }}>{requiredMark}Date Format:</Text>
          <Select value={dateFormat} onChange={setDateFormat} style={inputStyle} suffixIcon={<CalendarOutlined />} options={[{ label: "mm/dd/yyyy", value: "mm/dd/yyyy" }, { label: "dd/mm/yyyy", value: "dd/mm/yyyy" }, { label: "yyyy-mm-dd", value: "yyyy-mm-dd" }]} />

          <Text style={{ ...labelStyle, marginTop: 16 }}>
            {requiredMark}Quantity precision:
            <Tooltip title="Decimal places for quantity fields">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Input type="number" min={0} max={6} value={quantityPrecision} onChange={(e) => setQuantityPrecision(Number(e.target.value) || 0)} style={inputStyle} />
        </Col>

        <Col xs={24} lg={8}>
          <Text style={labelStyle}>Start Date:</Text>
          <DatePicker value={startDate} onChange={(d) => d && setStartDate(d)} format="MM/DD/YYYY" style={inputStyle} />

          <Text style={{ ...labelStyle, marginTop: 16 }}>Time zone:</Text>
          <Select value={timeZone} onChange={setTimeZone} style={inputStyle} suffixIcon={<ClockCircleOutlined />} options={[{ label: "Africa/Dar_es_Salaam", value: "Africa/Dar_es_Salaam" }, { label: "UTC", value: "UTC" }, { label: "America/New_York", value: "America/New_York" }]} />

          <Text style={{ ...labelStyle, marginTop: 16 }}>
            Financial year start month:
            <Tooltip title="First month of your financial year">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Select value={financialYearStartMonth} onChange={setFinancialYearStartMonth} style={inputStyle} suffixIcon={<CalendarOutlined />} options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => ({ label: m, value: m }))} />

          <Text style={{ ...labelStyle, marginTop: 16 }}>{requiredMark}Time Format:</Text>
          <Select value={timeFormat} onChange={setTimeFormat} style={inputStyle} suffixIcon={<ClockCircleOutlined />} options={[{ label: "24 Hour", value: "24" }, { label: "12 Hour", value: "12" }]} />

          <div style={{ marginTop: 16 }}>
            <Checkbox checked={enableMultiCurrency} onChange={(e) => setEnableMultiCurrency(e.target.checked)}>Enable Multi Currency</Checkbox>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <Text style={labelStyle}>Currency:</Text>
          <Select value={currency} onChange={setCurrency} style={inputStyle} suffixIcon={<DollarOutlined />} options={[{ label: "Tanzania - Tanzanian shilling (TZS)", value: "TZS" }, { label: "United States - US Dollar (USD)", value: "USD" }, { label: "Kenya - Kenyan shilling (KES)", value: "KES" }]} />

          <Text style={{ ...labelStyle, marginTop: 16 }}>
            {requiredMark}Transaction Edit Days:
            <Tooltip title="Number of days within which transactions can be edited">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Input type="number" min={0} value={transactionEditDays} onChange={(e) => setTransactionEditDays(Number(e.target.value) || 0)} style={inputStyle} />

          <Text style={{ ...labelStyle, marginTop: 16 }}>
            Stock Accounting Method:
            <Tooltip title="Method used for stock valuation">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Select value={stockAccountingMethod} onChange={setStockAccountingMethod} style={inputStyle} options={[{ label: "FIFO (First In First Out)", value: "FIFO" }, { label: "LIFO (Last In First Out)", value: "LIFO" }, { label: "Average", value: "AVG" }]} />

          <Text style={{ ...labelStyle, marginTop: 16 }}>
            {requiredMark}Currency precision:
            <Tooltip title="Decimal places for currency">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Select value={currencyPrecision} onChange={(v) => setCurrencyPrecision(v)} style={inputStyle} options={[0, 1, 2, 3, 4].map((n) => ({ label: String(n), value: n }))} />
        </Col>
      </Row>

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
          Pricing & Profit Strategy
          <Tooltip title="How profit is calculated and displayed">
            <InfoCircleOutlined style={{ marginLeft: 8, color: "#1890ff", fontSize: 14 }} />
          </Tooltip>
        </Title>
        <Row gutter={24} align="middle">
          <Col xs={24} md={14}>
            <Radio.Group value={pricingStrategy} onChange={(e) => setPricingStrategy(e.target.value)}>
              <Space direction="vertical" size={12}>
                <Radio value="profit_margin">
                  <Text strong>Profit Margin</Text>
                  <div style={{ marginLeft: 24, marginTop: 4 }}>
                    <Text type="secondary" style={{ fontSize: 13 }}>— Tells you what percentage of selling price is profit.</Text>
                    <div style={{ color: "#1890ff", fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>Profit Margin = ((Selling Price - Cost Price) / Selling Price) × 100%</div>
                  </div>
                </Radio>
                <Radio value="markup">
                  <Text strong>Markup</Text>
                  <div style={{ marginLeft: 24, marginTop: 4 }}>
                    <Text type="secondary" style={{ fontSize: 13 }}>— Tells you what percentage is added to the costs of your products in order to make a profit.</Text>
                    <div style={{ color: "#1890ff", fontSize: 13, marginTop: 4, fontFamily: "monospace" }}>Markup = ((Selling Price - Cost Price) / Cost Price) × 100%</div>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </Col>
          <Col xs={24} md={6}>
            <Text style={labelStyle}>{requiredMark}Default Margin:</Text>
            <Input type="number" min={0} step={0.01} value={defaultMargin} onChange={(e) => setDefaultMargin(Number(e.target.value) || 0)} style={inputStyle} addonAfter="%" />
          </Col>
        </Row>
      </div>

      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const taxForm = (
    <>
      <Row gutter={[24, 20]}>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>
            Tax 1 Name:
            <Tooltip title="Name of the first tax (e.g. GST, VAT)">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Input placeholder="GST / VAT / Other" value={tax1Name} onChange={(e) => setTax1Name(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>
            Tax 1 No.:
            <Tooltip title="Tax registration or identification number">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Input placeholder="Tax 1 number" value={tax1No} onChange={(e) => setTax1No(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>
            Tax 2 Name:
            <Tooltip title="Name of the second tax (e.g. GST, VAT)">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Input placeholder="GST / VAT / Other" value={tax2Name} onChange={(e) => setTax2Name(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>
            Tax 2 No.:
            <Tooltip title="Tax registration or identification number">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Input placeholder="Tax 2 number" value={tax2No} onChange={(e) => setTax2No(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24}>
          <Checkbox checked={enableInlineTax} onChange={(e) => setEnableInlineTax(e.target.checked)}>Enable inline tax in purchase and sell</Checkbox>
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const productForm = (
    <>
      <Row gutter={[24, 20]}>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>SKU prefix:</Text>
          <Input placeholder="SKU prefix" value={skuPrefix} onChange={(e) => setSkuPrefix(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>
            Enable Product Expiry:
            <Tooltip title="Allow expiry date on products">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Checkbox checked={enableProductExpiry} onChange={(e) => setEnableProductExpiry(e.target.checked)}>Add item expiry</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Checkbox checked={enableBrands} onChange={(e) => setEnableBrands(e.target.checked)}>Enable Brands</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Checkbox checked={enableCategories} onChange={(e) => setEnableCategories(e.target.checked)}>Enable Categories</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Checkbox checked={enableSubCategories} onChange={(e) => setEnableSubCategories(e.target.checked)}>Enable Sub-Categories</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Checkbox checked={enablePriceTaxInfo} onChange={(e) => setEnablePriceTaxInfo(e.target.checked)}>Enable Price & Tax info</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Default Unit:</Text>
          <Select value={defaultUnit} onChange={setDefaultUnit} style={inputStyle} suffixIcon={<ColumnWidthOutlined />} placeholder="Please Select" allowClear options={[{ label: "Pieces (Pcs)", value: "pcs" }, { label: "Kilogram (Kg)", value: "kg" }, { label: "Liter (L)", value: "l" }, { label: "Meter (m)", value: "m" }, { label: "Box", value: "box" }]} />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>
            Enable Sub Units:
            <Tooltip title="Allow sub-units (e.g. 1 box = 12 pcs)">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Checkbox checked={enableSubUnits} onChange={(e) => setEnableSubUnits(e.target.checked)}>Enable Sub Units</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>
            Enable Racks:
            <Tooltip title="Organize stock by racks">
              <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
            </Tooltip>
          </Text>
          <Checkbox checked={enableRacks} onChange={(e) => setEnableRacks(e.target.checked)}>Enable Racks</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Checkbox checked={enableRow} onChange={(e) => setEnableRow(e.target.checked)}>Enable Row</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Checkbox checked={enablePosition} onChange={(e) => setEnablePosition(e.target.checked)}>Enable Position</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Checkbox checked={enableWarranty} onChange={(e) => setEnableWarranty(e.target.checked)}>Enable Warranty</Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Checkbox checked={isProductImageRequired} onChange={(e) => setIsProductImageRequired(e.target.checked)}>Is product image required?</Checkbox>
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const contactForm = (
    <>
      <Row gutter={[24, 20]}>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Default credit limit:</Text>
          <Input placeholder="Default credit limit" value={defaultCreditLimit} onChange={(e) => setDefaultCreditLimit(e.target.value)} style={inputStyle} />
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const saleForm = (
    <>
      <div style={{ marginBottom: 24 }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>General Sale Settings</Title>
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>{requiredMark}Default Sale Discount:</Text>
            <Input type="number" min={0} step={0.01} value={defaultSaleDiscount} onChange={(e) => setDefaultSaleDiscount(Number(e.target.value) || 0)} style={inputStyle} addonAfter="%" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Default Sale Tax:
              <Tooltip title="Default tax applied to sales">
                <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Select value={defaultSaleTax} onChange={setDefaultSaleTax} style={inputStyle} options={[{ label: "None", value: "none" }, { label: "VAT 18%", value: "vat18" }, { label: "GST 10%", value: "gst10" }]} />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>Sales Item Addition Method:</Text>
            <Select value={salesItemAdditionMethod} onChange={setSalesItemAdditionMethod} style={inputStyle} options={[{ label: "Increase item quantity if it already exists", value: "increase" }, { label: "Add as new line", value: "new_line" }]} />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Amount rounding method:
              <Tooltip title="How to round sale amounts">
                <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Select value={amountRoundingMethod} onChange={setAmountRoundingMethod} style={inputStyle} options={[{ label: "None", value: "none" }, { label: "Round to nearest", value: "nearest" }, { label: "Round up", value: "up" }, { label: "Round down", value: "down" }]} />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              <Tooltip title="Enforce minimum selling price">
                <InfoCircleOutlined style={{ marginRight: 6, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
              <Checkbox checked={salesPriceIsMinSellingPrice} onChange={(e) => setSalesPriceIsMinSellingPrice(e.target.checked)}>Sales price is minimum selling price</Checkbox>
            </Text>
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              <Tooltip title="Allow selling more than available stock">
                <InfoCircleOutlined style={{ marginRight: 6, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
              <Checkbox checked={allowOverselling} onChange={(e) => setAllowOverselling(e.target.checked)}>Allow Overselling</Checkbox>
            </Text>
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              <Tooltip title="Enable sales order workflow">
                <InfoCircleOutlined style={{ marginRight: 6, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
              <Checkbox checked={enableSalesOrder} onChange={(e) => setEnableSalesOrder(e.target.checked)}>Enable Sales Order</Checkbox>
            </Text>
          </Col>
          <Col xs={24} md={12}>
            <Checkbox checked={isPayTermRequired} onChange={(e) => setIsPayTermRequired(e.target.checked)}>Is pay term required?</Checkbox>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>Commission Agent Settings</Title>
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Sales Commission Agent:
              <Tooltip title="Commission agent for sales">
                <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Select value={salesCommissionAgent} onChange={setSalesCommissionAgent} style={inputStyle} options={[{ label: "Disable", value: "disable" }, { label: "Enable", value: "enable" }]} />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Commission Calculation Type:
              <Tooltip title="How commission is calculated">
                <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Select value={commissionCalculationType} onChange={setCommissionCalculationType} style={inputStyle} options={[{ label: "Invoice value", value: "invoice_value" }, { label: "Profit", value: "profit" }, { label: "Fixed", value: "fixed" }]} />
          </Col>
          <Col xs={24} md={12}>
            <Checkbox checked={isCommissionAgentRequired} onChange={(e) => setIsCommissionAgentRequired(e.target.checked)}>Is commission agent required?</Checkbox>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
          Payment Link & Gateway Settings
          <Tooltip title="Payment link and gateway configuration">
            <InfoCircleOutlined style={{ marginLeft: 8, color: "#1890ff", fontSize: 14 }} />
          </Tooltip>
        </Title>
        <Row gutter={[24, 20]}>
          <Col xs={24}>
            <Text style={labelStyle}>Payment Link</Text>
            <Checkbox checked={enablePaymentLink} onChange={(e) => setEnablePaymentLink(e.target.checked)}>Enable payment link</Checkbox>
          </Col>
          <Col xs={24}>
            <Text style={{ ...labelStyle, marginTop: 16 }}>Razorpay: (For INR India)</Text>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Text style={labelStyle}>Key ID:</Text>
                <Input placeholder="Razorpay Key ID" value={razorpayKeyId} onChange={(e) => setRazorpayKeyId(e.target.value)} style={inputStyle} />
              </Col>
              <Col xs={24} md={12}>
                <Text style={labelStyle}>Key Secret:</Text>
                <Input.Password placeholder="Razorpay Key Secret" value={razorpayKeySecret} onChange={(e) => setRazorpayKeySecret(e.target.value)} style={inputStyle} />
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Text style={{ ...labelStyle, marginTop: 16 }}>Stripe:</Text>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Text style={labelStyle}>Stripe public key:</Text>
                <Input placeholder="Stripe public key" value={stripePublicKey} onChange={(e) => setStripePublicKey(e.target.value)} style={inputStyle} />
              </Col>
              <Col xs={24} md={12}>
                <Text style={labelStyle}>Stripe secret key:</Text>
                <Input.Password placeholder="Stripe secret key" value={stripeSecretKey} onChange={(e) => setStripeSecretKey(e.target.value)} style={inputStyle} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const posShortcutsDataSource = [
    { key: "1", operation: "Express Checkout", value: posExpressCheckout, setValue: setPosExpressCheckout },
    { key: "2", operation: "Pay & Checkout", value: posPayCheckout, setValue: setPosPayCheckout },
    { key: "3", operation: "Draft", value: posDraft, setValue: setPosDraft },
    { key: "4", operation: "Cancel", value: posCancel, setValue: setPosCancel },
    { key: "5", operation: "Go to product quantity", value: posGoToProductQty, setValue: setPosGoToProductQty },
    { key: "6", operation: "Weighing Scale", value: posWeighingScale, setValue: setPosWeighingScale },
    { key: "7", operation: "Edit Discount", value: posEditDiscount, setValue: setPosEditDiscount },
    { key: "8", operation: "Edit Order Tax", value: posEditOrderTax, setValue: setPosEditOrderTax },
    { key: "9", operation: "Add Payment Row", value: posAddPaymentRow, setValue: setPosAddPaymentRow },
    { key: "10", operation: "Finalize Payment", value: posFinalizePayment, setValue: setPosFinalizePayment },
    { key: "11", operation: "Add new product", value: posAddNewProduct, setValue: setPosAddNewProduct },
  ];

  const posForm = (
    <>
      <div style={{ marginBottom: 24 }}>
        <Title level={5} style={{ marginBottom: 8, color: isDark ? "#fff" : "#1f1f1f" }}>Add keyboard shortcuts:</Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 8, fontSize: 13 }}>
          Shortcut should be the names of the keys separated by &apos;+&apos;; Example: ctrl+shift+b, ctrl+h
        </Text>
        <Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 12 }}>
          Available key names are: shift, ctrl, alt, backspace, tab, enter, return, capslock, esc, escape, space, pageup, pagedown, end, home, left, up, right, down, ins, del, and plus
        </Text>
        <Table
          dataSource={posShortcutsDataSource}
          pagination={false}
          size="small"
          style={{ maxWidth: 720 }}
          columns={[
            { title: "Operations", dataIndex: "operation", key: "operation", width: "50%", render: (t: string) => <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>{t}</Text> },
            {
              title: "Keyboard Shortcut",
              key: "shortcut",
              width: "50%",
              render: (_: unknown, r: { value: string; setValue: (v: string) => void }) => (
                <Input placeholder="e.g. shift+e" value={r.value} onChange={(e) => r.setValue(e.target.value)} style={inputStyle} />
              ),
            },
          ]}
        />
      </div>

      <div style={{ marginBottom: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>POS settings:</Title>
        <Row gutter={[24, 12]}>
          <Col xs={24} md={8}>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posDisableMultiplePay} onChange={(e) => setPosDisableMultiplePay(e.target.checked)}>Disable Multiple Pay</Checkbox></div>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posDontShowProductSuggestion} onChange={(e) => setPosDontShowProductSuggestion(e.target.checked)}>Don&apos;t show product suggestion</Checkbox></div>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posDisableOrderTax} onChange={(e) => setPosDisableOrderTax(e.target.checked)}>Disable order tax</Checkbox></div>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posEnableTransactionDate} onChange={(e) => setPosEnableTransactionDate(e.target.checked)}>Enable transaction date on POS screen</Checkbox></div>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posIsServiceStaffRequired} onChange={(e) => setPosIsServiceStaffRequired(e.target.checked)}>Is service staff required</Checkbox></div>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posShowInvoiceScheme} onChange={(e) => setPosShowInvoiceScheme(e.target.checked)}>Show invoice scheme</Checkbox></div>
            <div><Checkbox checked={posShowPricingOnSuggestion} onChange={(e) => setPosShowPricingOnSuggestion(e.target.checked)}>Show pricing on product suggestion tooltip</Checkbox></div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posDisableDraft} onChange={(e) => setPosDisableDraft(e.target.checked)}>Disable Draft</Checkbox></div>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posDontShowRecentTransactions} onChange={(e) => setPosDontShowRecentTransactions(e.target.checked)}>Don&apos;t show recent transactions</Checkbox></div>
            <div style={{ marginBottom: 8 }}>
              <Checkbox checked={posSubtotalEditable} onChange={(e) => setPosSubtotalEditable(e.target.checked)}>
                Subtotal Editable <Tooltip title="Allow editing subtotal on POS"><InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} /></Tooltip>
              </Checkbox>
            </div>
            <div style={{ marginBottom: 8 }}>
              <Checkbox checked={posDisableCreditSaleButton} onChange={(e) => setPosDisableCreditSaleButton(e.target.checked)}>
                Disable credit sale button <Tooltip title="Hide credit sale option on POS"><InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} /></Tooltip>
              </Checkbox>
            </div>
            <div><Checkbox checked={posShowInvoiceLayoutDropdown} onChange={(e) => setPosShowInvoiceLayoutDropdown(e.target.checked)}>Show invoice layout dropdown</Checkbox></div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posDisableExpressCheckout} onChange={(e) => setPosDisableExpressCheckout(e.target.checked)}>Disable Express Checkout</Checkbox></div>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posDisableDiscount} onChange={(e) => setPosDisableDiscount(e.target.checked)}>Disable Discount</Checkbox></div>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posDisableSuspendSale} onChange={(e) => setPosDisableSuspendSale(e.target.checked)}>Disable Suspend Sale</Checkbox></div>
            <div style={{ marginBottom: 8 }}>
              <Checkbox checked={posEnableServiceStaffInLine} onChange={(e) => setPosEnableServiceStaffInLine(e.target.checked)}>
                Enable service staff in product line <Tooltip title="Show service staff selector per line"><InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} /></Tooltip>
              </Checkbox>
            </div>
            <div style={{ marginBottom: 8 }}><Checkbox checked={posEnableWeighingScale} onChange={(e) => setPosEnableWeighingScale(e.target.checked)}>Enable Weighing Scale</Checkbox></div>
            <div><Checkbox checked={posPrintInvoiceOnSuspend} onChange={(e) => setPosPrintInvoiceOnSuspend(e.target.checked)}>Print invoice on suspend</Checkbox></div>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 8, color: isDark ? "#fff" : "#1f1f1f" }}>Weighing Scale barcode Setting</Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 13 }}>Configure barcode as per your weighing scale.</Text>
        <Row gutter={[24, 20]}>
          <Col xs={24} md={8}>
            <Text style={labelStyle}>Prefix:</Text>
            <Input placeholder="Prefix" value={weighingScalePrefix} onChange={(e) => setWeighingScalePrefix(e.target.value)} style={inputStyle} />
          </Col>
          <Col xs={24} md={8}>
            <Text style={labelStyle}>Product sku length:</Text>
            <Select value={weighingScaleProductSkuLength} onChange={setWeighingScaleProductSkuLength} style={inputStyle} options={[3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({ label: String(n), value: n }))} />
          </Col>
          <Col xs={24} md={8}>
            <Text style={labelStyle}>Quantity integer part length:</Text>
            <Select value={weighingScaleQtyIntLength} onChange={setWeighingScaleQtyIntLength} style={inputStyle} options={[2, 3, 4, 5, 6].map((n) => ({ label: String(n), value: n }))} />
          </Col>
          <Col xs={24} md={8}>
            <Text style={labelStyle}>Quantity fractional part length:</Text>
            <Select value={weighingScaleQtyFracLength} onChange={setWeighingScaleQtyFracLength} style={inputStyle} options={[1, 2, 3, 4, 5].map((n) => ({ label: String(n), value: n }))} />
          </Col>
        </Row>
      </div>

      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const purchasesForm = (
    <>
      <Row gutter={[24, 12]}>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={purchasesEnableEditPrice} onChange={(e) => setPurchasesEnableEditPrice(e.target.checked)}>
              Enable editing product price from purchase screen
              <Tooltip title="Allow changing product price when adding purchase">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={purchasesEnableLotNumber} onChange={(e) => setPurchasesEnableLotNumber(e.target.checked)}>
              Enable Lot number
              <Tooltip title="Track products by lot/batch number">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Checkbox>
          </div>
          <div>
            <Checkbox checked={purchasesEnableRequisition} onChange={(e) => setPurchasesEnableRequisition(e.target.checked)}>
              Enable Purchase Requisition
              <Tooltip title="Use purchase requisition workflow before creating orders">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Checkbox>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={purchasesEnableStatus} onChange={(e) => setPurchasesEnableStatus(e.target.checked)}>
              Enable Purchase Status
              <Tooltip title="Show and manage purchase status (e.g. ordered, received)">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={purchasesEnableOrder} onChange={(e) => setPurchasesEnableOrder(e.target.checked)}>
              Enable purchase order
              <Tooltip title="Create and use purchase orders before receiving stock">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Checkbox>
          </div>
          <div>
            <Checkbox checked={purchasesConfirmOrder} onChange={(e) => setPurchasesConfirmOrder(e.target.checked)}>
              Confirm purchase order
              <Tooltip title="Require confirmation before purchase order is finalized">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Checkbox>
          </div>
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const dashboardForm = (
    <>
      <Row gutter={[24, 20]}>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>
            {requiredMark}View Stock Expiry Alert For:
          </Text>
          <Input
            type="number"
            min={1}
            value={dashboardViewStockExpiryAlertFor}
            onChange={(e) => setDashboardViewStockExpiryAlertFor(Number(e.target.value) || 0)}
            style={inputStyle}
            prefix={<CalendarOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
            addonAfter="Days"
          />
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const systemForm = (
    <>
      <Row gutter={[24, 20]}>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Theme Color:</Text>
          <Select
            value={systemThemeColor}
            onChange={setSystemThemeColor}
            style={inputStyle}
            placeholder="Please Select"
            allowClear
            options={[
              { label: "Blue", value: "blue" },
              { label: "Green", value: "green" },
              { label: "Red", value: "red" },
              { label: "Purple", value: "purple" },
              { label: "Orange", value: "orange" },
            ]}
          />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Default datatable page entries:</Text>
          <Select
            value={systemDefaultDatatableEntries}
            onChange={setSystemDefaultDatatableEntries}
            style={inputStyle}
            options={[
              { label: "10", value: 10 },
              { label: "25", value: 25 },
              { label: "50", value: 50 },
              { label: "100", value: 100 },
            ]}
          />
        </Col>
        <Col xs={24}>
          <Checkbox checked={systemShowHelpText} onChange={(e) => setSystemShowHelpText(e.target.checked)}>
            Show help text
          </Checkbox>
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const prefixesForm = (
    <>
      <Row gutter={[24, 16]}>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Purchase:</Text>
          <Input value={prefixPurchase} onChange={(e) => setPrefixPurchase(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Purchase Order:</Text>
          <Input value={prefixPurchaseOrder} onChange={(e) => setPrefixPurchaseOrder(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Sell Return:</Text>
          <Input value={prefixSellReturn} onChange={(e) => setPrefixSellReturn(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Purchase Payment:</Text>
          <Input value={prefixPurchasePayment} onChange={(e) => setPrefixPurchasePayment(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Business Location:</Text>
          <Input value={prefixBusinessLocation} onChange={(e) => setPrefixBusinessLocation(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Draft:</Text>
          <Input value={prefixDraft} onChange={(e) => setPrefixDraft(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Purchase Return:</Text>
          <Input value={prefixPurchaseReturn} onChange={(e) => setPrefixPurchaseReturn(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Stock Transfer:</Text>
          <Input value={prefixStockTransfer} onChange={(e) => setPrefixStockTransfer(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Expenses:</Text>
          <Input value={prefixExpenses} onChange={(e) => setPrefixExpenses(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Sell Payment:</Text>
          <Input value={prefixSellPayment} onChange={(e) => setPrefixSellPayment(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Username:</Text>
          <Input value={prefixUsername} onChange={(e) => setPrefixUsername(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Sales Order:</Text>
          <Input value={prefixSalesOrder} onChange={(e) => setPrefixSalesOrder(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Purchase Requisition:</Text>
          <Input value={prefixPurchaseRequisition} onChange={(e) => setPrefixPurchaseRequisition(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Stock Adjustment:</Text>
          <Input value={prefixStockAdjustment} onChange={(e) => setPrefixStockAdjustment(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Contacts:</Text>
          <Input value={prefixContacts} onChange={(e) => setPrefixContacts(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Expense Payment:</Text>
          <Input value={prefixExpensePayment} onChange={(e) => setPrefixExpensePayment(e.target.value)} style={inputStyle} />
          <Text style={{ ...labelStyle, marginTop: 16 }}>Subscription No.:</Text>
          <Input value={prefixSubscriptionNo} onChange={(e) => setPrefixSubscriptionNo(e.target.value)} style={inputStyle} />
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const emailSettingsForm = (
    <>
      <Row gutter={[24, 20]}>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Mail Driver:</Text>
          <Select
            value={emailMailDriver}
            onChange={setEmailMailDriver}
            style={inputStyle}
            options={[
              { label: "SMTP", value: "smtp" },
              { label: "Sendmail", value: "sendmail" },
              { label: "Mailgun", value: "mailgun" },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Host:</Text>
          <Input value={emailHost} onChange={(e) => setEmailHost(e.target.value)} style={inputStyle} placeholder="Host" />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Port:</Text>
          <Input value={emailPort} onChange={(e) => setEmailPort(e.target.value)} style={inputStyle} placeholder="Port" />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Username:</Text>
          <Input value={emailUsername} onChange={(e) => setEmailUsername(e.target.value)} style={inputStyle} placeholder="Username" />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Password:</Text>
          <Input.Password value={emailPassword} onChange={(e) => setEmailPassword(e.target.value)} style={inputStyle} placeholder="Password" />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Encryption:</Text>
          <Select
            value={emailEncryption}
            onChange={setEmailEncryption}
            style={inputStyle}
            options={[
              { label: "tls / ssl", value: "tls" },
              { label: "ssl", value: "ssl" },
              { label: "None", value: "none" },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>From Address:</Text>
          <Input value={emailFromAddress} onChange={(e) => setEmailFromAddress(e.target.value)} style={inputStyle} placeholder="From Address" />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>From Name:</Text>
          <Input value={emailFromName} onChange={(e) => setEmailFromName(e.target.value)} style={inputStyle} placeholder="From Name" />
        </Col>
        <Col xs={24} md={8} style={{ display: "flex", alignItems: "flex-end", paddingBottom: 4 }}>
          <Button type="primary" onClick={handleSendTestEmail} style={{ borderRadius: 6, background: "#52c41a", borderColor: "#52c41a" }}>
            Send test email
          </Button>
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const smsSettingsForm = (
    <>
      <Row gutter={[24, 20]}>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>SMS Service:</Text>
          <Select value={smsService} onChange={setSmsService} style={inputStyle} options={[{ label: "Other", value: "other" }, { label: "Twilio", value: "twilio" }, { label: "Nexmo", value: "nexmo" }]} />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>URL:</Text>
          <Input value={smsUrl} onChange={(e) => setSmsUrl(e.target.value)} style={inputStyle} placeholder="URL" />
        </Col>
        <Col xs={24} md={8}>
          <Text style={labelStyle}>Request Method:</Text>
          <Select value={smsRequestMethod} onChange={setSmsRequestMethod} style={inputStyle} options={[{ label: "POST", value: "POST" }, { label: "GET", value: "GET" }]} />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Send to parameter name:</Text>
          <Input value={smsSendToParam} onChange={(e) => setSmsSendToParam(e.target.value)} style={inputStyle} placeholder="to" />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Message parameter name:</Text>
          <Input value={smsMessageParam} onChange={(e) => setSmsMessageParam(e.target.value)} style={inputStyle} placeholder="text" />
        </Col>
      </Row>

      <div style={{ marginTop: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>Header Configuration</Title>
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>Header 1 key:</Text>
            <Input value={smsHeader1Key} onChange={(e) => setSmsHeader1Key(e.target.value)} style={inputStyle} placeholder="Header 1 key" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>Header 1 value:</Text>
            <Input value={smsHeader1Value} onChange={(e) => setSmsHeader1Value(e.target.value)} style={inputStyle} placeholder="Header 1 value" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>Header 2 key:</Text>
            <Input value={smsHeader2Key} onChange={(e) => setSmsHeader2Key(e.target.value)} style={inputStyle} placeholder="Header 2 key" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>Header 2 value:</Text>
            <Input value={smsHeader2Value} onChange={(e) => setSmsHeader2Value(e.target.value)} style={inputStyle} placeholder="Header 2 value" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>Header 3 key:</Text>
            <Input value={smsHeader3Key} onChange={(e) => setSmsHeader3Key(e.target.value)} style={inputStyle} placeholder="Header 3 key" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>Header 3 value:</Text>
            <Input value={smsHeader3Value} onChange={(e) => setSmsHeader3Value(e.target.value)} style={inputStyle} placeholder="Header 3 value" />
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>Parameter Configuration</Title>
        <Row gutter={[24, 16]}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <React.Fragment key={n}>
              <Col xs={24} md={12}>
                <Text style={labelStyle}>Parameter {n} key:</Text>
                <Input
                  value={n === 1 ? smsParam1Key : n === 2 ? smsParam2Key : n === 3 ? smsParam3Key : n === 4 ? smsParam4Key : n === 5 ? smsParam5Key : n === 6 ? smsParam6Key : n === 7 ? smsParam7Key : n === 8 ? smsParam8Key : n === 9 ? smsParam9Key : smsParam10Key}
                  onChange={(e) => { const v = e.target.value; if (n === 1) setSmsParam1Key(v); else if (n === 2) setSmsParam2Key(v); else if (n === 3) setSmsParam3Key(v); else if (n === 4) setSmsParam4Key(v); else if (n === 5) setSmsParam5Key(v); else if (n === 6) setSmsParam6Key(v); else if (n === 7) setSmsParam7Key(v); else if (n === 8) setSmsParam8Key(v); else if (n === 9) setSmsParam9Key(v); else setSmsParam10Key(v); }}
                  style={inputStyle}
                  placeholder={`Parameter ${n} value`}
                />
              </Col>
              <Col xs={24} md={12}>
                <Text style={labelStyle}>Parameter {n} value:</Text>
                <Input
                  value={n === 1 ? smsParam1Value : n === 2 ? smsParam2Value : n === 3 ? smsParam3Value : n === 4 ? smsParam4Value : n === 5 ? smsParam5Value : n === 6 ? smsParam6Value : n === 7 ? smsParam7Value : n === 8 ? smsParam8Value : n === 9 ? smsParam9Value : smsParam10Value}
                  onChange={(e) => { const v = e.target.value; if (n === 1) setSmsParam1Value(v); else if (n === 2) setSmsParam2Value(v); else if (n === 3) setSmsParam3Value(v); else if (n === 4) setSmsParam4Value(v); else if (n === 5) setSmsParam5Value(v); else if (n === 6) setSmsParam6Value(v); else if (n === 7) setSmsParam7Value(v); else if (n === 8) setSmsParam8Value(v); else if (n === 9) setSmsParam9Value(v); else setSmsParam10Value(v); }}
                  style={inputStyle}
                  placeholder={`Parameter ${n} value`}
                />
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </div>

      <div style={{ marginTop: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Row gutter={[24, 20]} align="bottom">
          <Col xs={24} md={12}>
            <Text style={labelStyle}>Test Number</Text>
            <Input value={smsTestNumber} onChange={(e) => setSmsTestNumber(e.target.value)} style={inputStyle} placeholder="Test Number" />
          </Col>
          <Col xs={24} md={12} style={{ paddingBottom: 4 }}>
            <Button type="primary" onClick={handleSendTestSms} style={{ borderRadius: 6, background: "#52c41a", borderColor: "#52c41a" }}>
              Send test SMS
            </Button>
          </Col>
        </Row>
      </div>

      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const rewardPointSettingsForm = (
    <>
      <Row gutter={[24, 20]}>
        <Col xs={24}>
          <Checkbox checked={rewardEnableRewardPoint} onChange={(e) => setRewardEnableRewardPoint(e.target.checked)}>
            Enable Reward Point
          </Checkbox>
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Reward Point Display Name:</Text>
          <Input value={rewardDisplayName} onChange={(e) => setRewardDisplayName(e.target.value)} style={inputStyle} placeholder="Reward Point Display Name" />
        </Col>
      </Row>

      <div style={{ marginTop: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>Earning Points Settings:</Title>
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Amount spend for unit point:
              <Tooltip title="Amount in currency that earns one reward point">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Input value={rewardAmountSpendForUnitPoint} onChange={(e) => setRewardAmountSpendForUnitPoint(e.target.value)} style={inputStyle} placeholder="1.00" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Minimum order total to earn reward:
              <Tooltip title="Minimum order total required to earn reward points">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Input value={rewardMinimumOrderTotalToEarn} onChange={(e) => setRewardMinimumOrderTotalToEarn(e.target.value)} style={inputStyle} placeholder="1.00" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Maximum points per order:
              <Tooltip title="Maximum reward points that can be earned in a single order">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Input value={rewardMaximumPointsPerOrder} onChange={(e) => setRewardMaximumPointsPerOrder(e.target.value)} style={inputStyle} placeholder="Maximum points per order" />
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>Redeem Points Settings:</Title>
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Redeem amount per unit point:
              <Tooltip title="Currency value per reward point when redeeming">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Input value={rewardRedeemAmountPerUnitPoint} onChange={(e) => setRewardRedeemAmountPerUnitPoint(e.target.value)} style={inputStyle} placeholder="1.00" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Minimum order total to redeem points:
              <Tooltip title="Minimum order total required to redeem points">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Input value={rewardMinimumOrderTotalToRedeem} onChange={(e) => setRewardMinimumOrderTotalToRedeem(e.target.value)} style={inputStyle} placeholder="1.00" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Minimum redeem point:
              <Tooltip title="Minimum points required to redeem">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Input value={rewardMinimumRedeemPoint} onChange={(e) => setRewardMinimumRedeemPoint(e.target.value)} style={inputStyle} placeholder="Minimum redeem point" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Maximum redeem point per order:
              <Tooltip title="Maximum points that can be redeemed in a single order">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Input value={rewardMaximumRedeemPointPerOrder} onChange={(e) => setRewardMaximumRedeemPointPerOrder(e.target.value)} style={inputStyle} placeholder="Maximum redeem point per order" />
          </Col>
          <Col xs={24} md={12}>
            <Text style={labelStyle}>
              Reward Point expiry period:
              <Tooltip title="How long reward points remain valid">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Input.Group compact style={{ display: "flex" }}>
              <Input value={rewardExpiryPeriod} onChange={(e) => setRewardExpiryPeriod(e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder="Reward Point expiry period" />
              <Select value={rewardExpiryUnit} onChange={setRewardExpiryUnit} style={{ ...inputStyle, minWidth: 100 }} options={[{ label: "Day", value: "day" }, { label: "Month", value: "month" }, { label: "Year", value: "year" }]} />
            </Input.Group>
          </Col>
        </Row>
      </div>

      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const infoIcon = (title: string) => (
    <Tooltip title={title}>
      <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
    </Tooltip>
  );

  const modulesForm = (
    <>
      <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>Enable/Disable Modules</Title>
      <Row gutter={[24, 12]}>
        <Col xs={24} md={8}>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modProduct} onChange={(e) => setModProduct(e.target.checked)}>Product</Checkbox></div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modPos} onChange={(e) => setModPos(e.target.checked)}>POS</Checkbox></div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modExpenses} onChange={(e) => setModExpenses(e.target.checked)}>Expenses</Checkbox></div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modModifiers} onChange={(e) => setModModifiers(e.target.checked)}>
              Modifiers {infoIcon("Product modifiers and add-ons")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modKitchen} onChange={(e) => setModKitchen(e.target.checked)}>Kitchen (For restaurants)</Checkbox></div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modStockTaking} onChange={(e) => setModStockTaking(e.target.checked)}>Stock Taking</Checkbox></div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modManufacturing} onChange={(e) => setModManufacturing(e.target.checked)}>
              Manufacturing {infoIcon("Manufacturing and production")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modHms} onChange={(e) => setModHms(e.target.checked)}>
              HMS {infoIcon("Hotel Management System")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modAccounting} onChange={(e) => setModAccounting(e.target.checked)}>Accounting</Checkbox></div>
          <div><Checkbox checked={modSpreadsheet} onChange={(e) => setModSpreadsheet(e.target.checked)}>Spreadsheet</Checkbox></div>
        </Col>
        <Col xs={24} md={8}>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modPurchases} onChange={(e) => setModPurchases(e.target.checked)}>Purchases</Checkbox></div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modStockTransfers} onChange={(e) => setModStockTransfers(e.target.checked)}>Stock Transfers</Checkbox></div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modAccount} onChange={(e) => setModAccount(e.target.checked)}>Account</Checkbox></div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modServiceStaff} onChange={(e) => setModServiceStaff(e.target.checked)}>
              Service staff {infoIcon("Service staff assignment")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modEnableSubscription} onChange={(e) => setModEnableSubscription(e.target.checked)}>Enable Subscription</Checkbox></div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modEssentials} onChange={(e) => setModEssentials(e.target.checked)}>
              Essentials {infoIcon("Essential features pack")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modProject} onChange={(e) => setModProject(e.target.checked)}>
              Project {infoIcon("Project management")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modCrm} onChange={(e) => setModCrm(e.target.checked)}>
              CRM {infoIcon("Customer Relationship Management")}
            </Checkbox>
          </div>
          <div>
            <Checkbox checked={modAssetManagement} onChange={(e) => setModAssetManagement(e.target.checked)}>
              Asset Management {infoIcon("Fixed assets and depreciation")}
            </Checkbox>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modAddSale} onChange={(e) => setModAddSale(e.target.checked)}>Add Sale</Checkbox></div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modStockAdjustment} onChange={(e) => setModStockAdjustment(e.target.checked)}>Stock Adjustment</Checkbox></div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modTables} onChange={(e) => setModTables(e.target.checked)}>
              Tables {infoIcon("Table management for restaurants")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}><Checkbox checked={modEnableBookings} onChange={(e) => setModEnableBookings(e.target.checked)}>Enable Bookings</Checkbox></div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modTypesOfService} onChange={(e) => setModTypesOfService(e.target.checked)}>
              Types of service {infoIcon("Service types and categories")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modWoocommerce} onChange={(e) => setModWoocommerce(e.target.checked)}>
              Woocommerce {infoIcon("WooCommerce integration")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modRepair} onChange={(e) => setModRepair(e.target.checked)}>
              Repair {infoIcon("Repair and maintenance")}
            </Checkbox>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Checkbox checked={modProductCatalogue} onChange={(e) => setModProductCatalogue(e.target.checked)}>
              ProductCatalogue {infoIcon("Product catalogue")}
            </Checkbox>
          </div>
          <div>
            <Checkbox checked={modCms} onChange={(e) => setModCms(e.target.checked)}>
              CMS {infoIcon("Content Management System")}
            </Checkbox>
          </div>
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const clSection = (title: string, children: React.ReactNode) => (
    <div style={{ marginTop: 24, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
      <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>{title}</Title>
      {children}
    </div>
  );

  const productFieldState = [
    [clProduct1, setClProduct1, clProduct1Type, setClProduct1Type], [clProduct2, setClProduct2, clProduct2Type, setClProduct2Type],
    [clProduct3, setClProduct3, clProduct3Type, setClProduct3Type], [clProduct4, setClProduct4, clProduct4Type, setClProduct4Type],
    [clProduct5, setClProduct5, clProduct5Type, setClProduct5Type], [clProduct6, setClProduct6, clProduct6Type, setClProduct6Type],
    [clProduct7, setClProduct7, clProduct7Type, setClProduct7Type], [clProduct8, setClProduct8, clProduct8Type, setClProduct8Type],
    [clProduct9, setClProduct9, clProduct9Type, setClProduct9Type], [clProduct10, setClProduct10, clProduct10Type, setClProduct10Type],
    [clProduct11, setClProduct11, clProduct11Type, setClProduct11Type], [clProduct12, setClProduct12, clProduct12Type, setClProduct12Type],
    [clProduct13, setClProduct13, clProduct13Type, setClProduct13Type], [clProduct14, setClProduct14, clProduct14Type, setClProduct14Type],
    [clProduct15, setClProduct15, clProduct15Type, setClProduct15Type], [clProduct16, setClProduct16, clProduct16Type, setClProduct16Type],
    [clProduct17, setClProduct17, clProduct17Type, setClProduct17Type], [clProduct18, setClProduct18, clProduct18Type, setClProduct18Type],
    [clProduct19, setClProduct19, clProduct19Type, setClProduct19Type], [clProduct20, setClProduct20, clProduct20Type, setClProduct20Type],
  ] as const;

  const customLabelsForm = (
    <>
      {clSection("Labels for custom payments:", (
        <Row gutter={[24, 20]}>
          <Col xs={24} md={8}><Text style={labelStyle}>Custom Payment 1</Text><Input value={clPayment1} onChange={(e) => setClPayment1(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={8}><Text style={labelStyle}>Custom Payment 2</Text><Input value={clPayment2} onChange={(e) => setClPayment2(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={8}><Text style={labelStyle}>Custom Payment 3</Text><Input value={clPayment3} onChange={(e) => setClPayment3(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={8}><Text style={labelStyle}>Custom Payment 4</Text><Input value={clPayment4} onChange={(e) => setClPayment4(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={8}><Text style={labelStyle}>Custom Payment 5</Text><Input value={clPayment5} onChange={(e) => setClPayment5(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={8}><Text style={labelStyle}>Custom Payment 6</Text><Input value={clPayment6} onChange={(e) => setClPayment6(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={8}><Text style={labelStyle}>Custom Payment 7</Text><Input value={clPayment7} onChange={(e) => setClPayment7(e.target.value)} style={inputStyle} /></Col>
        </Row>
      ))}

      {clSection("Labels for contact custom fields:", (
        <Row gutter={[24, 20]}>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 1</Text><Input value={clContact1} onChange={(e) => setClContact1(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 2</Text><Input value={clContact2} onChange={(e) => setClContact2(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 3</Text><Input value={clContact3} onChange={(e) => setClContact3(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 4</Text><Input value={clContact4} onChange={(e) => setClContact4(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 5</Text><Input value={clContact5} onChange={(e) => setClContact5(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 6</Text><Input value={clContact6} onChange={(e) => setClContact6(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 7</Text><Input value={clContact7} onChange={(e) => setClContact7(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 8</Text><Input value={clContact8} onChange={(e) => setClContact8(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 9</Text><Input value={clContact9} onChange={(e) => setClContact9(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom Field 10</Text><Input value={clContact10} onChange={(e) => setClContact10(e.target.value)} style={inputStyle} /></Col>
        </Row>
      ))}

      {clSection("Labels for product custom fields:", (
        <Row gutter={[24, 16]}>
          {productFieldState.map(([val, setVal, typeVal, setTypeVal], idx) => (
            <Col xs={24} md={8} key={idx}>
              <Text style={labelStyle}>Custom Field {idx + 1}</Text>
              <Input.Group compact style={{ display: "flex" }}>
                <Input value={val} onChange={(e) => setVal(e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder={`Custom Field ${idx + 1}`} />
                <Select value={typeVal} onChange={setTypeVal} style={{ ...inputStyle, minWidth: 120 }} placeholder="Field Type" allowClear options={fieldTypeOptions} />
              </Input.Group>
            </Col>
          ))}
        </Row>
      ))}

      {clSection("Labels for location custom fields:", (
        <Row gutter={[24, 20]}>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom field 1</Text><Input value={clLocation1} onChange={(e) => setClLocation1(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom field 2</Text><Input value={clLocation2} onChange={(e) => setClLocation2(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom field 3</Text><Input value={clLocation3} onChange={(e) => setClLocation3(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom field 4</Text><Input value={clLocation4} onChange={(e) => setClLocation4(e.target.value)} style={inputStyle} /></Col>
        </Row>
      ))}

      {clSection("Labels for user custom fields:", (
        <Row gutter={[24, 20]}>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom field 1</Text><Input value={clUser1} onChange={(e) => setClUser1(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom field 2</Text><Input value={clUser2} onChange={(e) => setClUser2(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom field 3</Text><Input value={clUser3} onChange={(e) => setClUser3(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={6}><Text style={labelStyle}>Custom field 4</Text><Input value={clUser4} onChange={(e) => setClUser4(e.target.value)} style={inputStyle} /></Col>
        </Row>
      ))}

      {clSection("Label for purchase custom fields:", (
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field1</Text><Input value={clPurchase1} onChange={(e) => setClPurchase1(e.target.value)} style={inputStyle} /><Checkbox checked={clPurchase1Required} onChange={(e) => setClPurchase1Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field2</Text><Input value={clPurchase2} onChange={(e) => setClPurchase2(e.target.value)} style={inputStyle} /><Checkbox checked={clPurchase2Required} onChange={(e) => setClPurchase2Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field3</Text><Input value={clPurchase3} onChange={(e) => setClPurchase3(e.target.value)} style={inputStyle} /><Checkbox checked={clPurchase3Required} onChange={(e) => setClPurchase3Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field4</Text><Input value={clPurchase4} onChange={(e) => setClPurchase4(e.target.value)} style={inputStyle} /><Checkbox checked={clPurchase4Required} onChange={(e) => setClPurchase4Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
        </Row>
      ))}

      {clSection("Labels for purchase shipping custom fields:", (
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 1</Text><Input value={clPurchaseShip1} onChange={(e) => setClPurchaseShip1(e.target.value)} style={inputStyle} /><Checkbox checked={clPurchaseShip1Required} onChange={(e) => setClPurchaseShip1Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 2</Text><Input value={clPurchaseShip2} onChange={(e) => setClPurchaseShip2(e.target.value)} style={inputStyle} /><Checkbox checked={clPurchaseShip2Required} onChange={(e) => setClPurchaseShip2Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 3</Text><Input value={clPurchaseShip3} onChange={(e) => setClPurchaseShip3(e.target.value)} style={inputStyle} /><Checkbox checked={clPurchaseShip3Required} onChange={(e) => setClPurchaseShip3Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 4</Text><Input value={clPurchaseShip4} onChange={(e) => setClPurchaseShip4(e.target.value)} style={inputStyle} /><Checkbox checked={clPurchaseShip4Required} onChange={(e) => setClPurchaseShip4Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
        </Row>
      ))}

      {clSection("Labels for sell custom fields:", (
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field1</Text><Input value={clSell1} onChange={(e) => setClSell1(e.target.value)} style={inputStyle} /><Checkbox checked={clSell1Required} onChange={(e) => setClSell1Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field2</Text><Input value={clSell2} onChange={(e) => setClSell2(e.target.value)} style={inputStyle} /><Checkbox checked={clSell2Required} onChange={(e) => setClSell2Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field3</Text><Input value={clSell3} onChange={(e) => setClSell3(e.target.value)} style={inputStyle} /><Checkbox checked={clSell3Required} onChange={(e) => setClSell3Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field4</Text><Input value={clSell4} onChange={(e) => setClSell4(e.target.value)} style={inputStyle} /><Checkbox checked={clSell4Required} onChange={(e) => setClSell4Required(e.target.checked)} style={{ marginTop: 8 }}>Is required</Checkbox></Col>
        </Row>
      ))}

      {clSection("Labels for sale shipping custom fields:", (
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 1</Text><Input value={clSaleShip1} onChange={(e) => setClSaleShip1(e.target.value)} style={inputStyle} /><div style={{ marginTop: 8 }}><Checkbox checked={clSaleShip1Required} onChange={(e) => setClSaleShip1Required(e.target.checked)}>Is required</Checkbox><Checkbox checked={clSaleShip1Default} onChange={(e) => setClSaleShip1Default(e.target.checked)} style={{ marginLeft: 16 }}>Is default for contact</Checkbox></div></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 2</Text><Input value={clSaleShip2} onChange={(e) => setClSaleShip2(e.target.value)} style={inputStyle} /><div style={{ marginTop: 8 }}><Checkbox checked={clSaleShip2Required} onChange={(e) => setClSaleShip2Required(e.target.checked)}>Is required</Checkbox><Checkbox checked={clSaleShip2Default} onChange={(e) => setClSaleShip2Default(e.target.checked)} style={{ marginLeft: 16 }}>Is default for contact</Checkbox></div></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 3</Text><Input value={clSaleShip3} onChange={(e) => setClSaleShip3(e.target.value)} style={inputStyle} /><div style={{ marginTop: 8 }}><Checkbox checked={clSaleShip3Required} onChange={(e) => setClSaleShip3Required(e.target.checked)}>Is required</Checkbox><Checkbox checked={clSaleShip3Default} onChange={(e) => setClSaleShip3Default(e.target.checked)} style={{ marginLeft: 16 }}>Is default for contact</Checkbox></div></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 4</Text><Input value={clSaleShip4} onChange={(e) => setClSaleShip4(e.target.value)} style={inputStyle} /><div style={{ marginTop: 8 }}><Checkbox checked={clSaleShip4Required} onChange={(e) => setClSaleShip4Required(e.target.checked)}>Is required</Checkbox><Checkbox checked={clSaleShip4Default} onChange={(e) => setClSaleShip4Default(e.target.checked)} style={{ marginLeft: 16 }}>Is default for contact</Checkbox></div></Col>
          <Col xs={24}><Text style={labelStyle}>Custom Field 5</Text><Input value={clSaleShip5} onChange={(e) => setClSaleShip5(e.target.value)} style={inputStyle} /><div style={{ marginTop: 8 }}><Checkbox checked={clSaleShip5Required} onChange={(e) => setClSaleShip5Required(e.target.checked)}>Is required</Checkbox><Checkbox checked={clSaleShip5Default} onChange={(e) => setClSaleShip5Default(e.target.checked)} style={{ marginLeft: 16 }}>Is default for contact</Checkbox></div></Col>
        </Row>
      ))}

      {clSection("Labels for types of service custom fields:", (
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 1</Text><Input value={clTypesOfService1} onChange={(e) => setClTypesOfService1(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 2</Text><Input value={clTypesOfService2} onChange={(e) => setClTypesOfService2(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 3</Text><Input value={clTypesOfService3} onChange={(e) => setClTypesOfService3(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 4</Text><Input value={clTypesOfService4} onChange={(e) => setClTypesOfService4(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 5</Text><Input value={clTypesOfService5} onChange={(e) => setClTypesOfService5(e.target.value)} style={inputStyle} /></Col>
          <Col xs={24} md={12}><Text style={labelStyle}>Custom Field 6</Text><Input value={clTypesOfService6} onChange={(e) => setClTypesOfService6(e.target.value)} style={inputStyle} /></Col>
        </Row>
      ))}

      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleUpdateSettings} style={{ borderRadius: 6, minWidth: 160 }}>
          Update Settings
        </Button>
      </div>
    </>
  );

  const renderContent = () => {
    if (selectedMenu === "business") return businessForm;
    if (selectedMenu === "tax") return taxForm;
    if (selectedMenu === "product") return productForm;
    if (selectedMenu === "contact") return contactForm;
    if (selectedMenu === "sale") return saleForm;
    if (selectedMenu === "pos") return posForm;
    if (selectedMenu === "purchases") return purchasesForm;
    if (selectedMenu === "dashboard") return dashboardForm;
    if (selectedMenu === "system") return systemForm;
    if (selectedMenu === "prefixes") return prefixesForm;
    if (selectedMenu === "email-settings") return emailSettingsForm;
    if (selectedMenu === "sms-settings") return smsSettingsForm;
    if (selectedMenu === "reward-point-settings") return rewardPointSettingsForm;
    if (selectedMenu === "modules") return modulesForm;
    if (selectedMenu === "custom-labels") return customLabelsForm;
    return <Text type="secondary">Select a section from the menu. All settings modules are implemented in this view.</Text>;
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 8, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Business Settings
      </Title>
      <Input placeholder="Search" prefix={<SearchOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />} value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, maxWidth: 320, marginBottom: 24 }} allowClear />

      <Layout style={{ background: contentBg, borderRadius: 8, overflow: "hidden", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Sider width={220} style={{ background: siderBg, paddingTop: 16 }}>
          <Menu
            selectedKeys={[selectedMenu]}
            onSelect={({ key }) => setSelectedMenu(key)}
            mode="inline"
            style={{ border: "none", background: "transparent" }}
            items={SETTINGS_MENU_ITEMS}
          />
        </Sider>
        <Content style={{ padding: "24px", minHeight: 400 }}>
          {renderContent()}
        </Content>
      </Layout>
    </div>
  );
};

export default BusinessSettings;
