import { isValidObjectId } from 'mongoose';

export class DeleteProvinceDto {
  constructor(public id: string) {}

  static create(id: string): [string?, DeleteProvinceDto?] {
    if (!id) return ['El ID de la provincia es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la provincia no es válido'];

    return [undefined, new DeleteProvinceDto(id)];
  }
}
