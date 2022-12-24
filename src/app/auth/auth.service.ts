import { AuthData } from "./auth-data-model";
import { User } from "./user.model";

export class AuthService {
    private user: User

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString() // fake for now
        }
    }


    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString() // fake for now
        }
    }

    logout() {
        this.user = null
    }

    getUser() {
        return { ... this.user }; // spread operator to break ref so other parts don't manipulate the object
    }

    isAuth() {
        return this.user != null;
    }
}