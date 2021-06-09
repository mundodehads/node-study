import OctokitAPI from './octokitapi';

jest.mock('@octokit/core', () => ({
  Octokit: class Octokit {
    async request(route: string, parameters: any): Promise<any> {
      if ((parameters.username &&  parameters.username === 'mock-error') || parameters.owner &&  parameters.owner === 'mock-error') {
        return {
          route,
          parameters,
          status: 500,
        };
      }
      return {
        status: 200,
        data: [],
      };
    }
  },
}));

describe('Octokit api class', () => {
  describe('OctokitAPI Instance', () => {
    it('should instantiate when getInstance is called', () => {
     const octokit = OctokitAPI.getInstance();
     
     expect(octokit).toBeDefined();
    });
  });
  describe('getReposByUsername method', () => {
    it('when a mocked username is provided should return data', async () => {
     const octokit = OctokitAPI.getInstance();
     const result = await octokit.getReposByUsername('mock-username');
     
     expect(result.length).toBe(0);
    });
    it('when a mocked username with error is provided should throw error', async () => {
      try {
        const octokit = OctokitAPI.getInstance();
        await octokit.getReposByUsername('mock-error');        
      } catch (error) {
        expect(error.name).toBe('400');
        expect(error.message).toBe('Cannot find data for this username');
      }
     });
  });
  describe('getBranchesByOwnerAndRepository method', () => {
    it('when a mocked owner and repository is provided should return data', async () => {
     const octokit = OctokitAPI.getInstance();
     const result = await octokit.getBranchesByOwnerAndRepository('mock-owner', 'mock-repository');
     
     expect(result.length).toBe(0);
    });
    it('when a mocked owner and repository with error is provided should throw error', async () => {
      try {
        const octokit = OctokitAPI.getInstance();
        await octokit.getBranchesByOwnerAndRepository('mock-error', 'mock-error');        
      } catch (error) {
        expect(error.name).toBe('400');
        expect(error.message).toBe('Cannot find data for this owner and repository');
      }
     });
  });
  describe('getBranchesByOwnerAndRepositoryParallel method', () => {
    it('when a mocked owner and repository is provided should return data', async () => {
     const octokit = OctokitAPI.getInstance();
     const result = await octokit.getBranchesByOwnerAndRepositoryParallel('mock-owner', 'mock-repository');
     
     expect(result.length).toBe(0);
    });
    it('when a mocked owner and repository with error is provided should return empty data', async () => {
      const octokit = OctokitAPI.getInstance();
      const result = await octokit.getBranchesByOwnerAndRepositoryParallel('mock-error', 'mock-error');

      expect(result.length).toBe(1);
    });
  });
});