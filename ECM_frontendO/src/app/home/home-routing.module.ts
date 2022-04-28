import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { DashboadComponent } from './dashboad/dashboad.component';



const routes: Routes = [
  { path: '', redirectTo:'dash',pathMatch:'full'  },
  { path: 'dash', component: DashboadComponent  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
