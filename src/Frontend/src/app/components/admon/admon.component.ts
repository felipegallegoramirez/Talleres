import { Component, OnInit } from '@angular/core';


//models
import { Category } from 'src/app/models/category';
import { Monitoring } from 'src/app/models/monitoring';
import { Type } from 'src/app/models/type';



//Services
import { CategoryService } from 'src/app/services/category.service';
import { MonitoringService } from 'src/app/services/monitoring.service';
import { TypeService } from 'src/app/services/type.service';


@Component({
  selector: 'app-admon',
  templateUrl: './admon.component.html',
  styleUrls: ['./admon.component.css'],
})
export class AdmonComponent implements OnInit {
  constructor(
    private categoryService:CategoryService,
    private monitoringService:MonitoringService,
    private typeService:TypeService
    ) {}

  count:Array<any> =[]

  categorys:Array<Category> =[]

  ngOnInit(): void {
    this.type_get()
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

  timeadd(){
    this.count.push("1")
  }
  timeremove(){
    this.count.pop()
  }

  editar(option:string,name: Array<string>,ocultos:Array<string>,type:number){
    let x= <HTMLSelectElement>document.getElementById(option)
    if(x.value=='0'){
      this.mostrar(name,ocultos)
    }else{
      this.mostrar(ocultos,name)
      //Para pensar
      if(type==0){
        this.category_data(x.value)
      }else if(type==1){
        this.type_data(x.value)
      }
      else if(type==2){
        this.monitoring_data(x.value)
      }

    }
  }

  //TODO: Category -----------------

  category_data(id:string){
    let x =this.categorys.find(x=>x._id==id);
    (<HTMLInputElement>document.getElementById("category_name")).value=x?.name || ""
  }

  category_clear(){
    (<HTMLInputElement>document.getElementById("category_name")).value=""
  }

  category_create(){
    let name = (<HTMLInputElement>document.getElementById("category_name")).value
    let category=new Category(undefined,name,undefined)
    this.categoryService.postCategory(category).subscribe(res=>{
      this.category_clear()
      this.category_get()
    })
  }

  category_delete(){
    let id = (<HTMLInputElement>document.getElementById("category")).value
    this.categoryService.deleteCategory(id).subscribe(res=>{

      this.category_clear()
      this.category_get()
      this.mostrar(['category_create'],['category_edit'])
    })
  }

  category_edit(){
    let id = (<HTMLInputElement>document.getElementById("category")).value
    let name = (<HTMLInputElement>document.getElementById("category_name")).value
    let category=new Category(id,name,undefined)
    this.categoryService.putCategory(category,id).subscribe(res=>{
      this.category_clear()
      this.category_get()
      this.mostrar(['category_create'],['category_edit'])
    })
  }

  category_get(){
    this.categoryService.getCategorys().subscribe(res=>{
      this.categorys=[]
      this.categorys=res as Category[]
    })
  }


  //TODO: Actions -----------------

  monitorings:Array<Monitoring> =[]

  monitoring_data(id:string){
    let x =this.monitorings.find(x=>x._id==id);
    if(x){
      (<HTMLInputElement>document.getElementById("monitoring_name")).value=x?.name || ""
      this.count=[]
      x?.review.forEach(element => {
        this.count.push(1)
      });
      let unit= (<HTMLCollection>document.getElementsByClassName("monitoring_unit"))
      let mode= (<HTMLCollection>document.getElementsByClassName("monitoring_mode"))
      let value= (<HTMLCollection>document.getElementsByClassName("monitoring_value"))
      setTimeout(() => {
        if(x){
          for(let i=0;i<x?.review.length;i++){
            (<HTMLInputElement>unit[i]).value=x.review[i].type;
            (<HTMLInputElement>mode[i]).value=x.review[i].ciclic.toString();
            (<HTMLInputElement>value[i]).value=x.review[i].Value.toString();
          }
        }
      },0)
    }

  }
  monitoring_clear(){
    (<HTMLInputElement>document.getElementById("monitoring_name")).value=""
    this.count=[]
  }
  monitoring_create(){
    let name = (<HTMLInputElement>document.getElementById("monitoring_name")).value

    let unit= (<HTMLCollection>document.getElementsByClassName("monitoring_unit"))
    let mode= (<HTMLCollection>document.getElementsByClassName("monitoring_mode"))
    let value= (<HTMLCollection>document.getElementsByClassName("monitoring_value"))

    let monitoring= new Monitoring("",name,[])

    for(let i=0;i<unit.length;i++){
      monitoring.review.push({
        type:(<HTMLInputElement>unit[i]).value,
        ciclic:Number((<HTMLInputElement>mode[i]).value),
        minValue:0,
        Value:Number((<HTMLInputElement>value[i]).value),
      })
    }

    this.monitoringService.postMonitoring(monitoring).subscribe(res=>{
      this.monitoring_clear()
      this.monitoring_get()
    })
  }
  monitoring_delete(){
    let id = (<HTMLInputElement>document.getElementById("monitoring")).value
    this.monitoringService.deleteMonitoring(id).subscribe(res=>{
      this.monitoring_clear()
      this.monitoring_get()
      this.mostrar(['monitoring_create'],['monitoring_edit'])
    })
  }

  monitoring_edit(){
    let id = (<HTMLInputElement>document.getElementById("monitoring")).value

    let name = (<HTMLInputElement>document.getElementById("monitoring_name")).value

    let unit= (<HTMLCollection>document.getElementsByClassName("monitoring_unit"))
    let mode= (<HTMLCollection>document.getElementsByClassName("monitoring_mode"))
    let value= (<HTMLCollection>document.getElementsByClassName("monitoring_value"))

    let monitoring= new Monitoring(id,name,[])

    for(let i=0;i<unit.length;i++){
      monitoring.review.push({
        type:(<HTMLInputElement>unit[i]).value,
        ciclic:Number((<HTMLInputElement>mode[i]).value),
        minValue:0,
        Value:Number((<HTMLInputElement>value[i]).value),
      })
    }


    this.monitoringService.putMonitoring(monitoring,id).subscribe(res=>{
      this.monitoring_clear()
      this.monitoring_get()
      this.mostrar(['monitoring_create'],['monitoring_edit'])
    })
  
  }
  monitoring_get (){
    this.monitoringService.getMonitorings().subscribe(res=>{
      this.monitorings=[]
      this.monitorings=res as Monitoring[]
    })
    
  }

  //TODO: Type -----------------

  types:Array<Type> =[]

  type_data(id:string){
    let x =this.types.find(x=>x._id==id);
    (<HTMLInputElement>document.getElementById("type_model")).value=x?.model || "";
    (<HTMLInputElement>document.getElementById("type_brand")).value=x?.brand || "";
    (<HTMLInputElement>document.getElementById("type_category")).value=x?.category || "";

    let monitoring= (<HTMLCollection>document.getElementsByClassName("type_monitoring"))

    for(let i=0;i<this.monitorings.length;i++){
      if(x){      
        if(x?.monitoringId.filter(e=>this.monitorings[i]._id==e).length>0){
          (<HTMLInputElement>monitoring[i]).checked=true;
        }
      }
    }
  }

  type_clear(){
    console.log("asd");
    (<HTMLInputElement>document.getElementById("type_model")).value="";
    (<HTMLInputElement>document.getElementById("type_brand")).value="";
  }

  type_create(){
    let model = (<HTMLInputElement>document.getElementById("type_model")).value
    let brand = (<HTMLInputElement>document.getElementById("type_brand")).value
    let category = (<HTMLInputElement>document.getElementById("type_category")).value

    let monitoring= (<HTMLCollection>document.getElementsByClassName("type_monitoring"))

    let type= new Type("",model,brand,category,[],[])

    for(let i=0;i<monitoring.length;i++){
      if((<HTMLInputElement>monitoring[i]).checked==true){
        type.monitoringId.push(this.monitorings[i]._id||"")
      }
    }

    this.typeService.postType(type).subscribe(res=>{
      this.type_clear()
      this.type_get()
    })
    
  }

  type_delete(){
    let id = (<HTMLInputElement>document.getElementById("type")).value
    this.typeService.deleteType(id).subscribe(res=>{
      this.type_clear()
      this.type_get()
      this.mostrar(['type_create'],['type_edit'])
    })


    
  }

  type_edit(){
    let id = (<HTMLInputElement>document.getElementById("type")).value

    let model = (<HTMLInputElement>document.getElementById("type_model")).value
    let brand = (<HTMLInputElement>document.getElementById("type_brand")).value
    let category = (<HTMLInputElement>document.getElementById("type_category")).value

    let monitoring= (<HTMLCollection>document.getElementsByClassName("type_monitoring"))

    let type= new Type(id,model,brand,category,[],[])

    for(let i=0;i<monitoring.length;i++){
      if((<HTMLInputElement>monitoring[i]).checked==true){
        type.monitoringId.push(this.monitorings[i]._id||"")
      }
    }

    this.typeService.putType(type,id).subscribe(res=>{
      this.type_clear()
      this.type_get()
      this.mostrar(['type_create'],['type_edit'])
    })
    
  }

  type_get (){
    this.typeService.getTypes().subscribe(res=>{
      this.types= res as Type[]
      this.category_get();
      this.monitoring_get();
    })
    
  }



  



}
