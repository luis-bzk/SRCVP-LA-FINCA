export class BaseProductDto {
  constructor() {}

  protected static validateIsDecimal(num: number): boolean {
    return num % 1 !== 0;
  }
}
