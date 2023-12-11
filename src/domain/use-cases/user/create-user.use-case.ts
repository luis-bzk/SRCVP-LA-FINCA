import { User } from '../../entities';
import { CreateUserDto } from '../../dtos';
import { UserRepository } from '../../repositories';

interface CreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<{ user: User; password: string }>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<{ user: User; password: string }> {
    return await this.userRepository.create(createUserDto);
  }
}
