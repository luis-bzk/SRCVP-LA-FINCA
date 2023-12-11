import { isValidObjectId } from 'mongoose';

export class DeleteCityDto {
  constructor(public id: string) {}

  static create(id: string): [string?, DeleteCityDto?] {
    if (!id) return ['El ID de la ciudad es requerido'];
    if (!isValidObjectId(id)) return ['El ID de la ciudad no es válido'];

    return [undefined, new DeleteCityDto(id)];
  }
}
