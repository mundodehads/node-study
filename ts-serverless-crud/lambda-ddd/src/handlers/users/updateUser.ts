import UsersRepository from '../../domain/repositories/users-repository';

interface IUserToUpdate {
  name?: string;
  age?: string;
};

async function updateUser(userId: string, body: IUserToUpdate) {
  const usersRepository = new UsersRepository();
  const user = await usersRepository.getUser(userId);

  const newUser = Object.assign(user, {
    name: body.name || user.name,
    age: body.age || user.age,
  });

  await usersRepository.saveUser(newUser);
}

export const handler = async (event: any) => {
  try {
    console.log('[ts-serverless-crud][updateUser][info]', event);
    const body = JSON.parse(event.body);
    await updateUser(event.pathParameters.userId, body);

    return {
      body: JSON.stringify({}),
    };
  } catch (e) {
    console.log('[ts-serverless-crud][updateUser][error]', e.message);
    throw e;
  }
};
