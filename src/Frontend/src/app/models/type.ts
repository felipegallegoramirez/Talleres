export class Type {
  _id?: string;
  model: string;
  brand: string;
  cars: Array<{
    id:string,
    plate:string
  }>;

  constructor(
    _id :string = "",
    model: string = "",
    brand: string = "",
    cars: Array<{
      id:string,
      plate:string
    }> =[]
  ) {
    this._id = _id;
    this.model = model;
    this.brand = brand;
    this.cars = cars;
  }
}