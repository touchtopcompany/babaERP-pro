import { type FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
import PublicRoutes from "./PublicRoutes";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import Loading from "../pages/Loading";

// Lazy load components
const Home = lazy(() => import("@/pages/landing/Home"));
const Login = lazy(() => import("@/features/auth/pages/signin/Login"));
const TwoFactorAuth = lazy(() => import("@/features/auth/pages/two-factor-auth/TwoFactorAuth"));
const ResetPassword = lazy(() => import("@/features/auth/pages/reset-password/ResetPassword"));
const ForgotPassword = lazy(() => import("@/features/auth/pages/forgot password/ForgotPassword"));
const Signup = lazy(() => import("@/features/auth/pages/signup/Signup"));
const DashboardPage = lazy(() => import("@/features/dashboard/pages/home/DashboardPage"));
const UsersPage = lazy(() => import("@/features/dashboard/pages/user-management/UsersPage"));
const RolesPage = lazy(() => import("@/features/dashboard/pages/user-management/RolesPage"));
const SalesCommissionAgentsPage = lazy(() => import("@/features/dashboard/pages/user-management/SalesCommissionAgentsPage"));
const SuppliersPage = lazy(() => import("@/features/dashboard/pages/contacts/SuppliersPage"));
const CustomersPage = lazy(() => import("@/features/dashboard/pages/contacts/CustomersPage"));
const CustomerGroupsPage = lazy(() => import("@/features/dashboard/pages/contacts/CustomerGroupsPage"));
const ImportContactsPage = lazy(() => import("@/features/dashboard/pages/contacts/ImportContactsPage"));
const ListProductsPage = lazy(() => import("@/features/dashboard/pages/products/ListProductsPage"));
const AddProductPage = lazy(() => import("@/features/dashboard/pages/products/AddProductPage"));
const UpdatePricePage = lazy(() => import("@/features/dashboard/pages/products/UpdatePricePage"));
const PrintLabelsPage = lazy(() => import("@/features/dashboard/pages/products/PrintLabelsPage"));
const VariationsPage = lazy(() => import("@/features/dashboard/pages/products/VariationsPage"));
const ImportProductsPage = lazy(() => import("@/features/dashboard/pages/products/ImportProductsPage"));
const ImportOpeningStockPage = lazy(() => import("@/features/dashboard/pages/products/ImportOpeningStockPage"));
const PriceGroupPage = lazy(() => import("@/features/dashboard/pages/products/PriceGroupPage"));
const UnitsPage = lazy(() => import("@/features/dashboard/pages/products/UnitsPage"));
const CategoriesPage = lazy(() => import("@/features/dashboard/pages/products/CategoriesPage"));
const BrandsPage = lazy(() => import("@/features/dashboard/pages/products/BrandsPage"));
const WarrantiesPage = lazy(() => import("@/features/dashboard/pages/products/WarrantiesPage"));
const ListPurchasesPage = lazy(() => import("@/features/dashboard/pages/purchases/ListPurchasesPage"));
const AddPurchasePage = lazy(() => import("@/features/dashboard/pages/purchases/AddPurchasePage"));
const PurchaseReturnPage = lazy(() => import("@/features/dashboard/pages/purchases/PurchaseReturnPage"));
const AddPurchaseReturnPage = lazy(() => import("@/features/dashboard/pages/purchases/AddPurchaseReturnPage"));
const AllSalesPage = lazy(() => import("@/features/dashboard/pages/sales/AllSalesPage"));
const AddSalePage = lazy(() => import("@/features/dashboard/pages/sales/AddSalePage"));
const ListPOSPage = lazy(() => import("@/features/dashboard/pages/sales/ListPOSPage"));
const POSPage = lazy(() => import("@/features/dashboard/pages/sales/POSPage"));
const AddDraftPage = lazy(() => import("@/features/dashboard/pages/sales/AddDraftPage"));
const ListDraftsPage = lazy(() => import("@/features/dashboard/pages/sales/ListDraftsPage"));
const AddQuotationPage = lazy(() => import("@/features/dashboard/pages/sales/AddQuotationPage"));
const ListQuotationsPage = lazy(() => import("@/features/dashboard/pages/sales/ListQuotationsPage"));
const SellReturnPage = lazy(() => import("@/features/dashboard/pages/sales/SellReturnPage"));
const ShipmentsPage = lazy(() => import("@/features/dashboard/pages/sales/ShipmentsPage"));
const DiscountsPage = lazy(() => import("@/features/dashboard/pages/sales/DiscountsPage"));
const ImportSalesPage = lazy(() => import("@/features/dashboard/pages/sales/ImportSalesPage"));
const SalesVoidPage = lazy(() => import("@/features/dashboard/pages/sales/SalesVoidPage"));
const ListStockTransfersPage = lazy(() => import("@/features/dashboard/pages/stock-transfers/ListStockTransfersPage"));
const AddStockTransferPage = lazy(() => import("@/features/dashboard/pages/stock-transfers/AddStockTransferPage"));
const ListStockAdjustmentsPage = lazy(() => import("@/features/dashboard/pages/stock-adjustments/ListStockAdjustmentsPage"));
const AddStockAdjustmentPage = lazy(() => import("@/features/dashboard/pages/stock-adjustments/AddStockAdjustmentPage"));
const StockTakingPage = lazy(() => import("@/features/dashboard/pages/stock-taking/StockTakingPage"));
const ListExpensesPage = lazy(() => import("@/features/dashboard/pages/expenses/ListExpensesPage"));
const AddExpensePage = lazy(() => import("@/features/dashboard/pages/expenses/AddExpensePage"));
const ExpenseCategoriesPage = lazy(() => import("@/features/dashboard/pages/expenses/ExpenseCategoriesPage"));
const ListAccountsPage = lazy(() => import("@/features/dashboard/pages/payment-accounts/ListAccountsPage"));
const PaymentAccountReportPage = lazy(() => import("@/features/dashboard/pages/payment-accounts/PaymentAccountReportPage"));
const BalanceSheetPage = lazy(() => import("@/features/dashboard/pages/payment-accounts/BalanceSheetPage"));
const TrialBalancePage = lazy(() => import("@/features/dashboard/pages/payment-accounts/TrialBalancePage"));
const CashFlowPage = lazy(() => import("@/features/dashboard/pages/payment-accounts/CashFlowPage"));
const AccountingPage = lazy(() => import("@/features/dashboard/pages/accounting/AccountingPage"));
const ChartOfAccountsPage = lazy(() => import("@/features/dashboard/pages/accounting/ChartOfAccountsPage"));
const JournalEntryPage = lazy(() => import("@/features/dashboard/pages/accounting/JournalEntryPage"));
const TransferPage = lazy(() => import("@/features/dashboard/pages/accounting/TransferPage"));
const TransactionsPage = lazy(() => import("@/features/dashboard/pages/accounting/TransactionsPage"));
const BudgetPage = lazy(() => import("@/features/dashboard/pages/accounting/BudgetPage"));
const ProfitLossReportPage = lazy(() => import("@/features/dashboard/pages/reports/ProfitLossReportPage"));
const PurchaseSaleReportPage = lazy(() => import("@/features/dashboard/pages/reports/PurchaseSaleReportPage"));
const TaxReportPage = lazy(() => import("@/features/dashboard/pages/reports/TaxReportPage"));
const CustomersSuppliersReportPage = lazy(() => import("@/features/dashboard/pages/reports/CustomersSuppliersReportPage"));
const CustomerGroupsReportPage = lazy(() => import("@/features/dashboard/pages/reports/CustomerGroupsReportPage"));
const StockTransferReportPage = lazy(() => import("@/features/dashboard/pages/reports/StockTransferReportPage"));
const StockReportPage = lazy(() => import("@/features/dashboard/pages/reports/StockReportPage"));
const StockAdjustmentReportPage = lazy(() => import("@/features/dashboard/pages/reports/StockAdjustmentReportPage"));
const TrendingProductsReportPage = lazy(() => import("@/features/dashboard/pages/reports/TrendingProductsReportPage"));
const ItemsReportPage = lazy(() => import("@/features/dashboard/pages/reports/ItemsReportPage"));
const ProductPurchaseReportPage = lazy(() => import("@/features/dashboard/pages/reports/ProductPurchaseReportPage"));
const ProductSellReportPage = lazy(() => import("../features/dashboard/pages/reports/ProductSellReportPage"));
const PurchasePaymentReportPage = lazy(() => import("../features/dashboard/pages/reports/PurchasePaymentReportPage"));
const SellPaymentReportPage = lazy(() => import("../features/dashboard/pages/reports/SellPaymentReportPage"));
const ExpenseReportPage = lazy(() => import("../features/dashboard/pages/reports/ExpenseReportPage"));
const RegisterReportPage = lazy(() => import("../features/dashboard/pages/reports/RegisterReportPage"));
const SalesRepresentativeReportPage = lazy(() => import("../features/dashboard/pages/reports/SalesRepresentativeReportPage"));
const ActivityLogPage = lazy(() => import("../features/dashboard/pages/reports/ActivityLogPage"));
const NotificationTemplatesPage = lazy(() => import("../features/dashboard/pages/notification-templates/NotificationTemplatesPage"));
const BusinessSettingsPage = lazy(() => import("../features/dashboard/pages/settings/BusinessSettingsPage"));
const BusinessLocationsPage = lazy(() => import("../features/dashboard/pages/settings/BusinessLocationsPage"));
const InvoiceSettingsPage = lazy(() => import("../features/dashboard/pages/settings/InvoiceSettingsPage"));
const BarcodeSettingsPage = lazy(() => import("../features/dashboard/pages/settings/BarcodeSettingsPage"));
const PrintersPage = lazy(() => import("../features/dashboard/pages/settings/PrintersPage"));
const TaxRatesPage = lazy(() => import("../features/dashboard/pages/settings/TaxRatesPage"));
const SubdomainManagement = lazy(() => import("@/pages/dashboard/components/Subdomain Management"));
const UserManagement = lazy(() => import("@/pages/dashboard/components/User Management"));
const Analytics = lazy(() => import("@/pages/dashboard/components/Analytics"));

/**
 * This is Root Route initializer for the application
 * It must be clean as needed to allow flexibility and easy maintenance
 * @author nasr dev
 */
export const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Home page - accessible to everyone */}
        <Route path="/" element={<Home />} />

        {/* Public Routes - accessible only when not authenticated */}
        <Route element={<PublicRoutes />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Navigate to="/signin" />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* Authenticated Routes - require login */}
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user-management/users" element={<UsersPage />} />
          <Route path="/user-management/roles" element={<RolesPage />} />
          <Route path="/user-management/sales-commission-agents" element={<SalesCommissionAgentsPage />} />
          <Route path="/contacts/suppliers" element={<SuppliersPage />} />
          <Route path="/contacts/customers" element={<CustomersPage />} />
          <Route path="/contacts/customer-groups" element={<CustomerGroupsPage />} />
          <Route path="/contacts/import-contacts" element={<ImportContactsPage />} />
          <Route path="/products/list-products" element={<ListProductsPage />} />
          <Route path="/products/add-product" element={<AddProductPage />} />
          <Route path="/products/update-price" element={<UpdatePricePage />} />
          <Route path="/products/print-labels" element={<PrintLabelsPage />} />
          <Route path="/products/variations" element={<VariationsPage />} />
          <Route path="/products/import-products" element={<ImportProductsPage />} />
          <Route path="/products/import-opening-stock" element={<ImportOpeningStockPage />} />
          <Route path="/products/price-group" element={<PriceGroupPage />} />
          <Route path="/products/units" element={<UnitsPage />} />
          <Route path="/products/categories" element={<CategoriesPage />} />
          <Route path="/products/brands" element={<BrandsPage />} />
          <Route path="/products/warranties" element={<WarrantiesPage />} />
          <Route path="/purchases/list-purchases" element={<ListPurchasesPage />} />
          <Route path="/purchases/add-purchase" element={<AddPurchasePage />} />
          <Route path="/purchases/purchase-return" element={<PurchaseReturnPage />} />
          <Route path="/purchases/add-purchase-return" element={<AddPurchaseReturnPage />} />
          <Route path="/sell/all-sales" element={<AllSalesPage />} />
          <Route path="/sell/add-sale" element={<AddSalePage />} />
          <Route path="/sell/list-pos" element={<ListPOSPage />} />
          <Route path="/sell/pos" element={<POSPage />} />
          <Route path="/sell/list-drafts" element={<ListDraftsPage />} />
          <Route path="/sell/add-draft" element={<AddDraftPage />} />
          <Route path="/sell/add-quotation" element={<AddQuotationPage />} />
          <Route path="/sell/list-quotations" element={<ListQuotationsPage />} />
          <Route path="/sell/list-sell-return" element={<SellReturnPage />} />
          <Route path="/sell/shipments" element={<ShipmentsPage />} />
          <Route path="/sell/discounts" element={<DiscountsPage />} />
          <Route path="/sell/import-sales" element={<ImportSalesPage />} />
          <Route path="/sell/sales-void" element={<SalesVoidPage />} />
          <Route path="/stock-transfers/list-stock-transfers" element={<ListStockTransfersPage />} />
          <Route path="/stock-transfers/add-stock-transfer" element={<AddStockTransferPage />} />
          <Route path="/stock-adjustment/list-stock-adjustments" element={<ListStockAdjustmentsPage />} />
          <Route path="/stock-adjustment/add-stock-adjustment" element={<AddStockAdjustmentPage />} />
          <Route path="/stock-taking" element={<StockTakingPage />} />
          <Route path="/expenses/list-expenses" element={<ListExpensesPage />} />
          <Route path="/expenses/add-expense" element={<AddExpensePage />} />
          <Route path="/expenses/expense-categories" element={<ExpenseCategoriesPage />} />
          <Route path="/payment-accounts/list-accounts" element={<ListAccountsPage />} />
          <Route path="/payment-accounts/payment-account-report" element={<PaymentAccountReportPage />} />
          <Route path="/payment-accounts/balance-sheet" element={<BalanceSheetPage />} />
          <Route path="/payment-accounts/trial-balance" element={<TrialBalancePage />} />
          <Route path="/payment-accounts/cash-flow" element={<CashFlowPage />} />
          <Route path="/accounting" element={<AccountingPage />} />
          <Route path="/accounting/chart-of-accounts" element={<ChartOfAccountsPage />} />
          <Route path="/accounting/journal-entry" element={<JournalEntryPage />} />
          <Route path="/accounting/transfer" element={<TransferPage />} />
          <Route path="/accounting/transactions" element={<TransactionsPage />} />
          <Route path="/accounting/budget" element={<BudgetPage />} />
          <Route path="/reports/profit-loss-report" element={<ProfitLossReportPage />} />
          <Route path="/reports/purchase-sale" element={<PurchaseSaleReportPage />} />
          <Route path="/reports/tax-report" element={<TaxReportPage />} />
          <Route path="/reports/supplier-customer-report" element={<CustomersSuppliersReportPage />} />
          <Route path="/reports/customer-groups-report" element={<CustomerGroupsReportPage />} />
          <Route path="/reports/stock-transfer-report" element={<StockTransferReportPage />} />
          <Route path="/reports/stock-report" element={<StockReportPage />} />
          <Route path="/reports/stock-adjustment-report" element={<StockAdjustmentReportPage />} />
          <Route path="/reports/trending-products" element={<TrendingProductsReportPage />} />
          <Route path="/reports/items-report" element={<ItemsReportPage />} />
          <Route path="/reports/product-purchase-report" element={<ProductPurchaseReportPage />} />
          <Route path="/reports/product-sell-report" element={<ProductSellReportPage />} />
          <Route path="/reports/purchase-payment-report" element={<PurchasePaymentReportPage />} />
          <Route path="/reports/sell-payment-report" element={<SellPaymentReportPage />} />
          <Route path="/reports/expense-report" element={<ExpenseReportPage />} />
          <Route path="/reports/register-report" element={<RegisterReportPage />} />
          <Route path="/reports/sales-representative-report" element={<SalesRepresentativeReportPage />} />
          <Route path="/reports/activity-log" element={<ActivityLogPage />} />
          <Route path="/notification-templates" element={<NotificationTemplatesPage />} />
          <Route path="/settings/business-settings" element={<BusinessSettingsPage />} />
          <Route path="/settings/business-locations" element={<BusinessLocationsPage />} />
          <Route path="/settings/invoice-settings" element={<InvoiceSettingsPage />} />
          <Route path="/settings/barcode-settings" element={<BarcodeSettingsPage />} />
          <Route path="/settings/receipt-printers" element={<PrintersPage />} />
          <Route path="/settings/tax-rates" element={<TaxRatesPage />} />
        </Route>

        {/* Dashboard Routes - Accessible without authentication for local development */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="subdomains" element={<SubdomainManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Redirect root to dashboard for easy access during development */}
        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
