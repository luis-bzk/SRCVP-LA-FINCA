// Data transfer object

import { isValidObjectId } from 'mongoose';

export class GetRoleDto {
  constructor(public id: string) {}

  static create(id: string): [string?, GetRoleDto?] {
    // make validation
    if (!isValidObjectId(id)) return ['El ID del rol no es válido'];

    return [undefined, new GetRoleDto(id)];
  }
}
