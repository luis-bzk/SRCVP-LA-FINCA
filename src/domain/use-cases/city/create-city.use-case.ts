import { City } from '../../entities';
import { CreateCityDto } from '../../dtos';
import { CityRepository } from '../../repositories';

interface CreateCityUseCase {
  execute(createCityDto: CreateCityDto): Promise<City>;
}

export class CreateCity implements CreateCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(createCityDto: CreateCityDto): Promise<City> {
    return await this.cityRepository.create(createCityDto);
  }
}
