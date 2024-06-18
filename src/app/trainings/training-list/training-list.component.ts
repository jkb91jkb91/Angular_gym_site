import { Component, OnInit, OnDestroy } from '@angular/core';
import { Training } from '../training.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {
  trainings: Training[];
  subscription: Subscription;

  constructor(private trainingService: TrainingService, 
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this.trainingService.trainingsChanged.subscribe((trainings: Training[]) => {
      this.trainings = trainings;
    });
    this.trainings = this.trainingService.getTrainings();
  }

  onNewTraining() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
