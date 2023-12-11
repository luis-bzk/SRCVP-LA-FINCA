import { Company } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class CompanyMapper {
  static entityFromObject(object: { [key: string]: any }) {
    const { _id, name, social_reason, email, RUC, phone, cellphone, id_address, domain, schedule, id_user } = object;

    if (!_id) throw CustomError.badRequest('Falta el id de la compañía');
    if (!name) throw CustomError.badRequest('Falta el nombre de la compañía');
    if (!social_reason) throw CustomError.badRequest('Falta la razón social de la compañía');
    if (!email) throw CustomError.badRequest('Falta el email de la compañía');
    if (!RUC) throw CustomError.badRequest('Falta el RUC de la compañía');
    if (!phone) throw CustomError.badRequest('Falta el teléfono de la compañía');
    if (!cellphone) throw CustomError.badRequest('Falta el teléfono celular de la compañía');
    if (!id_address) throw CustomError.badRequest('Falta la dirección de la compañía');
    if (!domain) throw CustomError.badRequest('Falta el dominio de la compañía');
    if (!schedule) throw CustomError.badRequest('Falta el horario de la compañía');
    if (!id_user) throw CustomError.badRequest('Falta el id del usuario de la compañía');

    return new Company({
      id: _id,
      name,
      social_reason,
      email,
      RUC,
      phone,
      cellphone,
      id_address,
      domain,
      schedule,
      id_user,
    });
  }

  static entitiesFromObject(objects: { [key: string]: any }[]) {
    return objects.map((company) => this.entityFromObject(company));
  }
}
