import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { UserSchema, USER_SCHEMA_NAME } from './models/user.model';
import { JwtService } from './services/jwt.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/auth.controller';
import { FileService } from './services/file.service';
import { UserController } from './controllers/user.controller';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.SERVER_DB),
    MongooseModule.forFeature([{ name: USER_SCHEMA_NAME, schema: UserSchema }]),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [JwtService, AuthService, UserService, FileService],
})
export class AppModule {}
