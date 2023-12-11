import { City } from '../../entities';
import { CityRepository } from '../../repositories';

interface GetAllCitiesUseCase {
  execute(): Promise<City[]>;
}

export class GetAllCities implements GetAllCitiesUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  execute(): Promise<City[]> {
    return this.cityRepository.getAll();
  }
}
