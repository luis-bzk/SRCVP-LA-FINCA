import { isValidObjectId } from 'mongoose';

export class UpdateAddressDto {
  constructor(
    public id: string,
    public id_city: string,
    public id_province: string,
    public id_country: string,
    public main_street: string,
    public secondary_street: string,
    public postal_code: string
  ) {}

  static create(object: { [key: string]: any }, id: string): [string?, UpdateAddressDto?] {
    const { id_city, id_province, id_country, main_street, secondary_street = '', postal_code } = object;

    if (!id) return ['El ID de la dirección es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la dirección no tiene un formato válido'];
    if (!id_city) return ['El ID de la ciudad es requerido'];
    if (!isValidObjectId(id_city)) return ['El ID de la ciudad no tiene un formato válido'];
    if (!id_province) return ['El ID de la provincia es requerido'];
    if (!isValidObjectId(id_province)) return ['El ID de la provincia no tiene un formato válido'];
    if (!id_country) return ['El ID del país es requerido'];
    if (!isValidObjectId(id_country)) return ['El ID del país no tiene un formato válido'];
    if (!main_street) return ['El nombre de la calle principal es requerido'];

    return [
      undefined,
      new UpdateAddressDto(id, id_city, id_province, id_country, main_street, secondary_street, postal_code),
    ];
  }
}
