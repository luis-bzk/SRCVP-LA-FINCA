import { Country } from '../../entities';
import { UpdateCountryDto } from '../../dtos';
import { CountryRepository } from '../../repositories';

interface UpdateCountryUseCase {
  execute(updateRoleDto: UpdateCountryDto): Promise<Country>;
}

export class UpdateCountry implements UpdateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(updateCountryDto: UpdateCountryDto): Promise<Country> {
    return await this.countryRepository.update(updateCountryDto);
  }
}
