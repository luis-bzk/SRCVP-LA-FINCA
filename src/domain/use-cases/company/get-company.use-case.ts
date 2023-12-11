import { Company } from '../../entities';
import { GetCompanyDto } from '../../dtos';
import { CompanyRepository } from '../../repositories';

interface GetCompanyUseCase {
  execute(getCompanyDto: GetCompanyDto): Promise<Company>;
}

export class GetCompany implements GetCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(getCompanyDto: GetCompanyDto): Promise<Company> {
    return await this.companyRepository.get(getCompanyDto);
  }
}
