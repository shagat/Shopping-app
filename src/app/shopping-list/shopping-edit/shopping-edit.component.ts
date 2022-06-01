import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit {
@ViewChild('amountInput', {static: true}) igdAmount: ElementRef; 

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  getInputData(igdName:string){
    const ingredient = new Ingredient(igdName, this.igdAmount.nativeElement.value)
    this.shoppingListService.addNewIngredient(ingredient);
  }
}
