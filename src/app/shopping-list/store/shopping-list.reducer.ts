import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomato', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.AddIngredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(action.ingredient),
  })),
  on(ShoppingListActions.AddIngredients, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(...action.ingredients),
  })),
  on(ShoppingListActions.DeleteIngredient, (state, action) => ({
    ...state,
    editedIngredientIndex: -1,
    ingredients: state.ingredients.filter(
      (_, index) => index !== state.editedIngredientIndex
    ),
  })),
  on(ShoppingListActions.UpdateIngredient, (state, action) => ({
    ...state,
    editedIngredientIndex: -1,
    ingredients: state.ingredients.map((ingredient, index) =>
      index === state.editedIngredientIndex
        ? { ...action.ingredient }
        : ingredient
    ),
  })),
  on(ShoppingListActions.StartEdit, (state, action) => ({
    ...state,
    editIndex: action.index,
  })),

  on(ShoppingListActions.StopEdit, (state) => ({
    ...state,
    editIndex: -1,
  }))
);

export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}
