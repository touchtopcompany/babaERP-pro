import { type FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
import PublicRoutes from "./PublicRoutes";
import Loading from "../pages/Loading";
import ForgotPassword from "@/features/auth/pages/forgot password/ForgotPassword";

// Lazy load components
const Login = lazy(() => import("@/features/auth/pages/signin/Login"));
const TwoFactorAuth = lazy(() => import("@/features/auth/pages/two-factor-auth/TwoFactorAuth"));

/**
 * This is Root Route initializer for the application
 * It must be clean as needed to allow flexibility and easy maintenance
 * @author nasr dev
 */
export const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes - accessible only when not authenticated */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
          <Route path="/signin" element={<Navigate to="/login" />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
