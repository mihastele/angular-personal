import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>(); // Output is used to be listenable from outside
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

  onClose() {
    this.closeSidenav.emit()
  }

  onLogout() {
    this.onClose()
    this.authService.logout()
  }
}
