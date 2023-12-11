import { Province } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class ProvinceMapper {
  static entityFromObject(object: { [key: string]: any }) {
    const { _id, name, id_country } = object;

    if (!_id) throw CustomError.badRequest('Falta el id de la provincia');
    if (!name) throw CustomError.badRequest('Falta el nombre de la provincia');
    if (!id_country) throw CustomError.badRequest('Falta el id del país');

    return new Province({ id: _id, id_country, name });
  }

  static entitiesFromObject(objects: { [key: string]: any }[]) {
    return objects.map((province) => this.entityFromObject(province));
  }
}
