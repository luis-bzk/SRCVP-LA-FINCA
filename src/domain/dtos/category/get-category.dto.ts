import { isValidObjectId } from 'mongoose';

export class GetCategoryDto {
  constructor(public id: string) {}

  static create(id: string): [string?, GetCategoryDto?] {
    if (!id) return ['El ID de la categoría es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la categoría no es válido'];

    return [undefined, new GetCategoryDto(id)];
  }
}
