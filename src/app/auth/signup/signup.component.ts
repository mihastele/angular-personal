import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;


  constructor(private authService: AuthService) {
  }

  ngOnInit() {
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
