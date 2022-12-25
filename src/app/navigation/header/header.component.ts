import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../app.reducer'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>(); // Output is used to be listenable from outside
  isAuth$: Observable<boolean>
  subscriptionToAuth: Subscription

  constructor(
    private authService: AuthService,
    private store: Store) {
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onLogout() {
    this.authService.logout()
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

}
