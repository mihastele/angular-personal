import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Subject, map } from "rxjs";
import { Exercise } from "./exercise.model";

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private exercises: Exercise[] = []
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore) {

    }

    fetchAvailableExercises() {
        this.db.collection('availableExercises').snapshotChanges().pipe(map(docData => {
            // console.log(docData)
            return docData.map(d => {

                return {
                    id: d.payload.doc.id,
                    ...(d.payload.doc.data() as Object)
                }
            })
        })).subscribe((exercises: Exercise[]) => {
            this.availableExercises = exercises
            this.exercisesChanged.next([...this.availableExercises])
        })
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    getRunningExercise() {
        return { ...this.runningExercise }
    }

    completeExercise() {
        this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' }) // spread operator + extra data
        this.runningExercise = null
        this.exerciseChanged.next(null)
    }

    cancelExercise(progress: number) {
        this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'cancelled', duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100) }) // spread operator + extra data
        this.runningExercise = null
        this.exerciseChanged.next(null)
    }

    getExercises() {
        return this.exercises.slice()
    }
}

