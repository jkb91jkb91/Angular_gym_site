import { Food_product } from "../shared/food_product.model";
import { Subject } from 'rxjs';

export class DietListService {
    productsChanged = new Subject<Food_product[]>();
    startedEditing = new Subject<number>();
    private food_products: Food_product[] = [
        new Food_product('Jogurt', 5, 3),
        new Food_product('Pomidor', 5, 3)
      ];    

    getProducts() {
        return this.food_products.slice();
    }

    getProduct(index: number) {
        return this.food_products[index];
    }

    addProduct(products: Food_product) {
        this.food_products.push(products);
        this.productsChanged.next(this.food_products.slice());
    }

    addProducts(products: Food_product[]) {
        this.food_products.push(...products);
        this.productsChanged.next(this.food_products.slice());
    }

    updateProduct(index: number, newProduct: Food_product) {
        this.food_products[index] = newProduct;
        this.productsChanged.next(this.food_products.slice());
    }

    deleteProduct(index: number) {
        this.food_products.splice(index, 1);
        this.productsChanged.next(this.food_products.slice());
    }
}