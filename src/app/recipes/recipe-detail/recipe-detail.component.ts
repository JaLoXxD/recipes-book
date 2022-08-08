import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() currentRecipe: Recipe;

  constructor(private _recipesService: RecipesService) {}

  ngOnInit(): void {}

  addIngredients() {
    this._recipesService.addIngredientsToList(this.currentRecipe.ingredients);
  }
}
