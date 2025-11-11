import { type FC, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
import PublicRoutes from "./PublicRoutes";
import Loading from "../pages/Loading";

/**
 * This is Root Route initializer for the application
 * It must be clean as needed to allow flexibility and easy maintanance
 * @author nasr dev
 */
export const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes - accessible only when not authenticated */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Navigate to="/signin" />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
