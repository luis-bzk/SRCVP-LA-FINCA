interface Entity {
  id: string;
  id_city: string;
  id_province: string;
  id_country: string;
  main_street: string;
  secondary_street: string;
  postal_code: string;
}

export class Address {
  public id: string;
  public id_city: string;
  public id_province: string;
  public id_country: string;
  public main_street: string;
  public secondary_street: string;
  public postal_code: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_city = entity.id_city;
    this.id_province = entity.id_province;
    this.id_country = entity.id_country;
    this.main_street = entity.main_street;
    this.secondary_street = entity.secondary_street;
    this.postal_code = entity.postal_code;
  }
}
