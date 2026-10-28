process.env.POSTGRES_HOST = '127.0.0.1';
process.env.POSTGRES_USER = 'test';
process.env.POSTGRES_PASSWORD = 'test';
process.env.POSTGRES_DB = 'jobcentral_test';

const mockCategories = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Design' },
];

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    query: jest.fn().mockResolvedValue({ rows: mockCategories })
  }))
}));

const request = require('supertest');
const app = require('../src/app');

describe('GET /api/jobs/categories', () => {
  test('returns job categories as JSON', async () => {
    const response = await request(app).get('/api/jobs/categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: mockCategories,
    });
  });
});
