import { Category } from '../../domain/entities';

import { CategoryModel } from '../../data';
import { CustomError } from '../../domain/errors';
import { CategoryMapper } from '../mappers/category.mapper';
import { CategoryDataSource } from '../../domain/dataSources';
import { CreateCategoryDto, UpdateCategoryDto } from '../../domain/dtos/category';

export class CategoryDataSourceImpl implements CategoryDataSource {
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name, description } = createCategoryDto;

    try {
      const exists = await CategoryModel.findOne({ name }).lean();
      if (exists) throw CustomError.badRequest('La categoría ya se encuentra registrada en el sistema');

      const category = await CategoryModel.create({
        name,
        description,
      });

      return CategoryMapper.entityFromObject(category);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const { id, name, description } = updateCategoryDto;

    try {
      const exists = await CategoryModel.findById(id);
      if (!exists) throw CustomError.notFound('La categoría no se encuentra registrada en el sistema');

      const sameName = await CategoryModel.findOne({ _id: { $ne: id }, name }).lean();
      if (sameName) throw CustomError.badRequest('La categoría ya se encuentra registrada en el sistema');

      exists.set({
        name: name,
        description: description,
      });

      const updated = await exists.save();

      return CategoryMapper.entityFromObject(updated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
