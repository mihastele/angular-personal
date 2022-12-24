import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining = false;
  exerciseSubscription: Subscription;
  constructor(private trainigSevice: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainigSevice.exerciseChanged.subscribe(exercise => {
      this.onGoingTraining = exercise ? true : false
    })
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe()
  }
}
