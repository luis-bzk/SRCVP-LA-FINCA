import { Province } from '../../entities';
import { UpdateProvinceDto } from '../../dtos';
import { ProvincesRepository } from '../../repositories';

interface UpdateProvinceUseCase {
  execute(updateProvinceDto: UpdateProvinceDto): Promise<Province>;
}

export class UpdateProvince implements UpdateProvinceUseCase {
  constructor(private readonly provincesRepository: ProvincesRepository) {}

  async execute(updateProvinceDto: UpdateProvinceDto): Promise<Province> {
    return await this.provincesRepository.update(updateProvinceDto);
  }
}
