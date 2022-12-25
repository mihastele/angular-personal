import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";


// don't use providers here, use them in app module to have it in all modules
@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [AngularFireAuthModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule],
    exports: []
})
export class AuthModule {

}