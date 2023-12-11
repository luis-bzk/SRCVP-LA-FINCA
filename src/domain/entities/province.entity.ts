interface Entity {
  id: string;
  name: string;
  id_country: string;
}

export class Province {
  public id: string;
  public name: string;
  public id_country: string;

  constructor(entity: Entity) {
    const { id, name, id_country } = entity;

    this.id = id;
    this.name = name;
    this.id_country = id_country;
  }
}
