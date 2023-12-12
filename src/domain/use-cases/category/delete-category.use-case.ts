import { DeleteCategoryDto } from '../../dtos';
import { CategoryRepository } from '../../repositories';

interface DeleteCategoryUseCase {
  execute(deleteCategoryDto: DeleteCategoryDto): Promise<{}>;
}

export class DeleteCategory implements DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(deleteCategoryDto: DeleteCategoryDto): Promise<{}> {
    return await this.categoryRepository.delete(deleteCategoryDto);
  }
}
