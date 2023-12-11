import { Address } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class AddressMapper {
  static entityFromObject(object: { [key: string]: any }) {
    const { _id, id_city, id_country, id_province, main_street, secondary_street = '', postal_code = '' } = object;

    if (!_id) throw CustomError.badRequest('Falta el ID de la dirección');
    if (!id_city) throw CustomError.badRequest('Falta el ID de la ciudad de la dirección');
    if (!id_country) throw CustomError.badRequest('Falta ID del país de la dirección');
    if (!id_province) throw CustomError.badRequest('Falta el ID de la provincia de la dirección');
    if (!main_street) throw CustomError.badRequest('Falta el nombre de la calle principal de la dirección');

    return new Address({ id: _id, id_city, id_country, id_province, main_street, secondary_street, postal_code });
  }

  static entitiesFromObject(objects: { [key: string]: any }[]) {
    return objects.map((address) => this.entityFromObject(address));
  }
}
