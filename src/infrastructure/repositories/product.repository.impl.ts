import { Product } from '../../domain/entities';
import { CreateProductDto } from '../../domain/dtos';
import { ProductRepository } from '../../domain/repositories';
import { ProductDataSource } from '../../domain/dataSources';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly productDataSource: ProductDataSource) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productDataSource.create(createProductDto);
  }
}
