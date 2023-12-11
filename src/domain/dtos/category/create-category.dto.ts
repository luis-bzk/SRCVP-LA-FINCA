export class CreateCategoryDto {
  constructor(public name: string, public description: string) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, description } = object;

    if (!name) return ['El nombre de la categoría es requerido'];
    if (!description) return ['La descripción de la categoría es requerida'];

    return [undefined, new CreateCategoryDto(name, description)];
  }
}
