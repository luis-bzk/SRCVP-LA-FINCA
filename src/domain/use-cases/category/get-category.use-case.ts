import { Category } from '../../entities';
import { GetCategoryDto } from '../../dtos';
import { CategoryRepository } from '../../repositories';

interface GetCategoryUseCase {
  execute(getCategoryDto: GetCategoryDto): Promise<Category>;
}

export class GetCategory implements GetCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(getCategoryDto: GetCategoryDto): Promise<Category> {
    return await this.categoryRepository.get(getCategoryDto);
  }
}
