import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromApp from '../../app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSubs: Subscription;


  constructor(private authService: AuthService,
    private uiService: UIService,
    private store: Store) {
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    });
    this.maxDate = new Date()
    const MIN_AGE = 3;
    this.maxDate.setFullYear(this.maxDate.getFullYear() - MIN_AGE)

  }

  ngOnDestroy(): void {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe()
    }
  }

  onSubmit(form: NgForm) {
    console.log(form)
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
