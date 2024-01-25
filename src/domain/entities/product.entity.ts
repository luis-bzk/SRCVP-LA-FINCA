interface Entity {
  id: String;
  name: String;
  slug: string;
  description: string;
  tags: string[];
  base_price: number;
  discount: number;
  iva_included: boolean;
  total_price: number;
  brand: string;
  active_ingredient: string;
  bar_code: string;
  provider: string;
  warranty: number;
  additional_details: string[];
}

export class Product {
  public id: String;
  public name: String;
  public slug: string;
  public description: string;
  public tags: string[];
  public base_price: number;
  public discount: number;
  public iva_included: boolean;
  public total_price: number;
  public brand: string;
  public active_ingredient: string;
  public bar_code: string;
  public provider: string;
  public warranty: number;
  public additional_details: string[];

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.slug = entity.slug;
    this.description = entity.description;
    this.tags = entity.tags;
    this.base_price = entity.base_price;
    this.discount = entity.discount;
    this.iva_included = entity.iva_included;
    this.total_price = entity.total_price;
    this.brand = entity.brand;
    this.active_ingredient = entity.active_ingredient;
    this.bar_code = entity.bar_code;
    this.provider = entity.provider;
    this.warranty = entity.warranty;
    this.additional_details = entity.additional_details;
  }
}
