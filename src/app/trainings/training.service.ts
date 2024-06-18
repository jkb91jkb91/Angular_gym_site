import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Training } from "./training.model";
import { Food_product } from '../shared/food_product.model';
import { DietListService } from '../diet-list/diet-list.service';

@Injectable()
export class TrainingService {
    trainingsChanged = new Subject<Training[]>();

    private trainings: Training[] = [];
        
    constructor(private dlService: DietListService) {

    }

    setTrainings(trainings: Training[]) {
        this.trainings = trainings;
        this.trainingsChanged.next(this.trainings.slice());
    }

    getTrainings() {
        return this.trainings.slice();
    }

    getTraining(index: number) {
        return this.trainings[index];
    }

    addProductsToTrainingList(products: Food_product[]) {
        this.dlService.addProducts(products);
    }

    addTraining(training: Training) {
        this.trainings.push(training);
        this.trainingsChanged.next(this.trainings.slice());
    }

    updateTraining(index: number, newTraining: Training) {
        this.trainings[index] = newTraining;
        this.trainingsChanged.next(this.trainings.slice());
    }

    deleteTraining(index: number) {
        this.trainings.splice(index, 1);
        this.trainingsChanged.next(this.trainings.slice());

    }
 }