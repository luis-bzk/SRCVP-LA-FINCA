// Data transfer object

import { isValidObjectId } from 'mongoose';

type IRole = 'DEVELOPER' | 'SUPER_ADMIN' | 'ADMIN' | 'PUBLIC' | 'AFFILIATE';

export class UpdateRoleDto {
  constructor(public name: string, public id: string) {}

  static create(object: { [key: string]: any }, id: string): [string?, UpdateRoleDto?] {
    const { name } = object;
    const validRoles: IRole[] = ['DEVELOPER', 'SUPER_ADMIN', 'ADMIN', 'PUBLIC', 'AFFILIATE'];

    // make validation
    if (!isValidObjectId(id)) return ['El ID del rol no es válido'];
    if (!name) return ['El nombre del rol es requerido'];
    if (!validRoles.includes(name)) return ['El nombre del rol no es válido'];

    return [undefined, new UpdateRoleDto(name, id)];
  }
}
