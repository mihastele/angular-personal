import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data-model";
import { User } from "./user.model";


//rxjs is an event emitter for services and non angular components
@Injectable() // used to inject other services to this service since it is not an angular component
export class AuthService {
    private user: User
    authChange = new Subject<boolean>();

    constructor(private router: Router) {
    }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString() // fake for now
        }
        // this.authChange.next(true); // boolean payload as defined in the Type
        this.authSuccessfully()
    }


    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString() // fake for now
        }
        this.authSuccessfully()
    }

    logout() {
        this.user = null
        this.authChange.next(false);
        this.router.navigate(['/signup'])
    }

    getUser() {
        return { ... this.user }; // spread operator to break ref so other parts don't manipulate the object
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccessfully() {
        this.authChange.next(true);
        this.router.navigate(['/training'])
    }
}