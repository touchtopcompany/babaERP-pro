import { type FC, type ReactNode, useEffect, useState } from "react";
import {  Outlet } from "react-router-dom";
import useSerialize from "../hooks/useSerialize";
import type { UserType } from "../types/index";
import Loading from "../pages/Loading";
import { logger } from "@/utils/functions";

interface PublicRoutesProps {
  children?: ReactNode;
}

/**
 * PublicRoutes Component
 *
 * This component acts as a route guard for public routes (like signin, unauthorized pages).
 * If a user is already authenticated, they are redirected to their appropriate dashboard.
 * If not authenticated, they can access the public route content.
 *
 * @param children - Optional child components to render
 * @returns Loading, redirect, or public content based on authentication state
 */
const PublicRoutes: FC<PublicRoutesProps> = ({ children }) => {
  const { loadFromStorage } = useSerialize();
  const [user, setUser] = useState<UserType | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const storedUser = await loadFromStorage("user");

        logger.log("PublicRoutes: User loaded from storage:", {
          exists: !!storedUser,
          role: storedUser?.role,
          email: storedUser?.email
        });

        setUser(storedUser);
      } catch (error) {
        logger.error("PublicRoutes: Error loading user from storage:", error);
        setUser(null); // Treat as not authenticated on error
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [loadFromStorage]);

  // Show loading state while checking authentication
  if (isLoading || user === undefined) {
    return <Loading />;
  }

  // User is authenticated - normally redirect to appropriate dashboard
  // BUT allow OTP verification page to be accessed even when authenticated
  if (user && user.role) {
    logger.log("PublicRoutes: Authenticated user accessing public route, redirecting to dashboard", {
      role: user.role,
      email: user.email,
      currentPath: window.location.pathname
    });

    // Allow OTP page for 2FA flow
    if (window.location.pathname === "/auth/otp-verification") {
      logger.log("PublicRoutes: Allowing access to /auth/otp-verification for 2FA");
      return children ? <>{children}</> : <Outlet />;
    }

    // Only redirect if not on landing page
    if (window.location.pathname === "/") {
      logger.log("PublicRoutes: User is on landing page, redirecting to dashboard");
    }

   
  }

  // User is not authenticated - render public content
  logger.log("PublicRoutes: User not authenticated, rendering public content");
  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoutes;
