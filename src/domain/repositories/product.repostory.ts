import { Product } from '../entities';
import { CreateProductDto, UpdateProductDto } from '../dtos';

export abstract class ProductRepository {
  abstract create(createProductDto: CreateProductDto): Promise<Product>;

  abstract update(updateProductDto: UpdateProductDto): Promise<Product>;
}
