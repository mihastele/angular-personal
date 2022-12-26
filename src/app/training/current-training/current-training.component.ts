import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer'
import { TrainingService } from '../training.service';

import { StopTrainingComponent } from './stop-training-component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  // @Output() trainingExit = new EventEmitter()
  progress = 0;
  timer: ReturnType<typeof setInterval>

  initInterval = () => {
    this.store.select(fromTraining.getActiveTraining).subscribe(exercise => {

      const step = exercise.duration * 10// (10 -> 1000/100%)
      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise()
          clearInterval(this.timer)
          this.progress = 0;
        }
      }, step);
    })
  }




  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.initInterval();
  }

  onStopTimer() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.initInterval();
      }
    });
  }


}
