import { PublicUserData } from '../../entities';
import { GetPublicUserDataDto } from '../../dtos';
import { PublicUserDataRepository } from '../../repositories';

interface GetPublicUserDataUseCase {
  execute(getPublicUserDataDto: GetPublicUserDataDto): Promise<PublicUserData>;
}

export class GetPublicUserData implements GetPublicUserDataUseCase {
  constructor(private readonly publicUserDataRepository: PublicUserDataRepository) {}

  async execute(getPublicUserDataDto: GetPublicUserDataDto): Promise<PublicUserData> {
    return await this.publicUserDataRepository.get(getPublicUserDataDto);
  }
}
