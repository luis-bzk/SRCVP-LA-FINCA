import { Category } from '../entities';
import { CreateCategoryDto, DeleteCategoryDto, GetCategoryDto, UpdateCategoryDto } from '../dtos/category';

export abstract class CategoryDataSource {
  abstract create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  abstract update(updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  abstract get(getCategoryDto: GetCategoryDto): Promise<Category>;
  abstract getAll(): Promise<Category[]>;
  abstract delete(deleteCategoryDto: DeleteCategoryDto): Promise<{}>;
}
