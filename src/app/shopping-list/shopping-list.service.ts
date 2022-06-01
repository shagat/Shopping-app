import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredient() {
        return this.ingredients.slice();
    }

    addNewIngredient(igdData: Ingredient) {
        this.ingredients.push(igdData)
        this.ingredientChanged.emit(this.ingredients.slice())
    }
}