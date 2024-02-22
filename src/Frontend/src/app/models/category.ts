export class Category {
  _id?: string;
  name: string;
  type: Array<{
    id:string,
    name:string
  }>;

  constructor(
    _id :string = "",
    name: string = "",
    type: Array<{
      id:string,
      name:string
    }> = []
  ) {
    this._id = _id;
    this.name = name;
    this.type = type;
  }
}