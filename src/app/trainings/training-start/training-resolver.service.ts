import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router'
import { Training } from '../training.model'
import { DataStorageService } from 'src/app/shared/data-storage.service'
import { TrainingService } from '../training.service'
import { inject } from '@angular/core'

@Injectable({providedIn: 'root'})
export class TrainingResolverService {
    constructor() {}

    static fetchRecipes: ResolveFn<Training[]> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const recipes = inject(TrainingService).getTrainings();
      if (recipes.length === 0) {
        return inject(DataStorageService).fetchTrainings();
      } else {
        return recipes;
      }
    };
}