import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class BcryptService {
  checkPassword(password: string, passwordEncrypted: string): boolean {
    return compareSync(password, passwordEncrypted);
  }

  encryptPassword(password: string): string {
    const salt = genSaltSync();
    return hashSync(password, salt);
  }
}
