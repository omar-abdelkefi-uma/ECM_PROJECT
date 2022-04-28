import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DefaultComponent } from './default/default.component';

/*const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];*/
const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)  },
  
 
  {
    path:'',
    component:DefaultComponent,
    
    children:[
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)  },
      { path: 'alluser', loadChildren: () => import('./user/user.module').then(m => m.UserModule)  },
      { path: 'allproject', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)  },
      { path: 'messages', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)  },
    ]
  
  
  },
  { path: '**', redirectTo: 'error-pages/404' },
  { path: 'error-pages', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) }
  
 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
