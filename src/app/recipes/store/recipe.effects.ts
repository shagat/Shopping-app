import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  fetchRecipes$ = createEffect(() =>
    this.action$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://ng-recipe-book-a38be-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return RecipesActions.setRecipes({ recipes });
      })
    )
  );

  storeRecipes$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RecipesActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, recipesState]) => {
          return this.http.put(
            'https://ng-recipe-book-a38be-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
            recipesState.recipes
          );
        })
      ),
    { dispatch: false }
  );
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
