import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { ProvincesRepository } from '../../domain/repositories';
import { CreateProvinceDto, DeleteProvinceDto, GetProvinceDto, UpdateProvinceDto } from '../../domain/dtos';
import { CreateProvince, DeleteProvince, GetAllProvinces, GetProvince, UpdateProvince } from '../../domain/use-cases';

export class ProvincesController {
  constructor(private readonly provincesRepository: ProvincesRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createProvince = (req: Request, res: Response) => {
    const [error, createProvinceDto] = CreateProvinceDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateProvince(this.provincesRepository)
      .execute(createProvinceDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateProvince = (req: Request, res: Response) => {
    const [error, updateProvinceDto] = UpdateProvinceDto.create(req.body, req.params.id);
    if (error) return res.status(400).json({ error });

    new UpdateProvince(this.provincesRepository)
      .execute(updateProvinceDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getProvince = (req: Request, res: Response) => {
    const [error, getProvinceDto] = GetProvinceDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new GetProvince(this.provincesRepository)
      .execute(getProvinceDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllProvinces = (_req: Request, res: Response) => {
    new GetAllProvinces(this.provincesRepository)
      .execute()
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteProvince = (req: Request, res: Response) => {
    const [error, deleteProvinceDto] = DeleteProvinceDto.create(req.params.id);

    if (error) return res.status(400).json({ error });

    new DeleteProvince(this.provincesRepository)
      .execute(deleteProvinceDto!)
      .then((data) => res.status(204).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
