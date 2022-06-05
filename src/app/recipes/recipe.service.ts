import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
constructor(private slService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe(
            'A very tasty meat with onion',
            'This is a very delightful tropical dinner',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
            new Recipe(
                'A very tasty meat',
                'This is a very delightful dinner',
                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
                [
                    new Ingredient('Meat', 3),
                    new Ingredient('French Fries', 30)
                ])
    ];
    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredient: Ingredient[]) {
        this.slService.addNewIngredients(ingredient);
    }

    getRecipe(index: number) {
        return this.recipes[index]
      }
}