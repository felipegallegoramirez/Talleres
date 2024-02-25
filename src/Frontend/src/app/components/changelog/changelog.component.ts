import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  actualizar(){
    // ! Recuerde cambiar el APP
    localStorage.setItem("version","2")
    const x=document.getElementById("oculter")
    x?.classList.add("oculto")
    const y=document.getElementById("data")
    y?.classList.add("oculto")
  }

}
