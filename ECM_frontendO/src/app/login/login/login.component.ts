import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide:boolean=true;
  reactiveForm: FormGroup;
  username :string; 
  password:string;
  remember: boolean = false;
  errorMessage: string;
  constructor(private fb: FormBuilder, private router: Router,private auth:AuthenticationService) {
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember:['']
    });

   }

 
  ngOnInit(): void {
  }
  login(){
    debugger;
          //  this.auth.login(this.username,this.password,this.remember).subscribe(data=>console.log(data));
            this.auth.login(this.username,this.password,this.remember).subscribe(
              data => {
                debugger;
                if(data){
                  this.router.navigate(['home/dash']);
                }
                else{
                  this.errorMessage = 'Username or password is incorrect';
                }
                
              },
              error => {
                debugger;
                this.errorMessage = 'Username or password is incorrect';
              }
            );
    }

}
