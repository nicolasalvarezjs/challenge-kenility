import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BcryptService } from '../services/bcrypt.service';
import { ICreateUser } from '../interfaces/user.interface';

const bcryptService = new BcryptService();

export class CreateUserDTO implements ICreateUser {
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  address: string;

  picture: any;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @Transform(({ value }) => value.toLowerCase())
  lastName: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Transform(({ value }) => bcryptService.encryptPassword(value))
  password: string;
}
