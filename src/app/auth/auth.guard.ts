import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private store: Store) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

}