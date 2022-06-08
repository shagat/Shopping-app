import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }
    
    getIngredient(index:number){
        return this.ingredients[index];
    }

    updateIngredient(index:number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
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