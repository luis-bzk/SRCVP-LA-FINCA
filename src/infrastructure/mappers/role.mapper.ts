import { Role } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class RoleMapper {
  static entityFromObject(object: { [key: string]: any }) {
    const { _id, name } = object;

    if (!_id) throw CustomError.badRequest('Falta el id del rol');
    if (!name) throw CustomError.badRequest('Falta el nombre del rol');

    return new Role({ id: _id, name });
  }

  static entitiesFromObject(objects: { [key: string]: any }[]) {
    return objects.map((role) => this.entityFromObject(role));
  }
}
