import { Category } from '../../domain/entities';
import { CategoryDataSource } from '../../domain/dataSources';
import { CreateCategoryDto, DeleteCategoryDto, GetCategoryDto, UpdateCategoryDto } from '../../domain/dtos/category';
import { CategoryRepository } from '../../domain/repositories';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDataSource: CategoryDataSource) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryDataSource.create(createCategoryDto);
  }

  update(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryDataSource.update(updateCategoryDto);
  }

  get(getCategoryDto: GetCategoryDto): Promise<Category> {
    return this.categoryDataSource.get(getCategoryDto);
  }

  getAll(): Promise<Category[]> {
    return this.categoryDataSource.getAll();
  }
  delete(deleteCategoryDto: DeleteCategoryDto): Promise<{}> {
    return this.categoryDataSource.delete(deleteCategoryDto);
  }
}
