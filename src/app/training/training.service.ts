import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Subject, map, Subscription, take } from "rxjs";
import { UIService } from "../shared/ui.service";
import { Exercise } from "./exercise.model";

import * as fromRoot from '../app.reducer'
import * as fromTraining from './training.reducer'
import * as Training from './training.actions'
import { Store } from "@ngrx/store";

@Injectable()
export class TrainingService {


    private fbSubs: Subscription[] = []
    // private finishedExercises: Exercise[] = []
    // private exercises: Exercise[] = []
    exerciseChanged = new Subject<Exercise>()
    exercisesChanged = new Subject<Exercise[]>()
    finishedExercisesChanged = new Subject<Exercise[]>()

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store) {

    }

    fetchAvailableExercises() {
        this.fbSubs.push(
            this.db.collection('availableExercises').snapshotChanges().pipe(map(docData => {
                // console.log(docData)
                return docData.map(d => {

                    return {
                        id: d.payload.doc.id,
                        ...(d.payload.doc.data() as Object)
                    }
                })
            })).subscribe(
                {
                    next: (exercises: Exercise[]) => {
                        // this.availableExercises = exercises
                        // this.exercisesChanged.next([...this.availableExercises])
                        this.store.dispatch(new Training.SetAvailableTrainings(exercises))
                    },
                    error: error => {
                        this.uiService.showSnackbar('Failed fetching exrcises, please try again later', null, 3000)
                        this.exerciseChanged.next(null)
                    }
                }

            ))
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartTraining(selectedId))
    }


    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    fetchExercises() {
        this.fbSubs.push(
            this.db.collection("finishedExercises").valueChanges().subscribe({
                next: (exercises: Exercise[]) => {
                    // this.finishedExercises = exercises
                    // this.finishedExercisesChanged.next(exercises)
                    this.store.dispatch(new Training.SetFinishedTrainings(exercises))
                }
            }))

        // return this.exercises.slice()
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            if (sub) {
                sub.unsubscribe()
            }
        })
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise)
    }
}

