import { CreateCategoryDto } from '../dtos/category';
import { Category } from '../entities';

export abstract class CategoryDataSource {
  abstract create(createCategoryDto: CreateCategoryDto): Promise<Category>;
}
