import { Product } from '../../entities';
import { UpdateProductDto } from '../../dtos';
import { ProductRepository } from '../../repositories';

interface UpdateProductUseCase {
  execute(updateProductDto: UpdateProductDto): Promise<Product>;
}

export class UpdateProduct implements UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productRepository.update(updateProductDto);
  }
}
