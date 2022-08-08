import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipesService } from './services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  public currentRecipeEl: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [{ name: '', amount: 0 }],
  };

  constructor(private _recipeService: RecipesService) {
    _recipeService.recipeSelect.subscribe((recipe: Recipe) => {
      this.currentRecipeEl = recipe;
    });
  }

  ngOnInit(): void {}
}
