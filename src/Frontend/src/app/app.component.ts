import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Taller';
  changelog:boolean=false

  constructor(private router: Router) {}
  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        if (event.url != '/#/aboutus' && event.url != '/#/login') {

              // ! Recuerde cambiar el changelog
          if(localStorage.getItem("version")!="2"){
            this.changelog=true
          }
          let x = localStorage.getItem('id');
          if (!x) {
            window.location.replace(`${environment.baseUrl}login`);
          }
        }
      }
    });
  }

  ocultar() {
    const nav = document.querySelector('#nav');
    if (nav?.classList.contains('oculto')) {
      nav.classList.remove('oculto');
    } else {
      nav?.classList.add('oculto');
    }
  }
}
