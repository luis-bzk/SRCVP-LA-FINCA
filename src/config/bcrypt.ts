import { compareSync, hashSync, genSaltSync } from 'bcryptjs';

export class BcryptAdapter {
  static hash(password: string): string {
    return hashSync(password);
  }

  static compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }

  static genSalt() {
    return genSaltSync();
  }
}
