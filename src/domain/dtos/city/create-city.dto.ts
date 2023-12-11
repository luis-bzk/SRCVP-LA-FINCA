import { isValidObjectId } from 'mongoose';

export class CreateCityDto {
  constructor(public name: string, public id_province: string) {}

  static create(object: { [key: string]: any }): [string?, CreateCityDto?] {
    const { name, id_province } = object;

    if (!name) return ['El nombre del país es requerido'];
    if (!id_province) return ['El ID de la provincia requerido'];
    if (!isValidObjectId(id_province)) return ['El ID de la provincia no es válido'];

    return [undefined, new CreateCityDto(name, id_province)];
  }
}
