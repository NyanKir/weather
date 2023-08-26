import request from 'supertest';
import { App } from '@/app';

describe('Test the root path', () => {
  const app = new App().listen();

  test('It should response the GET method', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  afterAll(() => {
    app.close();
  });
});
