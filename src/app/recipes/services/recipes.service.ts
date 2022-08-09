import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../recipes.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  public recipeSelect = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Fritada',
      'This is a typical ecuadorian food.',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/indian-10f0c14.jpg',
      [
        new Ingredient('Apples', 4),
        new Ingredient('Carrots', 2),
        new Ingredient('Corns', 6),
      ]
    ),
    new Recipe(
      'test2',
      'test2',

      'https://images.immediate.co.uk/production/volatile/sites/30/2022/03/summer-budget-85da682.jpg?quality=90&resize=504%2C458',
      [
        new Ingredient('Bananas', 5),
        new Ingredient('Watermelon', 1),
        new Ingredient('Pinapple', 3),
        new Ingredient('Grapes', 20),
        new Ingredient('Peach', 3),
      ]
    ),
  ];

  constructor(private _shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    this._shoppingListService.ingredientsToList(ingredients);
  }
}
