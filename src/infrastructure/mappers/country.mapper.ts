import { Country } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class CountryMapper {
  static entityFromObject(object: { [key: string]: any }) {
    const { _id, name, code, prefix } = object;

    if (!_id) throw CustomError.badRequest('Falta el ID del país');
    if (!name) throw CustomError.badRequest('Falta el nombre del país');
    if (!code) throw CustomError.badRequest('Falta el code del país');
    if (!prefix) throw CustomError.badRequest('Falta el prefix del país');

    return new Country({ id: _id, name, code, prefix });
  }

  static entitiesFromObject(objects: { [key: string]: any }[]) {
    return objects.map((country) => this.entityFromObject(country));
  }
}
