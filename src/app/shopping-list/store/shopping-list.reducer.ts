import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  // editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomato', 10)],
  // editedIngredient: null,
  editedIngredientIndex: -1,
};

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(action.ingredient),
  })),
  on(ShoppingListActions.addIngredients, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(...action.ingredients),
  })),
  on(ShoppingListActions.deleteIngredient, (state, action) => ({
    ...state,
    editedIngredientIndex: -1,
    ingredients: state.ingredients.filter(
      (_, index) => index !== state.editedIngredientIndex
    ),
  })),
  on(ShoppingListActions.updateIngredient, (state, action) => ({
    ...state,
    editedIngredientIndex: -1,
    ingredients: state.ingredients.map((ingredient, index) =>
      index === state.editedIngredientIndex
        ? { ...action.ingredient }
        : ingredient
    ),
  })),
  on(ShoppingListActions.startEdit, (state, action) => ({
    ...state,
    editIndex: action.index,
  })),

  on(ShoppingListActions.stopEdit, (state) => ({
    ...state,
    editIndex: -1,
  }))
);

export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}
