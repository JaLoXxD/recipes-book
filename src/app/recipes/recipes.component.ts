import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor() {}

  currentRecipeEl: Recipe = { name: '', description: '', imagePath: '' };

  ngOnInit(): void {}

  onRecipeList(recipe: Recipe) {
    this.currentRecipeEl = recipe;
  }
}
