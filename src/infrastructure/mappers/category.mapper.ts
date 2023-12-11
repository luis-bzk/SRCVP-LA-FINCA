import { Category } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class CategoryMapper {
  static entityFromObject(object: { [key: string]: any }) {
    const { _id, name, description } = object;

    if (!_id) throw CustomError.badRequest('Falta el ID de la categoria');
    if (!name) throw CustomError.badRequest('Falta el nombre de la categoria');
    if (!description) throw CustomError.badRequest('Falta la descripcion de la categoria');

    return new Category({ id: _id, name, description });
  }

  static entitiesFromObject(objects: { [key: string]: any }[]) {
    return objects.map((category) => this.entityFromObject(category));
  }
}
