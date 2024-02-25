import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

import { Monitoring } from 'src/app/models/monitoring';
import { MonitoringService } from 'src/app/services/monitoring.service';

import { Actions } from 'src/app/models/actions';
import { ActionsService } from 'src/app/services/actions.service';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {

  constructor( private vehicleService: VehicleService, 
    private activatedRoute:ActivatedRoute,
    private monitoringService:MonitoringService,
    private actionService:ActionsService,
    private userService:UserService) { }

  vehiculo:Vehicle= new Vehicle();
  monitorings: Array<Monitoring> = []
  actions: Array<Actions> =[]

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      var idcar= params['id'];

      this.vehicleService.getVehicle(idcar).subscribe(res=>{
        this.vehiculo= res as Vehicle

        this.vehiculo.monitoringId.forEach(r=>{
          this.monitoringService.getMonitoring(r).subscribe((a)=>{
            this.monitorings.push(a)
          })
        })

      this.action_get()
      


      })
    })

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

  //TODO: Action -----------------

  action_data(id:string){
    let x =this.actions.find(x=>x._id==id);
    (<HTMLInputElement>document.getElementById("action_title")).value=x?.title || "";
    (<HTMLInputElement>document.getElementById("action_state")).value=x?.state || "";
    (<HTMLInputElement>document.getElementById("action_sumary")).value=x?.sumary || "";

    let monitoring= (<HTMLCollection>document.getElementsByClassName("action_monitoring"))
    /*
        for(let i=0;i<this.monitorings.length;i++){
      if(x){      
        if(x?.monitoringId.filter(e=>this.monitorings[i]._id==e).length>0){
          (<HTMLInputElement>monitoring[i]).checked=true;
        }
      }
    }
    */

  }

  action_clear(){
    (<HTMLInputElement>document.getElementById("action_title")).value= "";
    (<HTMLInputElement>document.getElementById("action_state")).value= "";
    (<HTMLInputElement>document.getElementById("action_sumary")).value= "";
  }

  action_create(){
    let title = (<HTMLInputElement>document.getElementById("action_title")).value||"";
    let state = (<HTMLInputElement>document.getElementById("action_state")).value||"";
    let sumary = (<HTMLInputElement>document.getElementById("action_sumary")).value||"";
    let monitoring= (<HTMLCollection>document.getElementsByClassName("action_monitoring"))

    
    var fechaActual = new Date();
    var año = fechaActual.getFullYear();
    var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    var día = fechaActual.getDate().toString().padStart(2, '0');
    var fecha = año + ":" + mes + ":" + día;

    let id=  localStorage.getItem("id")

    this.userService.getUser(id||"").subscribe(res=>{

      let action= new Actions("",title,state,sumary,[],fecha,{id:res._id||"",name:res.name})

      for(let i=0;i<monitoring.length;i++){
        if((<HTMLInputElement>monitoring[i]).checked==true){
          action.monitoring.push({
            id:this.monitorings[i]._id||"",
            name:this.monitorings[i].name||""
          })
        }
      }
  
      this.actionService.postActions(action).subscribe(sex=>{
        if(sex._id){
          this.vehiculo.actionsId.push(sex._id)
          this.vehicleService.putVehicle(this.vehiculo,this.vehiculo._id||"").subscribe(as=>{
            this.action_clear()
            this.action_get()
          })
        }
      })
    })


    
  }

  action_delete(){
    let id = (<HTMLInputElement>document.getElementById("action")).value
    this.actionService.deleteActions(id).subscribe(res=>{
      this.action_clear()
      this.action_get()
      this.mostrar(['action_create'],['action_edit'])
    })


    
  }

  action_edit(){
    let id = (<HTMLInputElement>document.getElementById("action")).value

    let title = (<HTMLInputElement>document.getElementById("action_title")).value
    let state = (<HTMLInputElement>document.getElementById("action_state")).value
    let sumary = (<HTMLInputElement>document.getElementById("action_sumary")).value

    let monitoring= (<HTMLCollection>document.getElementsByClassName("action_monitoring"))

    
    var fechaActual = new Date();
    var año = fechaActual.getFullYear();
    var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    var día = fechaActual.getDate().toString().padStart(2, '0');
    var fecha = año + "/" + mes + "/" + día;

    let iduser=  localStorage.getItem("id")

    this.userService.getUser(iduser||"").subscribe(res=>{
      let action= new Actions("",title,state,sumary,[],fecha,{id:res._id||"",name:res.name})


      for(let i=0;i<monitoring.length;i++){
        if((<HTMLInputElement>monitoring[i]).checked==true){
          action.monitoring.push({
            id:this.monitorings[i]._id||"",
            name:this.monitorings[i].name||""
          })
        }
      }
  
      this.actionService.postActions(action).subscribe(sex=>{

        console.log(sex as Actions)
        if(sex._id){
          this.vehiculo.actionsId.push(sex._id)
          this.vehicleService.putVehicle(this.vehiculo,this.vehiculo._id||"").subscribe(as=>{
            this.action_clear()
            this.action_get()
          })
        }



      })
    })

    
  }

  action_get (){
    this.vehiculo.actionsId.forEach(r=>{
      this.actionService.getActions(r).subscribe(a=>{
        this.actions.push(a)
      })
    })
  }


}
