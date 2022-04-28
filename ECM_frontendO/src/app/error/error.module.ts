import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: '404', component: Error404Component },
  
]


@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule
  ]
})
export class ErrorModule { }
