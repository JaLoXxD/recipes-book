import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input('recipe') recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
  };

  @Output() currentRecipe = new EventEmitter<Recipe>();

  selectRecipe(): void {
    this.currentRecipe.emit(this.recipe);
  }

  constructor() {}

  ngOnInit(): void {}
}
