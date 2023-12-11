interface Entity {
  id: string;
  name: string;
  code: string;
  prefix: string;
}

export class Country {
  public id: string;
  public name: string;
  public code: string;
  public prefix: string;

  constructor(entity: Entity) {
    const { id, name, code, prefix } = entity;

    this.id = id;
    this.name = name;
    this.code = code;
    this.prefix = prefix;
  }
}
