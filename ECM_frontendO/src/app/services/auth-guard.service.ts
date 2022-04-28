import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private storageservice: StorageService,
    ) {
    }
    list: string[];
    result: boolean = false;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.result = false;
        const currentUser = this.authenticationService.currentUserValue;
        const requiresLogin = route.data.requiresLogin || false;
        debugger;
        if (currentUser && this.storageservice.getFromCookieOrSession("token")) {
            if (route.data.privilege[0] == "dash") {
                return true;
            }
            if (route.data.privilege !== undefined) {
                this.list = route.data.privilege[0];
                currentUser.role.permissions.forEach(permission => {
                    if (this.list.includes(permission.permission_name)) {
                        this.result = true;
                    }
                })
            }
            if (this.result) {
                return true;
            }
            else {
                this.router.navigate(['dash']);
                return false;
            }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
