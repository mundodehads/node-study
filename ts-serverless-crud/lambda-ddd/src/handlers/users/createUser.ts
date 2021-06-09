import User from '../../domain/entities/users';
import UsersRepository from '../../domain/repositories/users-repository';

async function createUser(age: number | undefined, name: string): Promise<string> {
  const user = Object.assign(new User(), {
    name,
  });

  if (age) {
    user.age = age;
  }

  const usersRepository = new UsersRepository();
  const newUser = await usersRepository.saveUser(user);

  return newUser.userId;
}

export const handler = async (event: any) => {
  try {
    console.log('[ts-serverless-crud][createUser][info]', event);
    const body = JSON.parse(event.body);
    const userId = await createUser(body.age, body.name);

    return {
      statusCode: 201,
      body: JSON.stringify({ userId }),
      headers: {
        Location: `/users/${userId}`,
      }
    };
  } catch (e) {
    console.log('[ts-serverless-crud][createUser][error]', e.message);
    throw e;
  }
};
