import { User } from '../../entities';
import { CheckTokenUserDto } from '../../dtos';
import { AuthRepository } from '../../repositories';

interface CheckTokenUserUseCase {
  execute(checkTokenUserDto: CheckTokenUserDto): Promise<User>;
}

export class CheckTokenUser implements CheckTokenUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(checkTokenUserDto: CheckTokenUserDto): Promise<User> {
    return await this.authRepository.checkToken(checkTokenUserDto);
  }
}
