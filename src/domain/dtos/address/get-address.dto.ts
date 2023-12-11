import { isValidObjectId } from 'mongoose';

export class GetAddressDto {
  constructor(public id: string) {}

  static create(id: string): [string?, GetAddressDto?] {
    if (!id) return ['El ID de la dirección es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la dirección no tiene un formato válido'];

    return [undefined, new GetAddressDto(id)];
  }
}
