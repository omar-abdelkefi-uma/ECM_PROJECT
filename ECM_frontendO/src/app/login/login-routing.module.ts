import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const routes: Routes = [
 
  { path: '', redirectTo:'login',pathMatch:'full'  },
  { path: 'login', component: LoginComponent  },
  {path:'login/:errorMessage' , component:LoginComponent },
  {path:'newPassword/:token' , component:NewPasswordComponent },
  {path:'forgetpassword' , component:ForgetPasswordComponent },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
