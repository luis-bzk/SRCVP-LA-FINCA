import { isValidObjectId } from 'mongoose';

export class GetCityDto {
  constructor(public id: string) {}

  static create(id: string): [string?, GetCityDto?] {
    if (!id) return ['El ID de la ciudad es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la ciudad no es válido'];

    return [undefined, new GetCityDto(id)];
  }
}
