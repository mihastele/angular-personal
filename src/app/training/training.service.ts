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
}

