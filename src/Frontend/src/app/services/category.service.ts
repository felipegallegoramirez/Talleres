import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";

import { Category } from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categorys: Category[] = [];
  readonly URL_API = "http://localhost:3000/api/category";


  constructor(private http: HttpClient) {
  }


  postCategory(category: Category) {
    return this.http.post<Category>(this.URL_API, category);
  }

  getCategorys() {
    return this.http.get<Category[]>(this.URL_API);
  }

  getCategory(id:string) {
    return this.http.get<Category>(this.URL_API + `/${id}` );
  }

  putCategory(category: Category,id:string) {
    return this.http.put(this.URL_API + `/${id}`,category );
  }

  deleteCategory(id: string) {
    return this.http.delete(this.URL_API + `/${id}` );
  }

  
}