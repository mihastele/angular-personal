import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>(); // Output is used to be listenable from outside

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }
}
