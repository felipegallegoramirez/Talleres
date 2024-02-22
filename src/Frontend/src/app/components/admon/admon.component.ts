import { Component, OnInit } from '@angular/core';


//models
import { Category } from 'src/app/models/category';
import { Monitoring } from 'src/app/models/monitoring';



//Services
import { CategoryService } from 'src/app/services/category.service';
import { MonitoringService } from 'src/app/services/monitoring.service';


@Component({
  selector: 'app-admon',
  templateUrl: './admon.component.html',
  styleUrls: ['./admon.component.css'],
})
export class AdmonComponent implements OnInit {
  constructor(
    private categoryService:CategoryService,
    private monitoringService:MonitoringService
    ) {}

  count:Array<any> =[]

  categorys:Array<Category> =[]

  ngOnInit(): void {
    this.category_get();
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
        this.type_data()
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
    })
  }

  category_edit(){
    let id = (<HTMLInputElement>document.getElementById("category")).value
    let name = (<HTMLInputElement>document.getElementById("category_name")).value
    let category=new Category(undefined,name,undefined)
    this.categoryService.putCategory(category,id).subscribe(res=>{
      this.category_clear()
      this.category_get()
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
      for(let i=0;i<x?.review.length;i++){
        (<HTMLInputElement>unit[i]).value=x.review[i].type;
        (<HTMLInputElement>mode[i]).value=x.review[i].ciclic.toString();
        (<HTMLInputElement>value[i]).value=x.review[i].Value.toString();
      }
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
    })
  }

  monitoring_edit(){
    let id = (<HTMLInputElement>document.getElementById("monitoring")).value

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

    this.monitoringService.putMonitoring(monitoring,id).subscribe(res=>{
      this.monitoring_clear()
      this.monitoring_get()
    })
  
  }
  monitoring_get (){
    this.monitoringService.getMonitorings().subscribe(res=>{
      this.monitorings=[]
      this.monitorings=res as Monitoring[]
    })
    
  }

  //TODO: Type -----------------

  type_data(){

  }
  type_clear(){
    
  }
  type_create(){
    
  }
  type_delete(){
    
  }
  type_edit(){
    
  }
  type_get (){
    
  }



  



}
