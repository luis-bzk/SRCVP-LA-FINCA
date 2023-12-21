import { Request, Response } from 'express';
import { ProductRepository } from '../../domain/repositories';
import { CustomError } from '../../domain/errors';
import { CreateProductDto } from '../../domain/dtos';
import { CreateProduct } from '../../domain/use-cases';

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);

    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateProduct(this.productRepository)
      .execute(createProductDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
