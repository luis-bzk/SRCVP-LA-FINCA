// Data transfer object

import { isValidObjectId } from 'mongoose';

export class GetAllRoleDto {
  constructor(public id: string) {}

  static create(id: string): [string?, GetAllRoleDto?] {
    // make validation
    if (!isValidObjectId(id)) return ['El ID del rol no es válido'];

    return [undefined, new GetAllRoleDto(id)];
  }
}
