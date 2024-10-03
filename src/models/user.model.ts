import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export type UserDocument = UserModel & Document;

@Schema({
  toJSON: {
    transform: function (doc: any, ret: any) {
      delete ret.__v;
    },
  },
})
export class UserModel implements IUser {
  _id: string;

  @Prop({ required: true, min: 1, max: 30 })
  name: string;

  @Prop({ required: true, min: 1, max: 30 })
  lastName: string;

  @Prop({ required: true, max: 100 })
  address: string;

  @Prop({ required: true })
  picture: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
export const USER_SCHEMA_NAME = 'User';
