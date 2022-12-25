import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 12 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 10 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private runningExercise: Exercise;
    private exercises: Exercise[] = []
    exerciseChanged = new Subject<Exercise>();

    getAvailableExercises() {
        return this.availableExercises.slice() // slice creates a copy to not temper with data from other files
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

