import * as GetRepositoriesByUser from './getRepositoriesByUser';

jest.mock('../../infra/octokit/octokitapi', () => ({
  getInstance() {
    return {
      getReposByUsername: (username: string) => ([{
        fork: false,
        name: 'mock-name',
        owner: { login: username || 'mock-login' },
      }]),
      getBranchesByOwnerAndRepositoryParallel: (owner: string, name: string) => ([{
        name,
        commit: { sha: owner },
      }]),
    };
  }
}));

describe('Get repositories by user handler', () => {
  describe('return a sucessuful response with code 200 when', () => {
    it('call handler function with required path parameters', async () => {
      const result = await GetRepositoriesByUser.handler({
        pathParameters: 'mock-user',
        headers: {},
      });
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.length).toBe(1);
    });
  });
  describe('return a error when', () => {
    it('call handler function with Acept header with value application/xml', async () => {
      const result = await GetRepositoriesByUser.handler({
        pathParameters: 'mock-user',
        headers: { Accept: 'application/xml' },
      });
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(406);
      expect(body.status).toBe(406);
      expect(body.message).toBe('Not Acceptable');
    });

    it('call handler function without headers and pathParameters', async () => {
      const result = await GetRepositoriesByUser.handler({});
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(500);
      expect(body.status).toBe(500);
      expect(body.message).toBe('Internal Server Error');
    });
  });
});