import { Inject, Injectable } from '@nestjs/common';
import { USER_SCHEMA_NAME, UserDocument } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateUser, IUser } from '../interfaces/user.interface';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { FileService } from './file.service';

@Injectable()
export class UserService {
  @Inject(FileService) fileService: FileService;

  constructor(
    @InjectModel(USER_SCHEMA_NAME)
    private userModel: Model<UserDocument>,
  ) {}

  getUsers() {
    return this.userModel.find();
  }

  createUser(user: ICreateUser): Promise<IUser> {
    return this.userModel.create(user);
  }

  getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  updateUser(id: string, user: Partial<UpdateUserDTO>): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async updatePicture(user: IUser, file: any): Promise<IUser> {
    const picture = await this.fileService.saveFile(user.email, file);
    return this.userModel.findByIdAndUpdate(
      user._id,
      { picture },
      { new: true },
    );
  }
}
