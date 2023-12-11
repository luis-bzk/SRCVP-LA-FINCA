import { isValidObjectId } from 'mongoose';

export class GetCompanyDto {
  constructor(public id: string) {}

  static create(id: string): [string?, GetCompanyDto?] {
    if (!id) return ['El ID de la compañía es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la compañía no es válido'];

    return [undefined, new GetCompanyDto(id)];
  }
}
