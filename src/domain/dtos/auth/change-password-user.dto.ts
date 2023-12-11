// Data transfer object

import { Validators } from '../../../config';

export class ChangePasswordUserDto {
  constructor(public password: string, public token: string) {}

  static create(object: { [key: string]: any }): [string?, ChangePasswordUserDto?] {
    const { password, token } = object;

    // make validation
    if (!token) return ['El token de verificación es requerido'];
    if (!password) return ['La contraseña del usuario es requerido'];
    if (password.length < 8) return ['La contraseña del usuario debe tener mínimo 8 caracteres'];
    if (!Validators.passwordLowerCase.test(password)) return ['La contraseña debe tener letras minúsculas'];
    if (!Validators.passwordUpperCase.test(password)) return ['La contraseña debe tener letras mayúsculas'];
    if (!Validators.passwordNumbers.test(password)) return ['La contraseña debe tener números'];
    if (!Validators.passwordSpecialChars.test(password)) return ['La contraseña debe tener caracteres especiales'];

    return [undefined, new ChangePasswordUserDto(password, token)];
  }
}
