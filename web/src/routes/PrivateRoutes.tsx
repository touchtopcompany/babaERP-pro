import { type FC, type ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useSerialize from "../hooks/useSerialize";
import type { UserType } from "@/types/index";
import Loading from "../pages/Loading";
import { logger } from "@/utils/functions";

interface PrivateRoutesProps {
  allowedRoleKeys: number[];
  children?: ReactNode;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ allowedRoleKeys, children }) => {
  const { loadFromStorage } = useSerialize();
  const [user, setUser] = useState<UserType | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const storedUser = await loadFromStorage("user");
      logger.log("PrivateRoutes: User loaded from storage:", storedUser);
      logger.log("PrivateRoutes: User role:", storedUser?.role);
      logger.log("PrivateRoutes: User role type:", typeof storedUser?.role);
      logger.log("PrivateRoutes: Allowed roles:", allowedRoleKeys);
      logger.log("PrivateRoutes: Allowed roles type:", typeof allowedRoleKeys[0]);
      logger.log("PrivateRoutes: Role match check:", allowedRoleKeys.includes(storedUser?.role));
      setUser(storedUser);
    })();
  }, [loadFromStorage, allowedRoleKeys]);

  // Storage hasn't loaded yet
  if (user === undefined) return <Loading />;

  // Not logged in → redirect to login
  if (!user) {
    logger.log("PrivateRoutes: User not found, redirecting to login", { user });
    return <Navigate to="/auth/signin" replace />;
  }

  // Check role
  logger.log("PrivateRoutes: Final role check", {
    userRole: user.role,
    userRoleType: typeof user.role,
    allowedRoles: allowedRoleKeys,
    allowedRolesType: typeof allowedRoleKeys[0],
    includesCheck: allowedRoleKeys.includes(user.role),
    user: user
  });
  
  if (!allowedRoleKeys.includes(user.role)) {
    logger.log("PrivateRoutes: User role not authorized - redirecting to unauthorized", {
      userRole: user.role,
      allowedRoles: allowedRoleKeys,
      user: user
    });
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized: render children or nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoutes;
