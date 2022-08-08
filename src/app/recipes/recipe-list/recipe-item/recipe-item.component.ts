import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipesService } from '../../services/recipes.service';

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
    ingredients: [],
  };

  constructor(private _recipeService: RecipesService) {}

  selectRecipe(): void {
    this._recipeService.recipeSelect.emit(this.recipe);
  }

  ngOnInit(): void {}
}
