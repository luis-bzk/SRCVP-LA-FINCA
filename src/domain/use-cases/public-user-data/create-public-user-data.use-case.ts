import { PublicUserData } from '../../entities';
import { CreatePublicUserDataDto } from '../../dtos';
import { PublicUserDataRepository } from '../../repositories';

interface CreatePublicUserDataUseCase {
  execute(createPublicUserDataDto: CreatePublicUserDataDto): Promise<PublicUserData>;
}

export class CreatePublicUserData implements CreatePublicUserDataUseCase {
  constructor(private readonly publicUserDataRepository: PublicUserDataRepository) {}

  async execute(createPublicUserDataDto: CreatePublicUserDataDto): Promise<PublicUserData> {
    return await this.publicUserDataRepository.create(createPublicUserDataDto);
  }
}
