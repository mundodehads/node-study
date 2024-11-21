import { IsEmail, IsOptional, IsString, IsIn } from 'class-validator';
import { ROLES } from '../../common/constants';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsIn([ROLES.admin, ROLES.default])
  role: 'USER' | 'ADMIN';
}
