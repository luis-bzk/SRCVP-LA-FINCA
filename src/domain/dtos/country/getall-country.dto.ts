import { isValidObjectId } from 'mongoose';

export class GetAllCountryDto {
  constructor(public id: string) {}

  static create(id: string): [string?, GetAllCountryDto?] {
    // make validation
    if (!isValidObjectId(id)) return ['El ID del país no es válido'];

    return [undefined, new GetAllCountryDto(id)];
  }
}
