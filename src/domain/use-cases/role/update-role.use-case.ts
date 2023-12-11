import { Role } from '../../entities';
import { UpdateRoleDto } from '../../dtos';
import { RoleRepository } from '../../repositories';

interface UpdateRoleUseCase {
  execute(updateRoleDto: UpdateRoleDto): Promise<Role>;
}

export class UpdateRole implements UpdateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.roleRepository.update(updateRoleDto);
  }
}
