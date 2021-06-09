import OctokitAPI from '../../infra/octokit/octokitapi';
import IBranch from '../../domain/interfaces/branch';
import IRepository from '../../domain/interfaces/repository';

function checkAcceptHeaders(headers: any) {
  if (headers.Accept && headers.Accept === 'application/xml') {
    const error = new Error('Not Acceptable');
    error.name = '406';
    throw error;
  }
}

async function getRepositoriesByUser(username: string): Promise<IRepository[]> {
  const octokit = OctokitAPI.getInstance();

  const repositories = await octokit.getReposByUsername(username);

  return repositories
    .filter((repositoryFilter: any) => !repositoryFilter.fork)
    .map((repositoryMap: any) => ({
      name: repositoryMap.name,
      owner: repositoryMap.owner.login,
    }));
}

async function getRepositoriesBranches(repositories: IRepository[]): Promise<IBranch[]> {
  const octokit = OctokitAPI.getInstance();

  return Promise.all(repositories.map(((repository: IRepository) => (octokit.getBranchesByOwnerAndRepositoryParallel(repository.owner, repository.name)))))
    .then((repositoriesBranches: any) => (repositoriesBranches.map((branches: any) => branches.map((branch: any) => ({
      name: branch.name,
      lastCommitSha: branch.commit ? branch.commit.sha : '',
    })))));
}

function mergeRepositoriesAndBranches(repositories: IRepository[], branches: IBranch[]): void {
  for (let i = 0; i < branches.length; i++) {
    repositories[i].branches = branches[i];
  }
}

export const handler = async (event: any): Promise<any> => {
  try {
    checkAcceptHeaders(event.headers);
    const repositories = await getRepositoriesByUser(event.pathParameters.user);
    const branches = await getRepositoriesBranches(repositories);
    mergeRepositoriesAndBranches(repositories, branches);

    return {
      body: JSON.stringify(repositories),
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: JSON.stringify({
        status: parseInt(error.name, 10) || 500,
        message: parseInt(error.name, 10) ? error.message : 'Internal Server Error',
      }),
      statusCode: parseInt(error.name, 10) || 500,
    };
  }
};
