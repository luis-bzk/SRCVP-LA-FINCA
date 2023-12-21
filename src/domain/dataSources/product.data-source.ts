import { Product } from '../entities';
import { CreateProductDto } from '../dtos';

export abstract class ProductDataSource {
  abstract create(createProductDto: CreateProductDto): Promise<Product>;
}
