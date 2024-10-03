import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthDTO, UserDTO } from '../dtos/user.dto';
import { TransformInterceptor } from '../interceptors/password.interceptor';

@Controller('auth')
@UseInterceptors(new TransformInterceptor(AuthDTO))
export class AuthController {
  @Inject() private authService: AuthService;

  @Post('register')
  @UseInterceptors(FileInterceptor('picture'))
  register(
    @UploadedFile() file: any,
    @Body() createUser: CreateUserDTO,
  ): Promise<{ user: UserDTO; token: string }> {
    return this.authService.register(createUser, file);
  }

  @Post('login')
  login(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<{ user: UserDTO; token: string }> {
    return this.authService.login(email, password);
  }
}
