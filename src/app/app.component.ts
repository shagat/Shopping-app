import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-app';
  pageStatus = [{isRecipe: 'true', isShop:'false'}];
  loadedFeature = 'recipe'

  onNavigate(feature:string){
    this.loadedFeature = feature;
  }
}
