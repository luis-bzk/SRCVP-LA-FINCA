import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors';
import { CategoryRepository } from '../../domain/repositories';
import { CreateCategoryDto, UpdateCategoryDto } from '../../domain/dtos';
import { CreateCategory, UpdateCategory } from '../../domain/use-cases';

export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  };

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateCategory(this.categoryRepository)
      .execute(createCategoryDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateCategory = (req: Request, res: Response) => {
    const [error, updateCategoryDto] = UpdateCategoryDto.create(req.body, req.params.id);
    if (error) return res.status(400).json({ error });

    new UpdateCategory(this.categoryRepository)
      .execute(updateCategoryDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
