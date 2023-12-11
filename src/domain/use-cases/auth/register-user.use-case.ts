import { User } from '../../entities';
import { RegisterUserDto } from '../../dtos';
import { AuthRepository } from '../../repositories';

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<{}>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(registerUserDto: RegisterUserDto): Promise<User> {
    return await this.authRepository.register(registerUserDto);
  }
}
