interface Entity {
  id: string;
  id_plan: string;
  years: number;
  finish_date: Date;
  totalCost: number;
  status: boolean;
}

export class Membership {
  public id: string;
  public id_plan: string;
  public years: number;
  public finish_date: Date;
  public totalCost: number;
  public status: boolean;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_plan = entity.id_plan;
    this.years = entity.years;
    this.finish_date = entity.finish_date;
    this.totalCost = entity.totalCost;
    this.status = entity.status;
  }
}
