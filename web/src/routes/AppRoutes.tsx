import { type FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
import PublicRoutes from "./PublicRoutes";
import Loading from "../pages/Loading";

// Lazy load components
const Home = lazy(() => import("@/pages/landing/Home"));
const Features = lazy(() => import("@/pages/landing/features/Features"));
const Solutions = lazy(() => import("@/pages/landing/solutions/Solutions"));
const Pricing = lazy(() => import("@/pages/landing/pricing/Pricing"));
const Resources = lazy(() => import("@/pages/landing/resources/Resources"));
const Documentation = lazy(() => import("@/pages/landing/documentation/Documentation"));
const Login = lazy(() => import("@/features/auth/pages/signin/Login"));
const TwoFactorAuth = lazy(() => import("@/features/auth/pages/two-factor-auth/TwoFactorAuth"));
const ResetPassword = lazy(() => import("@/features/auth/pages/reset-password/ResetPassword"));
const ForgotPassword = lazy(() => import("@/features/auth/pages/forgot password/ForgotPassword"));

/**
 * This is Root Route initializer for the application
 * It must be clean as needed to allow flexibility and easy maintenance
 * @author nasr dev
 */
export const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Landing Page - always accessible */}
        <Route path="/" element={<Home />} />
        
        {/* Landing Pages - always accessible */}
        <Route path="/features" element={<Features />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/documentation" element={<Documentation />} />
        
        {/* Public Routes - accessible only when not authenticated */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signin" element={<Navigate to="/login" />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
