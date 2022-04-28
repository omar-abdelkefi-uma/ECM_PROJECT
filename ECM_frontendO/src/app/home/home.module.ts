import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboadComponent } from './dashboad/dashboad.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [DashboadComponent,],
  imports: [
    CommonModule,
    HomeRoutingModule ,FormsModule
  ]
})
export class HomeModule { }
