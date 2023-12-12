import { Category } from '../../entities';
import { CategoryRepository } from '../../repositories';

interface GetAllCategoriesUseCase {
  execute(): Promise<Category[]>;
}

export class GetAllCategories implements GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }
}
