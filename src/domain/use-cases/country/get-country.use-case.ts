import { Country } from '../../entities';
import { GetCountryDto } from '../../dtos';
import { CountryRepository } from '../../repositories';

interface GetCountryUseCase {
  execute(getCountryDto: GetCountryDto): Promise<Country>;
}

export class GetCountry implements GetCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(getCountryDto: GetCountryDto): Promise<Country> {
    return await this.countryRepository.get(getCountryDto);
  }
}
