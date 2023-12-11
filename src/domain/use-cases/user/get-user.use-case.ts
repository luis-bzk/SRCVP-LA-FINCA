import { User } from '../../entities';
import { GetUserDto } from '../../dtos';
import { UserRepository } from '../../repositories';

interface GetUserUseCase {
  execute(getUserDto: GetUserDto): Promise<User>;
}

export class GetUser implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(getUserDto: GetUserDto): Promise<User> {
    return await this.userRepository.get(getUserDto);
  }
}
