export interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  platform: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
}

export interface Ad {
  id: string;
  campaignId: string;
  type: "retargeting" | "split-test" | "standalone";
  platform: string;
  headline: string;
  tagline: string;
  body: string;
  image: string;
  destination: string;
  audience: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "active" | "paused" | "completed";
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
}

export interface Broadcast {
  id: string;
  name: string;
  type: "email" | "sms" | "push";
  status: "active" | "paused" | "completed";
  schedule: "immediate" | "scheduled";
  audience: string;
  content: {
    subject?: string;
    body: string;
  };
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
  };
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  status: "active" | "inactive";
  lastContact: string;
  source: string;
}

export interface Referral {
  id: string;
  code: string;
  type: "discount" | "reward";
  value: number;
  status: "active" | "expired" | "used";
  usage: {
    total: number;
    used: number;
    remaining: number;
  };
  expiry: string;
  created: string;
}

export interface Settings {
  business: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  branding: {
    logo: string;
    colors: {
      primary: string;
      secondary: string;
    };
  };
  integrations: {
    email: {
      provider: string;
      connected: boolean;
    };
    sms: {
      provider: string;
      connected: boolean;
    };
  };
} 