import { Country } from '../entities';
import { CreateCountryDto, DeleteCountryDto, GetCountryDto, UpdateCountryDto } from '../dtos';

export abstract class CountryRepository {
  abstract create(createCountryDto: CreateCountryDto): Promise<Country>;
  abstract update(updateCountryDto: UpdateCountryDto): Promise<Country>;
  abstract get(getCountryDto: GetCountryDto): Promise<Country>;
  abstract getAll(): Promise<Country[]>;
  abstract delete(deleteCountryDto: DeleteCountryDto): Promise<{}>;
}
