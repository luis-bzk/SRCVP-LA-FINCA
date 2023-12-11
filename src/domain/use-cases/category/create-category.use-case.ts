import { CreateCategoryDto } from '../../dtos/category';
import { Category } from '../../entities';
import { CategoryRepository } from '../../repositories';

interface CreateCategoryUseCase {
  execute(createCategoryDto: CreateCategoryDto): Promise<Category>;
}

export class CreateCategory implements CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.create(createCategoryDto);
  }
}
