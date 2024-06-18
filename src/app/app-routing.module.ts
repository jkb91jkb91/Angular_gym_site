import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingsComponent } from './trainings/trainings.component';
import { DietListComponent } from './diet-list/diet-list.component';
import { TrainingStartComponent } from './trainings/training-start/training-start.component';
import { TrainingDetailComponent } from './trainings/training-detail/training-detail.component';
import { TrainingEditComponent } from './trainings/training-edit/training-edit.component';
import { TrainingResolverService } from './trainings/training-start/training-resolver.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/trainings', pathMatch: 'full' },
    { path: 'trainings', component: TrainingsComponent, resolve: {recipes: TrainingResolverService.fetchRecipes},
     children: [
        { path: '', component: TrainingStartComponent },
        { path: 'new', component: TrainingEditComponent },
        { path: ':id', component: TrainingDetailComponent },
        { path: ':id/edit', component: TrainingEditComponent }
    ] },
    { path: 'diet-list', component: DietListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}