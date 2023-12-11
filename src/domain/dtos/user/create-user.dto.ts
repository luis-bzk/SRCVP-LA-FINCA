import { Validators } from '../../../config';

export class CreateUserDto {
  constructor(public name: string, public lastName: string, public email: string) {}

  static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, lastName, email } = object;

    if (!name) return ['El nombre del usuario es requerido.'];
    if (!lastName) return ['El apellido del usuario es requerido.'];
    if (!email) return ['El email del usuario es requerido'];
    if (!Validators.email.test(email)) return ['El email ingresado no es válido'];

    return [undefined, new CreateUserDto(name, lastName, email)];
  }
}
