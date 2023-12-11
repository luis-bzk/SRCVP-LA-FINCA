import { City } from '../../entities';
import { GetCityDto } from '../../dtos';
import { CityRepository } from '../../repositories';

interface GetCityUseCase {
  execute(getCityDto: GetCityDto): Promise<City>;
}

export class GetCity implements GetCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  execute(getCityDto: GetCityDto): Promise<City> {
    return this.cityRepository.get(getCityDto);
  }
}
