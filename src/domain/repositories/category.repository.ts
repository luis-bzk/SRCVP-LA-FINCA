import { Category } from '../entities';
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from '../dtos/category';

export abstract class CategoryRepository {
  abstract create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  abstract update(updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  abstract get(getCategoryDto: GetCategoryDto): Promise<Category>;
  abstract getAll(): Promise<Category[]>;
}
