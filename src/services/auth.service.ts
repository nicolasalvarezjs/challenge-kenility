import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ICreateUser } from '../interfaces/user.interface';
import { UserService } from './user.service';
import { FileService } from './file.service';
import { BcryptService } from './bcrypt.service';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class AuthService {
  @Inject(JwtService)
  jwtService: JwtService;

  @Inject(UserService)
  userService: UserService;

  @Inject(FileService)
  fileService: FileService;

  async register(
    userToCreate: ICreateUser,
    file: any,
  ): Promise<{ user: UserDTO; token: string }> {
    const isUserExist = await this.userService.getUserByEmail(
      userToCreate.email,
    );
    if (isUserExist) {
      throw new BadRequestException('User already exists');
    }
    const picture = await this.fileService.saveFile(userToCreate.email, file);
    const user = await this.userService.createUser({
      ...userToCreate,
      picture,
    });
    const token = await this.jwtService.generateToken(user);
    return {
      user: user as UserDTO,
      token,
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: UserDTO; token: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Password or Email is incorrect');
    }
    const bcryptService = new BcryptService();
    const passwordIsCorrect = bcryptService.checkPassword(
      password,
      user.password,
    );
    if (!passwordIsCorrect) {
      throw new UnauthorizedException('Password or Email is incorrect');
    }
    const token = await this.jwtService.generateToken(user);
    return {
      user: user as UserDTO,
      token,
    };
  }
}
