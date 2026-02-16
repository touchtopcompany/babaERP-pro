import React, { useState } from "react";

import {

    Card,

    Row,

    Col,

    Typography,

    Button,

    Space,

    Input,

    Divider,

    Select,

    Tabs,

} from "antd";

import {

    ReloadOutlined,
    SettingOutlined,

} from "@ant-design/icons";

import useTheme from "@/theme/useTheme";
import type { ExpenseCategoryFormData } from "@/components/modals/AddExpenseCategoryModal";

// Define the interface locally since it's not exported
interface ExpenseCategoryData {
    key: string;
    categoryName: string;
    categoryCode: string;
}



const { Title, Text } = Typography;

const { TabPane } = Tabs;



interface TransactionMapping {

    sellPaymentAccount: string;

    sellDepositTo: string;

    salesPaymentsPaymentAccount: string;

    salesPaymentsDepositTo: string;

    purchasePaymentAccount: string;

    purchaseDepositTo: string;

    purchasePaymentsPaymentAccount: string;

    purchasePaymentsDepositTo: string;

}



const Settings: React.FC = () => {

    const { theme } = useTheme();

    const isDark = theme === "dark";

    const [activeTab, setActiveTab] = useState<string>("map-transactions");

    const [journalEntryPrefix, setJournalEntryPrefix] = useState<string>("");

    const [transferPrefix, setTransferPrefix] = useState<string>("");

    const [transactionMapping, setTransactionMapping] = useState<TransactionMapping>({

        sellPaymentAccount: "",

        sellDepositTo: "",

        salesPaymentsPaymentAccount: "",

        salesPaymentsDepositTo: "",

        purchasePaymentAccount: "",

        purchaseDepositTo: "",

        purchasePaymentsPaymentAccount: "",

        purchasePaymentsDepositTo: "",

    });

    const [selectedLocation, setSelectedLocation] = useState<string>("main-shop");

    const [expensePaymentAccount, setExpensePaymentAccount] = useState<string>("");

    const [expenseDepositTo, setExpenseDepositTo] = useState<string>("");

    // Mock expense categories data - same as in ExpenseCategories.tsx
    const defaultExpenseCategories: ExpenseCategoryData[] = [
        { key: "1", categoryName: "Office Supplies", categoryCode: "OFF-001" },
        { key: "2", categoryName: "Utilities", categoryCode: "UTL-001" },
        { key: "3", categoryName: "Travel", categoryCode: "TRV-001" },
        { key: "4", categoryName: "Marketing", categoryCode: "MRK-001" },
        { key: "5", categoryName: "Rent", categoryCode: "RNT-001" },
        { key: "6", categoryName: "Insurance", categoryCode: "INS-001" },
        { key: "7", categoryName: "Professional Services", categoryCode: "PRF-001" },
        { key: "8", categoryName: "Maintenance", categoryCode: "MNT-001" },
        { key: "9", categoryName: "Training", categoryCode: "TRN-001" },
        { key: "10", categoryName: "Software", categoryCode: "SFT-001" },
        { key: "11", categoryName: "Hardware", categoryCode: "HRD-001" },
        { key: "12", categoryName: "Communication", categoryCode: "COM-001" },
        { key: "13", categoryName: "Legal", categoryCode: "LGL-001" },
        { key: "14", categoryName: "Accounting", categoryCode: "ACC-001" },
        { key: "15", categoryName: "Bank Charges", categoryCode: "BNK-001" },
    ];

    // Location-specific expense categories mapping
    const locationExpenseCategories: Record<string, ExpenseCategoryData[]> = {
        "main-shop": [
            { key: "1", categoryName: "Office Supplies", categoryCode: "OFF-001" },
            { key: "2", categoryName: "Utilities", categoryCode: "UTL-001" },
            { key: "5", categoryName: "Rent", categoryCode: "RNT-001" },
            { key: "6", categoryName: "Insurance", categoryCode: "INS-001" },
            { key: "8", categoryName: "Maintenance", categoryCode: "MNT-001" },
            { key: "12", categoryName: "Communication", categoryCode: "COM-001" },
            { key: "15", categoryName: "Bank Charges", categoryCode: "BNK-001" },
        ],
        "branch-1": [
            { key: "1", categoryName: "Office Supplies", categoryCode: "OFF-001" },
            { key: "2", categoryName: "Utilities", categoryCode: "UTL-001" },
            { key: "5", categoryName: "Rent", categoryCode: "RNT-001" },
            { key: "8", categoryName: "Maintenance", categoryCode: "MNT-001" },
            { key: "10", categoryName: "Software", categoryCode: "SFT-001" },
        ],
        "branch-2": [
            { key: "1", categoryName: "Office Supplies", categoryCode: "OFF-001" },
            { key: "2", categoryName: "Utilities", categoryCode: "UTL-001" },
            { key: "4", categoryName: "Marketing", categoryCode: "MRK-001" },
            { key: "9", categoryName: "Training", categoryCode: "TRN-001" },
            { key: "11", categoryName: "Hardware", categoryCode: "HRD-001" },
        ],
        "warehouse": [
            { key: "1", categoryName: "Office Supplies", categoryCode: "OFF-001" },
            { key: "2", categoryName: "Utilities", categoryCode: "UTL-001" },
            { key: "8", categoryName: "Maintenance", categoryCode: "MNT-001" },
            { key: "11", categoryName: "Hardware", categoryCode: "HRD-001" },
            { key: "14", categoryName: "Accounting", categoryCode: "ACC-001" },
        ],
        "online-store": [
            { key: "4", categoryName: "Marketing", categoryCode: "MRK-001" },
            { key: "10", categoryName: "Software", categoryCode: "SFT-001" },
            { key: "12", categoryName: "Communication", categoryCode: "COM-001" },
            { key: "13", categoryName: "Legal", categoryCode: "LGL-001" },
            { key: "14", categoryName: "Accounting", categoryCode: "ACC-001" },
        ],
    };

    // Get filtered expense categories based on selected location
    const getFilteredExpenseCategories = () => {
        return locationExpenseCategories[selectedLocation] || defaultExpenseCategories;
    };

    const handleResetData = () => {

        setJournalEntryPrefix("");

        setTransferPrefix("");

        setTransactionMapping({

            sellPaymentAccount: "",

            sellDepositTo: "",

            salesPaymentsPaymentAccount: "",

            salesPaymentsDepositTo: "",

            purchasePaymentAccount: "",

            purchaseDepositTo: "",

            purchasePaymentsPaymentAccount: "",

            purchasePaymentsDepositTo: "",

        });

    };



    const handleTransactionMappingChange = (field: keyof TransactionMapping, value: string) => {

        setTransactionMapping(prev => ({

            ...prev,

            [field]: value

        }));

    };



    const MapTransactionsTab = () => (

        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>

            <Row gutter={[24, 24]}>

                <Col xs={24} sm={24} md={24} lg={24}>

                    {/* Prefix Settings */}

                    <Card

                        style={{

                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",

                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                            borderRadius: "8px",

                            marginBottom: "24px",

                        }}

                    >

                        <Space direction="vertical" size="large" style={{ width: "100%" }}>

                            <Title level={4} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>

                                Accounting Settings / Map Transactions

                            </Title>



                            <Row gutter={[16, 16]}>

                                <Col xs={24} sm={24} md={12} lg={8}>

                                    <div>

                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>

                                            Journal Entry Prefix

                                        </Text>

                                        <Input

                                            value={journalEntryPrefix}

                                            onChange={(e) => setJournalEntryPrefix(e.target.value)}

                                            placeholder="Enter journal entry prefix"

                                            style={{

                                                background: isDark ? "rgba(255,255,255,0.05)" : "#fff",

                                                border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",

                                                color: isDark ? "#fff" : "#1f1f1f",

                                            }}

                                        />

                                    </div>

                                </Col>

                                <Col xs={24} sm={24} md={12} lg={8}>

                                    <div>

                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>

                                            Transfer Prefix

                                        </Text>

                                        <Input

                                            value={transferPrefix}

                                            onChange={(e) => setTransferPrefix(e.target.value)}

                                            placeholder="Enter transfer prefix"

                                            style={{

                                                background: isDark ? "rgba(255,255,255,0.05)" : "#fff",

                                                border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",

                                                color: isDark ? "#fff" : "#1f1f1f",

                                            }}

                                        />

                                    </div>

                                </Col>

                                <Col xs={24} sm={24} md={12} lg={8}>

                                    <div style={{ display: "flex", alignItems: "flex-end", height: "100%" }}>

                                        <Button

                                            icon={<ReloadOutlined />}

                                            onClick={handleResetData}

                                            style={{

                                                background: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0",

                                                border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",

                                                color: isDark ? "#fff" : "#1f1f1f",

                                            }}

                                        >

                                            Reset data

                                        </Button>

                                    </div>

                                </Col>

                            </Row>

                        </Space>

                    </Card>



                    {/* Map Transactions */}

                    <Card

                        style={{

                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",

                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                            borderRadius: "8px",

                        }}

                    >

                        <Space direction="vertical" size="large" style={{ width: "100%" }}>

                            <Title level={4} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>

                                Map Transactions

                            </Title>



                            {/* Location Filter Section */}

                            <div>

                                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>

                                    <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>

                                        Location

                                    </Title>

                                    <Select

                                        value={selectedLocation}

                                        onChange={(value) => setSelectedLocation(value)}

                                        style={{

                                            minWidth: "200px",

                                            background: isDark ? "rgba(255,255,255,0.05)" : "#fff",

                                            border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",

                                        }}

                                        placeholder="Select location"

                                    >

                                        <Select.Option value="main-shop">Main Shop</Select.Option>

                                        <Select.Option value="branch-1">Branch 1</Select.Option>

                                        <Select.Option value="branch-2">Branch 2</Select.Option>

                                        <Select.Option value="warehouse">Warehouse</Select.Option>

                                        <Select.Option value="online-store">Online Store</Select.Option>

                                    </Select>

                                </div>

                                <Row gutter={[24, 24]}>

                                    {/* Sell Section */}

                                    <Col xs={24} sm={12} md={12} lg={6}>

                                        <Card

                                            size="small"

                                            style={{

                                                background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",

                                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                                                borderRadius: "6px",

                                            }}

                                        >

                                            <Title level={5} style={{ margin: "0 0 12px 0", color: isDark ? "#fff" : "#1f1f1f", fontSize: "14px" }}>

                                                Sell

                                            </Title>

                                            <Row gutter={[8, 0]}>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Payment account

                                                        </Text>

                                                        <Select

                                                            value={transactionMapping.sellPaymentAccount}

                                                            onChange={(value) => handleTransactionMappingChange('sellPaymentAccount', value)}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {/* Add account options here */}

                                                        </Select>

                                                    </div>

                                                </Col>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Deposit to

                                                        </Text>

                                                        <Select

                                                            value={transactionMapping.sellDepositTo}

                                                            onChange={(value) => handleTransactionMappingChange('sellDepositTo', value)}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {/* Add account options here */}

                                                        </Select>

                                                    </div>

                                                </Col>

                                            </Row>

                                        </Card>

                                    </Col>



                                    {/* Sales Payments Section */}

                                    <Col xs={24} sm={12} md={12} lg={6}>

                                        <Card

                                            size="small"

                                            style={{

                                                background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",

                                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                                                borderRadius: "6px",

                                            }}

                                        >

                                            <Title level={5} style={{ margin: "0 0 12px 0", color: isDark ? "#fff" : "#1f1f1f", fontSize: "14px" }}>

                                                Sales Payments

                                            </Title>

                                            <Row gutter={[8, 0]}>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Payment account

                                                        </Text>

                                                        <Select

                                                            value={transactionMapping.purchasePaymentsPaymentAccount}

                                                            onChange={(value) => handleTransactionMappingChange('purchasePaymentsPaymentAccount', value)}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {/* Add account options here */}

                                                        </Select>

                                                    </div>

                                                </Col>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Deposit to

                                                        </Text>

                                                        <Select

                                                            value={transactionMapping.purchasePaymentsDepositTo}

                                                            onChange={(value) => handleTransactionMappingChange('purchasePaymentsDepositTo', value)}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {/* Add account options here */}

                                                        </Select>

                                                    </div>

                                                </Col>

                                            </Row>

                                            <Row gutter={[8, 0]}>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Payment account

                                                        </Text>

                                                        <Select

                                                            value=""

                                                            onChange={(value) => { }}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {/* Add account options here */}

                                                        </Select>

                                                    </div>

                                                </Col>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Payment account

                                                        </Text>

                                                        <Select

                                                            value=""

                                                            onChange={(value) => { }}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {/* Add account options here */}

                                                        </Select>

                                                    </div>

                                                </Col>

                                            </Row>

                                            <Row gutter={[8, 0]}>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Payment account

                                                        </Text>

                                                        <Select

                                                            value=""

                                                            onChange={(value) => { }}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {/* Add account options here */}

                                                        </Select>

                                                    </div>

                                                </Col>

                                                <Col span={12}>

                                                    {/* Empty column for balance */}

                                                </Col>

                                            </Row>

                                        </Card>

                                    </Col>



                                    {/* Purchase Section */}

                                    <Col xs={24} sm={12} md={12} lg={6}>

                                        <Card

                                            size="small"

                                            style={{

                                                background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",

                                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                                                borderRadius: "6px",

                                            }}

                                        >

                                            <Title level={5} style={{ margin: "0 0 12px 0", color: isDark ? "#fff" : "#1f1f1f", fontSize: "14px" }}>

                                                Purchase

                                            </Title>

                                            <Row gutter={[8, 0]}>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Payment account

                                                        </Text>

                                                        <Select

                                                            value={transactionMapping.purchasePaymentAccount}

                                                            onChange={(value) => handleTransactionMappingChange('purchasePaymentAccount', value)}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {/* Add account options here */}

                                                        </Select>

                                                    </div>

                                                </Col>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Deposit to

                                                        </Text>

                                                        <Select

                                                            value={transactionMapping.purchaseDepositTo}

                                                            onChange={(value) => handleTransactionMappingChange('purchaseDepositTo', value)}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {/* Add account options here */}

                                                        </Select>

                                                    </div>

                                                </Col>

                                            </Row>

                                        </Card>

                                    </Col>



                                    {/* Purchase Payments Section */}

                                    <Col xs={24} sm={12} md={12} lg={6}>

                                        <Card

                                            size="small"

                                            style={{

                                                background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",

                                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                                                borderRadius: "6px",

                                            }}

                                        >

                                            <Title level={5} style={{ margin: "0 0 12px 0", color: isDark ? "#fff" : "#1f1f1f", fontSize: "14px" }}>

                                                Purchase Payments

                                            </Title>

                                            <Space direction="vertical" size="small" style={{ width: "100%" }}>

                                                <Row gutter={[8, 0]}>

                                                    <Col span={12}>

                                                        <div>

                                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                                Payment account

                                                            </Text>

                                                            <Select

                                                                value={transactionMapping.purchasePaymentsPaymentAccount}

                                                                onChange={(value) => handleTransactionMappingChange('purchasePaymentsPaymentAccount', value)}

                                                                style={{ width: "100%" }}

                                                                placeholder="Select account"

                                                                size="small"

                                                            >

                                                                <Select.Option value="">Select account</Select.Option>

                                                                {/* Add account options here */}

                                                            </Select>

                                                        </div>

                                                    </Col>

                                                    <Col span={12}>

                                                        <div>

                                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                                Deposit to

                                                            </Text>

                                                            <Select

                                                                value={transactionMapping.purchasePaymentsDepositTo}

                                                                onChange={(value) => handleTransactionMappingChange('purchasePaymentsDepositTo', value)}

                                                                style={{ width: "100%" }}

                                                                placeholder="Select account"

                                                                size="small"

                                                            >

                                                                <Select.Option value="">Select account</Select.Option>

                                                                {/* Add account options here */}

                                                            </Select>

                                                        </div>

                                                    </Col>

                                                </Row>

                                                <Row gutter={[8, 0]}>

                                                    <Col span={12}>

                                                        <div>

                                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                                Payment account

                                                            </Text>

                                                            <Select

                                                                value=""

                                                                onChange={(value) => { }}

                                                                style={{ width: "100%" }}

                                                                placeholder="Select account"

                                                                size="small"

                                                            >

                                                                <Select.Option value="">Select account</Select.Option>

                                                                {/* Add account options here */}

                                                            </Select>

                                                        </div>

                                                    </Col>

                                                    <Col span={12}>

                                                        <div>

                                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                                Payment account

                                                            </Text>

                                                            <Select

                                                                value=""

                                                                onChange={(value) => { }}

                                                                style={{ width: "100%" }}

                                                                placeholder="Select account"

                                                                size="small"

                                                            >

                                                                <Select.Option value="">Select account</Select.Option>

                                                                {/* Add account options here */}

                                                            </Select>

                                                        </div>

                                                    </Col>

                                                </Row>

                                                <Row gutter={[8, 0]}>

                                                    <Col span={12}>

                                                        <div>

                                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                                Payment account

                                                            </Text>

                                                            <Select

                                                                value=""

                                                                onChange={(value) => { }}

                                                                style={{ width: "100%" }}

                                                                placeholder="Select account"

                                                                size="small"

                                                            >

                                                                <Select.Option value="">Select account</Select.Option>

                                                                {/* Add account options here */}

                                                            </Select>

                                                        </div>

                                                    </Col>

                                                    <Col span={12}>

                                                        {/* Empty column for balance */}

                                                    </Col>

                                                </Row>

                                            </Space>

                                        </Card>

                                    </Col>

                                    {/* Expenses Section */}

                                    <Col xs={24} sm={12} md={12} lg={6}>

                                        <Card

                                            size="small"

                                            style={{

                                                background: isDark ? "rgba(255,255,255,0.03)" : "#fafafa",

                                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                                                borderRadius: "6px",

                                            }}

                                        >

                                            <Title level={5} style={{ margin: "0 0 12px 0", color: isDark ? "#fff" : "#1f1f1f", fontSize: "14px" }}>

                                                Expenses

                                            </Title>

                                            <Row gutter={[8, 0]}>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Payment account

                                                        </Text>

                                                        <Select

                                                            value={expensePaymentAccount}

                                                            onChange={(value) => setExpensePaymentAccount(value)}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {getFilteredExpenseCategories().map((category) => (
                                                                <Select.Option key={category.key} value={category.categoryCode}>
                                                                    {category.categoryName}
                                                                </Select.Option>
                                                            ))}

                                                        </Select>

                                                    </div>

                                                </Col>

                                                <Col span={12}>

                                                    <div>

                                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "11px", display: "block", marginBottom: "4px" }}>

                                                            Deposit to

                                                        </Text>

                                                        <Select

                                                            value={expenseDepositTo}

                                                            onChange={(value) => setExpenseDepositTo(value)}

                                                            style={{ width: "100%" }}

                                                            placeholder="Select account"

                                                            size="small"

                                                        >

                                                            <Select.Option value="">Select account</Select.Option>

                                                            {getFilteredExpenseCategories().map((category) => (
                                                                <Select.Option key={category.key} value={category.categoryCode}>
                                                                    {category.categoryName}
                                                                </Select.Option>
                                                            ))}

                                                        </Select>

                                                    </div>

                                                </Col>

                                            </Row>

                                        </Card>

                                    </Col>

                                </Row>

                            </div>

                        </Space>

                    </Card>

                </Col>

            </Row>

        </div>

    );



    const AccountSubTypeTab = () => (

        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>

            <Card

                style={{

                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",

                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                    borderRadius: "8px",

                }}

            >

                <Title level={4} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>

                    Account Sub Type Settings

                </Title>

                <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>

                    Account sub type configuration will be implemented here.

                </Text>

            </Card>

        </div>

    );



    const DetailTypeTab = () => (

        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>

            <Card

                style={{

                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",

                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                    borderRadius: "8px",

                }}

            >

                <Title level={4} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>

                    Detail Type Settings

                </Title>

                <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>

                    Detail type configuration will be implemented here.

                </Text>

            </Card>

        </div>

    );



    return (

        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>

            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>

                <Col xs={24} sm={24} md={24} lg={24}>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

                        <SettingOutlined style={{ fontSize: "24px", color: isDark ? "#fff" : "#1f1f1f" }} />

                        <Title

                            level={2}

                            style={{

                                margin: 0,

                                color: isDark ? "#fff" : "#1f1f1f",

                                fontWeight: 600,

                            }}

                        >

                            Settings

                        </Title>

                    </div>

                </Col>

            </Row>



            <Row gutter={[24, 24]}>

                <Col xs={24} sm={24} md={24} lg={24}>

                    <Card

                        style={{

                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",

                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                            borderRadius: "8px",

                        }}

                        bodyStyle={{ padding: 0 }}

                    >

                        <Tabs

                            activeKey={activeTab}

                            onChange={setActiveTab}

                            style={{

                                color: isDark ? "#fff" : "#1f1f1f",

                            }}

                            tabBarStyle={{

                                background: isDark ? "rgba(255,255,255,0.05)" : "#fafafa",

                                margin: 0,

                                padding: "0 24px",

                                borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",

                            }}

                        >

                            <TabPane tab="Map Transactions" key="map-transactions">

                                <div style={{ padding: "24px" }}>

                                    <MapTransactionsTab />

                                </div>

                            </TabPane>

                            <TabPane tab="Account Sub Type" key="account-sub-type">

                                <div style={{ padding: "24px" }}>

                                    <AccountSubTypeTab />

                                </div>

                            </TabPane>

                            <TabPane tab="Detail Type" key="detail-type">

                                <div style={{ padding: "24px" }}>

                                    <DetailTypeTab />

                                </div>

                            </TabPane>

                        </Tabs>

                    </Card>

                </Col>

            </Row>

        </div>

    );

};



export default Settings;