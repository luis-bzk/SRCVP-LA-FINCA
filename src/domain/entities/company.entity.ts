interface Entity {
  id: string;
  name: string;
  social_reason: string;
  email: string;
  RUC: string;
  phone: string;
  cellphone: string;
  id_address: string;
  domain: string;
  schedule: string;
  id_user: string;
}

export class Company {
  public id: string;
  public name: string;
  public social_reason: string;
  public email: string;
  public RUC: string;
  public phone: string;
  public cellphone: string;
  public id_address: string;
  public domain: string;
  public schedule: string;
  public id_user: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.social_reason = entity.social_reason;
    this.email = entity.email;
    this.RUC = entity.RUC;
    this.phone = entity.phone;
    this.cellphone = entity.cellphone;
    this.id_address = entity.id_address;
    this.domain = entity.domain;
    this.schedule = entity.schedule;
    this.id_user = entity.id_user;
  }
}
