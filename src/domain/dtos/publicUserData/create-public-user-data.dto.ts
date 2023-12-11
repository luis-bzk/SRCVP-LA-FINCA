import { isValidObjectId } from 'mongoose';

export class CreatePublicUserDataDto {
  constructor(
    public identification: string,
    public id_user: string,
    public id_address: string,
    public primary_phone: string,
    public secondary_phone?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreatePublicUserDataDto?] {
    const { identification, id_user, id_address, primary_phone, secondary_phone } = object;

    if (!identification) return ['La identificación es requerida.'];
    if (!id_user) return ['La identificación es requerida.'];
    if (!isValidObjectId(id_user)) return ['El ID del usuario no es válido.'];
    if (!id_address) return ['La identificación es requerida.'];
    //TODO: Validar que sea un id de mongo
    // if ( !isValidObjectId( id_address )) return ['El ID de la dirección no es válido.'];
    if (!primary_phone && !isNaN(parseInt(primary_phone)))
      return [' El teléfono debe contener solo números y es requerido.'];
    if (!isNaN(parseInt(secondary_phone))) return [' El teléfono debe contener solo números.'];

    return [
      undefined,
      new CreatePublicUserDataDto(identification, id_user, id_address, primary_phone, secondary_phone),
    ];
  }
}
