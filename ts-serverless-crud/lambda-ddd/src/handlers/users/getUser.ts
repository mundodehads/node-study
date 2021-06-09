import User from '../../domain/entities/users';
import UsersRepository from '../../domain/repositories/users-repository';

async function getUser(userId: string): Promise<User> {
  const usersRepository = new UsersRepository();

  return usersRepository.getUser(userId);
}

export const handler = async (event: any) => {
  try {
    console.log('[ts-serverless-crud][getUser][info]', event);
    const user: User = await getUser(event.pathParameters.userId);

    return {
      body: JSON.stringify(user || {}),
    };
  } catch (e) {
    console.log('[ts-serverless-crud][getUser][error]', e.message);
    throw e;
  }
};
