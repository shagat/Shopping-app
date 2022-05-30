import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@Output('igdCreated') newIngredient = new EventEmitter<Ingredient>();

ingredient: Ingredient = {name: '', amount:0};
  constructor() { }

  ngOnInit(): void {
  }
  getInputData(igdName:string,igdAmount:number){
    // this.ingredient.name = nameInput.value
    // this.ingredient.amount = Number(amountInput.value)
    this.ingredient.name = igdName
    this.ingredient.amount = Number(igdAmount)
    console.log(this.ingredient)
    this.newIngredient.emit(this.ingredient)
  }
}
