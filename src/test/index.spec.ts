import request from 'supertest';
import { app } from '../app';

describe('GET /', () => {
  it('should return 200 OK', () => {
    return request(app).get('/').expect(200);
  });

  it('should return Hello World', (done) => {
    request(app)
      .get('/')
      .end(function (err, res) {
        expect(res.body.Hello).toContain('World');
        done();
      });
  });
});
