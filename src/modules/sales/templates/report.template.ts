import { SalesReportParams } from '../types';

export function getSalesReportPrompt(params: SalesReportParams): string {
  const {
    totalSales,
    avgSalePerTransaction,
    bestProduct,
    bestLocation,
    bestCategory,
  } = params;

  return `
    Generate a business report based on the following sales data:
    - Total Sales: ${totalSales}
    - Average Sale per Transaction: ${avgSalePerTransaction}
    - Best Performing Category: ${bestCategory.name} (${bestCategory.sales})
    - Top Selling Product: ${bestProduct.name} (${bestProduct.count})
    - Top Selling Location: ${bestLocation.name} (${bestLocation.sales})
    Provide a structured and insightful summary for a business manager.
    Return text without any special format, just plain text without line breaks.
  `;
}
