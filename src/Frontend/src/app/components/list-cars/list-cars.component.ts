import { Component, OnInit } from '@angular/core';





//models
import { Vehicle } from 'src/app/models/vehicle';
import { Type } from 'src/app/models/type';



//Services
import { VehicleService } from 'src/app/services/vehicle.service';
import { TypeService } from 'src/app/services/type.service';


@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})


export class ListCarsComponent implements OnInit {
  id:string=""
  constructor(
    private vehicleService:VehicleService,
    private typeService:TypeService
    ) { }

  ngOnInit(): void {
    this.vehicle_get()
  }

  mostrar(name: Array<string>,ocultos:Array<string>) {
    name.forEach(function (value) {
      let x = document.getElementById(value);
      if (x?.classList.contains('oculto')) {
        x.classList.remove('oculto');
      }
    });
    this.ocultar(ocultos)
  }

  ocultar(name: Array<string>) {
    name.forEach(function (value) {
      let x = document.getElementById(value);
      if (!x?.classList.contains('oculto') && x) {
        x.classList.add('oculto');
      }
    });
  }

  editar(x:string){
      this.mostrar(['add','oculter','vehicle_edit'],['vehicle_create'])
      this.vehicle_data(x)
      this.id=x
  }

  
  //TODO: Vehicle -----------------
  vehicles:Array<Vehicle>=[]
  types:Array<Type>=[]

  vehicle_data(id:string){

    let x =this.vehicles.find(x=>x._id==id);
    (<HTMLInputElement>document.getElementById("vehicle_plate")).value=x?.plate||"";
    (<HTMLInputElement>document.getElementById("vehicle_ownerName")).value=x?.ownerName||"";
    (<HTMLInputElement>document.getElementById("vehicle_ownerDni")).value=x?.dniOwner.toString()||"";
    (<HTMLInputElement>document.getElementById("vehicle_year")).value=x?.year.toString()||"";
    (<HTMLInputElement>document.getElementById("vehicle_km")).value=x?.km.toString()||"";
    (<HTMLInputElement>document.getElementById("vehicle_type")).value=x?.type.id||"";
  }

  vehicle_clear(){
    (<HTMLInputElement>document.getElementById("vehicle_plate")).value="";
    (<HTMLInputElement>document.getElementById("vehicle_ownerName")).value="";
    (<HTMLInputElement>document.getElementById("vehicle_ownerDni")).value="";
    (<HTMLInputElement>document.getElementById("vehicle_year")).value="";
    (<HTMLInputElement>document.getElementById("vehicle_km")).value="";
  }

  vehicle_create(){
    const plate=(<HTMLInputElement>document.getElementById("vehicle_plate")).value;
    const ownerName=(<HTMLInputElement>document.getElementById("vehicle_ownerName")).value;
    const dniOwner=(<HTMLInputElement>document.getElementById("vehicle_ownerDni")).value;
    const year=(<HTMLInputElement>document.getElementById("vehicle_year")).value;
    const km=(<HTMLInputElement>document.getElementById("vehicle_km")).value;
    const typeid=(<HTMLInputElement>document.getElementById("vehicle_type")).value;
    const type={
      id:typeid,
      name:this.types.filter(x=>x._id==typeid)[0].model
    }

    const relleno={
      date:"No calculado",
      Textdate:"No calculado"
    }
    
    let vehicle=new Vehicle(undefined,plate,ownerName,Number(dniOwner),Number(year),Number(km),[],[],relleno,relleno,type)



    this.vehicleService.postVehicle(vehicle).subscribe(res=>{
      this.vehicle_clear()
      this.vehicle_get()
    })
    
  }

  vehicle_delete(){
    let id = this.id
    this.vehicleService.deleteVehicle(id).subscribe(res=>{
      this.vehicle_clear()
      this.vehicle_get()
      this.ocultar(['add','oculter']);
    })
  }

  vehicle_edit(){
    let id = this.id
    const plate=(<HTMLInputElement>document.getElementById("vehicle_plate")).value;
    const ownerName=(<HTMLInputElement>document.getElementById("vehicle_ownerName")).value;
    const dniOwner=(<HTMLInputElement>document.getElementById("vehicle_ownerDni")).value;
    const year=(<HTMLInputElement>document.getElementById("vehicle_year")).value;
    const km=(<HTMLInputElement>document.getElementById("vehicle_km")).value;
    const typeid=(<HTMLInputElement>document.getElementById("vehicle_type")).value;
    const type={
      id:typeid,
      name:this.types.filter(x=>x._id==typeid)[0].model
    }
    const relleno={
      date:"No calculado",
      Textdate:"No calculado"
    }
    
    let vehicle=new Vehicle(id,plate,ownerName,Number(dniOwner),Number(year),Number(km),[],[],relleno,relleno,type)
    this.vehicleService.putVehicle(vehicle,id).subscribe(res=>{
      this.vehicle_clear()
      this.vehicle_get()
      this.ocultar(['add','oculter']);
    })
  }

  vehicle_get(){
    this.vehicleService.getVehicles().subscribe(res=>{
      this.vehicles=[]
      this.vehicles=res as Vehicle[]
      this.typeService.getTypes().subscribe(res=>{
        this.types=res as Type[]
      })
    })
  }


}
