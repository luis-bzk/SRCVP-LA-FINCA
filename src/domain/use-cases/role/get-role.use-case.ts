import { Role } from '../../entities';
import { GetRoleDto } from '../../dtos';
import { RoleRepository } from '../../repositories';

interface GetRoleUseCase {
  execute(getRoleDto: GetRoleDto): Promise<Role>;
}

export class GetRole implements GetRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(getRoleDto: GetRoleDto): Promise<Role> {
    return await this.roleRepository.get(getRoleDto);
  }
}
