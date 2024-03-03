import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";
import { Actions } from "../models/actions";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  actionss: Actions[] = [];
  readonly URL_API = `${environment.backend}/api/actions`;


  constructor(private http: HttpClient) {
  }


  postActions(actions: Actions) {
    return this.http.post<Actions>(this.URL_API, actions);
  }

  getActionss() {
    return this.http.get<Actions[]>(this.URL_API);
  }

  getActions(id:string) {
    return this.http.get<Actions>(this.URL_API + `/${id}` );
  }

  putActions(actions: Actions,id:string) {
    return this.http.put(this.URL_API + `/${id}`,actions );
  }

  deleteActions(id: string) {
    return this.http.delete(this.URL_API + `/${id}` );
  }

  
}