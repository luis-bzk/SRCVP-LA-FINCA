import { isValidObjectId } from 'mongoose';

export class GetProvinceDto {
  constructor(public id: string) {}

  static create(id: string): [string?, GetProvinceDto?] {
    if (!id) return ['El ID de la provincia es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la provincia no es válido'];

    return [undefined, new GetProvinceDto(id)];
  }
}
