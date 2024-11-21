import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../common/interfaces/user.interface';
import { Request as Req } from '../common/interfaces/request.interface';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

const MOCKED_USERS: User[] = [
  {
    id: '0',
    name: 'Jon Doe Administrator',
    password: 'jondoe321',
    email: 'jon+admin@doe.com',
    role: 'ADMIN',
    access_token: 'admin',
  },
  {
    id: '1',
    name: 'Jon Doe Regular',
    password: 'jondoe123',
    email: 'jon@doe.com',
    role: 'USER',
    access_token: 'default',
  },
];

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            listUsers: jest.fn(),
            getUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('listUsers', () => {
    it('should list all users if the requester is an admin', async () => {
      jest.spyOn(usersService, 'listUsers').mockResolvedValue(MOCKED_USERS);

      const req = { user: MOCKED_USERS[0] } as Req; // Admin
      const res = await usersController.listUsers(req);

      expect(res.length).toBe(MOCKED_USERS.length);
      expect(usersService.listUsers).toHaveBeenCalled();
    });

    it('should forbid access to resource if requester is not an admin', async () => {
      const req = { user: MOCKED_USERS[1] } as Req; // Regular user

      await expect(usersController.listUsers(req)).rejects.toThrow(
        ForbiddenException,
      );
      expect(usersService.listUsers).not.toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should allow a user to view their own details', async () => {
      const req = { user: MOCKED_USERS[1] } as Req; // Regular user
      const { name, email, role } = MOCKED_USERS[1];
      jest
        .spyOn(usersService, 'getUser')
        .mockResolvedValue({ name, email, role });

      const res = await usersController.getUser(MOCKED_USERS[1].id, req);
      expect(res).toEqual({
        name: MOCKED_USERS[1].name,
        email: MOCKED_USERS[1].email,
        role: undefined,
      });
    });

    it('should forbid access if a user tries to view another user’s details', async () => {
      const req = { user: MOCKED_USERS[1] } as Req; // Regular user

      await expect(
        usersController.getUser(MOCKED_USERS[0].id, req),
      ).rejects.toThrow(ForbiddenException);
      expect(usersService.getUser).not.toHaveBeenCalled();
    });

    it('should allow an admin to view any user’s details', async () => {
      const req = { user: MOCKED_USERS[0] } as Req; // Admin
      const { name, email, role } = MOCKED_USERS[1];
      jest
        .spyOn(usersService, 'getUser')
        .mockResolvedValue({ name, email, role });

      const res = await usersController.getUser(MOCKED_USERS[1].id, req);

      expect(res).toEqual({
        name: MOCKED_USERS[1].name,
        email: MOCKED_USERS[1].email,
        role: MOCKED_USERS[1].role,
      });
    });

    it('should return a 404 if a non-existent user is requested', async () => {
      const req = { user: MOCKED_USERS[0] } as Req; // Admin
      jest.spyOn(usersService, 'getUser').mockResolvedValue(null);

      await expect(usersController.getUser('invalid-id', req)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateUser', () => {
    it('should allow a user to update their own details', async () => {
      const req = { user: MOCKED_USERS[1] } as Req; // Regular user
      const updateData: Partial<UpdateUserDto> = { name: 'Updated Name' };

      jest.spyOn(usersService, 'updateUser').mockResolvedValue();

      // @ts-ignore
      await usersController.updateUser(MOCKED_USERS[1].id, updateData, req);
      expect(usersService.updateUser).toHaveBeenCalledWith(
        MOCKED_USERS[1].id,
        updateData,
        false,
      );
    });

    it('should allow an admin to update another user’s details', async () => {
      const req = { user: MOCKED_USERS[0] } as Req; // Admin
      const updateData: Partial<UpdateUserDto> = { role: 'ADMIN' };

      jest.spyOn(usersService, 'updateUser').mockResolvedValue();

      // @ts-ignore
      await usersController.updateUser(MOCKED_USERS[1].id, updateData, req);
      expect(usersService.updateUser).toHaveBeenCalledWith(
        MOCKED_USERS[1].id,
        updateData,
        true,
      );
    });

    it('should forbid a user from updating another user’s details', async () => {
      const req = { user: MOCKED_USERS[1] } as Req; // Regular user
      const updateData: Partial<UpdateUserDto> = { name: 'Updated Name' };

      await expect(
        // @ts-ignore
        usersController.updateUser(MOCKED_USERS[0].id, updateData, req),
      ).rejects.toThrow(ForbiddenException);
      expect(usersService.updateUser).not.toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should allow an admin to delete another user', async () => {
      const req = { user: MOCKED_USERS[0] } as Req; // Admin

      jest.spyOn(usersService, 'deleteUser').mockResolvedValue();

      await usersController.deleteUser(MOCKED_USERS[1].id, req);
      expect(usersService.deleteUser).toHaveBeenCalledWith(MOCKED_USERS[1].id);
    });

    it('should forbid a user from deleting another user', async () => {
      const req = { user: MOCKED_USERS[1] } as Req; // Regular user

      await expect(
        usersController.deleteUser(MOCKED_USERS[0].id, req),
      ).rejects.toThrow(ForbiddenException);
      expect(usersService.deleteUser).not.toHaveBeenCalled();
    });

    it('should forbid an admin from deleting themselves', async () => {
      const req = { user: MOCKED_USERS[0] } as Req; // Admin

      await expect(
        usersController.deleteUser(MOCKED_USERS[0].id, req),
      ).rejects.toThrow(ForbiddenException);
      expect(usersService.deleteUser).not.toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a user and return access token and ID', async () => {
      const createUserDto: CreateUserDto = {
        name: 'New User',
        email: 'new@user.com',
        password: 'password',
        role: 'USER',
      };

      const createdUser = { access_token: 'USER', id: '2' };
      jest.spyOn(usersService, 'createUser').mockResolvedValue(createdUser);

      const res = await usersController.createUser(createUserDto);
      expect(res).toEqual(createdUser);
    });
  });
});
