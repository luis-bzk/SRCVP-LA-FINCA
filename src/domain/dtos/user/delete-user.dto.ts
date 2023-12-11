import { isValidObjectId } from 'mongoose';

export class DeleteUserDto {
  constructor(public id: string) {}

  static create(id: string): [string?, DeleteUserDto?] {
    if (!id) return ['El ID del usuario es requerido'];
    if (!isValidObjectId(id)) return ['El ID del usuario no es válido'];

    return [undefined, new DeleteUserDto(id)];
  }
}
