import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingEditComponent } from './training-edit.component';

describe('TrainingEditComponent', () => {
  let component: TrainingEditComponent;
  let fixture: ComponentFixture<TrainingEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingEditComponent]
    });
    fixture = TestBed.createComponent(TrainingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
