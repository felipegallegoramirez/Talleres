import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
