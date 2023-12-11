import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import {
  CreatePublicUserData,
  DeletePublicUserData,
  GetPublicUserData,
  UpdatePublicUserData,
} from '../../domain/use-cases';
import { PublicUserDataRepository } from '../../domain/repositories';
import {
  CreatePublicUserDataDto,
  DeletePublicUserDataDto,
  GetPublicUserDataDto,
  UpdatePublicUserDataDto,
} from '../../domain/dtos';

export class PublicUserDataController {
  constructor(private readonly publicUserDataRepository: PublicUserDataRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createPublicUserData = (req: Request, res: Response) => {
    const [error, createPublicUserDataDto] = CreatePublicUserDataDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new CreatePublicUserData(this.publicUserDataRepository)
      .execute(createPublicUserDataDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updatePublicUserData = (req: Request, res: Response) => {
    const [error, updatePublicUserDataDto] = UpdatePublicUserDataDto.create(req.body, req.params.id);
    if (error) return res.status(200).status(400).json({ error });

    new UpdatePublicUserData(this.publicUserDataRepository)
      .execute(updatePublicUserDataDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getPublicUserData = (req: Request, res: Response) => {
    const [error, getPublicUserDataDto] = GetPublicUserDataDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new GetPublicUserData(this.publicUserDataRepository)
      .execute(getPublicUserDataDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deletePublicUserData = (req: Request, res: Response) => {
    const [error, deletePublicUserDataDto] = DeletePublicUserDataDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new DeletePublicUserData(this.publicUserDataRepository)
      .execute(deletePublicUserDataDto!)
      .then((data) => res.status(204).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
