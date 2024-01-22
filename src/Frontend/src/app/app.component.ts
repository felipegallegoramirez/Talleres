import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Taller';

  ocultar(){
    const nav=document.querySelector("#nav")
    if(nav?.classList.contains("oculto")){
      nav.classList.remove("oculto")
    }else{
      nav?.classList.add("oculto")
    }
  }
}
