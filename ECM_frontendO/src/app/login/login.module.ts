import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//§important
import { LoginRoutingModule } from './login-routing.module';
import { SharedmModule } from '../sharedm/sharedm.module';

import {FlexLayoutModule} from "@angular/flex-layout";







@NgModule({
  declarations: [NewPasswordComponent, ForgetPasswordComponent, LoginComponent],
  imports: [
    CommonModule,FormsModule ,RouterModule ,LoginRoutingModule,SharedmModule,FlexLayoutModule
  ]
})
export class LoginModule { }
