import { isValidObjectId } from 'mongoose';

export class DeleteProductDto {
  constructor(public id: string) {}

  static create(id: string): [string?, DeleteProductDto?] {
    if (!id) return ['El ID del producto es requerido'];
    if (!isValidObjectId(id)) return ['El ID del producto no es valido'];

    return [undefined, new DeleteProductDto(id)];
  }
}
