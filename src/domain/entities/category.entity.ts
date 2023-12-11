interface Entity {
  id: string;
  name: string;
  description: string;
}

export class Category {
  public id: string;
  public name: string;
  public description: string;

  constructor(entity: Entity) {
    const { id, name, description } = entity;

    this.id = id;
    this.name = name;
    this.description = description;
  }
}
