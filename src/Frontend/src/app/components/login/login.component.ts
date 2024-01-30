import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  password:string=""
  email:string=""

  Login(){
    let email = (<HTMLInputElement>document.getElementById("email")).value
    let password = (<HTMLInputElement>document.getElementById("password")).value
    let x=new User("",email,password,"")
    email=""
    password=""
    this.userService.Login(x).subscribe(res=>{
      

      if(res._id){
        localStorage.setItem("id",res._id)
        window.location.replace('http://localhost:4200/#/panel');
      }
    },res=>{
      console.log(res)
    })

  }

}
