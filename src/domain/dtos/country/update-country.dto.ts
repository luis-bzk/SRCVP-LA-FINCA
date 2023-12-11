import { isValidObjectId } from 'mongoose';

export class UpdateCountryDto {
  constructor(public name: string, public code: string, public prefix: string, public id: string) {}

  static create(object: { [key: string]: any }, id: string): [string?, UpdateCountryDto?] {
    const { name, code, prefix } = object;

    // make validation
    if (!isValidObjectId(id)) return ['El ID del rol no es válido'];
    if (!name) return ['El nombre del país es requerido'];
    if (!code) return ['El código de país es requerido'];
    if (!prefix) return ['El prefijo del país es requerido'];

    return [undefined, new UpdateCountryDto(name, code, prefix, id)];
  }
}
