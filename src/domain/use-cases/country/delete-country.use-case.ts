import { DeleteCountryDto } from '../../dtos';
import { CountryRepository } from '../../repositories';

interface DeleteCountryUseCase {
  execute(deleteCountryDto: DeleteCountryDto): Promise<{}>;
}

export class DeleteCountry implements DeleteCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(deleteCountryDto: DeleteCountryDto): Promise<{}> {
    return await this.countryRepository.delete(deleteCountryDto);
  }
}
