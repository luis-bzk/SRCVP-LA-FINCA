import { ProductModel } from '../../data';
import { Product } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { CreateProductDto } from '../../domain/dtos';
import { ProductDataSource } from '../../domain/dataSources';
import { calTotalPriceProduct, generateSlug } from '../../utils';
import { ProductMapper } from '../mappers/product.mapper';

export class ProductDataSourceImpl implements ProductDataSource {
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      name,
      description,
      images,
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
      if (exists) throw CustomError.badRequest('El nombre del producto ya se encuentra registrado');

      const { costWithoutIVA, totalCostIVA } = calTotalPriceProduct({
        price: base_price,
        includeIVA: iva_included,
      });

      const product = await ProductModel.create({
        name,
        description,
        images,
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
}
