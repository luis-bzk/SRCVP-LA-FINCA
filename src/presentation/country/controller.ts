import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { CountryRepository } from '../../domain/repositories';
import { CreateCountryDto, DeleteCountryDto, GetCountryDto, UpdateCountryDto } from '../../domain/dtos';
import { CreateCountry, DeleteCountry, GetAllCountries, GetCountry, UpdateCountry } from '../../domain/use-cases';

export class CountryController {
  constructor(private readonly countryRepository: CountryRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createCountry = (req: Request, res: Response) => {
    const [error, createCountryDto] = CreateCountryDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateCountry(this.countryRepository)
      .execute(createCountryDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateCountry = (req: Request, res: Response) => {
    const [error, updateCountryDto] = UpdateCountryDto.create(req.body, req.params.id);
    if (error) return res.status(400).json({ error });

    new UpdateCountry(this.countryRepository)
      .execute(updateCountryDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getCountry = (req: Request, res: Response) => {
    const [error, getCountryDto] = GetCountryDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new GetCountry(this.countryRepository)
      .execute(getCountryDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllCountries = (_req: Request, res: Response) => {
    new GetAllCountries(this.countryRepository)
      .execute()
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteCountry = (req: Request, res: Response) => {
    const [error, deleteCountryDto] = DeleteCountryDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new DeleteCountry(this.countryRepository)
      .execute(deleteCountryDto!)
      .then((data) => res.status(204).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
