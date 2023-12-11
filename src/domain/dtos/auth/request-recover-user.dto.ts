import { Validators } from '../../../config';

export class ReqRecoverUserDto {
  constructor(public email: string) {}

  static create(object: { [key: string]: any }): [string?, ReqRecoverUserDto?] {
    const { email } = object;

    // make validation
    if (!email) return ['El email del usuario es requerido'];
    if (!Validators.email.test(email)) return ['El email ingresado no es válido'];

    return [undefined, new ReqRecoverUserDto(email)];
  }
}
