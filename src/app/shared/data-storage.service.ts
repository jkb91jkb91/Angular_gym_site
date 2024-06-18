import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Training } from "../trainings/training.model";
import { TrainingService } from "../trainings/training.service";
import { map, tap } from "rxjs";
import { of } from 'rxjs';
import { environment } from './environment';


//const { save } = require('../common/services_methods.js')
import { save } from '../common/services_methods';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private trainingService: TrainingService) {

    }

    // This should be combined with SAVE button and save every record
    storeTrainings() {
        const trainings = this.trainingService.getTrainings();
        console.log(trainings);
        return this.http.put(
            'api/testing/update_all/', 

            trainings).subscribe(response => {
                console.log(trainings);
                console.log(response);
            })

    }


  

    fetchTrainings() {
        return this.http
        .get<Training[]>('/api/fetch_all/')


        
        .pipe(
            map(trainings => {
                console.log(trainings);
                return trainings.map(training => {
                    return {...training, food_products: training.products ? training.products : []};
                });
            }),
            tap(trainings => {
                this.trainingService.setTrainings(trainings);
                console.log(trainings);
            })
        );

        
    }
    
}
