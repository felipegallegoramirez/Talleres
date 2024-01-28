import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admon',
  templateUrl: './admon.component.html',
  styleUrls: ['./admon.component.css'],
})
export class AdmonComponent implements OnInit {
  constructor() {}
  count:Array<any> =[]
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

  timeadd(){
    this.count.push("1")
  }
  timeremove(){
    this.count.pop()
  }


}
