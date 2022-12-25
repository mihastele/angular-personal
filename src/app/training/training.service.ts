import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Subject, map, Subscription } from "rxjs";
import { UIService } from "../shared/ui.service";
import { Exercise } from "./exercise.model";

import * as fromRoot from '../app.reducer'

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = []
    private runningExercise: Exercise
    private fbSubs: Subscription[] = []
    // private finishedExercises: Exercise[] = []
    // private exercises: Exercise[] = []
    exerciseChanged = new Subject<Exercise>()
    exercisesChanged = new Subject<Exercise[]>()
    finishedExercisesChanged = new Subject<Exercise[]>()

    constructor(private db: AngularFirestore, private uiService: UIService) {

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
                        this.availableExercises = exercises
                        this.exercisesChanged.next([...this.availableExercises])
                    },
                    error: error => {
                        this.uiService.showSnackbar('Failed fetching exrcises, please try again later', null, 3000)
                        this.exerciseChanged.next(null)
                    }
                }

            ))
    }

    startExercise(selectedId: string) {
        // this.db.doc('availableExercises/' + selectedId).update({ lastSelected: new Date() }) // update without override
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    getRunningExercise() {
        return { ...this.runningExercise }
    }

    completeExercise() {
        this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' }) // spread operator + extra data
        this.runningExercise = null
        this.exerciseChanged.next(null)
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'cancelled', duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100) }) // spread operator + extra data
        this.runningExercise = null
        this.exerciseChanged.next(null)
    }

    fetchExercises() {
        this.fbSubs.push(
            this.db.collection("finishedExercises").valueChanges().subscribe({
                next: (exercises: Exercise[]) => {
                    // this.finishedExercises = exercises
                    this.finishedExercisesChanged.next(exercises)
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

