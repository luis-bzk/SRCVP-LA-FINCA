import { DeleteProductDto } from '../../dtos';
import { ProductRepository } from '../../repositories';

interface DeleteProductUseCase {
  execute(deleteProductDto: DeleteProductDto): Promise<{}>;
}

export class DeleteProduct implements DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(deleteProductDto: DeleteProductDto): Promise<{}> {
    return await this.productRepository.delete(deleteProductDto);
  }
}
