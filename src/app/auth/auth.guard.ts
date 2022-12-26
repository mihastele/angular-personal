import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable, take } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer'

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private store: Store) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

}