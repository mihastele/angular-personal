import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading$: Observable<boolean>
  private loadingSubs: Subscription;


  constructor(private authService: AuthService,
    private uiService: UIService,
    private store: Store) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading
    // });
    this.maxDate = new Date()
    const MIN_AGE = 3;
    this.maxDate.setFullYear(this.maxDate.getFullYear() - MIN_AGE)

  }


  onSubmit(form: NgForm) {
    console.log(form)
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
