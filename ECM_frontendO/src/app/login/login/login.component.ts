import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  reactiveForm: FormGroup;
  username: string;
  password: string;
  remember: boolean = false;
  errorMessage: string;
  user: User;
  message: any;
  constructor(private route: ActivatedRoute, private storageservice: StorageService, private fb: FormBuilder, private router: Router, private auth: AuthenticationService) {
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: ['']
    });

  }


  ngOnInit(): void {
    this.message = this.route.snapshot.params['errorMessage'];
  }
  login() {
    //  this.auth.login(this.username,this.password,this.remember).subscribe(data=>console.log(data));
    this.auth.login(this.username, this.password, this.remember).subscribe(
      data => {
        if (data) {
          this.user = this.storageservice.getuserfromcookieorsession();
          if (this.user.type !== 'admin') {
            this.router.navigate(['allproject/project']);
          } else {
            this.router.navigate(['alluser/listrole']);
          }
        }
        else {
          this.errorMessage = 'Username or password is incorrect';
        }

      },
      error => {
        this.errorMessage = 'Username or password is incorrect';
      }
    );
  }

}
