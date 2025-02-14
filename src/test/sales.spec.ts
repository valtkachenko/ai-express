import request from 'supertest';
import { app } from '../app';
import { aiService } from '../modules/ai/services/ai.service';

jest.spyOn(aiService, 'prompt').mockImplementation(async () => ({
  success: true,
  error: false,
  result: '',
}));

describe('POST /sales/insights', () => {
  it('should return 400 BadRequest if got empty body', () => {
    return request(app).post('/sales/insights').expect(400);
  });

  it('should return 400 BadRequest if got invalid body type', () => {
    return request(app)
      .post('/sales/insights')
      .send({ prop: 'value' })
      .expect(400);
  });

  it('should return 400 BadRequest if got invalid data type', () => {
    return request(app)
      .post('/sales/insights')
      .send([
        {
          name: 1,
          email: 2,
          product: 3,
          category: 4,
          amount: 'test',
          date: 5,
          state: 6,
        },
      ])
      .expect(400);
  });

  it('should return 200 BadRequest if got correct request data', () => {
    return request(app)
      .post('/sales/insights')
      .send([
        {
          name: 'Alice Johnson',
          email: 'alice.johnson1@example.com',
          product: 'Widget A',
          category: 'Widgets',
          amount: 120.5,
          date: '2023-03-01',
          state: 'California',
        },
        {
          name: 'Bob Smith',
          email: 'bob.smith2@example.com',
          product: 'Widget A',
          category: 'Widgets',
          amount: 85.0,
          date: '2023-03-02',
          state: 'California',
        },
      ])
      .expect(200, {
        stats: {
          totalSales: 205.5,
          avgSalePerTransaction: 102.75,
          bestCategory: { name: 'Widgets', sales: 205.5 },
          bestProduct: { name: 'Widget A', count: 2 },
          topCustomers: [
            {
              name: 'Alice Johnson',
              email: 'alice.johnson1@example.com',
              amountSpent: 120.5,
            },
            {
              name: 'Bob Smith',
              email: 'bob.smith2@example.com',
              amountSpent: 85.0,
            },
          ],
          avgSalesPerCategory: [
            {
              category: 'Widgets',
              avgSale: 102.75,
            },
          ],
          categoriesPercentage: [
            {
              category: 'Widgets',
              percentage: 100,
            },
          ],
          bestLocations: [
            {
              name: 'California',
              sales: 205.5,
            },
          ],
        },
        summary: '',
      });
  });

  // it('should return Hello World', (done) => {
  //   request(app)
  //     .get('/')
  //     .end(function (err, res) {
  //       expect(res.body.Hello).toContain('World');
  //       done();
  //     });
  // });
});
