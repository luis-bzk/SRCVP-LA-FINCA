import { City } from '../../entities';
import { UpdateCityDto } from '../../dtos';
import { CityRepository } from '../../repositories';

interface UpdateCityUseCase {
  execute(updateCityDto: UpdateCityDto): Promise<City>;
}

export class UpdateCity implements UpdateCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(updateCityDto: UpdateCityDto): Promise<City> {
    return await this.cityRepository.update(updateCityDto);
  }
}
