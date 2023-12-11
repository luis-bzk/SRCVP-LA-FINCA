import { isValidObjectId } from 'mongoose';

export class DeleteCountryDto {
  constructor(public id: string) {}

  static create(id: string): [string?, DeleteCountryDto?] {
    // make validation
    if (!isValidObjectId(id)) return ['El ID del país no es válido'];

    return [undefined, new DeleteCountryDto(id)];
  }
}
