import { User } from '../../entities';
import { UpdateUserDto } from '../../dtos';
import { UserRepository } from '../../repositories';

interface UpdateUserUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<User>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(updateUserDto);
  }
}
