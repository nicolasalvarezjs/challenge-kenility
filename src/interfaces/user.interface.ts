export interface IUser extends ICreateUser {
  _id: string;
}

export interface ICreateUser {
  name: string;
  lastName: string;
  address: string;
  picture: string;
  email: string;
}
