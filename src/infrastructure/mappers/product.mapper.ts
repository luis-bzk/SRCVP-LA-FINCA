import { Product } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class ProductMapper {
  static entityFromObject(object: { [key: string]: any }) {
    const {
      _id,
      name,
      slug,
      description,
      images,
      tags,
      base_price,
      discount,
      iva_included,
      total_price,
      brand,
      active_ingredient,
      bar_code,
      provider,
      warranty,
      additional_details,
    } = object;

    if (!_id) throw CustomError.badRequest('Falta el ID del producto');
    if (!name) throw CustomError.badRequest('Falta el nombre del producto');
    if (!slug) throw CustomError.badRequest('Falta el slug del producto');
    if (!description) throw CustomError.badRequest('Falta la descripción del producto');
    if (!images) throw CustomError.badRequest('Faltan las imágenes del producto');
    if (!tags) throw CustomError.badRequest('Faltan las etiquetas del producto');
    if (!base_price) throw CustomError.badRequest('Falta el precio base del producto');
    if (!discount && discount !== 0) throw CustomError.badRequest('Falta el descuento del producto');
    if (!iva_included && typeof iva_included !== 'boolean')
      throw CustomError.badRequest('Falta el iva incluido del producto');
    if (!total_price) throw CustomError.badRequest('Falta el precio total del producto');

    return new Product({
      id: _id,
      name,
      slug,
      description,
      images,
      tags,
      base_price,
      discount,
      iva_included,
      total_price,
      brand: brand || '',
      active_ingredient: active_ingredient || '',
      bar_code: bar_code || '',
      provider: provider || '',
      warranty: warranty || 0,
      additional_details: additional_details || [],
    });
  }
}
