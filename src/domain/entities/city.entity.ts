interface Entity {
  id: string;
  name: string;
  id_province: string;
}

export class City {
  public id: string;
  public name: string;
  public id_province: string;

  constructor(entity: Entity) {
    const { id, name, id_province } = entity;

    this.id = id;
    this.name = name;
    this.id_province = id_province;
  }
}
