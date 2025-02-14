import {
  CategoryStats,
  CustomerStats,
  ProductStats,
  LocationStats,
  SalesInsightsStats,
  SalesRecord,
} from '../types';
import { formatDecimalsDigits, getPercentage } from '../../../utils/math.utils';

export const salesService = {
  getStats(salesRecords: SalesRecord[]): SalesInsightsStats {
    const totalSales = salesRecords.reduce(
      (sum, record) => sum + record.amount,
      0,
    );
    const categoriesStats: CategoryStats[] = [];
    const productStats: ProductStats[] = [];
    const customerStats: CustomerStats[] = [];
    const locationStats: LocationStats[] = [];

    for (const record of salesRecords) {
      // Category grouping
      this.processCategory(categoriesStats, record, totalSales);

      // Products grouping
      this.processProduct(productStats, record);

      // Customers grouping
      this.processCustomer(customerStats, record);

      // locations grouping
      this.processState(locationStats, record);
    }

    const avgSalePerTransaction = formatDecimalsDigits(
      totalSales / salesRecords.length,
    );

    // Category stats
    const maxCategorySales = Math.max(
      ...categoriesStats.map((category) => category.sales),
    );
    const bestCategory = categoriesStats.find(
      (category) => category.sales === maxCategorySales,
    );

    const avgSalePerCategory = categoriesStats.map((category) => ({
      category: category.name,
      avgSale: category.avgSales,
    }));
    const categoriesPercentage = categoriesStats.map((category) => ({
      category: category.name,
      percentage: category.salesPercentage,
    }));

    // Products stats
    const maxProductSold = Math.max(
      ...productStats.map((product) => product.count),
    );
    const bestProduct = productStats.find(
      (product) => product.count === maxProductSold,
    );

    // Customers stats
    const topCustomers = [...customerStats]
      .sort((current, next) => next.amountSpent - current.amountSpent)
      .slice(0, 3);

    return {
      totalSales,
      avgSalePerTransaction,
      bestCategory: {
        name: bestCategory!.name,
        sales: bestCategory!.sales,
      },
      bestProduct: {
        name: bestProduct!.name,
        count: bestProduct!.count,
      },
      topCustomers,
      avgSalesPerCategory: avgSalePerCategory,
      categoriesPercentage,
      bestLocations: locationStats,
    };
  },
  processCategory(
    categoriesStats: CategoryStats[],
    salesRecord: SalesRecord,
    totalSales: number,
  ): void {
    const category = categoriesStats.find(
      (category) => category.name === salesRecord.category,
    );

    if (!category) {
      categoriesStats.push({
        name: salesRecord.category,
        recordsCount: 1,
        sales: salesRecord.amount,
        avgSales: salesRecord.amount,
        salesPercentage: getPercentage(totalSales, salesRecord.amount),
      });
    } else {
      category.recordsCount += 1;
      category.sales += salesRecord.amount;
      category.avgSales = formatDecimalsDigits(
        category.sales / category.recordsCount,
      );
      category.salesPercentage = getPercentage(totalSales, category.sales);
    }
  },
  processProduct(productsStats: ProductStats[], record: SalesRecord): void {
    const product = productsStats.find(
      (product) => product.name === record.product,
    );

    if (!product) {
      productsStats.push({ name: record.product, count: 1 });
    } else {
      product.count += 1;
    }
  },
  processCustomer(customersStats: CustomerStats[], record: SalesRecord): void {
    const customer = customersStats.find(
      (customer) => customer.email === record.email,
    );

    if (!customer) {
      customersStats.push({
        name: record.name,
        email: record.email,
        amountSpent: record.amount,
      });
    } else {
      customer.amountSpent += record.amount;
    }
  },
  processState(locationsStats: LocationStats[], record: SalesRecord): void {
    const location = locationsStats.find(
      (state) => state.name === record.state,
    );

    if (!location) {
      locationsStats.push({
        sales: record.amount,
        name: record.state,
      });
    } else {
      location.sales += record.amount;
    }
  },
};
