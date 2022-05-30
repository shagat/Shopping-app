import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@Output('igdCreated') newIngredient = new EventEmitter<Ingredient>();
@ViewChild('amountInput', {static: true}) igdAmount: ElementRef; 

  constructor() { }

  ngOnInit(): void {
  }
  getInputData(igdName:string){
    const ingredient = new Ingredient(igdName, this.igdAmount.nativeElement.value)
    // this.ingredient.name = nameInput.value
    // this.ingredient.amount = Number(amountInput.value)
    // this.ingredient.name = igdName
    // this.ingredient.amount = Number(this.igdAmount.nativeElement.value)
    console.log(ingredient)
    this.newIngredient.emit(ingredient)
  }
}
