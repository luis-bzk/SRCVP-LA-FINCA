import { DeleteProvinceDto } from '../../dtos';
import { ProvincesRepository } from '../../repositories';

interface DeleteProvinceUseCase {
  execute(deleteProvinceDto: DeleteProvinceDto): Promise<{}>;
}

export class DeleteProvince implements DeleteProvinceUseCase {
  constructor(private readonly provincesRepository: ProvincesRepository) {}

  async execute(deleteProvinceDto: DeleteProvinceDto): Promise<{}> {
    return await this.provincesRepository.delete(deleteProvinceDto);
  }
}
