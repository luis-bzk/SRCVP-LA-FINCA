import { DeletePublicUserDataDto } from '../../dtos';
import { PublicUserDataRepository } from '../../repositories';

interface DeletePublicUserDataUseCase {
  execute(deletePublicUserDataDto: DeletePublicUserDataDto): Promise<{}>;
}

export class DeletePublicUserData implements DeletePublicUserDataUseCase {
  constructor(private readonly publicUserDataRepository: PublicUserDataRepository) {}

  async execute(deletePublicUserDataDto: DeletePublicUserDataDto): Promise<{}> {
    return await this.publicUserDataRepository.delete(deletePublicUserDataDto);
  }
}
