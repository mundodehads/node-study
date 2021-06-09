import { Octokit } from "@octokit/core";

export default class OctokitAPI {
  private static instance: OctokitAPI;
  private _octokit: Octokit;

  constructor() {
    this._octokit = new Octokit();
  }

  static getInstance(): OctokitAPI {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  async getReposByUsername(username: string): Promise<any> {
    const repos = await this._octokit.request('GET /users/{username}/repos', {
      username,
    });

    if (!repos || repos.status !== 200) {
      const error = new Error('Cannot find data for this username');
      error.name = '400';
      throw error;
    }

    return repos.data;
  }

  async getBranchesByOwnerAndRepository(owner: string, repository: string): Promise<any> {
    const branches = await this._octokit.request('GET /repos/{owner}/{repo}/branches', {
      owner,
      repo: repository,
    })

    if (!branches || branches.status !== 200) {
      const error = new Error('Cannot find data for this owner and repository');
      error.name = '400';
      throw error;
    }

    return branches.data;
  }

  async getBranchesByOwnerAndRepositoryParallel(owner: string, repository: string): Promise<any> {
    try {
      const data = await this.getBranchesByOwnerAndRepository(owner, repository);
      return data;
    } catch {
      return [{
        name: '',
        commit: { sha: '' },
      }];
    }
  }
}