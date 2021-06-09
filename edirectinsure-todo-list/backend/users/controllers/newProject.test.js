const newProject = require('./newProject');

const mockRes = {
  status: (...args) => ({}),
  json: (...args) => ({}),
  send: (...args) => (args[0]),
};


jest.mock('../models/users', () => ({
  findOne: (...args) => ({
    lean: (...leanArgs) => (leanArgs),
  }),
  updateOne: (...args) => (args),
}));

jest.mock('jsonwebtoken', () => ({
  verify: (...args) => (args),
}));

describe('New Project Controller Tests', () => {
  test('Should register a new project', async () => {
    const mockReq = {
      params: { userId: '1234' },
      headers: { authorization: '1234' },
      body: { name: '1234' },
    };
    const response = await newProject(mockReq, mockRes);

    expect(response).toBe('');
  });
});
