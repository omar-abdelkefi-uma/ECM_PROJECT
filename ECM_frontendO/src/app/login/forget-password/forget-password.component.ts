import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  errorMessage: string;
  username :string; 
  reactiveForm: FormGroup;
  constructor(private fb: FormBuilder,private router: Router,private auth:AuthenticationService) { 
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
  }
  resetPass(){
    this.router.navigate(['user/login/' + this.errorMessage]);
    this.auth.resetPassword(this.username).subscribe(
      (response) => {
        this.errorMessage = "un email a été envoyé, veuillez vérifier votre email s'il vous plaît"
     
        });
  
    }
}
