import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data-model";
import { User } from "./user.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";


//rxjs is an event emitter for services and non angular components
@Injectable() // used to inject other services to this service since it is not an angular component
export class AuthService {
    private isAuthenticated: boolean
    authChange = new Subject<boolean>();

    constructor(private router: Router, private auth: AngularFireAuth, private trainingService: TrainingService) {
    }

    initAuthListener() {
        this.auth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true
                this.authChange.next(true);
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscriptions()
                this.authChange.next(false);
                this.router.navigate(['/login'])
                this.isAuthenticated = false
            }
        });
    }

    registerUser(authData: AuthData) {
        this.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
        }).catch(error => {
            console.log(error)
        })
    }


    login(authData: AuthData) {
        this.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
        }).catch(error => {
            console.log(error)
        })
    }

    logout() {
        this.auth.signOut()
    }


    isAuth() {
        return this.isAuthenticated
    }

}