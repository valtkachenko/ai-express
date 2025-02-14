import { Request, Response } from 'express';
import { ControllerConfig } from 'routes.types';
import { SALES_URLS } from '../constants';
import { ROUTER_HTTP_METHOD } from '../../../constants/http.constants';
import { salesRecordBodyValidation } from '../validation/sales-record-body.request';
import { salesService } from '../services/sales.service';
import { aiModule } from '../../ai/ai.module';
import { getSalesReportPrompt } from '../templates/report.template';

/**
 * POST /sales/insights
 * Create actionable insights.
 */
const post = async (req: Request, res: Response): Promise<void> => {
  const stats = salesService.getStats(req.body);

  const { result: summary, error } = await aiModule.aiService.prompt(
    getSalesReportPrompt({
      totalSales: stats.totalSales,
      avgSalePerTransaction: stats.avgSalePerTransaction,
      bestCategory: stats.bestCategory,
      bestProduct: stats.bestProduct,
      bestLocation: stats.bestLocations[0],
    }),
  );

  if (error) {
    res.status(500).send({
      error: 'Internal server error',
      reason: 'Could not process aiService prompt',
    });
  }

  res.send({ stats, summary });
};

export const salesControllerConfig: ControllerConfig = {
  url: SALES_URLS.insights,
  handlers: [
    {
      method: ROUTER_HTTP_METHOD.POST,
      handler: post,
      middlewares: [salesRecordBodyValidation()],
    },
  ],
};
