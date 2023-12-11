export class CreateCategoryDto {
  constructor(public name: string, public description: string) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, description } = object;

    if (!name) return ['El nombre de la cateogia es requerido'];
    if (!description) return ['La descripcion de la categoria es requerida'];

    return [undefined, new CreateCategoryDto(name, description)];
  }
}
