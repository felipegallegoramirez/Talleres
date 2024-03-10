import { Component, OnInit , NgZone } from '@angular/core';
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
    private userService:UserService,
    private ngZone: NgZone) { }

  vehiculo:Vehicle= new Vehicle();
  monitorings: Array<any> = []
  actions: Array<Actions> =[]

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      var idcar= params['id'];

      this.vehicleService.getVehicle(idcar).subscribe(res=>{
        this.vehiculo= res as Vehicle
        var i=0;
        this.vehiculo.monitoring.forEach(r=>{
          this.monitoringService.getMonitoring(r.id).subscribe((a)=>{

            this.monitorings.push({
              monitoring:a,
              actu:r.ult
            })
            i++;
            if(this.vehiculo.monitoring.length==i){
              setTimeout(() => {
                // Invocar la función después de 1 segundo
                this.ngZone.run(() => {
                  this.action_data()
                });
              }, 1000);

            }

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

  action_data(){

    let monitoring = document.getElementsByClassName("monitoring_selecter")
    
    for(let r= 0;r<this.monitorings.length;r++){
      let x= this.monitorings[r]
      let state="estable"
      for(let i= 0;i<x.monitoring.review.length;i++){
        let revision= this.monitorings[r].actu
        console.log(revision)
        console.log(Number(x.monitoring.review[i].Value)>Number(revision)&&Number(x.monitoring.review[i].Value)<this.vehiculo.km)

        if(revision){
          if(x.monitoring.review[i].ciclic==0){
            if(Number(x.monitoring.review[i].Value)>Number(revision)&&Number(x.monitoring.review[i].Value)<this.vehiculo.km){
              state="cambio";
              break;
            }else if(Number(x.monitoring.review[i].Value)*0.8>this.vehiculo.km&&Number(x.monitoring.review[i].Value)>Number(revision)){
              state="casi";
              break;
            }
          }else if(x.monitoring.review[i].ciclic==1){
            if(this.vehiculo.km-Number(revision)>Number(x.monitoring.review[i].Value)){
              state="cambio";
              break;
            }else if(this.vehiculo.km-Number(revision)>Number(x.monitoring.review[i].Value)*0.8){
              state="casi";
              break;
            }
          }
        }
      }
      monitoring[r].classList.remove("estable")
      monitoring[r].classList.remove("casi")
      monitoring[r].classList.remove("cambio")
      monitoring[r].classList.add(state)
      

    }

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
            id:this.monitorings[i].monitoring._id||"",
            name:this.monitorings[i].monitoring.name||""
          })
          this.vehiculo.monitoring[this.vehiculo.monitoring.findIndex(x=>x.id==this.monitorings[i].monitoring._id)].ult=this.vehiculo.km+""
        }
      }
  
      this.actionService.postActions(action).subscribe(sex=>{
        if(sex._id){
          this.vehiculo.actionsId.push(sex._id)
          this.vehiculo.lastmaintenance.Textdate=fecha
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
            id:this.monitorings[i].monitoring._id||"",
            name:this.monitorings[i].monitoring.name||""
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

  actualizarKM(){
    this.vehiculo.km=Number((<HTMLInputElement>document.getElementById("km")).value)
    console.log(this.vehiculo.km)
    this.vehicleService.putVehicle(this.vehiculo,this.vehiculo._id||"").subscribe(as=>{
      this.action_data()
    })
  }


}
