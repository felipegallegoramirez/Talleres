export class User {
  _id?: string;
  email: string;
  password: string;
  name: string;

  constructor(
    _id :string = "",
    email: string = "",
    password: string = "",
    name: string = "",
  ) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.name = name;
  }
}