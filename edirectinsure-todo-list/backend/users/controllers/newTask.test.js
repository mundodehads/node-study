const newTask = require('./newTask');

const mockRes = {
  status: (...args) => ({}),
  json: (...args) => ({}),
  send: (...args) => (args[0]),
};

const mockUser = {
  projects: [{ tasks: [] }],
}

jest.mock('../models/users', () => ({
  findOne: (...args) => ({
    lean: (...leanArgs) => (mockUser),
  }),
  updateOne: (...args) => (args),
}));

jest.mock('jsonwebtoken', () => ({
  verify: (...args) => (args),
}));

describe('New Task Controller Tests', () => {
  test('Should register a new task', async () => {
    const mockReq = {
      params: { userId: '1234' },
      headers: { authorization: '1234' },
      body: { index: 0, tasks: [] },
    };
    const response = await newTask(mockReq, mockRes);

    expect(response).toBe('');
  });
});
