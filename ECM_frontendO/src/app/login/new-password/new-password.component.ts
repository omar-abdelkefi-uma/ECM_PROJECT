import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newpassword:string="";
  confirmpassword:string="";
  token: string;
  hide:boolean=true;
  hideconfirmpassword:boolean=true;
  reactiveFormr: FormGroup;
  password:string=""; 

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private authService:AuthenticationService,private router: Router ) {

    this.reactiveFormr = this.fb.group({
      password: ['', [Validators.required]],
      newpassword:['', [Validators.required]]
    });

   }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.token= params['token'];              
  });
  }

  confirmNewPassword(){
    debugger;
    this.authService.confirmNewPass(this.token,this.newpassword).subscribe(
      data => {
        debugger;
        this.router.navigate(['/login']);
      }
    );
  }
    
}
