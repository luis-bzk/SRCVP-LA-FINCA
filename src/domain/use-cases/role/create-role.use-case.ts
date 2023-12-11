import { Role } from '../../entities';
import { CreateRoleDto } from '../../dtos';
import { RoleRepository } from '../../repositories';

interface CreateRoleUseCase {
  execute(createRoleDto: CreateRoleDto): Promise<Role>;
}

export class CreateRole implements CreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.create(createRoleDto);
  }
}
