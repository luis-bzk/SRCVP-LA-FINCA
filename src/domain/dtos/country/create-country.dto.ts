export class CreateCountryDto {
  constructor(public name: string, public code: string, public prefix: string) {}

  static create(object: { [key: string]: any }): [string?, CreateCountryDto?] {
    const { name, code, prefix } = object;

    // make validation
    if (!name) return ['El nombre del país es requerido'];
    if (!code) return ['El código del país es requerido'];
    if (!prefix) return ['El prefijo del país es requerido'];

    return [undefined, new CreateCountryDto(name, code, prefix)];
  }
}
