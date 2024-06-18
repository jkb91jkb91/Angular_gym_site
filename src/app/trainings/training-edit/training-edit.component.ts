import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { TrainingService } from '../training.service';
@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.css']
})
export class TrainingEditComponent implements OnInit {
  id: number;
  editMode = false;
  trainingForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private trainingService: TrainingService,
              private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.trainingService.updateTraining(this.id, this.trainingForm.value);
    } else {
      this.trainingService.addTraining(this.trainingForm.value);
    }
    this.onCancel();
  }

  get controls() { 
    return (this.trainingForm.get('products') as FormArray).controls;
  }

  onAddProduct() {
    (<FormArray>this.trainingForm.get('products')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'price': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteProduct(index: number) {
    (<FormArray>this.trainingForm.get('products')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let trainingName = '';
    let trainingImagePath = '';
    let trainingDescription = '';
    let trainingIngredients = new FormArray([]);

    if (this.editMode) {
      const training = this.trainingService.getTraining(this.id);
      trainingName = training.name;
      trainingImagePath = training.imagePath;
      trainingDescription = training.description;
      if (training['products']) {
        for (let product of training.products) {
          trainingIngredients.push(
            new FormGroup({
              'name': new FormControl(product.name),
              'amount': new FormControl(product.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
              'price': new FormControl(product.price, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.trainingForm = new FormGroup({
      'name': new FormControl(trainingName, Validators.required),
      'imagePath': new FormControl(trainingImagePath, Validators.required),
      'description': new FormControl(trainingDescription, Validators.required),
      'products': trainingIngredients
    })
  }
}
