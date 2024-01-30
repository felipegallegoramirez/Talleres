export class Actions {
  _id?: string;
  title: string;
  state: string;
  sumary: string;
  monitoring: Array<{
    id:string,
    name:string
  }>;
  date: string;
  worker: Array<{
    id:string,
    name:string
  }>;

  constructor(
    _id :string = "",
    title: string = "",
    state: string = "",
    sumary: string = "",
    monitoring: Array<{
      id:string,
      name:string
    }>,
    date: string = "",
    worker: Array<{
      id:string,
      name:string
    }>,
  ) {
    this._id = _id;
    this.title = title;
    this.state = state;
    this.sumary = sumary;
    this.monitoring = monitoring;
    this.date = date;
    this.worker = worker;
  }
}