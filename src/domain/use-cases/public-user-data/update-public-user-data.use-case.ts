import { PublicUserData } from '../../entities';
import { UpdatePublicUserDataDto } from '../../dtos';
import { PublicUserDataRepository } from '../../repositories';

interface UpdatePublicUserDataUseCase {
  execute(updatePublicUserDataDto: UpdatePublicUserDataDto): Promise<PublicUserData>;
}

export class UpdatePublicUserData implements UpdatePublicUserDataUseCase {
  constructor(private readonly publicUserDataRepository: PublicUserDataRepository) {}

  async execute(updatePublicUserDataDto: UpdatePublicUserDataDto): Promise<PublicUserData> {
    return await this.publicUserDataRepository.update(updatePublicUserDataDto);
  }
}
