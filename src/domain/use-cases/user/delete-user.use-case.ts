import { DeleteUserDto } from '../../dtos';
import { UserRepository } from '../../repositories';

interface DeleteUserUseCase {
  execute(deleteUserDto: DeleteUserDto): Promise<{}>;
}

export class DeleteUser implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(deleteUserDto: DeleteUserDto): Promise<{}> {
    return await this.userRepository.delete(deleteUserDto);
  }
}
