import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EMPTY } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private storageservice: StorageService, private authenticationService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //current user 
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && this.storageservice.getFromCookieOrSession("token")) {
      req = req.clone({
        setHeaders: {
          Authorization: this.storageservice.getFromCookieOrSession("token")
        }
      })
    }
    return next.handle(req)
  }
  /*.pipe(
    catchError((res: Response) => this.errorHandler(res)));*/
  //handle error
  errorHandler(error: Response) {
    /*
    if(error.status==401)
    {
      route==>login
    }
    else(/******** )
    */
    //throwError(error)
    return EMPTY;
  }
}