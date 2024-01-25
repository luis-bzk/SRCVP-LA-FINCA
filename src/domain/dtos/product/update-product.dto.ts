import { isValidObjectId } from 'mongoose';

export class UpdateProductDto {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public tags: string[],
    public base_price: number,
    public discount: number,
    public iva_included: boolean,
    public brand: string,
    public active_ingredient: string,
    public bar_code: string,
    public provider: string,
    public warranty: number,
    public additional_details: string[]
  ) {}

  static create(object: { [key: string]: any }, id: string): [string?, UpdateProductDto?] {
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
    } = object;

    if (!id) return ['El ID del producto es requerido'];
    if (!isValidObjectId(id)) return ['El ID del producto no es valido'];

    if (!name) return ['El nombre del producto es requerido'];
    if (name.length > 100) return ['El nombre del producto no puede tener mas de 100 caracteres'];
    if (!description) return ['La descripción del producto es requerida'];
    if (description.length > 400) return ['La descripción del producto no puede tener mas de 400 caracteres'];

    if (!tags) return ['Se require al menos una etiqueta del producto'];
    if (tags.length > 10) return ['Solo se pueden agregar hasta 10 etiquetas'];
    if (!base_price) return ['Se requiere el precio del producto'];
    if (base_price < 0) return ['El precio del producto no puede ser menor a 0'];

    const price_string = base_price.toString();
    const decimalIndex = price_string.indexOf('.');
    if (decimalIndex !== -1 && price_string.length - decimalIndex > 3) {
      return ['El precio no puede tener mas de dos decimales'];
    }

    if (discount && discount < 0) return ['El descuento del producto no puede ser menor al 0%'];
    if (discount && discount > 100) return ['El descuento no puede ser mayor al 100%'];
    if (discount && this.validateIsDecimal(discount)) return ['El descuento no puede ser decimal'];
    if (!iva_included && typeof iva_included !== 'boolean')
      return ['Se debe especificar si el precio incluye IVA o no'];
    if (brand && brand.length > 60) return ['La marca del producto no puede tener mas de 60 caracteres'];
    if (active_ingredient && active_ingredient.length > 60)
      return ['El principio activo del producto no puede tener mas de 60 caracteres'];
    if (bar_code && bar_code.length <= 1)
      return ['El código de barras del producto no puede tener menos de 1 carácter'];
    if (bar_code && bar_code.length > 60)
      return ['El código de barras del producto no puede tener mas de 60 caracteres'];
    if (provider && provider.length > 50)
      return ['El nombre del proveedor del producto no puede tener mas de 50 caracteres'];
    if (warranty && warranty < 0) return ['La garantía del producto no puede ser menor a 0 días'];
    if (warranty && this.validateIsDecimal(warranty)) return ['La garantía del producto no puede ser decimal'];
    if (additional_details && additional_details.length > 10)
      return ['El producto no puede tener mas de 10 detalles adicionales'];

    return [
      undefined,
      new UpdateProductDto(
        id,
        name,
        description,
        tags,
        base_price,
        discount || 0,
        iva_included || false,
        brand || '',
        active_ingredient || '',
        bar_code || '',
        provider || '',
        warranty || 0,
        additional_details || []
      ),
    ];
  }

  private static validateIsDecimal(num: number): boolean {
    return num % 1 !== 0;
  }
}
