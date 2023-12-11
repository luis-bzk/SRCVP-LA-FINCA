import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category';
import { Category } from '../entities';

export abstract class CategoryRepository {
  abstract create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  abstract update(updateCategoryDto: UpdateCategoryDto): Promise<Category>;
}
