import { User } from '../../entities';
import { ConfirmUserDto } from '../../dtos';
import { AuthRepository } from '../../repositories';

interface ConfirmUserUseCase {
  execute(confirmUserDto: ConfirmUserDto): Promise<User>;
}

export class ConfirmUser implements ConfirmUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(confirmUserDto: ConfirmUserDto): Promise<User> {
    return await this.authRepository.confirm(confirmUserDto);
  }
}
