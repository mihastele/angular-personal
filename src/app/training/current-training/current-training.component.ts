import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: ReturnType<typeof setInterval> = setInterval(() => {
    this.progress += 5;
    if (this.progress >= 100) {
      clearInterval(this.timer)
      this.progress = 0;
    }
  }, 1000);

  constructor() {
  }

  ngOnInit() {
  }

  onStopTimer() {
    clearInterval(this.timer)
    this.progress = 0;
  }
}
