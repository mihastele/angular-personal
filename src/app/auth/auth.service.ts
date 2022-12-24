import { Subject } from "rxjs";
import { AuthData } from "./auth-data-model";
import { User } from "./user.model";


//rxjs is an event emitter for services and non angular components
export class AuthService {
    private user: User
    authChange = new Subject<boolean>();

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString() // fake for now
        }
        this.authChange.next(true); // boolean payload as defined in the Type
    }


    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString() // fake for now
        }
        this.authChange.next(true);
    }

    logout() {
        this.user = null
        this.authChange.next(false);
    }

    getUser() {
        return { ... this.user }; // spread operator to break ref so other parts don't manipulate the object
    }

    isAuth() {
        return this.user != null;
    }
}