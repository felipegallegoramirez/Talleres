import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";

import { Monitoring } from "../models/monitoring";

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  monitorings: Monitoring[] = [];
  readonly URL_API = "http://localhost:3000/api/monitoring";


  constructor(private http: HttpClient) {
  }


  postMonitoring(monitoring: Monitoring) {
    return this.http.post<Monitoring>(this.URL_API, monitoring);
  }

  getMonitorings() {
    return this.http.get<Monitoring[]>(this.URL_API);
  }

  getMonitoring(id:string) {
    return this.http.get<Monitoring>(this.URL_API + `/${id}` );
  }

  putMonitoring(monitoring: Monitoring,id:string) {
    return this.http.put(this.URL_API + `/${id}`,monitoring );
  }

  deleteMonitoring(id: string) {
    return this.http.delete(this.URL_API + `/${id}` );
  }

  
}