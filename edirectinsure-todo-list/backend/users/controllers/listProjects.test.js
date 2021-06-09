const listProjects = require('./listProjects');

const mockRes = {
  status: (...args) => ({}),
  json: (...args) => (args[0]),
};


jest.mock('../models/users', () => ({
  findOne: (...args) => ({
    lean: (...leanArgs) => (leanArgs),
  }),
}));

jest.mock('jsonwebtoken', () => ({
  verify: (...args) => (args),
}));

describe('List Projects Controller Tests', () => {
  test('Should return user projects', async () => {
    const mockReq = {
      params: { userId: '1234' },
      headers: { authorization: '1234' },
    };
    const response = await listProjects(mockReq, mockRes);

    expect(response.length).toBe(0);
  });
});
