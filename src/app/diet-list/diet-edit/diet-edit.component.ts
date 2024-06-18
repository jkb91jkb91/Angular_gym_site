import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Food_product } from 'src/app/shared/food_product.model';
import { DietListService } from '../diet-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-diet-edit',
  templateUrl: './diet-edit.component.html',
  styleUrls: ['./diet-edit.component.css']
})
export class DietEditComponent implements OnInit {
  @ViewChild('f', {static: false}) dlForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Food_product;

  constructor(private dlService: DietListService) {

  }

  ngOnInit() {
    this.subscription = this.dlService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.dlService.getProduct(index);
      this.dlForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
        price: this.editedItem.price
      })
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newProduct = new Food_product(value.name, value.amount, value.price)  
    if (this.editMode) {
      this.dlService.updateProduct(this.editedItemIndex, newProduct)
    } else {
      this.dlService.addProduct(newProduct);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.dlService.deleteProduct(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.dlForm.reset();
    this.editMode = false;
  }

  onDestroy() {
    this.subscription.unsubscribe();
  }
}
