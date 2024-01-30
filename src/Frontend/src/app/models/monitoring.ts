export class Monitoring {
  _id?: string;
  name: string;
  review:Array<{
    type: String,
    ciclic: Boolean,
    minValue: Number,
    Value: Number
    }>;

  constructor(
    _id :string = "",
    name: string = "",
    review:Array<{
      type: String,
      ciclic: Boolean,
      minValue: Number,
      Value: Number
      }>
  ) {
    this._id = _id;
    this.name = name;
    this.review= review;
  }
}