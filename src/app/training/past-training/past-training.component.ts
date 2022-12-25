import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']; // match the names in the definition
  dataSource = new MatTableDataSource<Exercise>()

  private exChangesSubscription: Subscription

  @ViewChild(MatSort) sort: MatSort // get from directive in html
  @ViewChild(MatPaginator) paginator: MatPaginator // get from directive in html

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exChangesSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises
    });
    this.trainingService.fetchExercises()
  }

  ngOnDestroy(): void {
    this.exChangesSubscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator // connect paginator
  }

  doFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

}
