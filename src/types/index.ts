export interface Vehicle {
  images: string[];
  name: string;
  description: string;
  icons?: string[];
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Reason {
  icon: "Waypoints" | "ChevronsUp" | "ShieldPlus";
  title: string;
  description: string;
}

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface TransportSection {
  icon: React.ReactNode;
  title: string;
  description: string;
}
