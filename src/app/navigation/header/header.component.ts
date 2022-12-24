import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>(); // Output is used to be listenable from outside
  isAuth: boolean
  subscriptionToAuth: Subscription

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.subscriptionToAuth = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus
    });
  }

  ngOnDestroy(): void {
    this.subscriptionToAuth.unsubscribe() // clear unneeded memory
  }

  onLogout() {
    this.authService.logout()
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

}
