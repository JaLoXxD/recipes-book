import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor(private _recipesService: RecipesService) {
    this.recipes = this._recipesService.getRecipes();
  }

  ngOnInit(): void {}
}
