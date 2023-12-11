// Data transfer object

type IRole = 'DEVELOPER' | 'SUPER_ADMIN' | 'ADMIN' | 'PUBLIC' | 'AFFILIATE';

export class CreateRoleDto {
  constructor(public name: string) {}

  static create(object: { [key: string]: any }): [string?, CreateRoleDto?] {
    const { name } = object;
    const validRoles: IRole[] = ['DEVELOPER', 'SUPER_ADMIN', 'ADMIN', 'PUBLIC', 'AFFILIATE'];

    // make validation
    if (!name) return ['El nombre del rol es requerido'];
    if (!validRoles.includes(name)) return ['El nombre del rol no es válido'];

    return [undefined, new CreateRoleDto(name)];
  }
}
