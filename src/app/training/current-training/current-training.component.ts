import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-training-component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  initInterval = (secs) => {
    return setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer)
        this.progress = 0;
      }
    }, secs);
  }

  progress = 0;
  timer: ReturnType<typeof setInterval> = this.initInterval(1000)

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onStopTimer() {
    clearInterval(this.timer)
    this.dialog.open(StopTrainingComponent)
    //this.progress = 0;
  }


}
