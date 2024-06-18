import { Food_product } from "../shared/food_product.model";

export class Training {
    public name: string;
    public description: string;
    public imagePath: string;
    public products: Food_product[];

    constructor(name: string, description: string, imagePath: string, products: Food_product[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.products = products;
    }
}