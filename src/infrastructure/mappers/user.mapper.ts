import { User } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, name, email, lastName, state, token, id_role } = object;

    if (!_id) throw CustomError.badRequest('Falta el id del usuario');
    if (!name) throw CustomError.badRequest('Falta el nombre del usuario');
    if (!lastName) throw CustomError.badRequest('Falta el apellido del usuario');
    if (!email) throw CustomError.badRequest('Falta el email del usuario');
    if (!state) throw CustomError.badRequest('Falta el estado del usuario');
    if (!id_role) throw CustomError.badRequest('Falta el rol del usuario');

    return new User({ id: _id, name, lastName, email, state, token: token || '', id_role });
  }

  static userEntitiesFromObject(objects: { [key: string]: any }[]) {
    return objects.map((user) => this.userEntityFromObject(user));
  }
}
