import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../old_services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}