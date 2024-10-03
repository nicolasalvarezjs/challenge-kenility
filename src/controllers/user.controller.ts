import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDTO } from '../dtos/user.dto';
import { TransformInterceptor } from '../interceptors/password.interceptor';

@Controller('user')
@UseGuards(AuthGuard)
@UseInterceptors(new TransformInterceptor(UserDTO))
export class UserController {
  @Inject() private userService: UserService;

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/picture/:fileName')
  getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'public', fileName);
    return res.sendFile(filePath);
  }

  @Put()
  updateUser(@Body() user: UpdateUserDTO, @GetUser('_id') id: string) {
    return this.userService.updateUser(id, user);
  }

  @Patch('picture')
  @UseInterceptors(FileInterceptor('picture'))
  updatePicture(@UploadedFile() file: any, @GetUser() user: IUser) {
    return this.userService.updatePicture(user, file);
  }
}
