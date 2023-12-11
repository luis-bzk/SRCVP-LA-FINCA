import { Province } from '../../entities';
import { GetProvinceDto } from '../../dtos';
import { ProvincesRepository } from '../../repositories';

interface GetProvinceUseCase {
  execute(getProvinceDto: GetProvinceDto): Promise<Province>;
}

export class GetProvince implements GetProvinceUseCase {
  constructor(private readonly provincesRepository: ProvincesRepository) {}

  async execute(getProvinceDto: GetProvinceDto): Promise<Province> {
    return await this.provincesRepository.get(getProvinceDto);
  }
}
