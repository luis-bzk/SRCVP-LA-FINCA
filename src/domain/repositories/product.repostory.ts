import { Product } from '../entities';
import { CreateProductDto } from '../dtos';

export abstract class ProductRepository {
  abstract create(createProductDto: CreateProductDto): Promise<Product>;
}
