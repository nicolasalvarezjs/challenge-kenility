import { Exclude, Expose, Type } from 'class-transformer';

export class UserDTO {
  @Expose()
  _id: string;
  @Expose()
  name: string;
  @Expose()
  lastName: string;
  @Expose()
  address: string;
  @Expose()
  picture: string;
  @Expose()
  email: string;
  @Exclude()
  password: string;
}

export class AuthDTO {
  @Expose()
  @Type(() => UserDTO)
  user: UserDTO;

  @Expose()
  token: string;
}
