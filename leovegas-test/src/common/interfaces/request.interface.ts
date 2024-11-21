import { Request as Req } from 'express';
import { User } from './user.interface';

export interface Request extends Req {
  user: User;
}
