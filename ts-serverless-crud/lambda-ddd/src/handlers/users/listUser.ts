import User from '../../domain/entities/users';
import UsersRepository from '../../domain/repositories/users-repository';

async function listUsers(): Promise<User[]> {
  const usersRepository = new UsersRepository();

  return usersRepository.listUsers();
}

export const handler = async (event: any) => {
  try {
    console.log('[ts-serverless-crud][listUser][info]', event);
    const users = await listUsers();

    return {
      body: JSON.stringify({ users }),
    };
  } catch (e) {
    console.log('[ts-serverless-crud][listUser][error]', e.message);
    throw e;
  }
};
