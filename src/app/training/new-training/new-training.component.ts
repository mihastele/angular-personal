import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Observable, map, Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  // @Output() trainingStart = new EventEmitter<void>()
  exercises: Exercise[]
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises)
    this.trainingService.fetchAvailableExercises();



    // this.exercises = this.trainingService.getAvailableExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe()
    }
  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    this.trainingService.startExercise(form.value.exercise)
  }
}
