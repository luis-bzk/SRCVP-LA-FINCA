import { isValidObjectId } from 'mongoose';

export class UpdatePublicUserDataDto {
  constructor(
    public id: string,
    public identification: string,
    public id_user: string,
    public id_address: string,
    public primary_phone: string,
    public secondary_phone: string
  ) {}

  static create(object: { [key: string]: any }, id: string): [string?, UpdatePublicUserDataDto?] {
    const { identification, id_user, id_address, primary_phone, secondary_phone } = object;

    // make validation
    if (!id) return ['El ID de los datos publicos del usuario es requerido'];
    if (!isValidObjectId(id)) return ['El ID de los datos publicos no es válido'];
    if (!identification) return ['La identificación es requerida'];
    if (!id_user) return ['El ID del usuario es requerido'];
    if (!isValidObjectId(id_user)) return ['El ID del usuario no es válido'];
    if (!id_address) return ['El ID de la dirección es requerido'];
    //   if (!isValidObjectId(id_address)) return ['El ID de la dirección no es válido'];
    if (!primary_phone && isNaN(parseInt(primary_phone)))
      return [' El teléfono debe contener solo números y es requerido.'];
    console.log(isNaN(parseInt(secondary_phone)));
    if (isNaN(parseInt(secondary_phone))) return [' El teléfono debe contener solo números.'];

    return [
      undefined,
      new UpdatePublicUserDataDto(id, identification, id_user, id_address, primary_phone, secondary_phone),
    ];
  }
}
