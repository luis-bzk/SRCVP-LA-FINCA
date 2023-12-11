export class ConfirmUserDto {
    constructor(public token: string) {}
    static create(object: { [key: string]: any }): [string?, ConfirmUserDto?] {
        const { token} = object;
        if (!token) return ['El token del usuario es requerido.'];
        return [undefined, new ConfirmUserDto(token)];
    }
  }