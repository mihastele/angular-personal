import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']; // match the names in the definition
  dataSource = new MatTableDataSource<Exercise>()

  // private exChangesSubscription: Subscription

  @ViewChild(MatSort) sort: MatSort // get from directive in html
  @ViewChild(MatPaginator) paginator: MatPaginator // get from directive in html

  constructor(
    private trainingService: TrainingService,
    private store: Store) { }

  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises
    });
    this.trainingService.fetchExercises()
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator // connect paginator
  }

  doFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

}
