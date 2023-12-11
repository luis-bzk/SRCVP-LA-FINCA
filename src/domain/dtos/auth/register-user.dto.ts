// Data transfer object

import { Validators } from '../../../config';

export class RegisterUserDto {
  constructor(public name: string, public lastName: string, public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, lastName, email, password } = object;

    // make validation
    if (!name) return ['El nombre del usuario es requerido'];
    if (!lastName) return ['El apellido del usuario es requerido'];
    if (!email) return ['El email del usuario es requerido'];
    if (!Validators.email.test(email)) return ['El email no es válido'];
    if (!password) return ['La contraseña del usuario es requerido'];
    if (password.length < 8) return ['La contraseña del usuario debe tener mínimo 8 caracteres'];
    if (!Validators.passwordLowerCase.test(password)) return ['La contraseña debe tener letras minúsculas'];
    if (!Validators.passwordUpperCase.test(password)) return ['La contraseña debe tener letras mayúsculas'];
    if (!Validators.passwordNumbers.test(password)) return ['La contraseña debe tener números'];
    if (!Validators.passwordSpecialChars.test(password)) return ['La contraseña debe tener caracteres especiales'];

    return [undefined, new RegisterUserDto(name, lastName, email, password)];
  }
}
