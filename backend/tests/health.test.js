process.env.POSTGRES_HOST = '127.0.0.1';
process.env.POSTGRES_USER = 'test';
process.env.POSTGRES_PASSWORD = 'test';
process.env.POSTGRES_DB = 'jobcentral_test';

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    query: jest.fn().mockResolvedValue({ rows: [{ connected: 1 }] })
  }))
}));

const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  test('reports API and database health', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      database: 'connected',
      timestamp: expect.any(String)
    });
  });
});
