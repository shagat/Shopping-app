import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';


export const AddRecipe = createAction(
  '[Recipe] Add Recipe',
  props<{
    recipe: Recipe
  }>()
);


export const UpdateRecipe = createAction(
  '[Recipe] Update Recipe',
  props<{
    index: number,
    recipe: Recipe
  }>()
);


export const DeleteRecipe = createAction(
  '[Recipe] Delete Recipe',
  props<{
    index: number
  }>()
);


export const SetRecipes = createAction(
  '[Recipe] Set Recipes',
  props<{
    recipes: Recipe[]
  }>()
);


export const FetchRecipes = createAction(
  '[Recipe] Fetch Recipes'
);


export const StoreRecipes = createAction(
  '[Recipe] Store Recipes'
);
