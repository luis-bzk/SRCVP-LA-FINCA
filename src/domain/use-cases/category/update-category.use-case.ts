import { Category } from '../../entities';
import { UpdateCategoryDto } from '../../dtos';
import { CategoryRepository } from '../../repositories';

interface UpdateCategoryUseCase {
  execute(updateCategoryDto: UpdateCategoryDto): Promise<Category>;
}

export class UpdateCategory implements UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return await this.categoryRepository.update(updateCategoryDto);
  }
}
