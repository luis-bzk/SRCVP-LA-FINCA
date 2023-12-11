import { City } from '../entities';
import { CreateCityDto, DeleteCityDto, GetCityDto, UpdateCityDto } from '../dtos';

export abstract class CityRepository {
  abstract create(createCityDto: CreateCityDto): Promise<City>;
  abstract update(updateCityDto: UpdateCityDto): Promise<City>;
  abstract get(getCityDto: GetCityDto): Promise<City>;
  abstract getAll(): Promise<City[]>;
  abstract delete(deleteCityDto: DeleteCityDto): Promise<{}>;
}
