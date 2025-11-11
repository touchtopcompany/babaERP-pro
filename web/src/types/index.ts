import type { ReactNode } from "react";

export interface SignInTypes {
  role: number;
  email: string;
  password: string;
}

export interface SignUpTypes extends SignInTypes {
  username: string;
  phoneNumber: string;
}

export interface UserType extends SignUpTypes {
  id: string;
}

export interface User {
  key: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  latitude: number;
  longitude: number;
}

export interface Driver {
  key: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status: string;
  latitude: number;
  longitude: number;
}

export interface Vendor {
  key: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  latitude: number;
  longitude: number;
}

export interface ThemeContextType {
  theme: string | null;
  setTheme: (value: string) => void;
  autoTheme: boolean;
  setAutoTheme: (value: boolean) => void;
}

export interface ItemType {
  key: string;
  label: string;
  link: string;
  icon: ReactNode;
}

export interface SmartMeter {
  imei: string;
  status: string;
  batteryVoltage?: string;
  tokensRemaining?: number;
  alarmStatus?: string;
}

export interface GasDevice {
  id: string;
  battery: string;
  createdAt: string;
  leakage: string;
  weight: string;
  status?: string;
}

export interface GasData {
  timestamp: string;
  battery: string;
  leakage: string;
  weight: number;
  gprsSignal: number;
  location: string; 
}
