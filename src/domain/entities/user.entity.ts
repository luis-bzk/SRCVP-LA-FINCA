interface Entity {
  id: string;
  name: string;
  lastName: string;
  email: string;
  state: string;
  token: string;
  id_role: string;
}

export class User {
  public id: string;
  public name: string;
  public lastName: string;
  public email: string;
  public state: string;
  public token: string;
  public id_role: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.lastName = entity.lastName;
    this.email = entity.email;
    this.state = entity.state;
    this.token = entity.token;
    this.id_role = entity.id_role;
  }
}
