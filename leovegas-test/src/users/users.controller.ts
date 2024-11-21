import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Request,
  ForbiddenException,
  Param,
  Put,
  Body,
  Delete,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request as Req } from '../common/interfaces/request.interface';
import { ROLES } from '../common/constants';

import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { User } from '../common/interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden access to resource',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server han an error',
  })
  async listUsers(@Request() req: Req): Promise<User[]> {
    if (req.user.role !== ROLES.admin) {
      throw new ForbiddenException();
    }

    return this.usersService.listUsers();
  }

  @Get('user/:userId')
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden access to resource',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server han an error',
  })
  async getUser(
    @Param('userId') userId: string,
    @Request() req: Req,
  ): Promise<User> {
    if (req.user.role !== ROLES.admin && req.user.id !== userId) {
      throw new ForbiddenException();
    }

    const user = await this.usersService.getUser(userId);

    if (!user && req.user.role === ROLES.admin) {
      throw new NotFoundException();
    }

    if (req.user.role !== ROLES.admin && user.role) {
      delete user.role;
    }

    return user;
  }

  @Put('user/:userId')
  @HttpCode(204)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden access to resource',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server han an error',
  })
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UpdateUserDto,
    @Request() req: Req,
  ): Promise<void> {
    if (req.user.role !== ROLES.admin && req.user.id !== userId) {
      throw new ForbiddenException();
    }

    await this.usersService.updateUser(
      userId,
      body,
      req.user.role === ROLES.admin,
    );

    return;
  }

  @Delete('user/:userId')
  @HttpCode(204)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden access to resource',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server han an error',
  })
  async deleteUser(
    @Param('userId') userId: string,
    @Request() req: Req,
  ): Promise<void> {
    if (
      req.user.role !== ROLES.admin ||
      (req.user.role === ROLES.admin && req.user.id === userId)
    ) {
      throw new ForbiddenException();
    }

    await this.usersService.deleteUser(userId);

    return;
  }

  @Post('user')
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server han an error',
  })
  async createUser(@Body() body: CreateUserDto): Promise<any> {
    const { access_token, id } = await this.usersService.createUser(body);
    return { access_token, id };
  }
}
