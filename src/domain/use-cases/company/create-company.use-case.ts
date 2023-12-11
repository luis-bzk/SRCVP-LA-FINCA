import { Company } from '../../entities';
import { CreateCompanyDto } from '../../dtos';
import { CompanyRepository } from '../../repositories';

interface CreateCompanyUseCase {
  execute(createCompanyDto: CreateCompanyDto): Promise<Company>;
}

export class CreateCompany implements CreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyRepository.create(createCompanyDto);
  }
}
