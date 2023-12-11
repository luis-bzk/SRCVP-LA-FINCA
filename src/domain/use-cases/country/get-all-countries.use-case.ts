import { Country } from '../../entities';
import { CountryRepository } from '../../repositories';

interface GetAllCountriesUseCase {
  execute(): Promise<Country[]>;
}

export class GetAllCountries implements GetAllCountriesUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(): Promise<Country[]> {
    return await this.countryRepository.getAll();
  }
}
