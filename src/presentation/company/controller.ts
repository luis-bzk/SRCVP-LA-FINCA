import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { CompanyRepository } from '../../domain/repositories';
import { CreateCompanyDto, DeleteCompanyDto, GetCompanyDto, UpdateCompanyDto } from '../../domain/dtos';
import { CreateCompany, DeleteCompany, GetAllCompanies, GetCompany, UpdateCompany } from '../../domain/use-cases';

export class CompanyController {
  constructor(private readonly companyRepository: CompanyRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createCompany = (req: Request, res: Response) => {
    const [error, createCompanyDto] = CreateCompanyDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateCompany(this.companyRepository)
      .execute(createCompanyDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateCompany = (req: Request, res: Response) => {
    const [error, updateCompanyDto] = UpdateCompanyDto.create(req.body, req.params.id);

    if (error) return res.status(400).json({ error });

    new UpdateCompany(this.companyRepository)
      .execute(updateCompanyDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getCompany = (req: Request, res: Response) => {
    const [error, getCompanyDto] = GetCompanyDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new GetCompany(this.companyRepository)
      .execute(getCompanyDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllCompanies = (_req: Request, res: Response) => {
    new GetAllCompanies(this.companyRepository)
      .execute()
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteCompany = (req: Request, res: Response) => {
    const [error, deleteCompanyDto] = DeleteCompanyDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new DeleteCompany(this.companyRepository)
      .execute(deleteCompanyDto!)
      .then((data) => res.status(204).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
