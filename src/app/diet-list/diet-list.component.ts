import { Component, OnInit, OnDestroy } from '@angular/core';
import { Food_product } from '../shared/food_product.model';
import { DietListService } from './diet-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-diet-list',
  templateUrl: './diet-list.component.html',
  styleUrls: ['./diet-list.component.css']
})
export class DietListComponent implements OnInit, OnDestroy {
  food_products: Food_product[];
  private prodChangeSub: Subscription; 

  constructor(private dlService: DietListService) {

  }

  ngOnInit() {
    this.food_products = this.dlService.getProducts();
    this.prodChangeSub = this.dlService.productsChanged.subscribe((food_products: Food_product[]) => {
      this.food_products = food_products
    })
  }

  onEditItem(index: number) {
    this.dlService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.prodChangeSub.unsubscribe();
  }
}
