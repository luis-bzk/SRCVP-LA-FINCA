import { isValidObjectId } from 'mongoose';
import { Validators } from '../../../config';

export class CreateCompanyDto {
  constructor(
    public name: string,
    public social_reason: string,
    public email: string,
    public RUC: string,
    public phone: string,
    public cellphone: string,
    public id_address: string,
    public domain: string,
    public schedule: string,
    public id_user: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCompanyDto?] {
    const { name, social_reason, email, RUC, phone, cellphone, id_address, domain, schedule, id_user } = object;

    // make validation
    if (!name) return ['El nombre de la compañía es requerido'];
    if (!social_reason) return ['La razón social de la compañía es requerido'];
    if (!email) return ['El nombre de la compañía es requerido'];
    if (!Validators.email.test(email)) return ['El email de la compañía no es válido'];
    if (!RUC) return ['El nombre de la compañía es requerido'];
    if (RUC.length !== 13) return ['El RUC de la compañía no es válido'];
    if (isNaN(RUC)) return ['El RUC de la compañía no es válido'];
    if (phone && isNaN(phone)) return ['El número de teléfono de la compañía no es válido'];
    if (!cellphone) return ['El número de celular de la compañía es requerido'];
    if (isNaN(cellphone)) return ['El número de celular de la compañía no es válido'];
    if (!id_address) return ['El ID de la dirección de la compañía es requerido'];
    if (!isValidObjectId(id_address)) return ['El ID de la compañía no es válido'];
    if (!domain) return ['El nombre de la compañía es requerido'];
    if (!Validators.url.test(domain)) return ['El URL del dominio de la compañía no es válido'];
    if (!schedule) return ['El nombre de la compañía es requerido'];
    if (!id_user) return ['El ID del usuario es requerido'];
    if (!isValidObjectId(id_user)) return ['El ID del usuario no es válido'];
    return [
      undefined,
      new CreateCompanyDto(name, social_reason, email, RUC, phone, cellphone, id_address, domain, schedule, id_user),
    ];
  }
}
