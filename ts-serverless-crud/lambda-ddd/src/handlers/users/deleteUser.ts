import UsersRepository from '../../domain/repositories/users-repository';

async function deleteUser(userId: string) {
  const usersRepository = new UsersRepository();
  const user = await usersRepository.getUser(userId);

  user.deleted = true;
  await usersRepository.saveUser(user);
}

export const handler = async (event: any) => {
  try {
    console.log('[ts-serverless-crud][deleteUser][info]', event);
    await deleteUser(event.pathParameters.userId);

    return {
      body: JSON.stringify({}),
    };
  } catch (e) {
    console.log('[ts-serverless-crud][deleteUser][error]', e.message);
    throw e;
  }
};
