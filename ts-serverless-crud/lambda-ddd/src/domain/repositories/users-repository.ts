import User from '../entities/users';
import BaseRepository from './repository-base';
import { equals } from '@aws/dynamodb-expressions';

export default class UsersRepository extends BaseRepository {
  constructor() {
    super();
  }

  public async listUsers(): Promise<User[]> {
    const users: User[] = [];

    const options: any = {
      filter: {
        type: 'And',
        conditions: [
          {
            ...equals(false),
            subject: 'deleted',
          },
        ],
      },
    };

    for await (const data of this.mapper.scan(User, options)) {
      users.push(data);
    }

    return users;
  }

  public async getUser(userId: string, fields: string[] = []): Promise<User> {
    const users: User[] = [];

    const options: any = {
      filter: {
        type: 'And',
        conditions: [
          {
            ...equals(false),
            subject: 'deleted',
          },
        ],
      },
    };
    if (fields.length > 0) {
      options.projection = fields;
    }

    for await (const user of this.mapper.query(
        User,
        { userId },
        options,
      )
    ) {
      users.push(user);
    }

    return users[0];
  }

  public async saveUser(user: User): Promise<User> {
    return this.mapper.put(user);
  }
}
