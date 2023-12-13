import { isValidObjectId } from 'mongoose';

export class DeleteCategoryDto {
  constructor(public id: string) {}

  static create(id: string): [string?, DeleteCategoryDto?] {
    if (!id) return ['El ID de la categoría es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la categoría no es válido'];

    return [undefined, new DeleteCategoryDto(id)];
  }
}
