import { Request, Response } from 'express';
import { ProductRepository } from '../../domain/repositories';
import { CustomError } from '../../domain/errors';
import { CreateProductDto, UpdateProductDto } from '../../domain/dtos';
import { CreateProduct, UpdateProduct } from '../../domain/use-cases';

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

  updateProduct = (req: Request, res: Response) => {
    const [error, updateProductDto] = UpdateProductDto.create(
      req.body,
      req.params.id,
    );
    if (error) return res.status(400).json({ error });

    new UpdateProduct(this.productRepository)
      .execute(updateProductDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
