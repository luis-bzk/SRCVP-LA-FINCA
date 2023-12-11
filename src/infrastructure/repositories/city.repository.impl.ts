import { City } from '../../domain/entities';
import { CityDataSource } from '../../domain/dataSources';
import { CityRepository } from '../../domain/repositories';
import { CreateCityDto, DeleteCityDto, GetCityDto, UpdateCityDto } from '../../domain/dtos';

export class CityRepositoryImpl implements CityRepository {
  constructor(private readonly cityDataSource: CityDataSource) {}

  create(createCityDto: CreateCityDto): Promise<City> {
    return this.cityDataSource.create(createCityDto);
  }
  update(updateCityDto: UpdateCityDto): Promise<City> {
    return this.cityDataSource.update(updateCityDto);
  }
  get(getCityDto: GetCityDto): Promise<City> {
    return this.cityDataSource.get(getCityDto);
  }
  getAll(): Promise<City[]> {
    return this.cityDataSource.getAll();
  }
  delete(deleteCityDto: DeleteCityDto): Promise<{}> {
    return this.cityDataSource.delete(deleteCityDto);
  }
}
