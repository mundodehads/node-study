const login = require('./login');

const mockRes = {
  status: (...args) => ({}),
  json: (...args) => (args[0]),
};

const mockUser = {
  password: '$2a$10$LaztH2VOSYDscU3YIcJejOcpgHsli4dIvT23a4DpLqwGB8wBILJSK',
}

jest.mock('../models/users', () => ({
  findOne: (...args) => ({
    lean: (...leanArgs) => (mockUser),
  }),
}));

describe('Login Controller Tests', () => {
  test('Should return an token after valid login', async () => {
    const mockReq = {
      body: {
        email: 'mock@mock.com',
        password: 'mock',
      }
    };
    const response = await login(mockReq, mockRes);

    expect(Object.prototype.hasOwnProperty.call(response, 'token')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(response, 'userId')).toBe(true);
  });
});
