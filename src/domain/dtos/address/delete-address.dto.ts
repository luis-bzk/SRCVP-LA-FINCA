import { isValidObjectId } from 'mongoose';

export class DeleteAddressDto {
  constructor(public id: string) {}

  static create(id: string): [string?, DeleteAddressDto?] {
    if (!id) return ['El ID de la dirección es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la dirección no tiene un formato válido'];

    return [undefined, new DeleteAddressDto(id)];
  }
}
