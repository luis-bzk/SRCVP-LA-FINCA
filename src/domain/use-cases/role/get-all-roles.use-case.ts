import { Role } from '../../entities';
import { RoleRepository } from '../../repositories';

interface GetAllRolesUseCase {
  execute(): Promise<Role[]>;
}

export class GetAllRoles implements GetAllRolesUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<Role[]> {
    return await this.roleRepository.getAll();
  }
}
