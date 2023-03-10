import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data-model";
import { User } from "./user.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UIService } from "../shared/ui.service";


//rxjs is an event emitter for services and non angular components
@Injectable() // used to inject other services to this service since it is not an angular component
export class AuthService {
    private isAuthenticated: boolean
    authChange = new Subject<boolean>();

    constructor(private router: Router,
        private auth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService) {
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
        this.uiService.loadingStateChanged.next(true);
        this.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
            this.uiService.loadingStateChanged.next(false);
        }).catch(error => {
            // 'Error, please check your data or contact administrator'
            this.uiService.showSnackbar(error.message, null, 3000)
            this.uiService.loadingStateChanged.next(false);
        })
    }


    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
            this.uiService.loadingStateChanged.next(false);
        }).catch(error => {
            // 'Error, most likely invalid credentials'
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, 3000
            )
        })
    }

    logout() {
        this.auth.signOut()
    }


    isAuth() {
        return this.isAuthenticated
    }

}