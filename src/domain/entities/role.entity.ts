interface Entity {
  id: string;
  name: string;
}

export class Role {
  public id: string;
  public name: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
