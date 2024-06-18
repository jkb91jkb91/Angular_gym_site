import { Component, OnInit } from '@angular/core';
import { Training } from '../training.model';
import { TrainingService } from '../training.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.css']
})
export class TrainingDetailComponent implements OnInit {
  training: Training;
  id: number;

  constructor(private trainingService: TrainingService, 
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.training = this.trainingService.getTraining(this.id);
    })
  }

  onAddToTrainingList() {
    this.trainingService.addProductsToTrainingList(this.training.products);
  }

  onEditTraining() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteTraining() {
    this.trainingService.deleteTraining(this.id);
    this.router.navigate(['/trainings']);
  }
}
