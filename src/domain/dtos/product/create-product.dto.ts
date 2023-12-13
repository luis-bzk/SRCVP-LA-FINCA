export class CreateProductDto {
  constructor() {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const {
      name,
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

    if (!name) return ['El nombre del producto es requerido'];
    if (!description) return ['La descripción del producto es requerida'];
    if (!images) return ['Se requiere al menos una imagen del producto'];
    if (images.this.length > 3) return ['Solo se pueden subir hasta 2 imágenes'];

    const invalidImage = images.find((image: string) => !this.validateImageFormat(image));
    if (invalidImage) return [`El formato de la imagen '${invalidImage}' no es válido`];

    if (!tags) return ['Se require al menos una etiqueta del producto'];
    if (tags.length > 10) return ['Solo se pueden agregar hasta 10 etiquetas'];
    if (!base_price) return ['Se requiere el precio del producto'];
    if (base_price < 0) return ['El precio del producto no puede ser menor a 0'];

    const price_string = base_price.toString();
    const decimalIndex = price_string.indexOf('.');
    if (decimalIndex !== -1 && price_string.length - decimalIndex > 3) {
      return ['El precio no puede tener mas de dos decimales'];
    }

    return [undefined, new CreateProductDto()];
  }

  private static validateImageFormat(value: string): boolean {
    const regex = /\.(jpg|jpeg|png|svg|webp|gif)$/i;
    return regex.test(value);
  }
}
