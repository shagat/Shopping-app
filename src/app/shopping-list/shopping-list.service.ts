import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredient() {
        return this.ingredients.slice();
    }

    addNewIngredient(igdData: Ingredient) {
        this.ingredients.push(igdData);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    addNewIngredients(ingredient: Ingredient[]){
        this.ingredients.push(...ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}