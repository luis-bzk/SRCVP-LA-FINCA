export class CheckTokenUserDto {
  constructor(public token: string) {}

  static create(token: string): [string?, CheckTokenUserDto?] {
    if (!token) return ['El token del usuario es requerido.'];

    return [undefined, new CheckTokenUserDto(token)];
  }
}
