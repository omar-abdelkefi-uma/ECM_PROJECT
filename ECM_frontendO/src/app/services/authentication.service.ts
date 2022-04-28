import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// you have to import HttpClientModule to get httpclient
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './storage.service';
import { UserService } from './user/user.service';
import { Permission } from '../models/user/permission';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private actionUrl: string;
  public token: string;
  private user: User;
  private permission: Permission[] = [];
  perssssss: any;
  public id: number;
  private headers = new Headers();
  private options;
  expirationPeriodCookies: any = 0;
  private currentUserSubject: BehaviorSubject<User>;
  public currentPerson: Observable<User>;
  constructor(private storageservice: StorageService, private userservice: UserService, private cookieService: CookieService, private http: HttpClient, private _router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(this.storageservice.getuserfromcookieorsession());
    this.currentPerson = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  //Reading the full response { observe: 'response' }
  login(username, password, rememberMe): Observable<boolean> {
    return this.http.post('http://localhost:8080/authenticate', { username: username, password: password }, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200 && response.body != null) {
            debugger
            // login successful if there's a jwt token in the response
            const token = response.headers.get('Authorization');
            if (token) {
              // set token property
              this.token = 'Bearer ' + token.toString();
              //cast object to user class
              this.user = response.body as User;
              this.currentUserSubject.next(this.user);
              /* this.userservice.getPermissionByUsername2(token).subscribe((per) => {
                 this.permission = per as Permission;
                 //save data in cookie or session
                 }
                 );*/
              this.permission = this.user.role.permissions;
              this.saveInCookieOrInSession(this.token, rememberMe, this.user, this.permission);
              //get period expiration from backend
              this.getExpirationPeriodCookies().subscribe((data) => {
                this.expirationPeriodCookies = +data;
              });
              return true;
            }
            //failed authentication
            return false;
          }
        }), catchError((e: any) => Observable.throw(this.errorHandler(e)))
      )
  }
  errorHandler(error: any): void {
  }
  logout() {
    // remove User from local storage to log User out
    this.cookieService.deleteAll();
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }
  resetPassword(username: string) {
    return this.http.post('http://localhost:8080/forgot-password', { username: username }, { responseType: 'text' })
      .pipe(map(data => {
        debugger;
        console.log(data)
      }));
  }
  confirmNewPass(token: string, newPassword: string): any {
    const data = { password: newPassword };
    const config = { headers: new HttpHeaders().set('Authorization', "Bearer " + token) };
    return this.http.put('http://localhost:8080/new-password', data, config)
  }
  saveInCookieOrInSession(jwtToken: string, rememberMe: boolean, user: User, permissions: Permission[]) {
    var splitted = jwtToken.split(" ");
    debugger;
    if (rememberMe) {
      //this.expirationPeriodCookies in day ## 0.000694444 day (frombackend)  = expiration Period 1 min
      this.cookieService.set('token', jwtToken, this.expirationPeriodCookies);
      this.cookieService.set('user', JSON.stringify(user));
      this.cookieService.set('permissions', JSON.stringify(permissions));
    } else {
      sessionStorage.setItem('token', jwtToken);
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('permissions', JSON.stringify(permissions));
    }
  }
  getExpirationPeriodCookies() {
    return this.http.get('http://localhost:8080/auth/expirationPeriodCookies');
  }
}
