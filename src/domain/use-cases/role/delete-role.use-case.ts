import { DeleteRoleDto } from '../../dtos';
import { RoleRepository } from '../../repositories';

interface DeleteRoleUseCase {
  execute(deleteRoleDto: DeleteRoleDto): Promise<{}>;
}

export class DeleteRole implements DeleteRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(deleteRoleDto: DeleteRoleDto): Promise<{}> {
    return await this.roleRepository.delete(deleteRoleDto);
  }
}
