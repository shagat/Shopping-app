import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Recipe } from "./recipe.model";
import * as fromApp from '../store/app.reducer';
import * as RecipeAction from '../recipes/store/recipe.actions'
import { Actions, ofType } from "@ngrx/effects";
import { take } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private store: Store,
        private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        this.store.dispatch(new RecipeAction.FetchRecipes());
        return this.actions$.pipe(
            ofType(RecipeAction.SET_RECIPES),
            take(1))
        // const recipes = this.recipesService.getRecipes()
        // if (recipes.length === 0) {
        //     return this.dataStorageService.fetchRecipes();
        // }
        // else{
        //     return recipes;
        // }
    }
}