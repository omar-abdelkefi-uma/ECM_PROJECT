import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DefaultComponent } from './default/default.component';
import { InterceptorService } from './services/interceptor.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';






@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DefaultComponent,

    
  ],
  providers: [{
                provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true
              },
              AuthenticationService,AuthGuardService
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
