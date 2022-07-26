// import { Action } from "@ngrx/store";
// import { Recipe } from "../recipe.model";

// export const SET_RECIPES = '[Recipes] Set Recipes';
// export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
// export const ADD_RECIPE = '[Recipes] Add Recipe';
// export const UPDATE_RECIPE = '[Recipes] Update Recipe';
// export const DELETE_RECIPE = '[Recipes] Delete Recipe';
// export const STORE_RECIPES = '[Recipes] Store Recipes';

// export class SetRecipes implements Action {
//     readonly type = SET_RECIPES;

//     constructor(public payload: Recipe[]) { }
// }

// export class FetchRecipes implements Action {
//     readonly type = FETCH_RECIPES;

// }

// export class AddRecipe implements Action {
//     readonly type = ADD_RECIPE;

//     constructor(public payload: Recipe[]) { }
// }

// export class UpdateRecipe implements Action {
//     readonly type = UPDATE_RECIPE;

//     constructor(public payload: { index: number, newRecipe: Recipe[] }) { }
// }

// export class DeleteRecipe implements Action {
//     readonly type = DELETE_RECIPE;

//     constructor(public payload: number) { }
// }

// export class StoreRecipes implements Action {
//     readonly type = STORE_RECIPES;
// }

// export type RecipesActions = SetRecipes |
//     FetchRecipes |
//     AddRecipe |
//     UpdateRecipe |
//     DeleteRecipe |
//     StoreRecipes;

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
