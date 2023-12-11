interface Entity {
  id: string;
  identification: string;
  primary_phone: string;
  secondary_phone: string;
  id_user: string;
  id_address: string;
}

export class PublicUserData {
  public id: string;
  public identification: string;
  public primary_phone: string;
  public secondary_phone: string;
  public id_user: string;
  public id_address: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.identification = entity.identification;
    this.primary_phone = entity.primary_phone;
    this.secondary_phone = entity.secondary_phone;
    this.id_user = entity.id_user;
    this.id_address = entity.id_address;
  }
}
