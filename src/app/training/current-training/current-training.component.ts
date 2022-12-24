import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() trainingExit = new EventEmitter()
  progress = 0;
  timer: ReturnType<typeof setInterval> = this.initInterval(1000)


  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onStopTimer() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit()
      } else {
        this.timer = this.initInterval(1000)
      }
    });
    //this.progress = 0;
  }


}
