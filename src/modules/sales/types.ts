export interface SalesRecord {
  name: string;
  email: string;
  product: string;
  category: string;
  amount: number;
  date: string;
  state: string;
}

export interface CategoryStats {
  name: string;
  recordsCount: number;
  sales: number;
  avgSales: number;
  salesPercentage: number;
}

export interface ProductStats {
  name: string;
  count: number;
}

export interface CustomerStats {
  name: string;
  email: string;
  amountSpent: number;
}

export interface LocationStats {
  name: string;
  sales: number;
}

export interface SalesInsightsStats {
  totalSales: number;
  avgSalePerTransaction: number;
  avgSalesPerCategory: {
    category: string;
    avgSale: number;
  }[];
  bestCategory: {
    name: string;
    sales: number;
  };
  bestProduct: {
    name: string;
    count: number;
  };
  bestLocations: {
    name: string;
    sales: number;
  }[];
  topCustomers: {
    name: string;
    email: string;
    amountSpent: number;
  }[];
  categoriesPercentage: {
    category: string;
    percentage: number;
  }[];
}

export interface SalesReportParams {
  totalSales: number;
  avgSalePerTransaction: number;
  bestCategory: {
    name: string;
    sales: number;
  };
  bestProduct: {
    name: string;
    count: number;
  };
  bestLocation: {
    name: string;
    sales: number;
  };
}
