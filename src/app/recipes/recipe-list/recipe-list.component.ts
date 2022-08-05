import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() listRecipe = new EventEmitter<Recipe>();

  public recipes: Recipe[] = [
    new Recipe(
      'Fritada',
      'This is a typical ecuadorian food.',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/indian-10f0c14.jpg'
    ),
    new Recipe(
      'test2',
      'test2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2022/03/summer-budget-85da682.jpg?quality=90&resize=504%2C458'
    ),
  ];

  constructor() {}

  onSelectRecipe(recipe: Recipe) {
    this.listRecipe.emit(recipe);
  }

  ngOnInit(): void {}
}
