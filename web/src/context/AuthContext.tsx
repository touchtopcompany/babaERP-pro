import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import useSerialize from "@/hooks/useSerialize";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { logger } from "@/utils/functions";

type StoredUser = {
  id: number | string;
  email: string;
  role: number;
  name?: string;
  status?: string;
  mobile_number?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  emergency_contact?: string;
  notes?: string;
} | null;

type AuthContextType = {
  user: StoredUser;
  loading: boolean;
  signOut: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOut: () => {}, refreshUser: async () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loadFromStorage, removeFromStorage } = useSerialize();
  const [user, setUser] = useState<StoredUser>(null);
  const [loading, setLoading] = useState(true);
  const logout = useLogout();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await loadFromStorage("user");
      if (mounted) {
        logger.log("AuthContext: User loaded from storage:", u);
        // Add a small delay to ensure storage operations are complete
        setTimeout(() => {
          setUser(u);
          setLoading(false);
          logger.log("AuthContext: User state updated, loading set to false");
        }, 50);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [loadFromStorage]);

  const refreshUser = useCallback(async () => {
    try {
      const u = await loadFromStorage("user");
      logger.log("AuthContext: User refreshed from storage:", u);
      setUser(u);
    } catch (error) {
      logger.error("AuthContext: Error refreshing user:", error);
    }
  }, [loadFromStorage]);

  const signOut = useCallback(() => {
    logout.mutate(undefined, {
      onSettled: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_2fa_enabled");
        localStorage.removeItem("user_2fa_email");
        removeFromStorage("user");
        removeFromStorage("token");
        setUser(null);
        window.location.replace("/auth/signin");
      },
    });
  }, [logout, removeFromStorage]);

  const value = useMemo(() => ({ user, loading, signOut, refreshUser }), [user, loading, signOut, refreshUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
