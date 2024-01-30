import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";

import { Type } from "../models/type";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  types: Type[] = [];
  readonly URL_API = "http://localhost:3000/api/type";


  constructor(private http: HttpClient) {
  }


  postType(type: Type) {
    return this.http.post<Type>(this.URL_API, type);
  }

  getTypes() {
    return this.http.get<Type[]>(this.URL_API  );
  }

  getType(id:string) {
    return this.http.get<Type>(this.URL_API + `/${id}` );
  }

  putType(type: Type,id:string) {
    return this.http.put(this.URL_API + `/${id}`,type );
  }

  deleteType(id: string) {
    return this.http.delete(this.URL_API + `/${id}` );
  }

  
}