import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer'
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean>
  // exerciseSubscription: Subscription;
  constructor(
    private trainigSevice: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining)
  }

}
