import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";

import { Vehicle } from "../models/vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehicles: Vehicle[] = [];
  readonly URL_API = "http://localhost:3000/api/vehicle";


  constructor(private http: HttpClient) {
  }


  postVehicle(vehicle: Vehicle) {
    return this.http.post<Vehicle>(this.URL_API, vehicle);
  }

  getVehicles() {
    return this.http.get<Vehicle[]>(this.URL_API);
  }

  getVehicle(id:string) {
    return this.http.get<Vehicle>(this.URL_API + `/${id}` );
  }

  putVehicle(vehicle: Vehicle,id:string) {
    return this.http.put(this.URL_API + `/${id}`,vehicle );
  }

  deleteVehicle(id: string) {
    return this.http.delete(this.URL_API + `/${id}` );
  }

  
}