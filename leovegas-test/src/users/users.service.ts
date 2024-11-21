import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { User as IUser } from '../common/interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async findByAccessToken(accessToken: string): Promise<IUser | undefined> {
    const user = await this.userRepository.findOne({
      where: { access_token: accessToken },
    });

    if (!user) return undefined;

    const { id, name, email, role } = user;
    return { id, name, email, role, access_token: user.access_token };
  }

  async listUsers(): Promise<IUser[]> {
    const users = await this.userRepository.find();
    return users.map(({ id, name, email, role }) => ({
      id,
      name,
      email,
      role,
    }));
  }

  async getUser(userId: string): Promise<IUser | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) return null;

    const { name, email, role } = user;
    return { name, email, role };
  }

  async updateUser(
    userId: string,
    body: UpdateUserDto,
    isAdmin: boolean,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) return;

    if (!isAdmin) {
      delete body.role;
    }

    await this.userRepository.update(userId, body);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async createUser(body: CreateUserDto): Promise<Partial<IUser>> {
    const id = uuid();
    const access_token = `access_${body.role}_${id}`;
    const newUser = this.userRepository.create({
      ...body,
      id,
      access_token,
    });

    await this.userRepository.save(newUser);

    return { access_token, id };
  }
}
