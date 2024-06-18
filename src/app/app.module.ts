import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { TrainingListComponent } from './trainings/training-list/training-list.component';
import { TrainingItemComponent } from './trainings/training-list/training-item/training-item.component';
import { DietListComponent } from './diet-list/diet-list.component';
import { DietEditComponent } from './diet-list/diet-edit/diet-edit.component';
import { TrainingDetailComponent } from './trainings/training-detail/training-detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DietListService } from './diet-list/diet-list.service';
import { AppRoutingModule } from './app-routing.module';
import { TrainingStartComponent } from './trainings/training-start/training-start.component';
import { TrainingEditComponent } from './trainings/training-edit/training-edit.component';
import { TrainingService } from './trainings/training.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrainingsComponent,
    TrainingListComponent,
    TrainingDetailComponent,
    TrainingItemComponent,
    DietListComponent,
    DietEditComponent,
    DropdownDirective,
    TrainingStartComponent,
    TrainingEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DietListService, TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
