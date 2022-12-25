import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data-model";
import { User } from "./user.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Auth from './auth.actions'


//rxjs is an event emitter for services and non angular components
@Injectable() // used to inject other services to this service since it is not an angular component
export class AuthService {
    // private isAuthenticated: boolean
    // authChange = new Subject<boolean>();

    constructor(private router: Router,
        private auth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>) {
    }

    initAuthListener() {
        this.auth.authState.subscribe(user => {
            if (user) {
                // this.isAuthenticated = true
                // this.authChange.next(true);
                this.store.dispatch(new Auth.SetAuthenticated())
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscriptions()
                this.store.dispatch(new Auth.SetUnauthenticated())
                // this.isAuthenticated = false
                // this.authChange.next(false);
                this.router.navigate(['/login'])
            }
        });
    }

    registerUser(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading())
        }).catch(error => {
            // 'Error, please check your data or contact administrator'
            this.uiService.showSnackbar(error.message, null, 3000)
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading())
        })
    }


    login(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading())
        }).catch(error => {
            // 'Error, most likely invalid credentials'
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackbar(error.message, null, 3000
            )
        })
    }

    logout() {
        this.auth.signOut()
    }


}