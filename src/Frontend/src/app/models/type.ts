export class Type {
  _id?: string;
  model: string;
  brand: string;
  category: string;
  cars: Array<{
    id:string,
    plate:string
  }>;
  monitoringId: Array<string>;

  constructor(
    _id :string = "",
    model: string = "",
    brand: string = "",
    category: string = "",
    cars: Array<{
      id:string,
      plate:string
    }> =[],
    monitoringId:Array<string> =[]
  ) {
    this._id = _id;
    this.model = model;
    this.brand = brand;
    this.category = category;
    this.cars = cars;
    this.monitoringId=monitoringId;
  }
}