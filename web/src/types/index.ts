
export interface ThemeContextType {
  theme: string | null;
  setTheme: (value: string) => void;
  autoTheme: boolean;
  setAutoTheme: (value: boolean) => void;
}

export interface UserType {
  id: number | string;
  email: string;
  name?: string;
  phone?: string;
  role?: number;
  status?: string;
  mobile_number?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  emergency_contact?: string;
  notes?: string;
}
