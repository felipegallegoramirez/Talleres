import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';



import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdmonComponent } from './components/admon/admon.component';
import { ListCarsComponent } from './components/list-cars/list-cars.component';
import { ViewCarsComponent } from './components/view-cars/view-cars.component';
import { ChangelogComponent } from './components/changelog/changelog.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'admon', component: AdmonComponent},
  { path: 'panel', component: ListCarsComponent },
  { path: 'car/:id', component:ViewCarsComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdmonComponent,
    ListCarsComponent,
    ViewCarsComponent,
    ChangelogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash:true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
