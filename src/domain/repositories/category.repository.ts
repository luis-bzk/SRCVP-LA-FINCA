import { CreateCategoryDto } from '../dtos/category';
import { Category } from '../entities';

export abstract class CategoryRepository {
  abstract create(createCategoryDto: CreateCategoryDto): Promise<Category>;
}
