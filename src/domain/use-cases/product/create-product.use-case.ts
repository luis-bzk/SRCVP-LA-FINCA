import { CreateProductDto } from '../../dtos';
import { Product } from '../../entities';
import { ProductRepository } from '../../repositories';

interface CreateProductUseCase {
  execute(createProductDto: CreateProductDto): Promise<Product>;
}

export class CreateProduct implements CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.create(createProductDto);
  }
}
