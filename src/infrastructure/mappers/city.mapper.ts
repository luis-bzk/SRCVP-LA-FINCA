import { City } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class CityMapper {
  static entityFromObject(object: { [key: string]: any }) {
    const { _id, name, id_province } = object;

    if (!_id) throw CustomError.badRequest('Falta el ID de la ciudad');
    if (!name) throw CustomError.badRequest('Falta el nombre de la ciudad');
    if (!id_province) throw CustomError.badRequest('Falta el ID de la provincia de la ciudad');

    return new City({ id: _id, name, id_province });
  }

  static entitiesFromObject(objects: { [key: string]: any }[]) {
    return objects.map((city) => this.entityFromObject(city));
  }
}
