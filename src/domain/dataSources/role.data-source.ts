import { Role } from '../entities';
import { CreateRoleDto, GetRoleDto, UpdateRoleDto, DeleteRoleDto } from '../dtos';

export abstract class RolesDataSource {
  abstract create(createRoleDto: CreateRoleDto): Promise<Role>;
  abstract update(updateRoleDto: UpdateRoleDto): Promise<Role>;
  abstract delete(deleteRoleDto: DeleteRoleDto): Promise<{}>;
  abstract get(getRoleDto: GetRoleDto): Promise<Role>;
  abstract getAll(): Promise<Role[]>;
}
