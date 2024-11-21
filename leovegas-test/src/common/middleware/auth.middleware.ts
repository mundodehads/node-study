import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UsersService } from '../../users/users.service';
import { Request } from '../interfaces/request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const access_token = (authHeaders as string).split(' ')[1];
      const user = await this.userService.findByAccessToken(access_token);

      if (!user) {
        throw new UnauthorizedException();
      }

      req.user = user;
      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
