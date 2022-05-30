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
    this.newIngredient.emit(ingredient)
  }
}
