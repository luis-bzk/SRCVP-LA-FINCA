import { Product } from '../entities';
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from '../dtos';

export abstract class ProductRepository {
  abstract create(createProductDto: CreateProductDto): Promise<Product>;

  abstract update(updateProductDto: UpdateProductDto): Promise<Product>;

  abstract delete(deleteProductDto: DeleteProductDto): Promise<{}>;
}
