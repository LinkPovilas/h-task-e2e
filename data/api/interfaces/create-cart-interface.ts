interface CartProduct {
  slug: string;
  period: {
    value: number;
    unit: string;
  };
}

interface AnalyticsDataItem {
  key: string;
  value: string;
}

export interface CreateCartPayload {
  products: CartProduct[];
  affiliate_data?: [];
  analytics_data?: AnalyticsDataItem[];
  pricing_table_slug?: string;
  page_name?: string;
}
