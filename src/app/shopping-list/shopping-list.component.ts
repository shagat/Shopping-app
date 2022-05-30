import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // @Input('igdCreated') igdData: {name:string, amount:number};

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }
  getNewIngredient(igdData:Ingredient){
    this.ingredients.push(igdData)
  }
}
