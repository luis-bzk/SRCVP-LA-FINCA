import { isValidObjectId } from 'mongoose';

export class UpdateCategoryDto {
  constructor(public id: string, public name: string, public description: string) {}

  static create(object: { [key: string]: any }, id: string): [string?, UpdateCategoryDto?] {
    const { name, description } = object;

    if (!id) return ['El ID de la categoría es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la categoría no es válido'];
    if (!name) return ['El nombre de la categoría es requerido'];
    if (!description) return ['La descripción de la categoría es requerido'];

    return [undefined, new UpdateCategoryDto(id, name, description)];
  }
}
