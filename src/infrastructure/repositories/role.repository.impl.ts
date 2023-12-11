import { Role } from '../../domain/entities';
import { RolesDataSource } from '../../domain/dataSources';
import { RoleRepository } from '../../domain/repositories';
import { CreateRoleDto, DeleteRoleDto, GetRoleDto, UpdateRoleDto } from '../../domain/dtos';

export class RoleRepositoryImpl implements RoleRepository {
  constructor(private readonly rolesDataSource: RolesDataSource) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesDataSource.create(createRoleDto);
  }
  update(updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.rolesDataSource.update(updateRoleDto);
  }
  delete(deleteRoleDto: DeleteRoleDto): Promise<{}> {
    return this.rolesDataSource.delete(deleteRoleDto);
  }
  get(getRoleDto: GetRoleDto): Promise<Role> {
    return this.rolesDataSource.get(getRoleDto);
  }
  getAll(): Promise<Role[]> {
    return this.rolesDataSource.getAll();
  }
}
