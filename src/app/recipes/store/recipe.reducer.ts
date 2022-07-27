import { Action, createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};
const _recipeReducer = createReducer(
  initialState,
  on(RecipesActions.SetRecipes, (state, action) => ({
    ...state,
    recipes: [...action.recipes],
  })),
  on(RecipesActions.AddRecipe, (state, action) => ({
    ...state,
    recipes: [...state.recipes, action.recipe],
  })),
  on(RecipesActions.UpdateRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.map((recipe, index) =>
      index === action.index ? { ...action.recipe } : recipe
    ),
  })),
  on(RecipesActions.DeleteRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.filter((_, index) => index !== action.index),
  }))
);

export function recipeReducer(state: State, action: Action){
  return _recipeReducer(state,action);
}
