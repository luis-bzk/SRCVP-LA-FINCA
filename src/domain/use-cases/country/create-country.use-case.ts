import { Country } from '../../entities';
import { CreateCountryDto } from '../../dtos';
import { CountryRepository } from '../../repositories';

interface CreateCountryUseCase {
  execute(createCountryDto: CreateCountryDto): Promise<Country>;
}

export class CreateCountry implements CreateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(createCountryDto: CreateCountryDto): Promise<Country> {
    return await this.countryRepository.create(createCountryDto);
  }
}
