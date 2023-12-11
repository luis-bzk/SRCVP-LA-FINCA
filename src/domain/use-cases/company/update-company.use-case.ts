import { Company } from '../../entities';
import { UpdateCompanyDto } from '../../dtos';
import { CompanyRepository } from '../../repositories';

interface UpdateCompanyUseCase {
  execute(updateCompanyDto: UpdateCompanyDto): Promise<Company>;
}

export class UpdateCompany implements UpdateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    return await this.companyRepository.update(updateCompanyDto);
  }
}
