import { type FC, type ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useSerialize from "../hooks/useSerialize";
import type { UserType } from "@/types/index";
import Loading from "../pages/Loading";
import { logger } from "@/utils/functions";

interface AuthenticatedRoutesProps {
  children?: ReactNode;
}

/**
 * AuthenticatedRoutes - Simple route guard that only checks if user is logged in
 * For role-based access, use PrivateRoutes instead
 */
const AuthenticatedRoutes: FC<AuthenticatedRoutesProps> = ({ children }) => {
  const { loadFromStorage } = useSerialize();
  const [user, setUser] = useState<UserType | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await loadFromStorage("user");
        logger.log("AuthenticatedRoutes: User loaded from storage:", storedUser);
        setUser(storedUser);
      } catch (error) {
        logger.error("AuthenticatedRoutes: Error loading user:", error);
        setUser(null);
      }
    })();
  }, [loadFromStorage]);

  // Storage hasn't loaded yet
  if (user === undefined) return <Loading />;

  // Not logged in → redirect to login
  if (!user) {
    logger.log("AuthenticatedRoutes: User not found, redirecting to signin");
    return <Navigate to="/auth/signin" replace />;
  }

  // Authorized: render children or nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default AuthenticatedRoutes;

