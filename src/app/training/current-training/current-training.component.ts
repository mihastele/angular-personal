import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';

import { StopTrainingComponent } from './stop-training-component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  initInterval = () => {
    const step = this.trainingService.getRunningExercise().duration * 10// (10 -> 1000/100%)
    return setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise()
        clearInterval(this.timer)
        this.progress = 0;
      }
    }, step);
  }

  // @Output() trainingExit = new EventEmitter()
  progress = 0;
  timer: ReturnType<typeof setInterval> = this.initInterval()


  constructor(private dialog: MatDialog, private trainingService: TrainingService) {
  }

  ngOnInit() {
  }

  onStopTimer() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.trainingExit.emit()
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.timer = this.initInterval()
      }
    });
    //this.progress = 0;


  }


}
