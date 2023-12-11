import { PublicUserData } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class PublicUserDataMapper {
  static entityFromObject(object: { [key: string]: any }) {
    const { _id, identification, id_user, id_address, primary_phone, secondary_phone } = object;

    if (!_id) throw CustomError.badRequest('Falta el id del rol');
    if (!identification) throw CustomError.badRequest('Falta la identificación del usuario');
    if (!id_user) throw CustomError.badRequest('Falta el id del usuario');
    if (!id_address) throw CustomError.badRequest('Falta el id de la dirección');
    if (!primary_phone) throw CustomError.badRequest('Falta el número de teléfono celular');

    return new PublicUserData({ id: _id, identification, id_user, id_address, primary_phone, secondary_phone });
  }

  static entitiesFromObject(objects: { [key: string]: any }[]) {
    return objects.map((pubData) => this.entityFromObject(pubData));
  }
}
