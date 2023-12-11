import { isValidObjectId } from 'mongoose';

export class DeletePublicUserDataDto {
  constructor(public id: string) {}

  static create(id: string): [string?, DeletePublicUserDataDto?] {
    // make validation
    if (!isValidObjectId(id)) return ['El ID de la información del usuario público no es válido'];
    return [undefined, new DeletePublicUserDataDto(id)];
  }
}
