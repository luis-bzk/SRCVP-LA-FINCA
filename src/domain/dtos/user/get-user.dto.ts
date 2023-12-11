import { isValidObjectId } from 'mongoose';

export class GetUserDto {
  constructor(public id: string) {}

  static create(id: string): [string?, GetUserDto?] {
    if (!id) return ['El ID del usuario es requerido'];
    if (!isValidObjectId(id)) return ['El ID del usuario no es válido'];

    return [undefined, new GetUserDto(id)];
  }
}
