import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { CityRepository } from '../../domain/repositories';
import { CreateCityDto, DeleteCityDto, GetCityDto, UpdateCityDto } from '../../domain/dtos';
import { CreateCity, DeleteCity, GetAllCities, GetCity, UpdateCity } from '../../domain/use-cases';

export class CityController {
  constructor(private readonly cityRepository: CityRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createCity = (req: Request, res: Response) => {
    const [error, createCityDto] = CreateCityDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateCity(this.cityRepository)
      .execute(createCityDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateCity = (req: Request, res: Response) => {
    const [error, updateCityDto] = UpdateCityDto.create(req.body, req.params.id);
    if (error) return res.status(400).json({ error });

    new UpdateCity(this.cityRepository)
      .execute(updateCityDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getCity = (req: Request, res: Response) => {
    const [error, getCityDto] = GetCityDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new GetCity(this.cityRepository)
      .execute(getCityDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllCities = (_req: Request, res: Response) => {
    new GetAllCities(this.cityRepository)
      .execute()
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteCity = (req: Request, res: Response) => {
    const [error, deleteCityDto] = DeleteCityDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new DeleteCity(this.cityRepository)
      .execute(deleteCityDto!)
      .then((data) => res.status(204).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
