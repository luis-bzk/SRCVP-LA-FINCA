import { ProductModel } from '../../data';
import { Product } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { ProductMapper } from '../mappers/product.mapper';
import { ProductDataSource } from '../../domain/dataSources';
import { calTotalPriceProduct, generateSlug } from '../../utils';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from '../../domain/dtos';

export class ProductDataSourceImpl implements ProductDataSource {
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      name,
      description,
      tags,
      base_price,
      discount,
      iva_included,
      brand,
      active_ingredient,
      bar_code,
      provider,
      warranty,
      additional_details,
    } = createProductDto;

    const slug = generateSlug(name);

    try {
      const exists = await ProductModel.findOne({ slug: slug }).lean();
      if (exists)
        throw CustomError.badRequest(
          'El nombre del producto ya se encuentra registrado',
        );

      const { costWithoutIVA, totalCostIVA } = calTotalPriceProduct({
        price: base_price,
        includeIVA: iva_included,
      });

      const product = await ProductModel.create({
        name,
        description,
        tags,
        base_price: costWithoutIVA,
        discount,
        iva_included,
        brand,
        active_ingredient,
        bar_code,
        provider,
        warranty,
        additional_details,
        slug,
        total_price: totalCostIVA,
      });

      return ProductMapper.entityFromObject(product);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async update(updateProductDto: UpdateProductDto): Promise<Product> {
    const {
      id,
      name,
      description,
      tags,
      base_price,
      discount,
      iva_included,
      brand,
      active_ingredient,
      bar_code,
      provider,
      warranty,
      additional_details,
    } = updateProductDto;

    const slug = generateSlug(name);
    try {
      const exists = await ProductModel.findById(id);
      if (!exists)
        throw CustomError.notFound(
          'El producto no se encuentra registrado en el sistema',
        );

      const existsName = await ProductModel.findOne({
        _id: { $ne: id },
        slug: slug,
      }).lean();
      if (existsName)
        throw CustomError.badRequest(
          'El nombre dle producto ya se encuentra registrado',
        );

      const { costWithoutIVA, totalCostIVA } = calTotalPriceProduct({
        price: base_price,
        includeIVA: iva_included,
      });

      exists.set({
        name,
        description,
        tags,
        base_price: costWithoutIVA,
        discount,
        iva_included,
        brand,
        active_ingredient,
        bar_code,
        provider,
        warranty,
        additional_details,
        slug,
        total_price: totalCostIVA,
      });

      const productUpdate = await exists.save();
      return ProductMapper.entityFromObject(productUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async delete(deleteProductDto: DeleteProductDto): Promise<{}> {
    const { id } = deleteProductDto;

    try {
      const exists = await ProductModel.findById(id);
      if (!exists) {
        throw CustomError.notFound(
          'El producto no se encuentra registrado en el sistema',
        );
      }

      const deleteProduct = await ProductModel.deleteOne({ _id: id });
      if (deleteProduct.deletedCount === 0) {
        throw CustomError.notFound('No se pudo eliminar el producto');
      }

      return {};
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
