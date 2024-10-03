import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUser } from '../interfaces/user.interface';
dotenv.config();

@Injectable()
export class JwtService {
  checkToken(token: string): IUser {
    try {
      const user: IUser = jwt.verify(token, process.env.JWT_SECRET);
      return user;
    } catch (error: any) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  generateToken(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        JSON.stringify(payload),
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            console.log(err);
            return reject('error generate token');
          }
          resolve(token);
        },
      );
    });
  }
}
