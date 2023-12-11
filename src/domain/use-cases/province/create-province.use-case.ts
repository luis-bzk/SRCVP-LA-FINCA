import { Province } from '../../entities';
import { CreateProvinceDto } from '../../dtos';
import { ProvincesRepository } from '../../repositories';

interface CreateProvinceUseCase {
  execute(createProvinceDto: CreateProvinceDto): Promise<Province>;
}

export class CreateProvince implements CreateProvinceUseCase {
  constructor(private readonly provincesRepository: ProvincesRepository) {}

  async execute(createProvinceDto: CreateProvinceDto): Promise<Province> {
    return await this.provincesRepository.create(createProvinceDto);
  }
}
