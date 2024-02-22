export class Monitoring {
  _id?: string;
  name: string;
  review:Array<{
    type: string,
    ciclic: number,
    minValue: number,
    Value: number
    }>;

  constructor(
    _id :string = "",
    name: string = "",
    review:Array<{
      type: string,
      ciclic: number,
      minValue: number,
      Value: number
      }>
  ) {
    this._id = _id;
    this.name = name;
    this.review= review;
  }
}