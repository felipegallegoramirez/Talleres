import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";

import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[] = [];
  readonly URL_API = "http://localhost:3000/api/user";
  readonly URL_API_login = "http://localhost:3000/api/login";


  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }

  Login(user: User) {
    return this.http.post<User>(this.URL_API_login, user);
  }

  postUser(user: User) {
    return this.http.post<User>(this.URL_API, user);
  }

  getUsers(idshop:string) {
    return this.http.get<User[]>(this.URL_API + `/${idshop}` );
  }

  getUser(id:string,idshop:string) {
    return this.http.get<User>(this.URL_API + `/${idshop}/${id}` );
  }

  putUser(user: User,id:string,idshop:string) {
    return this.http.put(this.URL_API + `/${idshop}/${id}`,user );
  }

  deleteUser(id: string,idshop:string) {
    return this.http.delete(this.URL_API + `/${idshop}/${id}` );
  }

  
}