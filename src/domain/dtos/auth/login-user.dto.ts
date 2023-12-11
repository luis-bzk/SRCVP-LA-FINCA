// Data transfer object

import { Validators } from '../../../config';

export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    // make validation
    if (!email) return ['El email del usuario es requerido'];
    if (!Validators.email.test(email)) return ['El email no es válido'];
    if (!password) return ['La contraseña del usuario es requerido'];

    return [undefined, new LoginUserDto(email, password)];
  }
}
