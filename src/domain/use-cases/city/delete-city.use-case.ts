import { DeleteCityDto } from '../../dtos';
import { CityRepository } from '../../repositories';

interface DeleteCityUseCase {
  execute(deleteCityDto: DeleteCityDto): Promise<{}>;
}

export class DeleteCity implements DeleteCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  execute(deleteCityDto: DeleteCityDto): Promise<{}> {
    return this.cityRepository.delete(deleteCityDto);
  }
}
