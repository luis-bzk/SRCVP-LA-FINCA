import { isValidObjectId } from 'mongoose';

export class GetPublicUserDataDto {
  constructor(public id: string) {}
  static create(id: string): [string?, GetPublicUserDataDto?] {
    // make validation
    if (!isValidObjectId(id)) return ['El ID de la información pública no es válido'];

    return [undefined, new GetPublicUserDataDto(id)];
  }
}
