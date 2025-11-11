import { useGlobalBreakpoint } from "@/hooks/useGlobalBreakpoint";
import {
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { createContext } from "react";

interface NavActionType {
  isCollapsed: boolean;
  isDrawerDisplayed: boolean;
  handleDrawer: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const NavSideContext = createContext<NavActionType | null>(null);

export const NavSideProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const screens = useGlobalBreakpoint();
  const [isCollapsed, setIsColloapsed] = useState<boolean>(false);
  const [isDrawerDisplayed, setIsDrawerDisplayed] = useState<boolean>(false);

  const handleDrawer = () => {
    if (isCollapsed) {
      setIsDrawerDisplayed(!isDrawerDisplayed);
      return;
    }
  };

  useEffect(() => {
    if (!screens.md) {
      setIsColloapsed(true);
    } else {
      setIsColloapsed(false);
    }
  }, [isCollapsed, screens]);

  return (
    <NavSideContext.Provider
      value={{ isCollapsed, handleDrawer, isDrawerDisplayed }}
    >
      {children}
    </NavSideContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default function useNavSide() {
  const context = useContext<NavActionType | null>(NavSideContext);

  if (!context)
    throw new Error(
      "Please wrap NavSideProvider to Dashboard before accessing it.."
    );

  return context;
}
