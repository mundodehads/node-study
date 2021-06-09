const auth = require('./auth');

const mockRes = {
  status: (...args) => ({}),
  json: (...args) => (args[0]),
};

jest.mock('../models/users', () => ({
  findOne: (...args) => ({
    lean: (...leanArgs) => (null),
  }),
  create: (...args) => ({}),
}));

describe('Auth Controller Tests', () => {
  test('Should return an token after create a new user', async () => {
    const mockReq = {
      body: {
        email: 'mock@mock.com',
        password: 'mock',
      }
    };
    const response = await auth(mockReq, mockRes);

    expect(Object.prototype.hasOwnProperty.call(response, 'token')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(response, 'userId')).toBe(true);
  });
});
